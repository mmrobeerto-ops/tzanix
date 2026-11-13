#!/usr/bin/env python3
# =============================================================================
#  tzanix_hub_server — EL HUB de producción (HTTP + SQLite, endurecido)
#
#  Novedades de endurecimiento:
#   - REPUTACIÓN persistida en SQLite (sobrevive reinicios).
#   - GESTIÓN DE LLAVES en SQLite: alta/baja por API admin (token aparte).
#   - Identidad del cliente = su llave (un voto por llave).
#   - Página de ESTADO pública + /health + /stats.
#   - Límite de tamaño de cuerpo, cabeceras de seguridad, candado de hilos.
#   - Validación de IP, rate-limit, caducidad y tope de memoria (del motor).
#
#  TLS lo pone un reverse-proxy enfrente (Caddy → hub.aureasystems.mx).
#
#  Variables de entorno:
#   TZANIX_ADMIN_TOKEN   token para crear/revocar llaves (si falta, admin OFF)
#   TZANIX_SEED_KEY      si la tabla de llaves está vacía, siembra esta llave
#
#  Arrancar:  python3 tzanix_hub_server.py [puerto]
# =============================================================================
import sys, os, json, sqlite3, hashlib, time, threading, secrets
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from tzanix_hub import MeshHub

DB = os.environ.get("TZANIX_DB", os.path.join(HERE, "hub.db"))
ADMIN = os.environ.get("TZANIX_ADMIN_TOKEN", "")
SEED = os.environ.get("TZANIX_SEED_KEY", "")
K_CONSENSO = 3
MIN_DESC = 100
MAX_BODY = 8192

def khash(k):  # hash de la llave (lo que guardamos; nunca la llave en claro)
    return hashlib.sha256(k.encode()).hexdigest()
def cid_de(k):  # id de cliente estable/anónimo
    return khash(k)[:16]


class Hub:
    def __init__(self):
        self.mem = MeshHub(k_consenso=K_CONSENSO, min_descartes=MIN_DESC,
                           usar_reputacion=True, validar_global=True,
                           rate_por_min=120, max_ips=500000)
        self.lock = threading.RLock()
        self.db = sqlite3.connect(DB, check_same_thread=False)
        self.db.executescript("""
          CREATE TABLE IF NOT EXISTS sightings(
            ip TEXT, cid TEXT, descartes INTEGER, t REAL, PRIMARY KEY(ip,cid));
          CREATE TABLE IF NOT EXISTS trust(cid TEXT PRIMARY KEY, score REAL);
          CREATE TABLE IF NOT EXISTS keys(
            hash TEXT PRIMARY KEY, label TEXT, active INTEGER DEFAULT 1);
        """)
        self.db.commit()
        # cargar reputación persistida
        for c, s in self.db.execute("SELECT cid,score FROM trust"):
            self.mem.trust[c] = s
        # reconstruir avistamientos (sin rate-limit en el replay)
        rpm = self.mem.rate_por_min; self.mem.rate_por_min = 0
        for ip, c, d, t in self.db.execute("SELECT ip,cid,descartes,t FROM sightings"):
            self.mem.report(c, ip, d, ahora=t)
        self.mem.rate_por_min = rpm
        # sembrar primera llave si hace falta
        if SEED and not self._key_existe(khash(SEED)):
            self.alta_llave(SEED, "seed")

    # ---- llaves ----
    def _key_existe(self, h):
        return self.db.execute("SELECT 1 FROM keys WHERE hash=?", (h,)).fetchone()
    def llave_valida(self, k):
        if not k: return False
        with self.lock:   # toda lectura/escritura a SQLite va serializada
            r = self.db.execute("SELECT active FROM keys WHERE hash=?",
                                (khash(k),)).fetchone()
        return bool(r and r[0])
    def alta_llave(self, k, label):
        with self.lock:
            self.db.execute("INSERT OR REPLACE INTO keys(hash,label,active) "
                            "VALUES(?,?,1)", (khash(k), label))
            self.db.commit()
    def baja_llave(self, k):
        with self.lock:
            self.db.execute("UPDATE keys SET active=0 WHERE hash=?", (khash(k),))
            self.db.commit()

    # ---- reportes ----
    def report(self, apikey, ip, descartes):
        c = cid_de(apikey)
        with self.lock:
            ok = self.mem.report(c, ip, descartes)
            pub = self.mem.esta_publicada(ip) if ok else False
            if ok:
                self.db.execute("INSERT INTO sightings(ip,cid,descartes,t) "
                    "VALUES(?,?,?,?) ON CONFLICT(ip,cid) DO UPDATE SET "
                    "descartes=max(descartes,excluded.descartes), t=excluded.t",
                    (ip, c, descartes, time.time()))
                # persistir reputación de los involucrados
                afectados = {c} | (set(self.mem.sightings.get(ip, {})) if pub else set())
                for cc in afectados:
                    self.db.execute("INSERT OR REPLACE INTO trust(cid,score) "
                        "VALUES(?,?)", (cc, self.mem.trust.get(cc, self.mem.trust_start)))
                self.db.commit()
        return ok, pub

    def feed(self):
        with self.lock: return self.mem.feed()
    def limpiar(self):
        with self.lock: self.mem.limpiar()
    def stats(self):
        with self.lock:
            m = self.mem
            nkeys = self.db.execute("SELECT COUNT(*) FROM keys WHERE active=1").fetchone()[0]
            return {"ips_rastreadas": len(m.sightings), "ips_en_feed": len(m.published),
                    "clientes_activos": nkeys, "reportes_totales": m.reportes_totales,
                    "rechazos_allowlist": m.rechazos_allowlist,
                    "rechazos_ip_invalida": m.rechazos_ip_invalida,
                    "rechazos_rate": m.rechazos_rate, "evicciones": m.evicciones}


HUB = None
PAGINA = """<!doctype html><html lang=es><meta charset=utf-8>
<meta name=viewport content="width=device-width,initial-scale=1">
<title>TZANIX · Red de inteligencia</title>
<style>body{{background:#0d1117;color:#e6edf3;font-family:system-ui,sans-serif;
display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0}}
.c{{text-align:center;padding:24px}}.d{{color:#3fb950;font-weight:700}}
h1{{font-size:28px;margin:.2em 0}}.m{{color:#8b949e;font-size:14px}}
.n{{font-size:40px;font-weight:800;color:#d4a017}}</style>
<div class=c><h1>🛡️ TZANIX</h1><p class=d>● Red de inteligencia EN LÍNEA</p>
<p class=n>{ips}</p><p class=m>IPs atacantes en el feed compartido · protegiendo a la red</p>
<p class=m>API para agentes: <code>/report</code> · <code>/feed</code></p></div></html>"""


class H(BaseHTTPRequestHandler):
    server_version = "tzanix-hub"
    def _hdr(self):
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "DENY")
        self.send_header("Referrer-Policy", "no-referrer")
    def _json(self, code, obj):
        b = json.dumps(obj).encode()
        self.send_response(code); self._hdr()
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(b))); self.end_headers()
        self.wfile.write(b)
    def _html(self, code, s):
        b = s.encode()
        self.send_response(code); self._hdr()
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(b))); self.end_headers()
        self.wfile.write(b)
    def _apikey(self):
        k = self.headers.get("X-Api-Key", "")
        return k if HUB.llave_valida(k) else None
    def _admin(self):
        return ADMIN and self.headers.get("X-Admin-Token", "") == ADMIN
    def _body(self):
        n = int(self.headers.get("Content-Length", 0) or 0)
        if n > MAX_BODY: return None
        try: return json.loads(self.rfile.read(n) or b"{}")
        except Exception: return False

    def do_GET(self):
        if self.path == "/" :
            return self._html(200, PAGINA.format(ips=len(HUB.mem.published)))
        if self.path == "/health":
            return self._json(200, {"ok": True, "ips_en_feed": len(HUB.mem.published)})
        if self.path == "/stats":
            if not self._admin(): return self._json(403, {"error": "solo admin"})
            return self._json(200, HUB.stats())
        if self.path == "/feed":
            if not self._apikey(): return self._json(401, {"error": "llave inválida"})
            return self._json(200, {"feed": HUB.feed()})
        self._json(404, {"error": "no existe"})

    def do_POST(self):
        if self.path == "/report":
            if not self._apikey(): return self._json(401, {"error": "llave inválida"})
            d = self._body()
            if d is None: return self._json(413, {"error": "cuerpo muy grande"})
            if not d or "ip" not in d or "descartes" not in d:
                return self._json(400, {"error": "pide {ip, descartes}"})
            try: ip, desc = str(d["ip"]), int(d["descartes"])
            except Exception: return self._json(400, {"error": "datos inválidos"})
            ok, pub = HUB.report(self._apikey(), ip, desc)
            return self._json(200, {"aceptado": ok, "publicada": pub})
        if self.path == "/admin/key":
            if not self._admin(): return self._json(403, {"error": "solo admin"})
            d = self._body() or {}
            k = secrets.token_hex(16)
            HUB.alta_llave(k, str(d.get("label", "cliente")))
            return self._json(200, {"llave": k, "aviso": "guárdala, no se vuelve a mostrar"})
        if self.path == "/admin/revoke":
            if not self._admin(): return self._json(403, {"error": "solo admin"})
            d = self._body() or {}
            if "llave" not in d: return self._json(400, {"error": "pide {llave}"})
            HUB.baja_llave(str(d["llave"]))
            return self._json(200, {"revocada": True})
        self._json(404, {"error": "no existe"})

    def log_message(self, *a): pass


def main():
    global HUB
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8787
    HUB = Hub()
    def _cleaner():
        while True:
            time.sleep(60)
            try: HUB.limpiar()
            except Exception: pass
    threading.Thread(target=_cleaner, daemon=True).start()
    srv = ThreadingHTTPServer(("127.0.0.1", port), H)
    admin_on = "ON" if ADMIN else "OFF (define TZANIX_ADMIN_TOKEN)"
    print(f"TZANIX hub en http://127.0.0.1:{port} · admin {admin_on} · "
          f"{len(HUB.mem.published)} IPs en feed")
    srv.serve_forever()


if __name__ == "__main__":
    main()
