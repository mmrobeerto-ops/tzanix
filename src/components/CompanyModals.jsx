import React, { useState, useEffect } from 'react';
import { ShieldAlert, EyeOff, Lock, FileKey2, Rocket, Target, Zap, X, Mail, Phone, Globe } from 'lucide-react';

const CompanyModals = () => {
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => setActiveModal(null);

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeModal();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [activeModal]);

  return (
    <section id="corporate-dna" className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-20 border-t border-white/10 space-y-16">
      {/* SECCIÓN VISIBLE DE MISIÓN, VISIÓN, VALORES Y CONTACTO EJECUTIVO ESTILO SPACEX */}
      <div className="border-b border-white/20 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-mono font-bold tracking-[0.35em] uppercase text-[#00F0FF] mb-2">
            CORPORATIVO // SOBERANÍA TECNOLÓGICA
          </p>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase text-white">
            MISIÓN, VISIÓN Y GOBERNANZA
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setActiveModal('mission')}
            className="btn-spacex text-xs"
          >
            <span>ADN CORPORATIVO DETALLADO</span>
          </button>
          <button
            onClick={() => setActiveModal('privacy')}
            className="btn-spacex !border-white/30 text-white/80 text-xs"
          >
            <span>POLÍTICA ZERO-RETENTION</span>
          </button>
        </div>
      </div>

      {/* Tarjetas Visibles de Misión, Visión y Valores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#141419] border border-[#2A2A35] p-8 space-y-4 hover:border-[#00F0FF]/50 transition">
          <div className="flex items-center gap-3 text-[#00F0FF]">
            <Target className="w-6 h-6" />
            <h3 className="text-lg font-black uppercase tracking-wider text-white">Nuestra Misión</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed font-light">
            Blindar la infraestructura crítica mundial a la velocidad física de la luz en el silicio. Desarrollamos motores deterministas de defensa cibernética (<strong>TZANiX Æther-Core</strong>) que erradican ataques DDoS volumétricos y botnets sigilosas en <strong>10.0 nanosegundos</strong>, garantizando continuidad operativa absoluta con <strong>0.00% de falsos positivos</strong>.
          </p>
        </div>

        <div className="bg-[#141419] border border-[#2A2A35] p-8 space-y-4 hover:border-[#D4AF37]/60 transition">
          <div className="flex items-center gap-3 text-[#FFB703]">
            <Rocket className="w-6 h-6" />
            <h3 className="text-lg font-black uppercase tracking-wider text-white">Nuestra Visión</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed font-light">
            Convertir a <strong>TZANiX</strong> en el estándar global de defensa autónoma en el <em>Fast-Path</em> para centros de datos, instituciones financieras (HFT/FinTech), redes hospitalarias y telecomunicaciones, reemplazando los firewalls lentos basados en sistema operativo por inteligencia matemática en FPGA, GPU y RDMA.
          </p>
        </div>

        <div className="bg-[#141419] border border-[#2A2A35] p-8 space-y-4 hover:border-[#00FF66]/50 transition">
          <div className="flex items-center gap-3 text-[#00FF66]">
            <Zap className="w-6 h-6" />
            <h3 className="text-lg font-black uppercase tracking-wider text-white">Filosofía Zero-Retention</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed font-light">
            La forma más segura de proteger los datos de una corporación es nunca almacenarlos. Nuestro motor opera 100% en registros de silicio y memoria volátil (<code>#![no_std]</code>, Zero-Heap), inspeccionando la geometría y entropía de cada paquete sin tocar jamás la privacidad del payload del cliente.
          </p>
        </div>
      </div>

      {/* Bloque Directo de Contacto Ejecutivo & Adquisición B2B */}
      <div id="contacto" className="bg-gradient-to-r from-[#141419] via-[#0E131F] to-[#141419] border border-[#00F0FF]/40 p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-[0_0_50px_rgba(0,240,255,0.08)]">
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-[#00F0FF]">
            CONTACTO CORPORATIVO // LICENCIAMIENTO ENTERPRISE &amp; APPLIANCES
          </span>
          <h3 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
            BLINDA TU INFRAESTRUCTURA HOY MISMO
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Agenda una demostración técnica en vivo con ingeniería, solicita una Prueba de Concepto (PoC) guiada en tus servidores o cotiza licencias anuales para Docker, SmartNIC NVIDIA BlueField y tarjetas FPGA.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-auto font-mono text-xs">
          <a
            href="mailto:mmrobeerto@gmail.com?subject=Solicitud%20PoC%20Enterprise%20-%20TZANiX%20Aether-Core"
            className="flex items-center justify-center gap-3 px-6 py-4 bg-[#00F0FF] text-black font-bold uppercase tracking-widest hover:brightness-110 transition shadow-[0_0_20px_rgba(0,240,255,0.35)]"
          >
            <Mail className="w-4 h-4" />
            <span>mmrobeerto@gmail.com</span>
          </a>
          <a
            href="https://wa.me/526647247803?text=Hola,%20me%20interesa%20una%20demo%20corporativa%20de%20TZANiX%20Aether-Core"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-6 py-4 border border-white/30 bg-black/70 text-white font-bold uppercase tracking-widest hover:border-[#00FF66] hover:text-[#00FF66] transition"
          >
            <Phone className="w-4 h-4" />
            <span>LÍNEA DIRECTA: +52 664 724 7803</span>
          </a>
        </div>
      </div>

      {/* MODAL OVERLAY */}
      {activeModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col border border-white/20 bg-zinc-950 shadow-[0_0_60px_rgba(0,240,255,0.15)] rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/90">
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#00F0FF] uppercase">
                {activeModal === 'mission' ? 'ADN TZANiX // ARQUITECTURA TRIDENTE' : 'GOBERNANZA DE DATOS // ZERO-KNOWLEDGE'}
              </span>
              <button
                onClick={closeModal}
                className="p-1.5 text-white/70 hover:text-[#FF3366] rounded-full transition"
                aria-label="Cerrar ventana"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
              {activeModal === 'mission' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3 bg-black/60 p-6 border border-white/10 rounded-lg">
                      <h3 className="text-lg font-bold text-[#00F0FF] uppercase">Misión Institucional</h3>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-mono">
                        Erradicar la latencia y la vulnerabilidad en las redes críticas del planeta mediante motores matemáticos deterministas en Rust (#![no_std]) y silicio (FPGA/GPU/RDMA), bloqueando ataques en 10.0 nanosegundos con cero falsos positivos.
                      </p>
                    </div>
                    <div className="space-y-3 bg-black/60 p-6 border border-white/10 rounded-lg">
                      <h3 className="text-lg font-bold text-[#FFB703] uppercase">Visión Tecnológica</h3>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-mono">
                        Liderar la transición global desde firewalls de software obsoletos hacia la Arquitectura Tridente: defensa autónoma en línea donde cada paquete se valida a velocidad de cable y cada clúster comparte inmunidad instantánea en microsegundos.
                      </p>
                    </div>
                  </div>
                  <div className="p-6 bg-black/60 border border-white/10 rounded-lg font-mono text-xs text-slate-300 space-y-2">
                    <div className="text-white font-bold uppercase">Contacto Comercial y Alianzas Estratégicas:</div>
                    <div>• Email Oficial: <span className="text-[#00F0FF]">mmrobeerto@gmail.com</span></div>
                    <div>• Dominio Oficial: <span className="text-[#00FF66]">https://www.tzanix.com</span></div>
                  </div>
                </div>
              )}

              {activeModal === 'privacy' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-xl border border-white/10 bg-black/50 space-y-2">
                      <div className="flex items-center gap-2 text-[#FF3366] font-bold text-sm">
                        <EyeOff className="w-5 h-5" />
                        <span>Conocimiento Cero (Zero-Knowledge)</span>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        TZANiX Æther-Core evalúa tensores de cabeceras y entropía de Shannon en registros de CPU/FPGA sin almacenar ni inspeccionar datos privados de tus usuarios o pacientes.
                      </p>
                    </div>
                    <div className="p-6 rounded-xl border border-white/10 bg-black/50 space-y-2">
                      <div className="flex items-center gap-2 text-[#00F0FF] font-bold text-sm">
                        <Lock className="w-5 h-5" />
                        <span>Ejecución Determinista sin Heap</span>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        Diseñado bajo estrictas directivas <code>#![no_std]</code> y memoria estática alineada a caché L1 (64 bytes), eliminando fugas de memoria y vulnerabilidades de desbordamiento.
                      </p>
                    </div>
                    <div className="p-6 rounded-xl border border-white/10 bg-black/50 space-y-2">
                      <div className="flex items-center gap-2 text-[#00FF66] font-bold text-sm">
                        <ShieldAlert className="w-5 h-5" />
                        <span>Soberanía On-Premise &amp; Cloud</span>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        Se despliega íntegramente dentro de tu propio servidor o centro de datos. Ninguna métrica ni paquete sale hacia nubes de terceros.
                      </p>
                    </div>
                    <div className="p-6 rounded-xl border border-white/10 bg-black/50 space-y-2">
                      <div className="flex items-center gap-2 text-[#FFB703] font-bold text-sm">
                        <FileKey2 className="w-5 h-5" />
                        <span>Auditoría Forense SOC2 / ISO-27001 / HIPAA</span>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        Generación instantánea de reportes forenses JSON firmados con ID de incidente, ASN, GeoIP y taxonomía del vector bloqueado para cumplimiento regulatorio.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CompanyModals;
