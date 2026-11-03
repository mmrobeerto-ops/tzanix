import React from 'react';

export default function ModoSombra() {
  return (
    <section className="p-6 max-w-5xl mx-auto bg-[#0A0E14] border border-[#38BDF8]/20 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-[#38BDF8] mb-4">Modo Sombra</h2>
      <p className="text-slate-300 leading-relaxed">
        El <strong>Modo Sombra</strong> permite visualizar la arquitectura Tridente en acción bajo condiciones de ataque simuladas. En esta sección se muestra una animación de flujo de paquetes y cómo el motor TZANIX Æther‑Core los filtra en nanosegundos, sin afectar la carga del servidor.
      </p>
      {/* Placeholder visual – replace with actual 3D/animation later */}
      <div className="mt-6 h-64 bg-[#06090F] flex items-center justify-center rounded" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #38BDF8 0%, #06090F 70%)" }}>
        <span className="text-[#38BDF8] text-sm uppercase">[Animación de Modo Sombra]</span>
      </div>
    </section>
  );
}
