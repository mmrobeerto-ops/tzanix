# ACUERDO MUTUO DE CONFIDENCIALIDAD (NDA) Y MEMORÁNDUM DE ENTENDIMIENTO PARA CO-DESARROLLO (MOU)
**PROGRAMA DE CLIENTES ALFA / PILOTO TÉCNICO**

**FECHA DE FIRMA:** [Fecha]
**PROVEEDOR TECNOLÓGICO:** TZANiX Signal Technologies ("TZANiX")
**EMPRESA ALIADA (CLIENTE PILOTO):** [Nombre de la Empresa] ("El Cliente")

Este Acuerdo establece los términos bajo los cuales TZANiX otorga acceso a su tecnología propietaria desarrollada en Rust al Cliente, con el propósito de llevar a cabo una "Evaluación Técnica Guiada" (Prueba de Concepto - PoC).

---

## 1. NATURALEZA DEL PROGRAMA PILOTO Y CO-DESARROLLO
TZANiX ha desarrollado el núcleo de un motor tensorial e inercial de ciberseguridad con métricas de laboratorio de ultra baja latencia. El Cliente acepta participar en un programa piloto sin costo de licenciamiento durante 33 días. A cambio, el Cliente permitirá la instalación del software en sus entornos de prueba para calibrar los algoritmos estadísticos (Data Poisoning, Entropía de Shannon) utilizando flujos de datos reales del Cliente.

## 2. PROTECCIÓN DE PROPIEDAD INTELECTUAL Y CÓDIGO FUENTE (NDA)
El Software (contenedores Docker, binarios estáticos, SDKs en Python) constituye Propiedad Intelectual exclusiva y Secreto Comercial de TZANiX. 

El Cliente se compromete estrictamente a:
1. **No aplicar ingeniería inversa**, descompilar, desensamblar ni intentar extraer el código fuente en Rust/C++ subyacente en las imágenes Docker entregadas.
2. No compartir las métricas de rendimiento, arquitectura ni capturas de pantalla de la plataforma con competidores de TZANiX.
3. Utilizar el Software única y exclusivamente para los fines de esta Prueba de Concepto.

## 3. INSTALACIÓN EXCLUSIVA EN AMBIENTES DE PRUEBA (STAGING / DEV)
Para proteger la integridad financiera y operativa del Cliente, **QUEDA ESTRICTAMENTE PROHIBIDO** instalar este software en servidores de Producción Real.
El Cliente se obliga a desplegar el contenedor Docker de TZANiX únicamente en servidores de réplica, laboratorios controlados o ambientes de prueba (Staging). Aquí es donde ambas partes realizarán las auditorías de estrés (Soak Tests) sin afectar a los usuarios finales del Cliente.

## 4. EXENCIÓN DE RESPONSABILIDAD TÉCNICA Y GARANTÍA "TAL COMO ESTÁ" (AS IS)
El Cliente reconoce que la tecnología entregada se encuentra en fase de evaluación experimental. En consecuencia, el Software se otorga **"TAL COMO ESTÁ" (AS-IS)**, sin garantías explícitas o implícitas de rendimiento, estabilidad o comerciabilidad.

**TZANiX se exime de toda responsabilidad por:**
- Pérdida o corrupción de datos.
- Interrupción de operaciones comerciales o caída de servidores.
- Fallas en la infraestructura de hardware o software del Cliente.

El Cliente acepta que el despliegue del Software se realiza bajo su propio riesgo y que TZANiX no asumirá demandas financieras derivadas de errores en la integración o sobrecargas del clúster de pruebas.

---

**FIRMAS DE CONFORMIDAD:**

Por **TZANiX Signal Technologies:**
Nombre: _________________________
Firma: __________________________
Fecha: __________________________

Por **[Nombre del Cliente Piloto]:**
Nombre (Representante Técnico): _________________________
Firma: __________________________
Fecha: __________________________
