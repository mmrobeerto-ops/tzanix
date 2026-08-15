import React, { useState } from 'react';
import { ShieldAlert, EyeOff, Lock, FileKey2, Rocket, Target, Zap, X } from 'lucide-react';

const CompanyModals = () => {
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => setActiveModal(null);

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 py-12 border-t border-cyan-500/10">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
        <button 
          onClick={() => setActiveModal('mission')}
          className="btn-spacex"
        >
          <span>Misión, Visión y Valores</span>
        </button>
        <button 
          onClick={() => setActiveModal('privacy')}
          className="btn-spacex !border-white/30 text-white/70"
        >
          <span>Privacidad y Seguridad</span>
        </button>
      </div>

      {/* MODAL OVERLAY */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-white/20 bg-black p-8 sm:p-12 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            
            <button 
              onClick={closeModal}
              className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition"
            >
              <X className="w-6 h-6" />
            </button>

            {/* CONTENIDO: MISIÓN, VISIÓN Y VALORES */}
            {activeModal === 'mission' && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-black text-white tracking-tight uppercase">ADN TZANiX</h2>
                  <div className="w-24 h-1 bg-tzCyan mx-auto mt-4 shadow-[0_0_15px_#00f0ff]"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-tzCyan">
                      <Target className="w-6 h-6" />
                      <h3 className="text-xl font-bold uppercase tracking-widest">Nuestra Misión</h3>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed font-mono">
                      Desbloquear velocidad extrema y eficiencia computacional operando a nivel de silicio. Erradicamos la dependencia de fuerza bruta y recursos redundantes en la nube mediante algoritmos matemáticos puros, entregando infraestructura Edge de ultra-alto rendimiento para problemas complejos.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-tzCyan">
                      <Rocket className="w-6 h-6" />
                      <h3 className="text-xl font-bold uppercase tracking-widest">Nuestra Visión</h3>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed font-mono">
                      Ser el estándar global (Deep-Tech) en purificación tensorial y ciberseguridad inercial. Aspiramos a un ecosistema digital donde el procesamiento de datos masivos se logre con Cero Desperdicio (Zero-Waste), democratizando el poder del cómputo cuántico e IA desde el dispositivo más pequeño.
                    </p>
                  </div>
                </div>

                <div className="space-y-6 pt-8 border-t border-cyan-500/20">
                  <div className="flex items-center justify-center space-x-3 text-tzCyan mb-6">
                    <Zap className="w-6 h-6" />
                    <h3 className="text-xl font-bold uppercase tracking-widest">Valores Centrales</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    <div className="p-4 bg-cyan-950/20 rounded border border-cyan-500/10">
                      <h4 className="text-white font-bold mb-2">Soberanía Absoluta</h4>
                      <p className="text-xs text-slate-400 font-mono">Respeto total por la infraestructura y datos del cliente. Zero-Retention por diseño.</p>
                    </div>
                    <div className="p-4 bg-cyan-950/20 rounded border border-cyan-500/10">
                      <h4 className="text-white font-bold mb-2">Elegancia Matemática</h4>
                      <p className="text-xs text-slate-400 font-mono">Resolver los problemas más caóticos con la solución algorítmica más limpia y eficiente.</p>
                    </div>
                    <div className="p-4 bg-cyan-950/20 rounded border border-cyan-500/10">
                      <h4 className="text-white font-bold mb-2">Rendimiento Extremo</h4>
                      <p className="text-xs text-slate-400 font-mono">Operar en submilisegundos, reducir costos de nube y optimizar cada ciclo de reloj.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CONTENIDO: PRIVACIDAD Y SEGURIDAD */}
            {activeModal === 'privacy' && (
              <div className="space-y-12">
                <div className="text-center max-w-3xl mx-auto space-y-4">
                  <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-950/20 text-red-400 text-xs font-mono shadow-[0_0_15px_rgba(255,0,60,0.1)]">
                    <EyeOff className="w-4 h-4" />
                    <span>ZERO-KNOWLEDGE DATA GOVERNANCE</span>
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">
                    Soberanía y Privacidad de Datos
                  </h2>
                  <p className="text-slate-400 font-mono text-sm leading-relaxed">
                    Nuestros motores están diseñados bajo la filosofía <strong>Zero-Retention</strong>. Tu infraestructura, tus llaves, tus datos.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Puntos Clave de Privacidad */}
                  <div className="glass-panel p-6 rounded-xl border-l-2 border-l-red-500/50 bg-black/40">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-red-950/30 rounded text-red-400"><EyeOff className="w-6 h-6" /></div>
                      <div>
                        <h3 className="text-sm font-bold text-white mb-2">Arquitectura de Conocimiento Cero</h3>
                        <p className="text-slate-400 text-xs leading-relaxed">
                          Procesadores de flujo matemático en RAM. <strong>No almacenamos, no entrenamos modelos, ni monetizamos</strong> tus tensores o datos.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="glass-panel p-6 rounded-xl border-l-2 border-l-cyan-500/50 bg-black/40">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-cyan-950/30 rounded text-tzCyan"><Lock className="w-6 h-6" /></div>
                      <div>
                        <h3 className="text-sm font-bold text-white mb-2">Procesamiento Volátil</h3>
                        <p className="text-slate-400 text-xs leading-relaxed">
                          Ejecución a nivel de máquina en memoria contigua garantizando <strong>Zero-Memory Leaks</strong>. Telemetría en BD locales (SQLite WAL) controladas por ti.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="glass-panel p-6 rounded-xl border-l-2 border-l-cyan-500/50 bg-black/40">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-cyan-950/30 rounded text-tzCyan"><ShieldAlert className="w-6 h-6" /></div>
                      <div>
                        <h3 className="text-sm font-bold text-white mb-2">Soberanía & Despliegue Aislado</h3>
                        <p className="text-slate-400 text-xs leading-relaxed">
                          En Sidecar, Docker o ARM64 mantienes el control. Ningún dato sensible abandona tu perímetro privado.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="glass-panel p-6 rounded-xl border-l-2 border-l-cyan-500/50 bg-black/40">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-cyan-950/30 rounded text-tzCyan"><FileKey2 className="w-6 h-6" /></div>
                      <div>
                        <h3 className="text-sm font-bold text-white mb-2">Estándares & Cumplimiento</h3>
                        <p className="text-slate-400 text-xs leading-relaxed">
                          Cumplimiento estricto con <strong>GDPR, CCPA e ISO/IEC 27001</strong> para sectores de misión crítica.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center p-6 glass-panel rounded-xl bg-gradient-to-b from-transparent to-cyan-950/20 border-b border-cyan-500/30 relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-tzCyan shadow-[0_0_20px_#00f0ff]"></div>
                  <h3 className="text-lg font-black metallic-text mb-3">El Poder del Silencio Operativo</h3>
                  <p className="text-slate-300 font-mono text-xs max-w-2xl mx-auto leading-relaxed italic">
                    "En TZANiX creemos que la mejor manera de proteger un dato, es nunca poseerlo. Construimos motores ciegos y veloces; procesan el caos y te entregan la verdad matemática, olvidándolo todo al siguiente milisegundo."
                  </p>
                  <p className="text-tzCyan font-mono font-bold text-[10px] mt-4 uppercase tracking-[0.2em]">
                    — El Equipo de Ingeniería de TZANiX
                  </p>
                </div>
              </div>
            )}
            
          </div>
        </div>
      )}
    </section>
  );
};

export default CompanyModals;
