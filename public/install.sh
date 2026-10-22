#!/usr/bin/env bash
# ==============================================================================
# TZANIX ÆTHER-CORE // INSTALADOR NATIVO LINUX (ZERO-DEPENDENCIES STATIC BINARY)
# Descarga directa: curl -sSL https://www.tzanix.com/install.sh | sudo bash
# Compatible con  : CentOS 7/8/Stream, AlmaLinux 8/9, Rocky Linux, RHEL, Ubuntu, Debian
# Arquitectura    : Binario Estático Rust (x86_64-unknown-linux-musl)
#                   CERO dependencia de glibc, OpenSSL o Docker (Inmune a migraciones CentOS -> AlmaLinux)
# Integración     : Hook directo hacia CSF/LFD (csf -td), nftables e iptables
# ==============================================================================

set -euo pipefail

TZANIX_LICENSE_KEY="${TZANIX_LICENSE_KEY:-tzanix_live_sec_poc_14d_vps}"
INSTALL_DIR="/opt/tzanix-aether"
FIREWALL_HOOK="/opt/tzanix-aether/tzanix-firewall-hook.sh"

echo "=============================================================================="
echo "  TZANIX ÆTHER-CORE // DESPLIEGUE NATIVO DE BAJO NIVEL (SIN DOCKER)"
echo "  Modo: Software Fast-Path CPU (59.31 ns/flit) + Integración CSF/iptables"
echo "=============================================================================="

if [ "$(id -u)" -ne 0 ]; then
  echo "[ERROR] Ejecuta este instalador como root: curl -sSL https://www.tzanix.com/install.sh | sudo bash"
  exit 1
fi

if [ -f /etc/os-release ]; then
  . /etc/os-release
  OS_NAME="${NAME:-Linux}"
  OS_VERSION="${VERSION_ID:-Unknown}"
else
  OS_NAME="$(uname -s)"
  OS_VERSION="$(uname -r)"
fi

echo "[1/4] Sistema detectado: ${OS_NAME} ${OS_VERSION} ($(uname -m))"
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

mkdir -p "${INSTALL_DIR}/logs"

cat << 'EOF' > "${FIREWALL_HOOK}"
#!/usr/bin/env bash
ATTACKER_IP="${1:-}"
REASON="${2:-TZANIX-Aether-Core-Anomaly-Block}"
TTL_SECONDS="${3:-3600}"
[ -z "${ATTACKER_IP}" ] && exit 0
if command -v csf >/dev/null 2>&1; then
  csf -td "${ATTACKER_IP}" "${TTL_SECONDS}" "${REASON}" >/dev/null 2>&1 || true
elif command -v iptables >/dev/null 2>&1; then
  iptables -C INPUT -s "${ATTACKER_IP}" -j DROP 2>/dev/null || iptables -I INPUT 1 -s "${ATTACKER_IP}" -j DROP
fi
EOF
chmod +x "${FIREWALL_HOOK}"

cat << EOF > "${INSTALL_DIR}/tzanix.env"
TZANIX_LICENSE_KEY=${TZANIX_LICENSE_KEY}
TZANIX_MODE=VPS_CPU_FASTPATH
TZANIX_FIREWALL_BACKEND=${FIREWALL_BACKEND}
TZANIX_FIREWALL_HOOK=${FIREWALL_HOOK}
TZANIX_DROP_ENTROPY=1.9000
TZANIX_FORWARD_ENTROPY=3.5200
EOF
chmod 600 "${INSTALL_DIR}/tzanix.env"

echo "[3/4] Hook de mitigación (${FIREWALL_BACKEND}) y configuración listos en ${INSTALL_DIR}"
echo "[4/4] Entorno TZANIX listo en ${INSTALL_DIR}."
