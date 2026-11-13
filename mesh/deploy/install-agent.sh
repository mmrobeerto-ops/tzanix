#!/usr/bin/env bash
# =============================================================================
#  install-agent.sh — conecta UN servidor cliente (con tzanix-guard) al foso.
#  Corre como root en el servidor del cliente:
#     sudo bash install-agent.sh  https://hub.aureasystems.mx  LA_LLAVE_DEL_CLIENTE
# =============================================================================
set -euo pipefail
HUB_URL="${1:-}"; API_KEY="${2:-}"
SRC="$(cd "$(dirname "$0")/.." && pwd)"
[ -z "$HUB_URL" ] || [ -z "$API_KEY" ] && {
  echo "Uso: sudo bash install-agent.sh  https://hub.aureasystems.mx  LLAVE"; exit 1; }

echo "==> Instala el agente mesh"
cp "$SRC/tzanix-guard-mesh.py" /usr/local/bin/
chmod +x /usr/local/bin/tzanix-guard-mesh.py
mkdir -p /etc/tzanix

echo "==> Config /etc/tzanix/mesh.env"
cat > /etc/tzanix/mesh.env <<EOF
HUB_URL=$HUB_URL
API_KEY=$API_KEY
EOF
chmod 600 /etc/tzanix/mesh.env

echo "==> Timer systemd (cada 5 min)"
cp "$SRC/deploy/tzanix-mesh.service" "$SRC/deploy/tzanix-mesh.timer" /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now tzanix-mesh.timer

echo "==> Prueba una corrida ahora:"
systemctl start tzanix-mesh.service || true
sleep 1
echo "   Feed bajado a: /etc/tzanix/mesh-blocklist.txt"
head -n 5 /etc/tzanix/mesh-blocklist.txt 2>/dev/null || echo "   (aún vacío; se llena cuando la red detecte atacantes)"
echo "LISTO — este servidor ya forma parte del foso TZANIX."
