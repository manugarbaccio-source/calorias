/* ══════════════════ utilidades ══════════════════ */

function normalizar(s) {
  return s.toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9ñ\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hoyStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function fechaLinda(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const f = new Date(y, m - 1, d);
  const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const hoy = hoyStr();
  if (iso === hoy) return "Hoy";
  const ayer = new Date(); ayer.setDate(ayer.getDate() - 1);
  const ayerStr = `${ayer.getFullYear()}-${String(ayer.getMonth() + 1).padStart(2, "0")}-${String(ayer.getDate()).padStart(2, "0")}`;
  if (iso === ayerStr) return "Ayer";
  return `${dias[f.getDay()]} ${d}/${m}`;
}

function uuid() {
  return crypto.randomUUID ? crypto.randomUUID()
    : "xxxx-xxxx-xxxx".replace(/x/g, () => Math.floor(Math.random() * 16).toString(16));
}

/* ══════════════════ configuración ══════════════════ */

const config = JSON.parse(localStorage.getItem("cc_config") || "{}");

function guardarConfig() {
  localStorage.setItem("cc_config", JSON.stringify(config));
}

/* ══════════════════ almacenamiento ══════════════════ */

const StoreLocal = {
  nombre: "local",
  _leer(k) { return JSON.parse(localStorage.getItem(k) || "[]"); },
  _escribir(k, v) { localStorage.setItem(k, JSON.stringify(v)); },
  async listarAlimentos() { return this._leer("cc_foods"); },
  async agregarAlimento(f) {
    const arr = this._leer("cc_foods"); arr.push(f); this._escribir("cc_foods", arr);
  },
  async borrarAlimento(id) {
    this._escribir("cc_foods", this._leer("cc_foods").filter(f => f.id !== id));
  },
  async listarComidas() { return this._leer("cc_entries"); },
  async agregarComidas(arr) {
    const todas = this._leer("cc_entries"); todas.push(...arr); this._escribir("cc_entries", todas);
  },
  async borrarComida(id) {
    this._escribir("cc_entries", this._leer("cc_entries").filter(e => e.id !== id));
  },
  async actualizarComida(id, campos) {
    const arr = this._leer("cc_entries");
    const i = arr.findIndex(e => e.id === id);
    if (i !== -1) { Object.assign(arr[i], campos); this._escribir("cc_entries", arr); }
  },
};

const StoreSupabase = {
  nombre: "nube",
  async _fetch(path, opts = {}) {
    const res = await fetch(`${config.supabaseUrl}/rest/v1/${path}`, {
      ...opts,
      headers: {
        apikey: config.supabaseKey,
        Authorization: `Bearer ${config.supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
        ...(opts.headers || {}),
      },
    });
    if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
    const texto = await res.text();
    return texto ? JSON.parse(texto) : null;
  },
  async listarAlimentos() { return this._fetch("alimentos?select=*&order=nombre"); },
  async agregarAlimento(f) { await this._fetch("alimentos", { method: "POST", body: JSON.stringify(f) }); },
  async borrarAlimento(id) { await this._fetch(`alimentos?id=eq.${id}`, { method: "DELETE" }); },
  async listarComidas() { return this._fetch("comidas?select=*&order=fecha.desc,creado.desc&limit=1000"); },
  async agregarComidas(arr) { await this._fetch("comidas", { method: "POST", body: JSON.stringify(arr) }); },
  async borrarComida(id) { await this._fetch(`comidas?id=eq.${id}`, { method: "DELETE" }); },
  async actualizarComida(id, campos) { await this._fetch(`comidas?id=eq.${id}`, { method: "PATCH", body: JSON.stringify(campos) }); },
};

function storeActivo() {
  return (config.supabaseUrl && config.supabaseKey) ? StoreSupabase : StoreLocal;
}

/* ══════════════════ parser de texto ══════════════════ */

const NUMEROS = {
  un: 1, uno: 1, una: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5,
  seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10, doce: 12,
  medio: 0.5, media: 0.5, docena: 12,
};
const RELLENO = new Set(["de", "del", "el", "la", "los", "las", "al", "a", "en", "con", "sin", "poco", "poquito", "plato", "porcion", "pedazo", "trozo", "unos", "unas"]);

function extraerCantidad(texto) {
  let cantidad = 1;
  let resto = texto;
  const mNum = resto.match(/^(\d+(?:[.,]\d+)?)\s+/);
  if (mNum) {
    cantidad = parseFloat(mNum[1].replace(",", "."));
    resto = resto.slice(mNum[0].length);
  } else {
    const mDocena = resto.match(/^media docena (?:de )?/);
    if (mDocena) { cantidad = 6; resto = resto.slice(mDocena[0].length); }
    else {
      const mPalabra = resto.match(/^([a-zñ]+)\s+/);
      if (mPalabra && NUMEROS[mPalabra[1]] !== undefined) {
        // "media palta" es 0.5 palta, pero "media luna" es un alimento: solo si el resto matchea algo
        cantidad = NUMEROS[mPalabra[1]];
        resto = resto.slice(mPalabra[0].length);
        if (mPalabra[1] === "docena") { cantidad = 12; resto = resto.replace(/^de\s+/, ""); }
      }
    }
  }
  return { cantidad, query: resto.trim() };
}

function parsearEntrada(texto) {
  // dividir ANTES de normalizar: normalizar() borra las comas
  const segmentos = texto.toLowerCase()
    .split(/\s*[,;+]\s*|\s+y\s+/)
    .map(normalizar)
    .filter(Boolean);
  const items = [];
  for (const seg of segmentos) {
    const { cantidad, query } = extraerCantidad(seg);
    if (!query) continue;
    if (query.includes(" con ")) {
      // "cafe con leche" es UN alimento; "milanesa con pure" son DOS.
      // Solo lo dejamos entero si el alimento que matchea también lleva "con" en el nombre.
      const candidatos = buscarCandidatos(query);
      const idxCon = candidatos.findIndex(c => c.puntaje >= 55 &&
        [c.alimento.n, ...(c.alimento.a || [])].some(x => normalizar(x).includes(" con ")));
      if (idxCon !== -1) {
        items.push({ original: seg, cantidad, query, candidatos, elegido: idxCon });
        continue;
      }
      for (const parte of query.split(" con ")) {
        const sub = extraerCantidad(parte.trim());
        if (!sub.query) continue;
        items.push({ original: sub.query, cantidad: cantidad * sub.cantidad, query: sub.query, candidatos: buscarCandidatos(sub.query) });
      }
    } else {
      items.push({ original: seg, cantidad, query, candidatos: buscarCandidatos(query) });
    }
  }
  return items;
}

/* ══════════════════ buscador de alimentos ══════════════════ */

let misAlimentos = []; // alimentos propios del usuario (cache)

function todosLosAlimentos() {
  return [
    ...misAlimentos.map(f => ({ n: f.nombre, a: [], k: f.kcal100, p: f.porcion, u: f.unidad || "1 porción", propio: true, id: f.id })),
    ...(typeof ALIMENTOS_TRABAJO !== "undefined" ? ALIMENTOS_TRABAJO : []),
    ...BASE_ALIMENTOS,
  ];
}

function singular(tok) { return tok.length > 3 ? tok.replace(/(es|s)$/, "") : tok; }

function puntuarNombre(nombreNorm, queryNorm) {
  if (nombreNorm === queryNorm) return 100;
  if (nombreNorm.startsWith(queryNorm) || queryNorm.startsWith(nombreNorm)) return 80;
  if (nombreNorm.includes(queryNorm) || queryNorm.includes(nombreNorm)) return 65;
  const tq = queryNorm.split(" ").filter(t => !RELLENO.has(t)).map(singular);
  const tn = nombreNorm.split(" ").filter(t => !RELLENO.has(t)).map(singular);
  if (!tq.length || !tn.length) return 0;
  const comunes = tq.filter(t => tn.includes(t)).length;
  return Math.round(55 * comunes / Math.max(tq.length, 1)) * (comunes ? 1 : 0);
}

function buscarCandidatos(query) {
  const q = normalizar(query);
  const resultados = [];
  for (const alim of todosLosAlimentos()) {
    let mejor = puntuarNombre(normalizar(alim.n), q);
    for (const alias of (alim.a || [])) {
      mejor = Math.max(mejor, puntuarNombre(normalizar(alias), q));
    }
    if (alim.propio && mejor > 0) mejor += 5; // priorizar alimentos propios
    if (alim.trabajo && mejor > 0 && alim.dias && alim.dias.includes(hoyStr())) mejor += 12; // el plato de HOY del trabajo primero
    if (mejor >= 30) resultados.push({ alimento: alim, puntaje: mejor });
  }
  resultados.sort((a, b) => b.puntaje - a.puntaje);
  return resultados.slice(0, 6);
}

/* ══════════════════ Open Food Facts (respaldo) ══════════════════ */

async function buscarOFF(query) {
  // world.openfoodfacts.org bloquea CORS en la búsqueda de texto libre;
  // el espejo .net la permite y sirve para estimaciones.
  const url = "https://world.openfoodfacts.net/cgi/search.pl?action=process&json=1&search_simple=1&page_size=6"
    + "&fields=product_name,product_name_es,brands,nutriments,quantity"
    + "&search_terms=" + encodeURIComponent(query);
  const res = await fetch(url);
  if (!res.ok) throw new Error("Open Food Facts no respondió");
  const data = await res.json();
  return (data.products || [])
    .map(p => {
      const kcal = p.nutriments && (p.nutriments["energy-kcal_100g"] ?? p.nutriments["energy-kcal"]);
      const nombre = p.product_name_es || p.product_name;
      if (!kcal || !nombre) return null;
      return {
        alimento: {
          n: `${nombre}${p.brands ? " (" + p.brands.split(",")[0] + ")" : ""}`,
          k: Math.round(kcal), p: 100, u: "100 g", a: [],
        },
        puntaje: 40,
      };
    })
    .filter(Boolean);
}

/* ══════════════════ estado y render ══════════════════ */

let pendientes = []; // ítems del análisis esperando confirmación
let comidasCache = [];

const $ = (sel) => document.querySelector(sel);

/* ── agua ── */
const AGUA_NOMBRE = "💧 Agua";
const esAgua = (c) => c.nombre === AGUA_NOMBRE;

function horaDe(c) {
  const d = new Date(c.creado);
  if (isNaN(d)) return "";
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function ahoraHHMM() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

/* ── actividad de Garmin (pasos y calorías quemadas) ── */
let actividadHoy = null;

async function cargarActividad() {
  if (storeActivo() !== StoreSupabase) return;
  try {
    const filas = await StoreSupabase._fetch(`actividad?fecha=eq.${hoyStr()}`);
    actividadHoy = (filas && filas[0]) || null;
  } catch { actividadHoy = null; }
  renderActividad();
}

function renderActividad() {
  const cont = $("#tarjeta-actividad");
  if (!cont) return;
  if (!actividadHoy || (!Number(actividadHoy.pasos) && !Number(actividadHoy.kcal_totales))) {
    cont.classList.add("oculto");
    return;
  }
  cont.classList.remove("oculto");
  const consumidas = Math.round(comidasCache.filter(c => c.fecha === hoyStr() && !esAgua(c)).reduce((s, c) => s + Number(c.kcal), 0));
  const quemadas = Math.round(Number(actividadHoy.kcal_totales));
  const balance = consumidas - quemadas;
  cont.innerHTML = `<span class="icono">👟</span><div>
    <p class="horas">${Number(actividadHoy.pasos).toLocaleString("es-AR")} pasos · 🔥 ${quemadas.toLocaleString("es-AR")} kcal quemadas</p>
    <p class="detalle-ayuno">Balance: ${consumidas} comidas − ${quemadas} quemadas = <b>${balance > 0 ? "+" : ""}${balance} kcal</b> · vía Garmin</p></div>`;
}

/* ── ayuno ── */
// El ayuno arranca en la última comida registrada DESPUÉS de las 19 hs (la cena).
// El agua no lo corta; cualquier comida posterior sí.
function renderAyuno() {
  const cont = $("#tarjeta-ayuno");
  const comidas = comidasCache.filter(c => !esAgua(c) && c.creado)
    .sort((a, b) => a.creado.localeCompare(b.creado));
  let cena = null;
  for (const c of comidas) {
    if (new Date(c.creado).getHours() >= 19) cena = c;
  }
  if (!cena) {
    cont.innerHTML = `<span class="icono">🌙</span><div>
      <p class="horas">Ayuno</p>
      <p class="detalle-ayuno">Registrá una comida después de las 19 hs para arrancar el contador</p></div>`;
    return;
  }
  const posteriores = comidas.filter(c => c.creado > cena.creado);
  const inicio = new Date(cena.creado);
  const fin = posteriores.length ? new Date(posteriores[0].creado) : new Date();
  const mins = Math.max(0, Math.floor((fin - inicio) / 60000));
  const h = Math.floor(mins / 60), m = mins % 60;
  const dur = `${h} h ${String(m).padStart(2, "0")} min`;
  const desde = `${horaDe(cena)}`;
  if (posteriores.length) {
    cont.innerHTML = `<span class="icono">🍳</span><div>
      <p class="horas">Ayunaste ${dur}</p>
      <p class="detalle-ayuno">De ${desde} (${cena.nombre}) a ${horaDe(posteriores[0])} (${posteriores[0].nombre})</p></div>`;
  } else {
    const trofeo = h >= 16 ? " 🏆" : (h >= 12 ? " 🔥" : "");
    const aviso = h >= 36 ? " · ¿te olvidaste de registrar alguna comida?" : "";
    cont.innerHTML = `<span class="icono">⏳</span><div>
      <p class="horas">${dur} de ayuno${trofeo}</p>
      <p class="detalle-ayuno">Desde las ${desde} (${cena.nombre})${aviso}</p></div>`;
  }
}
setInterval(renderAyuno, 60000); // se actualiza solo cada minuto

function renderAgua() {
  const objetivo = config.objetivoAgua || 3;
  const litros = comidasCache.filter(c => c.fecha === hoyStr() && esAgua(c))
    .reduce((s, c) => s + Number(c.gramos), 0) / 1000;
  const pct = Math.min(100, Math.round(litros / objetivo * 100));
  $("#agua-nivel").style.height = pct + "%";
  const total = $("#agua-total");
  total.textContent = `💧 ${litros % 1 === 0 ? litros : litros.toFixed(1)} L / ${objetivo} L`;
  total.classList.toggle("cumplido", litros >= objetivo);
  $("#agua-mensaje").textContent = litros >= objetivo
    ? "¡Objetivo cumplido! 🎉 Seguí si tenés sed"
    : (litros === 0 ? "Tocá el vaso cada vez que tomes medio litro"
       : `Te falta${objetivo - litros === 0.5 ? "" : "n"} ${(objetivo - litros) % 1 === 0 ? (objetivo - litros) : (objetivo - litros).toFixed(1)} L`);
}

function kcalDeItem(item) {
  const c = item.candidatos[item.elegido ?? 0];
  if (!c) return 0;
  return Math.round(c.alimento.k * item.gramos / 100);
}

function renderResultados() {
  const cont = $("#lista-resultados");
  cont.innerHTML = "";
  pendientes.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "item-resultado";
    const tieneMatch = item.candidatos.length > 0;
    if (tieneMatch && item.gramos === undefined) {
      item.elegido = item.elegido ?? 0;
      item.gramos = Math.round(item.candidatos[item.elegido].alimento.p * item.cantidad);
    }
    let opciones = item.candidatos.map((c, j) => {
      const desc = c.alimento.trabajo ? `~${c.alimento.k} kcal · 🏢 trabajo` : `${c.alimento.k} kcal/100g`;
      return `<option value="${j}" ${j === item.elegido ? "selected" : ""}>${c.alimento.n} · ${desc}${c.alimento.propio ? " ★" : ""}</option>`;
    }).join("");
    div.innerHTML = `
      <span class="original">"${item.original}" ${item.cantidad !== 1 ? `× ${item.cantidad}` : ""}</span>
      ${tieneMatch ? `
        <div class="fila-input">
          <select class="sel-candidato" data-i="${i}">${opciones}</select>
        </div>
        <div class="fila-input">
          <button class="btn-secundario btn-paso cant-menos" data-i="${i}" title="Una porción menos">−</button>
          <span class="cant-num" data-i="${i}">${item.cantidad}</span>
          <button class="btn-secundario btn-paso cant-mas" data-i="${i}" title="Una porción más">+</button>
          <input type="number" class="gramos" data-i="${i}" value="${item.gramos}" min="1" step="5"> <span style="align-self:center">g</span>
          <span class="kcal-item" data-i="${i}">${kcalDeItem(item)} kcal</span>
          <button class="btn-secundario btn-off" data-i="${i}">🔎</button>
          <button class="btn-secundario btn-quitar" data-i="${i}" title="No agregar">✕</button>
        </div>` : `
        <p class="sin-match">No lo encontré en la base.</p>
        <div class="fila-input">
          <button class="btn-secundario btn-off" data-i="${i}">Buscar en Open Food Facts 🔎</button>
          <button class="btn-secundario btn-quitar" data-i="${i}">Quitar ✕</button>
        </div>`}
    `;
    cont.appendChild(div);
  });
  $("#resultados").classList.toggle("oculto", pendientes.length === 0);
}

function actualizarKcalItem(i) {
  const el = document.querySelector(`.kcal-item[data-i="${i}"]`);
  if (el) el.textContent = `${kcalDeItem(pendientes[i])} kcal`;
}

async function renderHoy() {
  renderAgua();
  renderAyuno();
  renderActividad();
  const hoy = hoyStr();
  const deHoy = comidasCache.filter(c => c.fecha === hoy && !esAgua(c))
    .sort((a, b) => (a.creado || "").localeCompare(b.creado || ""));
  const total = deHoy.reduce((s, c) => s + c.kcal, 0);
  $("#kcal-hoy").textContent = Math.round(total);

  const objetivo = config.objetivo || 0;
  const pct = objetivo ? Math.min(100, Math.round(total / objetivo * 100)) : 0;
  const color = objetivo && total > objetivo ? "var(--rojo)" : "var(--verde)";
  $("#anillo").style.background = `conic-gradient(${color} ${pct}%, var(--verde-claro) ${pct}%)`;
  $("#resumen-objetivo").textContent = objetivo
    ? `Objetivo: ${objetivo} kcal (${pct}%)` : "Sin objetivo definido";
  $("#resumen-restante").textContent = objetivo
    ? (total <= objetivo ? `Te quedan ${Math.round(objetivo - total)} kcal` : `Te pasaste por ${Math.round(total - objetivo)} kcal`)
    : "Definí uno en Ajustes";

  const cont = $("#lista-hoy");
  cont.innerHTML = deHoy.length ? "" : `<p class="vacio">Todavía no cargaste nada hoy.</p>`;
  for (const c of deHoy) {
    const div = document.createElement("div");
    div.className = "item";
    const hora = horaDe(c);
    div.innerHTML = `
      <span class="nombre">${c.nombre}<span class="detalle">${hora ? "🕐 " + hora + " · " : ""}${Math.round(c.gramos)} g</span></span>
      <button class="btn-paso it-menos" title="Una porción menos">−</button>
      <button class="btn-paso it-mas" title="Una porción más">+</button>
      <span class="kcal">${Math.round(c.kcal)} kcal</span>
      <button class="it-borrar" data-id="${c.id}" title="Borrar">🗑️</button>`;
    const ajustar = async (paso) => {
      const base = Number(c.base) || Number(c.gramos) || 0;
      if (!base) return;
      const nuevosG = Number(c.gramos) + paso * base;
      if (nuevosG <= 0) {
        if (!confirm(`¿Borrar "${c.nombre}"?`)) return;
        await storeActivo().borrarComida(c.id);
        comidasCache = comidasCache.filter(x => x.id !== c.id);
      } else {
        const kcalPorG = Number(c.kcal) / Number(c.gramos);
        const campos = { gramos: nuevosG, kcal: Math.round(kcalPorG * nuevosG) };
        try { await storeActivo().actualizarComida(c.id, campos); }
        catch (err) { alert("Error: " + err.message); return; }
        Object.assign(c, campos);
      }
      renderHoy(); renderHistorial();
    };
    div.querySelector(".it-menos").addEventListener("click", () => ajustar(-1));
    div.querySelector(".it-mas").addEventListener("click", () => ajustar(1));
    div.querySelector(".it-borrar").addEventListener("click", async () => {
      if (!confirm(`¿Borrar "${c.nombre}"?`)) return;
      await storeActivo().borrarComida(c.id);
      comidasCache = comidasCache.filter(x => x.id !== c.id);
      renderHoy(); renderHistorial();
    });
    cont.appendChild(div);
  }
}

function renderHistorial() {
  const porDia = {};
  for (const c of comidasCache) (porDia[c.fecha] ??= []).push(c);
  const fechas = Object.keys(porDia).sort().reverse();
  const cont = $("#lista-historial");
  cont.innerHTML = fechas.length ? "" : `<p class="vacio">Sin registros todavía.</p>`;
  const objetivo = config.objetivo || 0;
  for (const fecha of fechas) {
    const todas = porDia[fecha];
    const comidas = todas.filter(c => !esAgua(c))
      .sort((a, b) => (a.creado || "").localeCompare(b.creado || ""));
    const litros = todas.filter(esAgua).reduce((s, c) => s + Number(c.gramos), 0) / 1000;
    const total = Math.round(comidas.reduce((s, c) => s + c.kcal, 0));
    const det = document.createElement("details");
    det.className = "dia-historial";
    const pct = objetivo ? Math.min(100, Math.round(total / objetivo * 100)) : 0;
    const litrosTxt = litros ? ` · 💧 ${litros % 1 === 0 ? litros : litros.toFixed(1)} L` : "";
    det.innerHTML = `
      <summary><span>${fechaLinda(fecha)}</span><span>${total} kcal${litrosTxt}</span></summary>
      ${objetivo ? `<div class="barra"><div style="width:${pct}%" class="${total > objetivo ? "excedido" : ""}"></div></div>` : ""}
      <ul>${comidas.map(c => `<li>${horaDe(c) ? horaDe(c) + " — " : ""}${c.nombre} — ${Math.round(c.kcal)} kcal</li>`).join("")}</ul>`;
    cont.appendChild(det);
  }
}

async function renderAlimentos() {
  const cont = $("#lista-alimentos");
  cont.innerHTML = misAlimentos.length ? "" : `<p class="vacio">Todavía no agregaste alimentos propios.</p>`;
  for (const f of misAlimentos) {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <span class="nombre">${f.nombre}<span class="detalle">${f.kcal100} kcal/100g · porción ${f.porcion} g</span></span>
      <button data-id="${f.id}" title="Borrar">🗑️</button>`;
    div.querySelector("button").addEventListener("click", async () => {
      if (!confirm(`¿Borrar "${f.nombre}"?`)) return;
      await storeActivo().borrarAlimento(f.id);
      misAlimentos = misAlimentos.filter(x => x.id !== f.id);
      renderAlimentos();
    });
    cont.appendChild(div);
  }
}

function actualizarBadge() {
  $("#modo-datos").textContent = storeActivo().nombre === "nube" ? "☁️ nube" : "📱 local";
}

/* ══════════════════ eventos ══════════════════ */

// tabs
document.querySelectorAll("nav button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("nav button").forEach(b => b.classList.remove("activa"));
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("activa"));
    btn.classList.add("activa");
    $(`#tab-${btn.dataset.tab}`).classList.add("activa");
  });
});

// analizar comida
$("#form-comida").addEventListener("submit", (e) => {
  e.preventDefault();
  const texto = $("#input-comida").value;
  pendientes = parsearEntrada(texto);
  if (!pendientes.length) return;
  $("#hora-comida").value = ahoraHHMM();
  renderResultados();
});

// interacción con resultados (delegación)
$("#lista-resultados").addEventListener("change", (e) => {
  const i = Number(e.target.dataset.i);
  if (e.target.classList.contains("sel-candidato")) {
    pendientes[i].elegido = Number(e.target.value);
    pendientes[i].gramos = Math.round(pendientes[i].candidatos[pendientes[i].elegido].alimento.p * pendientes[i].cantidad);
    renderResultados();
  } else if (e.target.classList.contains("gramos")) {
    pendientes[i].gramos = Number(e.target.value) || 0;
    actualizarKcalItem(i);
  }
});
$("#lista-resultados").addEventListener("input", (e) => {
  if (e.target.classList.contains("gramos")) {
    const i = Number(e.target.dataset.i);
    pendientes[i].gramos = Number(e.target.value) || 0;
    actualizarKcalItem(i);
  }
});
$("#lista-resultados").addEventListener("click", async (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const i = Number(btn.dataset.i);
  if (btn.classList.contains("btn-quitar")) {
    pendientes.splice(i, 1);
    renderResultados();
  } else if (btn.classList.contains("cant-mas") || btn.classList.contains("cant-menos")) {
    const it = pendientes[i];
    const paso = btn.classList.contains("cant-mas") ? 1 : -1;
    it.cantidad = Math.max(it.cantidad <= 1 && paso === -1 ? 0.5 : 1, it.cantidad + paso);
    it.gramos = Math.round(it.candidatos[it.elegido ?? 0].alimento.p * it.cantidad);
    renderResultados();
  } else if (btn.classList.contains("btn-off")) {
    btn.textContent = "Buscando…";
    btn.disabled = true;
    try {
      const extras = await buscarOFF(pendientes[i].query);
      if (extras.length) {
        pendientes[i].candidatos = [...pendientes[i].candidatos, ...extras];
        if (pendientes[i].elegido === undefined) {
          pendientes[i].elegido = 0;
          pendientes[i].gramos = Math.round(pendientes[i].candidatos[0].alimento.p * pendientes[i].cantidad);
        }
      } else {
        alert("No encontré nada en Open Food Facts. Podés cargarlo a mano en la pestaña Alimentos.");
      }
    } catch (err) {
      alert("Error buscando en Open Food Facts: " + err.message);
    }
    renderResultados();
  }
});

// confirmar
$("#btn-confirmar").addEventListener("click", async () => {
  // la hora elegida define el "creado" (para ver a qué hora comiste)
  let creadoISO = new Date().toISOString();
  const horaVal = $("#hora-comida").value;
  if (horaVal) {
    const [h, m] = horaVal.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    creadoISO = d.toISOString();
  }
  const nuevas = pendientes
    .filter(it => it.candidatos.length && it.gramos > 0)
    .map(it => {
      const alim = it.candidatos[it.elegido ?? 0].alimento;
      return {
        id: uuid(),
        fecha: hoyStr(),
        nombre: alim.n,
        gramos: it.gramos,
        kcal: Math.round(alim.k * it.gramos / 100),
        base: alim.p, // gramos de UNA porción, para los botones −/+
        creado: creadoISO,
      };
    });
  if (!nuevas.length) return;
  try {
    await storeActivo().agregarComidas(nuevas);
  } catch (err) {
    alert("Error guardando: " + err.message);
    return;
  }
  comidasCache.push(...nuevas);
  pendientes = [];
  $("#input-comida").value = "";
  renderResultados(); renderHoy(); renderHistorial();
});

$("#btn-cancelar").addEventListener("click", () => {
  pendientes = [];
  renderResultados();
});

// vasito de agua
$("#btn-agua").addEventListener("click", async () => {
  const entrada = {
    id: uuid(), fecha: hoyStr(), nombre: AGUA_NOMBRE,
    gramos: 500, kcal: 0, creado: new Date().toISOString(),
  };
  try {
    await storeActivo().agregarComidas([entrada]);
  } catch (err) { alert("Error guardando: " + err.message); return; }
  comidasCache.push(entrada);
  const btn = $("#btn-agua");
  btn.classList.remove("brindis");
  void btn.offsetWidth; // reinicia la animación
  btn.classList.add("brindis");
  renderAgua(); renderHistorial();
});

$("#btn-agua-menos").addEventListener("click", async () => {
  const deHoy = comidasCache.filter(c => c.fecha === hoyStr() && esAgua(c));
  if (!deHoy.length) return;
  const ultima = deHoy[deHoy.length - 1];
  try {
    await storeActivo().borrarComida(ultima.id);
  } catch (err) { alert("Error: " + err.message); return; }
  comidasCache = comidasCache.filter(c => c.id !== ultima.id);
  renderAgua(); renderHistorial();
});

// alimentos propios
$("#form-alimento").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = $("#alim-nombre").value.trim();
  const kcal = Number($("#alim-kcal").value);
  const base = $("#alim-base").value;
  const porcion = Number($("#alim-porcion").value) || 150;
  if (!nombre || !kcal) return;
  const kcal100 = base === "100" ? kcal : Math.round(kcal * 100 / porcion);
  const f = { id: uuid(), nombre, kcal100, porcion, unidad: "1 porción" };
  try {
    await storeActivo().agregarAlimento(f);
  } catch (err) { alert("Error guardando: " + err.message); return; }
  misAlimentos.push(f);
  e.target.reset();
  $("#alim-porcion").value = 150;
  renderAlimentos();
});

// ajustes
$("#btn-guardar-objetivo").addEventListener("click", (e) => {
  config.objetivo = Number($("#cfg-objetivo").value) || 0;
  guardarConfig();
  renderHoy(); renderHistorial();
  const btn = e.target;
  btn.textContent = "Guardado ✓";
  setTimeout(() => { btn.textContent = "Guardar"; }, 1500);
});

$("#btn-guardar-agua").addEventListener("click", (e) => {
  config.objetivoAgua = Number($("#cfg-agua").value) || 3;
  guardarConfig();
  renderHoy(); renderHistorial();
  const btn = e.target;
  btn.textContent = "Guardado ✓";
  setTimeout(() => { btn.textContent = "Guardar"; }, 1500);
});

$("#btn-guardar-supa").addEventListener("click", async () => {
  const url = $("#cfg-supa-url").value.trim().replace(/\/$/, "");
  const key = $("#cfg-supa-key").value.trim();
  const estado = $("#estado-supa");
  if (!url || !key) {
    delete config.supabaseUrl; delete config.supabaseKey;
    guardarConfig(); actualizarBadge();
    estado.textContent = "Supabase desconectado: los datos se guardan en este dispositivo.";
    return;
  }
  estado.textContent = "Probando conexión…";
  config.supabaseUrl = url; config.supabaseKey = key;
  try {
    await StoreSupabase.listarComidas();
    guardarConfig();
    estado.textContent = "✓ Conectado. Tus comidas se guardan en la nube.";
    await cargarDatos();
  } catch (err) {
    delete config.supabaseUrl; delete config.supabaseKey;
    estado.textContent = "✗ No pude conectar: " + err.message;
  }
  actualizarBadge();
});

$("#btn-migrar").addEventListener("click", async () => {
  if (!config.supabaseUrl) { alert("Primero conectá Supabase."); return; }
  const comidas = await StoreLocal.listarComidas();
  const alimentos = await StoreLocal.listarAlimentos();
  if (!comidas.length && !alimentos.length) { alert("No hay datos locales para subir."); return; }
  if (!confirm(`Subir ${comidas.length} comidas y ${alimentos.length} alimentos a la nube?`)) return;
  try {
    if (alimentos.length) await StoreSupabase._fetch("alimentos?on_conflict=id", {
      method: "POST", body: JSON.stringify(alimentos),
      headers: { Prefer: "resolution=merge-duplicates,return=representation" },
    });
    if (comidas.length) await StoreSupabase._fetch("comidas?on_conflict=id", {
      method: "POST", body: JSON.stringify(comidas),
      headers: { Prefer: "resolution=merge-duplicates,return=representation" },
    });
    alert("Datos subidos ✓");
    await cargarDatos();
  } catch (err) { alert("Error subiendo: " + err.message); }
});

$("#btn-exportar").addEventListener("click", async () => {
  const datos = {
    exportado: new Date().toISOString(),
    comidas: comidasCache,
    alimentos: misAlimentos,
    config: { objetivo: config.objetivo },
  };
  const blob = new Blob([JSON.stringify(datos, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `calorias-${hoyStr()}.json`;
  a.click();
});

/* ══════════════════ inicio ══════════════════ */

async function cargarDatos() {
  try {
    misAlimentos = await storeActivo().listarAlimentos() || [];
    comidasCache = await storeActivo().listarComidas() || [];
  } catch (err) {
    alert("No pude cargar los datos: " + err.message);
    misAlimentos = []; comidasCache = [];
  }
  renderHoy(); renderHistorial(); renderAlimentos();
  cargarActividad();
}

(function init() {
  if (config.objetivo) $("#cfg-objetivo").value = config.objetivo;
  $("#cfg-agua").value = config.objetivoAgua || 3;
  if (config.supabaseUrl) $("#cfg-supa-url").value = config.supabaseUrl;
  if (config.supabaseKey) $("#cfg-supa-key").value = config.supabaseKey;
  actualizarBadge();
  cargarDatos();
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
