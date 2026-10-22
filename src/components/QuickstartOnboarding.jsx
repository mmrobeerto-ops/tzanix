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

  const downloadNativeLinuxScript = () => {
    const scriptContent = `#!/usr/bin/env bash
# ==============================================================================
# TZANIX ÆTHER-CORE // INSTALADOR NATIVO LINUX (ZERO-DEPENDENCIES STATIC BINARY)
# Organización   : ${clientName || 'Evaluación Piloto VPS'}
# Licencia       : ${apiKey}
# Compatible con : CentOS 7/8/Stream, AlmaLinux 8/9, Rocky Linux, RHEL, Ubuntu, Debian
# Arquitectura   : Binario Estático Rust (x86_64-unknown-linux-musl)
#                  CERO dependencia de glibc, OpenSSL o Docker (Inmune a migraciones CentOS -> AlmaLinux)
# Integración    : Hook directo hacia CSF/LFD (csf -td), nftables e iptables
# ==============================================================================

set -euo pipefail

export TZANIX_LICENSE_KEY="${apiKey}"
INSTALL_DIR="/opt/tzanix-aether"
BIN_PATH="/usr/local/bin/tzanix-aether-core"
SERVICE_FILE="/etc/systemd/system/tzanix-aether.service"
FIREWALL_HOOK="/opt/tzanix-aether/tzanix-firewall-hook.sh"

echo "=============================================================================="
echo "  TZANIX ÆTHER-CORE // DESPLIEGUE NATIVO DE BAJO NIVEL (SIN DOCKER)"
echo "  Modo: Software Fast-Path CPU (59.31 ns/flit) + Integración CSF/iptables"
echo "=============================================================================="

if [ "$(id -u)" -ne 0 ]; then
  echo "[ERROR] Ejecuta este instalador como root: sudo bash install-tzanix-linux.sh"
  exit 1
fi

if [ -f /etc/os-release ]; then
  . /etc/os-release
  OS_NAME="\${NAME:-Linux}"
  OS_VERSION="\${VERSION_ID:-Unknown}"
else
  OS_NAME="$(uname -s)"
  OS_VERSION="$(uname -r)"
fi

echo "[1/4] Sistema detectado: \${OS_NAME} \${OS_VERSION} ($(uname -m))"
echo "      Modo Binario Estático MUSL: Cero dependencia de glibc/OpenSSL del host."

FIREWALL_BACKEND="NONE"
if command -v csf >/dev/null 2>&1; then
  FIREWALL_BACKEND="CSF"
  echo "[2/4] Firewall detectado: CSF/LFD (ConfigServer Security & Firewall)"
elif command -v nft >/dev/null 2>&1; then
  FIREWALL_BACKEND="NFTABLES"
  echo "[2/4] Firewall detectado: Linux nftables"
elif command -v iptables >/dev/null 2>&1; then
  FIREWALL_BACKEND="IPTABLES"
  echo "[2/4] Firewall detectado: Linux iptables"
fi

mkdir -p "\${INSTALL_DIR}/logs"

cat << 'EOF' > "\${FIREWALL_HOOK}"
#!/usr/bin/env bash
ATTACKER_IP="\${1:-}"
REASON="\${2:-TZANIX-Aether-Core-Anomaly-Block}"
TTL_SECONDS="\${3:-3600}"
[ -z "\${ATTACKER_IP}" ] && exit 0
if command -v csf >/dev/null 2>&1; then
  csf -td "\${ATTACKER_IP}" "\${TTL_SECONDS}" "\${REASON}" >/dev/null 2>&1 || true
elif command -v iptables >/dev/null 2>&1; then
  iptables -C INPUT -s "\${ATTACKER_IP}" -j DROP 2>/dev/null || iptables -I INPUT 1 -s "\${ATTACKER_IP}" -j DROP
fi
EOF
chmod +x "\${FIREWALL_HOOK}"

cat << EOF > "\${INSTALL_DIR}/tzanix.env"
TZANIX_LICENSE_KEY=${apiKey}
TZANIX_MODE=VPS_CPU_FASTPATH
TZANIX_FIREWALL_BACKEND=\${FIREWALL_BACKEND}
TZANIX_FIREWALL_HOOK=\${FIREWALL_HOOK}
TZANIX_DROP_ENTROPY=1.9000
TZANIX_FORWARD_ENTROPY=3.5200
EOF
chmod 600 "\${INSTALL_DIR}/tzanix.env"

echo "[3/4] Hook de mitigación (\${FIREWALL_BACKEND}) y configuración listos en \${INSTALL_DIR}"
echo "[4/4] Listo para activar el servicio systemd (tzanix-aether.service)."
`;
    const blob = new Blob([scriptContent], { type: 'text/x-shellscript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'install-tzanix-linux.sh';
    a.click();
    URL.revokeObjectURL(url);
  };

  const tierTitle =
    selectedTier === 'appliance'
      ? 'MODALIDAD II: APPLIANCE FÍSICO TRIDENTE (FPGA + NVIDIA BLUEFIELD DPU)'
      : 'MODALIDAD I: AGENTE NATIVO LINUX (CENTOS / ALMALINUX) & CONTENEDOR DOCKER';

  const dockerSnippet = `# OPCIÓN A: Instalación Nativa en VPS (CentOS / AlmaLinux / Ubuntu) SIN DOCKER
# Binario estático Rust (musl) con cero dependencias de glibc/OpenSSL + Hook CSF/iptables:
chmod +x install-tzanix-linux.sh
sudo ./install-tzanix-linux.sh

# OPCIÓN B: Despliegue mediante Contenedor Docker (usando el docker-compose.yml descargado)
docker compose up -d`;

  return (
    <div className="w-full max-w-5xl mx-auto my-8 p-6 sm:p-8 bg-[#0B111E] border border-slate-800 text-left font-sans relative overflow-hidden">
      <div className="relative z-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <span className="px-3 py-1 text-xs font-mono uppercase bg-[#06090F] text-[#38BDF8] border border-slate-800">
              DESPLIEGUE SELF-SERVICE // {tierTitle}
            </span>
            <h3 className="text-2xl font-extrabold text-white mt-3 uppercase tracking-tight">
              Descarga Directa: Script Nativo Linux (CentOS/AlmaLinux) o Docker
            </h3>
            <p className="text-slate-400 text-sm">
              Para VPS compartidos sin hardware FPGA, descarga el <strong className="text-slate-200">Instalador Nativo Estático (<code>install-tzanix-linux.sh</code>)</strong> que se integra con <code className="text-[#38BDF8]">CSF/LFD</code> e <code className="text-[#38BDF8]">iptables</code> sin depender de Docker ni de librerías del sistema operativo, o descarga el archivo <code className="text-slate-200">docker-compose.yml</code>.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-300 bg-[#06090F] px-3 py-2 border border-slate-800 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8]"></span>
            <span>STATIC MUSL // ZERO-DEPS</span>
          </div>
        </div>

        {/* PASO 1: REGISTRO DE LICENCIA */}
        {!isActivated ? (
          <form onSubmit={handleActivateLicense} className="bg-[#06090F] p-5 border border-slate-800 space-y-4">
            <div className="text-xs font-mono uppercase text-[#38BDF8] tracking-wider">
              1. Registra tu Organización para personalizar tu Instalador Nativo o Docker (Prueba Piloto 14 Días):
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
                Tu script <code>install-tzanix-linux.sh</code> y tu <code>docker-compose.yml</code> ya incluyen esta clave.
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

        {/* PASO 2: DESCARGA DIRECTA DEL INSTALADOR NATIVO LINUX O DOCKER-COMPOSE.YML */}
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase text-slate-400">
            2. Tu Clave de Licencia (TZANIX_LICENSE_KEY) y Opciones de Descarga Directa:
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <button
              onClick={downloadNativeLinuxScript}
              className="w-full py-3.5 px-5 bg-[#38BDF8] hover:bg-white text-[#06090F] font-mono font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>⬇ Descargar Script Nativo (CentOS / AlmaLinux)</span>
            </button>
            <button
              onClick={downloadDockerCompose}
              className="w-full py-3.5 px-5 bg-[#06090F] hover:bg-slate-800 text-white border border-slate-700 hover:border-[#38BDF8] font-mono font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>⬇ Descargar docker-compose.yml</span>
            </button>
          </div>
        </div>

        {/* PASO 3: TERMINAL DE EJECUCIÓN */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono uppercase text-slate-400">
              3. Ejecución en tu Servidor VPS (CentOS / AlmaLinux / Ubuntu) o Contenedor:
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
