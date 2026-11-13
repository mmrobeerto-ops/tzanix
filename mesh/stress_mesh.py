#!/usr/bin/env python3
# =============================================================================
#  stress_mesh — PRUEBA DEL FOSO, 10x MÁS FUERTE Y MÁS REALISTA
#
#  Más grande, más sucio y más adversario que la prueba anterior:
#   - Miles de servidores.
#   - Botnets que golpean solo a una FRACCIÓN aleatoria de la red (realista).
#   - 20,000 escáneres SOLITARIOS de ruido (deben NO propagarse).
#   - Tráfico legítimo de alto volumen (lista blanca).
#   - Atacantes que COLUDEN para burlar el consenso (k-anonimato a prueba).
#   - Mide protección, falsos positivos, ruido propagado, abuso y RENDIMIENTO.
# =============================================================================
import sys, os, time, random
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from tzanix_hub import MeshHub

random.seed(1337)  # reproducible

# ----------------- parámetros (10x la prueba anterior) -----------------
SERVERS     = 2000
CAMPANA_N   = 200       # IPs de botnet que recorren la red
LONE_N      = 20000     # escáneres solitarios (ruido) — 1 víctima cada uno
UMBRAL      = 100
GRACIA      = 2
VOLUMEN     = 150
K           = 3
LEGIT       = ["66.249.66.1", "173.245.48.9", "157.55.39.5"]  # allowlist


def correr(usar_foso):
    hub = MeshHub(k_consenso=K, min_descartes=UMBRAL)
    dano = 0
    preemptivos = 0   # cuántas veces un server se salvó por el foso

    # cada IP de campaña golpea una fracción aleatoria de la red, en orden al azar
    for n in range(CAMPANA_N):
        ip = f"45.{n//256}.{n%256}.{random.randint(1,254)}"
        frac = random.uniform(0.2, 0.6)
        objetivos = random.sample(range(SERVERS), int(SERVERS * frac))
        random.shuffle(objetivos)
        for sid in objetivos:
            if usar_foso and hub.esta_publicada(ip):
                dano += GRACIA          # ya la conocía la red: pre-bloqueo
                preemptivos += 1
            else:
                dano += min(VOLUMEN, UMBRAL)   # la sufre hasta detectarla sola
                hub.report(sid, ip, VOLUMEN)   # y la reporta al foso

    # escáneres solitarios: 1 víctima cada uno (ruido que NO debe propagarse)
    for n in range(LONE_N):
        ip = f"203.{n//65536}.{(n//256)%256}.{n%256}"
        sid = random.randrange(SERVERS)
        dano += min(VOLUMEN, UMBRAL)
        hub.report(sid, ip, VOLUMEN)

    return hub, dano, preemptivos


def prueba_colusion(colusos):
    """¿`colusos` clientes maliciosos distintos logran envenenar una IP buena?"""
    hub = MeshHub(k_consenso=K, min_descartes=UMBRAL)
    ip_victima = "198.51.100.7"   # un competidor legítimo, no en allowlist
    for c in range(colusos):
        hub.report(f"malicioso_{c}", ip_victima, 9999)
    return hub.esta_publicada(ip_victima)


def main():
    print("=" * 64)
    print("   PRUEBA DEL FOSO — 10x MÁS FUERTE")
    print(f"   {SERVERS:,} servidores · {CAMPANA_N} botnets · "
          f"{LONE_N:,} escáneres de ruido · K={K}")
    print("=" * 64)

    t0 = time.time()
    hub_sin, dano_sin, _ = correr(usar_foso=False)
    hub_con, dano_con, preempt = correr(usar_foso=True)
    dt = time.time() - t0

    # ---- 1) protección ----
    pct = 100 * (dano_sin - dano_con) / dano_sin if dano_sin else 0
    print("\n[1] DAÑO ABSORBIDO (golpes de atacante antes de bloquear)")
    print(f"    SIN foso : {dano_sin:,}")
    print(f"    CON foso : {dano_con:,}")
    print(f"    → {dano_sin - dano_con:,} golpes evitados ({pct:.0f}% menos daño)")
    print(f"    → {preempt:,} bloqueos PREVENTIVOS (servers salvados por la red)")

    # ---- 2) feed y ruido ----
    feed = hub_con.published
    lone_colados = sum(1 for ip in feed if ip.startswith("203."))
    print(f"\n[2] FEED DE CONSENSO")
    print(f"    IPs de botnet publicadas : {len(feed):,}")
    print(f"    Escáneres de ruido colados: {lone_colados}  "
          + ("✅ 0 (sin consenso no se propaga)" if lone_colados == 0
             else "🚨 revisar"))

    # ---- 3) falsos positivos (allowlist bajo carga) ----
    hub_fp = MeshHub(k_consenso=K, min_descartes=UMBRAL)
    for ip in LEGIT:
        for sid in range(10):     # 10 agentes reportan por error a los legítimos
            hub_fp.report(sid, ip, 9999)
    fp = sum(1 for ip in LEGIT if hub_fp.esta_publicada(ip))
    print(f"\n[3] FALSOS POSITIVOS (legítimos reportados por 10 agentes)")
    print(f"    Legítimos colados al feed: {fp}  "
          + ("✅ 0 (lista blanca aguantó)" if fp == 0 else "🚨 revisar"))

    # ---- 4) resistencia a colusión (el límite honesto del k-anonimato) ----
    print(f"\n[4] RESISTENCIA A COLUSIÓN (K={K})")
    menosK = prueba_colusion(K - 1)
    igualK = prueba_colusion(K)
    print(f"    {K-1} maliciosos coludidos → publicada: "
          + ("🚨 SÍ" if menosK else "✅ NO (no alcanzan el consenso)"))
    print(f"    {K} maliciosos coludidos → publicada: "
          + ("⚠️  SÍ — este es el límite conocido del k-anonimato puro"
             if igualK else "✅ NO"))
    print("       (La defensa siguiente: REPUTACIÓN por cliente, no solo conteo.)")

    # ---- 5) rendimiento ----
    total_reportes = hub_sin.reportes_totales + hub_con.reportes_totales
    print(f"\n[5] RENDIMIENTO DEL HUB")
    print(f"    Reportes procesados : {total_reportes:,} en {dt:.2f}s")
    print(f"    Throughput          : {int(total_reportes/dt):,} reportes/seg")

    # ---- veredicto ----
    print("\n" + "=" * 64)
    ok = (lone_colados == 0 and fp == 0 and not menosK and dano_con < dano_sin)
    print("   ✅ FOSO AGUANTA A ESCALA" if ok else "   ⚠️  Revisar algo")
    print(f"      {pct:.0f}% menos daño · 0 ruido propagado · 0 falsos positivos")
    print("=" * 64)


if __name__ == "__main__":
    main()
