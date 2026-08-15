import React, { useState } from 'react';
import QuickstartOnboarding from './components/QuickstartOnboarding';
import CompanyModals from './components/CompanyModals';
import SpacexBackground from './components/SpacexBackground';
import MatrixBackground from './components/MatrixBackground';
import FluidBackground from './components/FluidBackground';
import MathBackground from './components/MathBackground';

function App() {
  const [selectedTier, setSelectedTier] = useState(null);

  const handleSelectTier = (tier) => {
    setSelectedTier(tier);
    setTimeout(() => {
      document.getElementById('onboarding-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="font-sans antialiased relative min-h-screen">
      
      {/* HEADER / NAVBAR ESTILO SPACEX */}
      <header className="fixed top-0 left-0 w-full z-50 px-8 py-7 flex items-center justify-between">
        <a href="#hero" className="flex items-center text-[34px] font-black tracking-[0.4em] transform scale-x-[1.25] origin-left transition-all hover:scale-x-[1.3] group">
          <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">TZAN</span>
          
          {/* Custom SVG 'i' basado en tu diseño */}
          <svg viewBox="0 0 24 42" className="h-[32px] w-auto ml-1 mr-3 relative z-10 -translate-y-[4px]">
            {/* Punto Cyan */}
            <circle cx="12" cy="6" r="6" fill="#00f0ff" style={{ filter: 'drop-shadow(0px 0px 8px #00f0ff)' }} />
            
            {/* Tallo geométrico blanco */}
            <g fill="white" style={{ filter: 'drop-shadow(0px 0px 10px rgba(255,255,255,0.2))' }}>
              {/* Triángulo superior */}
              <path d="M 8 16 L 18 16 L 18 34 L 7 17.5 Q 6 16 8 16 Z" />
              {/* Triángulo inferior */}
              <path d="M 16 42 L 6 42 L 6 24 L 17 40.5 Q 18 42 16 42 Z" />
            </g>
          </svg>

          <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">X</span>
        </a>
        <nav className="hidden lg:flex items-center space-x-9 text-[12px] font-bold tracking-[0.22em] uppercase text-white/90">
          <a href="#neural-gateway" className="hover:text-tzCyan transition">NEURAL GATEWAY</a>
          <a href="#q-balam" className="hover:text-tzCyan transition">Q-BALAM</a>
          <a href="#singularity" className="hover:text-tzCyan transition">SINGULARIDAD (DRONES)</a>
          <a href="#edtech" className="hover:text-tzCyan transition">EDTECH CUÁNTICA</a>
          <a href="#pricing" className="hover:text-tzCyan transition">DESPLIEGUE</a>
        </nav>
        <div className="flex items-center space-x-6">
          <a href="#pricing" className="hidden sm:inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-white border-b-2 border-tzCyan pb-1 hover:text-tzCyan transition">
            DESPLEGAR MÓDULO &rarr;
          </a>
          <button className="text-white space-y-1.5 focus:outline-none cursor-pointer">
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="w-full">
        
        {/* ========================================================================= */}
        {/* 1. HERO PRINCIPAL: DE LA ENTROPÍA AL ORDEN MATEMÁTICO                     */}
        {/* ========================================================================= */}
        <section id="hero" className="spacex-section">
          <SpacexBackground />
          <div className="video-overlay"></div>

          <div className="relative z-10 max-w-4xl space-y-4">
            <p className="text-xs md:text-sm font-mono font-bold tracking-[0.35em] uppercase text-tzCyan">
              ARQUITECTURA DE SILICIO / RUST & ARM64
            </p>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight uppercase leading-[0.92] text-white">
              DE LA ENTROPÍA AL <br /> ORDEN MATEMÁTICO
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-xl font-light tracking-wide leading-relaxed pt-2">
              Desbloqueamos velocidad extrema y eficiencia de costos operando a nivel de máquina. Resolviendo problemas complejos de IA y ciberseguridad mediante matemáticas puras sin depender de infraestructura masiva en la nube.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <a href="#neural-gateway" className="btn-spacex">
                <span>EXPLORAR MÓDULOS &rarr;</span>
              </a>
              <a href="https://pypi.org/project/tzanix-core/" target="_blank" rel="noopener noreferrer" className="btn-spacex !border-white/30 text-white/70">
                <span>SDK PYTHON (PyPI)</span>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. TZANIX NEURAL GATEWAY (PURIFICACIÓN DE DATOS & FINOPS IA)              */}
        {/* ========================================================================= */}
        <section id="neural-gateway" className="spacex-section">
          <FluidBackground />
          <div className="video-overlay"></div>

          <div className="relative z-10 max-w-4xl space-y-4">
            <p className="text-xs md:text-sm font-mono font-bold tracking-[0.35em] uppercase text-tzCyan">
              FINOPS & PURIFICACIÓN DE IA
            </p>
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight uppercase leading-[0.92] text-white">
              TZANiX NEURAL <br />GATEWAY
            </h2>
            <p className="text-slate-300 text-sm md:text-base max-w-xl font-light tracking-wide leading-relaxed pt-2">
              Escudo tensorial programado en Rust. Purifica los flujos de datos antes de que toquen costosas granjas de GPUs, mitigando el envenenamiento de datos y reduciendo hasta un 40% la facturación en la nube.
            </p>
            <div className="pt-4">
              <a href="https://tzanix-neural-gateway.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn-spacex">
                <span>ABRIR NEURAL GATEWAY &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. TZANIX Q-BALAM (CIBERSEGURIDAD INERCIAL & ANTI-EXFILTRACIÓN)           */}
        {/* ========================================================================= */}
        <section id="q-balam" className="spacex-section">
          <MatrixBackground />
          <div className="video-overlay"></div>

          <div className="relative z-10 max-w-4xl space-y-4">
            <p className="text-xs md:text-sm font-mono font-bold tracking-[0.35em] uppercase text-[#ff0055]">
              DEFENSA DE BASE DE DATOS & KERNEL
            </p>
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight uppercase leading-[0.92] text-white">
              TZANiX Q-BALAM
            </h2>
            <p className="text-slate-300 text-sm md:text-base max-w-xl font-light tracking-wide leading-relaxed pt-2">
              Motor inercial sidecar para bases de datos. Análisis de entropía de Shannon a velocidad de línea con Kill-Switch autónomo en menos de 0.42 milisegundos con 0% de impacto sobre el servidor.
            </p>
            <div className="pt-4">
              <a href="https://tzanix-q-balam.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn-spacex">
                <span>ABRIR Q-BALAM &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. SINGULARIDAD TZANIX (DRONES & CONTROL DETERMINISTA A 15ns)            */}
        {/* ========================================================================= */}
        <section id="singularity" className="spacex-section">
          <video className="bg-video" autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=2000">
            <source src="/drone.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay"></div>

          <div className="relative z-10 max-w-4xl space-y-4">
            <p className="text-xs md:text-sm font-mono font-bold tracking-[0.35em] uppercase text-tzCyan">
              FILTRADO DETERMINISTA & ROBÓTICA
            </p>
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight uppercase leading-[0.92] text-white">
              SINGULARIDAD <br />TZANiX
            </h2>
            <p className="text-slate-300 text-sm md:text-base max-w-xl font-light tracking-wide leading-relaxed pt-2">
              Control inercial determinista y mitigación de ceguera por vibración crítica en drones autónomos. Filtrado de ruido mecánico con latencias récord de 14.52 nanosegundos en tiempo real.
            </p>
            <div className="pt-4">
              <a href="https://tzanix-singularity-core.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn-spacex">
                <span>ABRIR SINGULARITY CORE &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. TZANIX EDTECH (PIZARRAS Y SIMULACIONES CUÁNTICAS INTERACTIVAS)         */}
        {/* ========================================================================= */}
        <section id="edtech" className="spacex-section">
          <MathBackground />
          <div className="video-overlay"></div>

          <div className="relative z-10 max-w-4xl space-y-4">
            <p className="text-xs md:text-sm font-mono font-bold tracking-[0.35em] uppercase text-tzCyan">
              EDUCACIÓN CUÁNTICA & OBSERVABILIDAD
            </p>
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight uppercase leading-[0.92] text-white">
              TZANiX EDTECH
            </h2>
            <p className="text-slate-300 text-sm md:text-base max-w-xl font-light tracking-wide leading-relaxed pt-2">
              Plataforma interactiva para docentes e investigadores. Visualización del principio de incertidumbre de Heisenberg, efectos de observador y osciloscopía dual en tiempo real.
            </p>
            <div className="pt-4">
              <a href="https://tzanix-edtech.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn-spacex">
                <span>ABRIR EDTECH &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. SELECCIÓN DE PLANES Y DESPLIEGUE                                       */}
        {/* ========================================================================= */}
        <section id="pricing" className="spacex-section !h-auto min-h-screen !justify-center py-24 bg-black">
          <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">
            
            <div className="border-b border-white/20 pb-6">
              <p className="text-xs font-mono font-bold tracking-[0.35em] uppercase text-tzCyan mb-2">LICENCIAMIENTO Y PRUEBAS</p>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight uppercase text-white">DESPLIEGA TUS MOTORES</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Tarjeta 1: Neural Gateway */}
              <div className="border border-white/20 p-8 flex flex-col justify-between space-y-8 bg-zinc-950/80 transition hover:border-white/50">
                <div className="space-y-4">
                  <div className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">PURIFICACIÓN DE DATOS</div>
                  <div className="text-4xl font-black text-white">NEURAL GATEWAY</div>
                  <p className="text-slate-400 text-xs leading-relaxed">Escudo tensorial y FinOps para flujos IA. Reduce la facturación de tu GPU purificando datos en Rust antes de la inferencia.</p>
                </div>
                <button onClick={() => handleSelectTier('gateway')} className="btn-spacex w-full text-center">
                  <span>OBTENER LLAVE DE PRUEBA</span>
                </button>
              </div>

              {/* Tarjeta 2: Q-Balam */}
              <div className="border-2 border-white p-8 flex flex-col justify-between space-y-8 bg-zinc-900/90 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                <div className="space-y-4">
                  <div className="text-xs font-mono font-bold tracking-widest text-[#ff0055] uppercase">CIBERSEGURIDAD INERCIAL</div>
                  <div className="text-4xl font-black text-white">Q-BALAM CORE</div>
                  <p className="text-slate-300 text-xs leading-relaxed">Motor de análisis de entropía de Shannon y Kill-Switch a nivel de Kernel (0.42ms). Protección anti-exfiltración de datos.</p>
                </div>
                <button onClick={() => handleSelectTier('qbalam')} className="btn-spacex w-full text-center !bg-white !text-black hover:!bg-transparent hover:!text-white">
                  <span>DESPLEGAR DOCKER</span>
                </button>
              </div>

              {/* Tarjeta 3: Singularity Core */}
              <div className="border border-white/20 p-8 flex flex-col justify-between space-y-8 bg-zinc-950/80 transition hover:border-white/50">
                <div className="space-y-4">
                  <div className="text-xs font-mono font-bold tracking-widest text-tzCyan uppercase">ROBÓTICA Y 4D</div>
                  <div className="text-4xl font-black text-white">SINGULARITY</div>
                  <p className="text-slate-400 text-xs leading-relaxed">Procesador determinista para latencias de 15ns. Especializado en drones y mitigación de ceguera por vibración crítica.</p>
                </div>
                <button onClick={() => handleSelectTier('singularity')} className="btn-spacex w-full text-center">
                  <span>OBTENER LLAVE DE PRUEBA</span>
                </button>
              </div>
            </div>

            {/* Quickstart Onboarding */}
            {selectedTier && (
              <div id="onboarding-section" className="pt-8">
                <QuickstartOnboarding selectedTier={selectedTier} />
              </div>
            )}
          </div>
        </section>

        {/* MODALES OCULTOS DE PRIVACIDAD Y MISIÓN */}
        <section className="w-full bg-black py-10">
          <CompanyModals />
        </section>

      </main>

      {/* FOOTER CORPORATIVO */}
      <footer className="relative z-10 w-full border-t border-white/10 px-8 py-10 bg-black text-xs font-mono text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div>TZANiX SIGNAL TECHNOLOGIES © 2026</div>
        <div className="flex space-x-8 uppercase tracking-widest text-slate-400">
          <a href="#" className="hover:text-white transition">PRIVACIDAD ZERO-RETENTION</a>
          <a href="https://github.com/mm_robeerto7" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">GITHUB</a>
          <a href="https://wa.me/526647247803" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">CONTACTO</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
