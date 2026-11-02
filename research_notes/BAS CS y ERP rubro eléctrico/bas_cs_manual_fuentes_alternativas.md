# BAS CS: manual y detalle funcional en fuentes alternativas (fuera de bas.com.ar)

Fecha: 2026-11-02

## Cómo se hizo y límites

- Objetivo: encontrar copias o fragmentos del manual de BAS CS (BAS Company Steering, de Buenos Aires Software) en sitios que no fueran de bas.com.ar.
- Herramienta: solo **fragmentos del buscador (WebSearch)**. La política de red de la sesión bloqueó **todas** las descargas de páginas (WebFetch y curl). Entre los dominios bloqueados están los de distribuidores, Scribd y YouTube (lista completa al final). Por eso **ningún texto se leyó completo**. Todo lo que sigue viene de fragmentos o resúmenes que devolvió el buscador.
- No se usaron proxies, cachés, archive.org, lectores ni traductores para llegar a bas.com.ar.
- No apareció ninguna copia del manual (BASCSHTML / manualbascs) en Scribd, SlideShare, Studocu, Docplayer, Yumpu ni YouTube. Las búsquedas no devolvieron resultados de esos sitios.
- Niveles de evidencia usados en cada dato:
  - **[dist]**: sitio de un distribuidor o partner.
  - **[3ro]**: tercero (directorio, sitio de cursos, integrador).
  - **[oficial-snippet]**: fragmento de una página de bas.com.ar o sac.bas.com.ar que mostró el buscador. No se abrió la página. Está separado de las demás fuentes y conviene confirmarlo cuando ese dominio esté habilitado.
  - **[no verificable]**: no se encontró ninguna fuente.

## Fuentes independientes encontradas

| Fuente | Tipo | URL |
|---|---|---|
| NEDEN, ficha del ERP BAS Company Steering | dist (Capital Federal, distribuidor autorizado) | https://neden.com.ar/bas-company-steering.php |
| NEDEN, Quick POS (página y folleto PDF) | dist | https://neden.com.ar/quick-pos.php ; https://www.neden.com.ar/folleto-quickpos.pdf |
| ingenieria.com.uy, "BAS COMPANY STEERING" | dist (Uruguay) | https://www.ingenieria.com.uy/software-de-gestion-erp.html |
| Pymesis, "ERP BAS Company Steering" | dist/revendedor | https://pymesis.wixsite.com/pymesissistemas/erp-bas-company-steering |
| Tools Solution | dist | http://www.toolssolution.com.ar/?sec=bascs |
| BAS Paraguay | filial/dist | https://bas.com.py/ |
| Sistemas de Facturación y Gestión, ficha de BAS | 3ro | https://sistemasdefacturacionygestion.com.ar/empresas/bas-software-erp/ |
| SoftwareSelección, ficha de BAS CS | 3ro | https://www.softwareseleccion.com/bas+cs-p-3458 |
| Emagister, "Capacitación BAS CS - Introductorio" | 3ro (curso dictado por BAS) | https://www.emagister.com.ar/capacitacion/bas-cs-introductorio-cursos-2554053.htm |
| Grow2on, página de integraciones | 3ro (conector) | https://grow2on.com/pages/integraciones |

## Detalle funcional por tema

### 1. Listas de precios y actualización masiva de precios y costos
- La ficha de NEDEN dice: "listas de precios ilimitadas y dinámicas con cálculo en base a reglas de negocios, listas de precios futuras" y "autorización de comprobantes y listas de precios". **[dist]** (neden.com.ar/bas-company-steering.php)
- ingenieria.com.uy menciona "múltiples criterios para listas de precios", "listas de precios por cliente" y "administración de costos en moneda local y en moneda extranjera". **[dist]**
- En el curso introductorio de Emagister, el módulo de ventas incluye "administración de listas de precios". **[3ro]**
- En la versión 4.6.0 se agregan "lista de precios" y "último costo de compra" como métodos de valuación contable del stock. **[oficial-snippet]** (bas.com.ar/nueva-version-bas-cs-4-6-0/)
- **No verificable:** importar la lista de precios de un proveedor (Excel o CSV) para actualizar costos, o actualizar precios en masa por porcentaje o por proveedor. Ninguna fuente lo describe. Las "listas dinámicas por reglas" hacen pensar que los precios de venta se recalculan a partir del costo, pero no se encontró cómo entran los costos del proveedor.

### 2. Descuentos y bonificaciones por cliente
- ingenieria.com.uy menciona "bonificaciones por volumen", "bonificaciones por tipo de cliente y tipo de producto" y "códigos de producto por cliente". **[dist]**
- Sistemas de Facturación y Gestión dice que permite crear, modificar y reutilizar promociones y descuentos. **[3ro]**
- El curso de Emagister incluye bonificaciones, condiciones de venta, agentes y comisiones. **[3ro]**
- Quick POS (NEDEN) maneja listas de precios estándar, de promoción y mínima por condición de venta, varias condiciones de venta por cliente, y precios por volumen y bonificaciones por tipo de cliente. **[dist]**
- **No verificable:** cómo se combinan la lista del cliente y los descuentos en cascada.

### 3. Artículos: variantes, equivalencias y códigos alternativos
- ingenieria.com.uy menciona "proveedores habituales", "productos alternativos" y "códigos de productos individuales por proveedor" en compras, y "códigos de producto por cliente" en ventas. **[dist]**
- Quick POS (fabricante, vía neden) maneja números de serie, despachos, partidas, doble unidad de medida y talle-color. **[dist / oficial-snippet]**
- **No verificable:** si existe una función de "equivalencias" con ese nombre, o la cantidad de códigos de barras alternativos por artículo. Tampoco está confirmado que BAS CS (y no solo Quick POS) maneje talle-color.

### 4. Lotes y números de serie
- Un distribuidor dice que incluye "seguimiento de números de serie" dentro del movimiento de materiales. **[dist]**
- Según la documentación FX de BAS CS 4.5.0, hay ventanas de lotes y partidas con dos opciones: importar un archivo de partidas o asignarlas a mano. Un tooltip muestra el depósito y los datos de la partida (descripción y vencimiento). **[oficial-snippet]** (sac.bas.com.ar/.../Documentacion_FX_BAS_CS_450.pdf; no se abrió)

### 5. Varios depósitos y sucursales
- Multiempresa y multisucursal: BAS Paraguay y un distribuidor argentino. **[dist]**
- ingenieria.com.uy menciona "stock mínimo e ideal por depósito" y "stock físico versus disponible". **[dist]**
- Un distribuidor dice: "Stock mínimo e ideal, punto, método y tiempo de reposición independientes por depósito". Esto implica que maneja varios depósitos. **[dist]**
- **No verificable:** transferencias entre sucursales, ni stock en tránsito.

### 6. Reposición automática y sugerencia de compra
- Según NEDEN y otro distribuidor, el punto de reposición, el método y el tiempo de reposición se definen por depósito. **[dist]**
- El temario del curso de Emagister, en el circuito de abastecimiento, incluye "Stock mínimo, Punto de reposición, Stock ideal". **[3ro]**
- **No verificable:** si existe un proceso que genere solo las órdenes de compra sugeridas, y con qué método (por ejemplo, ventas promedio).

### 7. Cotizaciones y pedidos
- Ventas: "circuitos de workflow libre en base a pedidos, facturas y remitos"; "control de créditos, saldos en cuenta corriente y valores rechazados en pedidos"; facturación automática de bienes, servicios y abonos. **[dist]** (ingenieria.com.uy)
- Compras: órdenes de compra, registro y comparación de cotizaciones, ingreso y control de facturas de proveedores, control de recepción de mercadería, presupuesto de compras, auditoría de compras y evaluación de proveedores. **[dist]** (ingenieria.com.uy, NEDEN)
- **No verificable:** presupuesto de venta (cotización a cliente) como comprobante propio. Ninguna fuente lo nombra de forma explícita.

### 8. Cuentas corrientes
- Cuentas corrientes de deudores y acreedores, seguimiento y control de ventas (BAS Paraguay). Control de crédito y saldos en los pedidos (ingenieria.com.uy). Fondos, bancos y conciliación bancaria. **[dist]**

### 9. WebAPI
- El diagrama de la landing oficial muestra "BAS CS WebAPI" como capa de integración hacia E-commerce, Logística, BI / Datos, soluciones verticales y aplicaciones externas. **[oficial-snippet]** (bas.com.ar/landing-bas-cs/)
- NEDEN menciona una "interface para integración via APIs" y dice que se puede integrar con una tienda online o un CRM. **[dist]**
- **No verificable:** endpoints, formato (REST/JSON), autenticación (token o usuario de BAS), límites de uso, licencia aparte. No hay documentación pública fuera de bas.com.ar.

### 10. Ecommerce y Mercado Libre
- NEDEN incluye "Integración con Mercado Libre" en la lista de funcionalidades. **[dist]**
- Caso Fox Head: la integración se hizo con Balcony Software (integrador partner de Mercado Libre) y consultores de BAS. Usa la API de Mercado Libre más BAS CS para stock, actualización de inventario y publicación, con notificaciones en tiempo real (ofertas, preguntas, Mercado Pago, Mercado Envíos). **[oficial-snippet]** (bas.com.ar/fox-head/). Indica que la integración la hace un partner y no es un conector nativo.
- Grow2on lista "BAS Buenos Aires Software" entre sus integraciones, junto a Tiendanube, WooCommerce y VTEX. **[3ro]** No queda claro el alcance (stock, precios u órdenes).
- **No verificable:** conector nativo con Tiendanube, WooCommerce o VTEX.

### 11. Reportes y BI
- SoftwareSelección dice que tiene gran variedad de informes de gestión, auditoría y presupuesto, que se pueden imprimir, guardar en PDF o exportar a plantillas o tablas. **[3ro]**
- "BI / Datos" aparece como destino de la WebAPI. **[oficial-snippet]**
- **No verificable:** conector nativo con Power BI, cubos o tablero propio.

### 12. Versiones
- **4.5.0:** existe "Documentación FX BAS CS 4.5.0" (lotes y partidas). **[oficial-snippet]**
- **4.6.0** (anunciada hace unos 640 días, cerca de comienzos de 2025): prefijos de factura de hasta 8 caracteres alfanuméricos con guiones, cierres de materiales más rápidos, cambio del método de valuación contable antes del cierre (se agregan "lista de precios" y "último costo de compra"), adjuntos (Word, Excel, JPG, PDF) con comentarios, y envío automático de facturas auditadas. Se distribuye a suscriptores con UPP (Upgrade Prepago) por el portal SAC. **[oficial-snippet]**
- **No verificable:** 4.7 o 5.x. No hay historial completo de versiones.

### 13. Comercial y licencias
- NEDEN dice que el precio de referencia incluye el ERP completo, actualizaciones y 5 licencias de puesto. Las licencias adicionales se cotizan aparte, y la consultoría de implementación y la mesa de ayuda se cotizan por proyecto. **[dist]**
- Distribuidores según la red oficial (fragmento): NEDEN (CABA; contacto Diego Méndez), ASA Consultores (Rosario), Consultek (Campana) y Tron Solutions (Rafaela). **[oficial-snippet]**

## Resumen de lo que sigue sin verificar
1. Importar listas de precios de proveedores y actualizar costos o precios en masa (lo más crítico para el rubro eléctrico).
2. Equivalencias o códigos alternativos de artículo en sentido estricto (solo hay "productos alternativos" y "código por proveedor o cliente").
3. Generación automática de órdenes de compra sugeridas.
4. Presupuesto de venta como comprobante.
5. Transferencias entre sucursales y stock en tránsito.
6. Detalle técnico de la WebAPI.
7. Conectores nativos con ecommerce que no sea Mercado Libre, y conectores de BI.
8. Versiones posteriores a 4.6.0.

## Dominios bloqueados en esta sesión (no se pudo leer el contenido)
- Bloqueados por política: bas.com.ar, manualbascs.bas.com.ar, sac.bas.com.ar (por instrucción).
- Fallaron por DNS o el proxy los rechazó: neden.com.ar, www.neden.com.ar, www.softwareseleccion.com, www.scribd.com, www.youtube.com, es.slideshare.net, www.studocu.com, docplayer.es, www.yumpu.com, asaconsultores.com.ar, www.linkedin.com, www.google.com, www.bing.com, duckduckgo.com.
- Para leer los textos completos habría que habilitar como mínimo: neden.com.ar, www.ingenieria.com.uy, pymesis.wixsite.com, www.emagister.com.ar, www.softwareseleccion.com, grow2on.com y bas.com.py.
