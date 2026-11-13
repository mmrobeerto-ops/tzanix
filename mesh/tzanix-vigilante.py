#!/usr/bin/env python3
# =============================================================================
#  tzanix-vigilante — EL VIGILANTE COMPLETO
#
#  Conecta las tres piezas en un solo flujo autónomo:
#    log  ->  CEREBRO ML (Isolation Forest)  ->  decide:
#        🔴 bloquear     -> iptables DROP  (de verdad) + (opcional) avisa a la red
#        🟡 al analista  -> explicación en español (tzanix_ai), NO bloquea
#        ✅ normal        -> nada
#
#  SEGURIDAD PRIMERO (igual que el guard):
#   - MODO OBSERVACIÓN por defecto: solo muestra lo que HARÍA. Para bloquear
#     de verdad hay que pasar --bloquear a propósito.
#   - Lista blanca (Google, Cloudflare, redes privadas) nunca se bloquea.
#   - Protege tu IP de SSH (anti-candado): jamás se bloquea a sí mismo.
#   - Reglas etiquetadas 'tzanix-ml' y un --limpiar que las quita todas.
#
#  Uso:
#    python3 tzanix-vigilante.py                         (demo, observación)
#    python3 tzanix-vigilante.py /var/log/nginx/access.log
#    sudo python3 tzanix-vigilante.py /var/log/nginx/access.log --bloquear
#    sudo python3 tzanix-vigilante.py --limpiar          (quita las reglas)
#    ... --hub https://hub.tzanix.io --key LLAVE         (comparte 🔴 con la red)
# =============================================================================
import sys, os, json, subprocess, ipaddress, argparse, urllib.request
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import tzanix_ml_demo as ml
import tzanix_ai

BLOQUEAR_UMBRAL, REVISAR_UMBRAL = 0.72, 0.60
ALLOW_CIDRS = [
    "10.0.0.0/8","172.16.0.0/12","192.168.0.0/16","127.0.0.0/8",
    "66.249.64.0/19","157.55.39.0/24",             # Googlebot / Bingbot
    # Cloudflare (rangos oficiales IPv4):
    "173.245.48.0/20","103.21.244.0/22","103.22.200.0/22","103.31.4.0/22",
    "141.101.64.0/18","108.162.192.0/18","190.93.240.0/20","188.114.96.0/20",
    "197.234.240.0/22","198.41.128.0/17","162.158.0.0/15","104.16.0.0/13",
    "104.24.0.0/14","172.64.0.0/13","131.0.72.0/22"]
ALLOW = [ipaddress.ip_network(c) for c in ALLOW_CIDRS]

ALLOWLIST_FILE = "/etc/tzanix/allowlist.txt"   # tus rangos de confianza (editable)
def cargar_allowlist_usuario():
    try:
        for ln in open(ALLOWLIST_FILE):
            ln = ln.split("#")[0].strip()
            if ln:
                try: ALLOW.append(ipaddress.ip_network(ln, strict=False))
                except ValueError: pass
    except FileNotFoundError:
        pass

def ssh_ip():
    return (os.environ.get("SSH_CONNECTION","").split() or [None])[0]

def protegida(ip, extra):
    try: a = ipaddress.ip_address(ip)
    except ValueError: return True
    if not a.is_global: return True
    if any(a in n for n in ALLOW): return True
    return ip in extra

# ---- iptables ----
def regla_existe(ip):
    return subprocess.run(["iptables","-C","INPUT","-s",ip,"-j","DROP",
        "-m","comment","--comment","tzanix-ml"], capture_output=True).returncode == 0

def aplicar_bloqueo(ip):
    if regla_existe(ip): return "ya estaba"
    subprocess.run(["iptables","-I","INPUT","-s",ip,"-j","DROP",
        "-m","comment","--comment","tzanix-ml"], check=True)
    return "bloqueada"

def limpiar_reglas():
    quitadas = 0
    while True:
        out = subprocess.run(["iptables","-S","INPUT"],capture_output=True,text=True).stdout
        linea = next((l for l in out.splitlines()
                      if "tzanix-ml" in l and l.startswith("-A")), None)
        if not linea: break
        subprocess.run(["iptables"] + linea.replace("-A","-D",1).split(), check=False)
        quitadas += 1
    print(f"🧹 {quitadas} regla(s) tzanix-ml eliminada(s). Firewall limpio.")

# ---- hub (opcional) ----
def avisar_red(hub, key, ip, descartes):
    try:
        req = urllib.request.Request(hub.rstrip("/")+"/report",
            data=json.dumps({"ip":ip,"descartes":max(descartes,100)}).encode(),
            headers={"X-Api-Key":key,"Content-Type":"application/json"})
        urllib.request.urlopen(req, timeout=8)
        return True
    except Exception:
        return False

def main():
    ap = argparse.ArgumentParser(add_help=True)
    ap.add_argument("log", nargs="?", default=None)
    ap.add_argument("--bloquear", action="store_true", help="aplica iptables de verdad")
    ap.add_argument("--limpiar", action="store_true", help="quita todas las reglas tzanix-ml")
    ap.add_argument("--hub"); ap.add_argument("--key")
    a = ap.parse_args()
    cargar_allowlist_usuario()   # suma tus rangos de confianza de /etc/tzanix/allowlist.txt

    if a.limpiar:
        if os.geteuid()!=0: print("Usa: sudo python3 tzanix-vigilante.py --limpiar"); return
        limpiar_reglas(); return

    log = a.log
    if not log:
        log = "/tmp/tzanix-sample-access.log"; ml.generar_log(log)
        print(f"(Demo: generé un log de ejemplo en {log})")
    if a.bloquear and os.geteuid()!=0:
        print("⚠️  --bloquear necesita root. Corre con: sudo python3 ..."); return

    ips, X, info = ml.extraer_features(log)
    if len(X) < 5: print("Muy pocos datos para el cerebro ML."); return
    trees, c = ml.train_forest(X)
    med = [ml.mediana([r[i] for r in X]) for i in range(len(X[0]))]
    mad = [ml.mediana([abs(r[i]-med[i]) for r in X]) or 1 for i in range(len(X[0]))]

    filas = sorted(((ml.anomaly_score(trees,c,x), ip, x, d)
                    for ip,x,d in zip(ips,X,info)), reverse=True)

    protegidos = set(filter(None, [ssh_ip()]))
    modo = "BLOQUEO ACTIVO" if a.bloquear else "OBSERVACIÓN"
    print("="*66)
    print(f"   🛰️  TZANIX · VIGILANTE  ·  modo {modo}")
    if protegidos: print(f"   Protegiendo tu IP de SSH (anti-candado): {', '.join(protegidos)}")
    print("="*66)

    n_bloq=n_rev=0
    for s, ip, x, d in filas:
        if s >= BLOQUEAR_UMBRAL:
            if protegida(ip, protegidos):
                print(f"🟢 {ip}  ({s:.2f})  en lista blanca / tu IP — NO se toca")
                continue
            porque = ml.explicar(x, med, mad)
            if a.bloquear:
                estado = aplicar_bloqueo(ip)
                print(f"🔴 {ip}  ({s:.2f})  BLOQUEADA ({estado}) · {porque}")
            else:
                print(f"🔴 {ip}  ({s:.2f})  bloquearía · {porque}")
            if a.hub and a.key:
                ok = avisar_red(a.hub, a.key, ip, d["n"])
                print(f"     ↳ {'avisé a la red TZANIX' if ok else 'no pude avisar a la red'}")
            n_bloq += 1
        elif s >= REVISAR_UMBRAL:
            ev = tzanix_ai.explicar_atacante(ip, d["n"], modo="observacion")
            print(f"🟡 {ip}  ({s:.2f})  AL ANALISTA — no se bloquea solo")
            print(f"     {ev['que_significa']}")
            print(f"     Recomiendo: {ev['recomendacion']}")
            n_rev += 1

    print("-"*66)
    accion = "bloqueadas" if a.bloquear else "para bloquear (observación)"
    print(f"🔴 {n_bloq} {accion} · 🟡 {n_rev} al analista · el resto, normal.")
    if not a.bloquear and n_bloq:
        print("Esto es lo que HARÍA. Para bloquear de verdad: agrega --bloquear (sudo).")
    if a.bloquear:
        print("Para deshacer todo: sudo python3 tzanix-vigilante.py --limpiar")
    print("="*66)

if __name__ == "__main__":
    main()
