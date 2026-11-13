#!/usr/bin/env python3
# Prueba de ESCALA: ¿el foso se hace más fuerte mientras crece la red?
# (Esto es lo que convierte al efecto de red en un FOSO real.)
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import sim_mesh as S

print("=" * 56)
print("   ¿El foso se profundiza al crecer la red? (K=3 fijo)")
print("=" * 56)
print(f"   {'Clientes':>9} | {'Daño sin':>9} | {'Daño con':>9} | {'Protección':>10}")
print("   " + "-" * 48)
for n in [3, 5, 10, 25, 50, 100, 500]:
    S.N_SERVERS = n
    S.ONEOFF = [f"203.0.113.{i}" for i in range(n)]  # reconstruir para n
    _, _, dano_sin = S.correr(usar_foso=False)
    _, _, dano_con = S.correr(usar_foso=True)
    pct = 100 * (dano_sin - dano_con) / dano_sin if dano_sin else 0
    print(f"   {n:>9} | {dano_sin:>9,} | {dano_con:>9,} | {pct:>9.0f}%")
print("   " + "-" * 48)
print("   Los primeros K=3 clientes 'aprenden a la mala'; todos los")
print("   demás ya nacen protegidos. Más clientes = mayor % protegido.")
print("   Un competidor nuevo (sin red) empieza siempre en 0%. Ese es el foso.")
