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

  const downloadDockerCompose = () => {
    const composeContent = `version: '3.8'

# ============================================================================
# TZANIX ÆTHER-CORE // ARQUITECTURA TRIDENTE (CONTENEDOR ZERO-SOURCE)
# Organización : ${clientName || 'Evaluación Piloto PoC'}
# Licencia     : ${apiKey}
# Ejecución    : docker compose up -d
# ============================================================================

services:
  tzanix-aether-core:
    image: ghcr.io/mmrobeerto-ops/tzanix-aether-core:latest
    container_name: tzanix-aether-core-trident
    ports:
      - "8000:8000" # Consola SOC Táctica + Fast-Path Gateway API
      - "8080:8080" # Exportador Lock-Free de Telemetría Prometheus (/metrics)
    environment:
      - GATEWAY_MODE=ENFORCE_CUT_THROUGH
      - TZANIX_LICENSE_KEY=${apiKey}
      - TZANIX_DROP_ENTROPY=1.9000
      - TZANIX_FORWARD_ENTROPY=3.5200
      - RUST_LOG=info
    restart: unless-stopped
`;
    const blob = new Blob([composeContent], { type: 'text/yaml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'docker-compose.yml';
    a.click();
    URL.revokeObjectURL(url);
  };

  const tierTitle =
    selectedTier === 'appliance'
      ? 'APPLIANCE TRIDENTE (FPGA + NVIDIA BLUEFIELD DPU)'
      : 'CONTENEDOR ENTERPRISE DOCKER & C-FFI (PILOTO 14 DÍAS)';

  const dockerSnippet = `# Opción A: Usando el archivo docker-compose.yml descargado desde esta página
docker compose up -d

# Opción B: Ejecución directa en 1 sola línea (descarga el binario compilado sin código fuente)
docker run -d --name tzanix-aether-core -p 8000:8000 -p 8080:8080 \\
  -e TZANIX_LICENSE_KEY="${apiKey}" \\
  ghcr.io/mmrobeerto-ops/tzanix-aether-core:latest

# Abrir Consola SOC en tu navegador: http://localhost:8000`;

  return (
    <div className="w-full max-w-5xl mx-auto my-8 p-6 sm:p-8 bg-[#0B111E] border border-slate-800 text-left font-sans relative overflow-hidden">
      <div className="relative z-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <span className="px-3 py-1 text-xs font-mono uppercase bg-[#06090F] text-[#38BDF8] border border-slate-800">
              DESPLIEGUE SELF-SERVICE // {tierTitle}
            </span>
            <h3 className="text-2xl font-extrabold text-white mt-3 uppercase tracking-tight">
              Descarga Directa de Contenedor Docker (Binario Compilado)
            </h3>
            <p className="text-slate-400 text-sm">
              Descarga el archivo <code className="text-slate-200">docker-compose.yml</code> preconfigurado con tu licencia o ejecuta el contenedor precompilado (Zero-Source Stripped) directamente sin exponer el código fuente.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-300 bg-[#06090F] px-3 py-2 border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8]"></span>
            <span>IMAGEN GHCR // ZERO-SOURCE</span>
          </div>
        </div>

        {/* PASO 1: REGISTRO DE LICENCIA */}
        {!isActivated ? (
          <form onSubmit={handleActivateLicense} className="bg-[#06090F] p-5 border border-slate-800 space-y-4">
            <div className="text-xs font-mono uppercase text-[#38BDF8] tracking-wider">
              1. Registra tu Organización para personalizar tu archivo Docker (Prueba Piloto 14 Días):
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Empresa / Institución (ej. Software Médico)"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
                className="bg-[#0B111E] border border-slate-800 px-4 py-2.5 text-sm text-white focus:border-[#38BDF8] focus:outline-none"
              />
              <input
                type="email"
                placeholder="Correo Corporativo"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                required
                className="bg-[#0B111E] border border-slate-800 px-4 py-2.5 text-sm text-white focus:border-[#38BDF8] focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#38BDF8] hover:bg-white text-[#06090F] font-mono font-bold text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Generar Licencia Piloto &rarr;
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-[#06090F] border border-[#38BDF8]/50 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-[#38BDF8] uppercase font-bold">
                LICENCIA GENERADA PARA: {clientName.toUpperCase()} ({clientEmail})
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Tu archivo <code>docker-compose.yml</code> ya tiene incrustada esta licencia.
              </div>
            </div>
            <a
              href={`mailto:mmrobeerto@gmail.com?subject=${encodeURIComponent('Activación Piloto TZANIX - ' + clientName)}&body=${encodeURIComponent(`Hola equipo de ingeniería TZANIX,\n\nSolicito acompañamiento técnico para nuestra prueba piloto:\nEmpresa: ${clientName}\nCorreo: ${clientEmail}\nModalidad: ${tierTitle}\nClave generada: ${apiKey}`)}`}
              className="px-4 py-2 bg-[#38BDF8] text-[#06090F] font-mono font-bold text-xs uppercase whitespace-nowrap hover:bg-white transition"
            >
              Notificar a Ingeniería
            </a>
          </div>
        )}

        {/* PASO 2: DESCARGA DIRECTA DEL ARCHIVO DOCKER-COMPOSE.YML + CLAVE */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-7 space-y-2">
            <label className="text-xs font-mono uppercase text-slate-400">
              2. Tu Clave de Licencia (TZANIX_LICENSE_KEY):
            </label>
            <div className="flex items-center justify-between bg-[#06090F] border border-slate-800 p-3 font-mono text-sm">
              <span className="text-[#38BDF8] truncate select-all">{apiKey}</span>
              <button
                onClick={() => copyToClipboard(apiKey, 'key')}
                className="ml-4 px-3 py-1 text-xs bg-[#0B111E] hover:bg-slate-800 text-slate-200 border border-slate-700 transition cursor-pointer shrink-0"
              >
                {copiedKey ? 'Copiado' : 'Copiar Clave'}
              </button>
            </div>
          </div>

          <div className="md:col-span-5">
            <button
              onClick={downloadDockerCompose}
              className="w-full py-3.5 px-5 bg-[#38BDF8] hover:bg-white text-[#06090F] font-mono font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>⬇ Descargar docker-compose.yml</span>
            </button>
          </div>
        </div>

        {/* PASO 3: TERMINAL DOCKER COMPOSE / DOCKER RUN */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono uppercase text-slate-400">
              3. Ejecuta el contenedor en tu servidor (Linux / Windows Server / macOS):
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
