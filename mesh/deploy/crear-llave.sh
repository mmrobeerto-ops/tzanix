#!/usr/bin/env bash
# Crea una llave de API para un cliente nuevo. Úsalo en el servidor del hub.
#   bash crear-llave.sh "nombre-del-cliente"
set -euo pipefail
ETIQUETA="${1:-cliente}"
source /opt/tzanix-hub/hub.env
curl -s --noproxy 127.0.0.1 \
  -H "X-Admin-Token: $TZANIX_ADMIN_TOKEN" \
  -d "{\"label\":\"$ETIQUETA\"}" \
  http://127.0.0.1:8787/admin/key
echo
echo "^ Copia esa 'llave' y ponla en el agente del cliente (mesh.env). No se vuelve a mostrar."
