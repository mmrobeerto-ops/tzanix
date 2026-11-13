#!/usr/bin/env python3
# =============================================================================
#  tzanix_benchmark — EVALUACIÓN GRADO INSTITUCIONAL (5 señales, con TIEMPO)
#
#  Punta a punta con el parser real. Incluye DOS tipos de evasión:
#   - stealth (ingenuo): lento pero metronómico  -> la REGULARIDAD lo caza.
#   - stealth_smart (listo): imita a un humano en TODO (ritmo irregular, pocos
#     errores, 0 rutas sensibles, 1 UA) -> el límite honesto de la detección
#     por comportamiento. A estos no los caza el comportamiento solo; hacen
#     falta otras señales (reputación de IP, la red/mesh, inspección).
#
#  Métricas en un PUNTO DE OPERACIÓN real: umbral fijado para ~1% de falsos
#  positivos (presupuesto de FP), que es como se elige en producción.
# =============================================================================
import sys, os, time, random, statistics
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import tzanix_ml_demo as ml

def emit(f, ip, kind, rnd):
    r = rnd.random
    irregular = lambda: rnd.uniform(1,15) if r()<0.7 else rnd.uniform(60,600)
    if kind == "normal":
        n=rnd.randint(6,60); paths=ml.NORMALES; ep=rnd.uniform(0,0.28); cad=irregular
        ua=lambda: ml.UA_BROWSER if r()>0.04 else "Mozilla/5.0 (iPhone) Safari/605"; y=0
    elif kind == "crawler":
        n=rnd.randint(80,400); paths=ml.NORMALES; ep=rnd.uniform(0,0.05)
        cad=lambda: rnd.uniform(2,8); ua=lambda:"Googlebot/2.1"; y=0
    elif kind == "scanner":
        n=rnd.randint(90,180); paths=ml.SENSIBLES*4+ml.NORMALES; ep=rnd.uniform(0.6,0.9)
        cad=lambda: rnd.uniform(0.3,2); ua=lambda: rnd.choice(ml.UA_FAKES); y=1
    elif kind == "credstuff":
        n=rnd.randint(40,120); paths=["/wp-login.php","/admin","/wp-admin/","/"]
        ep=rnd.uniform(0.5,0.85); cad=lambda: rnd.uniform(1,5); ua=lambda: ml.UA_BROWSER; y=1
    elif kind == "stealth":               # ingenuo: lento pero metronómico
        n=rnd.randint(8,35); paths=ml.NORMALES*6+ml.SENSIBLES; ep=rnd.uniform(0.1,0.28)
        base=rnd.uniform(30,150); cad=lambda: base+rnd.uniform(-base*0.08, base*0.08)
        ua=lambda: ml.UA_BROWSER; y=1
    else:                                  # stealth_smart: imita a un humano en TODO
        n=rnd.randint(8,40); paths=ml.NORMALES*30+ml.SENSIBLES  # ~3% sensibles
        ep=rnd.uniform(0.03,0.15); cad=irregular; ua=lambda: ml.UA_BROWSER; y=1
    t = rnd.randint(0, 70000)
    for _ in range(n):
        st = rnd.choice([404,403]) if r() < ep else 200
        f.write(f'{ip} - - [{ml._ts(int(t))}] "GET {rnd.choice(paths)} HTTP/1.1" '
                f'{st} 512 "-" "{ua()}"\n')
        t += max(1, cad())
    return y

def generar(mezcla, seed, path):
    rnd = random.Random(seed); c=0; lab={}
    with open(path,"w") as f:
        orden=[k for k,n in mezcla.items() for _ in range(n)]; rnd.shuffle(orden)
        for kind in orden:
            c+=1; ip=f"{1+c//65536%200}.{c//256%256}.{c%256}.{1+c%254}"
            lab[ip]=(emit(f,ip,kind,rnd), kind)
    return lab

def evaluar(mezcla, seed):
    log=f"/tmp/tzb-{seed}.log"; lab=generar(mezcla,seed,log); random.seed(seed)
    ips,X,_=ml.extraer_features(log); tr,c=ml.train_forest(X)
    sc=[ml.anomaly_score(tr,c,x) for x in X]
    y=[lab[ip][0] for ip in ips]; kind=[lab[ip][1] for ip in ips]; os.remove(log)
    return ips,X,sc,y,kind

def roc_auc(sc,y):
    pos=[s for s,l in zip(sc,y) if l]; neg=[s for s,l in zip(sc,y) if not l]
    if not pos or not neg: return float("nan")
    pr=sorted(zip(sc,y)); ranks=[0.0]*len(pr); i=0
    while i<len(pr):
        j=i
        while j<len(pr) and pr[j][0]==pr[i][0]: j+=1
        for k in range(i,j): ranks[k]=(i+j-1)/2.0+1
        i=j
    sp=sum(rk for rk,(_,l) in zip(ranks,pr) if l)
    return (sp-len(pos)*(len(pos)+1)/2.0)/(len(pos)*len(neg))

def thr_para_fpr(sc,y,target=0.01):
    neg=sorted((s for s,l in zip(sc,y) if not l), reverse=True)
    if not neg: return 1.0
    return neg[min(int(target*len(neg)), len(neg)-1)]

def recall_at(sc,y,thr):
    tp=sum(1 for s,l in zip(sc,y) if l and s>=thr); P=sum(y)
    fp=sum(1 for s,l in zip(sc,y) if (not l) and s>=thr); N=len(y)-P
    return (tp/P if P else 0), (fp/N if N else 0)

print("="*70); print("   TZANIX · BENCHMARK GRADO INSTITUCIONAL — cerebro ML (5 señales)"); print("="*70)

mez={"normal":2000,"crawler":60,"scanner":70,"credstuff":40,"stealth":40,"stealth_smart":30}
ips,X,sc,y,kind=evaluar(mez,1)
auc=roc_auc(sc,y); thr=thr_para_fpr(sc,y,0.01); rec,fpr=recall_at(sc,y,thr)
print(f"\n[1] EXACTITUD · {len(y)} IPs · {sum(y)} atacantes ({100*sum(y)/len(y):.1f}% base)")
print(f"    ROC-AUC:                              {auc:.3f}")
print(f"    Punto de operación (~1% FP, umbral {thr:.2f}): recall {rec*100:.1f}% · FP real {fpr*100:.2f}%")

print(f"\n[2] RECALL POR TIPO (en ese punto de operación)")
for k in ("scanner","credstuff","stealth","stealth_smart"):
    idx=[i for i in range(len(kind)) if kind[i]==k]
    caz=sum(1 for i in idx if sc[i]>=thr)
    print(f"    {k:<14} {caz}/{len(idx)}  ({100*caz/max(len(idx),1):.0f}%)")

aucs=[]
for s in range(6):
    _,_,sci,yi,_=evaluar(mez,200+s); aucs.append(roc_auc(sci,yi))
print(f"\n[3] ESTABILIDAD · 6 corridas: ROC-AUC {statistics.mean(aucs):.3f} ± {statistics.pstdev(aucs):.3f} (min {min(aucs):.3f}, max {max(aucs):.3f})")

mez2={"normal":5000,"crawler":150,"scanner":30,"credstuff":20,"stealth":20,"stealth_smart":15}
_,_,s2,y2,k2=evaluar(mez2,7); thr2=thr_para_fpr(s2,y2,0.01); r2,f2=recall_at(s2,y2,thr2)
print(f"\n[4] TASA BASE REALISTA · {len(y2)} IPs · {100*sum(y2)/len(y2):.1f}% atacantes")
print(f"    ROC-AUC {roc_auc(s2,y2):.3f} · @1%FP: recall {r2*100:.1f}% · FP real {f2*100:.2f}%")

print(f"\n[5] RENDIMIENTO")
big="/tmp/tzb-big.log"; generar({"normal":8000,"crawler":200,"scanner":300,"credstuff":200,"stealth":300}, 0, big)
nlines=sum(1 for _ in open(big))
t0=time.time(); ips,X,_=ml.extraer_features(big); tp=time.time()-t0
t0=time.time(); tr,c=ml.train_forest(X); tt=time.time()-t0
t0=time.time(); [ml.anomaly_score(tr,c,x) for x in X]; ts=time.time()-t0
tot=tp+tt+ts; os.remove(big)
print(f"    {nlines:,} líneas · {len(X):,} IPs · total {tot:.2f}s · {int(nlines/tot):,} líneas/seg")

print("\n"+"="*70); print("   VEREDICTO HONESTO"); print("="*70)
sr=lambda k:100*sum(1 for i in range(len(kind)) if kind[i]==k and sc[i]>=thr)/max(sum(1 for z in kind if z==k),1)
print(f"   • AUC ~{statistics.mean(aucs):.2f}. Escáneres y fuerza bruta: ~100%.")
print(f"   • Sigiloso INGENUO (metronómico): {sr('stealth'):.0f}% — la REGULARIDAD lo caza (antes 48%).")
print(f"   • Sigiloso LISTO (imita humano): {sr('stealth_smart'):.0f}% — se nos escapa.")
print("     Honesto: al que se porta igual que un humano NO lo caza el comportamiento")
print("     solo. Ahí entran la reputación de IP, la RED (mesh) y la inspección profunda.")
print("="*70)
