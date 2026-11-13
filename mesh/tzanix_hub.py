#!/usr/bin/env python3
# =============================================================================
#  tzanix_hub — EL FOSO (motor de consenso) · versión ENDURECIDA
#
#  Red de inteligencia compartida de TZANIX. Cada agente reporta atacantes;
#  el hub publica un feed de consenso para que el resto pre-bloquee.
#
#  Defensas (endurecido para producción):
#   - k-anonimato: una IP solo entra al feed con >=K clientes DISTINTOS.
#   - REPUTACIÓN por cliente (opcional): el consenso pesa por confianza, no
#     por conteo; cuentas nuevas valen poco → la colusión fresca NO envenena.
#   - lista blanca: rangos buenos (Google, Cloudflare, privados) nunca salen.
#   - validación de IP: descarta IPs mal formadas / no enrutables (opcional).
#   - rate-limit por cliente: frena inundación de reportes.
#   - CADUCIDAD: avistamientos y publicaciones viejas expiran solas.
#   - tope de memoria: nunca crece sin límite (evicción del más viejo).
#   - un voto por cliente por IP.
# =============================================================================
import time
import ipaddress


class MeshHub:
    def __init__(self, k_consenso=3, ventana_seg=86400, min_descartes=100,
                 ttl_feed_seg=3600, allowlist_cidrs=None,
                 # --- endurecimiento (opcional, sin romper lo anterior) ---
                 usar_reputacion=False, trust_start=0.25, trust_needed=1.0,
                 trust_cap=0.6, trust_gain=0.1,
                 validar_global=False, rate_por_min=0, max_ips=200000):
        self.K = k_consenso
        self.VENTANA = ventana_seg
        self.MIN_DESC = min_descartes
        self.TTL = ttl_feed_seg
        base = ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16", "127.0.0.0/8",
                "66.249.64.0/19", "173.245.48.0/20", "157.55.39.0/24"]
        self.allowlist = [ipaddress.ip_network(c) for c in (allowlist_cidrs or base)]
        # reputación
        self.usar_reputacion = usar_reputacion
        self.trust_start = trust_start
        self.trust_needed = trust_needed
        self.trust_cap = trust_cap
        self.trust_gain = trust_gain
        self.trust = {}
        # validación / límites
        self.validar_global = validar_global
        self.rate_por_min = rate_por_min
        self.max_ips = max_ips
        self._rate = {}   # cid -> [ventana_min, conteo]
        # almacén
        self.sightings = {}       # ip -> { cid -> (descartes, t) }
        self.published = set()
        # métricas
        self.rechazos_allowlist = 0
        self.rechazos_ip_invalida = 0
        self.rechazos_rate = 0
        self.evicciones = 0
        self.reportes_totales = 0

    # ---------- validación ----------
    def _ip_no_compartible(self, ip):
        """True si la IP NO debe compartirse (allowlist, privada, inválida...)."""
        try:
            addr = ipaddress.ip_address(ip)
        except ValueError:
            return "invalida"
        if any(addr in red for red in self.allowlist):
            return "allowlist"
        if self.validar_global and not addr.is_global:
            return "no_global"
        return None

    def _rate_ok(self, cid, ahora):
        if self.rate_por_min <= 0:
            return True
        win = int(ahora // 60)
        v = self._rate.get(cid)
        if v is None or v[0] != win:
            self._rate[cid] = [win, 1]
            return True
        if v[1] >= self.rate_por_min:
            return False
        v[1] += 1
        return True

    def _trust(self, cid):
        return self.trust.get(cid, self.trust_start)

    # ---------- publicación (con o sin reputación) ----------
    def _evaluar_publicacion(self, ip):
        d = self.sightings.get(ip, {})
        if len(d) < self.K:
            return
        if not self.usar_reputacion:
            self.published.add(ip)
            return
        # reputación: suma de confianza (cada aporte topado) debe alcanzar
        suma = sum(min(self._trust(c), self.trust_cap) for c in d)
        if suma >= self.trust_needed:
            if ip not in self.published:
                self.published.add(ip)
                # premiar a quienes acertaron (coincidir con el consenso)
                for c in d:
                    self.trust[c] = min(1.0, self._trust(c) + self.trust_gain)

    # ---------- reporte ----------
    def report(self, reporter_id, ip, descartes, ahora=None):
        ahora = ahora if ahora is not None else time.time()
        self.reportes_totales += 1
        # 1) validación de IP
        motivo = self._ip_no_compartible(ip)
        if motivo == "allowlist":
            self.rechazos_allowlist += 1; return False
        if motivo in ("invalida", "no_global"):
            self.rechazos_ip_invalida += 1; return False
        # 2) descartes saneados
        try:
            descartes = int(descartes)
        except (TypeError, ValueError):
            self.rechazos_ip_invalida += 1; return False
        if descartes < self.MIN_DESC:
            return False
        descartes = min(descartes, 10**7)   # clamp anti-inflado
        # 3) rate-limit por cliente
        if not self._rate_ok(reporter_id, ahora):
            self.rechazos_rate += 1; return False
        # 4) tope de memoria (evicción del más viejo)
        if ip not in self.sightings and len(self.sightings) >= self.max_ips:
            self._evictar_mas_viejo()
        # 5) guardar (un voto por cliente)
        d = self.sightings.setdefault(ip, {})
        prev = d.get(reporter_id)
        if prev is None or descartes >= prev[0]:
            d[reporter_id] = (descartes, ahora)
        # 6) ¿se publica?
        self._evaluar_publicacion(ip)
        return True

    def _evictar_mas_viejo(self):
        viejo_ip, viejo_t = None, None
        for ip, d in self.sightings.items():
            t = max(v[1] for v in d.values())
            if viejo_t is None or t < viejo_t:
                viejo_ip, viejo_t = ip, t
        if viejo_ip is not None:
            self.sightings.pop(viejo_ip, None)
            self.published.discard(viejo_ip)
            self.evicciones += 1

    def esta_publicada(self, ip):
        return ip in self.published

    # ---------- caducidad (llamar periódicamente) ----------
    def limpiar(self, ahora=None):
        ahora = ahora if ahora is not None else time.time()
        for ip in list(self.sightings.keys()):
            d = self.sightings[ip]
            vivos = {c: v for c, v in d.items() if ahora - v[1] <= self.VENTANA}
            if not vivos:
                self.sightings.pop(ip, None)
                self.published.discard(ip)
            else:
                self.sightings[ip] = vivos
                if ip in self.published and len(vivos) < self.K:
                    self.published.discard(ip)

    # ---------- feed ----------
    def feed(self, ahora=None):
        ahora = ahora if ahora is not None else time.time()
        salida = []
        for ip, d in self.sightings.items():
            vig = {c: v for c, v in d.items() if ahora - v[1] <= self.VENTANA}
            if ip in self.published and len(vig) >= self.K:
                total = sum(v[0] for v in vig.values())
                conf = min(100, int(40 + 15 * len(vig) + total / 100))
                salida.append({"ip": ip, "clientes": len(vig),
                               "descartes_total": total, "confianza": conf,
                               "ttl_seg": self.TTL})
        salida.sort(key=lambda x: (x["clientes"], x["descartes_total"]), reverse=True)
        return salida

    def feed_ips(self, ahora=None):
        return {e["ip"] for e in self.feed(ahora)}
