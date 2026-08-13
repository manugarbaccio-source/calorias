# -*- coding: utf-8 -*-
"""Parsea los PDFs del menú de Food Service (ambos formatos) y genera
el array PLATOS_TRABAJO para menu-trabajo.js."""
import json
import re
import sys
import unicodedata
from pypdf import PdfReader

CANONICAS = [
    "Plato Vegano Gourmet", "Tortilla y Omelette", "Hamburguesa Especial",
    "Plato Principal 2", "Ensalada Gourmet", "Opcion Milanesa", "VAMOS CAMPEONES",
    "Plato Principal", "Dieta (sin sal)", "Hipernutritivo", "Healthy Food",
    "Ensalada SAP", "Plato Veggie", "Wok Gourmet", "Wrap Gourmet", "Plato Light",
    "Plato Etnico", "Vegetariano", "Sandwich", "Tarta", "Pizza", "Pasta", "Show",
]

def norm(s):
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if not unicodedata.combining(c))
    return re.sub(r"\s+", " ", s).strip().lower()

NORM_A_CANONICA = {norm(c): c for c in CANONICAS}
MESES = {m: i + 1 for i, m in enumerate(
    ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
     "agosto", "septiembre", "octubre", "noviembre", "diciembre"])}

DIA_A = re.compile(r"^(Lunes|Martes|Mi[eé]rcoles|Jueves|Viernes|S[aá]bado|Domingo)\s*[—–-]+\s*(\d{2})/(\d{2})/(\d{4})")
DIA_B = re.compile(r"^(lunes|martes|miercoles|jueves|viernes|sabado|domingo)\s*,\s*(\d{1,2}) de ([a-z]+) de (\d{4})")
CAL_FIN = re.compile(r"\s*\d+(?:\s*-\s*\d+)?\s*cal\.?\s*$", re.IGNORECASE)

platos = {}  # (nombre, cat) -> set de fechas

def registrar(nombre, cat, fecha):
    nombre = re.sub(r"\s+", " ", nombre).strip().rstrip(".").rstrip(",")
    if not nombre:
        return
    nombre = nombre[0].upper() + nombre[1:]
    platos.setdefault((nombre, cat), set()).add(fecha)

for pdf in sys.argv[1:]:
    reader = PdfReader(pdf)
    lineas = []
    for p in reader.pages:
        lineas.extend((p.extract_text() or "").split("\n"))
    fecha = None
    i = 0
    while i < len(lineas):
        linea = lineas[i].strip()
        m = DIA_A.match(linea)
        if m:
            fecha = f"{m.group(4)}-{m.group(3)}-{m.group(2)}"
            i += 1
            continue
        m = DIA_B.match(norm(linea))
        if m:
            fecha = f"{m.group(4)}-{MESES[m.group(3)]:02d}-{int(m.group(2)):02d}"
            i += 1
            continue
        # formato B: la categoría sola en una línea
        cat = NORM_A_CANONICA.get(norm(linea))
        if cat and fecha:
            j = i + 1
            acumulado = ""
            while j < len(lineas):
                acumulado = (acumulado + " " + lineas[j].strip()).strip()
                if CAL_FIN.search(acumulado):
                    registrar(CAL_FIN.sub("", acumulado), cat, fecha)
                    break
                if NORM_A_CANONICA.get(norm(lineas[j].strip())) or DIA_B.match(norm(lineas[j].strip())):
                    break  # formato inesperado, no arrastrar
                j += 1
            i = j + 1
            continue
        # formato A: "Categoria Nombre del plato" y luego "Ingredientes:"
        catA = next((c for c in CANONICAS if linea.startswith(c + " ")), None)
        if catA and fecha:
            nombre = linea[len(catA):].strip()
            j = i + 1
            while j < len(lineas) and not lineas[j].strip().startswith("Ingredientes"):
                nombre += " " + lineas[j].strip()
                j += 1
            registrar(nombre, catA, fecha)
            i = j
        i += 1

# Dieta (sin sal) suele repetir el plato de Healthy Food: fusionar
finales = {}
for (nombre, cat), fechas in platos.items():
    if cat == "Dieta (sin sal)" and (nombre, "Healthy Food") in platos:
        continue
    finales.setdefault((nombre, cat), set()).update(fechas)

filas = sorted(finales.items(), key=lambda kv: (min(kv[1]), CANONICAS.index(kv[0][1]) if kv[0][1] in CANONICAS else 99))
out = []
for (nombre, cat), fechas in filas:
    ds = ", ".join(f'"{f}"' for f in sorted(fechas))
    out.append('  { n: "%s", cat: "%s", d: [%s] },' % (nombre.replace('"', "'"), cat, ds))

todas = [f for fs in finales.values() for f in fs]
print(f"// {len(out)} platos · semanas del {min(todas)} al {max(todas)} · generado por parse_menus.py")
print("\n".join(out))
