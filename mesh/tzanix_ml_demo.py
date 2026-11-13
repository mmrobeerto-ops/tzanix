#!/usr/bin/env python3
# =============================================================================
#  tzanix_ml_demo — EL CEREBRO: detección de anomalías con Isolation Forest
#
#  Isolation Forest DE CERO (sin numpy ni scikit-learn), corre en cualquier
#  servidor. No necesita etiquetas: aprende lo "normal" y aísla lo raro.
#
#  5 señales de COMPORTAMIENTO (no volumen):
#    1. user-agents que rota     2. % errores (404/403)   3. % rutas sensibles
#    4. ritmo (peticiones/min)   5. REGULARIDAD (qué tan metronómico es)
#  La #5 es clave contra los SIGILOSOS: un robot lento pero metronómico se
#  delata; un humano nunca es tan regular.
#
#  Uso:
#    python3 tzanix_ml_demo.py                 (genera un log de ejemplo)
#    python3 tzanix_ml_demo.py  /var/log/nginx/access.log   (tu log real)
# =============================================================================
import sys, re, math, random

random.seed(7)

# --------------------------------------------------------------------------
#  1) ISOLATION FOREST (de cero)
# --------------------------------------------------------------------------
def c_factor(n):
    if n <= 1: return 0.0
    return 2.0 * (math.log(n - 1) + 0.5772156649) - 2.0 * (n - 1) / n

class ITree:
    __slots__ = ("leaf", "size", "q", "p", "l", "r")
    def __init__(self, X, depth, max_depth):
        self.size = len(X); self.leaf = True
        if depth >= max_depth or len(X) <= 1:
            return
        feats = list(range(len(X[0]))); random.shuffle(feats)
        for q in feats:
            vals = [row[q] for row in X]
            mn, mx = min(vals), max(vals)
            if mn < mx:
                p = random.uniform(mn, mx)
                self.leaf = False; self.q = q; self.p = p
                self.l = ITree([r for r in X if r[q] <  p], depth+1, max_depth)
                self.r = ITree([r for r in X if r[q] >= p], depth+1, max_depth)
                return

    def path(self, x, depth):
        if self.leaf:
            return depth + c_factor(self.size)
        branch = self.l if x[self.q] < self.p else self.r
        return branch.path(x, depth + 1)

def train_forest(X, n_trees=140, sample=256):
    sub = min(sample, len(X))
    max_depth = math.ceil(math.log2(max(sub, 2)))
    return [ITree(random.sample(X, sub), 0, max_depth) for _ in range(n_trees)], c_factor(sub)

def anomaly_score(trees, c, x):
    h = sum(t.path(x, 0) for t in trees) / len(trees)
    return 2.0 ** (-h / c)

# --------------------------------------------------------------------------
#  2) LOG DE EJEMPLO (con marcas de tiempo realistas por IP)
# --------------------------------------------------------------------------
NORMALES = ["/", "/index.html", "/productos", "/nosotros", "/contacto",
            "/css/app.css", "/js/app.js", "/img/logo.png", "/favicon.ico",
            "/producto/123", "/blog", "/carrito"]
SENSIBLES = ["/.env", "/.git/config", "/wp-login.php", "/wp-admin/", "/admin",
             "/backup.zip", "/.env.bak", "/config.php", "/phpinfo.php",
             "/.aws/credentials", "/shell.php", "/vendor/.env"]
UA_BROWSER = "Mozilla/5.0 (Windows NT 10.0) Chrome/120 Safari/537.36"
UA_FAKES = ["Googlebot/2.1", "curl/7.68.0", "python-requests/2.25.1",
            "Mozilla/5.0 (X11; Linux) Chrome/118"]

def _ts(seg):
    seg %= 86400
    return f"13/Nov/2026:{seg//3600:02d}:{seg%3600//60:02d}:{seg%60:02d} +0000"

def _emit(L, ip, n, paths, status_pool, ua_fn, cadence, t0=None):
    t = t0 if t0 is not None else random.randint(0, 70000)
    for _ in range(n):
        L.append(f'{ip} - - [{_ts(int(t))}] "GET {random.choice(paths)} '
                 f'HTTP/1.1" {random.choice(status_pool)} 512 "-" "{ua_fn()}"')
        t += max(1, cadence())

def generar_log(path):
    L = []
    irregular = lambda: random.uniform(1,15) if random.random()<0.7 else random.uniform(60,600)
    for i in range(35):   # usuarios normales (ritmo irregular, humano)
        ip = f"187.188.{i}.{random.randint(2,250)}"
        _emit(L, ip, random.randint(6,30), NORMALES, [200]*9+[304,404],
              lambda: UA_BROWSER, irregular)
    _emit(L, "66.249.66.1", 70, NORMALES, [200]*9+[304],  # Googlebot legítimo
          lambda: "Googlebot/2.1", lambda: random.uniform(2,8))
    for ip in ["45.148.10.238","193.47.62.109"]:  # escáneres rápidos+regulares
        _emit(L, ip, random.randint(90,160),
              SENSIBLES*4+NORMALES, [404,404,403,404,200],
              lambda: random.choice(UA_FAKES), lambda: random.uniform(0.3,2))
    base = random.uniform(40,120)  # SIGILOSO: lento pero metronómico
    _emit(L, "139.162.119.12", random.randint(12,28),
          NORMALES*5+SENSIBLES, [200,200,404,403],
          lambda: UA_BROWSER, lambda: base+random.uniform(-base*0.08, base*0.08))
    random.shuffle(L)
    open(path,"w").write("\n".join(L)+"\n")
    return len(L)

# --------------------------------------------------------------------------
#  3) PARSEAR LOG -> features por IP (incluye TIEMPO)
# --------------------------------------------------------------------------
PAT = re.compile(r'^(\S+).*?\[[^:]+:(\d{2}):(\d{2}):(\d{2})[^\]]*\].*?'
                 r'"[A-Z]+ (\S+) HTTP[^"]*"\s+(\d{3}).*"([^"]*)"\s*$')
SENS = re.compile(r'\.env|\.git|wp-login|wp-admin|/admin|backup|\.bak|phpinfo|'
                  r'credentials|shell|config\.php|/vendor', re.I)

def _stats_tiempo(times):
    if len(times) < 3:
        return float(len(times)), 35.0      # ritmo bajo, regularidad neutra
    times = sorted(times)
    span = times[-1] - times[0]
    gaps = [b-a for a,b in zip(times, times[1:])]
    m = sum(gaps)/len(gaps)
    var = sum((g-m)**2 for g in gaps)/len(gaps)
    cv = (var**0.5)/m if m > 0 else 0.0
    regular = 100.0/(1.0+cv)                 # 0..100, alto = metronómico (robot)
    rate = len(times)/max(span/60.0, 1/60.0) # peticiones por minuto
    return min(rate, 5000.0), regular

def extraer_features(path):
    data = {}
    for ln in open(path, errors="ignore"):
        m = PAT.search(ln)
        if not m: continue
        ip = m.group(1); seg = int(m.group(2))*3600+int(m.group(3))*60+int(m.group(4))
        ruta = m.group(5); status = int(m.group(6)); ua = m.group(7)
        d = data.setdefault(ip, {"n":0,"paths":set(),"uas":set(),"err":0,"sens":0,"t":[]})
        d["n"] += 1; d["paths"].add(ruta); d["uas"].add(ua); d["t"].append(seg)
        if status >= 400: d["err"] += 1
        if SENS.search(ruta): d["sens"] += 1
    ips, X, info = [], [], []
    for ip, d in data.items():
        if d["n"] < 6: continue
        rate, regular = _stats_tiempo(d["t"])
        f = [len(d["uas"]), 100*d["err"]/(d["n"]+8), 100*d["sens"]/(d["n"]+8), rate, regular]
        ips.append(ip); X.append(f); info.append(d)
    return ips, X, info

FNAMES = ["user-agents que rota", "% errores (404/403)", "% rutas sensibles",
          "ritmo (pet/min)", "regularidad (robot)"]

def mediana(col):
    s = sorted(col); n = len(s); return s[n//2] if n%2 else (s[n//2-1]+s[n//2])/2

def explicar(x, med, mad):
    zs = sorted(((abs(v-me)/ma if ma>1e-9 else (0 if v==me else 9), i, v)
                 for i,(v,me,ma) in enumerate(zip(x,med,mad))), reverse=True)
    partes = []
    for z,i,v in zs[:3]:
        if z < 2: break
        val = f"{v:.0f}%" if "%" in FNAMES[i] or "regular" in FNAMES[i] else f"{v:.0f}"
        partes.append(f"{FNAMES[i]}: {val}")
    return " · ".join(partes) or "patrón inusual"

# --------------------------------------------------------------------------
#  4) CORRER
# --------------------------------------------------------------------------
def main():
    path = sys.argv[1] if len(sys.argv) > 1 else "/tmp/tzanix-sample-access.log"
    if len(sys.argv) <= 1:
        print(f"(Generé un log de ejemplo con {generar_log(path)} peticiones en {path})\n")

    ips, X, info = extraer_features(path)
    if len(X) < 5:
        print("Muy pocos datos para entrenar."); return
    trees, c = train_forest(X)
    med = [mediana([r[i] for r in X]) for i in range(len(X[0]))]
    mad = [mediana([abs(r[i]-med[i]) for r in X]) or 1 for i in range(len(X[0]))]
    filas = sorted(((anomaly_score(trees,c,x), ip, x) for ip,x in zip(ips,X)), reverse=True)

    BLOQUEAR, REVISAR = 0.72, 0.60
    print("="*70)
    print("   🧠  TZANIX · Cerebro ML — detección de anomalías (5 señales)")
    print(f"   {len(X)} IPs analizadas · Isolation Forest (sin librerías)")
    print("="*70)
    print(f"\n{'IP':<17}{'score':>7}  {'veredicto':<14} por qué")
    print("-"*70)
    n_b = n_r = 0
    for s, ip, x in filas:
        if s >= BLOQUEAR:   verd, n_b = "🔴 bloquear", n_b+1; porque = explicar(x,med,mad)
        elif s >= REVISAR:  verd, n_r = "🟡 al analista", n_r+1; porque = explicar(x,med,mad)
        else:               verd, porque = "✅ normal", ""
        print(f"{ip:<17}{s:>7.3f}  {verd:<14} {porque}")
    print("-"*70)
    print(f"🔴 {n_b} bloqueo automático · 🟡 {n_r} al analista · el resto, normal.")
    print("="*70)

if __name__ == "__main__":
    main()
