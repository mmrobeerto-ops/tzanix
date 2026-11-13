#!/usr/bin/env python3
# =============================================================================
#  tzanix-informe — genera el INFORME EN ESPAÑOL para un cliente
#
#  Lee el log de tzanix-guard, y con la capa de IA (tzanix_ai) produce un
#  informe que el dueño del negocio entiende. Este es el "reporte gratis"
#  que vendes — pero ya traducido a humano, no a tecnicismos.
#
#  Uso:
#    python3 tzanix-informe.py                         (lee /var/log/tzanix-guard.log)
#    python3 tzanix-informe.py  /ruta/al/log  "Nombre del negocio"
# =============================================================================
import sys, os, re
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import tzanix_ai

LOG_DEFAULT = "/var/log/tzanix-guard.log"
# línea tipo: [OBSERVACION] bloquearia 45.148.10.238 (100 descartes) — atacante...
PAT = re.compile(r"bloquearia\s+(\d+\.\d+\.\d+\.\d+)\s+\((\d+)\s+descartes\)")


def main():
    log = sys.argv[1] if len(sys.argv) > 1 else LOG_DEFAULT
    negocio = sys.argv[2] if len(sys.argv) > 2 else "tu negocio"

    if not os.path.exists(log):
        print(f"No encuentro el log: {log}")
        print("Dale la ruta:  python3 tzanix-informe.py /var/log/tzanix-guard.log")
        sys.exit(1)

    # ¿está en modo observación o bloqueo?
    contenido = open(log, errors="ignore").read()
    modo = "bloqueo" if "BLOQUEO ACTIVO" in contenido else "observacion"

    # agregamos por IP, quedándonos con el mayor número de descartes
    por_ip = {}
    for m in PAT.finditer(contenido):
        ip, desc = m.group(1), int(m.group(2))
        por_ip[ip] = max(por_ip.get(ip, 0), desc)

    eventos = [tzanix_ai.explicar_atacante(ip, desc, modo=modo)
               for ip, desc in por_ip.items()]

    print(tzanix_ai.informe_texto(eventos, negocio=negocio, modo=modo))


if __name__ == "__main__":
    main()
