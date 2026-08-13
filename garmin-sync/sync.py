#!/usr/bin/env python3
"""Sincroniza pasos y calorías quemadas de Garmin Connect hacia Supabase.

Uso:
  python sync.py login   -> login interactivo (UNA sola vez; guarda tokens locales)
  python sync.py         -> sincroniza hoy y ayer usando los tokens guardados

Los tokens quedan en ~/.garmin_tokens (fuera del repo). La contraseña nunca se guarda.
"""
import datetime
import json
import os
import sys

import requests
from garminconnect import Garmin

BASE = os.path.dirname(os.path.abspath(__file__))
CFG = json.load(open(os.path.join(BASE, "config.json"), encoding="utf-8"))
TOKENS = os.path.expanduser(CFG.get("token_dir", "~/.garmin_tokens"))


def login():
    import getpass
    email = input("Email de Garmin: ").strip()
    password = getpass.getpass("Contraseña de Garmin (no se guarda): ")
    g = Garmin(email=email, password=password, return_on_mfa=True)
    res1, res2 = g.login()
    if res1 == "needs_mfa":
        codigo = input("Código de verificación (MFA): ").strip()
        g.resume_login(res2, codigo)
    g.garth.dump(TOKENS)
    print("Login OK. Tokens guardados en", TOKENS)


def subir(filas):
    r = requests.post(
        CFG["supabase_url"] + "/rest/v1/actividad?on_conflict=fecha",
        json=filas,
        headers={
            "apikey": CFG["supabase_key"],
            "Authorization": "Bearer " + CFG["supabase_key"],
            "Content-Type": "application/json",
            "Prefer": "resolution=merge-duplicates",
        },
        timeout=30,
    )
    r.raise_for_status()


def sync():
    g = Garmin()
    try:
        g.login(TOKENS)  # tokens guardados (local o cache de Actions)
    except Exception:
        email = os.environ.get("GARMIN_EMAIL")
        password = os.environ.get("GARMIN_PASSWORD")
        if not (email and password):
            raise
        g = Garmin(email=email, password=password, return_on_mfa=True)
        res1, res2 = g.login()
        if res1 == "needs_mfa":
            raise SystemExit("La cuenta de Garmin tiene verificación en dos pasos: "
                             "desactivala o usá el login interactivo.")
        g.garth.dump(TOKENS)
        print("Login nuevo OK, tokens guardados.")
    filas = []
    for delta in (0, 1):  # hoy y ayer (por si el reloj sincronizó tarde)
        fecha = (datetime.date.today() - datetime.timedelta(days=delta)).isoformat()
        s = g.get_user_summary(cdate=fecha) or {}
        filas.append({
            "fecha": fecha,
            "pasos": s.get("totalSteps") or 0,
            "kcal_activas": s.get("activeKilocalories") or 0,
            "kcal_totales": s.get("totalKilocalories") or 0,
            "actualizado": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        })
    subir(filas)
    for f in filas:
        print(f"{f['fecha']}: {f['pasos']} pasos · {f['kcal_totales']} kcal quemadas")


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "login":
        login()
    else:
        sync()
