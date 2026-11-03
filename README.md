# TZANiX-Æther-Core 🌌

**TZANiX-Æther-Core** es el motor perimetral de red en Rust de ultra‑baja latencia (`~219 ns por paquete`) diseñado específicamente para ISPs, proveedores de hosting y centros de datos en la suite TZANiX.

El motor opera bajo una arquitectura determinista en punto fijo (`Q16.16`) y tablas de búsqueda alineadas a caché L1, garantizando cero asignaciones dinámicas en memoria (`no_heap`), código libre de bifurcaciones condicionales (*branchless*) en el camino crítico y compatibilidad total `no_std`.

---

## 🏛️ Arquitectura del Motor

El núcleo está estructurado en componentes optimizados a nivel de microarquitectura para operar en el borde (*Edge*):

1. **Entropía de Ventana sobre Distribución de IPs en Punto Fijo Q16.16 (`src/window_entropy.rs`)**
   - **Señales de Detección (`WindowEntropy`)**: Calcula la entropía de Shannon sobre un histograma de cubos de IP de origen usando aritmética entera pura en formato `Q16.16` (sin `f64`, sin heap, `no_std`).
   - **Autocalibración y Mitigación de Deriva**: Incorpora lógica de anclaje de línea base para evitar falsos positivos y asegurar que el arranque en frío se adapte dinámicamente al perfil de tráfico del entorno.

2. **Modo Sombra y Auditoría Pasiva (`examples/shadow_report.rs`)**
   - **Operación No Intrusiva**: Permite conectar el motor en modo pasivo (espejo de tráfico / SPAN) para auditar redes en producción sin bloquear ni descartar paquetes reales.
   - **Generación de Informes Forenses**: Analiza históricos o flujos de tráfico para entregar métricas exactas sobre cuántos paquetes volumétricos o ataques de *spoofing* se habrían mitigado, aislando los orígenes dominantes.

3. **Búfer Atómico y Persistencia de Memoria Mapeada (`src/storage.rs`)**
   - **UniversalEvent (32 Bytes)**: Estructura compacta y alineada para telemetría libre de sobrecarga.
   - **Circular Ring Buffer SPSC Lock‑Free**: Búfer de Productor Único y Consumidor Único (`SpscTelemetryBuffer`) alineado a 64 bytes para prevenir el *False Sharing* entre núcleos de CPU.

4. **Monitor de Latencia y Seguridad de Fallos (`src/latency_watchdog.rs`)**
   - **Watchdog Interno (`LatencyWatchdog`)**: Mide la latencia de ejecución interna para detectar sobrecargas en tiempo real (`WatchdogError::ExecutionOverrun`).
   - **Panic Handler Determinista (`no_std`)**: Emite instrucciones de trampa de hardware (`ud2` en x86_64, `brk #1` en AArch64) en lugar de colgar el núcleo en bucles silenciosos.

---

## 🚀 Áreas de Aplicación Real (Enfoque L3/L4)
- **Proveedores de Internet y Telecomunicaciones (ISPs Regionales)**: Mitigación perimetral de inundaciones volumétricas y ataques DDoS masivos que saturan los enlaces de tránsito.
- **Proveedores de Hosting y Servidores Dedicados**: Protección de borde para infraestructura expuesta a ataques de denegación de servicio que buscan tumbar servicios en línea.
- **Servidores de Alto Tráfico**: Absorción de tráfico malicioso en capas de red sin generar latencia ni consumir recursos excesivos de CPU.

---

## 🛠️ Instalación y Validación

El motor soporta compilación nativa condicional. Para exprimir las capacidades vectoriales de su hardware (`AVX2/AVX-512`):

```bash
# 1. Validar la precisión matemática y los límites críticos
cargo test --release

# 2. Ejecutar la auditoría en modo sombra con tráfico de prueba
cargo run --release --features std --example shadow_report
```

---

## 📄 Licencias
- **Doble Licencia**: GNU AGPLv3 para uso libre/investigación; licencia privada bajo contrato corporativo para usos comerciales.
- **Contacto / Soporte**: mmrobeerto@gmail.com
