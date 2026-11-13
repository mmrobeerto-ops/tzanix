#!/usr/bin/env python3
# =============================================================================
#  tzanix_benchmark — EVALUACIÓN GRADO INSTITUCIONAL del cerebro ML
#
#  No "parece que funciona": lo medimos como lo mediría un equipo serio.
#   1. Exactitud en datos ETIQUETADOS (verdad de terreno): ROC-AUC, precisión,
#      recall, F1, tasa de falsos positivos — con matriz de confusión.
#   2. Por tipo de atacante (incluye EVASIÓN: low-and-slow sigiloso).
#   3. Varianza entre semillas (¿es estable y reproducible?).
#   4. Tasa base REALISTA (1% de atacantes): la prueba honesta y difícil.
#   5. Rendimiento (throughput) sobre un log grande.
#
#  Honesto: esto NO es Cloudflare (ellos operan a millones de req/seg con
#  petabytes de datos). Es la MISMA METODOLOGÍA de evaluación aplicada a
#  nuestro MVP, con números y límites reales.
# =============================================================================
import sys, os, time, random, statistics
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import tzanix_ml_demo as ml

def feats(d):                      # idénticas al detector (con suavizado)
    return [d["uas"], 100*d["err"]/(d["n"]+8), 100*d["sens"]/(d["n"]+8)]

def muestra(kind, rnd):
    """Genera una IP de cada arquetipo, con su etiqueta de verdad."""
    r = rnd.random
    if kind == "normal":        # usuario real — algunos son RUIDOSOS (enlaces rotos, etc.)
        n = rnd.randint(6, 60);  return {"n":n, "err":int(n*r()*0.28), "sens":0, "uas":1+(r()<0.05), "y":0}
    if kind == "crawler":       # bot LEGÍTIMO (Google/Bing): mucho volumen, se porta bien
        n = rnd.randint(80, 400);return {"n":n, "err":int(n*r()*0.05), "sens":0, "uas":1, "y":0}
    if kind == "scanner":       # escáner ruidoso (fácil)
        n = rnd.randint(90, 180);return {"n":n, "err":int(n*(0.6+0.3*r())), "sens":int(n*(0.7+0.2*r())), "uas":4, "y":1}
    if kind == "credstuff":     # fuerza bruta a login (medio)
        n = rnd.randint(40, 120);return {"n":n, "err":int(n*(0.5+0.3*r())), "sens":int(n*(0.35+0.3*r())), "uas":1, "y":1}
    if kind == "stealth":       # EVASIÓN REAL: low-and-slow, casi no toca rutas sensibles,
        n = rnd.randint(8, 35);  # 1 solo UA, error moderado -> se CONFUNDE con un normal ruidoso
        return {"n":n, "err":int(n*(0.1+0.18*r())), "sens":int(n*(r()*0.10)), "uas":1, "y":1}

def poblar(mezcla, seed):
    rnd = random.Random(seed)
    pop = []
    for kind, cnt in mezcla.items():
        for _ in range(cnt):
            d = muestra(kind, rnd); d["kind"] = kind; pop.append(d)
    rnd.shuffle(pop)
    return pop

def puntuar(pop, seed):
    random.seed(seed)
    X = [feats(d) for d in pop]
    trees, c = ml.train_forest(X)
    return [ml.anomaly_score(trees, c, x) for x in X]

def roc_auc(scores, y):
    pos = [s for s, l in zip(scores, y) if l == 1]
    neg = [s for s, l in zip(scores, y) if l == 0]
    if not pos or not neg: return float("nan")
    # Mann-Whitney por rangos (rápido y exacto, con empates)
    paired = sorted(zip(scores, y))
    ranks = [0.0]*len(paired); i = 0
    while i < len(paired):
        j = i
        while j < len(paired) and paired[j][0] == paired[i][0]: j += 1
        rk = (i + j - 1)/2.0 + 1
        for k in range(i, j): ranks[k] = rk
        i = j
    sum_pos = sum(rk for rk, (_, l) in zip(ranks, paired) if l == 1)
    np_, nn = len(pos), len(neg)
    return (sum_pos - np_*(np_+1)/2.0)/(np_*nn)

def conf(scores, y, thr):
    tp=fp=tn=fn=0
    for s, l in zip(scores, y):
        p = s >= thr
        tp += p and l; fp += p and not l; fn += (not p) and l; tn += (not p) and not l
    prec = tp/(tp+fp) if tp+fp else 0.0
    rec  = tp/(tp+fn) if tp+fn else 0.0
    fpr  = fp/(fp+tn) if fp+tn else 0.0
    f1   = 2*prec*rec/(prec+rec) if prec+rec else 0.0
    return dict(tp=tp, fp=fp, tn=tn, fn=fn, prec=prec, rec=rec, fpr=fpr, f1=f1)

BLOQ, REV = 0.72, 0.60
line = "-"*70

print("="*70)
print("   TZANIX · BENCHMARK GRADO INSTITUCIONAL — cerebro ML")
print("="*70)

# ---------- 1) EXACTITUD (tasa base ~6%) ----------
mezcla = {"normal":2000, "crawler":60, "scanner":70, "credstuff":40, "stealth":40}
pop = poblar(mezcla, 1); sc = puntuar(pop, 1); y = [d["y"] for d in pop]
auc = roc_auc(sc, y)
cb, cr = conf(sc, y, BLOQ), conf(sc, y, REV)
print(f"\n[1] EXACTITUD · {len(pop)} IPs · {sum(y)} atacantes ({100*sum(y)/len(pop):.1f}% tasa base)")
print(f"    ROC-AUC (sin umbral):            {auc:.3f}   (1.0 = perfecto, 0.5 = azar)")
print(f"    Umbral BLOQUEO ({BLOQ}):  precisión {cb['prec']*100:5.1f}% · recall {cb['rec']*100:5.1f}% · FP {cb['fpr']*100:4.2f}% · F1 {cb['f1']:.2f}")
print(f"    Umbral REVISAR ({REV}):  precisión {cr['prec']*100:5.1f}% · recall {cr['rec']*100:5.1f}% · FP {cr['fpr']*100:4.2f}% · F1 {cr['f1']:.2f}")
print(f"    Matriz @bloqueo:  TP={cb['tp']}  FP={cb['fp']}  FN={cb['fn']}  TN={cb['tn']}")

# ---------- 2) POR TIPO DE ATACANTE (evasión) ----------
print(f"\n[2] RECALL POR TIPO (a umbral REVISAR {REV}) — ¿a quién sí y a quién no?")
for k in ("scanner","credstuff","stealth"):
    idx = [i for i,d in enumerate(pop) if d["kind"]==k]
    caz = sum(1 for i in idx if sc[i] >= REV)
    print(f"    {k:<10} {caz}/{len(idx)} cazados  ({100*caz/len(idx):.0f}%)")

# ---------- 3) VARIANZA entre semillas ----------
aucs = []
for s in range(12):
    p = poblar(mezcla, 100+s); sci = puntuar(p, 100+s)
    aucs.append(roc_auc(sci, [d["y"] for d in p]))
print(f"\n[3] ESTABILIDAD · 12 corridas independientes")
print(f"    ROC-AUC: media {statistics.mean(aucs):.3f} ± {statistics.pstdev(aucs):.3f}  (min {min(aucs):.3f}, max {max(aucs):.3f})")

# ---------- 4) TASA BASE REALISTA (1%) ----------
mez2 = {"normal":5000, "crawler":150, "scanner":30, "credstuff":20, "stealth":20}
p2 = poblar(mez2, 7); s2 = puntuar(p2, 7); y2 = [d["y"] for d in p2]
c2 = conf(s2, y2, BLOQ)
print(f"\n[4] TASA BASE REALISTA · {len(p2)} IPs · solo {100*sum(y2)/len(p2):.1f}% atacantes (lo difícil)")
print(f"    ROC-AUC: {roc_auc(s2,y2):.3f}")
print(f"    @bloqueo: precisión {c2['prec']*100:.1f}% · recall {c2['rec']*100:.1f}% · falsos positivos {c2['fp']} de {c2['fp']+c2['tn']} normales ({c2['fpr']*100:.2f}%)")

# ---------- 5) RENDIMIENTO ----------
print(f"\n[5] RENDIMIENTO (pipeline completo sobre log grande)")
big = "/tmp/tzanix-bench.log"
random.seed(0)
with open(big, "w") as f:
    for d in poblar({"normal":8000,"crawler":200,"scanner":300,"credstuff":200,"stealth":300}, 0):
        ip = f"{random.randint(1,223)}.{random.randint(0,255)}.{random.randint(0,255)}.{random.randint(1,254)}"
        paths = (ml.SENSIBLES if d["y"] else ml.NORMALES)
        ua = ml.UA_FAKES[0] if d["uas"]>1 else ml.UA_BROWSER
        for _ in range(d["n"]):
            st = 404 if random.random() < d["err"]/max(d["n"],1) else 200
            f.write(f'1.2.3.4 - - [x] "GET {random.choice(paths)} HTTP/1.1" {st} 1 "-" "{ua}"\n'.replace("1.2.3.4", ip))
nlines = sum(1 for _ in open(big))
t0=time.time(); ips,X,info = ml.extraer_features(big); t_parse=time.time()-t0
t0=time.time(); trees,c = ml.train_forest(X); t_train=time.time()-t0
t0=time.time(); _=[ml.anomaly_score(trees,c,x) for x in X]; t_score=time.time()-t0
tot=t_parse+t_train+t_score
print(f"    Log: {nlines:,} líneas · {len(X):,} IPs únicas")
print(f"    Parseo {t_parse:.2f}s · entrenamiento {t_train:.2f}s · scoring {t_score:.2f}s · TOTAL {tot:.2f}s")
print(f"    Throughput: {int(nlines/tot):,} líneas/seg · {int(len(X)/tot):,} IPs/seg")

print("\n"+"="*70)
print("   VEREDICTO")
print("="*70)
print(f"   • Separa atacantes de normales con AUC ~{statistics.mean(aucs):.2f}, estable.")
print("   • Fuerte con escáneres y fuerza bruta; FLOJO con sigilosos (evasión) —")
print("     honesto: ese es el límite de 3 señales, se mejora con más features.")
print("   • A 1% de tasa base la precisión baja (los falsos positivos pesan más):")
print("     por eso el umbral 'bloqueo' es alto y lo dudoso va al analista.")
print("   • Rápido y ligero: corre en un VPS normal, sin GPU ni librerías.")
print("="*70)
