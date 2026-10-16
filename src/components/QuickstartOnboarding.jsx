import React, { useState, useEffect } from 'react';
import { Terminal, Copy, Key, Rocket } from 'lucide-react';

const QuickstartOnboarding = ({ selectedTier }) => {
  const [apiKey, setApiKey] = useState('BLOQUEADO - REQUIERE EMAIL Y EULA');
  const [copied, setCopied] = useState(false);
  const [acceptedEula, setAcceptedEula] = useState(false);
  const [email, setEmail] = useState('');

  const productConfig = {
    docker: {
      name: 'TZANiX ÆTHER-CORE // DOCKER ENTERPRISE',
      prefix: 'tzanix_live_sec_',
      image: 'mmrobeerto-ops/tzanix-aether-core:latest',
      cli: 'cargo run --bin tzanix_ctl --release -- status',
      eulaWarning:
        'TZANiX otorga una licencia temporal de Prueba de Concepto (PoC de 14 días) con binario endurecido sin exposición de código fuente.',
    },
    appliance: {
      name: 'TZANiX TRIDENT // SILICON APPLIANCE (FPGA + DPU + GPU)',
      prefix: 'tzanix_hw_trident_',
      image: 'mmrobeerto-ops/tzanix-aether-core:latest',
      cli: 'tzanix_ctl set-threshold 3.5200',
      eulaWarning:
        'El despliegue en tarjetas FPGA Xilinx/Agilex y NVIDIA BlueField DPU opera en modo Cut-Through físico (10.0 ns) sobre el enlace MAC.',
    },
  };

  const config = productConfig[selectedTier] || productConfig.docker;
  const isValidEmail = email.includes('@') && email.includes('.');

  useEffect(() => {
    if (!acceptedEula || !isValidEmail) {
      setApiKey('BLOQUEADO - REQUIERE EMAIL CORPORATIVO Y EULA');
      return;
    }

    let hash = 0x811c9dc5;
    for (let i = 0; i < email.length; i++) {
      hash ^= email.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193) >>> 0;
    }
    const generated = `${config.prefix}${hash.toString(16).padStart(8, '0')}_poc14d`;

    fetch('/api/generate-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product: selectedTier, email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.apiKey) {
          setApiKey(data.apiKey);
        } else {
          setApiKey(generated);
        }
      })
      .catch(() => {
        setApiKey(generated);
      });
  }, [selectedTier, acceptedEula, isValidEmail, email, config.prefix]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const dockerCommand = `export TZANIX_LICENSE_KEY="${apiKey}"\ndocker compose up -d`;

  return (
    <section className="relative z-20 w-full py-12 border-t border-white/20 mt-8">
      <div className="border border-[#00F0FF]/40 p-8 md:p-12 bg-[#08080A] shadow-[0_0_50px_rgba(0,240,255,0.1)]">
        <div className="text-center mb-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 border border-[#00F0FF]/50 text-[#00F0FF] text-xs font-mono uppercase tracking-[0.2em]">
            <span className="w-2 h-2 bg-[#00FF66] animate-pulse"></span>
            <span>{config.name}</span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase">
            HUB DE ADQUISICIÓN Y DESPLIEGUE SELF-SERVICE
          </h2>
          <p className="text-slate-400 font-mono text-xs tracking-wide max-w-2xl mx-auto">
            Genera tu clave criptográfica de evaluación corporativa (PoC de 14 días) y levanta el contenedor blindado con el Centro de Mando SOC y el exportador Prometheus en menos de 60 segundos.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-10 p-6 border border-white/15 bg-black/70 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-[#00F0FF] uppercase tracking-widest">
              Correo Electrónico Corporativo (CISO / CTO / Infraestructura)
            </label>
            <input
              type="email"
              placeholder="ciso@empresa-critica.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (!e.target.value.includes('@')) setAcceptedEula(false);
              }}
              className="w-full bg-black border border-white/20 text-white p-3 font-mono text-sm focus:outline-none focus:border-[#00F0FF] transition"
            />
          </div>

          <div className={`p-4 border ${isValidEmail ? 'border-[#D4AF37]/50 bg-[#161208]' : 'border-gray-800 bg-black'} rounded transition-colors`}>
            <label className={`flex items-start space-x-3 ${isValidEmail ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}>
              <input
                type="checkbox"
                disabled={!isValidEmail}
                checked={acceptedEula}
                onChange={(e) => setAcceptedEula(e.target.checked)}
                className="mt-1 w-4 h-4 rounded accent-[#FFB703]"
              />
              <span className="text-xs font-mono text-slate-300 leading-relaxed">
                <strong className="text-[#FFB703]">ACUERDO DE EVALUACIÓN CORPORATIVA (NDA / EULA):</strong> Acepto utilizar esta licencia exclusivamente para pruebas de defensa perimetral y evaluación de rendimiento. <strong className="text-white">{config.eulaWarning}</strong>
              </span>
            </label>
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-500 ${acceptedEula && isValidEmail ? 'opacity-100' : 'opacity-25 pointer-events-none blur-[1px]'}`}>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-[#00F0FF] uppercase tracking-widest flex items-center">
                <Key className="w-4 h-4 mr-2" />
                Licencia Temporal PoC (14 Días)
              </label>
              <div className="flex items-center bg-black border border-[#00F0FF]/30 rounded-lg p-2 overflow-hidden">
                <code className="flex-1 text-[#00FF66] px-3 font-mono text-xs sm:text-sm tracking-wider truncate">
                  {apiKey}
                </code>
                <button
                  onClick={() => handleCopy(apiKey)}
                  className="p-2 bg-[#00F0FF]/20 hover:bg-[#00F0FF] hover:text-black text-[#00F0FF] rounded transition"
                  title="Copiar Licencia"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-[#00F0FF] uppercase tracking-widest flex items-center">
                <Terminal className="w-4 h-4 mr-2" />
                Control en Caliente (CLI Nativa)
              </label>
              <pre className="bg-black border border-white/15 rounded-lg p-4 overflow-x-auto text-xs sm:text-sm font-mono text-slate-300">
                <code>$ {config.cli}</code>
              </pre>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-[#FFB703] uppercase tracking-widest flex items-center">
                <Rocket className="w-4 h-4 mr-2" />
                Despliegue con un Comando (Docker Compose)
              </label>
              <div className="relative group">
                <pre className="bg-black border border-[#D4AF37]/40 rounded-lg p-4 overflow-x-auto text-xs sm:text-sm font-mono text-[#00F0FF] leading-relaxed">
                  <code>{dockerCommand}</code>
                </pre>
                <button
                  onClick={() => handleCopy(dockerCommand)}
                  className="mt-3 w-full py-2.5 bg-[#00F0FF] text-black font-mono text-xs font-bold uppercase tracking-widest hover:brightness-110 transition"
                >
                  {copied ? '¡COMANDO COPIADO AL PORTAPAPELES!' : 'COPIAR COMANDO DOCKER COMPOSE'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickstartOnboarding;
