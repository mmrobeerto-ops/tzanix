import React from 'react';
import { Activity, Sparkles, ShieldCheck } from 'lucide-react';

const HeroTelemetry = () => {
  return (
    <div className="w-full">
      {/* HERO TITULAR */}
      <div className="text-center max-w-4xl mx-auto space-y-6 relative z-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-tzCyan text-xs font-mono shadow-[0_0_15px_rgba(0,240,255,0.15)]">
          <span className="w-2 h-2 rounded-full bg-tzCyan animate-pulse shadow-[0_0_8px_#00f0ff]"></span>
          <span>INFRAESTRUCTURA EDGE & CÓMPUTO TENSORIAL EN SILICIO</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-tight text-white drop-shadow-lg">
          DE LA ENTROPÍA AL <br/>
          <span className="metallic-text">ORDEN MATEMÁTICO</span>
        </h1>
        
        <p className="text-slate-300 text-base sm:text-lg font-normal max-w-3xl mx-auto leading-relaxed drop-shadow-md">
          Desbloqueamos velocidad extrema y eficiencia de costos operando a nivel de silicio (Rust/ARM64). Resolvemos problemas complejos de IA y ciberseguridad mediante matemáticas puras, eliminando la dependencia de fuerza bruta en la nube.
        </p>

        {/* Botones de Acción Principales */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
          <a href="#pricing" className="px-8 py-3 text-sm font-mono font-extrabold tracking-wider uppercase text-black bg-tzCyan rounded shadow-[0_0_20px_rgba(0,240,255,0.6)] hover:bg-cyan-300 transition duration-200 w-full sm:w-auto">
            Desplegar Módulo
          </a>
          <a href="https://pypi.org/project/tzanix-core/" target="_blank" rel="noopener noreferrer" className="px-8 py-3 text-sm font-mono font-bold tracking-wider uppercase text-white bg-slate-900/80 border border-cyan-500/50 rounded hover:bg-cyan-950 hover:border-tzCyan transition duration-200 flex items-center justify-center w-full sm:w-auto group">
            <span className="mr-2 group-hover:text-tzCyan transition">Descargar tzanix-core (Python SDK)</span>
            <svg className="w-4 h-4 text-cyan-500 group-hover:text-tzCyan transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
          </a>
        </div>
      </div>

      {/* HUD DE SIMULACIÓN Y TELEMETRÍA */}
      <section className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between pointer-events-none mt-32 mb-20 px-4">
        
        {/* HUD Izquierdo (Entropía) */}
        <div className="font-mono text-[10px] sm:text-xs text-slate-300 bg-black/70 backdrop-blur-md p-4 rounded-lg border border-cyan-500/30 space-y-2 shadow-[0_0_25px_rgba(255,0,60,0.15)] pointer-events-auto">
          <div className="flex items-center space-x-2 border-b border-cyan-500/20 pb-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#ff003c]"></span>
            <span className="font-bold tracking-widest text-slate-300">INPUT: RUIDO & ENTROPÍA</span>
          </div>
          <div>ESTADO: <span className="text-red-400 font-bold">CAOS ESTRUCTURAL</span></div>
          <div>INYECCIÓN DE DATOS: <span className="text-white font-bold">4.2 TB/s</span></div>
          <div>THREAT VECTORS: <span className="text-red-400 font-bold animate-pulse">DETECTADOS</span></div>
        </div>

        {/* HUD Central (Núcleo) */}
        <div className="hidden md:flex flex-col items-center justify-center space-y-3 pointer-events-auto">
          <div className="text-sm font-mono font-black text-black bg-tzCyan px-4 py-1.5 rounded shadow-[0_0_20px_#00f0ff] tracking-widest uppercase">
            TZANiX Quantum Core
          </div>
          <div className="flex space-x-4 text-xs font-mono bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
            <span>LATENCIA: <strong className="text-tzCyan">&lt; 0.42 ms</strong></span>
            <span className="text-cyan-500/50">|</span>
            <span>EFICIENCIA: <strong className="text-green-400">99.9%</strong></span>
          </div>
        </div>

        {/* HUD Derecho (Vectores Puros) */}
        <div className="font-mono text-[10px] sm:text-xs text-cyan-200 bg-black/70 backdrop-blur-md p-4 rounded-lg border border-cyan-500/30 space-y-2 shadow-[0_0_25px_rgba(0,240,255,0.15)] pointer-events-auto text-right mt-4 md:mt-0">
          <div className="flex items-center justify-end space-x-2 border-b border-cyan-500/20 pb-2 mb-2">
            <span className="font-bold tracking-widest text-white">OUTPUT: VECTORES PUROS</span>
            <span className="w-2 h-2 rounded-full bg-tzCyan shadow-[0_0_10px_#00f0ff]"></span>
          </div>
          <div className="flex items-center justify-end space-x-2"><span>Edge Computing (ARM64)</span> <Activity className="w-3.5 h-3.5 text-tzCyan" /></div>
          <div className="flex items-center justify-end space-x-2"><span>Clean Tensor AI Feed</span> <Sparkles className="w-3.5 h-3.5 text-tzCyan" /></div>
          <div className="flex items-center justify-end space-x-2"><span>Q-Balam Secure Stream</span> <ShieldCheck className="w-3.5 h-3.5 text-tzCyan" /></div>
        </div>

      </section>
    </div>
  );
};

export default HeroTelemetry;
