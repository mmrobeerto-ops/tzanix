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

        {/* NAVEGACIÓN EJECUTIVA DESKTOP ACTUALIZADA */}
        <nav className="hidden xl:flex items-center gap-7 text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-slate-300">
          <a href="#el-motor" className="whitespace-nowrap hover:text-white transition-colors">
            EL MOTOR (~219 NS)
          </a>
          <a href="#modo-sombra" className="whitespace-nowrap hover:text-white transition-colors">
            MODO SOMBRA
          </a>
          <a href="#rendimiento" className="whitespace-nowrap hover:text-white transition-colors">
            RENDIMIENTO Y BENCHMARKS
          </a>
          <a href="#isps-hosters" className="whitespace-nowrap text-[#38BDF8] hover:text-white transition-colors">
            ISPS Y HOSTERS
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

      {/* OVERLAY DE MENÚ CORPORATIVO FULLSCREEN ACTUALIZADO */}
      <div className={`fixed inset-0 z-40 bg-[#06090F]/98 backdrop-blur-2xl flex flex-col items-center justify-center space-y-6 sm:space-y-7 px-6 text-center transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`)}>
        <div className="text-xs font-mono tracking-[0.35em] uppercase text-[#38BDF8] mb-2">
          TZANIX SIGNAL TECHNOLOGIES // NAVEGACIÓN EJECUTIVA
        </div>
        <a href="#el-motor"   onClick={() => setIsMenuOpen(false)} className="text-lg sm:text-2xl font-bold tracking-[0.22em] uppercase text-white hover:text-[#38BDF8] transition">EL MOTOR (~219 NS)</a>
        <a href="#modo-sombra" onClick={() => setIsMenuOpen(false)} className="text-lg sm:text-2xl font-bold tracking-[0.22em] uppercase text-slate-300 hover:text-white transition">MODO SOMBRA</a>
        <a href="#rendimiento" onClick={() => setIsMenuOpen(false)} className="text-lg sm:text-2xl font-bold tracking-[0.22em] uppercase text-slate-300 hover=text-white transition">RENDIMIENTO Y BENCHMARKS</a>
        <a href="#isps-hosters" onClick={() => setIsMenuOpen(false)} className="text-lg sm:text-2xl font-bold tracking-[0.22em] uppercase text-[#38BDF8] hover:text-white transition">ISPS Y HOSTERS</a>
        <a href="#contacto"    onClick={() => setIsMenuOpen(false)} className="text-lg sm:text-2xl font-bold tracking-[0.22em] uppercase text-slate-300 hover:text-white transition">CONTACTO EJECUTIVO</a>
        <div className="w-24 h-px bg-slate-800 my-2"></div>
        <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="text-sm sm:text-base font-mono font-bold tracking-[0.25em] uppercase px-6 py-3 border border-[#38BDF8] text-[#38BDF8] hover:bg-[#38BDF8] hover:text-[#06090F] transition">
          DESPLEGAR CONTENEDOR PoC →
        </a>
      </div>

      {/* CONTENEDOR PRINCIPAL */}
      <main className="w-full">
        
        {/* 1. HERO PRINCIPAL */}
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
              <span className="text-[#38BDF8]">219 NS POR PAQUETE</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl font-normal tracking-wide leading-relaxed">
              Los firewalls tradicionales tardan milisegundos y colapsan la CPU bajo ataques volumétricos. <strong className="text-white">TZANIX Æther-Core</strong> opera directamente en el silicio y en el acceso de red (<code>#![no_std]</code>, Zero-Heap), procesando <strong className="text-white">16.86 Millones de paquetes por segundo</strong> para neutralizar ataques DDoS y botnets periódicas con <strong className="text-white">0.00% de falsos positivos</strong>.
            </p>
