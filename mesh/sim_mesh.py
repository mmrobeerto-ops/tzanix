#!/usr/bin/env python3
# =============================================================================
#  sim_mesh — PRUEBA DEL FOSO de TZANIX (red de inteligencia compartida)
#
#  Compara, con los MISMOS ataques, dos mundos:
#    A) SIN foso  -> cada servidor aprende solo (como hoy).
#    B) CON foso  -> los servidores comparten inteligencia por el hub.
#
#  Mide 4 cosas honestas:
#    1. Daño absorbido (golpes de atacante que el servidor "come" antes de
#       bloquear). Menos = mejor. Es el valor del foso en números.
#    2. Falsos positivos: ¿se coló alguna IP legítima al feed? Debe ser 0.
#    3. Escáner de una sola vez: ¿se propagó sin consenso? No debe.
#    4. Envenenamiento: ¿un cliente malicioso logró bloquear a una IP buena?
# =============================================================================
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from tzanix_hub import MeshHub

# ----------------- parámetros del escenario -----------------
N_SERVERS      = 10
UMBRAL_LOCAL   = 100   # descartes para que un server detecte solo a un atacante
GRACIA         = 2     # golpes que cuela una IP ya conocida por el feed (pre-bloqueo)
VOLUMEN_ATAQUE = 150   # golpes que manda un atacante a cada servidor que visita
K_CONSENSO     = 3     # clientes distintos para publicar una IP en el feed

# IPs "campaña" = botnet que ataca a TODOS los servidores (las que el foso caza)
CAMPANA = ["45.148.10.238", "193.47.62.109", "139.162.119.12",
           "80.94.95.112", "141.98.11.27"]
# escáneres de una sola vez: cada uno molesta a UN solo servidor
ONEOFF  = [f"203.0.113.{i}" for i in range(N_SERVERS)]
# tráfico legítimo de mucho volumen (lista blanca: Googlebot + Cloudflare)
LEGIT   = ["66.249.66.1", "173.245.48.9"]
# IP que un cliente MALICIOSO intentará meter al feed (un competidor legítimo)
POISON  = "198.51.100.7"


class Servidor:
    def __init__(self, sid, hub, usar_foso):
        self.sid = sid
        self.hub = hub
        self.usar_foso = usar_foso
        self.local = {}         # ip -> descartes acumulados
        self.bloqueadas = set() # detectadas por mí
        self.prebloqueadas = set()  # bajadas del feed (foso)
        self.dano = 0           # golpes de atacante absorbidos

    def refrescar_feed(self):
        if self.usar_foso:
            self.prebloqueadas = self.hub.feed_ips()

    def recibir(self, ip, golpes):
        # ¿ya la conozco (local o por el foso)? -> pre-bloqueo, cuela poquito
        if ip in self.bloqueadas or ip in self.prebloqueadas:
            self.dano += min(golpes, GRACIA)
            return
        # si no, la sufro hasta detectarla sola
        self.local[ip] = self.local.get(ip, 0) + golpes
        self.dano += min(golpes, UMBRAL_LOCAL)
        if self.local[ip] >= UMBRAL_LOCAL:
            self.bloqueadas.add(ip)
            # reporto al hub (esto alimenta el foso)
            self.hub.report(self.sid, ip, self.local[ip])


def correr(usar_foso):
    hub = MeshHub(k_consenso=K_CONSENSO, min_descartes=UMBRAL_LOCAL)
    servers = [Servidor(i, hub, usar_foso) for i in range(N_SERVERS)]

    # --- oleadas: cada IP de campaña recorre los servidores en orden ---
    for ip in CAMPANA:
        for s in servers:
            s.refrescar_feed()          # el server baja el feed antes de la oleada
            s.recibir(ip, VOLUMEN_ATAQUE)

    # --- escáneres de una sola vez (cada uno a su server) ---
    for i, ip in enumerate(ONEOFF):
        servers[i].recibir(ip, VOLUMEN_ATAQUE)

    # --- tráfico legítimo de alto volumen a TODOS (no debe bloquearse) ---
    # (en real, el detector por entropía no los marca; aquí además la lista
    #  blanca del hub los protege si algún agente los reportara por error)
    for ip in LEGIT:
        for s in servers:
            # un agente mal configurado intenta reportarlos:
            hub.report(s.sid, ip, 9999)

    # --- intento de ENVENENAMIENTO: un cliente malicioso reporta a POISON ---
    # lo reporta muchísimas veces, pero es UN SOLO cliente:
    for _ in range(50):
        hub.report("cliente_malicioso", POISON, 9999)

    dano_total = sum(s.dano for s in servers)
    return hub, servers, dano_total


def main():
    print("=" * 60)
    print("   PRUEBA DEL FOSO — Red de inteligencia TZANIX")
    print(f"   {N_SERVERS} servidores · umbral local {UMBRAL_LOCAL} · K={K_CONSENSO}")
    print("=" * 60)

    hub_a, _, dano_sin = correr(usar_foso=False)
    hub_b, _, dano_con = correr(usar_foso=True)

    # ---- 1) daño absorbido ----
    print("\n[1] DAÑO ABSORBIDO (golpes de atacante antes de bloquear)")
    print(f"    SIN foso : {dano_sin:,} golpes")
    print(f"    CON foso : {dano_con:,} golpes")
    ahorro = dano_sin - dano_con
    pct = 100 * ahorro / dano_sin if dano_sin else 0
    print(f"    → El foso evitó {ahorro:,} golpes ({pct:.0f}% menos daño).")

    # ---- 2) feed de consenso ----
    feed = hub_b.feed()
    feed_ips = {e["ip"] for e in feed}
    print(f"\n[2] FEED DE CONSENSO ({len(feed)} IPs publicadas)")
    for e in feed:
        print(f"    🔴 {e['ip']:<16} · {e['clientes']} clientes · "
              f"confianza {e['confianza']}%")

    # ---- 3) falsos positivos / escáneres de una vez ----
    print("\n[3] CONTROL DE CALIDAD")
    legit_colados = [ip for ip in LEGIT if ip in feed_ips]
    oneoff_colados = [ip for ip in ONEOFF if ip in feed_ips]
    print(f"    Legítimos (CDN/Googlebot) en el feed : {len(legit_colados)}  "
          + ("✅ ninguno" if not legit_colados else f"🚨 {legit_colados}"))
    print(f"    Escáneres de 1 solo cliente en feed  : {len(oneoff_colados)}  "
          + ("✅ ninguno (sin consenso, no se propaga)" if not oneoff_colados
             else f"🚨 {oneoff_colados}"))
    print(f"    Reportes de IPs buenas rechazados    : "
          f"{hub_b.rechazos_allowlist} (lista blanca)")

    # ---- 4) envenenamiento ----
    print("\n[4] RESISTENCIA A ENVENENAMIENTO")
    if POISON in feed_ips:
        print(f"    🚨 FALLO: {POISON} se coló al feed.")
    else:
        print(f"    ✅ {POISON} NO entró: un solo cliente no hace consenso "
              f"(se necesitan {K_CONSENSO} distintos).")

    # ---- veredicto ----
    print("\n" + "=" * 60)
    ok = (not legit_colados and not oneoff_colados and POISON not in feed_ips
          and dano_con < dano_sin)
    if ok:
        print(f"   ✅ FOSO VALIDADO: {pct:.0f}% menos daño, 0 falsos positivos, "
              f"a prueba de abuso.")
    else:
        print("   ⚠️  Revisar: algo no cumplió.")
    print("=" * 60)


if __name__ == "__main__":
    main()
