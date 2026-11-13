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

## El diferenciador: analista de seguridad en español 🗣️

Una blocklist cruda no le sirve al dueño de una PyME, que no entiende tecnicismos.
TZANIX añade una **capa de IA** (`tzanix_ai.py`) que traduce cada ataque a lenguaje
de negocio: *qué pasó · qué significa · qué hice · qué te recomiendo*. En español
llano, en "manzanas".

- Comando de informe para un cliente:  `python3 tzanix-informe.py /var/log/tzanix-guard.log "Nombre del negocio"`
- Endpoint del hub (admin):  `GET /informe`

Hoy el analista es un motor de reglas (gratis, instantáneo, sin internet). El
código deja listo el enchufe para un LLM (`explicar_con_llm`) sin cambiar el resto.

## El cerebro: detección por comportamiento (ML)

El guardián no usa listas negras (se evaden cambiando de IP o de disfraz).
Detecta por **comportamiento**, con un **Isolation Forest implementado de cero**
(sin numpy ni scikit-learn — corre en cualquier servidor). Aprende lo "normal" y
aísla lo raro, usando **5 señales**:

1. User-agents que rota · 2. % de errores (404/403) · 3. % de rutas sensibles ·
4. Ritmo (peticiones/min) · 5. **Regularidad** (un robot lento pero metronómico
se delata; un humano nunca es tan regular — caza al sigiloso *low-and-slow*).

El `tzanix-vigilante.py` conecta las tres piezas en un flujo autónomo:
`log → cerebro ML → 🔴 bloquea (iptables) · 🟡 al analista · ✅ normal`, con
observación por defecto y protección anti-candado de tu IP SSH.

### Resultados del benchmark (metodología institucional)

| Métrica | 3 señales | 5 señales (con tiempo) |
|---|---|---|
| ROC-AUC | 0.89 | **0.96** ± 0.005 |
| Sigiloso *low-and-slow* | 48% | **95%** |
| Punto de operación (1% FP) | — | 82% recall |
| Throughput | — | ~237k líneas/seg (sin GPU) |

**Límite honesto:** a un atacante que imita a un humano en TODO (ritmo irregular,
pocos errores, sin rutas sensibles), el comportamiento solo lo caza **0%**. Por
eso existe la **red colaborativa**: si se esconde contigo, ya atacó a otro y quedó
marcado. Comportamiento + reputación + red, en capas.

> Cifras sobre tráfico **sintético con traslape realista**; la validación final
> requiere datos reales etiquetados. Correr: `python3 tzanix_benchmark.py`.

## Componentes

| Archivo | Qué es |
|---|---|
| `tzanix_hub.py` | Motor de consenso: k-anonimato, reputación, lista blanca, rate-limit, caducidad, tope de memoria. |
| `tzanix_hub_server.py` | Servicio HTTP + SQLite + llaves de API + página de estado + `/informe`. |
| `tzanix_ai.py` | Capa de analista: traduce ataques a español de negocio. |
| `tzanix-informe.py` | Genera el informe en español para un cliente (lee el log del guard). |
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

## Qué podemos hacer (visión)

TZANIX hoy es un **MVP funcional y desplegado**. A dónde puede llegar:

- **IA generativa real** en el analista (hoy es motor de reglas; el enchufe para un LLM ya está listo).
- **Foco vertical:** el mejor guardián para **tiendas WordPress / WooCommerce en LatAm**.
- **Montarse sobre [CrowdSec](https://crowdsec.net)** (su motor + su red de 300k nodos) y poner encima el **servicio + IA en español** — nuestra capa, no reinventar la rueda.
- **Canal de agencias / hosting:** un nodo protege a decenas de clientes de golpe.
- **Detección de sesión / cuenta robada** (el hueco que el MFA no cubre).

## Estado y colaboración

Proyecto en **etapa temprana**, construido y desplegado como MVP (hub público con
HTTPS, red con datos reales, analista en español funcionando). **Abierto a sumar a
alguien** que quiera convertirlo en algo serio — ver la propuesta para socios.

## Despliegue

Ver [`deploy/LEEME-DESPLIEGUE.md`](deploy/LEEME-DESPLIEGUE.md).

## Privacidad

Ver [`PRIVACIDAD-mesh.md`](PRIVACIDAD-mesh.md).
