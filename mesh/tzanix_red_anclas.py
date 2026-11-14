#!/usr/bin/env python3
# =============================================================================
#  tzanix_red_anclas — ¿la RED caza al evasor que el comportamiento NO caza?
#
#  Experimento defensivo. El "evasor listo" se porta idéntico a un humano en
#  CADA servidor (comportamiento local ~ 0% de detección, ya lo medimos).
#  PERO deja un "punto de anclaje" invariante (una huella que no cambia aunque
#  rote IP/disfraz) y la usa contra MUCHOS de tus servidores.
#
#  Idea: en vez de juzgar por servidor, la RED correlaciona la huella: si la
#  misma huella toca a K servidores distintos, es una campaña -> se marca,
#  aunque en cada uno parezca inofensivo.
#
#  Medimos: recall del evasor con SOLO comportamiento local vs. local + RED.
# =============================================================================
import random
random.seed(11)

N_SERVERS = 20
K_RED     = 4        # huella en >=K servidores distintos = campaña

# ---- población: cada entidad tiene una huella (fp) y a cuántos servidores tocó
pop = []  # dict: fp, servers(set), label(1=atacante), kind, local(score 0..1)

# usuarios normales: huella única, tocan 1 servidor (pocos tocan 2-5 legítimo)
for i in range(4000):
    serv = random.sample(range(N_SERVERS), 1 if random.random()<0.97 else random.randint(2,5))
    pop.append({"fp": f"user-{i}", "servers": set(serv), "label": 0, "kind": "normal",
                "local": random.uniform(0.30, 0.60)})

# evasor LISTO: pocas huellas compartidas, cada campaña toca a muchos servidores,
# y en cada servidor se comporta como humano (local bajo, indistinguible)
for c in range(6):                     # 6 campañas
    fp = f"campaign-{c}"
    objetivos = random.sample(range(N_SERVERS), random.randint(6, 14))
    for sv in objetivos:               # una "aparición" por servidor atacado
        pop.append({"fp": fp, "servers": {sv}, "label": 1, "kind": "evasor_listo",
                    "local": random.uniform(0.30, 0.60)})   # se ve normal

# ---- señal de RED: juntar servidores tocados por cada huella
tocados = {}
for e in pop:
    tocados.setdefault(e["fp"], set()).update(e["servers"])

def recall_fp(usar_red):
    # marcamos una APARICIÓN si: comportamiento local alto, O (si usar_red) su
    # huella tocó >=K servidores distintos.
    tp = fp = 0; P = sum(e["label"] for e in pop); N = len(pop)-P
    for e in pop:
        flag_local = e["local"] >= 0.80        # casi nunca (el evasor imita humano)
        flag_red   = usar_red and len(tocados[e["fp"]]) >= K_RED
        pred = flag_local or flag_red
        if pred and e["label"]: tp += 1
        if pred and not e["label"]: fp += 1
    return (tp/P if P else 0), (fp/N if N else 0)

r_local, fp_local = recall_fp(False)
r_red,   fp_red   = recall_fp(True)

print("="*64)
print("   EXPERIMENTO · ¿la RED caza al evasor que el comportamiento no?")
print(f"   {N_SERVERS} servidores · {sum(e['label'] for e in pop)} apariciones de evasor listo")
print("="*64)
print(f"\n   SOLO comportamiento local:  recall {r_local*100:5.1f}%  · falsos positivos {fp_local*100:.2f}%")
print(f"   Comportamiento + RED (anclas): recall {r_red*100:5.1f}%  · falsos positivos {fp_red*100:.2f}%")
print()
campañas_detectadas = sum(1 for c in range(6) if len(tocados[f'campaign-{c}'])>=K_RED)
print(f"   Campañas del evasor detectadas por la red: {campañas_detectadas}/6")
print("="*64)
print("   Lectura honesta:")
print("   • Un servidor SOLO no puede: el evasor se porta como humano con él.")
print("   • La RED sí: la misma huella aparece en muchos servidores = campaña.")
print("   • Límite: si el evasor también aleatoriza su huella en cada servidor,")
print("     la ancla se debilita. Es carrera armamentista — pero randomizar TODO,")
print("     siempre, es caro y también deja rastro. Sube mucho el costo de atacar.")
print("="*64)
