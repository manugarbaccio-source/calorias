"""Genera los íconos PNG de la PWA (plato con tenedor, fondo verde)."""
from PIL import Image, ImageDraw
import os

os.makedirs("icons", exist_ok=True)

for size in (192, 512):
    img = Image.new("RGB", (size, size), "#2e7d32")
    d = ImageDraw.Draw(img)
    s = size / 512  # escala

    # plato
    cx, cy = size / 2, size / 2
    r_plato = 170 * s
    r_centro = 105 * s
    d.ellipse([cx - r_plato, cy - r_plato, cx + r_plato, cy + r_plato],
              fill="#ffffff", outline="#e8f5e9", width=int(8 * s))
    d.ellipse([cx - r_centro, cy - r_centro, cx + r_centro, cy + r_centro],
              fill="#e8f5e9")

    # "comida": tres círculos sobre el plato
    d.ellipse([cx - 60*s, cy - 45*s, cx + 10*s, cy + 25*s], fill="#ef6c00")
    d.ellipse([cx + 0*s, cy - 10*s, cx + 65*s, cy + 55*s], fill="#66bb6a")
    d.ellipse([cx - 45*s, cy + 10*s, cx + 5*s, cy + 60*s], fill="#fdd835")

    img.save(f"icons/icon-{size}.png")
    print(f"icons/icon-{size}.png listo")
