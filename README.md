# TZANiX-Æther-Core 🌌

**TZANiX-Æther-Core** es el motor perimetral de red en Rust de ultra-baja latencia (`~219 ns por paquete`) diseñado específicamente para ISPs, proveedores de hosting y centros de datos en la suite TZANiX. 

El motor opera bajo una arquitectura determinista en punto fijo (`Q16.16`)[cite: 3] y tablas de búsqueda alineadas a caché L1, garantizando cero asignaciones dinámicas en memoria (`no_heap`), código libre de bifurcaciones condicionales (*branchless*) en el camino crítico y compatibilidad total `no_std`[cite: 3].

---

## 🏛️ Arquitectura del Motor
El núcleo está estructurado en componentes optimizados a nivel de microarquitectura para operar en el borde (*Edge*):

1. **Entropía de Ventana sobre Distribución de IPs en Punto Fijo Q16.16 (`src/window_entropy.rs`)**
   - **Señales de Detección (`WindowEntropy`):** Calcula la entropía de Shannon sobre un histograma de cubos de IP de origen usando aritmética entera pura en formato `Q16.16` (sin `f64`, sin heap, `no_std`)[cite: 3].
   - **Autocalibración y Mitigación de Deriva:** Incorpora lógica de anclaje de línea base para evitar falsos positivos y asegurar que el arranque en frío se adapte dinámicamente al perfil de tráfico del entorno.

2. **Modo Sombra y Auditoría Pasiva (`examples/shadow_report.rs`)**
   - **Operación No Intrusiva:** Permite conectar el motor en modo pasivo (espejo de tráfico / SPAN) para auditar redes en producción sin bloquear ni descartar paquetes reales.
   - **Generación de Informes Forenses:** Analiza históricos o flujos de tráfico para entregar métricas exactas sobre cuántos paquetes volumétricos o ataques de *spoofing* se habrían mitigado, aislando los orígenes dominantes.

3. **Búfer Atómico y Persistencia de Memoria Mapeada (`src/storage.rs`)**
   - **UniversalEvent (32 Bytes):** Estructura compacta y alineada para telemetría libre de sobrecarga.
   - **Circular Ring Buffer SPSC Lock-Free:** Búfer de Productor Único y Consumidor Único (`SpscTelemetryBuffer`) alineado a 64 bytes para prevenir el *False Sharing* entre núcleos de CPU.

4. **Monitor de Latencia y Seguridad de Fallos (`src/latency_watchdog.rs`)**
   - **Watchdog Interno (`LatencyWatchdog`):** Mide la latencia de ejecución interna para detectar sobrecargas en tiempo real (`WatchdogError::ExecutionOverrun`).
   - **Panic Handler Determinista (`no_std`):** Emite instrucciones de trampa de hardware (`ud2` en x86_64, `brk #1` en AArch64) en lugar de colgar el núcleo en bucles silenciosos.

---

## 🚀 Áreas de Aplicación Real (Enfoque L3/L4)
- **Proveedores de Internet y Telecomunicaciones (ISPs Regionales):** Mitigación perimetral de inundaciones volumétricas y ataques DDoS masivos que saturan los enlaces de tránsito.
- **Proveedores de Hosting y Servidores Dedicados:** Protección de borde para infraestructura expuesta a ataques de denegación de servicio que buscan tumbar servicios en línea.
- **Servidores de Alto Tráfico:** Absorción de tráfico malicioso en capas de red sin generar latencia ni consumir recursos excesivos de CPU.

---

## 🛠️ Instalación y Validación

El motor soporta compilación nativa condicional. Para exprimir las capacidades vectoriales de su hardware (`AVX2/AVX-512`):

```bash
# 1. Validar la precisión matemática y los límites críticos
cargo test --release

# 2. Ejecutar la auditoría en modo sombra con tráfico de prueba
cargo run --release --features std --example shadow_report
🔬 Decisiones de Diseño (Análisis de Silicio)
LUT Vectorizada vs. Operaciones de Punto Flotante: Evita la penalización de cruce de dominio (Domain Cross Penalty) en x86_64 al utilizar tablas precalculadas alineadas a 64 bytes en la caché L1, logrando un cálculo de entropía estable de ~30 ns y un rendimiento general por paquete de entre 70 y 250 ns.

Alineación de caché contra False Sharing: Los índices de los búferes circulares están separados por rellenos de memoria de 56 bytes para garantizar líneas de caché L1 independientes entre hilos.

Bypass del Intérprete vía PyO3: Permite invocar las funciones de análisis desde Python liberando el GIL (py.allow_threads(...)), procesando telemetría intensiva de forma concurrente sin congelar interfaces.

⚖️ Licencias (Doble Licencia)
Desarrollado para el I+D institucional de TZANiX.

Uso libre / Investigación: GNU AGPLv3.

Uso Comercial: Licencia privada bajo contrato corporativo.

Contacto / Soporte: mmrobeerto@gmail.com | Tel / WhatsApp: +52 6371377861
```

---

### Sincronización final con Git

Una vez que guardes el archivo `README.md` actualizado en tu directorio local, ejecuta estos comandos en tu terminal de PowerShell para subir los cambios al repositorio remoto:

```powershell
git add README.md
git commit -m "docs: actualizar README con enfoque L3/L4, modo sombra y canales de contacto"
git push https://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@github.com/mmrobeerto-ops/tzanix.git
```