// =============================================================================
//  api/chequeo.js — Chequeo de seguridad TZANIX (en vivo, desde la página)
//
//  Recibe una URL y la revisa DESDE AFUERA (recon pasivo, sin tocar nada):
//    1. HTTPS activo
//    2. Si el servidor revela su versión
//    3. Protecciones (security headers) que faltan  -> gravedad MENOR
//    4. WordPress desactualizado                     -> gravedad CRÍTICA
//    5. Archivos sensibles expuestos (.env, backups) -> gravedad CRÍTICA
//
//  Honestidad: separa CRÍTICO (hueco real) de MENOR (higiene). No exagera.
//  NO revisa contraseñas aquí a propósito: nadie debe escribir su contraseña
//  en un formulario web público. Eso queda como servicio personal (WhatsApp).
// =============================================================================

const UA = { 'User-Agent': 'tzanix-chequeo/1.0 (+https://tzanix.com)' };

// Protecciones (headers). Faltar una = hardening pendiente (MENOR).
const PROTECCIONES = {
  'strict-transport-security': 'HSTS (forzar HTTPS)',
  'content-security-policy': 'CSP (bloquea inyección de código)',
  'x-frame-options': 'Anti-clickjacking',
  'x-content-type-options': 'Anti-sniffing de tipo',
  'referrer-policy': 'Control de referrer',
};

// Archivos sensibles que NUNCA deberían estar abiertos al público (CRÍTICO).
const SENSIBLES = [
  '/.env', '/.git/config', '/wp-config.php.bak', '/wp-config.php~',
  '/backup.zip', '/backup.sql', '/.env.bak',
];

// Rechaza destinos internos/privados (seguridad: evita SSRF).
function esHostPrivado(host) {
  const h = host.toLowerCase();
  if (h === 'localhost' || h.endsWith('.localhost') || h.endsWith('.internal') || h.endsWith('.local')) return true;
  // IPv4 privada / loopback / link-local / metadata
  const m = h.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (m) {
    const [a, b] = [parseInt(m[1], 10), parseInt(m[2], 10)];
    if (a === 127 || a === 10 || a === 0) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 169 && b === 254) return true; // link-local + metadata cloud
  }
  if (h === '::1' || h.startsWith('[')) return true;
  return false;
}

async function fetchT(url, { method = 'GET', ms = 6000 } = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { method, headers: UA, redirect: 'follow', signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

function vcmp(a, b) {
  const pa = a.split('.').map((x) => parseInt(x, 10));
  const pb = b.split('.').map((x) => parseInt(x, 10));
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] || 0) - (pb[i] || 0);
    if (d !== 0) return d < 0 ? -1 : 1;
  }
  return 0;
}

async function ultimaWP() {
  try {
    const r = await fetchT('https://api.wordpress.org/core/version-check/1.7/', { ms: 5000 });
    const j = await r.json();
    return j?.offers?.[0]?.version || null;
  } catch { return null; }
}

async function detectaWP(base, body) {
  let m = body.match(/name=["']generator["']\s+content=["']WordPress\s+([0-9.]+)/i);
  if (m) return m[1];
  try {
    const r = await fetchT(base.replace(/\/$/, '') + '/feed/', { ms: 5000 });
    const feed = await r.text();
    m = feed.match(/wordpress\.org\/\?v=([0-9.]+)/i);
    if (m) return m[1];
  } catch { /* ignore */ }
  try {
    const r = await fetchT(base.replace(/\/$/, '') + '/wp-json/', { ms: 5000 });
    const ct = (r.headers.get('content-type') || '').toLowerCase();
    if (r.status === 200 && ct.includes('json')) return 'desconocida';
  } catch { /* ignore */ }
  return null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  let raw = (req.body && req.body.url ? String(req.body.url) : '').trim();
  if (!raw) return res.status(400).json({ error: 'Falta la URL.' });
  if (!/^https?:\/\//i.test(raw)) raw = 'https://' + raw;

  let target;
  try {
    target = new URL(raw);
  } catch {
    return res.status(400).json({ error: 'Esa dirección no se ve válida.' });
  }
  if (!/^https?:$/.test(target.protocol) || esHostPrivado(target.hostname)) {
    return res.status(400).json({ error: 'Solo sitios públicos (http/https).' });
  }

  const criticos = [];
  const menores = [];
  const ok = [];
  const avisos = [];

  // 1 + 2 + 3: página principal, HTTPS, servidor, headers
  let finalUrl = target.toString();
  let headers = {};
  let body = '';
  try {
    const r = await fetchT(target.toString(), { ms: 7000 });
    finalUrl = r.url || finalUrl;
    r.headers.forEach((v, k) => { headers[k.toLowerCase()] = v; });
    try { body = (await r.text()).slice(0, 120000); } catch { body = ''; }
  } catch {
    return res.status(200).json({
      url: target.toString(),
      error: 'No pudimos conectar a ese sitio (¿existe? ¿está caído?).',
    });
  }

  const esHttps = finalUrl.startsWith('https');
  if (esHttps) ok.push('HTTPS activo (los datos viajan cifrados)');
  else criticos.push('Sin HTTPS: los datos viajan sin cifrar');

  const srv = headers['server'] || '';
  if (srv && /\d/.test(srv)) menores.push(`El servidor revela su versión (${srv})`);

  for (const [h, d] of Object.entries(PROTECCIONES)) {
    if (headers[h]) ok.push(d);
    else menores.push(`Falta: ${d}`);
  }

  // 4: WordPress desactualizado (CRÍTICO)
  let wpInfo = null;
  try {
    const wp = await detectaWP(finalUrl, body);
    if (wp && wp !== 'desconocida') {
      const ult = await ultimaWP();
      if (ult && vcmp(wp, ult) < 0) {
        criticos.push(`WordPress ${wp} desactualizado (la última es ${ult}): hay exploits listos`);
        wpInfo = { version: wp, ultima: ult, aldia: false };
      } else {
        ok.push(`WordPress ${wp} al día`);
        wpInfo = { version: wp, ultima: ult, aldia: true };
      }
    } else if (wp === 'desconocida') {
      wpInfo = { version: 'oculta', aldia: null };
    }
  } catch { /* ignore */ }

  // 5: archivos sensibles expuestos (CRÍTICO) — con anti-falsos-positivos
  try {
    const base = finalUrl.replace(/\/$/, '');
    // Baseline: ¿el sitio responde 200 a una ruta que NO existe? (catch-all)
    let catchAll = false;
    try {
      const rnd = base + '/tzanix-noexiste-' + Math.random().toString(36).slice(2, 12) + '.txt';
      const br = await fetchT(rnd, { ms: 5000 });
      catchAll = br.status === 200;
    } catch { /* ignore */ }

    if (catchAll) {
      // Responde 200 a todo: NO afirmamos nada (evita falsos positivos).
      avisos.push('Este sitio responde "200 OK" a cualquier dirección, así que no podemos confirmar de forma fiable si hay archivos sensibles expuestos. Conviene revisarlo a mano.');
    } else {
      const probes = await Promise.all(SENSIBLES.map(async (p) => {
        try {
          const r = await fetchT(base + p, { ms: 5000 });
          const ct = (r.headers.get('content-type') || '').toLowerCase();
          return { p, status: r.status, ct };
        } catch { return { p, status: 0, ct: '' }; }
      }));
      for (const { p, status, ct } of probes) {
        // Solo "expuesto" si da 200 y NO es una página HTML (un .env/.sql real no es HTML).
        if (status === 200 && !ct.includes('text/html')) {
          criticos.push(`Archivo sensible EXPUESTO: ${p}`);
        }
      }
    }
  } catch { /* ignore */ }

  // Veredicto por GRAVEDAD, no por conteo (honestidad)
  let nivel, veredicto;
  if (criticos.length > 0) {
    nivel = 'critico';
    veredicto = `En riesgo: ${criticos.length} cosa(s) crítica(s) que cerrar ya.`;
  } else if (menores.length > 0) {
    nivel = 'menor';
    veredicto = `Mejorable: solo higiene menor (${menores.length}), nada grave.`;
  } else {
    nivel = 'bien';
    veredicto = 'Excelente: todo en orden en lo que revisamos.';
  }

  return res.status(200).json({
    url: finalUrl,
    nivel,
    veredicto,
    criticos,
    menores,
    ok,
    avisos,
    wp: wpInfo,
    nota: 'Chequeo pasivo desde afuera. No sustituye una auditoría completa.',
  });
}
