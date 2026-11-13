#!/usr/bin/env python3
# =============================================================================
#  e2e_test — PRUEBA DE PUNTA A PUNTA SOBRE HTTP REAL
#
#  Levanta el hub real (HTTP+SQLite+reputación), le pega con MUCHOS clientes
#  CONCURRENTES, mete adversarios y basura, REINICIA el hub a media prueba,
#  y verifica que todo siga correcto. Esto es lo más cercano a producción.
# =============================================================================
import sys, os, json, time, subprocess, threading, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
PORT = 8799
BASE = f"http://127.0.0.1:{PORT}"
PY = sys.executable
ADMIN_TOK = "admin-e2e-demo"
# opener que IGNORA el proxy del entorno (vamos a 127.0.0.1)
OPENER = urllib.request.build_opener(urllib.request.ProxyHandler({}))
KEYS = []   # llaves emitidas por el admin

def admin_mint(label):
    req = urllib.request.Request(BASE + "/admin/key",
        data=json.dumps({"label": label}).encode(),
        headers={"X-Admin-Token": ADMIN_TOK, "Content-Type": "application/json"})
    with OPENER.open(req, timeout=5) as r:
        return json.loads(r.read())["llave"]

fallos = 0
def check(n, c):
    global fallos
    print(f"   {'✅' if c else '🚨'} {n}")
    if not c: fallos += 1

def post(key, ip, desc):
    req = urllib.request.Request(BASE + "/report",
        data=json.dumps({"ip": ip, "descartes": desc}).encode(),
        headers={"X-Api-Key": key, "Content-Type": "application/json"})
    try:
        with OPENER.open(req, timeout=5) as r:
            return json.loads(r.read())
    except Exception as e:
        return {"error": str(e)}

def post_raw(key, body):
    req = urllib.request.Request(BASE + "/report", data=body,
        headers={"X-Api-Key": key})
    try:
        with OPENER.open(req, timeout=5) as r:
            return r.status
    except urllib.error.HTTPError as e:
        return e.code
    except Exception:
        return -1

def feed(key=None):
    key = key or KEYS[0]
    req = urllib.request.Request(BASE + "/feed", headers={"X-Api-Key": key})
    with OPENER.open(req, timeout=5) as r:
        return json.loads(r.read())["feed"]

def arrancar():
    env = dict(os.environ, TZANIX_ADMIN_TOKEN=ADMIN_TOK)
    p = subprocess.Popen([PY, "-I", "tzanix_hub_server.py", str(PORT)],
                         cwd=HERE, env=env,
                         stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    for _ in range(50):
        try:
            with OPENER.open(BASE + "/health", timeout=2) as r:
                if r.status == 200: return p
        except Exception:
            time.sleep(0.1)
    return p


print("=" * 62)
print("   PRUEBA DE PUNTA A PUNTA (HTTP real + reinicio)")
print("=" * 62)

# limpieza
for f in ("hub.db", "keys.txt"):
    try: os.remove(os.path.join(HERE, f))
    except OSError: pass

srv = arrancar()
try:
    # el admin emite 20 llaves (una por cliente)
    KEYS = [admin_mint(f"cli{i}") for i in range(20)]
    check("admin emitió 20 llaves", len(KEYS) == 20 and all(KEYS))
    ATACANTE = "45.33.44.55"
    COMPETIDOR = "80.94.21.9"   # lo que 3 coludidos intentan bloquear

    # --- 4 clientes HONESTOS reportan al atacante, CONCURRENTES ---
    print("\n[1] Consenso honesto bajo concurrencia")
    hilos = [threading.Thread(target=post, args=(KEYS[i], ATACANTE, 300))
             for i in range(4)]
    for h in hilos: h.start()
    for h in hilos: h.join()
    pub = any(e["ip"] == ATACANTE for e in feed())
    check("4 clientes reales publican al atacante (arranque en frío)", pub)

    # --- 3 COLUDIDOS frescos intentan envenenar al competidor ---
    print("\n[2] Colusión fresca (reputación)")
    for i in range(10, 13):
        post(KEYS[i], COMPETIDOR, 9999)
    envenenado = any(e["ip"] == COMPETIDOR for e in feed())
    check("3 cuentas nuevas NO logran bloquear al competidor", not envenenado)

    # --- INUNDADOR: 300 reportes de un solo cliente (rate-limit) ---
    print("\n[3] Inundador (rate-limit)")
    aceptados = 0
    for i in range(300):
        r = post(KEYS[5], f"45.60.{i//256}.{i%256}", 200)
        if r.get("aceptado"): aceptados += 1
    check(f"inundador frenado por rate-limit ({aceptados} aceptados < 300)",
          aceptados < 300)

    # --- BASURA: cuerpos inválidos no tumban el hub ---
    print("\n[4] Basura / entradas inválidas")
    codes = [post_raw(KEYS[0], b"no-es-json"),
             post_raw(KEYS[0], b'{"ip":"999.1.1.1","descartes":5}'),
             post_raw(KEYS[0], b'{"falta":"campos"}'),
             post_raw("sin-llave-valida", b'{"ip":"1.2.3.4","descartes":200}')]
    # health sigue vivo tras la basura
    with OPENER.open(BASE + "/health", timeout=3) as r:
        vivo = (r.status == 200)
    check("el hub sigue vivo tras recibir basura", vivo)
    check("rechazó la petición sin llave (401)", 401 in codes)

    # --- REINICIO a media prueba: ¿persiste el consenso? ---
    print("\n[5] Reinicio del hub (persistencia)")
    srv.terminate(); srv.wait(timeout=5)
    srv = arrancar()
    f2 = feed()
    sigue = any(e["ip"] == ATACANTE for e in f2)
    sigue_limpio = not any(e["ip"] == COMPETIDOR for e in f2)
    check("tras reiniciar, el atacante sigue publicado (SQLite)", sigue)
    check("y el competidor sigue SIN bloquearse", sigue_limpio)

    # --- carga concurrente final: 12 clientes x 50 reportes ---
    print("\n[6] Carga concurrente (12 clientes simultáneos)")
    errores = []
    def worker(cid):
        for i in range(50):
            r = post(KEYS[cid], f"45.{cid}.{i//256}.{i%256}", 200)
            if "error" in r: errores.append(r["error"])
    t0 = time.time()
    hs = [threading.Thread(target=worker, args=(c,)) for c in range(12)]
    for h in hs: h.start()
    for h in hs: h.join()
    dt = time.time() - t0
    check(f"600 reportes concurrentes sin errores ({dt:.2f}s)", not errores)

finally:
    try: srv.terminate(); srv.wait(timeout=5)
    except Exception: pass

print("\n" + "=" * 62)
print("   ✅ E2E OK — el foso aguanta en condiciones reales"
      if fallos == 0 else f"   🚨 {fallos} fallo(s) en E2E")
print("=" * 62)
sys.exit(1 if fallos else 0)
