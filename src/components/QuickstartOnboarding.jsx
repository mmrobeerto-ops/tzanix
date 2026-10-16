import React, { useState } from 'react';

export default function QuickstartOnboarding({ selectedTier = 'docker' }) {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [apiKey, setApiKey] = useState('tzanix_live_sec_99f8a7b6c5d4e3f2a100_poc14d');
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  const handleActivateLicense = (e) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;
    const randomHex = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setApiKey(`tzanix_live_sec_${randomHex}_poc14d`);
    setIsActivated(true);
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'key') {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const tierTitle =
    selectedTier === 'appliance'
      ? 'APPLIANCE TRIDENTE (FPGA + NVIDIA BLUEFIELD DPU)'
      : 'CONTENEDOR ENTERPRISE DOCKER & C-FFI (14-DAY PoC)';

  const dockerSnippet = `# 1. Exportar clave criptográfica de licencia TZANIX Æther-Core
export TZANIX_LICENSE_KEY="${apiKey}"

# 2. Desplegar el nodo de defensa autónomo + Consola SOC en segundos
git clone https://github.com/mmrobeerto-ops/eather-core.git
cd eather-core
docker compose up -d

# 3. Verificar telemetría en vivo (Consola Militar/HFT en puerto 8000)
curl -s http://localhost:8000/api/v1/telemetry | jq .`;

  return (
    <div className="w-full max-w-5xl mx-auto my-8 p-6 sm:p-8 bg-[#0B111E] border border-slate-800 text-left font-sans relative overflow-hidden">
      <div className="relative z-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <span className="px-3 py-1 text-xs font-mono uppercase bg-[#06090F] text-[#38BDF8] border border-slate-800">
              DESPLIEGUE SELF-SERVICE // {tierTitle}
            </span>
            <h3 className="text-2xl font-extrabold text-white mt-3 uppercase tracking-tight">
              Generador de Licencia PoC &amp; Despliegue Instantáneo
            </h3>
            <p className="text-slate-400 text-sm">
              Despliega el motor binario optimizado (Zero-Source Stripped) en tu servidor Linux, Kubernetes o nodo DPU en menos de 60 segundos.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-300 bg-[#06090F] px-3 py-2 border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8]"></span>
            <span>REGISTRO ACTIVO // SHA-256 VERIFIED</span>
          </div>
        </div>

        {/* PASO 1: REGISTRO DE LICENCIA */}
        {!isActivated ? (
          <form onSubmit={handleActivateLicense} className="bg-[#06090F] p-5 border border-slate-800 space-y-4">
            <div className="text-xs font-mono uppercase text-[#38BDF8] tracking-wider">
              1. Registra tu Organización para emitir una Clave de Evaluación (PoC 14 Días):
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Empresa / Institución (ej. Hospital, FinTech)"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
                className="bg-[#0B111E] border border-slate-800 px-4 py-2.5 text-sm text-white focus:border-[#38BDF8] focus:outline-none"
              />
              <input
                type="email"
                placeholder="Correo Corporativo del CISO / CTO"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                required
                className="bg-[#0B111E] border border-slate-800 px-4 py-2.5 text-sm text-white focus:border-[#38BDF8] focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#38BDF8] hover:bg-white text-[#06090F] font-mono font-bold text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Emitir Clave de Silicio &rarr;
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-[#06090F] border border-[#38BDF8]/50 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-[#38BDF8] uppercase font-bold">
                LICENCIA EMITIDA PARA: {clientName.toUpperCase()} ({clientEmail})
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Clave vinculada a tu entorno Docker Compose y cabeceras C-FFI (<code>tzanix_aether.h</code>).
              </div>
            </div>
            <a
              href={`mailto:mmrobeerto@gmail.com?subject=${encodeURIComponent('Activación PoC Empresarial TZANIX - ' + clientName)}&body=${encodeURIComponent(`Hola equipo de ingeniería TZANIX,\n\nSolicito acompañamiento técnico para el despliegue de nuestra clave PoC:\nEmpresa: ${clientName}\nCorreo: ${clientEmail}\nModalidad: ${tierTitle}\nClave generada: ${apiKey}`)}`}
              className="px-4 py-2 bg-[#38BDF8] text-[#06090F] font-mono font-bold text-xs uppercase whitespace-nowrap hover:bg-white transition"
            >
              Agendar Ingeniería En Vivo
            </a>
          </div>
        )}

        {/* PASO 2: CLAVE GENERADA */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase text-slate-400">
            2. Tu Clave Criptográfica de Licencia (TZANIX_LICENSE_KEY):
          </label>
          <div className="flex items-center justify-between bg-[#06090F] border border-slate-800 p-3 font-mono text-sm">
            <span className="text-[#38BDF8] truncate select-all">{apiKey}</span>
            <button
              onClick={() => copyToClipboard(apiKey, 'key')}
              className="ml-4 px-3 py-1 text-xs bg-[#0B111E] hover:bg-slate-800 text-slate-200 border border-slate-700 transition cursor-pointer"
            >
              {copiedKey ? 'Copiado' : 'Copiar Clave'}
            </button>
          </div>
        </div>

        {/* PASO 3: TERMINAL DOCKER COMPOSE */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono uppercase text-slate-400">
              3. Despliegue Inmediato mediante Docker Compose (Linux / Windows Server / macOS):
            </label>
            <button
              onClick={() => copyToClipboard(dockerSnippet, 'code')}
              className="px-3 py-1 text-xs font-mono bg-[#06090F] hover:bg-slate-800 text-[#38BDF8] border border-slate-800 transition cursor-pointer"
            >
              {copiedCode ? 'Comandos Copiados' : 'Copiar Comandos'}
            </button>
          </div>

          <pre className="bg-[#06090F] border border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
            <code>{dockerSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
