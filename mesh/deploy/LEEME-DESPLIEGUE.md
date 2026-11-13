# 🚀 Despliegue del foso TZANIX — Hub en Tokio + `hub.aureasystems.mx`

Guía honesta y paso a paso. El **hub** vive en tu servidor de Tokio; cada
**cliente** (servidor con `tzanix-guard`) se conecta con una llave.

---

## Arquitectura (en una imagen mental)

```
  Cliente A ─┐
  Cliente B ─┤  reportan atacantes  →  [ hub.aureasystems.mx ]  (tu Tokio)
  Cliente C ─┘  ←  bajan el feed        Caddy(TLS) → hub:8787 → SQLite
```

El hub NO es una página: es una **API**. En la raíz (`https://hub.aureasystems.mx/`)
queda una paginita pública de estado; la API real son `/report` y `/feed`.

---

## PASO 1 — DNS (una sola vez)
En tu proveedor de dominio, crea un registro:

```
Tipo A    hub.aureasystems.mx    →   IP-DE-TU-SERVIDOR-DE-TOKIO
```

Espera a que resuelva (`ping hub.aureasystems.mx` debe dar esa IP).

## PASO 2 — Subir e instalar el HUB (en Tokio)
Sube esta carpeta completa al servidor y corre:

```bash
sudo bash deploy/install-hub.sh
```

Esto crea el servicio `tzanix-hub`, genera tu **token admin** (¡guárdalo!) y
deja el hub escuchando en `127.0.0.1:8787`.

## PASO 3 — TLS con Caddy (en Tokio)
```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update && sudo apt install -y caddy
```
Edita `deploy/Caddyfile` (pon tu correo), cópialo y arranca:
```bash
sudo cp deploy/Caddyfile /etc/caddy/Caddyfile
sudo systemctl restart caddy
```
Verifica: abre `https://hub.aureasystems.mx/` → debe verse la página de estado
con candado válido. 🎉

## PASO 4 — Crear una llave por cliente (en Tokio)
```bash
bash deploy/crear-llave.sh "cliente-abundis"
```
Copia la `llave` que imprime (no se vuelve a mostrar).

## PASO 5 — Conectar cada servidor cliente
En el servidor del cliente (que ya tiene `tzanix-guard` corriendo):
```bash
sudo bash deploy/install-agent.sh  https://hub.aureasystems.mx  LA_LLAVE_DEL_CLIENTE
```
Listo: cada 5 min reporta sus atacantes y baja el feed a
`/etc/tzanix/mesh-blocklist.txt` para pre-bloquear.

---

## Comprobar que el foso vive
- Estado público: `https://hub.aureasystems.mx/`
- Salud: `curl https://hub.aureasystems.mx/health`
- Métricas (admin): `curl -H "X-Admin-Token: TU_TOKEN" https://hub.aureasystems.mx/stats`

## Revocar un cliente
```bash
source /opt/tzanix-hub/hub.env
curl -s --noproxy 127.0.0.1 -H "X-Admin-Token: $TZANIX_ADMIN_TOKEN" \
  -d '{"llave":"LA_LLAVE"}' http://127.0.0.1:8787/admin/revoke
```

---

## ⚠️ Honestidad / pendientes
- El hub escucha **solo en loopback**; la única cara pública es Caddy (TLS). Bien.
- Respáldalo: el estado vive en `/opt/tzanix-hub/hub.db` (SQLite). Un `cp` basta.
- Esto es un **MVP sólido y probado**, no un SaaS maduro: falta panel, alta de
  clientes por UI, y correrlo unos días con tráfico real antes de presumir cifras.
- Primer objetivo real: **2–3 servidores tuyos reportando de verdad** unos días.
```
