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
    <div className="font-sans antialiased relative min-h-screen bg-[#06090F] text-slate-100">
      
      {/* HEADER CORPORATIVO INSTITUCIONAL (SIN SUPERPOSICIÓN, PRESENCIA SÓLIDA) */}
      <header className="fixed top-0 left-0 w-full h-20 z-50 px-5 sm:px-8 lg:px-12 flex items-center justify-between bg-[#06090F]/95 backdrop-blur-xl border-b border-slate-800/90">
        
        {/* LOGO TZANIX UNIFICADO EN UN SOLO COLOR SÓLIDO Y LETRA 'I' GEOMÉTRICA */}
        <a
          href="#hero"
          className="flex items-center gap-3.5 shrink-0 group focus:outline-none"
        >
          <span className="text-2xl sm:text-[28px] font-black tracking-[0.32em] uppercase text-white select-none">
            TZANIX
          </span>
          <span className="hidden sm:inline-block h-4 w-px bg-slate-700"></span>
          <span className="hidden sm:inline-block text-[10px] font-mono font-semibold tracking-[0.25em] uppercase text-[#38BDF8]">
            ÆTHER-CORE
          </span>
        </a>

        {/* NAVEGACIÓN EJECUTIVA DESKTOP (SIN COLISIONES NI SALTOS DE LÍNEA) */}
        <nav className="hidden xl:flex items-center gap-7 text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-slate-300">
          <a href="#vertice-fpga" className="whitespace-nowrap hover:text-white transition-colors">
            I. ESCUDO FPGA
          </a>
          <a href="#vertice-gpu" className="whitespace-nowrap hover:text-white transition-colors">
            II. CEREBRO GPU FFT
          </a>
          <a href="#vertice-rdma" className="whitespace-nowrap hover:text-white transition-colors">
            III. MALLA RDMA
          </a>
          <a href="#live-soc" className="whitespace-nowrap text-[#38BDF8] hover:text-white transition-colors">
            CONSOLA SOC
          </a>
          <a href="#corporate-dna" className="whitespace-nowrap hover:text-white transition-colors">
            MISIÓN &amp; VISIÓN
          </a>
          <a
            href="#contacto"
            className="whitespace-nowrap px-4 py-2 border border-slate-600 bg-slate-900/80 text-white hover:border-[#38BDF8] hover:bg-[#38BDF8] hover:text-[#06090F] font-bold transition-all"
          >
            CONTACTO
          </a>
        </nav>

        {/* BOTÓN MENÚ HAMBURGUESA */}
        <button
          className="text-white space-y-1.5 focus:outline-none cursor-pointer z-[60] relative p-2 shrink-0 xl:ml-4"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menú"
        >
          <div className={`w-6 sm:w-7 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-6 sm:w-7 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 sm:w-7 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>
      </header>

      {/* OVERLAY DE MENÚ CORPORATIVO FULLSCREEN */}
      <div className={`fixed inset-0 z-40 bg-[#06090F]/98 backdrop-blur-2xl flex flex-col items-center justify-center space-y-6 sm:space-y-7 px-6 text-center transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="text-xs font-mono tracking-[0.35em] uppercase text-[#38BDF8] mb-2">
          TZANIX SIGNAL TECHNOLOGIES // NAVEGACIÓN EJECUTIVA
        </div>
        <a href="#hero" onClick={() => setIsMenuOpen(false)} className="text-lg sm:text-2xl font-bold tracking-[0.22em] uppercase text-white hover:text-[#38BDF8] transition">ARQUITECTURA TRIDENTE</a>
        <a href="#vertice-fpga" onClick={() => setIsMenuOpen(false)} className="text-lg sm:text-2xl font-bold tracking-[0.22em] uppercase text-slate-300 hover:text-white transition">I. ESCUDO FPGA Q16.16 (219 NS POR PAQUETE)</a>
        <a href="#vertice-gpu" onClick={() => setIsMenuOpen(false)} className="text-lg sm:text-2xl font-bold tracking-[0.22em] uppercase text-slate-300 hover:text-white transition">II. CEREBRO ESPECTRAL GPU FFT-16</a>
        <a href="#vertice-rdma" onClick={() => setIsMenuOpen(false)} className="text-lg sm:text-2xl font-bold tracking-[0.22em] uppercase text-slate-300 hover:text-white transition">III. CLÚSTER RDMA RoCEv2</a>
        <a href="#live-soc" onClick={() => setIsMenuOpen(false)} className="text-lg sm:text-2xl font-bold tracking-[0.22em] uppercase text-[#38BDF8] hover:text-white transition">CONSOLA TÁCTICA SOC &amp; FORENSE</a>
        <a href="#corporate-dna" onClick={() => setIsMenuOpen(false)} className="text-lg sm:text-2xl font-bold tracking-[0.22em] uppercase text-slate-300 hover:text-white transition">MISIÓN, VISIÓN Y PRIVACIDAD</a>
        <a href="#contacto" onClick={() => setIsMenuOpen(false)} className="text-lg sm:text-2xl font-bold tracking-[0.22em] uppercase text-slate-300 hover:text-white transition">CONTACTO EJECUTIVO</a>
        <div className="w-24 h-px bg-slate-800 my-2"></div>
        <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="text-sm sm:text-base font-mono font-bold tracking-[0.25em] uppercase px-6 py-3 border border-[#38BDF8] text-[#38BDF8] hover:bg-[#38BDF8] hover:text-[#06090F] transition">
          DESPLEGAR CONTENEDOR PoC &rarr;
        </a>
      </div>

      {/* CONTENEDOR PRINCIPAL */}
      <main className="w-full">
        
        {/* ========================================================================= */}
        {/* 1. HERO PRINCIPAL: TZANIX ÆTHER-CORE // DEFENSA DE SILICIO EN  219 NS POR PAQUETE */}
        {/* ========================================================================= */}
        <section id="hero" className="spacex-section">
          <SpacexBackground />
          <div className="video-overlay"></div>

          <div className="relative z-10 max-w-5xl space-y-5 pt-20">
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 border border-slate-700/80 bg-[#0B111E]/90 text-[10px] sm:text-xs font-mono font-semibold tracking-[0.25em] uppercase text-[#38BDF8]">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
              <span>ARQUITECTURA TRIDENTE // DEFENSA CIBERNÉTICA DE SILICIO</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight uppercase leading-[0.96] text-white">
              TZANIX ÆTHER-CORE <br className="hidden sm:inline" />
              <span className="text-[#38BDF8]">10.0 NANOSEGUNDOS</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl font-normal tracking-wide leading-relaxed">
              Los firewalls tradicionales tardan milisegundos y colapsan la CPU bajo ataques volumétricos. <strong className="text-white">TZANIX Æther-Core</strong> opera directamente en el silicio y en el acceso de red (<code>#![no_std]</code>, Zero-Heap), procesando <strong className="text-white">16.86 Millones de paquetes por segundo</strong> para neutralizar ataques DDoS y botnets periódicas con <strong className="text-white">0.00% de falsos positivos</strong>.
            </p>
            <div className="pt-3 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a href="#live-soc" className="btn-spacex w-full sm:w-auto text-center">
                <span>ABRIR CONSOLA SOC EN VIVO &rarr;</span>
              </a>
              <a href="#pricing" className="btn-spacex !border-slate-600 !bg-[#0B111E]/80 !text-slate-200 hover:!border-white hover:!text-black w-full sm:w-auto text-center">
                <span>DESCARGAR PoC DOCKER (14 DÍAS)</span>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. VÉRTICE I: EL ESCUDO FPGA Q16.16 (10.0 NS CUT-THROUGH DROP)            */}
        {/* ========================================================================= */}
        <section id="vertice-fpga" className="spacex-section relative overflow-hidden scroll-mt-20">
          <DataPurificationVisualizer />
          <div className="video-overlay absolute inset-0 z-0 pointer-events-none"></div>

          <div className="relative z-10 max-w-4xl space-y-4">
            <p className="text-[10px] sm:text-xs font-mono font-semibold tracking-[0.28em] uppercase text-[#38BDF8]">
              VÉRTICE I // ESCUDO DE PRIMERA LÍNEA (LINE-RATE 400 MHz)
            </p>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase leading-[0.96] text-white">
              ESCUDO FPGA <br className="hidden sm:inline" />PUNTO FIJO Q16.16
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl font-normal tracking-wide leading-relaxed">
              Eliminamos el punto flotante en la ruta crítica mediante <strong className="text-white">WindowEntropy Q16.16</strong> (distribución de 256 buckets de IPs de origen con precisión <code>&lt; 0.001 bits</code>) y <strong className="text-white">2 KB de bloques BRAM internos</strong> en FPGA (2.5 ns @ 400 MHz). Si se detecta inundación concentrada o spoofing masivo, el paquete se aborta físicamente en el transceptor MAC (<em>Cut-Through Drop</em>) en <strong className="text-white">10.0 nanosegundos</strong>.
            </p>
            <div className="pt-3 flex flex-wrap gap-4">
              <a href="#docs" className="btn-spacex w-full sm:w-auto text-center">
                <span>VER ESPECIFICACIÓN RTL (4 ETAPAS) &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. VÉRTICE II: CEREBRO ESPECTRAL GPU (FFT-16 RADIX-2 EN ZONA GRIS)        */}
        {/* ========================================================================= */}
        <section id="vertice-gpu" className="spacex-section scroll-mt-20">
          <MatrixBackground />
          <div className="video-overlay"></div>

          <div className="relative z-10 max-w-4xl space-y-4">
            <p className="text-[10px] sm:text-xs font-mono font-semibold tracking-[0.28em] uppercase text-[#38BDF8]">
              VÉRTICE II // ANÁLISIS ESPECTRAL PROFUNDO (GPUDIRECT RDMA)
            </p>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase leading-[0.96] text-white">
              CEREBRO GPU <br className="hidden sm:inline" />RADIX-2 FFT-16
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl font-normal tracking-wide leading-relaxed">
              Las botnets avanzadas y los ataques <em>Low-Rate TCP DoS</em> imitan el tráfico legítimo situándose en la <strong className="text-white">"Zona Gris"</strong> de entropía. Nuestro motor deriva esos flujos sospechosos a la GPU para ejecutar Transformadas Rápidas de Fourier de 16 puntos, aislando la frecuencia oculta del atacante (<strong className="text-white">Bin #8 de Nyquist</strong>) en solo <strong className="text-white">256 muestras</strong> y recalibrando el registro CSR de la FPGA en pleno vuelo.
            </p>
            <div className="pt-3">
              <a href="#live-soc" className="btn-spacex w-full sm:w-auto text-center">
                <span>PROBAR DETECCIÓN ESPECTRAL EN VIVO &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. VÉRTICE III: SISTEMA NERVIOSO DISTRIBUIDO RDMA (RoCEv2)                */}
        {/* ========================================================================= */}
        <section id="vertice-rdma" className="spacex-section scroll-mt-20">
          <FluidBackground />
          <div className="video-overlay"></div>

          <div className="relative z-10 max-w-4xl space-y-4">
            <p className="text-[10px] sm:text-xs font-mono font-semibold tracking-[0.28em] uppercase text-[#38BDF8]">
              VÉRTICE III // INMUNIDAD COLECTIVA ZERO-CPU
            </p>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase leading-[0.96] text-white">
              MALLA CLÚSTER <br className="hidden sm:inline" />RDMA RoCEv2
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl font-normal tracking-wide leading-relaxed">
              Cuando un nodo identifica una amenaza, transmite un descriptor hiper-compacto de <strong className="text-white">32 bytes</strong> mediante <code>RDMA_WRITE</code> directo a la memoria RAM de todos los nodos vecinos (tarjetas NVIDIA BlueField DPU / SmartNICs). Toda tu infraestructura se blinda al unísono en microsegundos sin consumir ciclos de CPU.
            </p>
            <div className="pt-3">
              <a href="#live-soc" className="btn-spacex w-full sm:w-auto text-center">
                <span>VER SINCRONIZACIÓN DE 8 NODOS &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. CONSOLA TÁCTICA SOC & FORENSE EN VIVO                                  */}
        {/* ========================================================================= */}
        <TridentLiveSoc />

        {/* ========================================================================= */}
        {/* 6. ESPECIFICACIÓN TÉCNICA Y CERTIFICACIÓN DE 10M FLITS                    */}
        {/* ========================================================================= */}
        <ScientificDocs />

        {/* ========================================================================= */}
        {/* 7. MODALIDADES DE LICENCIAMIENTO Y DESPLIEGUE (VPS NATIVO VS SILICIO)     */}
        {/* ========================================================================= */}
        <section id="pricing" className="w-full py-28 px-5 sm:px-[4vw] bg-[#06090F] border-t border-slate-800/80 scroll-mt-20">
          <div className="relative z-10 max-w-7xl mx-auto w-full space-y-14">
            
            <div className="border-b border-slate-800 pb-6">
              <p className="text-xs font-mono font-semibold tracking-[0.3em] uppercase text-[#38BDF8] mb-2">
                ARQUITECTURA DE DESPLIEGUE SEGÚN TU INFRAESTRUCTURA (VPS CLOUD VS. DATACENTER FÍSICO)
              </p>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase text-white">
                MODALIDADES DE DESPLIEGUE
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Modalidad 1: Agente Nativo Linux (CentOS / AlmaLinux / Ubuntu) & Docker */}
              <div className="border border-slate-800 hover:border-[#38BDF8]/60 p-8 flex flex-col justify-between space-y-8 bg-[#0B111E] transition-colors">
                <div className="space-y-4">
                  <div className="text-xs font-mono font-semibold tracking-[0.2em] text-[#38BDF8] uppercase">
                    MODALIDAD I // VPS COMPARTIDOS (CENTOS / ALMALINUX / UBUNTU) &amp; CLOUD
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
                    AGENTE NATIVO LINUX (ZERO-DEPS) &amp; DOCKER
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Diseñado para <strong className="text-white">instancias VPS virtualizadas (Hostinger, AWS, DigitalOcean)</strong> que no poseen acceso físico a tarjetas FPGA ni bus PCIe. Se despliega como un <strong className="text-slate-200">Binario Estático Nativo en Rust (<code>musl</code>, sin Docker y sin depender de <code>glibc</code> u <code>OpenSSL</code>)</strong>, inmune a fallos por actualizaciones de CentOS a AlmaLinux. Opera en CPU a <strong className="text-white">59.31 ns/flit</strong> y se integra automáticamente con <strong className="text-[#38BDF8]">CSF/LFD (<code>csf -td</code>), iptables y Cloudflare</strong>.
                  </p>
                </div>
                <button onClick={() => handleSelectTier('docker')} className="btn-spacex w-full text-center">
                  <span>DESCARGAR SCRIPT NATIVO LINUX / DOCKER</span>
                </button>
              </div>

              {/* Modalidad 2: Appliance de Silicio Tridente */}
              <div className="border border-[#38BDF8]/50 p-8 flex flex-col justify-between space-y-8 bg-[#0F172A] shadow-[0_0_40px_rgba(56,189,248,0.08)]">
                <div className="space-y-4">
                  <div className="text-xs font-mono font-semibold tracking-[0.2em] text-[#38BDF8] uppercase">
                    MODALIDAD II // DATACENTERS PROPIOS &amp; SERVIDORES DEDICADOS BARE-METAL
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
                    APPLIANCE FÍSICO TRIDENTE (FPGA + DPU)
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Solución de hardware físico dedicada para Centros de Datos, Telcos/ISPs e Instituciones Financieras con acceso directo al bus PCIe sobre tarjetas <strong className="text-white">Xilinx UltraScale+ / Intel Agilex</strong> y SmartNICs <strong className="text-white">NVIDIA BlueField-3 DPU</strong>. Ejecuta el descarte físico <em>Cut-Through</em> en la tarjeta de red en <strong className="text-[#38BDF8]">10.0 nanosegundos</strong> antes del sistema operativo y sincronización RDMA RoCEv2 a escala de 100GbE/400GbE.
                  </p>
                </div>
                <button
                  onClick={() => handleSelectTier('appliance')}
                  className="btn-spacex w-full text-center !border-[#38BDF8] !bg-[#38BDF8] !text-[#06090F] hover:!bg-white hover:!border-white"
                >
                  <span>SOLICITAR APPLIANCE DE SILICIO DEDICADO</span>
                </button>
              </div>
            </div>

            {selectedTier && (
              <div id="onboarding-section" className="pt-4">
                <QuickstartOnboarding selectedTier={selectedTier} />
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. MISIÓN, VISIÓN, VALORES, PRIVACIDAD Y CONTACTO EJECUTIVO               */}
        {/* ========================================================================= */}
        <div className="w-full bg-[#06090F]">
          <CompanyModals />
        </div>

      </main>

      {/* FOOTER CORPORATIVO INSTITUCIONAL */}
      <footer className="relative z-10 w-full border-t border-slate-800/90 px-5 sm:px-12 py-10 bg-[#06090F] text-xs font-mono text-slate-400 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div>
          <strong className="text-white tracking-wider">TZANIX SIGNAL TECHNOLOGIES</strong> &copy; 2026 · ARQUITECTURA TRIDENTE (ÆTHER-CORE)
        </div>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 uppercase tracking-widest">
          <a href="#corporate-dna" className="hover:text-white transition">MISIÓN Y VISIÓN</a>
          <a href="#live-soc" className="hover:text-white transition">CONSOLA SOC</a>
          <a href="mailto:mmrobeerto@gmail.com" className="text-[#38BDF8] hover:text-white transition">mmrobeerto@gmail.com</a>
          <a href="https://wa.me/526647247803" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">+52 664 724 7803</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
