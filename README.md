# 🍽️ Contador de Calorías

App personal para registrar lo que comés escribiéndolo en lenguaje natural
(ej: *"2 empanadas de carne y una coca"*) y llevar el recuento de calorías del día.

- **PWA**: se instala como ícono en el celular y en la PC.
- **Base de alimentos** con foco argentino (milanesas, empanadas, facturas, mate…) + tus alimentos propios.
- **Respaldo en Open Food Facts** para productos envasados que no estén en la base.
- **Datos en Supabase** (gratis) para ver lo mismo desde el celu y la PC. Si no lo configurás, guarda todo localmente en el navegador.

Es una app 100% estática: HTML + CSS + JS, sin build ni dependencias.

## Probarla en la PC

```powershell
cd C:\Users\egarbaccio\Documents\contador-calorias
python -m http.server 8123
```

y abrir <http://localhost:8123>.

## Configurar Supabase (datos en la nube)

1. Crear cuenta gratis en [supabase.com](https://supabase.com) y crear un proyecto (elegí región `South America (São Paulo)`).
2. En el dashboard del proyecto: **SQL Editor → New query**, pegar el contenido de [`setup-supabase.sql`](setup-supabase.sql) y **Run**.
3. En **Project Settings → API** copiar:
   - **Project URL** (algo como `https://xxxx.supabase.co`)
   - **anon public** key
4. En la app, ir a **Ajustes → Supabase**, pegar ambos valores y tocar **Conectar**.
5. Si ya habías cargado comidas en modo local, tocá **"Subir datos locales a la nube"**.

> ⚠️ La app usa la clave `anon` sin login: cualquiera que tenga la URL del proyecto
> **y** la clave podría leer/escribir tus datos. Para uso personal alcanza con no
> compartirlas; no publiques la app en un lugar público con las claves precargadas.

## Publicarla para usarla desde el celular

Cualquier hosting estático gratis sirve. El más simple:

**Netlify Drop**: entrar a [app.netlify.com/drop](https://app.netlify.com/drop) y arrastrar la carpeta
del proyecto. Te da una URL `https://xxxx.netlify.app`.

Alternativas: Vercel, GitHub Pages, Cloudflare Pages.

Después, desde el celular: abrir la URL en Chrome → menú ⋮ → **"Agregar a pantalla de inicio"**.
En cada dispositivo hay que pegar la URL y clave de Supabase una vez, en Ajustes.

## Cómo funciona el análisis de texto

1. Separa lo que escribiste por comas, "y" y "+".
2. Detecta cantidades ("2", "una", "media docena").
3. Busca cada ítem en tus alimentos propios y en la base local (`foods.js`).
4. Si algo no aparece, ofrece buscarlo en Open Food Facts o cargarlo a mano.
5. Antes de guardar podés corregir el alimento elegido y los gramos.

Las calorías de la base son **estimaciones promedio** — sirven para llevar un registro
diario, no para precisión de laboratorio.

## Menú del trabajo

`menu-trabajo.js` tiene los platos del catering del trabajo (Food Service). Las calorías
son fijas por categoría (Plato Principal ≈850, Light ≈700, etc. — verificado en la web),
así que **solo hay que actualizar los nombres de los platos cuando cambia la semana**:
pasarle a Claude el PDF nuevo de "Ingredientes por Plato" y pedirle que actualice el menú.

En la app podés escribir el plato por nombre ("bondiola con ciruelas"), por categoría
("plato principal", "el light", "wok") — y el plato de HOY aparece primero.
El campo de gramos en estos platos es porcentaje de la porción: 100 = plato entero, 50 = la mitad.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` / `styles.css` / `app.js` | La app |
| `foods.js` | Base de ~130 alimentos comunes (editable) |
| `setup-supabase.sql` | Script para crear las tablas en Supabase |
| `manifest.webmanifest` / `sw.js` / `icons/` | Lo que la hace instalable (PWA) |
| `gen_icons.py` | Script que generó los íconos (no hace falta correrlo de nuevo) |
