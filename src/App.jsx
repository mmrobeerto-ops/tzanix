import React, { useState } from 'react';
import QuickstartOnboarding from './components/QuickstartOnboarding';
import ModoSombra from './components/ModoSombra';
import CompanyModals from './components/CompanyModals';
import SpacexBackground from './components/SpacexBackground';
import ScientificDocs from './components/ScientificDocs';
import TridentLiveSoc from './components/TridentLiveSoc';

const NAV_LINKS = [
  { href: '#el-motor', label: 'EL MOTOR (~219 NS)' },
  { href: '#modo-sombra', label: 'MODO SOMBRA' },
  { href: '#rendimiento', label: 'SOC EN VIVO' },
  { href: '#despliegue', label: 'DESPLIEGUE', accent: true },
  { href: '#contacto', label: 'CONTACTO' },
];

function App() {
  const [selectedTier] = useState('docker');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="font-sans antialiased relative min-h-screen bg-[#06090F] text-slate-100">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full h-20 z-50 px-5 sm:px-8 lg:px-12 flex items-center justify-between bg-[#06090F]/95 backdrop-blur-xl border-b border-slate-800/90">
        <a href="#hero" className="flex items-center gap-3.5 shrink-0 group focus:outline-none">
          <span className="text-2xl sm:text-[28px] font-black tracking-[0.32em] uppercase text-white select-none">
            TZANIX
          </span>
          <span className="hidden sm:inline-block h-4 w-px bg-slate-700" />
          <span className="hidden sm:inline-block text-[10px] font-mono font-semibold tracking-[0.25em] uppercase text-[#38BDF8]">
            ÆTHER-CORE
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-7 text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-slate-300">
          {NAV_LINKS.map((l) =>
            l.accent ? (
              <a
                key={l.href}
                href={l.href}
                className="whitespace-nowrap px-4 py-2 border border-slate-600 bg-slate-900/80 text-white hover:border-[#38BDF8] hover:bg-[#38BDF8] hover:text-[#06090F] font-bold transition-all"
              >
                {l.label}
              </a>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="whitespace-nowrap hover:text-white transition-colors"
              >
                {l.label}
              </a>
            )
          )}
        </nav>

        {/* Hamburger */}
        <button
          className="text-white space-y-1.5 focus:outline-none cursor-pointer z-[60] relative p-2 shrink-0 xl:ml-4"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menú"
        >
          <div className={`w-6 sm:w-7 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 sm:w-7 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 sm:w-7 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </header>

      {/* Overlay menu */}
      <div className={`fixed inset-0 z-40 bg-[#06090F]/98 backdrop-blur-2xl flex flex-col items-center justify-center space-y-6 sm:space-y-7 px-6 text-center transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="text-xs font-mono tracking-[0.35em] uppercase text-[#38BDF8] mb-2">
          TZANIX SIGNAL TECHNOLOGIES // NAVEGACIÓN EJECUTIVA
        </div>
        {NAV_LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={closeMenu}
            className={`text-lg sm:text-2xl font-bold tracking-[0.22em] uppercase transition ${l.accent ? 'text-[#38BDF8] hover:text-white' : 'text-slate-300 hover:text-white'}`}
          >
            {l.label}
          </a>
        ))}
        <div className="w-24 h-px bg-slate-800 my-2" />
        <a
          href="#despliegue"
          onClick={closeMenu}
          className="text-sm sm:text-base font-mono font-bold tracking-[0.25em] uppercase px-6 py-3 border border-[#38BDF8] text-[#38BDF8] hover:bg-[#38BDF8] hover:text-[#06090F] transition"
        >
          DESPLEGAR CONTENEDOR PoC →
        </a>
      </div>

      {/* Fondo global de partículas (fijo, detrás de todo) */}
      <SpacexBackground />

      {/* Main content */}
      <main className="relative z-10 w-full">
        {/* HERO */}
        <section id="hero" className="spacex-section scroll-mt-20">
          <div className="video-overlay" />
          <div className="relative z-10 max-w-5xl space-y-6 pt-20">
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 border border-slate-700/80 bg-[#0B111E]/90 text-[10px] sm:text-xs font-mono font-semibold tracking-[0.25em] uppercase text-[#38BDF8]">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
              <span>ARQUITECTURA TRIDENTE // DEFENSA CIBERNÉTICA DE SILICIO</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight uppercase leading-[0.96] text-white">
              TZANIX ÆTHER-CORE <br className="hidden sm:inline" />
              <span className="text-[#38BDF8]">219 NS POR PAQUETE</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl font-normal tracking-wide leading-relaxed">
              Los firewalls tradicionales tardan milisegundos y colapsan la CPU bajo ataques volumétricos.{' '}
              <strong className="text-white">TZANIX Æther-Core</strong> opera directamente en el silicio y en el acceso de red
              (<code className="text-[#38BDF8]">#![no_std]</code>, Zero-Heap), procesando{' '}
              <strong className="text-white">16.86 millones de paquetes por segundo</strong> para neutralizar ataques DDoS y botnets
              periódicas con <strong className="text-white">cero falsos positivos en nuestras pruebas de laboratorio</strong> (ROC AUC 0.9937).
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a href="#despliegue" className="btn-spacex !border-[#38BDF8] bg-[#38BDF8] text-[#06090F]">
                <span>DESPLEGAR PoC 14 DÍAS →</span>
              </a>
              <a href="#el-motor" className="btn-spacex">
                <span>VER ARQUITECTURA</span>
              </a>
            </div>
          </div>
        </section>

        {/* EL MOTOR — arquitectura Tridente + benchmark de laboratorio */}
        <div id="el-motor" className="scroll-mt-20">
          <ScientificDocs />
        </div>

        {/* MODO SOMBRA — visualización de purificación de paquetes */}
        <div id="modo-sombra" className="scroll-mt-20">
          <ModoSombra />
        </div>

        {/* SOC EN VIVO / RENDIMIENTO */}
        <div id="rendimiento" className="scroll-mt-20">
          <TridentLiveSoc />
        </div>

        {/* DESPLIEGUE SELF-SERVICE */}
        <section id="despliegue" className="w-full py-28 px-5 sm:px-[4vw] bg-[#0B0F17] border-t border-slate-800/90 scroll-mt-20">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="border-b border-slate-800 pb-6 space-y-3">
              <p className="text-xs font-mono font-semibold tracking-[0.3em] uppercase text-[#38BDF8]">
                DESPLIEGUE SELF-SERVICE // AGENTE NATIVO LINUX &amp; CONTENEDOR DOCKER
              </p>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase text-white">
                Blíndate en menos de 5 minutos
              </h2>
              <p className="text-slate-400 max-w-3xl text-sm sm:text-base leading-relaxed">
                Para VPS compartidos sin hardware FPGA, descarga el <strong className="text-white">instalador nativo estático</strong>{' '}
                (<code className="text-[#38BDF8]">install-tzanix-linux.sh</code>) que se integra con CSF/LFD e iptables sin depender de Docker
                ni de librerías del sistema operativo — o levanta la Consola SOC con <code className="text-[#38BDF8]">docker compose up -d</code>.
                Genera tu licencia piloto de 14 días aquí abajo.
              </p>
            </div>
            <QuickstartOnboarding selectedTier={selectedTier} />
          </div>
        </section>

        {/* IDENTIDAD CORPORATIVA + CONTACTO (incluye #contacto) */}
        <CompanyModals />
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 w-full border-t border-slate-800/90 bg-[#06090F] px-5 sm:px-8 lg:px-12 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-lg font-black tracking-[0.32em] uppercase text-white">TZANIX</span>
            <span className="h-4 w-px bg-slate-700" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#38BDF8]">ÆTHER-CORE</span>
          </div>
          <p className="text-[11px] font-mono text-slate-500 text-center">
            © {new Date().getFullYear()} TZANIX SIGNAL TECHNOLOGIES · DEFENSA CIBERNÉTICA DE SILICIO · ZERO-RETENTION
          </p>
          <div className="flex gap-5 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
            <a href="#el-motor" className="hover:text-[#38BDF8] transition">Motor</a>
            <a href="#despliegue" className="hover:text-[#38BDF8] transition">Despliegue</a>
            <a href="#contacto" className="hover:text-[#38BDF8] transition">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
