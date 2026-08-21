import React, { useState } from 'react';
import QuickstartOnboarding from './components/QuickstartOnboarding';
import CompanyModals from './components/CompanyModals';
import SpacexBackground from './components/SpacexBackground';
import MatrixBackground from './components/MatrixBackground';
import FluidBackground from './components/FluidBackground';
import MathBackground from './components/MathBackground';
import DataPurificationVisualizer from './components/DataPurificationVisualizer';
import ScientificDocs from './components/ScientificDocs';

function App() {
  const [selectedTier, setSelectedTier] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);  const handleSelectTier = (tier) => {
    setSelectedTier(tier);
    setTimeout(() => {
      document.getElementById('onboarding-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="font-sans antialiased relative min-h-screen">
      
      {/* HEADER / NAVBAR ESTILO SPACEX */}
      <header className="absolute top-0 left-0 w-full z-50 px-8 py-7 flex items-center justify-between">
        <a href="#hero" className="flex items-center text-[34px] font-black tracking-[0.4em] transform scale-x-[1.25] origin-left transition-all hover:scale-x-[1.3] group mr-16 lg:mr-24">
          <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">TZAN</span>
          
          {/* Custom SVG 'i' basado en tu diseÃ±o */}
          <svg viewBox="0 0 24 42" className="h-[32px] w-auto ml-1 mr-3 relative z-10 -translate-y-[4px]">
            {/* Punto Cyan */}
            <circle cx="12" cy="6" r="6" fill="#00f0ff" style={{ filter: 'drop-shadow(0px 0px 8px #00f0ff)' }} />
            
            {/* Tallo geomÃ©trico blanco */}
            <g fill="white" style={{ filter: 'drop-shadow(0px 0px 10px rgba(255,255,255,0.2))' }}>
              {/* TriÃ¡ngulo superior */}
              <path d="M 8 16 L 18 16 L 18 34 L 7 17.5 Q 6 16 8 16 Z" />
              {/* TriÃ¡ngulo inferior */}
              <path d="M 16 42 L 6 42 L 6 24 L 17 40.5 Q 18 42 16 42 Z" />
            </g>
          </svg>

          <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">X</span>
        </a>
        
        {/* HAMBURGER BUTTON */}
        <button 
          className="text-white space-y-1.5 focus:outline-none cursor-pointer z-[60] relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={`w-8 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-8 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-8 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>
      </header>

      {/* FULLSCREEN MENU OVERLAY */}
      <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-10 transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <a href="#neural-gateway" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold tracking-[0.25em] uppercase text-white hover:text-tzCyan hover:scale-105 transition-all">NEURAL GATEWAY</a>
        <a href="#q-balam" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold tracking-[0.25em] uppercase text-white hover:text-tzCyan hover:scale-105 transition-all">Q-BALAM</a>
        <a href="#edtech" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold tracking-[0.25em] uppercase text-white hover:text-tzCyan hover:scale-105 transition-all">EDTECH CUÃNTICA</a>
        <div className="w-24 h-px bg-white/20 my-4"></div>
        <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="text-xl font-black tracking-[0.3em] uppercase text-tzCyan border-b-2 border-tzCyan pb-2 hover:text-white transition-all">DESPLEGAR MÃ“DULO &rarr;</a>
      </div>

      {/* MAIN CONTAINER */}
      <main className="w-full">
        
        {/* ========================================================================= */}
        {/* 1. HERO PRINCIPAL: DE LA ENTROPÃA AL ORDEN MATEMÃTICO                     */}
        {/* ========================================================================= */}
        <section id="hero" className="spacex-section">
          <SpacexBackground />
          <div className="video-overlay"></div>

          <div className="relative z-10 max-w-4xl space-y-4">
            <p className="text-xs md:text-sm font-mono font-bold tracking-[0.35em] uppercase text-tzCyan">
              DEEP TECH CYBERSECURITY / RUST & PYTHON
            </p>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight uppercase leading-[0.92] text-white">
              DE LA ENTROPÍA AL <br /> ORDEN MATEMÁTICO
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-xl font-light tracking-wide leading-relaxed pt-2">
              Microservicios L7 orquestados con la flexibilidad de Python, pero ejecutando Topología 4D a la velocidad del silicio puro gracias a bindings nativos en Rust.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <a href="#neural-gateway" className="btn-spacex">
                <span>EXPLORAR ARQUITECTURA &rarr;</span>
              </a>
              <a href="https://pypi.org/project/tzanix-core/" target="_blank" rel="noopener noreferrer" className="btn-spacex !border-white/30 text-white/70">
                <span>SDK PYTHON (PyPI)</span>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. TZANIX NEURAL GATEWAY (PURIFICACIÃ“N DE DATOS & FINOPS IA)              */}
        {/* ========================================================================= */}
        <section id="neural-gateway" className="spacex-section relative overflow-hidden">
          <DataPurificationVisualizer />
          <div className="video-overlay absolute inset-0 z-0 pointer-events-none"></div>

          <div className="relative z-10 max-w-4xl space-y-4">
            <p className="text-xs md:text-sm font-mono font-bold tracking-[0.35em] uppercase text-tzCyan">
              REVERSE PROXY L7 & FINOPS
            </p>
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight uppercase leading-[0.92] text-white">
              TZANiX NEURAL <br />GATEWAY
            </h2>
            <p className="text-slate-300 text-sm md:text-base max-w-xl font-light tracking-wide leading-relaxed pt-2">
              Purificación de datos Stateless en la periferia de tu red. Detén anomalías inerciales en ~0.56 milisegundos y reduce entre un 40% y 80% el consumo de CPU de tus servidores al destruir el tráfico basura antes de que toque tu aplicación.
            </p>
            <div className="pt-4">
              <a href="https://gateway.tzanix.com/" target="_blank" rel="noopener noreferrer" className="btn-spacex">
                <span>VER DEMO INTERACTIVA &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. TZANIX Q-BALAM (CIBERSEGURIDAD INERCIAL & ANTI-EXFILTRACIÃ“N)           */}
        {/* ========================================================================= */}
        <section id="q-balam" className="spacex-section">
          <MatrixBackground />
          <div className="video-overlay"></div>

          <div className="relative z-10 max-w-4xl space-y-4">
            <p className="text-xs md:text-sm font-mono font-bold tracking-[0.35em] uppercase text-[#ff0055]">
              DEFENSA ZERO-TRUST & SHADOW MODE
            </p>
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight uppercase leading-[0.92] text-white">
              TZANiX Q-BALAM
            </h2>
            <p className="text-slate-300 text-sm md:text-base max-w-xl font-light tracking-wide leading-relaxed pt-2">
              Arquitectura de mitigación de riesgos diseñada para SysAdmins. Despliégalo en Modo Auditoría para garantizar 0% de Falsos Positivos. Soporta diseño Fail-Open y permite Whitelists dinámicos para tráfico cifrado y JWT.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <a href="https://qbalam.tzanix.com/" target="_blank" rel="noopener noreferrer" className="btn-spacex">
                <span>VER DEMO INTERACTIVA &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        

        {/* ========================================================================= */}
        {/* 5. TZANIX EDTECH (PIZARRAS Y SIMULACIONES CUÃNTICAS INTERACTIVAS)         */}
        {/* ========================================================================= */}
        <section id="edtech" className="spacex-section">
          <MathBackground />
          <div className="video-overlay"></div>

          <div className="relative z-10 max-w-4xl space-y-4">
            <p className="text-xs md:text-sm font-mono font-bold tracking-[0.35em] uppercase text-tzCyan">
              EDUCACIÃ“N CUÃNTICA & OBSERVABILIDAD
            </p>
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight uppercase leading-[0.92] text-white">
              TZANiX EDTECH
            </h2>
            <p className="text-slate-300 text-sm md:text-base max-w-xl font-light tracking-wide leading-relaxed pt-2">
              Plataforma interactiva para docentes e investigadores. VisualizaciÃ³n del principio de incertidumbre de Heisenberg, efectos de observador y osciloscopÃ­a dual en tiempo real.
            </p>
            <div className="pt-4">
              <a href="https://edtech.tzanix.com/" target="_blank" rel="noopener noreferrer" className="btn-spacex">
                <span>ABRIR EDTECH &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* COMPLIANCE Y CONFIANZA                                                    */}
        {/* ========================================================================= */}
        <section className="relative z-10 w-full py-24 bg-zinc-950 border-t border-b border-white/10 px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <p className="text-xs font-mono font-bold tracking-[0.35em] uppercase text-tzCyan">
              CUMPLIMIENTO Y CONFIANZA
            </p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight uppercase text-white">
              SEGURIDAD DESDE EL DISEÃ‘O
            </h2>
            <p className="text-slate-400 text-sm md:text-base font-light tracking-wide leading-relaxed pt-4 max-w-3xl mx-auto">
              (Security by Design): Nuestras soluciones están diseñadas arquitectónicamente bajo los controles estrictos de SOC 2, ISO/IEC 42001 (AI Governance) y las normativas del EU AI Act. Proveemos un SBOM (Software Bill of Materials) transparente y pipelines validados con cargo audit para garantizar la seguridad de la cadena de suministro.
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* DOCUMENTACIÃ“N CIENTÃFICA (RUST-PYTHON)                                   */}
        {/* ========================================================================= */}
        <ScientificDocs />

        {/* ========================================================================= */}
        {/* 6. SELECCIÃ“N DE PLANES Y DESPLIEGUE                                       */}
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
                  <div className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">PURIFICACIÃ“N DE DATOS</div>
                  <div className="text-4xl font-black text-white">NEURAL GATEWAY</div>
                  <p className="text-slate-400 text-xs leading-relaxed">Escudo tensorial y FinOps para flujos IA. Reduce la facturaciÃ³n de tu GPU purificando datos en Rust antes de la inferencia.</p>
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

              
            </div>

            {/* Quickstart Onboarding */}
            {selectedTier && (
              <div id="onboarding-section" className="pt-8">
                <QuickstartOnboarding selectedTier={selectedTier} />
              </div>
            )}
          </div>
        </section>

        {/* MODALES OCULTOS DE PRIVACIDAD Y MISIÃ“N */}
        <section className="w-full bg-black py-10">
          <CompanyModals />
        </section>

      </main>

      {/* FOOTER CORPORATIVO */}
      <footer className="relative z-10 w-full border-t border-white/10 px-8 py-10 bg-black text-xs font-mono text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div>TZANiX SIGNAL TECHNOLOGIES Â© 2026</div>
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

