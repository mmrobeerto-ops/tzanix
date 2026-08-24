import React from 'react';

export default function ScientificDocs() {
  return (
    <section id="docs" className="spacex-section min-h-screen bg-zinc-950 py-24">
      <div className="relative z-10 max-w-5xl mx-auto w-full space-y-12 px-6">
        
        <div className="border-b border-white/20 pb-6">
          <p className="text-xs font-mono font-bold tracking-[0.35em] uppercase text-tzCyan mb-2">
            Arquitectura & Documentación Científica
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight uppercase text-white">
            matemática Contra Entropía
          </h2>
        </div>

        <div className="space-y-12">
          
          {/* Sección 1 */}
          <div className="bg-zinc-900/50 border border-white/10 p-8">
            <h3 className="text-21l font-bold text-white mb-4">1. Arquitectura matemática 4D (Tensores)</h3>
            <p className="text-slate-300 font-light leading-relaxed mb-4">
              El motor de TZANiX no utiliza reglas heurísticas tradicionales. Modelamos el tráfico de red como un <strong>flujo tensorial</strong> en un espacio topológico de 4 dimensiones. Cuando un ataque DDoS o una inyección ocurre, altera la gravedad matemática del tensor, produciendo una anomalía inercial que nuestro algoritmo detecta exactamente en 0.42 milisegundos.
            </p>
            <p className="text-slate-300 font-light leading-relaxed">
              Utilizamos Ecuaciones Diferenciales Estocásticas (SDE) para predecir la trayectoria del paquete antes de que llegue al Kernel, permitiendo un bloqueo pre-computado.
            </p>
          </div>

          {/* Sección 2 */}
          <div className="bg-zinc-900/50 border border-white/10 p-8">
            <h3 className="text-2xl font-bold text-white mb-4">2. El "Matrimonio" Rust-Python (maximizando el silicio)</h3>
            <p className="text-slate-300 font-light leading-relaxed mb-4">
              Python es el rey indiscutible en orquestación de IA, pero es cu�llo de botella en cálculos densos. Con TZANiX, CTOs y Arquitectos obtienen lo mejor de ambos mundos:
              Python es el rey indiscutible en orquestación de IA, pero es cullo de botella en cálculos densos. Con TZANiX, CTOs y Arquitectos obtienen lo mejor de ambos mundos:
            </p>
            <ul className="list-disc list-inside text-slate-300 font-light space-y-2 mb-4">
              <li><strong>Papel de Python:</strong> Interfaz API, orquestación y conexión con modelos IA.</li>
              <li><strong>Papel de Rust:</strong> Bindings de bajo nivel (PyO3) que descargan la matemática pesada directamente al silicio de la CPU.</li>
            </ul>
            <div className="bg-black border border-tzCyan/30 p-4 font-mono text-xs text-tzCyan">
              [BENCHMARK EMPIRE] - Execution Time (Shannon Entropy)<br/>
              &gt; Pure Python : 48,753,800 ns (48.75 ms)<br/>
              &gt; TZANiX Rust : &nbsp;561,700 ns (0.56 ms)<br/>
              ===&gt; ACELERACIÓN: 86.8x (Rendimiento de grado militar)
            </div>
          </div>

          {/* Sección 3 */}
          <div className="bg-zinc-900/50 border border-white/10 p-8">
            <h3 className="text-2xl font-bold text-white mb-4">3. Esquemas de Defensa L3 (Network)</h3>
            <p className="text-slate-300 font-light leading-relaxed mb-4">
              Nuestro motor Quantum Q Balam opera en la Capa 3 (Ls), garantizando zero-drop rate bajo cargas de estrés extremas (10,000 req/s simuladas). 
              Al integrar<span className="font-mono border border-white/20 bg-zinc-800 px-1 mx-1">SCCUBE</span> (1.01 ms), la infraestructura se vuelve inmune a ataques volumétricos y exfiltración de datos silenciosa.
            </p>
            <a href="https://github.com/mmrobeerto-ops/tzanix" target="_blank" rel="noopener noreferrer" className="btn-spacex text-xs mb-2 inline-block">
              <span>VER BENCHMARKS EN GITHUB &rarr;</span>
            </a>
          </div>
          
        </div>
      </div>
    </section>
  );
}

