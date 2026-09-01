#!/usr/bin/env python3
"""Sube la versión de la app en TODOS los lugares de una sola vez.

Uso: python bump.py        -> incrementa en 1
     python bump.py 25     -> fija la versión 25
"""
import json
import re
import sys

actual = json.load(open("version.json", encoding="utf-8"))["v"]
nueva = int(sys.argv[1]) if len(sys.argv) > 1 else actual + 1

src = open("index.html", encoding="utf-8").read()
open("index.html", "w", encoding="utf-8").write(re.sub(r"\?v=\d+", f"?v={nueva}", src))

src = open("sw.js", encoding="utf-8").read()
src = re.sub(r"\?v=\d+", f"?v={nueva}", src)
src = re.sub(r"calorias-v\d+", f"calorias-v{nueva}", src)
open("sw.js", "w", encoding="utf-8").write(src)

src = open("app.js", encoding="utf-8").read()
open("app.js", "w", encoding="utf-8").write(re.sub(r"APP_VERSION = \d+", f"APP_VERSION = {nueva}", src))

json.dump({"v": nueva}, open("version.json", "w", encoding="utf-8"))
print(f"versión {actual} -> {nueva} en index.html, sw.js, app.js y version.json")
