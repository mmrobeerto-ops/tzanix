import React, { useState } from 'react';

const WHATSAPP = 'https://wa.me/526647247803?text=Hola%2C%20quiero%20probar%20TZANIX%20en%20mi%20servidor.';
const EMAIL = 'mailto:mmrobeerto@gmail.com?subject=Quiero%20probar%20TZANIX%20(14%20d%C3%ADas)';

const NAV = [
  { href: '#que-hace', label: 'Qué hace' },
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#instalar', label: 'Instalar' },
  { href: '#contacto', label: 'Contacto' },
];

function Icon({ name, className = 'w-7 h-7' }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (name === 'shield')
    return (<svg viewBox="0 0 24 24" className={className} {...common}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>);
  if (name === 'users')
    return (<svg viewBox="0 0 24 24" className={className} {...common}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>);
  if (name === 'lock')
    return (<svg viewBox="0 0 24 24" className={className} {...common}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>);
  if (name === 'bolt')
    return (<svg viewBox="0 0 24 24" className={className} {...common}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></svg>);
  return null;
}

export default function App() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="min-h-screen bg-white text-ink">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <a href="#inicio" className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-brand-500 text-white"><Icon name="shield" className="w-5 h-5" /></span>
            <span className="text-xl font-extrabold tracking-[0.18em] uppercase">TZANIX</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-brand-600 transition-colors">{n.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href={EMAIL} className="hidden sm:inline-flex btn-primary !px-5 !py-2.5 !text-sm">Probar gratis</a>
            <button className="md:hidden p-2 text-ink" onClick={() => setOpen(!open)} aria-label="Menú">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><path d={open ? 'M6 6l12 12M6 18L18 6' : 'M4 7h16M4 12h16M4 17h16'} strokeLinecap="round" /></svg>
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-slate-200 bg-white px-5 py-4 flex flex-col gap-4 text-sm font-semibold text-slate-700">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={close} className="hover:text-brand-600">{n.label}</a>
            ))}
            <a href={EMAIL} onClick={close} className="btn-primary">Probar gratis 14 días</a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="inicio" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 to-white" />
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" /> PROTECCIÓN DDoS PARA TU SERVIDOR
          </span>
          <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05]">
            Frena los ataques a tu servidor.<br className="hidden sm:inline" />{' '}
            <span className="text-brand-600">Sin molestar a tus clientes.</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
            TZANIX vigila tu tráfico y bloquea en el acto a quien ataca, dejando pasar siempre a tus usuarios reales.
            Se instala en <strong className="text-ink">5 minutos</strong> en cualquier servidor Linux.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href={EMAIL} className="btn-primary">Probar gratis 14 días →</a>
            <a href="#como-funciona" className="btn-ghost">Ver cómo funciona</a>
          </div>
          <p className="mt-6 text-sm text-slate-500">Para servidores VPS, hosting, SaaS, tiendas online y APIs.</p>
        </div>
      </section>

      {/* CON MANZANAS: la analogía */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-16">
        <div className="rounded-3xl bg-brand-900 text-white p-8 sm:p-12">
          <p className="eyebrow !text-brand-200">En palabras sencillas</p>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold leading-snug">Imagina la puerta de un estadio</h2>
          <p className="mt-4 text-brand-100 text-lg leading-relaxed">
            Los firewalls normales revisan a cada persona una por una. Cuando llegan miles de golpe —un ataque—
            la fila colapsa y <strong className="text-white">ya no entra nadie, ni tus clientes de verdad.</strong>
          </p>
          <p className="mt-4 text-brand-100 text-lg leading-relaxed">
            TZANIX no revisa uno por uno: mira la <strong className="text-white">forma de la multitud</strong>. Una avalancha de atacantes
            se ve distinta a un público normal, así que TZANIX <strong className="text-white">frena solo a los que empujan</strong> —en una fracción de segundo—
            sin cerrarle la puerta a quien viene a comprar.
          </p>
        </div>
      </section>

      {/* QUÉ HACE: 3 beneficios */}
      <section id="que-hace" className="max-w-6xl mx-auto px-5 sm:px-8 py-16 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">Qué hace por ti</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">Tres cosas, muy claras</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { icon: 'bolt', t: 'Detecta ataques al instante', d: 'Reconoce ataques DDoS y botnets por la “forma” del tráfico, en una fracción de segundo.' },
            { icon: 'users', t: 'No bloquea a tus clientes', d: 'Frena solo al atacante. Tus usuarios reales siguen entrando como si nada.' },
            { icon: 'lock', t: 'No guarda datos privados', d: 'Solo mira estadísticas del tráfico. Nunca tus contraseñas ni el contenido de tus usuarios.' },
          ].map((c) => (
            <div key={c.t} className="card">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-50 text-brand-600"><Icon name={c.icon} /></span>
              <h3 className="mt-5 text-lg font-bold">{c.t}</h3>
              <p className="mt-2 text-slate-600 leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CÓMO FUNCIONA: 3 pasos */}
      <section id="como-funciona" className="bg-slate-50 border-y border-slate-200 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <p className="eyebrow">Cómo trabaja</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">Mira, decide y actúa</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { n: '1', t: 'Mira', d: 'Observa el tráfico que llega a tu servidor, sin guardar nada privado.' },
              { n: '2', t: 'Decide', d: 'Calcula si la “forma” del tráfico es normal o parece un ataque.' },
              { n: '3', t: 'Actúa', d: 'Si es un ataque, bloquea solo a ese origen y deja pasar al resto.' },
            ].map((s) => (
              <div key={s.n} className="relative card">
                <span className="absolute -top-4 left-7 inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-500 text-white font-bold">{s.n}</span>
                <h3 className="mt-3 text-lg font-bold">{s.t}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTALAR */}
      <section id="instalar" className="max-w-6xl mx-auto px-5 sm:px-8 py-16 scroll-mt-20">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <p className="eyebrow">Instalar</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">Listo en 5 minutos</h2>
            <p className="mt-4 text-slate-600 text-lg leading-relaxed">
              Funciona en cualquier VPS Linux (CentOS, AlmaLinux, Ubuntu), con o sin Docker. Pides tu licencia de prueba,
              ejecutas un comando y TZANIX empieza a proteger tu servidor.
            </p>
            <ul className="mt-6 space-y-3">
              {['Prueba gratis de 14 días, sin tarjeta.', 'Un solo comando de instalación.', 'No frena a tus usuarios reales.'].map((li) => (
                <li key={li} className="flex items-start gap-3 text-slate-700">
                  <span className="mt-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-100 text-brand-600 shrink-0">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>
                  </span>
                  <span>{li}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href={EMAIL} className="btn-primary">Pedir mi prueba de 14 días →</a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-ghost">Preguntar por WhatsApp</a>
            </div>
          </div>
          <div className="rounded-2xl bg-ink text-slate-100 p-6 font-mono text-sm shadow-soft">
            <div className="flex items-center gap-2 pb-4 border-b border-white/10">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-2 text-slate-400 text-xs">tu-servidor: ~</span>
            </div>
            <pre className="mt-4 leading-relaxed whitespace-pre-wrap">
<span className="text-slate-500"># 1. Instala TZANIX</span>{'\n'}
<span className="text-brand-400">sudo</span> ./install-tzanix-linux.sh{'\n\n'}
<span className="text-slate-500"># 2. Mira en vivo quién te ataca</span>{'\n'}
tzanix-status{'\n\n'}
<span className="text-green-400">✓ TZANIX protegiendo tu servidor</span>
            </pre>
          </div>
        </div>
      </section>

      {/* PRUEBA HONESTA */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14 text-center">
          <p className="eyebrow">Transparencia</p>
          <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">Lo que hemos medido (y lo que no)</h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Preferimos cifras honestas a promesas. Esto es lo que dan nuestras pruebas <strong>en laboratorio</strong> hoy:
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { v: '16.86 M', l: 'paquetes/seg (software, 1 núcleo)' },
              { v: '~59 ns', l: 'por paquete (software)' },
              { v: '0.9687', l: 'ROC AUC (datos de laboratorio)' },
              { v: 'En curso', l: 'validación con tráfico real' },
            ].map((m) => (
              <div key={m.l} className="rounded-xl bg-white border border-slate-200 p-5">
                <div className="text-2xl font-extrabold text-brand-600">{m.v}</div>
                <div className="mt-1 text-xs text-slate-500 leading-snug">{m.l}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">
            La latencia en hardware FPGA (10 ns) es una <strong>proyección</strong>, aún sin medir en silicio físico.{' '}
            <a href="https://github.com/mmrobeerto-ops/eather-core" target="_blank" rel="noopener noreferrer" className="text-brand-600 font-semibold hover:underline">Código y pruebas en GitHub →</a>
          </p>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="max-w-4xl mx-auto px-5 sm:px-8 py-20 text-center scroll-mt-20">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">¿Protegemos tu servidor?</h2>
        <p className="mt-4 text-slate-600 text-lg max-w-xl mx-auto">
          Escríbenos y te ayudamos a montar tu prueba de 14 días en menos de 5 minutos.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a href={EMAIL} className="btn-primary">Escribir por correo →</a>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-ghost">WhatsApp directo</a>
        </div>
        <p className="mt-6 text-sm text-slate-500 font-mono">mmrobeerto@gmail.com · +52 664 724 7803</p>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2 font-extrabold tracking-[0.18em] uppercase text-ink">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-brand-500 text-white"><Icon name="shield" className="w-4 h-4" /></span>
            TZANIX
          </div>
          <p>© {new Date().getFullYear()} TZANIX · Protección DDoS para servidores · Sin almacenar datos privados</p>
        </div>
      </footer>
    </div>
  );
}
