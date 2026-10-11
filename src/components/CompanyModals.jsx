import React, { useState, useEffect } from 'react';
import { ShieldAlert, EyeOff, Lock, FileKey2, Rocket, Target, Zap, X } from 'lucide-react';

const CompanyModals = () => {
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => setActiveModal(null);

  // Bloquear el scroll del body y permitir cerrar con tecla Escape
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
    <section className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:py-12 border-t border-cyan-500/10">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
        <button 
          onClick={() => setActiveModal('mission')}
          className="btn-spacex w-full sm:w-auto text-center"
        >
          <span>Misión, Visión y Valores</span>
        </button>
        <button 
          onClick={() => setActiveModal('privacy')}
          className="btn-spacex !border-white/30 text-white/70 w-full sm:w-auto text-center"
        >
          <span>Privacidad y Seguridad</span>
        </button>
      </div>

      {/* MODAL OVERLAY */}
      {activeModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl animate-fadeIn"
          onClick={closeModal}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[88vh] flex flex-col border border-white/20 bg-zinc-950 shadow-[0_0_60px_rgba(0,240,255,0.12)] rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Header Sticky con botón de cerrar siempre accesible */}
            <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-white/10 bg-black/90 backdrop-blur z-20">
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-tzCyan uppercase">
                {activeModal === 'mission' ? 'ADN TZANiX // CORPORATIVO' : 'DATA GOVERNANCE // ZERO-KNOWLEDGE'}
              </span>
              <button 
                onClick={closeModal}
                className="p-1.5 text-white/70 hover:text-[#ff0055] hover:bg-white/5 rounded-full transition-all focus:outline-none"
                aria-label="Cerrar ventana"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Contenido scrolleable con scrollbar estilizado */}
            <div className="overflow-y-auto p-5 sm:p-10 custom-scrollbar space-y-8">

              {/* CONTENIDO: MISIÓN, VISIÓN Y VALORES */}
              {activeModal === 'mission' && (
                <div className="space-y-10">
                  <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">ADN TZANiX</h2>
                    <div className="w-20 h-1 bg-tzCyan mx-auto mt-3 shadow-[0_0_15px_#00f0ff]"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-3 bg-black/40 p-5 sm:p-6 border border-white/10 rounded-lg">
                      <div className="flex items-center space-x-3 text-tzCyan">
                        <Target className="w-5 h-5 sm:w-6 sm:h-6" />
                        <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider">Nuestra Misión</h3>
                      </div>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-mono">
                        Proteger y optimizar la infraestructura crítica global. Construimos soluciones de ciberseguridad L7 y FinOps que combinan la agilidad orquestal de Python con el rendimiento puro de Rust a nivel hardware. Ayudamos a las corporaciones a destruir el tráfico basura antes de que consuma sus recursos, garantizando la continuidad del negocio con Cero Falsos Positivos.
                      </p>
                    </div>
                    <div className="space-y-3 bg-black/40 p-5 sm:p-6 border border-white/10 rounded-lg">
                      <div className="flex items-center space-x-3 text-tzCyan">
                        <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />
                        <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider">Nuestra Visión</h3>
                      </div>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-mono">
                        Ser el estándar corporativo (Enterprise Deep-Tech) en ciberseguridad inercial y eficiencia Cloud. Aspiramos a un internet donde los ataques se neutralicen en microsegundos (Shadow Mode), logrando que las empresas paguen solo por el procesamiento de clientes reales (Zero-Waste CPU).
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6 pt-6 border-t border-cyan-500/20">
                    <div className="flex items-center justify-center space-x-3 text-tzCyan">
                      <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                      <h3 className="text-base sm:text-lg font-bold uppercase tracking-widest">Valores Centrales</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
                      <div className="p-4 bg-cyan-950/20 rounded border border-cyan-500/10">
                        <h4 className="text-white font-bold text-sm mb-2">Shadow Mode (Cero Riesgos)</h4>
                        <p className="text-[11px] sm:text-xs text-slate-400 font-mono">Despliegue seguro en Modo Auditoría que vigila sin romper la producción. 0% Falsos Positivos.</p>
                      </div>
                      <div className="p-4 bg-cyan-950/20 rounded border border-cyan-500/10">
                        <h4 className="text-white font-bold text-sm mb-2">FinOps & Ahorro Cloud</h4>
                        <p className="text-[11px] sm:text-xs text-slate-400 font-mono">Bloquear anomalías de red en 0.56ms para reducir hasta 80% los costos de CPU y facturación de la nube.</p>
                      </div>
                      <div className="p-4 bg-cyan-950/20 rounded border border-cyan-500/10">
                        <h4 className="text-white font-bold text-sm mb-2">Soberanía Zero-Trust</h4>
                        <p className="text-[11px] sm:text-xs text-slate-400 font-mono">La mejor forma de proteger un dato es procesarlo en RAM (Stateless) y destruirlo en nanosegundos. Cero retención.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CONTENIDO: PRIVACIDAD Y SEGURIDAD */}
              {activeModal === 'privacy' && (
                <div className="space-y-8 sm:space-y-10">
                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-950/20 text-red-400 text-[10px] sm:text-xs font-mono shadow-[0_0_15px_rgba(255,0,60,0.1)]">
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>ZERO-KNOWLEDGE DATA GOVERNANCE</span>
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                      Soberanía y Privacidad de Datos
                    </h2>
                    <p className="text-slate-400 font-mono text-xs sm:text-sm leading-relaxed">
                      Nuestros sidecars y firewalls L7 están diseñados bajo la filosofía <strong>Zero-Retention</strong>. Tu infraestructura, tus llaves, tus datos.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Puntos Clave de Privacidad */}
                    <div className="glass-panel p-5 sm:p-6 rounded-xl border-l-2 border-l-red-500/50 bg-black/40">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-red-950/30 rounded text-red-400 flex-shrink-0"><EyeOff className="w-5 h-5 sm:w-6 sm:h-6" /></div>
                        <div>
                          <h3 className="text-sm font-bold text-white mb-2">Arquitectura de Conocimiento Cero</h3>
                          <p className="text-slate-400 text-xs leading-relaxed">
                            Procesadores de seguridad corriendo 100% en RAM. <strong>No almacenamos peticiones, no entrenamos modelos, ni monetizamos</strong> tus datos.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="glass-panel p-5 sm:p-6 rounded-xl border-l-2 border-l-cyan-500/50 bg-black/40">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-cyan-950/30 rounded text-tzCyan flex-shrink-0"><Lock className="w-5 h-5 sm:w-6 sm:h-6" /></div>
                        <div>
                          <h3 className="text-sm font-bold text-white mb-2">Procesamiento Volátil</h3>
                          <p className="text-slate-400 text-xs leading-relaxed">
                            Ejecución a nivel de Kernel en memoria contigua garantizando <strong>Zero-Memory Leaks</strong>. Telemetría de ataques guardada solo en tu servidor local.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="glass-panel p-5 sm:p-6 rounded-xl border-l-2 border-l-cyan-500/50 bg-black/40">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-cyan-950/30 rounded text-tzCyan flex-shrink-0"><ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6" /></div>
                        <div>
                          <h3 className="text-sm font-bold text-white mb-2">Soberanía & Despliegue Aislado</h3>
                          <p className="text-slate-400 text-xs leading-relaxed">
                            En formato Reverse Proxy, Sidecar o Docker, tú mantienes el control absoluto. Ningún dato sensible abandona tu red interna.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="glass-panel p-5 sm:p-6 rounded-xl border-l-2 border-l-cyan-500/50 bg-black/40">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-cyan-950/30 rounded text-tzCyan flex-shrink-0"><FileKey2 className="w-5 h-5 sm:w-6 sm:h-6" /></div>
                        <div>
                          <h3 className="text-sm font-bold text-white mb-2">Estándares & Cumplimiento</h3>
                          <p className="text-slate-400 text-xs leading-relaxed">
                            Arquitectura <strong>Zero-Retention</strong> diseñada para ser compatible con GDPR y blindar las auditorías de SOC 2 e ISO 27001 de tus servidores.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center p-5 sm:p-6 glass-panel rounded-xl bg-gradient-to-b from-transparent to-cyan-950/20 border-b border-cyan-500/30 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-1 bg-tzCyan shadow-[0_0_20px_#00f0ff]"></div>
                    <h3 className="text-base sm:text-lg font-black metallic-text mb-2 sm:mb-3">El Poder del Silencio Operativo</h3>
                    <p className="text-slate-300 font-mono text-xs max-w-2xl mx-auto leading-relaxed italic">
                      "En TZANiX creemos que la mejor manera de proteger un dato, es nunca poseerlo. Construimos motores ciegos y veloces; procesan el caos inercial y te entregan tráfico 100% limpio, olvidándolo todo al siguiente milisegundo."
                    </p>
                    <p className="text-tzCyan font-mono font-bold text-[10px] mt-3 uppercase tracking-[0.2em]">
                      — Mario R.
                    </p>
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


