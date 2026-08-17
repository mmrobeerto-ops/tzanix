# CUESTIONARIO TÉCNICO DE SEGURIDAD PARA PROVEEDORES (VSAQ / SIG)
**TZANiX SIGNAL TECHNOLOGIES - VERSIÓN 1.0**

Este documento proporciona respuestas estándar a los departamentos de TI, Compras y Seguridad de la Información (CISO) para agilizar la revisión técnica de las soluciones Q-Balam, Neural Gateway y Singularity Core.

---

## 1. ARQUITECTURA Y DISEÑO (SECURITY BY DESIGN)

**1.1. ¿En qué lenguajes y tecnologías principales está construido el software?**
Todo el núcleo de procesamiento matemático y criptográfico está desarrollado en **Rust** para garantizar seguridad de memoria (memory-safety) e inmunidad contra ataques de desbordamiento de búfer. El Gateway se empaqueta en imágenes contenedoras ligeras (Docker) bajo sistemas operativos minimalistas.

**1.2. ¿El software requiere acceso a Internet para funcionar?**
**No.** Los motores de TZANiX están diseñados para operar en modo "Air-Gapped" (aislados de Internet). La única validación criptográfica ocurre localmente mediante la verificación RSA-256 de la llave JWT inyectada durante el despliegue.

**1.3. ¿Qué datos personales (PII) o financieros recolecta y almacena el sistema?**
**Ninguno.** TZANiX aplica un modelo estricto de **Zero-Retention**. Todo el procesamiento de datos, análisis de entropía (Shannon) y filtrado MAD ocurre en memoria volátil (RAM). Los motores no graban el contenido de las peticiones en discos ni envían los datos a servidores externos.

## 2. DESPLIEGUE Y OPERACIÓN

**2.1. ¿Cómo se entrega el software?**
Se entrega a través de imágenes selladas descargables desde nuestro registro privado (GHCR) o mediante binarios precompilados estáticos (`.so` / `.elf`).

**2.2. ¿El software interrumpe el tráfico legítimo en caso de fallo?**
**No.** Todos los contenedores de TZANiX incluyen por diseño un mecanismo **Fail-Open**. Si el proceso experimenta una falta de memoria extrema o se detiene, el tráfico se redirigirá automáticamente a la infraestructura original para evitar cualquier caída en la operación del cliente.

**2.3. ¿Cómo se mitiga el riesgo de caídas durante la integración inicial?**
TZANiX requiere que la primera fase de integración se realice habilitando la variable de entorno `GATEWAY_MODE=AUDIT`. En este modo, el sistema observará el tráfico y emitirá alertas sin aplicar bloqueos activos, otorgando un periodo de 14 a 30 días para calibración estadística antes de activar el Kill-Switch.

## 3. CUMPLIMIENTO NORMATIVO Y AUDITORÍA

**3.1. ¿Cuentan con certificaciones SOC 2 o ISO 27001 / ISO 42001?**
Nuestra arquitectura ha sido construida desde el primer día respetando rigurosamente los controles técnicos exigidos por SOC 2 y las normativas de Gobernanza de IA (ISO/IEC 42001 y EU AI Act). Actualmente, nos encontramos en proceso formal de certificación SOC 2 Tipo I mediante auditoría de terceros.

**3.2. ¿Proporcionan transparencia sobre las librerías de terceros (Software Supply Chain Security)?**
**Sí.** Para todas nuestras implementaciones empresariales, entregamos un **SBOM (Software Bill of Materials)** detallado que permite a sus equipos de seguridad auditar todas las dependencias estáticas y garantizar que no existen vulnerabilidades conocidas en la cadena de suministro de nuestro código.

**3.3. ¿Tienen un programa de gestión de vulnerabilidades?**
Sí, los binarios atraviesan validación continua (CI/CD) antes del empaquetado, mitigando vectores clásicos y asegurando que las imágenes finales no contengan herramientas adicionales (distroless) que un atacante pudiera utilizar.

---
*Para consultas adicionales de seguridad o para solicitar el acceso a nuestro SBOM, por favor contacte a su ingeniero asignado durante la Evaluación Técnica Guiada.*
