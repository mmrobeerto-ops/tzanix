import React from 'react';
import { Lock, EyeOff, ShieldAlert, FileKey2 } from 'lucide-react';

const DataGovernance = () => {
  return (
    <section id="privacy" className="relative z-10 max-w-7xl mx-auto px-4 py-20 space-y-12 border-t border-cyan-500/10">
      
      {/* Encabezado */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-950/20 text-red-400 text-xs font-mono shadow-[0_0_15px_rgba(255,0,60,0.1)]">
          <EyeOff className="w-4 h-4" />
          <span>ZERO-KNOWLEDGE DATA GOVERNANCE</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md">
          Soberanía y Privacidad de Datos
        </h2>
        <p className="text-slate-400 font-mono text-sm leading-relaxed">
          Nuestrés motores están diseñados bajo la filosofía <strong>Zero-Retention</strong>. Tu infraestructura, tus llaves, tus datos. Nosotros solo ponemos las matemáticas.
        </p>
      </div>

      {/* Grid de Puntos Clave */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Punto 1: Zero-Knowledge */}
        <div className="glass-panel p-6 rounded-xl border-l-2 border-l-red-500/50 hover:border-l-red-400 transition bg-black/40">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-red-950/30 rounded text-red-400">
              <EyeOff className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Arquitectura de Conocimiento Cero</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Los motores de TZANiX (Motor 4D, Neural Gateway y Q-Balam) operan estrictamente como procesadores de flujo matemático en memoria Volátil (RAM). <strong>No almacenamos, no entrenamos modelos públicos, ni monetizamos</strong> el contenido de los tensores o bases de datos del cliente.
              </p>
            </div>
          </div>
        </div>

        {/* Punto 2: Procesamiento Volátil */}
        <div className="glass-panel p-6 rounded-xl border-l-2 border-l-cyan-500/50 hover:border-l-tzCyan transition bg-black/40">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-cyan-950/30 rounded text-tzCyan">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Procesamiento Volátil en Silicio</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                La depuración (filtrado MAD) se ejecuta a nivel de máquina en memoria contigua en Rust, garantizando <strong>cero fugas de memoria (Zero-Memory Leaks)</strong>. La Telemetría ocurre asíncronamente en bases de datos locales cifradas (SQLite WAL), controladas exclusivamente por ti.
              </p>
            </div>
          </div>
        </div>

        {/* Punto 3: Soberanía */}
        <div className="glass-panel p-6 rounded-xl border-l-2 border-l-cyan-500/50 hover:border-l-tzCyan transition bg-black/40">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-cyan-950/30 rounded text-tzCyan">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Soberanía & Despliegue Aislado</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                En modo Sidecar, Docker o silicio embebido ARM64, mantienes el control absoluto. <strong>Zero-Retention:</strong> Ningún dato sensible, vector o consulta abandona tu perímetro privado hacia servidores externos de TZANiX.
              </p>
            </div>
          </div>
        </div>

        {/* Punto 4: Cumplimiento */}
        <div className="glass-panel p-6 rounded-xl border-l-2 border-l-cyan-500/50 hover:border-l-tzCyan transition bg-black/40">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-cyan-950/30 rounded text-tzCyan">
              <FileKey2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Estándares & Cumplimiento</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Arquitectura diseñada desde sus cimientos para cumplir y superar normativas internacionales como <strong>GDPR, CCPA e ISO/IEC 27001</strong>. Construido para los sectores más exigentes: financiero, salud, ciberseguridad y defensa.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Mensaje Creativo Final */}
      <div className="mt-12 text-center p-8 glass-panel rounded-2xl bg-gradient-to-b from-transparent to-cyan-950/20 border-b border-cyan-500/30 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-tzCyan shadow-[0_0_20px_#00f0ff]"></div>
        <h3 className="text-xl sm:text-2xl font-black metallic-text mb-4">El Poder del Silencio Operativo</h3>
        <p className="text-slate-300 font-mono text-sm max-w-2xl mx-auto leading-relaxed">
          "En TZANiX creemos que la mejor manera de proteger un dato, es nunca poseerlo. Construimos motores ciegos y veloces; procesan el caos y te entregan la verdad matemática, olvidándolo todo al siguiente milisegundo. Tu infraestructura es tu Soberanía."
        </p>
        <p className="text-tzCyan font-mono font-bold text-xs mt-6 uppercase tracking-[0.2em]">
          — El Equipo de Ingeniería de TZANiX
        </p>
      </div>

    </section>
  );
};

export default DataGovernance;
