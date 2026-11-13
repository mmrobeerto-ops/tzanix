#!/usr/bin/env python3
# =============================================================================
#  tzanix-guard-mesh — conecta tu tzanix-guard AL FOSO
#
#  Hace dos cosas, cada pocos minutos (por cron o systemd timer):
#   1. REPORTA: lee las líneas [OBSERVACION] del log del guard y manda al hub
#      las IPs que tu servidor detectó como atacantes.
#   2. BAJA el feed de consenso y escribe /etc/tzanix/mesh-blocklist.txt
#      (las IPs que atacaron a OTROS clientes) para que el guard las
#      pre-bloquee ANTES de ser atacado.
#
#  Privacidad: SOLO se envían IPs atacantes (las que ya cruzaron tu umbral).
#  Nunca se envía tráfico de tus visitantes legítimos.
#
#  Uso:  python3 tzanix-guard-mesh.py  https://hub.tzanix.io  TU_LLAVE
# =============================================================================
import sys, re, json, os, urllib.request

LOG = "/var/log/tzanix-guard.log"
BLOCKLIST = "/etc/tzanix/mesh-blocklist.txt"
ESTADO = "/etc/tzanix/mesh-last.txt"   # hasta qué línea ya reportamos
# línea tipo: [OBSERVACION] bloquearia 45.148.10.238 (100 descartes) — atacante...
PAT = re.compile(r"bloquearia\s+(\d+\.\d+\.\d+\.\d+)\s+\((\d+)\s+descartes\)")


def _post(hub, key, ip, desc):
    req = urllib.request.Request(
        hub.rstrip("/") + "/report",
        data=json.dumps({"ip": ip, "descartes": desc}).encode(),
        headers={"X-Api-Key": key, "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=10) as r:
        return json.loads(r.read())


def _get_feed(hub, key):
    req = urllib.request.Request(hub.rstrip("/") + "/feed",
                                 headers={"X-Api-Key": key})
    with urllib.request.urlopen(req, timeout=10) as r:
        return json.loads(r.read()).get("feed", [])


def reportar(hub, key):
    if not os.path.exists(LOG):
        print("No encuentro el log del guard:", LOG); return
    # recordar hasta dónde leímos, para no re-reportar
    pos = 0
    if os.path.exists(ESTADO):
        try: pos = int(open(ESTADO).read().strip())
        except Exception: pos = 0
    enviados = 0
    with open(LOG) as f:
        f.seek(pos)
        for ln in f:
            m = PAT.search(ln)
            if m:
                ip, desc = m.group(1), int(m.group(2))
                try:
                    _post(hub, key, ip, desc); enviados += 1
                except Exception as e:
                    print("fallo al reportar", ip, e)
        nueva_pos = f.tell()
    open(ESTADO, "w").write(str(nueva_pos))
    print(f"Reportadas {enviados} IPs atacantes al foso.")


def bajar_feed(hub, key):
    try:
        feed = _get_feed(hub, key)
    except Exception as e:
        print("No pude bajar el feed:", e); return
    os.makedirs(os.path.dirname(BLOCKLIST), exist_ok=True)
    with open(BLOCKLIST, "w") as f:
        f.write("# IPs que atacaron a otros clientes de la red TZANIX\n")
        f.write("# El guard las pre-bloquea. Generado por tzanix-guard-mesh.\n")
        for e in feed:
            f.write(f"{e['ip']}  # {e['clientes']} clientes · conf {e['confianza']}%\n")
    print(f"Feed bajado: {len(feed)} IPs en {BLOCKLIST} (pre-bloqueo listo).")


def main():
    if len(sys.argv) < 3:
        print("Uso: tzanix-guard-mesh.py  https://hub  TU_LLAVE"); sys.exit(1)
    hub, key = sys.argv[1], sys.argv[2]
    reportar(hub, key)
    bajar_feed(hub, key)


if __name__ == "__main__":
    main()
