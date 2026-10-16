import React, { useState } from 'react';
import QuickstartOnboarding from './components/QuickstartOnboarding';
import CompanyModals from './components/CompanyModals';
import SpacexBackground from './components/SpacexBackground';
import MatrixBackground from './components/MatrixBackground';
import FluidBackground from './components/FluidBackground';
import DataPurificationVisualizer from './components/DataPurificationVisualizer';
import ScientificDocs from './components/ScientificDocs';
import TridentLiveSoc from './components/TridentLiveSoc';

function App() {
  const [selectedTier, setSelectedTier] = useState('docker');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSelectTier = (tier) => {
    setSelectedTier(tier);
    setTimeout(() => {
      document.getElementById('onboarding-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="font-sans antialiased relative min-h-screen bg-[#08080A] text-white">
      
      {/* HEADER / NAVBAR ESTILO SPACEX */}
      <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/50 to-transparent backdrop-blur-sm">
        <a href="#hero" className="flex items-center text-2xl sm:text-[32px] font-black tracking-[0.22em] sm:tracking-[0.38em] transform scale-x-[1.08] sm:scale-x-[1.2] origin-left transition-all hover:scale-x-[1.25] group">
          <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">TZAN</span>
          <svg viewBox="0 0 24 42" className="h-[24px] sm:h-[30px] w-auto ml-1 mr-2 sm:mr-3 relative z-10 -translate-y-[2px] sm:-translate-y-[3px]">
            <circle cx="12" cy="6" r="6" fill="#00f0ff" style={{ filter: 'drop-shadow(0px 0px 8px #00f0ff)' }} />
            <g fill="white" style={{ filter: 'drop-shadow(0px 0px 10px rgba(255,255,255,0.2))' }}>
              <path d="M 8 16 L 18 16 L 18 34 L 7 17.5 Q 6 16 8 16 Z" />
              <path d="M 16 42 L 6 42 L 6 24 L 17 40.5 Q 18 42 16 42 Z" />
            </g>
          </svg>
          <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">X</span>
        </a>

        {/* Desktop Quick Links Estilo SpaceX */}
        <nav className="hidden xl:flex items-center gap-8 text-xs font-mono font-bold tracking-[0.22em] uppercase text-white/80">
          <a href="#vertice-fpga" className="hover:text-[#00F0FF] transition">I. ESCUDO FPGA</a>
          <a href="#vertice-gpu" className="hover:text-[#FFB703] transition">II. CEREBRO GPU FFT</a>
          <a href="#vertice-rdma" className="hover:text-[#00FF66] transition">III. MALLA RDMA</a>
          <a href="#live-soc" className="hover:text-[#00F0FF] transition">CENTRO DE MANDO SOC</a>
          <a href="#corporate-dna" className="hover:text-white transition">MISIÓN &amp; VISIÓN</a>
          <a href="#contacto" className="px-4 py-2 border border-[#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF] hover:text-black transition">
            CONTACTO
          </a>
        </nav>

        {/* HAMBURGER BUTTON */}
        <button
          className="text-white space-y-1.5 focus:outline-none cursor-pointer z-[60] relative p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menú"
        >
          <div className={`w-7 sm:w-8 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-7 sm:w-8 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-7 sm:w-8 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>
      </header>

      {/* FULLSCREEN MENU OVERLAY */}
      <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-6 sm:space-y-8 px-6 text-center transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <a href="#hero" onClick={() => setIsMenuOpen(false)} className="text-lg sm:text-2xl font-bold tracking-[0.25em] uppercase text-white hover:text-[#00F0FF] transition">ARQUITECTURA TRIDENTE</a>
        <a href="#vertice-fpga" onClick={() => setIsMenuOpen(false)} className="text-lg sm:text-2xl font-bold tracking-[0.25em] uppercase text-white hover:text-[#00F0FF] transition">I. ESCUDO FPGA Q16.16 (10.0 ns)</a>
        <a href="#vertice-gpu" onClick={() => setIsMenuOpen(false)} className="text-lg sm:text-2xl font-bold tracking-[0.25em] uppercase text-white hover:text-[#FFB703] transition">II. CEREBRO ESPECTRAL GPU FFT-16</a>
        <a href="#vertice-rdma" onClick={() => setIsMenuOpen(false)} className="text-lg sm:text-2xl font-bold tracking-[0.25em] uppercase text-white hover:text-[#00FF66] transition">III. CLÚSTER RDMA RoCEv2</a>
        <a href="#live-soc" onClick={() => setIsMenuOpen(false)} className="text-lg sm:text-2xl font-bold tracking-[0.25em] uppercase text-[#00F0FF] hover:scale-105 transition">SIMULADOR SOC &amp; FORENSE EN VIVO</a>
        <a href="#corporate-dna" onClick={() => setIsMenuOpen(false)} className="text-lg sm:text-2xl font-bold tracking-[0.25em] uppercase text-white hover:text-[#00F0FF] transition">MISIÓN, VISIÓN Y PRIVACIDAD</a>
        <a href="#contacto" onClick={() => setIsMenuOpen(false)} className="text-lg sm:text-2xl font-bold tracking-[0.25em] uppercase text-white hover:text-[#00F0FF] transition">CONTACTO DIRECTO</a>
        <div className="w-24 h-px bg-white/20 my-2"></div>
        <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="text-base sm:text-xl font-black tracking-[0.3em] uppercase text-[#00F0FF] border-b-2 border-[#00F0FF] pb-2 hover:text-white transition">
          DESPLEGAR CONTENEDOR PoC &rarr;
        </a>
      </div>

      {/* MAIN CONTAINER */}
      <main className="w-full">
        
        {/* ========================================================================= */}
        {/* 1. HERO PRINCIPAL: TZANiX ÆTHER-CORE // DEFENSA DE SILICIO EN 10.0 NS     */}
        {/* ========================================================================= */}
        <section id="hero" className="spacex-section">
          <SpacexBackground />
          <div className="video-overlay"></div>

          <div className="relative z-10 max-w-5xl space-y-4 sm:space-y-5 pt-16">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 border border-[#00F0FF]/40 bg-black/60 text-[10px] sm:text-xs font-mono font-bold tracking-[0.28em] uppercase text-[#00F0FF]">
              <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-ping" />
              <span>ARQUITECTURA TRIDENTE // DEFENSA AUTÓNOMA EN EL FAST-PATH</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight uppercase leading-[0.94] text-white">
              TZANiX ÆTHER-CORE <br className="hidden sm:inline" />
              <span className="text-[#00F0FF]">10.0 NANOSEGUNDOS</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl font-light tracking-wide leading-relaxed">
              Los firewalls tradicionales tardan milisegundos y colapsan tu CPU. <strong>TZANiX Æther-Core</strong> opera directamente en el silicio y en el acceso de red (<code>#![no_std]</code>, Zero-Heap), procesando <strong>16.86 Millones de paquetes por segundo</strong> para destruir ataques DDoS volumétricos y botnets periódicas con <strong>0.00% de falsos positivos</strong>.
            </p>
            <div className="pt-3 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a href="#live-soc" className="btn-spacex w-full sm:w-auto text-center">
                <span>ABRIR CENTRO DE MANDO EN VIVO &rarr;</span>
              </a>
              <a href="#pricing" className="btn-spacex !border-[#00F0FF]/60 !text-[#00F0FF] w-full sm:w-auto text-center">
                <span>DESCARGAR PoC DOCKER (14 DÍAS)</span>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. VÉRTICE I: EL ESCUDO FPGA Q16.16 (10.0 NS CUT-THROUGH DROP)            */}
        {/* ========================================================================= */}
        <section id="vertice-fpga" className="spacex-section relative overflow-hidden">
          <DataPurificationVisualizer />
          <div className="video-overlay absolute inset-0 z-0 pointer-events-none"></div>

          <div className="relative z-10 max-w-4xl space-y-4">
            <p className="text-[10px] sm:text-xs md:text-sm font-mono font-bold tracking-[0.3em] uppercase text-[#00F0FF]">
              VÉRTICE I // ESCUDO DE PRIMERA LÍNEA (LINE-RATE 400 MHz)
            </p>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight uppercase leading-[0.94] text-white">
              ESCUDO FPGA <br className="hidden sm:inline" />PUNTO FIJO Q16.16
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl font-light tracking-wide leading-relaxed">
              Eliminamos el punto flotante y mapeamos la entropía de Shannon en <strong>2 KB de bloques BRAM internos</strong> con lectura paralela de 16 canales en un solo ciclo de reloj (2.5 ns). Si un paquete es malicioso, se aborta físicamente en el transceptor MAC (<em>Cut-Through Drop</em>) en <strong>10.0 nanosegundos</strong> antes de que termine de entrar al servidor.
            </p>
            <div className="pt-3 flex flex-wrap gap-4">
              <a href="#docs" className="btn-spacex w-full sm:w-auto text-center">
                <span>VER PIPELINE RTL (4 ETAPAS) &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. VÉRTICE II: CEREBRO ESPECTRAL GPU (FFT-16 RADIX-2 EN ZONA GRIS)        */}
        {/* ========================================================================= */}
        <section id="vertice-gpu" className="spacex-section">
          <MatrixBackground />
          <div className="video-overlay"></div>

          <div className="relative z-10 max-w-4xl space-y-4">
            <p className="text-[10px] sm:text-xs md:text-sm font-mono font-bold tracking-[0.3em] uppercase text-[#FFB703]">
              VÉRTICE II // ANÁLISIS ESPECTRAL PROFUNDO (GPUDIRECT RDMA)
            </p>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight uppercase leading-[0.94] text-white">
              CEREBRO GPU <br className="hidden sm:inline" />RADIX-2 FFT-16
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl font-light tracking-wide leading-relaxed">
              Las botnets modernas y los ataques <em>Low-Rate TCP DoS</em> imitan el tráfico humano situándose en la <strong>"Zona Gris"</strong> de entropía. Nuestro motor desvía esos flujos sospechosos a la GPU para ejecutar Transformadas Rápidas de Fourier de 16 puntos, cazando la frecuencia oculta del atacante (<strong>Bin #8 de Nyquist</strong>) en solo <strong>256 muestras</strong> y recalibrando el umbral CSR de la FPGA en pleno vuelo.
            </p>
            <div className="pt-3">
              <a href="#live-soc" className="btn-spacex w-full sm:w-auto text-center">
                <span>PROBAR DETECCIÓN NYQUIST EN VIVO &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. VÉRTICE III: SISTEMA NERVIOSO DISTRIBUIDO RDMA (RoCEv2)                */}
        {/* ========================================================================= */}
        <section id="vertice-rdma" className="spacex-section">
          <FluidBackground />
          <div className="video-overlay"></div>

          <div className="relative z-10 max-w-4xl space-y-4">
            <p className="text-[10px] sm:text-xs md:text-sm font-mono font-bold tracking-[0.3em] uppercase text-[#00FF66]">
              VÉRTICE III // INMUNIDAD COLECTIVA ZERO-CPU
            </p>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight uppercase leading-[0.94] text-white">
              MALLA CLÚSTER <br className="hidden sm:inline" />RDMA RoCEv2
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl font-light tracking-wide leading-relaxed">
              Cuando un nodo detecta un ataque, transmite un descriptor hiper-compacto de <strong>32 bytes</strong> mediante <code>RDMA_WRITE</code> directo a la memoria RAM de todos los nodos vecinos (tarjetas NVIDIA BlueField DPU / SmartNICs). Toda tu infraestructura se blinda al unísono en microsegundos sin interrumpir al sistema operativo.
            </p>
            <div className="pt-3">
              <a href="#live-soc" className="btn-spacex w-full sm:w-auto text-center">
                <span>VER SINCRONIZACIÓN DE 8 NODOS &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. SIMULADOR INTERACTIVO SOC & FORENSE EN VIVO                            */}
        {/* ========================================================================= */}
        <TridentLiveSoc />

        {/* ========================================================================= */}
        {/* 6. ESPECIFICACIÓN TÉCNICA Y CERTIFICACIÓN DE 10M FLITS                    */}
        {/* ========================================================================= */}
        <ScientificDocs />

        {/* ========================================================================= */}
        {/* 7. MODALIDADES DE LICENCIAMIENTO Y DESPLIEGUE DOCKER SELF-SERVICE         */}
        {/* ========================================================================= */}
        <section id="pricing" className="spacex-section !h-auto min-h-screen !justify-center py-24 bg-black">
          <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">
            
            <div className="border-b border-white/20 pb-6">
              <p className="text-xs font-mono font-bold tracking-[0.35em] uppercase text-[#00F0FF] mb-2">
                ADQUISICIÓN COMERCIAL &amp; PRUEBA DE CONCEPTO (PoC)
              </p>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight uppercase text-white">
                MODALIDADES DE DESPLIEGUE
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Modalidad 1: Contenedor Enterprise Docker / Bare-Metal */}
              <div className="border border-[#00F0FF]/50 p-8 flex flex-col justify-between space-y-8 bg-[#141419] shadow-[0_0_30px_rgba(0,240,255,0.1)]">
                <div className="space-y-4">
                  <div className="text-xs font-mono font-bold tracking-widest text-[#00F0FF] uppercase">
                    SOFTWARE PURO // SERVIDOR ÚNICO O CLOUD
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-white uppercase">
                    ÆTHER-CORE DOCKER &amp; C-FFI
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Ideal para proteger de inmediato servidores empresariales, plataformas FinTech, pasarelas de pago y sistemas médicos críticos sin comprar hardware adicional. Latencia determinista de <strong>59.31 ns/flit</strong>, exportador Prometheus y cabecera nativa <code>tzanix_aether.h</code>.
                  </p>
                </div>
                <button onClick={() => handleSelectTier('docker')} className="btn-spacex w-full text-center">
                  <span>GENERAR LICENCIA PoC DOCKER (14 DÍAS)</span>
                </button>
              </div>

              {/* Modalidad 2: Appliance de Silicio Tridente */}
              <div className="border-2 border-[#D4AF37] p-8 flex flex-col justify-between space-y-8 bg-[#141419] shadow-[0_0_40px_rgba(212,175,55,0.18)]">
                <div className="space-y-4">
                  <div className="text-xs font-mono font-bold tracking-widest text-[#FFB703] uppercase">
                    GRADO MILITAR &amp; HFT // SILICIO DEDICADO
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-white uppercase">
                    APPLIANCE TRIDENTE (FPGA + DPU)
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Solución llave en mano para Centros de Datos, Telcos/ISPs y Fondos HFT sobre tarjetas <strong>Xilinx UltraScale+ / Intel Agilex</strong> y <strong>NVIDIA BlueField-3 DPU</strong>. Descarte físico Cut-Through en <strong>10.0 ns</strong> y sincronización RDMA RoCEv2 a escala de 100GbE/400GbE.
                  </p>
                </div>
                <button
                  onClick={() => handleSelectTier('appliance')}
                  className="btn-spacex w-full text-center !bg-[#FFB703] !border-[#FFB703] !text-black hover:!bg-transparent hover:!text-[#FFB703]"
                >
                  <span>SOLICITAR DESPLIEGUE DE SILICIO</span>
                </button>
              </div>
            </div>

            {selectedTier && (
              <div id="onboarding-section" className="pt-6">
                <QuickstartOnboarding selectedTier={selectedTier} />
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. MISIÓN, VISIÓN, VALORES, PRIVACIDAD Y CONTACTO EJECUTIVO               */}
        {/* ========================================================================= */}
        <div className="w-full bg-black">
          <CompanyModals />
        </div>

      </main>

      {/* FOOTER CORPORATIVO ESTILO SPACEX */}
      <footer className="relative z-10 w-full border-t border-white/10 px-5 sm:px-8 py-10 bg-black text-xs font-mono text-slate-400 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div>
          <strong className="text-white">TZANiX SIGNAL TECHNOLOGIES</strong> &copy; 2026 · ARQUITECTURA TRIDENTE (ÆTHER-CORE)
        </div>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 uppercase tracking-widest">
          <a href="#corporate-dna" className="hover:text-[#00F0FF] transition">MISIÓN Y VISIÓN</a>
          <a href="#live-soc" className="hover:text-[#00F0FF] transition">SOC EN VIVO</a>
          <a href="mailto:mmrobeerto@gmail.com" className="text-[#00F0FF] hover:underline transition">mmrobeerto@gmail.com</a>
          <a href="https://wa.me/526647247803" target="_blank" rel="noopener noreferrer" className="hover:text-[#00FF66] transition">+52 664 724 7803</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
