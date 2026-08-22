import React, { useState, useEffect } from 'react';
import { Terminal, Copy, Key, Rocket, ArrowRight } from 'lucide-react';

const QuickstartOnboarding = ({ selectedTier }) => {
  const [apiKey, setApiKey] = useState('Generando TZX_API_KEY...');
  const [copied, setCopied] = useState(false);
  const [acceptedEula, setAcceptedEula] = useState(false);
  const [email, setEmail] = useState('');

  // Configuraciones de Producto
// ... (Configuración de Producto) ...
  const productConfig = {
    gateway: {
      name: 'NEURAL GATEWAY',
      prefix: 'tzx_gw_',
      image: 'ghcr.io/mmrobeerto-ops/neural-gateway:latest',
      python: 'pip install tzanix-gateway',
      eulaWarning: 'TZANiX se exonera por completo de cualquier brecha de red, pérdida de datos o saturación de servidores causada por una mala configuración en los flujos tensoriales.'
    },
    qbalam: {
      name: 'Q-BALAM',
      prefix: 'tzx_qb_',
      image: 'ghcr.io/mmrobeerto-ops/q-balam:latest',
      python: 'pip install tzanix-qbalam',
      eulaWarning: 'TZANiX se exonera por completo de cualquier intrusión, robo de datos o vulnerabilidad explotada en caso de que la red local del cliente esté previamente comprometida.'
    },
    singularity: {
      name: 'SINGULARITY CORE',
      prefix: 'tzx_sg_',
      image: 'ghcr.io/mmrobeerto-ops/singularity-core:latest',
      python: 'pip install tzanix-singularity',
      eulaWarning: 'TZANiX se exonera por completo de cualquier daño físico a hardware, colisión de drones/aeronaves, o pérdida de equipo autónomo derivado de la alteración de parámetros inerciales.'
    }
  };

  const config = productConfig[selectedTier] || productConfig.gateway;
  const isValidEmail = email.includes('@') && email.includes('.');

  useEffect(() => {
    // Si no ha aceptado el EULA o no hay email, no pedimos la llave al servidor
    if (!acceptedEula || !isValidEmail) {
      setApiKey('BLOQUEADO - REQUIERE EMAIL Y EULA');
      return;
    }

    setApiKey('AUTENTICANDO CON SERVIDORES TZANIX...');
    
    // Llamada al motor serverless para firmar el JWT RSA-256
    fetch('/api/generate-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        product: selectedTier, 
        email: email
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.apiKey) {
        setApiKey(data.apiKey);
      } else {
        setApiKey('ERROR DE FIRMA CRIPTOGRÁFICA');
      }
    })
    .catch(err => {
      console.error(err);
      setApiKey('ERROR DE CONEXIí“N AL GATEWAY');
    });
  }, [selectedTier, acceptedEula, isValidEmail, email]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const dockerCommand = `docker run -d -p 8000:8000 \\
  -e TZANIX_API_KEY="${apiKey}" \\
  ${config.image}`;

  return (
    <section className="relative z-20 w-full py-12 border-t border-white/20 mt-8">
      <div className="border border-white/20 p-8 md:p-12 bg-black/80">
        
        <div className="text-center mb-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 border border-white/30 text-white text-xs font-mono uppercase tracking-[0.2em]">
            <span className="w-2 h-2 bg-white animate-pulse"></span>
            <span>{config.name} ACTIVADO</span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase">
            HUB DE DESPLIEGUE DOCKER
          </h2>
          <p className="text-slate-400 font-mono text-xs tracking-wide max-w-2xl mx-auto">
            Tus credenciales de prueba de 33 días están listas. Por ser tecnología de grado profundo que interactúa con infraestructura crítica, debes proporcionar un correo válido y aceptar los términos de exención de responsabilidad.
          </p>
        </div>

        {/* Captura de Leads y EULA */}
        <div className="max-w-2xl mx-auto mb-10 p-6 border border-white/10 bg-black/50 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-tzCyan uppercase tracking-widest">
              Correo Electrónico Corporativo
            </label>
            <input 
              type="email" 
              placeholder="admin@empresa.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (!e.target.value.includes('@')) setAcceptedEula(false);
              }}
              className="w-full bg-black border border-white/20 text-white p-3 font-mono text-sm focus:outline-none focus:border-tzCyan focus:ring-1 focus:ring-tzCyan transition"
            />
          </div>

          <div className={`p-4 border ${isValidEmail ? 'border-red-500/30 bg-red-950/20' : 'border-gray-800 bg-black'} rounded transition-colors`}>
            <label className={`flex items-start space-x-3 ${isValidEmail ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}>
              <input 
                type="checkbox" 
                disabled={!isValidEmail}
                checked={acceptedEula}
                onChange={(e) => setAcceptedEula(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-gray-300 text-[#ff0055] focus:ring-[#ff0055] bg-black disabled:bg-gray-800" 
              />
              <span className="text-xs font-mono text-slate-300 leading-relaxed">
                <strong className="text-red-400">ACUERDO EULA (ZERO-LIABILITY):</strong> Entiendo que este software se proporciona "AS-IS" (Tal cual). Asumo toda la responsabilidad técnica y financiera por su integración en mis servidores o hardware. <strong className="text-white">{config.eulaWarning}</strong>
              </span>
            </label>
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-500 ${acceptedEula && isValidEmail ? 'opacity-100' : 'opacity-20 pointer-events-none blur-[2px]'}`}>
          
          {/* Columna Izquierda: Credenciales & Python */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-tzCyan uppercase tracking-widest flex items-center">
                <Key className="w-4 h-4 mr-2" />
                API Key de Prueba (33 Días)
              </label>
              <div className="flex items-center bg-black/60 border border-cyan-500/20 rounded-lg p-1 overflow-hidden">
                <code className="flex-1 text-slate-300 px-3 font-mono text-sm tracking-wider truncate">
                  {acceptedEula ? apiKey : 'BLOQUEADO'}
                </code>
                <button 
                  onClick={() => handleCopy(apiKey)}
                  className="p-2 bg-cyan-950 hover:bg-tzCyan hover:text-black text-tzCyan rounded transition"
                  title="Copiar"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-tzCyan uppercase tracking-widest flex items-center">
                <Terminal className="w-4 h-4 mr-2" />
                Integración Python (Opcional)
              </label>
              <div className="relative group">
                <pre className="bg-black/60 border border-cyan-500/20 rounded-lg p-4 overflow-x-auto text-sm font-mono text-slate-300 shadow-inner">
                  <code>
                    <span className="text-slate-500"># SDK Oficial</span><br/>
                    <span className="text-tzCyan">$</span> {acceptedEula ? config.python : 'BLOQUEADO'}
                  </code>
                </pre>
                <button 
                  onClick={() => handleCopy(config.python)}
                  className="absolute top-2 right-2 p-2 bg-cyan-950/80 hover:bg-tzCyan hover:text-black text-tzCyan rounded transition opacity-0 group-hover:opacity-100"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Docker y Manual */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-tzCyan uppercase tracking-widest flex items-center">
                <Rocket className="w-4 h-4 mr-2" />
                Comando de Despliegue (Docker)
              </label>
              <div className="relative group h-full">
                <pre className="h-full bg-black/60 border border-cyan-500/20 rounded-lg p-4 overflow-x-auto text-sm font-mono text-slate-300 shadow-inner">
                  <code>
                    <span className="text-slate-500"># Iniciar Motor Localmente</span><br/>
                    <span className="text-tzCyan">$</span> {acceptedEula ? dockerCommand.split('\\').map((line, i) => (
                      <React.Fragment key={i}>
                        {line} {i !== 2 && <span className="text-slate-500">\\</span>}<br/>
                      </React.Fragment>
                    )) : 'BLOQUEADO'}
                  </code>
                </pre>
                <button 
                  onClick={() => handleCopy(dockerCommand)}
                  className="absolute top-2 right-2 p-2 bg-cyan-950/80 hover:bg-tzCyan hover:text-black text-tzCyan rounded transition opacity-0 group-hover:opacity-100"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Nuevo Botón de PDF / Documentación */}
            <div className="pt-2">
              <a 
                href="/Manual_Corporativo_TZANiX.txt" 
                download
                className="w-full flex justify-center items-center py-3 border border-white/30 text-white font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition duration-300 cursor-pointer"
              >
                ðŸ“„ DESCARGAR PDF: GUÍA Y Tí‰RMINOS LEGALES
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default QuickstartOnboarding;
