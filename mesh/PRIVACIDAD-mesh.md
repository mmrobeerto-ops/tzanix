# TZANIX Mesh — Nota de privacidad y manejo de datos
### (Importante para el pitch internacional: Canadá/UE valoran esto)

## Qué se comparte y qué NO

**SÍ se envía al hub (mínimo indispensable):**
- La **IP de un atacante** ya confirmado localmente (una IP que cruzó el umbral de descartes en el servidor del cliente).
- El **número de descartes** (una métrica de intensidad, no contenido).
- Un **identificador anónimo del cliente** derivado de su llave de API (hash), para contar consenso. No revela quién es el cliente ni su dominio.

**NUNCA se envía:**
- Tráfico, IPs ni datos de los **visitantes legítimos** del cliente.
- Contenido de peticiones, URLs, cookies, cabeceras ni cargas útiles.
- Datos personales del cliente o de sus usuarios.

## Principios de diseño (privacy by design)

1. **Minimización:** solo viaja lo necesario para el consenso — una IP atacante y un conteo. Nada más.
2. **Propósito único:** el dato se usa exclusivamente para proteger a la red de esa misma IP. No se perfila, no se vende, no se cruza.
3. **Seudonimización:** la identidad del cliente es un hash de su llave; el hub no sabe el nombre, dominio ni ubicación del cliente.
4. **Caducidad:** cada avistamiento decae (ventana configurable) y cada IP del feed tiene TTL — la red olvida amenazas viejas.
5. **Lista blanca:** rangos buenos conocidos (Google, Cloudflare, bots legítimos, redes privadas) nunca se comparten ni se bloquean.
6. **Consentimiento:** participar en la red es **opt-in**. El cliente puede correr TZANIX en modo local (sin foso) si lo prefiere.
7. **Transparencia:** el cliente puede ver exactamente qué IPs reportó su agente (`mesh-last.txt`) y qué feed bajó (`mesh-blocklist.txt`).

## Base legal (naturaleza del dato)

Una dirección IP de un atacante, usada para seguridad defensiva, cae dentro del **interés legítimo** de proteger sistemas (figura reconocida en GDPR y marcos equivalentes). Aun así, por diseño seudonimizamos al reportante y minimizamos el dato, para reducir cualquier exposición.

## Pendiente (roadmap de confianza)
- **Reputación por cliente** para endurecer el consenso contra colusión (hoy el límite es K identidades reales).
- Opción de **hashear las IPs atacantes** (k-anonimato también sobre la IP) para despliegues de máxima privacidad, a cambio de perder legibilidad en el reporte.
- Auditoría externa del hub antes de escalar a producción.
