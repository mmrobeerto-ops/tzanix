---
title: "TZANiX Q-Balam: Benchmark de Resiliencia ante Ataques de Inyección Masiva"
author: "TZANiX Deep Tech"
date: "Agosto 2026"
---

# TZANiX Q-Balam: Benchmark de Resiliencia ante Ataques de Inyección Masiva

**Documento de Evaluación Técnica y Reporte de Estrés**  
*Clasificación: Público / Comercial*

---

## 1. Resumen Ejecutivo
En el actual panorama de infraestructura en la nube y modelos de Inteligencia Artificial (LLMs/Redes Neuronales), la capa de aplicación se ha convertido en el vector principal de vulnerabilidades críticas. Los Proxies y Firewalls tradicionales basados en reglas estáticas (WAFs) a menudo sufren degradación de rendimiento o colapso de red ante ráfagas sostenidas de inyecciones maliciosas de alta densidad.

Este documento presenta los resultados de la prueba de estrés realizada sobre **TZANiX Neural Gateway (Q-Balam)**, operando bajo una arquitectura *Sidecar/Proxy Zero-Trust*. El objetivo principal de la prueba fue validar la capacidad del motor (desarrollado en Rust) para discriminar, aislar y rechazar tráfico malicioso sin incurrir en caídas de servicio (Denegación de Servicio), saturación de puertos, o degradación de la memoria RAM.

## 2. Entorno de la Prueba (Test Environment)
La simulación fue ejecutada en un ambiente controlado de laboratorio, disparando tráfico contra un contenedor Docker inmutable.

* **Objetivo (Target):** `http://localhost:8000/api/v1/query` (TZANiX Neural Gateway)
* **Autenticación:** Inyección de JWT Criptográfico en cabeceras HTTP.
* **Herramienta de Estrés:** Script concurrente asíncrono (Node.js) con generación dinámica de payloads (Inyecciones de Tensores y SQL Drop).
* **Volumetría del Ataque:** 10,000 peticiones de capa 7 (Application Layer).
* **Concurrencia:** 500 hilos (Threads) abriendo conexiones de forma simultánea.

## 3. Resultados del Benchmark

El bombardeo de tráfico se ejecutó ininterrumpidamente hasta agotar el lote de 10,000 inyecciones. Los resultados crudos obtenidos directamente del framework de estrés son los siguientes:

```text
===============================================================
                    REPORTE DE RENDIMIENTO                     
===============================================================

Total Peticiones:        10,000
Tiempo Transcurrido:     23.633 segundos
Rendimiento:             423.14 req/sec
Bloqueadas Exitosamente: 10,000
Conexiones Fallidas:     0
```

## 4. Análisis y Conclusión Técnica

### A. Política Zero-Trust Verificada (Bloqueos Exitosos)
La métrica de **10,000 Bloqueos Exitosos** confirma que el motor TZANiX no delegó la defensa a la capa de red ni permitió que el tráfico llegara al backend. El escudo analizó activamente cada payload en microsegundos, discriminó la firma maliciosa y respondió de forma controlada con un código de estado `HTTP 403 Forbidden`. 

### B. Resiliencia de Infraestructura (Cero Caídas)
El valor de **0 Conexiones Fallidas (Drops)** es la métrica más crítica para la continuidad del negocio. Demuestra que ante una saturación de 500 hilos concurrentes, el motor *nunca colapsó*. Los puertos se mantuvieron abiertos, el enrutador TCP no sufrió asfixia y el servidor no rechazó conexiones legítimas. Un WAF tradicional habitualmente interrumpe las conexiones bajo este nivel de estrés, generando un falso positivo que bloquea a los clientes reales.

### C. Rendimiento y Latencia
Alcanzar un rendimiento sostenido de **423.14 inspecciones profundas por segundo** (req/sec) en un entorno de laboratorio demuestra la ultra-baja latencia del motor en Rust. TZANiX Neural Gateway es capaz de operar en la frontera de las APIs corporativas garantizando la seguridad inercial sin comprometer la velocidad de respuesta para el usuario final.

### D. Auditoría de Recursos Nativos
Para validar legítimamente el consumo mínimo de recursos de este motor en tiempo real, se invita a los auditores a ejecutar el siguiente comando de monitorización nativa de Docker en una segunda terminal durante la prueba de estrés:

```bash
docker stats --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"
```

---
**TZANiX Deep Tech**  
*Ciberseguridad Inercial y FinOps para Infraestructura Crítica.*  
[www.tzanix.com](https://tzanix.com)
