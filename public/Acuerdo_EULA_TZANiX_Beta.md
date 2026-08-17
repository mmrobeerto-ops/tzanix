# ACUERDO DE LIBERACIÓN DE RESPONSABILIDAD TÉCNICA (EULA / BETA TEST AGREEMENT)
**TZANiX SIGNAL TECHNOLOGIES**

---

**FECHA DE ENTRADA EN VIGOR:** [Fecha]
**CLIENTE / ORGANIZACIÓN EVALUADORA:** [Nombre de la Empresa]

Este Acuerdo de Licencia de Usuario Final (en adelante, el "Acuerdo") es un contrato legal y vinculante entre **TZANiX Signal Technologies** (en adelante, "TZANiX") y la Organización Evaluadora mencionada anteriormente. 

Al descargar, instalar, copiar o utilizar los contenedores Docker, binarios o SDKs de TZANiX (en adelante, el "Software"), el Cliente acepta quedar sujeto a los términos del presente Acuerdo.

### 1. NATURALEZA DEL SOFTWARE (EVALUACIÓN TÉCNICA GUIADA)
El Cliente reconoce expresamente que el Software entregado se encuentra en una fase de "Evaluación Técnica Guiada" o "Prueba de Concepto (PoC)". Este Software utiliza algoritmos inerciales, análisis de entropía y optimizaciones a nivel de compilador en Rust que interactúan profundamente con la infraestructura de red y datos. No es un producto final de consumo masivo, sino una solución de co-desarrollo tecnológico corporativo.

### 2. RESTRICCIONES DE INSTALACIÓN (SOLO STAGING/DEV)
**Queda estrictamente prohibida la instalación directa del Software en servidores de producción (Production Environments) del Cliente.** 
El Cliente acepta que el despliegue del Software se realizará única y exclusivamente en:
- Entornos locales de prueba (Localhost/Laboratorios).
- Clústeres de réplica o Staging.
- Servidores no críticos sin exposición a transacciones financieras reales o bases de datos maestras no respaldadas.

TZANiX recomienda iniciar las pruebas ejecutando el contenedor bajo la variable de entorno `GATEWAY_MODE=AUDIT` para calibrar el algoritmo estadístico sin riesgo de interrupción de flujos de datos.

### 3. LICENCIA LIMITADA Y CADUCIDAD (33 DÍAS)
El acceso al Software se otorga bajo una licencia temporal, intransferible y no exclusiva por un período exacto de **33 días naturales** a partir de la firma de la llave JWT (JSON Web Token). Al término de este período, el motor de ejecución entrará en estado de bloqueo automático (Kill-Switch criptográfico). El Cliente no intentará modificar, aplicar ingeniería inversa, o alterar el reloj del sistema para evadir este mecanismo.

### 4. CLÁUSULA "TAL COMO ESTÁ" (AS IS) Y EXENCIÓN TOTAL DE RESPONSABILIDAD (ZERO-LIABILITY)
El Software se proporciona **"TAL COMO ESTÁ" (AS IS)**, sin garantía de ningún tipo, ya sea expresa o implícita, incluyendo, pero no limitado a, garantías de comerciabilidad, idoneidad para un propósito particular y no infracción. El Cliente acepta expresamente que cualquier cifra de rendimiento, latencia o ahorro en procesamiento (FinOps) compartida por TZANiX es estrictamente de "referencia interna" y no constituye una garantía de servicio o acuerdo de nivel de servicio (SLA).

**BAJO NINGUNA CIRCUNSTANCIA TZANiX O SUS DESARROLLADORES SERÁN RESPONSABLES POR:**
1. Pérdida, corrupción o alteración de datos.
2. Interrupción del negocio, caída de servidores o pérdida de ingresos.
3. Fallas en hardware (incluyendo colisión de drones o sobrecarga de clústeres).
4. Brechas de seguridad resultantes de vulnerabilidades previas en la red local del Cliente.

El Cliente asume toda la responsabilidad técnica, operativa y financiera derivada de someter a pruebas de estrés o integrar este Software en su arquitectura. Adicionalmente, el Cliente acepta que el despliegue de esta tecnología se realiza exclusivamente **bajo su propio riesgo en ambientes controlados**.

### 5. PROPIEDAD INTELECTUAL Y CONFIDENCIALIDAD
El código fuente original (Rust/C++) está protegido y ofuscado mediante binarios estáticos (Cython/LLVM). La extracción, descompilación o robo de los algoritmos tensoriales de TZANiX constituirá una violación directa de las leyes de secreto comercial y propiedad intelectual. Toda la telemetría métrica generada por el Software durante la prueba será compartida con TZANiX para la mejora continua del algoritmo.

---
**AL UTILIZAR EL SOFTWARE, EL CLIENTE ACEPTA HABER LEÍDO Y COMPRENDIDO ESTAS ADVERTENCIAS TÉCNICAS.**

*Si requiere una licencia Enterprise para producción con Acuerdos de Nivel de Servicio (SLA) y pólizas de seguro de responsabilidad civil, comuníquese con ventas@tzanix.com al finalizar su prueba de 33 días.*
