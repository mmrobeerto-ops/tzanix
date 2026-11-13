#!/usr/bin/env python3
# =============================================================================
#  tzanix_ml_demo — EL CEREBRO: detección de anomalías con Isolation Forest
#
#  Implementa un Isolation Forest DE CERO (sin numpy ni scikit-learn), para
#  que corra en cualquier servidor y para que veas cómo funciona "la IA" por
#  dentro. No necesita etiquetas: aprende lo "normal" y aísla lo raro.
#
#  Clave: caza a los atacantes por su COMPORTAMIENTO (muchos errores 404,
#  rutas sensibles, user-agents que rotan), NO por el volumen. Un Googlebot
#  legítimo manda mucho tráfico pero se comporta normal -> no lo marca.
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
                left  = [r for r in X if r[q] <  p]
                right = [r for r in X if r[q] >= p]
                self.leaf = False; self.q = q; self.p = p
                self.l = ITree(left, depth + 1, max_depth)
                self.r = ITree(right, depth + 1, max_depth)
                return
        # todos iguales -> hoja

    def path(self, x, depth):
        if self.leaf:
            return depth + c_factor(self.size)
        branch = self.l if x[self.q] < self.p else self.r
        return branch.path(x, depth + 1)

def train_forest(X, n_trees=140, sample=256):
    sub = min(sample, len(X))
    max_depth = math.ceil(math.log2(max(sub, 2)))
    trees = [ITree(random.sample(X, sub), 0, max_depth) for _ in range(n_trees)]
    return trees, c_factor(sub)

def anomaly_score(trees, c, x):
    h = sum(t.path(x, 0) for t in trees) / len(trees)
    return 2.0 ** (-h / c)          # ~1 = anómalo, ~0.5 = normal

# --------------------------------------------------------------------------
#  2) GENERAR UN LOG DE EJEMPLO (si no te pasan uno real)
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

def generar_log(path):
    lineas = []
    def L(ip, ruta, status, ua):
        lineas.append(f'{ip} - - [13/Nov/2026:09:00:00] "GET {ruta} HTTP/1.1" '
                      f'{status} 512 "-" "{ua}"')
    # 35 usuarios normales
    for i in range(35):
        ip = f"187.188.{i}.{random.randint(2,250)}"
        for _ in range(random.randint(6, 30)):
            L(ip, random.choice(NORMALES), random.choice([200]*9+[304,404]), UA_BROWSER)
    # 1 Googlebot LEGÍTIMO: mucho volumen, pero se porta bien
    gb = "66.249.66.1"
    for _ in range(70):
        L(gb, random.choice(NORMALES), random.choice([200,200,200,304]), "Googlebot/2.1")
    # 3 ATACANTES disfrazados: muchos 404, rutas sensibles, UAs que rotan
    for ip in ["45.148.10.238", "193.47.62.109", "139.162.119.12"]:
        for _ in range(random.randint(90, 180)):
            ruta = random.choice(SENSIBLES if random.random() < 0.9 else NORMALES)
            L(ip, ruta, random.choice([404,404,403,404,200]), random.choice(UA_FAKES))
    random.shuffle(lineas)
    open(path, "w").write("\n".join(lineas) + "\n")
    return len([l for l in lineas])

# --------------------------------------------------------------------------
#  3) PARSEAR LOG -> features por IP
# --------------------------------------------------------------------------
PAT = re.compile(r'^(\S+).*?"GET (\S+) HTTP[^"]*"\s+(\d{3}).*"([^"]*)"\s*$')
SENS = re.compile(r'\.env|\.git|wp-login|wp-admin|/admin|backup|\.bak|phpinfo|'
                  r'credentials|shell|config\.php|/vendor', re.I)

def extraer_features(path):
    data = {}
    for ln in open(path, errors="ignore"):
        m = PAT.search(ln)
        if not m: continue
        ip, ruta, status, ua = m.group(1), m.group(2), int(m.group(3)), m.group(4)
        d = data.setdefault(ip, {"n":0,"paths":set(),"uas":set(),"err":0,"sens":0})
        d["n"] += 1; d["paths"].add(ruta); d["uas"].add(ua)
        if status >= 400: d["err"] += 1
        if SENS.search(ruta): d["sens"] += 1
    ips, X, info = [], [], []
    for ip, d in data.items():
        if d["n"] < 6: continue   # con <6 peticiones no hay señal confiable (ruido de muestra chica)
        # OJO: medimos COMPORTAMIENTO (no volumen). Por eso un Googlebot que
        # manda mucho tráfico pero se porta bien NO se marca.
        # suavizado (additive smoothing): un ratio de pocas muestras no debe gritar "ataque"
        f = [len(d["uas"]), 100*d["err"]/(d["n"]+8), 100*d["sens"]/(d["n"]+8)]
        ips.append(ip); X.append(f); info.append(d)
    return ips, X, info

FNAMES = ["user-agents que rota", "% errores (404/403)", "% rutas sensibles"]

def explicar(x, mediana, mad):
    # nombra las 2-3 features más extremas vs lo normal (z robusto)
    zs = []
    for i,(v,me,ma) in enumerate(zip(x, mediana, mad)):
        z = abs(v-me)/ma if ma>1e-9 else (0 if v==me else 9)
        zs.append((z, i, v))
    zs.sort(reverse=True)
    partes = []
    for z,i,v in zs[:3]:
        if z < 2: break
        val = f"{v:.0f}%" if "%" in FNAMES[i] else f"{v:.0f}"
        partes.append(f"{FNAMES[i]}: {val}")
    return " · ".join(partes) or "patrón inusual"

def mediana(col):
    s=sorted(col); n=len(s); return s[n//2] if n%2 else (s[n//2-1]+s[n//2])/2

# --------------------------------------------------------------------------
#  4) CORRER
# --------------------------------------------------------------------------
def main():
    path = sys.argv[1] if len(sys.argv) > 1 else "/tmp/tzanix-sample-access.log"
    if len(sys.argv) <= 1:
        n = generar_log(path)
        print(f"(Generé un log de ejemplo con {n} peticiones en {path})\n")

    ips, X, info = extraer_features(path)
    if len(X) < 5:
        print("Muy pocos datos para entrenar. Usa un log más grande."); return

    trees, c = train_forest(X)
    med = [mediana([row[i] for row in X]) for i in range(len(X[0]))]
    mad = [mediana([abs(row[i]-med[i]) for row in X]) or 1 for i in range(len(X[0]))]

    filas = []
    for ip, x, d in zip(ips, X, info):
        s = anomaly_score(trees, c, x)
        filas.append((s, ip, x, d))
    filas.sort(reverse=True)

    BLOQUEAR, REVISAR = 0.72, 0.60     # 3 niveles: claro / dudoso / normal
    print("=" * 66)
    print("   🧠  TZANIX · Cerebro ML — detección de anomalías")
    print(f"   {len(X)} IPs analizadas · Isolation Forest (sin librerías)")
    print("=" * 66)
    print(f"\n{'IP':<17}{'score':>7}  {'veredicto':<14} por qué")
    print("-" * 66)
    n_bloq = n_rev = 0
    for s, ip, x, d in filas:
        if s >= BLOQUEAR:
            verd = "🔴 bloquear"; porque = explicar(x, med, mad); n_bloq += 1
        elif s >= REVISAR:
            verd = "🟡 al analista"; porque = explicar(x, med, mad); n_rev += 1
        else:
            verd = "✅ normal"; porque = ""
        print(f"{ip:<17}{s:>7.3f}  {verd:<14} {porque}")

    print("-" * 66)
    print(f"🔴 {n_bloq} para bloqueo automático · 🟡 {n_rev} dudoso(s) al analista · "
          f"el resto, normal.")
    print("Los cazó por COMPORTAMIENTO (errores, rutas sensibles, user-agents que")
    print("rotan), sin lista negra ni conocer sus IPs. Lo claro se bloquea solo; lo")
    print("dudoso lo revisa el analista (la IA que explica) antes de actuar.")
    print("=" * 66)

if __name__ == "__main__":
    main()
