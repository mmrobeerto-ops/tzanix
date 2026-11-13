#!/usr/bin/env bash
# =============================================================================
#  install-hub.sh — instala el HUB de TZANIX en tu servidor de Tokio
#  Corre como root:  sudo bash install-hub.sh
#  (Sube antes esta carpeta completa al servidor.)
# =============================================================================
set -euo pipefail

DEST=/opt/tzanix-hub
SRC="$(cd "$(dirname "$0")/.." && pwd)"   # la carpeta tzanix-mesh

echo "==> Usuario de servicio 'tzanix'"
id tzanix >/dev/null 2>&1 || useradd --system --no-create-home --shell /usr/sbin/nologin tzanix

echo "==> Carpeta $DEST"
mkdir -p "$DEST"
cp "$SRC/tzanix_hub.py" "$SRC/tzanix_hub_server.py" "$DEST/"

echo "==> Archivo de entorno (token admin generado al azar)"
if [ ! -f "$DEST/hub.env" ]; then
  ADMIN=$(openssl rand -hex 24)
  cat > "$DEST/hub.env" <<EOF
TZANIX_ADMIN_TOKEN=$ADMIN
TZANIX_DB=$DEST/hub.db
EOF
  echo
  echo "    ********************************************************"
  echo "    *  TU TOKEN ADMIN (guárdalo, NO se vuelve a mostrar):  "
  echo "    *    $ADMIN"
  echo "    ********************************************************"
  echo
fi
chmod 600 "$DEST/hub.env"
chown -R tzanix:tzanix "$DEST"

echo "==> Servicio systemd"
cp "$SRC/deploy/tzanix-hub.service" /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now tzanix-hub

sleep 1
echo "==> Estado:"
systemctl --no-pager --full status tzanix-hub | head -n 6 || true
echo
echo "Hub escuchando en 127.0.0.1:8787 (local). Falta ponerle TLS con Caddy:"
echo "  1) DNS:  hub.aureasystems.mx  ->  IP de este servidor (registro A)"
echo "  2) Instala Caddy y usa el Caddyfile de deploy/ (ver LEEME-DESPLIEGUE.md)"
echo "  3) Crea llaves para tus clientes con:  bash deploy/crear-llave.sh <etiqueta>"
