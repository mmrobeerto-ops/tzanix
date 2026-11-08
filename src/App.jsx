import React, { useState } from 'react';

const WHATSAPP = 'https://wa.me/526371377861?text=Hola%2C%20quiero%20mi%20reporte%20de%20amenazas%20gratis.';
const EMAIL = 'mailto:mmrobeerto@gmail.com?subject=Quiero%20instalar%20TZANIX%20(gratis)';
const WHATSAPP_CHEQUEO = 'https://wa.me/526371377861?text=Hola%2C%20quiero%20mi%20chequeo%20de%20seguridad%20gratis.';
const GITHUB = 'https://github.com/mmrobeerto-ops/aether-core';

const NAV = [
  { href: '#que-hace', label: 'Qué hace' },
  { href: '#chequeo', label: 'Chequeo gratis' },
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

function ChequeoForm() {
  const [url, setUrl] = useState('');
  const [estado, setEstado] = useState('idle'); // idle | cargando | listo | error
  const [res, setRes] = useState(null);
  const [err, setErr] = useState('');

  async function revisar(e) {
    e.preventDefault();
    const u = url.trim();
    if (!u) return;
    setEstado('cargando'); setErr(''); setRes(null);
    try {
      const r = await fetch('/api/chequeo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: u }),
      });
      const data = await r.json();
      if (!r.ok || data.error) {
        setErr(data.error || 'No se pudo revisar el sitio.');
        setEstado('error');
        return;
      }
      setRes(data);
      setEstado('listo');
    } catch {
      setErr('Hubo un problema de conexión. Intenta de nuevo.');
      setEstado('error');
    }
  }

  const colores = {
    critico: 'bg-red-50 border-red-200 text-red-800',
    menor: 'bg-amber-50 border-amber-200 text-amber-800',
    bien: 'bg-green-50 border-green-200 text-green-800',
  };
  const emoji = { critico: '🔴', menor: '🟡', bien: '✅' };

  return (
    <div className="mt-10 max-w-2xl mx-auto">
      <form onSubmit={revisar} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          inputMode="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="tu-sitio.com"
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-ink placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400"
        />
        <button type="submit" disabled={estado === 'cargando'} className="btn-primary whitespace-nowrap disabled:opacity-60">
          {estado === 'cargando' ? 'Revisando…' : 'Revisar mi sitio →'}
        </button>
      </form>
      <p className="mt-3 text-center text-xs text-slate-500">
        Revisamos solo lo público, desde afuera. No tocamos ni entramos a nada. No pedimos contraseñas aquí.
      </p>

      {estado === 'error' && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800 text-sm">{err}</div>
      )}

      {estado === 'listo' && res && (
        <div className="mt-6 text-left">
          <div className={`rounded-xl border p-4 font-semibold ${colores[res.nivel]}`}>
            {emoji[res.nivel]} {res.veredicto}
          </div>
          <p className="mt-2 text-xs text-slate-500 break-all">Revisado: {res.url}</p>

          {res.criticos?.length > 0 && (
            <div className="mt-4">
              <p className="font-bold text-red-700 text-sm">🔴 Crítico (ciérralo ya):</p>
              <ul className="mt-2 space-y-1">
                {res.criticos.map((c, i) => (
                  <li key={i} className="text-sm text-slate-700 flex gap-2"><span>•</span><span>{c}</span></li>
                ))}
              </ul>
            </div>
          )}

          {res.menores?.length > 0 && (
            <div className="mt-4">
              <p className="font-bold text-amber-700 text-sm">🟡 Menor (higiene, sin prisa):</p>
              <ul className="mt-2 space-y-1">
                {res.menores.map((c, i) => (
                  <li key={i} className="text-sm text-slate-600 flex gap-2"><span>•</span><span>{c}</span></li>
                ))}
              </ul>
            </div>
          )}

          {res.ok?.length > 0 && (
            <div className="mt-4">
              <p className="font-bold text-green-700 text-sm">✅ Lo que está bien:</p>
              <ul className="mt-2 space-y-1">
                {res.ok.map((c, i) => (
                  <li key={i} className="text-sm text-slate-600 flex gap-2"><span>•</span><span>{c}</span></li>
                ))}
              </ul>
            </div>
          )}

          {res.avisos?.length > 0 && (
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
              {res.avisos.map((a, i) => (
                <p key={i} className="text-xs text-slate-500 flex gap-2"><span>ℹ️</span><span>{a}</span></p>
              ))}
            </div>
          )}

          <div className="mt-5 rounded-xl bg-brand-900 text-white p-4 text-center">
            <p className="text-sm">¿Quieres que te ayudemos a cerrar esto?</p>
            <a href={WHATSAPP_CHEQUEO} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex btn-primary !bg-white !text-brand-700">Escríbenos por WhatsApp →</a>
          </div>
          <p className="mt-3 text-center text-xs text-slate-400">{res.nota}</p>
        </div>
      )}
    </div>
  );
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
            <img src="/logo-icon-blue.png" alt="TZANIX" width="36" height="36" className="w-9 h-9" />
            <img src="/wordmark-dark.png" alt="TZANIX" className="wm-light h-5 w-auto" />
            <img src="/wordmark-white.png" alt="TZANIX" className="wm-dark h-5 w-auto" />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-brand-600 transition-colors">{n.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" title="Código abierto en GitHub (AGPL-3.0)" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-brand-600 transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" /></svg>
              GitHub
            </a>
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
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" onClick={close} className="hover:text-brand-600">Código en GitHub ↗</a>
            <a href={EMAIL} onClick={close} className="btn-primary">Empezar gratis</a>
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
            <strong className="text-ink"> Gratis y de código abierto.</strong>
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href={EMAIL} className="btn-primary">Empezar gratis →</a>
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

      {/* CHEQUEO DE SEGURIDAD GRATIS */}
      <section id="chequeo" className="max-w-6xl mx-auto px-5 sm:px-8 py-16 scroll-mt-20">
        <div className="rounded-3xl border border-brand-200 bg-brand-50 p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-brand-700 text-xs font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" /> NUEVO · 100% GRATIS
            </span>
            <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight">Chequeo de seguridad gratis</h2>
            <p className="mt-4 text-slate-600 text-lg leading-relaxed">
              Pon la dirección de tu sitio y te decimos <strong className="text-ink">cómo estás hoy</strong>, al instante:
              HTTPS, software viejo, protecciones que faltan y archivos sensibles expuestos. Sin costo y sin tocar nada de tu servidor.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { t: '¿Tus contraseñas están filtradas?', d: 'Revisamos si aparecen en filtraciones reales (base de ~1,000 millones de contraseñas robadas). Nunca vemos tu contraseña completa.' },
              { t: '¿Tu sitio está al día?', d: 'Vemos desde afuera si usas software viejo (WordPress y otros) con fallas conocidas, o si revelas datos que ayudan al atacante.' },
              { t: '¿Dejas archivos expuestos?', d: 'Buscamos archivos sensibles abiertos al público (respaldos, llaves, configuración) — la causa #1 de fugas de datos.' },
            ].map((c) => (
              <div key={c.t} className="card !bg-white">
                <h3 className="text-lg font-bold">{c.t}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
          <ChequeoForm />
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Te decimos claro qué es <strong>crítico</strong> y qué es <strong>menor</strong>. No inventamos miedo para venderte.
            </p>
            <a href={WHATSAPP_CHEQUEO} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex text-brand-700 font-semibold hover:underline">¿Prefieres que lo revisemos a fondo? Escríbenos por WhatsApp →</a>
          </div>
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
              Funciona en cualquier VPS Linux (CentOS, AlmaLinux, Ubuntu), con o sin Docker. Nos escribes,
              ejecutas un comando y TZANIX empieza a proteger tu servidor.
            </p>
            <ul className="mt-6 space-y-3">
              {['Gratis y de código abierto (licencia AGPL-3.0).', 'Un solo comando de instalación.', 'No frena a tus usuarios reales.'].map((li) => (
                <li key={li} className="flex items-start gap-3 text-slate-700">
                  <span className="mt-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-100 text-brand-600 shrink-0">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>
                  </span>
                  <span>{li}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href={EMAIL} className="btn-primary">Empezar gratis →</a>
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
              { v: '0.89', l: 'ROC AUC (tráfico real etiquetado)' },
              { v: '2 bots', l: 'escáneres cazados en tráfico real (Tokio)' },
            ].map((m) => (
              <div key={m.l} className="rounded-xl bg-white border border-slate-200 p-5">
                <div className="text-2xl font-extrabold text-brand-600">{m.v}</div>
                <div className="mt-1 text-xs text-slate-500 leading-snug">{m.l}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 max-w-3xl mx-auto rounded-2xl bg-white border border-slate-200 p-6 text-left">
            <p className="eyebrow">Prueba con tráfico real · servidor en Tokio</p>
            <p className="mt-3 text-slate-700 leading-relaxed">
              Analizamos <strong>73.814 peticiones reales</strong> de un servidor en producción. TZANIX detectó
              <strong> 2 escáneres</strong> que buscaban archivos sensibles para robar datos (<code className="text-brand-600">.env</code>, <code className="text-brand-600">.bak</code>, <code className="text-brand-600">.conf</code>)
              y que <strong>falsificaban su identidad</strong> —se hacían pasar por Googlebot, Chrome o <code className="text-brand-600">curl</code> en cada petición para evadir filtros—.
              Concentraban <strong>más del 40% del tráfico</strong>, y <strong>más del 90% de los descartes cayó sobre ellos</strong>,
              enviando <strong>menos del 5% del resto</strong> a inspección.
            </p>
            <p className="mt-3 text-slate-700 leading-relaxed">
              Lo clave: los cazó por su <strong>comportamiento</strong> (el martilleo concentrado), <strong>no por su disfraz</strong>.
              Un filtro que confía en el user-agent se los habría tragado como “Googlebot”.
            </p>
            <p className="mt-3 text-slate-600 leading-relaxed text-sm">
              Siendo honestos: afinamos la calibración tras esta prueba (bajamos los falsos positivos del 31% al 4% con datos reales).
              Seguimos validándolo en más entornos, por eso lo recomendamos primero en <strong>modo observación</strong> antes de activar el bloqueo automático.
            </p>
            <p className="mt-3 text-slate-600 leading-relaxed text-sm">
              Y en un <strong>benchmark reproducible</strong> con tráfico real etiquetado (tráfico legítimo real + un SYN flood de CIC-DDoS2019),
              alcanzó <strong>ROC AUC 0.89</strong> — en su mejor punto, <strong>83% de ataques detectados con 6% de falsos positivos</strong> (precisión 87%).
            </p>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            La latencia en FPGA es de <strong>10 ns</strong> (pipeline de 4 ciclos a 400 MHz), <strong>verificada en simulación RTL</strong>.{' '}
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="text-brand-600 font-semibold hover:underline">Código y pruebas en GitHub →</a>
          </p>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="max-w-4xl mx-auto px-5 sm:px-8 py-20 text-center scroll-mt-20">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">¿Protegemos tu servidor?</h2>
        <p className="mt-4 text-slate-600 text-lg max-w-xl mx-auto">
          Escríbenos y te ayudamos a montar tu instalación gratis en menos de 5 minutos.
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
            <img src="/logo-icon-blue.png" alt="TZANIX" className="w-7 h-7" />
            <img src="/wordmark-dark.png" alt="TZANIX" className="wm-light h-4 w-auto" />
            <img src="/wordmark-white.png" alt="TZANIX" className="wm-dark h-4 w-auto" />
          </div>
          <div className="flex flex-col sm:items-end gap-1.5">
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-slate-600 hover:text-brand-600 transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" /></svg>
              Código abierto · AGPL-3.0
            </a>
            <p>© {new Date().getFullYear()} TZANIX · Protección DDoS para servidores · Sin almacenar datos privados</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
