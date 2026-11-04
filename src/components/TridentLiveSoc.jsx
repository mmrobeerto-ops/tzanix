import React, { useState, useEffect } from 'react';

// IPs exclusivas de documentación según RFC 5737 (192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24)
// Ninguna IP o ASN real de terceros se muestra como atacante en la demostración.
const THREAT_POOL = [
  {
    ip: '198.51.100.44',
    proto: 'IPv4',
    country: 'TEST-NET-2 (RFC 5737)',
    asn: 'AS64496 (RFC 5398 Doc ASN)',
    vector: 'Ráfaga periódica en Zona Gris (Estado Suspect -> Mirror)',
    reaction: 'Muestreo por ventana (2048 pkts)',
    rdmaSync: 'MirrorInspection · CSR 6.0000 bits',
  },
  {
    ip: '192.0.2.233',
    proto: 'IPv4',
    country: 'TEST-NET-1 (RFC 5737)',
    asn: 'AS64497 (RFC 5398 Doc ASN)',
    vector: 'SYN-Flood Monofuente (Caída de H < 1.50 bits · Cuota > 10%)',
    reaction: 'Drop selectivo por bucket O(1)',
    rdmaSync: 'DropHardware (Solo Bucket Dominante)',
  },
  {
    ip: '203.0.113.88',
    proto: 'IPv4',
    country: 'TEST-NET-3 (RFC 5737)',
    asn: 'AS64498 (RFC 5398 Doc ASN)',
    vector: 'UDP Flood Concentrado (Cuota de Bucket > 35%)',
    reaction: 'Drop selectivo por bucket O(1)',
    rdmaSync: 'DropHardware (Tráfico legítimo intacto)',
  },
  {
    ip: '198.51.100.118',
    proto: 'IPv4',
    country: 'TEST-NET-2 (RFC 5737)',
    asn: 'AS64499 (RFC 5398 Doc ASN)',
    vector: 'Dispersión de IPs de origen (Alta entropía H > 7.60 bits)',
    reaction: 'Estado Suspect (Sin auto-DoS)',
    rdmaSync: 'MirrorInspection / SYN-Cookies',
  },
];

export default function TridentLiveSoc() {
  const [scenario, setScenario] = useState('clean'); // 'clean' | 'ddos' | 'grayzone'
  const [csrThreshold, setCsrThreshold] = useState(6.0000);
  const [forwards, setForwards] = useState(7000000);
  const [drops, setDrops] = useState(2999744);
  const [grayZone, setGrayZone] = useState(256);
  const [epoch, setEpoch] = useState(4882);
  const [fftBins, setFftBins] = useState([
    18, 22, 15, 28, 19, 24, 16, 21, 24, 17, 25, 20, 14, 23, 29, 19
  ]);
  const [forensicRows, setForensicRows] = useState(THREAT_POOL);
  const [logs, setLogs] = useState([
    { time: '18:24:01.004', level: 'SIM-CPU', msg: '[DEMO] Simulador interactivo iniciado. Contadores exactos: 7,000,000 Forwards + 2,999,744 Drops + 256 Mirror = 10,000,000.' },
    { time: '18:24:02.118', level: 'VENTANA', msg: '[Q16.16] WindowEntropy operando sobre 256 buckets de IPv4 (rango 0.00 a 8.00 bits, mínimo 2,048 muestras).' },
    { time: '18:24:03.492', level: 'NO-DOS', msg: '[POLÍTICA] Mitigación por cuota de bucket activa: el tráfico de clientes legítimos no se descarta durante alertas.' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setEpoch((prev) => prev + 1);
      if (scenario === 'clean') {
        setFftBins(Array.from({ length: 16 }, () => Math.floor(Math.random() * 20 + 12)));
      } else if (scenario === 'ddos') {
        setFftBins(Array.from({ length: 16 }, (_, i) => (i % 3 === 0 ? Math.floor(Math.random() * 35 + 30) : Math.floor(Math.random() * 20 + 10))));
      } else if (scenario === 'grayzone') {
        setFftBins(
          Array.from({ length: 16 }, (_, i) =>
            i === 4 ? Math.floor(Math.random() * 6 + 88) : Math.floor(Math.random() * 18 + 8)
          )
        );
      }
    }, 1100);
    return () => clearInterval(timer);
  }, [scenario]);

  const triggerScenario = (mode) => {
    setScenario(mode);
    const now = new Date().toISOString().split('T')[1].slice(0, 12);
    if (mode === 'clean') {
      setCsrThreshold(6.0000);
      setLogs((prev) => [
        { time: now, level: 'NORMAL', msg: '[SIMULACIÓN] Estado WindowState::Normal. Línea base EWMA actualizada en 6.0000 bits.' },
        ...prev.slice(0, 7),
      ]);
    } else if (mode === 'ddos') {
      setCsrThreshold(4.5000);
      const item = THREAT_POOL[1];
      setForensicRows((prev) => [item, ...prev.slice(0, 3)]);
      setLogs((prev) => [
        { time: now, level: 'ATTACK', msg: `[SIMULACIÓN] Caída de entropía por origen ${item.ip}. Drop aplicado solo al bucket dominante (>10% share).` },
        ...prev.slice(0, 7),
      ]);
    } else if (mode === 'grayzone') {
      setCsrThreshold(7.2500);
      const item = THREAT_POOL[3];
      setForensicRows((prev) => [item, ...prev.slice(0, 3)]);
      setLogs((prev) => [
        { time: now, level: 'SUSPECT', msg: `[SIMULACIÓN] Alta dispersión de IPs (${item.ip}). Estado Suspect -> MirrorInspection (sin bloquear clientes).` },
        ...prev.slice(0, 7),
      ]);
    }
  };

  const resetExact10MBenchmark = () => {
    const now = new Date().toISOString().split('T')[1].slice(0, 12);
    setScenario('clean');
    setCsrThreshold(6.0000);
    setForwards(7000000);
    setDrops(2999744);
    setGrayZone(256);
    setLogs((prev) => [
      { time: now, level: 'BENCHMARK', msg: '[TEST SINTÉTICO CPU] n=10,000,000 exactos (7,000,000 Forward + 2,999,744 Drop + 256 Mirror = 10,000,000 · 0.00256% Mirror).' },
      ...prev.slice(0, 7),
    ]);
  };

  const exportForensicJson = () => {
    const report = {
      report_id: `TZANIX-SIM-DEMO-${Date.now()}`,
      notice: 'DATOS SIMULADOS DE DEMOSTRACIÓN — DIRECCIONES IP DE DOCUMENTACIÓN RFC 5737',
      generated_at_utc: new Date().toISOString(),
      engine: 'TZANIX Aether-Core (Rust no_std Library + Simulation Demo)',
      data_retention_policy: 'Zero-Payload Storage. En despliegues reales se registran únicamente metadatos L3/L4 (IP origen, puerto, longitud, timestamp) con rotación configurable.',
      measured_vs_simulated: {
        window_entropy_q16: 'Implementado en Rust (256 buckets IPv4, O(1) incremental, escala 0..8 bits)',
        cpu_synthetic_benchmark: '16.86 Mpps (59.31 ns tiempo medio/paquete, 1 hilo CPU, datos sintéticos)',
        fpga_rtl_model: 'Modelo SystemVerilog de 4 etapas (10.0 ns proyectados en lógica interna @ 400 MHz, excluye MAC/PHY)',
      },
      telemetry_snapshot: {
        total_packets_evaluated: forwards + drops + grayZone,
        fast_path_forwards: forwards,
        selective_bucket_drops: drops,
        mirror_inspections: grayZone,
        mirror_fraction_percent: 0.00256,
        baseline_entropy_bits_q16_16: csrThreshold,
        baseline_entropy_hex: `0x000${Math.round(csrThreshold * 65536).toString(16).toUpperCase()}`,
        synthetic_roc_auc: 0.9687,
        synthetic_fpr_at_calibrated_threshold: 0.0,
      },
      simulated_incidents_rfc5737: forensicRows,
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tzanix-simulated-demo-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const q16Hex = `0x000${Math.round(csrThreshold * 65536).toString(16).toUpperCase()}`;

  return (
    <section id="live-soc" className="w-full pt-28 pb-24 px-5 sm:px-[4vw] bg-[#06090F] border-t border-slate-800/90 relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* CABECERA CON ETIQUETA EXPLÍCITA DE DEMO SIMULADA */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-amber-950/50 border border-amber-500/40 text-xs font-mono font-semibold uppercase tracking-[0.2em] text-amber-300 mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>DEMO INTERACTIVA EN NAVEGADOR (DATOS SIMULADOS · IPs RFC 5737)</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase text-white">
              SIMULADOR DE CONSOLA SOC
            </h2>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => triggerScenario('clean')}
              className={`px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider border transition-all ${
                scenario === 'clean'
                  ? 'border-[#38BDF8] bg-[#38BDF8]/15 text-white shadow-[0_0_20px_rgba(56,189,248,0.18)]'
                  : 'border-slate-800 bg-[#0B111E] text-slate-400 hover:border-slate-600 hover:text-slate-200'
              }`}
            >
              1. Estado Normal
            </button>
            <button
              onClick={() => triggerScenario('ddos')}
              className={`px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider border transition-all ${
                scenario === 'ddos'
                  ? 'border-[#38BDF8] bg-[#38BDF8]/15 text-white shadow-[0_0_20px_rgba(56,189,248,0.18)]'
                  : 'border-slate-800 bg-[#0B111E] text-slate-400 hover:border-slate-600 hover:text-slate-200'
              }`}
            >
              2. Ataque (Cuota por Bucket)
            </button>
            <button
              onClick={() => triggerScenario('grayzone')}
              className={`px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider border transition-all ${
                scenario === 'grayzone'
                  ? 'border-[#38BDF8] bg-[#38BDF8]/15 text-white shadow-[0_0_20px_rgba(56,189,248,0.18)]'
                  : 'border-slate-800 bg-[#0B111E] text-slate-400 hover:border-slate-600 hover:text-slate-200'
              }`}
            >
              3. Estado Suspect (Mirror)
            </button>
            <button
              onClick={resetExact10MBenchmark}
              className="px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider bg-[#0F172A] text-slate-200 border border-slate-700 hover:border-[#38BDF8] hover:text-white transition-all"
            >
              Ver Corte Exacto 10M
            </button>
            <button
              onClick={exportForensicJson}
              className="px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider border border-[#38BDF8]/60 bg-[#38BDF8]/10 text-[#38BDF8] hover:bg-[#38BDF8] hover:text-[#06090F] transition-all"
            >
              Descargar JSON de Ejemplo
            </button>
          </div>
        </div>

        {/* 5 TARJETAS CON SUMA EXACTA = 10,000,000 Y ETIQUETAS HONESTAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 font-mono">
          <div className="bg-[#0B111E] border border-slate-800 p-5">
            <div className="text-[11px] text-slate-400 uppercase tracking-wider">THROUGHPUT CPU (1 HILO)</div>
            <div className="text-2xl sm:text-3xl font-bold text-white mt-2">16.86 Mpps</div>
            <div className="text-[11px] text-[#38BDF8] mt-1">59.31 ns medio/pkt (Sintético)</div>
          </div>

          <div className="bg-[#0B111E] border border-slate-800 p-5">
            <div className="text-[11px] text-slate-400 uppercase tracking-wider">FAST-PATH FORWARDS</div>
            <div className="text-2xl sm:text-3xl font-bold text-white mt-2">{forwards.toLocaleString()}</div>
            <div className="text-[11px] text-slate-400 mt-1">70.00000% del lote (10M)</div>
          </div>

          <div className="bg-[#0B111E] border border-slate-800 p-5">
            <div className="text-[11px] text-slate-400 uppercase tracking-wider">DROPS POR BUCKET</div>
            <div className="text-2xl sm:text-3xl font-bold text-white mt-2">{drops.toLocaleString()}</div>
            <div className="text-[11px] text-slate-400 mt-1">29.99744% del lote (10M)</div>
          </div>

          <div className="bg-[#0B111E] border border-slate-800 p-5">
            <div className="text-[11px] text-slate-400 uppercase tracking-wider">MIRROR INSPECTION</div>
            <div className="text-2xl sm:text-3xl font-bold text-white mt-2">{grayZone.toLocaleString()}</div>
            <div className="text-[11px] text-slate-400 mt-1">0.00256% (256 / 10,000,000)</div>
          </div>

          <div className="bg-[#0B111E] border border-[#38BDF8]/40 p-5">
            <div className="text-[11px] text-slate-400 uppercase tracking-wider">LÍNEA BASE H (0–8 BITS)</div>
            <div className="text-2xl sm:text-3xl font-bold text-[#38BDF8] mt-2">{csrThreshold.toFixed(4)}</div>
            <div className="text-[11px] text-slate-400 mt-1">{q16Hex} (Q16.16)</div>
          </div>
        </div>

        {/* PANEL CENTRAL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-7 bg-[#0B111E] border border-slate-800 p-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white">
                    SIMULACIÓN DE ESPECTRO EN ZONA DE TRANSICIÓN (FFT-16)
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Visualización didáctica de concentración armónica sobre lotes derivados a <code className="text-[#38BDF8]">MirrorInspection</code>
                  </p>
                </div>
                <span className={`px-3 py-1 text-[11px] font-mono font-semibold border ${
                  scenario === 'grayzone'
                    ? 'bg-[#38BDF8]/15 border-[#38BDF8] text-white'
                    : 'bg-[#06090F] border-slate-700 text-slate-300'
                }`}>
                  {scenario === 'grayzone' ? 'ESTADO: SUSPECT (INSPECCIÓN)' : 'ESTADO: NORMAL'}
                </span>
              </div>

              <div className="mt-6 h-52 flex items-end justify-between gap-1.5 sm:gap-2 pt-6 px-3 bg-[#06090F] border border-slate-800/90">
                {fftBins.map((val, idx) => {
                  const isPeak = idx === 4 && scenario === 'grayzone';
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <div className="text-[9px] font-mono text-slate-400">{val}%</div>
                      <div
                        className="w-full transition-all duration-500"
                        style={{
                          height: `${Math.max(val, 8)}%`,
                          background: isPeak
                            ? 'linear-gradient(180deg, #FFFFFF 0%, #38BDF8 55%, #0284C7 100%)'
                            : 'linear-gradient(180deg, #38BDF8 0%, #0369A1 65%, #0F172A 100%)',
                          opacity: isPeak ? 1 : 0.75,
                        }}
                      />
                      <div className={`text-[10px] font-mono pb-1 ${idx === 4 ? 'text-[#38BDF8] font-bold' : 'text-slate-500'}`}>
                        B{idx}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono font-semibold text-white uppercase">
                  SIMULADOR DE LÍNEA BASE DE ENTROPÍA (0.00 A 8.00 BITS · 256 BUCKETS)
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Ajusta el valor de referencia Q16.16 en la demostración interactiva
                </div>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1.00"
                  max="7.90"
                  step="0.05"
                  value={csrThreshold}
                  onChange={(e) => setCsrThreshold(parseFloat(e.target.value))}
                  className="w-40 sm:w-52 accent-[#38BDF8] cursor-pointer"
                />
                <span className="font-mono text-base font-bold text-[#38BDF8] w-20 text-right">
                  {csrThreshold.toFixed(2)} b
                </span>
              </div>
            </div>
          </div>

          {/* SIMULACIÓN DE NODOS */}
          <div className="lg:col-span-5 bg-[#0B111E] border border-slate-800 p-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white">
                    SIMULACIÓN DE RÉPLICA DE UMBRAL (8 NODOS)
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Descriptor <code className="text-[#38BDF8]">RdmaClusterSyncPacket (32B)</code> en memoria
                  </p>
                </div>
                <span className="text-xs font-mono text-[#38BDF8] bg-[#06090F] px-2.5 py-1 border border-slate-800">
                  VENTANA #{epoch.toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 font-mono">
                {Array.from({ length: 8 }, (_, i) => (
                  <div
                    key={i}
                    className="bg-[#06090F] border border-slate-800 p-3 relative"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-white">NODO-0{i + 1}</span>
                      <span className="inline-flex rounded-full h-2 w-2 bg-[#38BDF8]"></span>
                    </div>
                    <div className="text-[11px] text-[#38BDF8] font-semibold">H: {csrThreshold.toFixed(2)}b</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">TAG: 32B SYNC</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#06090F] border border-slate-800 p-4 font-mono text-xs space-y-2 h-44 overflow-y-auto">
              <div className="text-[10px] text-slate-400 uppercase tracking-widest border-b border-slate-800/80 pb-1.5 mb-2 flex justify-between">
                <span>REGISTRO DE EVENTOS DEL SIMULADOR</span>
                <span className="text-amber-300">● MODO DEMO</span>
              </div>
              {logs.map((log, i) => (
                <div key={i} className="leading-relaxed text-[11px]">
                  <span className="text-slate-500 mr-2">[{log.time}]</span>
                  <span className="text-[#38BDF8] font-semibold mr-2">[{log.level}]</span>
                  <span className="text-slate-300">{log.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TABLA DE EVENTOS SIMULADOS CON IPs RFC 5737 Y AVISO DE RETENCIÓN REALISTA */}
        <div className="bg-[#0B111E] border border-slate-800 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4 mb-4">
            <div>
              <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white">
                EJEMPLO DE BITÁCORA DE CABECERAS L3/L4 (IPs DE DOCUMENTACIÓN RFC 5737)
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                No almacenamos payload de aplicación (0 bytes de contenido). Los metadatos de cabecera (IP, puerto, longitud) se retienen temporalmente para auditoría.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-300">
              PAYLOAD ALMACENADO: <strong className="text-[#38BDF8]">0 BYTES (SOLO METADATOS L3/L4)</strong>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[11px]">
                  <th className="py-3 px-3">IP Origen (RFC 5737)</th>
                  <th className="py-3 px-3">Bloque de Documentación</th>
                  <th className="py-3 px-3">ASN de Documentación (RFC 5398)</th>
                  <th className="py-3 px-3">Señal Detectada (L3/L4)</th>
                  <th className="py-3 px-3">Mecanismo</th>
                  <th className="py-3 px-3 text-right">Acción del Pipeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {forensicRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-3 px-3 text-white font-semibold">
                      <span className="text-[10px] px-1.5 py-0.5 mr-2 bg-[#06090F] border border-slate-700 text-[#38BDF8]">
                        {row.proto}
                      </span>
                      {row.ip}
                    </td>
                    <td className="py-3 px-3 text-slate-300">{row.country}</td>
                    <td className="py-3 px-3 text-slate-400">{row.asn}</td>
                    <td className="py-3 px-3 text-slate-200">{row.vector}</td>
                    <td className="py-3 px-3 text-[#38BDF8] font-semibold">{row.reaction}</td>
                    <td className="py-3 px-3 text-right">
                      <span className="px-2.5 py-1 bg-[#06090F] border border-slate-700 text-slate-200 text-[10px] font-semibold">
                        {row.rdmaSync}
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
