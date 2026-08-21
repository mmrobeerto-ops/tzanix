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
        <div className="p-6 bg-zinc-900/90 border border-white/20 rounded max-w-3xl animate-fade-in backdrop-blur-md">
          <h3 className="text-lg font-black text-white mb-4 uppercase tracking-widest text-tzCyan">El Holograma Cuántico</h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            La proyección holográfica interactiva de EdTech no es una simple animación 3D; es la representación visual en tiempo real de la <strong>Función de Onda de Schrödinger</strong>.
          </p>
          <ul className="text-slate-400 text-xs font-mono space-y-4">
            <li className="flex flex-col">
              <span className="text-tzCyan font-bold uppercase mb-1">1. Superposición Sensorial:</span>
              <span>El espacio 3D se calcula dinámicamente usando operaciones de álgebra lineal. Los vértices del holograma representan nubes de probabilidad de un sistema cuántico.</span>
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
        </div>
      )}
    </div>
  );
};

export default EdTechMath;
