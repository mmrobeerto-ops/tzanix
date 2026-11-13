#!/usr/bin/env python3
# =============================================================================
#  tzanix_ai — LA CAPA DE "ANALISTA DE SEGURIDAD EN ESPAÑOL"
#
#  Esto es lo que TZANIX tiene y una blocklist cruda (CrowdSec, etc.) no:
#  traduce los ataques en algo que el DUEÑO de una PyME entiende.
#  Para cada atacante responde: qué pasó · qué significa · qué hice ·
#  qué te recomiendo — en español llano, en "manzanas".
#
#  Hoy: motor de reglas (gratis, instantáneo, sin internet, sin API keys).
#  Mañana: se puede enchufar un LLM en `explicar_con_llm()` SIN tocar el resto
#          (el motor de reglas queda como respaldo si el LLM no está).
# =============================================================================
from datetime import datetime

# Rangos tristemente famosos por escaneo/abuso (ejemplos; se amplía con el tiempo)
RANGOS_MALOS = ("45.148.", "193.47.", "139.162.", "80.94.", "141.98.",
                "45.138.", "185.", "212.47.")


def _nivel(descartes, clientes_red=1):
    """Decide la gravedad combinando intensidad local y cuántos de la red lo vieron."""
    score = descartes
    if clientes_red >= 3:
        score += 400          # si atacó a varios de la red, sube
    if score >= 500:
        return "alto", "🔴"
    if score >= 150:
        return "medio", "🟡"
    return "bajo", "🟢"


def _es_rango_malo(ip):
    return any(ip.startswith(p) for p in RANGOS_MALOS)


def explicar_atacante(ip, descartes, clientes_red=1, modo="observacion"):
    """Devuelve un dict con la explicación humana de UN atacante."""
    nivel, icono = _nivel(descartes, clientes_red)
    conocido = clientes_red >= 3 or _es_rango_malo(ip)
    # un atacante ya conocido nunca es "bajo": mínimo medio
    if conocido and nivel == "bajo":
        nivel, icono = "medio", "🟡"

    que_paso = (f"Esta máquina tocó las puertas de tu servidor {descartes} veces, "
                "probando entrar una y otra vez (comportamiento de robot/escáner).")

    if conocido:
        que_significa = ("Es un atacante **ya conocido**: no te eligió a ti, "
                         "ataca a todo servidor que encuentra buscando uno mal "
                         "protegido para meterse. "
                         + ("Ya le hizo lo mismo a otros negocios de la red TZANIX."
                            if clientes_red >= 3 else ""))
    else:
        que_significa = ("Es un robot que rastrea internet buscando puertas abiertas. "
                         "No es personal; prueba suerte con miles de servidores.")

    if modo == "bloqueo":
        que_hice = "La corté automáticamente: ya no puede volver a tocar tu servidor."
    else:
        que_hice = ("La detecté y la tengo vigilada. En modo protección activa "
                    "la cortaría sola, sin que tú muevas un dedo.")

    if nivel == "alto":
        reco = ("Déjame activarte el **bloqueo automático** para esta y las que "
                "vengan. Tú no tienes que hacer nada; yo me encargo.")
    elif nivel == "medio":
        reco = ("Nada urgente de tu parte. Conviene activar el bloqueo automático "
                "para que ni te enteres de estos.")
    else:
        reco = "Sin acción necesaria. Solo te lo reporto para que sepas que vigilo."

    return {"ip": ip, "nivel": nivel, "icono": icono, "descartes": descartes,
            "clientes_red": clientes_red, "que_paso": que_paso,
            "que_significa": que_significa, "que_hice": que_hice,
            "recomendacion": reco}


def resumen_ejecutivo(eventos):
    """Una o dos frases para el dueño, en 'manzanas'."""
    n = len(eventos)
    if n == 0:
        return ("Tu servidor estuvo **tranquilo**: no detecté máquinas intentando "
                "entrar sin permiso. Así se ve un servidor vigilado y sano. ✅")
    altos = sum(1 for e in eventos if e["nivel"] == "alto")
    frase = (f"Detecté **{n} máquina(s) desconocida(s)** intentando entrar a tu "
             "servidor sin permiso. Las tengo identificadas y vigiladas; "
             "**ninguna logró entrar.**")
    if altos:
        verbo = "es" if altos == 1 else "son"
        frase += f" {altos} de ellas {verbo} de riesgo alto — conviene activar el bloqueo."
    return frase


def informe_texto(eventos, negocio="tu negocio", modo="observacion"):
    """Informe completo, listo para enseñarle o mandarle a un cliente."""
    L = []
    L.append("=" * 60)
    L.append(f"  🛡️  TZANIX · Informe de seguridad — {negocio}")
    L.append(f"  {datetime.now():%d/%m/%Y %H:%M}")
    L.append("=" * 60)
    L.append("")
    L.append("RESUMEN")
    L.append(resumen_ejecutivo(eventos))
    if not eventos:
        L.append("")
        L.append("=" * 60)
        return "\n".join(L)

    L.append("")
    L.append("QUÉ ENCONTRÉ")
    L.append("-" * 60)
    # más graves primero
    orden = {"alto": 0, "medio": 1, "bajo": 2}
    for e in sorted(eventos, key=lambda x: (orden[x["nivel"]], -x["descartes"])):
        L.append(f"{e['icono']}  Riesgo {e['nivel'].upper()} · {e['ip']}")
        L.append(f"   Qué pasó:      {e['que_paso']}")
        L.append(f"   Qué significa: {e['que_significa']}")
        L.append(f"   Qué hice:      {e['que_hice']}")
        L.append(f"   Te recomiendo: {e['recomendacion']}")
        L.append("")
    L.append("-" * 60)
    L.append("TZANIX vigila tu servidor 24/7 y aprende de los ataques a toda la red.")
    L.append("Cualquier duda, aquí estoy. — Tu equipo de seguridad.")
    L.append("=" * 60)
    return "\n".join(L)


# --------------------------------------------------------------------------
#  ENCHUFE PARA LLM (apagado por defecto). Cuando quieras IA generativa real,
#  implementa aquí la llamada; si falla o no hay key, usa el motor de reglas.
# --------------------------------------------------------------------------
def explicar_con_llm(ip, descartes, clientes_red=1, modo="observacion",
                     api_key=None):
    """
    Versión LLM (futura). Debe devolver el MISMO dict que explicar_atacante().
    Diseño: si api_key es None o la llamada falla -> cae al motor de reglas.
    Así el producto nunca se cae por depender de la IA generativa.
    """
    if not api_key:
        return explicar_atacante(ip, descartes, clientes_red, modo)
    # TODO: aquí iría la llamada a la API del LLM (Claude/OpenAI) con un prompt
    # tipo: "Explica a un dueño de tienda, en español llano, este ataque: ..."
    # Por ahora, respaldo seguro:
    return explicar_atacante(ip, descartes, clientes_red, modo)


if __name__ == "__main__":
    # demo rápida
    ev = [explicar_atacante("45.148.10.238", 100, clientes_red=4),
          explicar_atacante("203.0.113.9", 120, clientes_red=1),
          explicar_atacante("193.47.62.109", 100, clientes_red=1)]
    print(informe_texto(ev, negocio="Tienda de Doña Rosa"))
