import React, { useState } from 'react';

export default function CompanyModals() {
  const [activeModal, setActiveModal] = useState(null);

  const modalsContent = {
    mision: {
      tag: 'PROPÓSITO CORPORATIVO // DEFENSA DE INFRAESTRUCTURA CRÍTICA',
      title: 'Nuestra Misión y Visión',
      body: (
        <div className="space-y-6 text-slate-300 leading-relaxed text-sm">
          <div className="p-5 bg-[#06090F] border-l-4 border-[#38BDF8]">
            <h4 className="text-[#38BDF8] font-mono text-xs uppercase tracking-widest mb-2">
              NUESTRA MISIÓN
            </h4>
            <p className="text-white text-base font-medium leading-relaxed">
              Erradicar el tiempo de inactividad y blindar las infraestructuras digitales más críticas del planeta (hospitales, sistemas financieros HFT, telecomunicaciones y centros de datos soberanos) mediante defensa cibernética determinista en silicio que neutraliza ataques en nanosegundos antes de que toquen el sistema operativo.
            </p>
          </div>

          <div className="p-5 bg-[#06090F] border-l-4 border-[#38BDF8]">
            <h4 className="text-[#38BDF8] font-mono text-xs uppercase tracking-widest mb-2">
              NUESTRA VISIÓN 2030
            </h4>
            <p className="text-white text-base font-medium leading-relaxed">
              Convertir la Arquitectura Tridente de TZANIX en el estándar mundial de seguridad en capa física (Fast-Path) integrado en cada tarjeta de red SmartNIC, DPU y switch de centro de datos, logrando una Internet inmune por diseño a ataques volumétricos y anomalías de Inteligencia Artificial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-[#06090F] border border-slate-800">
              <div className="text-xs font-mono text-[#38BDF8] uppercase mb-1">Determinismo Físico</div>
              <p className="text-xs text-slate-400">Cero recolector de basura, cero asignaciones en el Heap (#![no_std]) y latencia garantizada de 10.0 ns en FPGA.</p>
            </div>
            <div className="p-4 bg-[#06090F] border border-slate-800">
              <div className="text-xs font-mono text-[#38BDF8] uppercase mb-1">Precisión Matemática</div>
              <p className="text-xs text-slate-400">Entropía de Shannon en punto fijo Q16.16 combinada con análisis espectral Radix-2 FFT-16 en GPU.</p>
            </div>
            <div className="p-4 bg-[#06090F] border border-slate-800">
              <div className="text-xs font-mono text-[#38BDF8] uppercase mb-1">Inmunidad Colectiva</div>
              <p className="text-xs text-slate-400">Sincronización de estado vía RDMA RoCEv2 entre clústeres completos sin intervención de la CPU.</p>
            </div>
          </div>
        </div>
      )
    },
    privacidad: {
      tag: 'ARQUITECTURA ZERO-RETENTION // CUMPLIMIENTO HIPAA, PCI-DSS & GDPR',
      title: 'Privacidad por Diseño y Cumplimiento Normativo',
      body: (
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
          <p>
            En sectores altamente regulados como <strong className="text-white">Software Médico (HIPAA)</strong>, <strong className="text-white">Banca y Finanzas (PCI-DSS / SOC2)</strong> e infraestructura gubernamental, la privacidad de los datos en tránsito es innegociable.
          </p>
          <ul className="space-y-3 bg-[#06090F] p-5 border border-slate-800 font-mono text-xs">
            <li className="flex items-start space-x-3">
              <span className="text-[#38BDF8] font-bold">[01]</span>
              <span><strong>Zero-Payload Storage:</strong> TZANIX Æther-Core evalúa la distribución matemática de entropía y el espectro de frecuencias en registros volátiles de silicio (BRAM). Jamás almacena ni copia expedientes clínicos, claves privadas ni datos personales en disco.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-[#38BDF8] font-bold">[02]</span>
              <span><strong>Ejecución On-Premise Air-Gapped:</strong> El contenedor Docker y el bitstream FPGA operan 100% dentro del perímetro del cliente sin depender de nubes de terceros para tomar decisiones de bloqueo.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-[#38BDF8] font-bold">[03]</span>
              <span><strong>Auditoría Forense Certificada:</strong> Los reportes JSON generados documentan únicamente metadatos de red (IP atacante, ASN, vector de ataque, umbral CSR Q16.16 y marca de tiempo en nanosegundos) listos para auditorías regulatorias.</span>
            </li>
          </ul>
        </div>
      )
    },
    contacto: {
      tag: 'CANAL EJECUTIVO DIRECTO // INGENIERÍA & VENTAS ENTERPRISE',
      title: 'Contacto Directo & Despliegue de Pruebas de Concepto (PoC)',
      body: (
        <div className="space-y-5 text-slate-300 text-sm">
          <p>
            Nuestro equipo de arquitectura de silicio y ciberseguridad atiende directamente a directores de tecnología (CTO), oficiales de seguridad (CISO), hospitales, plataformas médicas y centros de datos para configurar demostraciones en vivo y despliegues en el mismo día.
          </p>

          <div className="bg-[#06090F] p-5 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:justify-between border-b border-slate-800 pb-2 gap-1">
              <span className="text-slate-500">CORREO DIRECTO DE INGENIERÍA Y LICENCIAS:</span>
              <a href="mailto:mmrobeerto@gmail.com" className="text-[#38BDF8] hover:underline font-bold">mmrobeerto@gmail.com</a>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between border-b border-slate-800 pb-2 gap-1">
              <span className="text-slate-500">LÍNEA DIRECTA / WHATSAPP EMPRESARIAL:</span>
              <a href="https://wa.me/526647247803" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#38BDF8] font-bold">+52 664 724 7803</a>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between border-b border-slate-800 pb-2 gap-1">
              <span className="text-slate-500">TIEMPO DE RESPUESTA INGENIERÍA (SLA):</span>
              <span className="text-[#38BDF8]">&lt; 2 Horas (Soporte Directo 24/7)</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <span className="text-slate-500">MODALIDADES DISPONIBLES:</span>
              <span className="text-white">Contenedor Docker / Librería C-FFI / Appliance FPGA+DPU</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <a
              href="mailto:mmrobeerto@gmail.com?subject=Solicitud%20de%20Licencia%20PoC%20TZANIX%20Aether-Core&body=Hola%20equipo%20TZANIX%2C%0A%0ANos%20interesa%20evaluar%20TZANIX%20Aether-Core%20en%20nuestra%20infraestructura.%0A%0AEmpresa%3A%20%0AServidores%20a%20proteger%3A%20%0ATel%C3%A9fono%3A%20"
              className="block w-full text-center py-3.5 bg-[#38BDF8] hover:bg-white text-[#06090F] font-mono font-bold text-xs uppercase tracking-widest transition"
            >
              Enviar Correo a Ingeniería
            </a>
            <a
              href="https://wa.me/526647247803?text=Hola%2C%20me%20interesa%20una%20demostraci%C3%B3n%20y%20licencia%20PoC%20de%20TZANIX%20Aether-Core%20para%20nuestro%20servidor."
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3.5 bg-[#06090F] hover:bg-slate-800 text-white border border-slate-700 font-mono font-bold text-xs uppercase tracking-widest transition"
            >
              Contactar por WhatsApp Directo
            </a>
          </div>
        </div>
      )
    }
  };

  return (
    <>
      {/* SECCIÓN VISIBLE EN PÁGINA: MISIÓN, VISIÓN, PRIVACIDAD Y CONTACTO ESTILO SPACEX */}
      <section id="corporate-dna" className="w-full py-28 px-5 sm:px-[4vw] bg-[#06090F] border-t border-slate-800/90 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-mono font-semibold tracking-[0.3em] uppercase text-[#38BDF8] mb-2">
                IDENTIDAD CORPORATIVA · GOBERNANZA · CONTACTO EJECUTIVO
              </p>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase text-white">
                MISIÓN, VISIÓN Y COMPROMISO SOBERANO
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 font-mono text-xs">
              <button
                onClick={() => setActiveModal('mision')}
                className="px-4 py-2 border border-slate-700 hover:border-[#38BDF8] text-slate-300 hover:text-white transition uppercase cursor-pointer"
              >
                Ver Manifiesto Completo
              </button>
              <button
                onClick={() => setActiveModal('privacidad')}
                className="px-4 py-2 border border-slate-700 hover:border-[#38BDF8] text-slate-300 hover:text-white transition uppercase cursor-pointer"
              >
                Política Zero-Retention
              </button>
            </div>
          </div>

          {/* 3 PILARES CORPORATIVOS VISIBLES (PALETA UNIFICADA) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-[#0B111E] border border-slate-800 p-8 space-y-4 hover:border-[#38BDF8]/60 transition-colors">
              <div className="text-xs font-mono font-semibold text-[#38BDF8] tracking-[0.25em] uppercase">
                01 // NUESTRA MISIÓN
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
                Defensa Determinista en Tiempo Real
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Proteger la continuidad operativa de hospitales, plataformas médicas, instituciones financieras y centros de datos eliminando ataques DDoS, botnets y anomalías de red en <strong className="text-white">10.0 nanosegundos</strong>, antes de que consuman un solo ciclo de CPU del servidor.
              </p>
            </div>

            <div className="bg-[#0B111E] border border-slate-800 p-8 space-y-4 hover:border-[#38BDF8]/60 transition-colors">
              <div className="text-xs font-mono font-semibold text-[#38BDF8] tracking-[0.25em] uppercase">
                02 // NUESTRA VISIÓN
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
                Estándar Global de Silicio Autónomo
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Liderar la transición mundial desde los firewalls de software lentos hacia la <strong className="text-white">Arquitectura Tridente en Silicio (FPGA + GPU + RDMA)</strong>, dotando a cada infraestructura crítica de inmunidad colectiva instantánea y cero falsos positivos.
              </p>
            </div>

            <div className="bg-[#0B111E] border border-slate-800 p-8 space-y-4 hover:border-[#38BDF8]/60 transition-colors">
              <div className="text-xs font-mono font-semibold text-[#38BDF8] tracking-[0.25em] uppercase">
                03 // FILOSOFÍA ZERO-RETENTION
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
                Privacidad Absoluta (HIPAA &amp; PCI-DSS)
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Inspeccionamos la física matemática del paquete (entropía Q16.16 y espectro FFT-16) sin almacenar jamás datos confidenciales ni historiales médicos. Cumplimiento nativo para auditorías <strong className="text-white">SOC2 Type II, ISO-27001 y HIPAA</strong>.
              </p>
            </div>
          </div>

          {/* BLOQUE DE CONTACTO EJECUTIVO DIRECTO */}
          <div id="contacto" className="bg-[#0B111E] border border-slate-800 p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 scroll-mt-24">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#38BDF8] uppercase tracking-[0.25em]">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                <span>ATENCIÓN DIRECTA A EMPRESAS, HOSPITALES Y CENTROS DE DATOS</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
                ¿LISTO PARA BLINDAR TU INFRAESTRUCTURA HOY MISMO?
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Agenda una demostración técnica en vivo o solicita tu licencia PoC de 14 días para desplegar <strong className="text-white">TZANIX Æther-Core</strong> en tus servidores en menos de 5 minutos.
              </p>
              <div className="pt-2 flex flex-wrap gap-6 font-mono text-xs text-slate-300">
                <span>CORREO: <strong className="text-[#38BDF8]">mmrobeerto@gmail.com</strong></span>
                <span>TEL / WHATSAPP: <strong className="text-white">+52 664 724 7803</strong></span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <a
                href="mailto:mmrobeerto@gmail.com?subject=Solicitud%20Comercial%20TZANIX%20Aether-Core"
                className="btn-spacex text-center justify-center"
              >
                <span>CONTACTAR POR CORREO &rarr;</span>
              </a>
              <button
                onClick={() => setActiveModal('contacto')}
                className="btn-spacex !border-[#38BDF8] !text-[#38BDF8] hover:!bg-[#38BDF8] hover:!text-[#06090F] text-center justify-center"
              >
                <span>ABRIR FICHA DE CONTACTO</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* MODAL FLOTANTE PARA DETALLES */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#0B111E] border border-slate-700 p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-mono text-xs px-2.5 py-1 border border-slate-700 cursor-pointer"
            >
              [ESC / CERRAR]
            </button>

            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#38BDF8]">
                {modalsContent[activeModal].tag}
              </span>
              <h3 className="text-2xl font-bold text-white border-b border-slate-800 pb-3 uppercase">
                {modalsContent[activeModal].title}
              </h3>
              <div className="pt-2">{modalsContent[activeModal].body}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
