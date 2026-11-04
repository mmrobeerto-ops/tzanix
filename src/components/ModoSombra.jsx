import React from 'react';
import DataPurificationVisualizer from './DataPurificationVisualizer';

export default function ModoSombra() {
  return (
    <section className="w-full py-28 px-5 sm:px-[4vw] bg-[#06090F] border-t border-slate-800/90 relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Cabecera */}
        <div className="border-b border-slate-800 pb-6 space-y-3">
          <p className="text-xs font-mono font-semibold tracking-[0.3em] uppercase text-[#38BDF8]">
            MODO SOMBRA // OBSERVABILIDAD SIN BLOQUEO
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase text-white">
            Ve el ataque antes de bloquearlo
          </h2>
          <p className="text-slate-400 max-w-3xl text-sm sm:text-base leading-relaxed">
            El <strong className="text-white">Modo Sombra</strong> ejecuta el motor en paralelo a tu tráfico real sin descartar
            un solo paquete: calibra el ancla de entropía y te muestra qué <em>habría</em> filtrado. Así validas la detección
            contra tu tráfico de producción antes de activar el bloqueo en vivo.
          </p>
        </div>

        {/* Visualización: flujo crudo -> Neural Gateway -> tensores purificados */}
        <div className="relative w-full h-[420px] sm:h-[500px] bg-[#02040a] border border-slate-800 overflow-hidden">
          <DataPurificationVisualizer />
        </div>

        {/* Pies de métrica */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
          <div className="bg-[#0B111E] p-5 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Entrada</div>
            <div className="text-lg font-bold text-white">Flujo crudo</div>
            <p className="text-xs text-slate-500 mt-1">CPU saturada bajo ataque volumétrico, cómputo GPU desperdiciado en ruido.</p>
          </div>
          <div className="bg-[#0B111E] p-5 border border-[#38BDF8]/40">
            <div className="text-[10px] text-[#38BDF8] uppercase tracking-widest mb-1">Motor</div>
            <div className="text-lg font-bold text-[#38BDF8]">Neural Gateway</div>
            <p className="text-xs text-slate-500 mt-1">Entropía Q16.16 + espectro FFT-16 en memoria volátil, sin almacenar payload.</p>
          </div>
          <div className="bg-[#0B111E] p-5 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Salida</div>
            <div className="text-lg font-bold text-white">Tensores limpios</div>
            <p className="text-xs text-slate-500 mt-1">Solo tráfico legítimo llega a tu servidor; coste GPU reducido (FinOps).</p>
          </div>
        </div>
      </div>
    </section>
  );
}
