#!/usr/bin/env python3
"""Ventana simple para conectar Garmin (sin terminal).

Pide email y contraseña en campos normales, maneja el código MFA si hace falta,
guarda los tokens y prueba la sincronización. La contraseña nunca se guarda.
"""
import threading
import tkinter as tk
from tkinter import simpledialog

import sync as sincronizador
from garminconnect import Garmin

ventana = tk.Tk()
ventana.title("Conectar Garmin")
ventana.geometry("420x260")
ventana.resizable(False, False)

tk.Label(ventana, text="Conectar con Garmin", font=("Segoe UI", 14, "bold")).pack(pady=(14, 2))
tk.Label(ventana, text="Se hace una sola vez. La contraseña no se guarda.",
         font=("Segoe UI", 9), fg="#666").pack()

marco = tk.Frame(ventana)
marco.pack(pady=10)
tk.Label(marco, text="Email:", font=("Segoe UI", 10)).grid(row=0, column=0, sticky="e", padx=6, pady=4)
campo_email = tk.Entry(marco, width=32, font=("Segoe UI", 10))
campo_email.grid(row=0, column=1, pady=4)
tk.Label(marco, text="Contraseña:", font=("Segoe UI", 10)).grid(row=1, column=0, sticky="e", padx=6, pady=4)
campo_pass = tk.Entry(marco, width=32, font=("Segoe UI", 10), show="•")
campo_pass.grid(row=1, column=1, pady=4)

estado = tk.Label(ventana, text="", font=("Segoe UI", 10), wraplength=380, justify="center")
estado.pack(pady=4)


def conectar():
    email = campo_email.get().strip()
    password = campo_pass.get()
    if not email or not password:
        estado.config(text="Completá email y contraseña.", fg="#c62828")
        return
    boton.config(state="disabled")
    estado.config(text="Conectando con Garmin…", fg="#555")

    def trabajo():
        try:
            g = Garmin(email=email, password=password, return_on_mfa=True)
            res1, res2 = g.login()
            if res1 == "needs_mfa":
                codigo = None
                def pedir():
                    nonlocal codigo
                    codigo = simpledialog.askstring(
                        "Código de verificación",
                        "Garmin te mandó un código (revisá tu mail).\nEscribilo acá:",
                        parent=ventana)
                ventana.after(0, pedir)
                while codigo is None:
                    ventana.update()
                g.resume_login(res2, codigo.strip())
            sincronizador.guardar_tokens(g)
            ventana.after(0, lambda: estado.config(text="✓ Conectado. Probando sincronización…", fg="#2e7d32"))
            sincronizador.sync()
            ventana.after(0, lambda: estado.config(
                text="✓ ¡Listo! Tus pasos ya se están sincronizando.\nPodés cerrar esta ventana.", fg="#2e7d32"))
        except Exception as e:
            mensaje = str(e) or type(e).__name__
            ventana.after(0, lambda: estado.config(text="✗ Error: " + mensaje, fg="#c62828"))
            ventana.after(0, lambda: boton.config(state="normal"))

    threading.Thread(target=trabajo, daemon=True).start()


boton = tk.Button(ventana, text="Conectar", font=("Segoe UI", 11, "bold"),
                  bg="#2e7d32", fg="white", width=16, command=conectar)
boton.pack(pady=8)
campo_pass.bind("<Return>", lambda e: conectar())

ventana.mainloop()
