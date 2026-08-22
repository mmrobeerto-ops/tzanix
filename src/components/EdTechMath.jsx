import { X } from 'lucide-react';
import React, { useState } from 'react';

const EdTechMath = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pt-4 space-y-6">
      <div className="flex flex-wrap gap-4">
        <a href="https://edtech.tzanix.com/" target="_blank" rel="noopener noreferrer" className="btn-spacex">
          <span>ABRIR EDTECH &rarr;</span>
        </a>
        <button onClick={() => setIsOpen(!isOpen)} className="btn-spacex !bg-transparent !text-white border border-white/30 hover:border-white">
          <span>HOLOGRAFÍA MATEMÁTICA &darr;</span>
        </button>
      </div>
      
            {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-white/20 bg-black p-8 sm:p-10 shadow-[0_0_50px_rgba(255,255,255,0.05)] text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-[150] p-2 text-white/70 hover:text-[#ff0055] bg-black/50 rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          <h3 className="text-lg font-black text-white mb-4 uppercase tracking-widest text-tzCyan">El Holograma cuántico</h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            La proyección holográfica interactiva de EdTech no es una simple animación 3D; es la representación visual en tiempo real de la <strong>Función de Onda de Schrödinger</strong>.
          </p>
          <ul className="text-slate-400 text-xs font-mono space-y-4">
            <li className="flex flex-col">
              <span className="text-tzCyan font-bold uppercase mb-1">1. Superposición Sensorial:</span>
              <span>El espacio 3D se calcula dinámicamente usando operaciones de Álgebra lineal. Los vértices del holograma representan nubes de probabilidad de un sistema cuántico.</span>
            </li>
            <li className="flex flex-col">
              <span className="text-tzCyan font-bold uppercase mb-1">2. Motor Geométrico (Rust/WebGL):</span>
              <span>Para lograr una experiencia sin latencia (Zero-Lag), delegamos la computación matricial y las transformaciones O(3) a la GPU, demostrando el poder del cómputo puro.</span>
            </li>
            <li className="flex flex-col">
              <span className="text-tzCyan font-bold uppercase mb-1">3. Colapso por Observación:</span>
              <span>Al interactuar con la figura, el usuario fuerza un evento de "medición" simulado. Esto altera la Entropía de Shannon del modelo, forzando a la geometría a reaccionar físicamente.</span>
            </li>
                    </ul>

          <div className="mt-8 pt-6 border-t border-white/10">
            <h4 className="text-sm font-black text-white mb-4 uppercase tracking-widest text-tzCyan">Parámetros de Telemetría:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-400">
              <div className="bg-black/40 p-4 border border-white/5 rounded">
                <span className="text-white font-bold block mb-2">CAPACITY (Amplitud de Probabilidad)</span>
                Representa el límite dimensional del espacio de Hilbert. Al aumentarla, expandes el radio de la nube de probabilidad (la figura absorbe energía y crece físicamente).
              </div>
              <div className="bg-black/40 p-4 border border-white/5 rounded">
                <span className="text-white font-bold block mb-2">FREQUENCY (energía / Oscilación)</span>
                Define la constante vibratoria de la onda estacionaria. Al moverla, aceleras o frenas radicalmente la velocidad a la que "vibran" los tensores en el plano 3D.
              </div>
              <div className="bg-black/40 p-4 border border-white/5 rounded">
                <span className="text-white font-bold block mb-2">PHASE 1 (Desfase Angular - Eje X/Y)</span>
                Modifica el ángulo del número complejo asociado a la onda. Cambiarlo induce interferencia constructiva, "doblando" la geometría del holograma horizontalmente.
              </div>
              <div className="bg-black/40 p-4 border border-white/5 rounded">
                <span className="text-white font-bold block mb-2">PHASE 2 (Desfase de Profundidad - Eje Z)</span>
                Controla la interferencia en la profundidad. Al combinar Phase 1 y Phase 2, desestabilizas la simetría del sistema creando nodos de caos inercial visibles en la malla.
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">NÚCLEO MATEMÁTICO:</span>
            <span className="px-2 py-1 bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono rounded-sm">Álgebra Lineal (Espacios de Hilbert)</span>
            <span className="px-2 py-1 bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono rounded-sm">Cálculo Tensorial O(3)</span>
            <span className="px-2 py-1 bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono rounded-sm">Análisis de Fourier Complejo</span>
            <span className="px-2 py-1 bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono rounded-sm">Topología Diferencial</span>
          </div>
                  </div>
        </div>
      )}
    </div>
  );
};

export default EdTechMath;
