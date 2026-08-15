import React from 'react';
import { Cpu, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';

const ProductDivisions = () => {
  return (
    <section id="modules" className="relative z-10 max-w-7xl mx-auto px-4 py-20 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-bold text-tzCyan uppercase tracking-[0.25em] block shadow-sm">4 Divisiones de Ingeniería</span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-md">
          El Portafolio TZANiX
        </h2>
        <p className="text-slate-400 font-mono text-sm leading-relaxed">
          No somos un SaaS genérico ni una agencia. Somos una fábrica de motores matemáticos y escudos de datos de baja latencia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Spectral */}
        <div className="glass-panel p-6 rounded-xl flex flex-col justify-between border-t border-cyan-500/30 hover:border-tzCyan transition duration-300 group">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="p-2 bg-cyan-950/50 rounded-lg border border-cyan-500/20 text-tzCyan group-hover:bg-tzCyan group-hover:text-black transition">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider">Edge / ARM64</span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-wide">TZANiX Spectral</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              <strong>Edge Computing & Spatial Intelligence.</strong> Indexación y consultas espacio-temporales en microsegundos directamente en hardware embebido/ARM64 para drones y robótica, 100% offline.
            </p>
          </div>
        </div>

        {/* Neural Gateway */}
        <div className="glass-panel p-6 rounded-xl flex flex-col justify-between border-t border-cyan-500/30 hover:border-tzCyan transition duration-300 shadow-[0_0_20px_rgba(0,240,255,0.05)] group">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="p-2 bg-cyan-950/50 rounded-lg border border-cyan-500/20 text-tzCyan group-hover:bg-tzCyan group-hover:text-black transition shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase tracking-wider">AI Infrastructure</span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-wide">Neural Gateway</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              <strong>AI FinOps Optimization.</strong> Escudo previo a GPUs programado en Rust para purificación de flujos de datos (MAD filtering), evitando envenenamiento de IA y reduciendo costos de nube corporativa.
            </p>
          </div>
        </div>

        {/* Q-Balam */}
        <div className="glass-panel p-6 rounded-xl flex flex-col justify-between border-t border-cyan-500/30 hover:border-tzCyan transition duration-300 group">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="p-2 bg-cyan-950/50 rounded-lg border border-cyan-500/20 text-red-400 group-hover:bg-red-500 group-hover:text-white transition">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider">Cybersecurity</span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-wide">TZANiX Q-Balam</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              <strong>Inertial Cybersecurity & Kernel Defense.</strong> Protección perimetral interna sidecar para bases de datos mediante cálculo de entropía de Shannon, con respuesta (Kill-Switch) en &lt;0.42 ms.
            </p>
          </div>
        </div>

        {/* EdTech */}
        <div className="glass-panel p-6 rounded-xl flex flex-col justify-between border-t border-cyan-500/30 hover:border-tzCyan transition duration-300 group">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="p-2 bg-cyan-950/50 rounded-lg border border-cyan-500/20 text-tzCyan group-hover:bg-tzCyan group-hover:text-black transition">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider">Education</span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-wide">TZANiX EdTech</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              <strong>Plataforma Interactiva Cuántica.</strong> Herramientas inmersivas para docentes y ecosistemas de aprendizaje interactivo especializados en la impartición de fundamentos de computación cuántica.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductDivisions;
