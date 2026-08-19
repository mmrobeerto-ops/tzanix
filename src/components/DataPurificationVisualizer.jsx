import React from 'react';

export default function DataPurificationVisualizer() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0 flex items-center justify-center bg-[#02040a]">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.2) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative w-full max-w-6xl h-[500px] flex items-center justify-between px-4 sm:px-10 opacity-70">
        
        <div className="flex-1 h-full relative">
          <div className="absolute top-20 left-0 text-[#ff0055] font-mono text-[10px] sm:text-xs tracking-widest hidden sm:block">
            <span className="animate-pulse flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff0055]"></span>
              RAW DATA STREAM
            </span>
            <br/>
            SERVER CPU: <span className="font-bold text-lg text-white">98%</span> (OVERLOAD)<br/>
            GPU COST: <span className="font-bold text-[#ff0055]">HIGH (WASTED)</span>
          </div>
          <div className="absolute inset-0 overflow-hidden flex flex-wrap gap-2 pt-60 pr-10 content-start">
             {[...Array(50)].map((_, i) => (
               <div key={i} className="w-1.5 h-1.5 bg-[#ff0055]/80 rounded-full animate-bounce shadow-[0_0_8px_#ff0055]" style={{
                 animationDuration: ${Math.random() * 0.4 + 0.1}s,
                 animationDelay: ${Math.random()}s,
                 marginLeft: ${Math.random() * 20}px
               }}></div>
             ))}
          </div>
        </div>

        <div className="w-24 h-full flex flex-col items-center justify-center relative z-10 pt-10">
          <div className="h-full w-[2px] bg-gradient-to-b from-transparent via-tzCyan to-transparent shadow-[0_0_20px_#00f0ff,0_0_40px_#00f0ff]"></div>
          <div className="absolute bg-black border border-tzCyan px-4 py-2 text-tzCyan font-mono text-[10px] tracking-[0.3em] rounded-sm rotate-90 whitespace-nowrap shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            NEURAL GATEWAY
          </div>
        </div>

        <div className="flex-1 h-full relative">
          <div className="absolute top-20 right-0 text-tzCyan font-mono text-[10px] sm:text-xs tracking-widest text-right hidden sm:block">
             <span className="flex items-center gap-2 justify-end">
              PURIFIED TENSORS
              <span className="w-2 h-2 rounded-full bg-tzCyan animate-pulse"></span>
            </span>
            <br/>
            SERVER CPU: <span className="font-bold text-lg text-white">12%</span> (OPTIMIZED)<br/>
            GPU COST: <span className="font-bold text-tzCyan">LOW (FINOPS)</span>
          </div>
          <div className="absolute inset-0 overflow-hidden flex flex-col gap-8 pt-60 pl-10">
             <div className="flex gap-6">
               {[...Array(10)].map((_, i) => (
                 <div key={clean1-${i} className="w-5 h-1 bg-tzCyan shadow-[0_0_8px_#00f0ff] opacity-80" style={{ animation: 'pulse 2s infinite' }}></div>
               ))}
             </div>
             <div className="flex gap-6 ml-10">
               {[...Array(10)].map((_, i) => (
                 <div key={clean2-${i} className="w-5 h-1 bg-tzCyan shadow-[0_0_8px_#00f0ff] opacity-50" style={{ animation: 'pulse 2s infinite 0.5s' }}></div>
               ))}
             </div>
             <div className="flex gap-6">
               {[...Array(10)].map((_, i) => (
                 <div key={clean3-${i} className="w-5 h-1 bg-tzCyan shadow-[0_0_8px_#00f0ff] opacity-80" style={{ animation: 'pulse 2s infinite 0.2s' }}></div>
               ))}
             </div>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-0 pointer-events-none opacity-80"></div>
    </div>
  );
}
