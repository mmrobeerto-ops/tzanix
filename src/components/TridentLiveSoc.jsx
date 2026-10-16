import React, { useState, useEffect } from 'react';

const INITIAL_INCIDENTS = [
  {
    incident_id: 'INC-TZANIX-2026-00941',
    source_ip: '185.220.101.44',
    country: 'NL (Ámsterdam)',
    asn: 'AS9009 M247 Bulletproof Proxy',
    reputation: 'Botnet C2 / Tor Exit Node',
    attack_vector: 'HTTP/2 Low-Rate Pulsing Bot (Nyquist Bin #8)',
    entropy_bits: 2.3448,
    dominant_fft_bin: 8,
    action: 'GPU FFT -> CSR 3.5200 DROP',
    isGpu: true,
  },
  {
    incident_id: 'INC-TZANIX-2026-00940',
    source_ip: '45.148.10.92',
    country: 'RU (Moscú)',
    asn: 'AS49505 Selectel Stress Net',
    reputation: 'Known DDoS Flooder',
    attack_vector: 'SYN-Flood Volumétrico L4 (Colapso Entrópico)',
    entropy_bits: 0.0820,
    dominant_fft_bin: 0,
    action: 'CUT-THROUGH DROP (10.0 ns)',
    isGpu: false,
  },
  {
    incident_id: 'INC-TZANIX-2026-00939',
    source_ip: '103.214.112.19',
    country: 'SG (Singapur)',
    asn: 'AS132203 Cloud Botnet',
    reputation: 'UDP Reflector Abuser',
    attack_vector: 'UDP Amplification (DNS/NTP Reflection)',
    entropy_bits: 0.4110,
    dominant_fft_bin: 0,
    action: 'CUT-THROUGH DROP (10.0 ns)',
    isGpu: false,
  },
  {
    incident_id: 'INC-TZANIX-2026-00938',
    source_ip: '198.51.100.77',
    country: 'US (Virginia)',
    asn: 'AS14061 DigitalOcean Droplet',
    reputation: 'AI Scraper / Prompt Injector',
    attack_vector: 'Anomalía de Tensor / Inyección NaN-Infinity',
    entropy_bits: 1.1204,
    dominant_fft_bin: 4,
    action: 'Q-GUARD GEOMETRIC VETO',
    isGpu: false,
  },
];

export default function TridentLiveSoc() {
  const [scenario, setScenario] = useState('normal');
  const [forwards, setForwards] = useState(7000000);
  const [drops, setDrops] = useState(2999744);
  const [gpuTriggers, setGpuTriggers] = useState(256);
  const [epoch, setEpoch] = useState(5342026);
  const [csr, setCsr] = useState(1.9000);
  const [bars, setBars] = useState(Array(16).fill(22));
  const [incidents, setIncidents] = useState(INITIAL_INCIDENTS);
  const [logs, setLogs] = useState([
    { time: '18:40:12', tag: 'RDMA-MESH', msg: '8 Nodos BlueField DPU sincronizados vía RoCEv2 (Descriptor 32B).', type: 'legit' },
    { time: '18:40:10', tag: 'SYS-BOOT', msg: 'Pipeline FPGA Q16.16 en línea @ 400 MHz (Latencia fija: 10.0 ns).', type: 'info' },
  ]);

  const addLog = (tag, msg, type = 'info') => {
    const now = new Date().toISOString().split('T')[1].slice(0, 12);
    setLogs((prev) => [{ time: now, tag, msg, type }, ...prev.slice(0, 5)]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (scenario === 'normal') {
        setForwards((f) => f + Math.floor(Math.random() * 1900));
        setBars(Array.from({ length: 16 }, () => 14 + Math.floor(Math.random() * 22)));
      } else if (scenario === 'ddos') {
        setDrops((d) => d + Math.floor(Math.random() * 6400));
        setEpoch((e) => e + 16);
        setBars(Array.from({ length: 16 }, (_, i) => (i === 0 ? 95 : 6 + Math.floor(Math.random() * 7))));
      } else {
        setForwards((f) => f + Math.floor(Math.random() * 1100));
        setDrops((d) => d + Math.floor(Math.random() * 3900));
        setEpoch((e) => e + 32);
        setBars(
          Array.from({ length: 16 }, (_, i) =>
            i === 8 ? 97 : i === 4 || i === 12 ? 66 : 10 + Math.floor(Math.random() * 10)
          )
        );
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [scenario]);

  const selectScenario = (mode) => {
    setScenario(mode);
    if (mode === 'normal') {
      setCsr(1.9000);
      addLog('FAST-PATH', 'Flujo transaccional legítimo verificado (H = 3.9420 bits) -> Forward en 10.0 ns.', 'legit');
    } else if (mode === 'ddos') {
      setCsr(1.9000);
      setIncidents((prev) => [
        {
          incident_id: `INC-TZANIX-2026-00${942 + prev.length}`,
          source_ip: '91.240.118.172',
          country: 'EE (Tallin)',
          asn: 'AS209605 HostBaltic Flood Net',
          reputation: 'Volumetric Botnet Node',
          attack_vector: 'SYN-Flood Volumétrico L4 / UDP Amplification',
          entropy_bits: 0.0820,
          dominant_fft_bin: 0,
          action: 'CUT-THROUGH DROP (10.0 ns)',
          isGpu: false,
        },
        ...prev.slice(0, 5),
      ]);
      addLog('FPGA-DROP', 'SYN-Flood desde 91.240.118.172 (AS209605) abortado en el MAC en 10.0 ns.', 'drop');
    } else if (mode === 'stealth') {
      setCsr(3.5200);
      setGpuTriggers((g) => g + 16);
      setIncidents((prev) => [
        {
          incident_id: `INC-TZANIX-2026-00${942 + prev.length}`,
          source_ip: '185.220.101.88',
          country: 'DE (Fráncfort)',
          asn: 'AS24940 Hetzner Anonymizer',
          reputation: 'Stealth Pulsing Botnet',
          attack_vector: 'HTTP/2 Low-Rate Pulsing DoS (Nyquist Bin #8)',
          entropy_bits: 2.3448,
          dominant_fft_bin: 8,
          action: 'GPU FFT -> CSR 3.5200 DROP',
          isGpu: true,
        },
        ...prev.slice(0, 5),
      ]);
      addLog('GPU-FFT16', 'Bot pulsante cazado desde 185.220.101.88 (AS24940) en Bin #8 Nyquist.', 'gpu');
      addLog('CSR-AUTO', 'Auto-Hardening ejecutado: CSR elevado de 1.9000 -> 3.5200 en los 8 nodos RDMA.', 'info');
    }
  };

  const triggerAvalanche = () => {
    selectScenario('stealth');
    setForwards(7000000);
    setDrops(2999744);
    setGpuTriggers(256);
    setEpoch(5342026);
    addLog('AVALANCHE', '10,000,000 Flits procesados en 593.07 ms (16.86 Mpps) · 0% Falsos Positivos.', 'legit');
  };

  const exportForensicJson = () => {
    const reportObj = {
      platform: 'TZANiX Æther-Core · Trident Autonomous Cyber Defense (https://www.tzanix.com)',
      compliance_standard: 'SOC2 / ISO-27001 / HIPAA / DORA High-Frequency Audit',
      generated_at_utc: new Date().toISOString(),
      silicon_metrics: {
        fpga_latency_ns: 10.0,
        csr_threshold_float: csr,
        csr_threshold_q16: Math.round(csr * 65536),
        packets_forwarded: forwards,
        cut_through_drops: drops,
        gpudirect_fft_inspections: gpuTriggers,
        rdma_epoch: epoch,
      },
      forensic_incidents: incidents,
    };
    const blob = new Blob([JSON.stringify(reportObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tzanix_forensic_audit_report.json';
    a.click();
    addLog('FORENSIC', 'Reporte Forense JSON exportado exitosamente (SOC2 / ISO-27001).', 'info');
  };

  const q16Val = Math.round(csr * 65536);
  const q16Hex = '0x000' + q16Val.toString(16).toUpperCase();

  return (
    <section id="live-soc" className="relative z-10 w-full py-20 sm:py-28 bg-[#08080A] border-t border-b border-white/10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Title */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/15 pb-6">
          <div>
            <p className="text-xs font-mono font-bold tracking-[0.35em] uppercase text-[#00F0FF] mb-2">
              DEMOSTRACIÓN INTERACTIVA EN VIVO // CENTRO DE MANDO TRIDENTE
            </p>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase text-white">
              SIMULADOR TÁCTICO SOC &amp; FORENSE
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => selectScenario('normal')}
              className={`px-3.5 py-2 rounded text-xs font-mono font-bold border transition ${
                scenario === 'normal'
                  ? 'border-[#00FF66] bg-[#00FF66]/15 text-[#00FF66] shadow-[0_0_15px_rgba(0,255,102,0.25)]'
                  : 'border-[#2A2A35] bg-[#141419] text-zinc-300'
              }`}
            >
              1. Tráfico Legítimo
            </button>
            <button
              onClick={() => selectScenario('ddos')}
              className={`px-3.5 py-2 rounded text-xs font-mono font-bold border transition ${
                scenario === 'ddos'
                  ? 'border-[#FF3366] bg-[#FF3366]/15 text-[#FF3366] shadow-[0_0_15px_rgba(255,51,102,0.3)]'
                  : 'border-[#2A2A35] bg-[#141419] text-zinc-300'
              }`}
            >
              2. DDoS Cut-Through
            </button>
            <button
              onClick={() => selectScenario('stealth')}
              className={`px-3.5 py-2 rounded text-xs font-mono font-bold border transition ${
                scenario === 'stealth'
                  ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-[#FFB703] shadow-[0_0_18px_rgba(212,175,55,0.35)]'
                  : 'border-[#2A2A35] bg-[#141419] text-zinc-300'
              }`}
            >
              3. Zona Gris (GPU FFT-16)
            </button>
            <button
              onClick={triggerAvalanche}
              className="px-4 py-2 rounded text-xs font-mono font-extrabold bg-gradient-to-r from-[#D4AF37] via-[#FFB703] to-[#D4AF37] text-black shadow-[0_0_20px_rgba(255,183,3,0.4)] hover:brightness-110 transition"
            >
              ⚡ Avalancha 10M Flits
            </button>
            <button
              onClick={exportForensicJson}
              className="px-3.5 py-2 rounded text-xs font-mono font-bold border border-[#00F0FF]/60 bg-[#00F0FF]/15 text-[#00F0FF] hover:bg-[#00F0FF]/25 transition"
            >
              📄 Exportar Reporte Forense (.JSON)
            </button>
          </div>
        </div>

        {/* 5 KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 font-mono">
          <div className="bg-[#141419] border border-[#00F0FF]/50 rounded-xl p-4 shadow-[0_0_20px_rgba(0,240,255,0.12)]">
            <div className="text-xs text-zinc-400 uppercase">Caudal en Línea (FPGA)</div>
            <div className="text-2xl font-extrabold text-[#00F0FF] mt-1">16.86 Mpps</div>
            <div className="text-xs text-[#00FF66] mt-1">Latencia Fija: 10.0 ns</div>
          </div>
          <div className="bg-[#141419] border border-[#00FF66]/50 rounded-xl p-4 shadow-[0_0_20px_rgba(0,255,102,0.12)]">
            <div className="text-xs text-zinc-400 uppercase">Fast-Path Forwards</div>
            <div className="text-2xl font-extrabold text-[#00FF66] mt-1">{forwards.toLocaleString('en-US')}</div>
            <div className="text-xs text-zinc-400 mt-1">100.0% Integridad · 0% FP</div>
          </div>
          <div className={`bg-[#141419] border rounded-xl p-4 transition ${scenario === 'ddos' ? 'border-[#FF3366] shadow-[0_0_24px_rgba(255,51,102,0.3)]' : 'border-[#2A2A35]'}`}>
            <div className="text-xs text-zinc-400 uppercase">Cut-Through Drops</div>
            <div className="text-2xl font-extrabold text-[#FF3366] mt-1">{drops.toLocaleString('en-US')}</div>
            <div className="text-xs text-zinc-400 mt-1">m_axis_tuser_drop = 1</div>
          </div>
          <div className={`bg-[#141419] border rounded-xl p-4 transition ${scenario === 'stealth' ? 'border-[#D4AF37] shadow-[0_0_24px_rgba(212,175,55,0.3)]' : 'border-[#2A2A35]'}`}>
            <div className="text-xs text-zinc-400 uppercase">Inspección GPU FFT-16</div>
            <div className="text-2xl font-extrabold text-[#FFB703] mt-1">{gpuTriggers.toLocaleString('en-US')}</div>
            <div className="text-xs text-zinc-400 mt-1">Convergencia: 0.0256%</div>
          </div>
          <div className={`bg-[#141419] border rounded-xl p-4 transition ${csr >= 3.0 ? 'border-[#D4AF37] shadow-[0_0_24px_rgba(212,175,55,0.3)]' : 'border-[#2A2A35]'}`}>
            <div className="text-xs text-zinc-400 uppercase">Registro CSR (Q16.16)</div>
            <div className="text-2xl font-extrabold text-[#D4AF37] mt-1">{csr.toFixed(4)}</div>
            <div className="text-xs text-[#00F0FF] mt-1">{q16Hex} ({q16Val})</div>
          </div>
        </div>

        {/* Middle Row: GPU FFT-16 Spectrum + 8-Node RDMA Mesh */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Vertex II Spectrum */}
          <div
            className={`lg:col-span-7 bg-[#141419] border rounded-2xl p-6 flex flex-col justify-between space-y-5 transition ${
              scenario === 'stealth'
                ? 'border-[#D4AF37] shadow-[0_0_32px_rgba(212,175,55,0.3)]'
                : scenario === 'ddos'
                ? 'border-[#FF3366] shadow-[0_0_28px_rgba(255,51,102,0.28)]'
                : 'border-[#00F0FF]/50 shadow-[0_0_24px_rgba(0,240,255,0.15)]'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2A2A35] pb-4">
              <div>
                <h3 className="text-base font-bold text-white uppercase tracking-wide">
                  VÉRTICE II · ANALIZADOR ESPECTRAL GPU RADIX-2 FFT-16
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Detección de armónicos periódicos en la "Zona Gris" · Frecuencia de Nyquist (<span className="font-mono text-[#FFB703] font-bold">Bin #8</span>)
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded text-xs font-mono font-bold border ${
                  scenario === 'stealth'
                    ? 'bg-[#FFB703]/20 text-[#FFB703] border-[#D4AF37]'
                    : scenario === 'ddos'
                    ? 'bg-[#FF3366]/15 text-[#FF3366] border-[#FF3366]/50'
                    : 'bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF]/40'
                }`}
              >
                {scenario === 'stealth'
                  ? '★ CAPTURA GPU: BIN #8 NYQUIST = 78.4%'
                  : scenario === 'ddos'
                  ? 'COLAPSO ENTRÓPICO (H = 0.08) -> DROP'
                  : 'ESPECTRO LIMPIO · PSD NOMINAL (11.2%)'}
              </span>
            </div>

            {/* 16 Bars */}
            <div
              className="h-44 items-end gap-2 pt-6 pb-2 px-3 bg-[#08080A] border border-[#2A2A35] rounded-xl"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(16, minmax(0, 1fr))' }}
            >
              {bars.map((h, i) => {
                const isGold = scenario === 'stealth' && (i === 8 || i === 4 || i === 12);
                const isRed = scenario === 'ddos' && i === 0;
                const bgStyle = isGold
                  ? {
                      height: `${h}%`,
                      background: 'linear-gradient(180deg, #FFF3B0 0%, #FFB703 40%, #D4AF37 100%)',
                      boxShadow: '0 0 16px rgba(255, 183, 3, 0.85)',
                    }
                  : isRed
                  ? {
                      height: `${h}%`,
                      background: 'linear-gradient(180deg, #FF758F 0%, #FF3366 50%, #590D22 100%)',
                      boxShadow: '0 0 16px rgba(255, 51, 102, 0.75)',
                    }
                  : {
                      height: `${h}%`,
                      background: 'linear-gradient(180deg, #00F0FF 0%, #0077FF 50%, #0A1931 100%)',
                      boxShadow: '0 -2px 8px rgba(0, 240, 255, 0.4)',
                    };
                return (
                  <div key={i} className="flex flex-col items-center justify-end h-full gap-1">
                    <div className="w-full rounded-t transition-all duration-300" style={bgStyle} />
                    <span className={`text-xs font-mono ${i === 8 ? 'text-[#FFB703] font-extrabold' : 'text-zinc-500'}`}>
                      {i === 8 ? 'B8★' : `B${i}`}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CSR Slider */}
            <div className="bg-[#0B0B0F] border border-[#2A2A35] rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-white font-mono">
                  CALIBRADOR MANUAL CSR EN CALIENTE (<span className="text-[#00F0FF]">tzanix_ctl set-threshold</span>)
                </div>
                <div className="text-xs text-zinc-400">
                  Ajusta el registro <code className="text-[#FFB703] font-mono">csr_drop_threshold_q16</code> en la FPGA y propaga por RDMA:
                </div>
              </div>
              <div className="flex items-center gap-3 font-mono">
                <input
                  type="range"
                  min="1.00"
                  max="3.80"
                  step="0.02"
                  value={csr}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setCsr(val);
                    setEpoch((ep) => ep + 8);
                    addLog('CLI-CSR', `Override manual tzanix_ctl: CSR = ${val.toFixed(4)} replicado vía RoCEv2.`, 'gpu');
                  }}
                  className="w-40 accent-[#FFB703] cursor-pointer"
                />
                <span className="text-base font-extrabold text-[#FFB703] w-16 text-right">{csr.toFixed(4)}</span>
              </div>
            </div>
          </div>

          {/* Vertex III 8-Node RDMA + Matrix Terminal */}
          <div className="lg:col-span-5 bg-[#141419] border border-[#2A2A35] rounded-2xl p-6 flex flex-col justify-between space-y-5">
            <div className="flex items-center justify-between border-b border-[#2A2A35] pb-4">
              <div>
                <h3 className="text-base font-bold text-white uppercase tracking-wide">
                  VÉRTICE III · MALLA RDMA RoCEv2 (8 NODOS)
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Sincronización Zero-CPU (<code className="text-[#00F0FF] font-mono">RDMA_WRITE 32B</code>) en microsegundos
                </p>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-xs font-mono text-[#00F0FF] font-bold">
                ÉPOCA #{epoch.toLocaleString('en-US')}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div
                  key={n}
                  className={`relative rounded-xl p-3 space-y-1 border transition ${
                    csr >= 3.0
                      ? 'bg-[#161208] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                      : 'bg-[#0B0B10] border-[#00FF66]/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">NODO-0{n}</span>
                    <span className="relative flex h-2.5 w-2.5">
                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          csr >= 3.0 ? 'bg-[#FFB703]' : 'bg-[#00FF66]'
                        }`}
                      />
                      <span
                        className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                          csr >= 3.0 ? 'bg-[#FFB703]' : 'bg-[#00FF66]'
                        }`}
                      />
                    </span>
                  </div>
                  <div className={`text-xs font-extrabold ${csr >= 3.0 ? 'text-[#FFB703]' : 'text-[#00F0FF]'}`}>
                    CSR: {csr.toFixed(4)}
                  </div>
                  <div className="text-xs text-zinc-400">CRC32: OK</div>
                </div>
              ))}
            </div>

            {/* Matrix Log */}
            <div className="bg-[#050507] border border-[#00F0FF]/30 rounded-xl p-4 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[#00F0FF]/20 pb-1.5">
                <span className="font-bold text-[#00F0FF]">SOC SILICON AUDIT STREAM // 400 MHz</span>
                <span className="text-zinc-500">LIVE</span>
              </div>
              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {logs.map((l, idx) => (
                  <div
                    key={idx}
                    style={{
                      color:
                        l.type === 'legit'
                          ? '#00FF66'
                          : l.type === 'drop'
                          ? '#FF3366'
                          : l.type === 'gpu'
                          ? '#FFB703'
                          : '#F8FAFC',
                    }}
                  >
                    <span className="text-zinc-500">[{l.time}]</span> <strong>[{l.tag}]</strong> {l.msg}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Forensic GeoIP / ASN Table */}
        <div className="bg-[#141419] border border-[#2A2A35] rounded-2xl p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2A2A35] pb-3">
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wide">
                INTELIGENCIA FORENSE DE AMENAZAS (GEO-IP · ASN · TAXONOMÍA DE ATAQUES)
              </h3>
              <p className="text-xs text-zinc-400">
                Bitácora de auditoría exportable para cumplimiento regulatorio SOC 2, ISO 27001, HIPAA y aseguradoras de ciberseguridad
              </p>
            </div>
            <button
              onClick={exportForensicJson}
              className="px-3 py-1.5 rounded text-xs font-mono font-bold border border-[#00F0FF]/50 text-[#00F0FF] hover:bg-[#00F0FF]/15 transition"
            >
              ⬇ Descargar Evidencia Forense (.JSON)
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="border-b border-[#2A2A35] text-zinc-400 uppercase">
                  <th className="py-2.5 px-2">ID Incidente</th>
                  <th className="py-2.5 px-2">IP Origen / GeoIP</th>
                  <th className="py-2.5 px-2">ASN / Reputación</th>
                  <th className="py-2.5 px-2">Vector Clasificado</th>
                  <th className="py-2.5 px-2">Entropía / Bin</th>
                  <th className="py-2.5 px-2">Acción Silicio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A35]/60">
                {incidents.map((inc, i) => (
                  <tr key={i} className="hover:bg-[#1C1C24] transition">
                    <td className="py-2.5 px-2 font-bold text-[#00F0FF]">{inc.incident_id}</td>
                    <td className="py-2.5 px-2">
                      <div className="text-white font-bold">{inc.source_ip}</div>
                      <div className="text-zinc-400">{inc.country}</div>
                    </td>
                    <td className="py-2.5 px-2">
                      <div className="text-zinc-200">{inc.asn}</div>
                      <div className="text-[#FFB703]">{inc.reputation}</div>
                    </td>
                    <td className="py-2.5 px-2 text-white font-semibold">{inc.attack_vector}</td>
                    <td className="py-2.5 px-2">
                      <div className="text-[#00F0FF]">H = {inc.entropy_bits.toFixed(4)}</div>
                      <div className="text-zinc-400">Bin #{inc.dominant_fft_bin}</div>
                    </td>
                    <td className="py-2.5 px-2">
                      <span
                        className={`px-2 py-0.5 rounded border text-xs font-bold ${
                          inc.isGpu
                            ? 'text-[#FFB703] bg-[#FFB703]/15 border-[#D4AF37]/50'
                            : 'text-[#FF3366] bg-[#FF3366]/15 border-[#FF3366]/50'
                        }`}
                      >
                        {inc.action}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
