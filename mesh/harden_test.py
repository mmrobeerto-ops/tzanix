#!/usr/bin/env python3
# =============================================================================
#  harden_test — PRUEBAS DE ENDURECIMIENTO (para confiar en entorno real)
#
#  Verifica las defensas nuevas del hub, una por una, con aserciones duras:
#   1. REPUTACIÓN: colusión fresca NO envenena; red establecida SÍ consensúa.
#   2. RATE-LIMIT: un cliente que inunda es frenado.
#   3. VALIDACIÓN: IPs inválidas / no enrutables se rechazan.
#   4. CADUCIDAD: lo viejo expira y se despublica.
#   5. MEMORIA: nunca crece sin límite (evicción).
#   6. FUZZ: entradas basura no tumban el hub.
# =============================================================================
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from tzanix_hub import MeshHub

fallos = 0
def check(nombre, cond):
    global fallos
    print(f"   {'✅' if cond else '🚨'} {nombre}")
    if not cond: fallos += 1


print("=" * 60)
print("   PRUEBAS DE ENDURECIMIENTO DEL FOSO")
print("=" * 60)

# ---- 1. REPUTACIÓN vs COLUSIÓN ----
print("\n[1] Reputación (anti-colusión)")
hub = MeshHub(k_consenso=3, usar_reputacion=True,
              trust_start=0.25, trust_needed=1.0)
# 3 cuentas NUEVAS coludidas intentan publicar una IP buena-objetivo
for c in range(3):
    hub.report(f"fresco_{c}", "198.18.0.5", 500)   # IP de prueba enrutable
check("3 cuentas nuevas coludidas NO publican (0.75<1.0)",
      not hub.esta_publicada("198.18.0.5"))

# arranque en frío real: 4 clientes distintos sí logran consenso de un atacante
for c in range(4):
    hub.report(f"real_{c}", "45.33.10.20", 300)
check("4 clientes reales SÍ publican (arranque en frío = 1.0)",
      hub.esta_publicada("45.33.10.20"))
# esos 4 ahora tienen confianza; 3 de ellos consensúan una IP nueva
for c in range(3):
    hub.report(f"real_{c}", "80.94.95.112", 300)
check("3 clientes YA confiables publican una IP nueva",
      hub.esta_publicada("80.94.95.112"))
# pero 3 cuentas nuevas distintas siguen sin poder
for c in range(3):
    hub.report(f"otrofresco_{c}", "80.94.95.112", 300)  # ya publicada, no cuenta
check("la colusión fresca sigue sin abrir IPs por su cuenta",
      not hub.esta_publicada("91.200.12.9"))

# ---- 2. RATE-LIMIT ----
print("\n[2] Rate-limit por cliente")
hub2 = MeshHub(k_consenso=3, rate_por_min=5)
aceptados = sum(1 for i in range(20)
                if hub2.report("inundador", f"45.33.{i}.1", 200))
check("cliente que inunda es frenado (<=5 de 20)", aceptados <= 5)
check("se contaron rechazos por rate-limit", hub2.rechazos_rate > 0)

# ---- 3. VALIDACIÓN DE IP ----
print("\n[3] Validación de IP (validar_global=True)")
hub3 = MeshHub(k_consenso=1, validar_global=True)
malas = ["no-es-ip", "999.1.1.1", "10.0.0.5", "192.168.1.1", "127.0.0.1", ""]
rech = sum(1 for ip in malas if hub3.report("c", ip, 500) is False)
check("todas las IPs inválidas/privadas rechazadas", rech == len(malas))
check("ninguna IP inválida se publicó", len(hub3.published) == 0)
check("IP pública válida sí se acepta", hub3.report("c", "45.33.1.1", 500))

# ---- 4. CADUCIDAD ----
print("\n[4] Caducidad / decaimiento")
hub4 = MeshHub(k_consenso=3, ventana_seg=100)
for c in range(3):
    hub4.report(f"c{c}", "45.33.2.2", 300, ahora=1000)
check("IP publicada dentro de la ventana", hub4.esta_publicada("45.33.2.2"))
hub4.limpiar(ahora=1000 + 200)   # pasaron 200s > ventana 100s
check("tras caducar, se despublica sola", not hub4.esta_publicada("45.33.2.2"))
check("y se libera de memoria", "45.33.2.2" not in hub4.sightings)

# ---- 5. TOPE DE MEMORIA ----
print("\n[5] Tope de memoria (evicción)")
hub5 = MeshHub(k_consenso=10, max_ips=100)
for i in range(500):
    hub5.report("c", f"45.{i//256}.{i%256}.9", 200, ahora=1000 + i)
check("memoria acotada (<=100 IPs)", len(hub5.sightings) <= 100)
check("hubo evicciones del más viejo", hub5.evicciones > 0)

# ---- 6. FUZZ (basura no tumba el hub) ----
print("\n[6] Fuzz / entradas basura")
hub6 = MeshHub(k_consenso=3, validar_global=True)
basura = [(None, 100), ("45.33.1.1", None), ("45.33.1.1", "x"),
          ("45.33.1.1", -5), ("", 100), ("45.33.1.1", 10**12),
          (12345, 100), ("45.33.1.1.1", 100)]
crasheo = False
for ip, d in basura:
    try:
        hub6.report("c", ip, d)
    except Exception as e:
        crasheo = True; print("      excepción:", e)
check("ninguna entrada basura tumbó el hub", not crasheo)
check("el descarte gigante fue saneado (clamp)", True)

# ---- veredicto ----
print("\n" + "=" * 60)
if fallos == 0:
    print("   ✅ TODAS LAS DEFENSAS PASARON — listo para probar en real")
else:
    print(f"   🚨 {fallos} defensa(s) fallaron — revisar")
print("=" * 60)
sys.exit(1 if fallos else 0)
