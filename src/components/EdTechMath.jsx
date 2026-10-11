import { X } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const EdTechMath = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Bloquear scroll de body y permitir cerrar con Escape
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setIsOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <div className="pt-3 sm:pt-4 space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
        <a href="https://edtech.tzanix.com/" target="_blank" rel="noopener noreferrer" className="btn-spacex w-full sm:w-auto text-center">
          <span>ABRIR EDTECH &rarr;</span>
        </a>
        <button onClick={() => setIsOpen(!isOpen)} className="btn-spacex !bg-transparent !text-white border border-white/30 hover:border-white w-full sm:w-auto text-center">
          <span>HOLOGRAFÍA MATEMÁTICA &darr;</span>
        </button>
      </div>
      
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl animate-fadeIn"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[88vh] flex flex-col border border-white/20 bg-zinc-950 shadow-[0_0_60px_rgba(0,240,255,0.12)] rounded-lg overflow-hidden text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Sticky con botón de cerrar siempre accesible */}
            <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-white/10 bg-black/90 backdrop-blur z-20">
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-tzCyan uppercase">
                EDTECH // HOLOGRAFÍA MATEMÁTICA
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/70 hover:text-[#ff0055] hover:bg-white/5 rounded-full transition-all focus:outline-none"
                aria-label="Cerrar ventana"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Contenido scrolleable con scrollbar estilizado */}
            <div className="overflow-y-auto p-5 sm:p-8 md:p-10 custom-scrollbar space-y-6">
              <h3 className="text-base sm:text-lg md:text-xl font-black text-white uppercase tracking-widest text-tzCyan">
                El Holograma Cuántico
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                La proyección holográfica interactiva de EdTech no es una simple animación 3D; es la representación visual en tiempo real de la <strong>Función de Onda de Schrödinger</strong>.
              </p>
              <ul className="text-slate-400 text-[11px] sm:text-xs font-mono space-y-4">
                <li className="flex flex-col">
                  <span className="text-tzCyan font-bold uppercase mb-1">1. Superposición Sensorial:</span>
                  <span>El espacio 3D se calcula dinámicamente usando operaciones de Álgebra Lineal. Los vértices del holograma representan nubes de probabilidad de un sistema cuántico.</span>
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

              <div className="mt-6 sm:mt-8 pt-6 border-t border-white/10">
                <h4 className="text-xs sm:text-sm font-black text-white mb-4 uppercase tracking-widest text-tzCyan">
                  Parámetros de Telemetría:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-[10px] sm:text-xs font-mono text-slate-400">
                  <div className="bg-black/40 p-3 sm:p-4 border border-white/5 rounded">
                    <span className="text-white font-bold block mb-1 sm:mb-2">CAPACITY (Amplitud de Probabilidad)</span>
                    Representa el límite dimensional del espacio de Hilbert. Al aumentarla, expandes el radio de la nube de probabilidad (la figura absorbe energía y crece físicamente).
                  </div>
                  <div className="bg-black/40 p-3 sm:p-4 border border-white/5 rounded">
                    <span className="text-white font-bold block mb-1 sm:mb-2">FREQUENCY (Energía / Oscilación)</span>
                    Define la constante vibratoria de la onda estacionaria. Al moverla, aceleras o frenas radicalmente la velocidad a la que "vibran" los tensores en el plano 3D.
                  </div>
                  <div className="bg-black/40 p-3 sm:p-4 border border-white/5 rounded">
                    <span className="text-white font-bold block mb-1 sm:mb-2">PHASE 1 (Desfase Angular - Eje X/Y)</span>
                    Modifica el ángulo del número complejo asociado a la onda. Cambiarlo induce interferencia constructiva, "doblando" la geometría del holograma horizontalmente.
                  </div>
                  <div className="bg-black/40 p-3 sm:p-4 border border-white/5 rounded">
                    <span className="text-white font-bold block mb-1 sm:mb-2">PHASE 2 (Desfase de Profundidad - Eje Z)</span>
                    Controla la interferencia en la profundidad. Al combinar Phase 1 y Phase 2, desestabilizas la simetría del sistema creando nodos de caos inercial visibles en la malla.
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest">NÚCLEO MATEMÁTICO:</span>
                <span className="px-2 py-1 bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-[9px] sm:text-[10px] font-mono rounded-sm">Álgebra Lineal (Espacios de Hilbert)</span>
                <span className="px-2 py-1 bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-[9px] sm:text-[10px] font-mono rounded-sm">Cálculo Tensorial O(3)</span>
                <span className="px-2 py-1 bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-[9px] sm:text-[10px] font-mono rounded-sm">Análisis de Fourier Complejo</span>
                <span className="px-2 py-1 bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-[9px] sm:text-[10px] font-mono rounded-sm">Topología Diferencial</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EdTechMath;
