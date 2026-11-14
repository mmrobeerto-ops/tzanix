#!/usr/bin/env python3
# =============================================================================
#  tzanix_fp_real — PRUEBA REAL de "punto de anclaje" (huella de cabeceras)
#
#  Defensivo. Levanta un servidor que captura la HUELLA real de cada cliente:
#  el ORDEN y CONJUNTO de sus cabeceras HTTP (curl, Python y un navegador las
#  mandan distinto). Luego le pega con clientes REALES, incluido un escáner
#  que se DISFRAZA cambiando su User-Agent — para ver si la huella lo delata
#  aunque mienta.
#
#  Pregunta: ¿la huella es (a) estable por cliente y (b) sobrevive al disfraz?
# =============================================================================
import sys, os, json, time, hashlib, threading, subprocess, urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

PORT = 8899
CAPTURA = []   # cada petición: {ip, ua, path, fp, headers}

class H(BaseHTTPRequestHandler):
    def _log(self):
        nombres = [k.lower() for k in self.headers.keys()]      # ORDEN real de cabeceras
        fp = hashlib.sha1(",".join(nombres).encode()).hexdigest()[:10]
        CAPTURA.append({"ua": self.headers.get("User-Agent",""), "path": self.path,
                        "fp": fp, "headers": ",".join(nombres)})
        self.send_response(200); self.send_header("Content-Length","2"); self.end_headers()
        self.wfile.write(b"ok")
    def do_GET(self): self._log()
    def do_POST(self): self._log()
    def log_message(self,*a): pass

srv = ThreadingHTTPServer(("127.0.0.1", PORT), H)
threading.Thread(target=srv.serve_forever, daemon=True).start()
time.sleep(0.4)
BASE = f"http://127.0.0.1:{PORT}"
NOPROXY = {"http": None, "https": None}
OPENER = urllib.request.build_opener(urllib.request.ProxyHandler({}))

# --- CLIENTES REALES ---
# 1) Navegador (cabeceras tipo Chrome, en orden de navegador)
for _ in range(5):
    subprocess.run(["curl","-s","--noproxy","127.0.0.1",
        "-H","Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "-H","Accept-Language: es-MX,es;q=0.9","-H","Accept-Encoding: gzip, deflate, br",
        "-A","Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120 Safari/537.36",
        BASE+"/"], capture_output=True)

# 2) Escáner con curl por defecto, tocando rutas sensibles
for p in ["/.env","/wp-login.php","/.git/config","/backup.zip"]:
    subprocess.run(["curl","-s","--noproxy","127.0.0.1", BASE+p], capture_output=True)

# 3) EL MISMO escáner curl pero DISFRAZADO: rota User-Agents falsos
for ua in ["Googlebot/2.1","Mozilla/5.0 Chrome/118","Bingbot/2.0","curl/7"]:
    subprocess.run(["curl","-s","--noproxy","127.0.0.1","-A",ua, BASE+"/.env"], capture_output=True)

# 4) Bot en Python (urllib)
for p in ["/admin","/phpinfo.php"]:
    try: OPENER.open(urllib.request.Request(BASE+p, headers={"User-Agent":"Googlebot/2.1"}), timeout=5).read()
    except Exception: pass

time.sleep(0.4); srv.shutdown()

# --- ANÁLISIS: agrupar por HUELLA (no por User-Agent) ---
porfp = {}
for r in CAPTURA:
    d = porfp.setdefault(r["fp"], {"n":0,"uas":set(),"paths":set(),"hdr":r["headers"]})
    d["n"]+=1; d["uas"].add(r["ua"] or "(sin UA)"); d["paths"].add(r["path"])

print("="*68)
print("   PRUEBA REAL · huella por cabeceras HTTP (clientes reales)")
print(f"   {len(CAPTURA)} peticiones capturadas · {len(porfp)} huellas distintas")
print("="*68)
for fp,d in sorted(porfp.items(), key=lambda x:-x[1]["n"]):
    print(f"\n🔹 Huella {fp}  ·  {d['n']} peticiones  ·  {len(d['uas'])} user-agent(s)")
    print(f"   Cabeceras: {d['hdr']}")
    print(f"   User-agents vistos: {' | '.join(sorted(d['uas']))}")
    sens = [p for p in d['paths'] if any(s in p for s in ('.env','wp-login','.git','backup','admin','phpinfo'))]
    if sens: print(f"   🔴 Tocó rutas sensibles: {', '.join(sorted(sens))}")

print("\n"+"="*68)
# ¿alguna huella usó varios UA (disfraz) incluyendo nombres de bots buenos?
disfraz = [(fp,d) for fp,d in porfp.items() if len(d["uas"])>=2 and
           any("google" in u.lower() or "bing" in u.lower() for u in d["uas"])]
if disfraz:
    print("   ✅ FUNCIONÓ: una sola huella usó VARIOS user-agents (incluido 'Googlebot').")
    print("   El disfraz cambió; la huella de cabeceras NO. Lo delata aunque mienta.")
else:
    print("   (No se detectó disfraz en esta corrida.)")
print("="*68)
