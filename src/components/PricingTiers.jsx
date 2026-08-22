import React from 'react';
import { Check } from 'lucide-react';

const PricingTiers = ({ onSelectTier }) => {
  return (
    <section id="pricing" className="relative z-10 max-w-7xl mx-auto px-4 py-20 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-bold text-tzCyan uppercase tracking-[0.25em] block shadow-sm">Despliegue & Escalabilidad</span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-md">
          Elige tu Arquitectura
        </h2>
        <p className="text-slate-400 font-mono text-sm leading-relaxed">
          Modelo Híbrido: Pruébalo localmente gratis, escala vía API SaaS o integra nuestrés motores directo en tu propio hardware (Edge/On-Premise).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        
        {/* Community / Dev Tier */}
        <div className="glass-panel p-8 rounded-2xl flex flex-col justify-between border-t border-cyan-500/20 hover:border-tzCyan transition duration-300">
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest bg-cyan-950/50 px-3 py-1 rounded-full border border-cyan-500/20">Community Tier</span>
            <div className="mt-6 mb-2">
              <span className="text-4xl font-black text-white">$0</span>
              <span className="text-slate-400 text-sm ml-2">/ mes</span>
            </div>
            <p className="text-slate-400 text-xs font-mono mb-6">Para pruebas locales y desarrollo R&D.</p>
            
            <ul className="space-y-4 mb-8 text-sm text-slate-300">
              <li className="flex items-start"><Check className="w-4 h-4 text-tzCyan mr-3 shrink-0" /> Límite de 100k peticiones/mes</li>
              <li className="flex items-start"><Check className="w-4 h-4 text-tzCyan mr-3 shrink-0" /> Acceso a librería pip (tzanix-core)</li>
              <li className="flex items-start"><Check className="w-4 h-4 text-tzCyan mr-3 shrink-0" /> Consola Holográfica (Modo Simulado)</li>
            </ul>
          </div>
          <button onClick={() => onSelectTier('community')} className="w-full py-3 text-xs font-mono font-bold uppercase rounded-lg bg-cyan-950/60 hover:bg-tzCyan hover:text-black text-tzCyan border border-cyan-500/30 transition duration-200">
            Iniciar Prueba Local
          </button>
        </div>

        {/* Pro / Edge Tier */}
        <div className="glass-panel p-8 rounded-2xl flex flex-col justify-between border-t border-tzCyan shadow-[0_0_30px_rgba(0,240,255,0.15)] transform md:-translate-y-4">
          <div>
            <span className="text-[10px] font-mono font-black text-black uppercase tracking-widest bg-tzCyan px-3 py-1 rounded-full shadow-[0_0_15px_#00f0ff]">Pro SaaS Tier</span>
            <div className="mt-6 mb-2">
              <span className="text-4xl font-black text-white">Por Uso</span>
            </div>
            <p className="text-cyan-200/80 text-xs font-mono mb-6">Facturación por GB purificado / Eventos.</p>
            
            <ul className="space-y-4 mb-8 text-sm text-slate-300">
              <li className="flex items-start"><Check className="w-4 h-4 text-tzCyan mr-3 shrink-0" /> Ancho de banda y peticiones ilimitadas</li>
              <li className="flex items-start"><Check className="w-4 h-4 text-tzCyan mr-3 shrink-0" /> TZX API Gateway Live</li>
              <li className="flex items-start"><Check className="w-4 h-4 text-tzCyan mr-3 shrink-0" /> Integración Docker & WebSockets</li>
              <li className="flex items-start"><Check className="w-4 h-4 text-tzCyan mr-3 shrink-0" /> Telemetría 3D WebGL en Tiempo Real</li>
            </ul>
          </div>
          <button onClick={() => onSelectTier('pro')} className="w-full py-3 text-xs font-mono font-extrabold uppercase rounded-lg bg-tzCyan hover:bg-cyan-300 text-black shadow-[0_0_20px_#00f0ff] transition duration-200">
            Desplegar API Key
          </button>
        </div>

        {/* Enterprise / Sovereign Tier */}
        <div className="glass-panel p-8 rounded-2xl flex flex-col justify-between border-t border-cyan-500/20 hover:border-tzCyan transition duration-300">
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest bg-cyan-950/50 px-3 py-1 rounded-full border border-cyan-500/20">Sovereign Tier</span>
            <div className="mt-6 mb-2">
              <span className="text-2xl font-black text-white">Licencia Fija</span>
            </div>
            <p className="text-slate-400 text-xs font-mono mb-6">Blindaje de servidores críticos On-Premise.</p>
            
            <ul className="space-y-4 mb-8 text-sm text-slate-300">
              <li className="flex items-start"><Check className="w-4 h-4 text-tzCyan mr-3 shrink-0" /> Venta por nodo o clúster</li>
              <li className="flex items-start"><Check className="w-4 h-4 text-tzCyan mr-3 shrink-0" /> Binarios nativos pre-compilados</li>
              <li className="flex items-start"><Check className="w-4 h-4 text-tzCyan mr-3 shrink-0" /> Despliegue Sidecar (Zero-Network Dependency)</li>
              <li className="flex items-start"><Check className="w-4 h-4 text-tzCyan mr-3 shrink-0" /> Soporte SLA 99.99% & Ingeniería Dedicada</li>
            </ul>
          </div>
          <button onClick={() => onSelectTier('enterprise')} className="w-full py-3 text-xs font-mono font-bold uppercase rounded-lg bg-cyan-950/60 hover:bg-tzCyan hover:text-black text-tzCyan border border-cyan-500/30 transition duration-200">
            Contactar Ventas
          </button>
        </div>

      </div>
    </section>
  );
};

export default PricingTiers;
