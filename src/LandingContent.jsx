import React from 'react';

export default function LandingContent() {
  return (
    <section className="p-6 max-w-5xl mx-auto">
      {/* Navigation links */}
      <nav className="flex flex-wrap gap-4 text-sm mb-4">
        <a href="https://www.tzanix.com/#hero" className="text-blue-500 hover:underline">ÆTHER-CORE</a>
        <a href="https://www.tzanix.com/#el-motor" className="text-blue-500 hover:underline">EL MOTOR (~219 NS)</a>
        <a href="https://www.tzanix.com/#modo-sombra" className="text-blue-500 hover:underline">MODO SOMBRA</a>
        <a href="https://www.tzanix.com/#rendimiento" className="text-blue-500 hover:underline">RENDIMIENTO Y BENCHMARKS</a>
        <a href="https://www.tzanix.com/#isps-hosters" className="text-blue-500 hover:underline">ISPS Y HOSTERS</a>
        <a href="https://www.tzanix.com/#contacto" className="text-blue-500 hover:underline">CONTACTO</a>
      </nav>

      <h2 className="text-xl font-semibold mb-2">TZANIX SIGNAL TECHNOLOGIES // NAVEGACIÓN EJECUTIVA</h2>

      <nav className="flex flex-wrap gap-4 text-sm mb-6">
        <a href="https://www.tzanix.com/#el-motor" className="text-blue-500 hover:underline">EL MOTOR (~219 NS)</a>
        <a href="https://www.tzanix.com/#modo-sombra" className="text-blue-500 hover:underline">MODO SOMBRA</a>
        <a href="https://www.tzanix.com/#rendimiento" className="text-blue-500 hover:underline">RENDIMIENTO Y BENCHMARKS</a>
        <a href="https://www.tzanix.com/#isps-hosters" className="text-blue-500 hover:underline">ISPS Y HOSTERS</a>
        <a href="https://www.tzanix.com/#contacto" className="text-blue-500 hover:underline">CONTACTO EJECUTIVO</a>
        <a href="https://www.tzanix.com/#pricing" className="text-blue-500 hover:underline">DESPLEGAR CONTENEDOR PoC →</a>
      </nav>

      <p className="mb-4 font-medium">ARQUITECTURA TRIDENTE // DEFENSA CIBERNÉTICA DE SILICIO</p>
      <h3 className="text-2xl font-bold mb-2">TZANIX ÆTHER-CORE 219 NS POR PAQUETE</h3>
      <p className="mb-4">
        Los firewalls tradicionales tardan milisegundos y colapsan la CPU bajo ataques volumétricos.{' '}
        <strong className="text-white">TZANIX Æther-Core</strong> opera directamente en el silicio y en el acceso de red (#![no_std], Zero-Heap),
        procesando{' '}
        <strong className="text-white">16.86 Millones de paquetes por segundo</strong> para neutralizar ataques DDoS y botnets periódicas con{' '}
        <strong className="text-white">0.00% de falsos positivos</strong>.
      </p>

      <h4 className="text-lg font-semibold mb-2">DESPLIEGUE SELF‑SERVICE // MODALIDAD I: AGENTE NATIVO LINUX (CENTOS / ALMALINUX) & CONTENEDOR DOCKER</h4>
      <ul className="list-disc pl-5 mb-4">
        <li>Descarga Directa: Script Nativo Linux (CentOS/AlmaLinux) o Docker</li>
        <li>Para VPS compartidos sin hardware FPGA, descarga el Instalador Nativo Estático (install-tzanix-linux.sh) que se integra con CSF/LFD e iptables sin depender de Docker ni de librerías del sistema operativo, o descarga el archivo docker-compose.yml.</li>
        <li>STATIC MUSL // ZERO‑DEPS</li>
      </ul>

      <ol className="list-decimal pl-5 space-y-2 mb-4">
        <li>
          Registra tu Organización para emitir tu Licencia Piloto de 14 Días (Vence: 2026-11-17):
          <br />
          <a href="#" className="text-blue-500 hover:underline">Generar Licencia Piloto →</a>
        </li>
        <li>
          Tu Clave Criptográfica de 14 Días (TZANIX_LICENSE_KEY · Expira 2026-11-17):
          <br />
          <code>tzanix_poc14d_1794947791_99f8a7b6c5d4</code>
        </li>
        <li>
          <a href="#" className="text-blue-500 hover:underline">⬇ Descargar Script Nativo (CentOS / AlmaLinux)</a>
          {' '}|{' '} <a href="#" className="text-blue-500 hover:underline">⬇ Descargar docker-compose.yml</a>
        </li>
        <li>
          <p className="font-medium">Ejecución en tu Servidor VPS (CentOS / AlmaLinux / Ubuntu) o Contenedor:</p>
          <pre className="bg-gray-800 text-gray-100 p-2 rounded">
            # OPCIÓN A: Instalación Nativa en VPS (CentOS / AlmaLinux / Ubuntu) SIN DOCKER
            chmod +x install-tzanix-linux.sh
            sudo ./install-tzanix-linux.sh

            # Ver en vivo quién intenta atacar tu servidor (IP, Vector y Estado de Bloqueo):
            tzanix‑status

            # OPCIÓN B: Despliegue mediante Contenedor Docker (levanta Consola SOC en puerto :8000)
            docker compose up -d
          </pre>
        </li>
      </ol>

      <h4 className="text-lg font-semibold mb-2">IDENTIDAD CORPORATIVA · ARQUITECTURA ZERO‑RETENTION · CONTACTO DIRECTO</h4>
      <p className="mb-2"><strong>MISIÓN, VISIÓN Y PRIVACIDAD POR DISEÑO</strong></p>
      <a href="#" className="text-blue-500 hover:underline">Ver Manifiesto Completo</a>

      <h5 className="mt-6 font-semibold">01 // NUESTRA MISIÓN</h5>
      <p className="mb-2">Defensa Determinista en Tiempo Real – Proteger la continuidad operativa de servidores VPS, plataformas SaaS, portales web, APIs corporativas y centros de datos filtrando ataques DDoS, botnets y anomalías de red en nanosegundos antes de que saturen la CPU del servidor.</p>

      <h5 className="font-semibold">02 // NUESTRA VISIÓN</h5>
      <p className="mb-2">Seguridad Universal de Ultra‑Baja Latencia – Evolucionar desde los firewalls tradicionales hacia la Arquitectura Tridente (FPGA + GPU + RDMA y Agentes Estáticos Linux), brindando a cualquier servidor o infraestructura detección matemática ultrarrápida con cero falsos positivos.</p>

      <h5 className="font-semibold">03 // FILOSOFÍA ZERO‑RETENTION</h5>
      <p className="mb-4">Privacidad en Tránsito (Cero Datos Guardados) – Nuestro motor evalúa únicamente la física matemática del paquete (entropía Q16.16 y espectro FFT‑16) en memoria volátil, sin almacenar jamás el contenido privado de tus peticiones, contraseñas ni información confidencial de tus usuarios.</p>

      <p className="font-medium mb-2">ATENCIÓN DIRECTA A EMPRESAS, SERVIDORES VPS Y CENTROS DE DATOS</p>
      <p className="font-bold mb-2">¿LISTO PARA BLINDAR TU INFRAESTRUCTURA HOY MISMO?</p>
      <p className="mb-2">Agenda una demostración técnica en vivo o genera tu licencia piloto de 14 días para desplegar TZANIX Æther‑Core en tus servidores en menos de 5 minutos.</p>
      <p className="mb-2">Correo: <a href="mailto:mmrobeerto@gmail.com" className="text-blue-500 hover:underline">mmrobeerto@gmail.com</a></p>
      <p>Tel / WhatsApp: +52 664 724 7803</p>
      <a href="mailto:mmrobeerto@gmail.com?subject=Solicitud%20Comercial%20TZANIX%20Aether-Core" className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        CONTACTAR POR CORREO →
      </a>
    </section>
  );
}
