# TZANIX Mesh — red de inteligencia compartida anti-ataques

Software que conecta varios servidores en una red que comparte, en tiempo
real, qué direcciones IP están atacando. Cuando una IP ataca a un servidor
de la red, los demás la **pre-bloquean antes** de ser atacados.

> Nota honesta: es un enfoque de "inteligencia colaborativa" **similar en
> concepto** a proyectos como [CrowdSec](https://crowdsec.net) o las listas
> comunitarias (AbuseIPDB). Esta es una implementación propia — ligera,
> autónoma y pensada para PyMEs de habla hispana.

## Qué hace (paso a paso)

1. **Detección local** — un agente lee el log del servidor (`tzanix-guard`) y
   detecta las IPs que concentran tráfico (atacantes).
2. **Reporte** — el agente envía esas IPs al hub central (API con llave).
3. **Consenso** — el hub publica una IP al feed solo cuando **varios clientes
   distintos** la reportan (k-anonimato), pesado por **reputación** del cliente.
4. **Pre-bloqueo** — todos los agentes bajan el feed y bloquean esas IPs antes
   de recibir el ataque.

## Componentes

| Archivo | Qué es |
|---|---|
| `tzanix_hub.py` | Motor de consenso: k-anonimato, reputación, lista blanca, rate-limit, caducidad, tope de memoria. |
| `tzanix_hub_server.py` | Servicio HTTP + SQLite + llaves de API + página de estado. |
| `tzanix-guard-mesh.py` | Agente: reporta atacantes y baja el feed. |
| `deploy/` | Instaladores (systemd, Caddy/nginx) y guía de despliegue. |

## Seguridad y diseño

- **Identidad del cliente = su llave de API** (un voto por llave).
- Solo se comparten **IPs atacantes**; nunca datos de visitantes.
- Anti-envenenamiento por **consenso + reputación + lista blanca**.
- **Persistencia en SQLite**: el estado sobrevive reinicios.
- Validación de IP, límite de peticiones y caducidad automática.

## Pruebas incluidas

- `sim_mesh.py`, `scale_test.py`, `stress_mesh.py` — simulación y escala.
- `harden_test.py` — pruebas de endurecimiento (reputación, rate-limit, fuzz…).
- `e2e_test.py` — prueba HTTP real de punta a punta (con reinicio del hub).

Correr una:  `python3 -I harden_test.py`

## Despliegue

Ver [`deploy/LEEME-DESPLIEGUE.md`](deploy/LEEME-DESPLIEGUE.md).

## Privacidad

Ver [`PRIVACIDAD-mesh.md`](PRIVACIDAD-mesh.md).
