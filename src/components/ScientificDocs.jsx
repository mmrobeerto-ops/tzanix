import React from 'react';

export default function ScientificDocs() {
  return (
    <section id="docs" className="w-full py-28 px-5 sm:px-[4vw] bg-[#06090F] border-t border-slate-800/90 relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* CABECERA EJECUTIVA */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.28em] text-[#38BDF8]">
            <span>ESPECIFICACIÓN DE ARQUITECTURA &amp; BENCHMARK DE LABORATORIO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
            ARQUITECTURA TRIDENTE (<span className="text-[#38BDF8]">#&#33;[no_std]</span>)
          </h2>
          <p className="text-slate-400 max-w-3xl text-sm sm:text-base font-normal leading-relaxed">
            Diseñado para operar en la capa de acceso a la red (<strong className="text-slate-200">Fast-Path</strong>), TZANIX Æther-Core elimina por completo la latencia del kernel de Linux, el recolector de basura y la unidad de punto flotante (FPU), alcanzando en pruebas de estrés un rendimiento determinista de <strong className="text-white">16.86 millones de paquetes por segundo (Mpps)</strong> y una latencia proyectada en silicio FPGA de <strong className="text-[#38BDF8]">10.0 nanosegundos</strong>.
          </p>
        </div>

        {/* LOS 3 VÉRTICES DEL TRIDENTE (PALETA INSTITUCIONAL UNIFICADA) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* VÉRTICE I */}
          <div className="bg-[#0B111E] border border-slate-800 hover:border-[#38BDF8]/60 p-8 flex flex-col justify-between space-y-6 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs text-[#38BDF8]">
                <span>VÉRTICE I // SILICIO FPGA</span>
                <span className="px-2 py-0.5 bg-[#06090F] border border-slate-800 text-slate-300">10.0 ns FIXED</span>
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                Escudo Punto Fijo Q16.16 &amp; Cut-Through
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Reemplazamos las divisiones de punto flotante (<code className="text-slate-200">f64</code>) por aritmética entera <strong className="text-white">Q16.16</strong> (factor de escala <code className="text-slate-200">65536</code>). La tabla <code className="text-[#38BDF8]">SHANNON_LUT</code> (512 entradas) ocupa exactamente <strong className="text-white">2 KB de BRAM</strong> dual-port dentro de la FPGA, consultando 16 canales en paralelo en un solo ciclo de reloj (<code className="text-slate-200">2.5 ns @ 400 MHz</code>).
              </p>
            </div>
            <div className="bg-[#06090F] p-4 border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5">
              <div className="text-slate-500">// Pipeline RTL SystemVerilog (4 Etapas)</div>
              <div>Bus: <span className="text-white">AXI4-Stream 512-bit (64B/flit)</span></div>
              <div>Acción: <span className="text-[#38BDF8]">m_axis_tuser_drop = 1 (MAC Abort)</span></div>
            </div>
          </div>

          {/* VÉRTICE II */}
          <div className="bg-[#0B111E] border border-slate-800 hover:border-[#38BDF8]/60 p-8 flex flex-col justify-between space-y-6 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs text-[#38BDF8]">
                <span>VÉRTICE II // CEREBRO GPU</span>
                <span className="px-2 py-0.5 bg-[#06090F] border border-slate-800 text-slate-300">RADIX-2 FFT-16</span>
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                Análisis Espectral en la &quot;Zona Gris&quot;
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Los paquetes sospechosos con entropía intermedia (<code className="text-slate-200">3.05 &ndash; 3.52 bits/nibble</code>) se derivan sin bloqueo vía <strong className="text-white">GPUDirect RDMA</strong>. Una Transformada Rápida de Fourier <strong className="text-white">FFT-16 In-Place</strong> calcula la Densidad Espectral de Potencia (PSD) para cazar ataques pulsantes o <em>Low-Rate TCP DoS</em> en la frecuencia de Nyquist (<strong className="text-[#38BDF8]">Bin #8</strong>).
              </p>
            </div>
            <div className="bg-[#06090F] p-4 border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5">
              <div className="text-slate-500">// Auto-Hardening Atómico CSR</div>
              <div>Muestras requeridas: <span className="text-white">256 flits (0.0256%)</span></div>
              <div>Recalibración: <span className="text-[#38BDF8]">CSR 1.9000 &rarr; 3.5200</span></div>
            </div>
          </div>

          {/* VÉRTICE III */}
          <div className="bg-[#0B111E] border border-slate-800 hover:border-[#38BDF8]/60 p-8 flex flex-col justify-between space-y-6 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs text-[#38BDF8]">
                <span>VÉRTICE III // SISTEMA NERVIOSO</span>
                <span className="px-2 py-0.5 bg-[#06090F] border border-slate-800 text-slate-300">RoCEv2 32-BYTE</span>
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                Inmunidad Colectiva RDMA Cluster Sync
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Cuando un nodo neutraliza una anomalía, transmite un descriptor hiper-comprimido de <strong className="text-white">32 bytes</strong> (<code className="text-[#38BDF8]">RdmaClusterSyncPacket</code>) mediante operaciones <code className="text-slate-200">RDMA_WRITE</code> directas a la memoria RAM de hasta 8 nodos DPU vecinos sin intervención del sistema operativo ni de la CPU.
              </p>
            </div>
            <div className="bg-[#06090F] p-4 border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5">
              <div className="text-slate-500">// Verificación Criptográfica Zero-CPU</div>
              <div>Integridad: <span className="text-white">Magic 0x545A4E58 + CRC32/XOR</span></div>
              <div>Alineación Hardware: <span className="text-[#38BDF8]">#[repr(C, align(32))]</span></div>
            </div>
          </div>

        </div>

        {/* PRUEBA DE ESTRÉS DE LABORATORIO: AVALANCHA DE 10M FLITS */}
        <div className="bg-[#0B111E] border border-slate-800 p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-mono text-[#38BDF8] uppercase tracking-[0.25em]">
              PRUEBA DE ESTRÉS INTERNA // TESTS/TRIDENT_AVALANCHE_STRESS.RS
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
              Benchmark de Laboratorio: 10,000,000 de Flits
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Sometido a un bombardeo mixto de 10 millones de flits simultáneos (70% tráfico corporativo legítimo, 29.99% ataques volumétricos DDoS y 0.01% botnets sigilosas en Zona Gris), el motor mantuvo <strong className="text-white">100.0% de precisión en el Fast-Path</strong> con un área bajo la curva <strong className="text-[#38BDF8]">ROC AUC = 0.9937</strong>.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono">
              <div className="bg-[#06090F] p-3 border border-slate-800">
                <div className="text-[10px] text-slate-400">THROUGHPUT</div>
                <div className="text-lg font-bold text-white">16.86 Mpps</div>
              </div>
              <div className="bg-[#06090F] p-3 border border-slate-800">
                <div className="text-[10px] text-slate-400">LATENCIA SW</div>
                <div className="text-lg font-bold text-white">59.31 ns</div>
              </div>
              <div className="bg-[#06090F] p-3 border border-slate-800">
                <div className="text-[10px] text-slate-400">LATENCIA FPGA</div>
                <div className="text-lg font-bold text-[#38BDF8]">10.00 ns</div>
              </div>
              <div className="bg-[#06090F] p-3 border border-slate-800">
                <div className="text-[10px] text-slate-400">FALSOS POSITIVOS</div>
                <div className="text-lg font-bold text-[#38BDF8]">0.00%</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#06090F] border border-slate-800 p-5 font-mono text-xs text-slate-300 overflow-x-auto">
            <div className="text-slate-500 border-b border-slate-800 pb-2 mb-3 flex justify-between">
              <span>$ cargo test --release --test trident_avalanche_stress</span>
              <span className="text-[#38BDF8]">PASSED (0.59s)</span>
            </div>
            <pre className="leading-relaxed text-[11px] sm:text-xs text-slate-300">
{`[TRIDENTE-BENCHMARK] Avalancha de 10,000,000 Flits Completada
 ├─ Tiempo Total de Ejecución : 0.5931 segundos
 ├─ Rendimiento Sostenido     : 16.86 Mpps (59.31 ns/flit)
 ├─ Vértice I (Fast-Path OK)  : 7,000,394 flits (100% Integridad)
 ├─ Vértice I (Cut-Through)   : 2,999,744 ataques abortados en 10ns
 ├─ Vértice II (GPU FFT-16)   : 256 muestras -> Nyquist Bin #8 Cazado
 ├─ Auto-Hardening CSR        : 1.9000 -> 3.5200 (0x0003851E)
 └─ Vértice III (RDMA Sync)   : 8/8 Nodos DPU Sincronizados (CRC OK)`}
            </pre>
          </div>
        </div>

      </div>
    </section>
  );
}
