# TZANIX — La red de inteligencia que protege a las PyMEs
### Innovation statement · ES / EN · con resultados de prueba reales

---

## 🇲🇽 Español

**El problema.** Las grandes empresas tienen equipos de seguridad; las pequeñas no tienen nada. Los gigantes (Cloudflare, etc.) viven en la "orilla" de la red y no atienden al segmento chico. Una PyME con su propio servidor está sola: la ataca la misma botnet que ya atacó a otras cien, pero cada una la descubre por su cuenta, tarde y a golpes.

**La innovación.** TZANIX lleva la detección de comportamiento —hoy reservada a empresas con analistas— a las PyMEs que nadie protege, con **tres cosas que nadie combina para este segmento**:
1. **Autonomía:** un agente que se auto-calibra, arranca en observación y actúa sin configuración, en 3 MB de memoria, en cualquier servidor Linux.
2. **La capa que falta:** detección *dentro* del servidor, complementando la "reja" del edge, no compitiendo con ella.
3. **El foso — red de inteligencia compartida:** cuando una IP ataca a un cliente, **todos** los demás la pre-bloquean antes de ser atacados. Protegemos al cliente #41 con lo aprendido de los primeros 40.

**Por qué es defendible.** El foso es un **efecto de red de datos**: su valor crece con cada cliente, y un competidor nuevo arranca siempre en cero porque no tiene la red. No se copia con código; se gana con clientes.

**Prueba (simulación, código real):**
- A **2 000 servidores**: **87% menos daño** de ataque, **158 000 bloqueos preventivos**.
- **0 falsos positivos** (la lista blanca protege a Googlebot/Cloudflare).
- **0 ruido propagado** (un escáner que solo tocó a un cliente no se comparte: hace falta consenso de K clientes distintos).
- Resistente a abuso: un atacante no envenena la red sin controlar K identidades reales.
- El hub procesó **~223 000 reportes/segundo**.

**La protección se profundiza con la escala:**

| Clientes en la red | Protección preventiva |
|---|---|
| 10 | 57% |
| 50 | 77% |
| 2 000 | 87% |

---

## 🇨🇦 English

**The problem.** Large companies have security teams; small businesses have nothing. The giants (Cloudflare, etc.) live at the network edge and ignore the small segment. An SMB running its own server is on its own: the same botnet that already hit a hundred others hits it too, but each one discovers the threat alone, late, the hard way.

**The innovation.** TZANIX brings behavioral detection —today reserved for companies with analysts— to the SMBs no one protects, combining **three things no one combines for this segment**:
1. **Autonomy:** a self-calibrating agent that starts in observation mode and acts with zero configuration, in 3 MB of memory, on any Linux server.
2. **The missing layer:** detection *inside* the server, complementing the edge "fence" rather than competing with it.
3. **The moat — a shared threat-intelligence network:** when one IP attacks a client, **every** other client pre-blocks it before being attacked. We protect client #41 with what we learned from the first 40.

**Why it is defensible.** The moat is a **data network effect**: its value grows with every client, and a new competitor always starts at zero because it has no network. It cannot be copied with code; it is earned with customers.

**Evidence (simulation, real code):**
- At **2,000 servers**: **87% less attack damage**, **158,000 pre-emptive blocks**.
- **0 false positives** (allowlist protects Googlebot/Cloudflare).
- **0 noise propagated** (a scanner that touched only one client is never shared: it takes consensus from K distinct clients).
- Abuse-resistant: an attacker cannot poison the network without controlling K real identities.
- The hub processed **~223,000 reports/second**.

**Protection deepens with scale:**

| Clients in the network | Pre-emptive protection |
|---|---|
| 10 | 57% |
| 50 | 77% |
| 2,000 | 87% |

---

*Nota de honestidad: las cifras provienen de una simulación con código real del motor de consenso (`tzanix_hub.py`), bajo un escenario de botnets que atacan a una fracción de la red. Los porcentajes exactos en producción dependerán de cuánto ataque sea compartido entre clientes; la dirección —un foso que se profundiza con la escala— es estructural.*
