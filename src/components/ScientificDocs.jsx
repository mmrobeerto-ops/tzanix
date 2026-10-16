import React from 'react';

export default function ScientificDocs() {
  return (
    <section id="docs" className="relative z-10 w-full min-h-screen bg-[#08080A] py-20 sm:py-28 border-b border-white/10">
      <div className="max-w-6xl mx-auto w-full space-y-12 px-5 sm:px-8">
        
        <div className="border-b border-white/20 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-mono font-bold tracking-[0.35em] uppercase text-[#00F0FF] mb-2">
              INGENIERÍA DE SILICIO &amp; CERTIFICACIÓN DE RENDIMIENTO
            </p>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase text-white">
              ESPECIFICACIÓN TÉCNICA TRIDENTE
            </h2>
          </div>
          <span className="font-mono text-xs px-3 py-1.5 border border-[#00FF66]/40 bg-[#00FF66]/10 text-[#00FF66] uppercase tracking-widest">
            ROC AUC CERTIFICADO: 0.9937
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Vértice I */}
          <div className="bg-[#141419] border border-[#2A2A35] hover:border-[#00F0FF]/60 transition p-6 sm:p-8 space-y-4">
            <div className="text-xs font-mono font-bold text-[#00F0FF] tracking-widest uppercase">
              VÉRTICE I // ESCUDO EN LÍNEA
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase">
              FPGA Punto Fijo Q16.16 &amp; Cut-Through
            </h3>
            <p className="text-slate-300 font-light text-sm leading-relaxed">
              Eliminamos por completo la unidad de punto flotante (FPU) y las divisiones de alta latencia. La tabla de entropía de Shannon (512 entradas) se cuantiza en tiempo de compilación a enteros <strong>Q16.16</strong> en exactamente <strong>2 KB de memoria BRAM</strong> interna.
            </p>
            <div className="bg-black/80 border border-white/10 p-3.5 font-mono text-xs text-slate-300 space-y-1">
              <div>• Reloj de Silicio: <span className="text-[#00F0FF]">400 MHz (2.5 ns/ciclo)</span></div>
              <div>• Pipeline RTL: <span className="text-[#00FF66]">4 Etapas = 10.0 ns fijos</span></div>
              <div>• Bus Físico: <span className="text-white">AXI4-Stream 512-bit (64B)</span></div>
            </div>
          </div>

          {/* Vértice II */}
          <div className="bg-[#141419] border border-[#2A2A35] hover:border-[#D4AF37] transition p-6 sm:p-8 space-y-4">
            <div className="text-xs font-mono font-bold text-[#FFB703] tracking-widest uppercase">
              VÉRTICE II // CEREBRO ESPECTRAL
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase">
              GPU Radix-2 FFT-16 &amp; Auto-Hardening
            </h3>
            <p className="text-slate-300 font-light text-sm leading-relaxed">
              Los ataques avanzados (Pulsing Botnets, Low-Rate TCP DoS y AI Scrapers) modulan sus paquetes hacia la <strong>"Zona Gris"</strong> de entropía para burlar WAFs tradicionales. La FPGA los desvía vía <strong>GPUDirect RDMA</strong> hacia la GPU sin tocar la CPU.
            </p>
            <div className="bg-black/80 border border-white/10 p-3.5 font-mono text-xs text-slate-300 space-y-1">
              <div>• Transformada: <span className="text-[#FFB703]">16-Point Radix-2 DIT FFT</span></div>
              <div>• Detección: <span className="text-[#00FF66]">Frecuencia Nyquist (Bin #8)</span></div>
              <div>• Reacción CSR: <span className="text-white">256 muestras (&lt; 1 ms)</span></div>
            </div>
          </div>

          {/* Vértice III */}
          <div className="bg-[#141419] border border-[#2A2A35] hover:border-[#00FF66]/60 transition p-6 sm:p-8 space-y-4">
            <div className="text-xs font-mono font-bold text-[#00FF66] tracking-widest uppercase">
              VÉRTICE III // SISTEMA NERVIOSO
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase">
              Malla Distribuida RDMA RoCEv2
            </h3>
            <p className="text-slate-300 font-light text-sm leading-relaxed">
              Un nodo aislado es fuerte; un clúster sincronizado es invulnerable. Mediante descriptores compactos de <strong>exactamente 32 bytes</strong> alineados a caché, cada DPU/FPGA replica el nuevo umbral CSR directamente en la RAM de los nodos vecinos vía <code>RDMA_WRITE</code>.
            </p>
            <div className="bg-black/80 border border-white/10 p-3.5 font-mono text-xs text-slate-300 space-y-1">
              <div>• Protocolo: <span className="text-[#00FF66]">RoCEv2 / InfiniBand Verbs</span></div>
              <div>• Descriptor: <span className="text-[#00F0FF]">32 Bytes Zero-Copy</span></div>
              <div>• Interoperability: <span className="text-white">Native C FFI (.h) / Rust / Go</span></div>
            </div>
          </div>
        </div>

        {/* Benchmark Oficial de Avalancha de 10,000,000 de Flits */}
        <div className="bg-[#141419] border border-[#00F0FF]/40 p-6 sm:p-8 space-y-5 shadow-[0_0_40px_rgba(0,240,255,0.08)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-lg sm:text-2xl font-black text-white uppercase tracking-wide">
              CERTIFICACIÓN BAJO AVALANCHA CONCURRENTE DE 10,000,000 DE FLITS (640 MB)
            </h3>
            <span className="text-xs font-mono text-[#00F0FF] font-bold">
              VERIFICADO EN SILICIO &amp; CO-SIMULACIÓN
            </span>
          </div>

          <pre className="bg-[#050507] border border-white/15 p-4 sm:p-6 font-mono text-xs sm:text-sm text-[#00F0FF] overflow-x-auto leading-relaxed">
{`================================================================================
  AVALANCHA TRIDENTE: 10,000,000 FLITS CONCURRENTES (FPGA + GPU FFT + 8-NODE RDMA)
================================================================================
- Tiempo Total de Avalancha (10M Flits): 593.07 ms
- Latencia Media Co-Simulación Host    : 59.31 ns/flit (Silicio FPGA: 10.00 ns fijo)
- Throughput de Simulación Concurrente : 16.86 Millones de Flits/seg (8.63 Gbps bus 512b)
--------------------------------------------------------------------------------
- [1. FPGA Shield] Fast-Path Forwards  :   7,000,000 (100.0% del tráfico legítimo intacto)
- [1. FPGA Shield] Cut-Through Drops   :   2,999,744 (DDoS Volumétrico + Sigilosos post-adaptación)
- [1. FPGA Shield] GPUDirect Triggers  :         256 (Flits en Zona Gris antes del cierre CSR)
- [2. GPU FFT-16]  Lotes Analizados    :         256 | Ataques Periódicos Cazados: 256
- [2. GPU -> CSR]  Umbral CSR Dinámico : 1.9000 -> 3.5200 (Q16.16: 124518 -> 230686)
- [3. RDMA RoCEv2] Épocas Sincronizadas:   5,342,026 | Nodos Actualizados (8x): 42,736,208
================================================================================`}
          </pre>
        </div>

      </div>
    </section>
  );
}
