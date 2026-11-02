# BAS CS (Buenos Aires Software): perfil técnico del producto

Fecha de investigación: 2026-11-02.

**Limitación de método (importante para quien redacte):** desde esta sesión NO se pudieron abrir los hosts `manualbascs.bas.com.ar`, `bas.com.ar`, `www.bas.com.ar`, `sac.bas.com.ar` ni `softwareseleccion.com`. Fallaron tanto curl (403 del proxy) como WebFetch (el DNS no los resuelve fuera de los dominios permitidos). Todo lo de abajo sale de **fragmentos y resúmenes de buscador** sobre esas páginas, no de haberlas leído completas. El TOC del manual (archivos whxdata de RoboHelp) **no se pudo enumerar**. Para un relevamiento completo del manual hay que habilitar esos dominios en la configuración de red de la sesión y volver a correr la investigación.

Leyenda: [OFICIAL-DOC] = documentación técnica de BAS (manual/SAC); [AUTODECLARADO] = marketing o casos de éxito de BAS; [DISTRIBUIDOR] = revendedor; [TERCERO] = fuente independiente.

## 1. Qué es BAS CS, módulos documentados y profundidad

### Takeaway
BAS CS ("BAS Company Steering") es el ERP de gama media/alta de Buenos Aires Software S.A. Integra ventas, compras, stock/materiales y distribución, producción, tesorería/fondos y contabilidad bimonetaria sobre una misma base de datos. Sueldos/RRHH es un producto aparte (BAS Laboro). No se encontró un módulo CRM propio.

### Cited Findings
- BAS CS integra ventas, compras, materiales y distribución, producción, finanzas y contabilidad "sobre una misma base de datos" [AUTODECLARADO] — [Landing BAS CS](https://bas.com.ar/landing-bas-cs/)
- Se posiciona como solución accesible para empresas medianas y organizaciones con operaciones complejas, "con prestaciones comparables a sistemas de mayor porte" [AUTODECLARADO] — [Landing BAS CS](https://bas.com.ar/landing-bas-cs/)
- "BAS CS" equivale a "BAS Company Steering" (nombre usado en el caso Fox Head y por el distribuidor Neden) — [Fox Head](https://bas.com.ar/fox-head/); [Neden](https://neden.com.ar/bas-company-steering.php)
- Tesorería: "gestión de cajas con ingresos, egresos, cobros, pagos, rendiciones de gastos y movimientos bancarios con tarjeta corporativa, cartera de valores, conciliación bancaria" [AUTODECLARADO] — [Software de Gestión ERP](https://bas.com.ar/productos/software-de-gestion-erp/)
- Contabilidad: "bimonetaria en tiempo real, con subdiarios, libro diario, mayores y balances. Asientos manuales y automáticos; incluyendo ajuste por inflación y centros de costos" [AUTODECLARADO] — [Software de Gestión ERP](https://bas.com.ar/productos/software-de-gestion-erp/)
- El manual online incluye un módulo de bienes de uso con "Listado Inventario de bienes de uso": filtra por rangos de inventario, grupos de bienes y ubicaciones físicas, ordena por número de inventario o por grupo, y si se emite valorizado agrega valor de origen, amortización acumulada y valor residual [OFICIAL-DOC] — [Manual BAS CS](https://manualbascs.bas.com.ar/BASCSHTML/listado__Inventario_de_bienes_de_uso.htm)
- La Documentación FX BAS CS 4.5.0 (vigencia vinculada a 28/02/2020) cubre comprobantes de ventas y compras, movimientos de stock, consulta de órdenes de producción, y valuación y cierre mensual [OFICIAL-DOC] — [Documentación FX 4.5.0 (PDF)](https://sac.bas.com.ar/aplicacion/documentos/varios/BCS/Documentacion_FX_BAS_CS_450.pdf)
- Versión 4.6.0: cambios en prefijos de comprobantes y en valuación y contabilización de stock. Suma dos métodos de valuación contable ("lista de precios y costo de última compra") y permite "cambiar el método de valuación contable antes del cierre". El anuncio tiene unos 640 días al momento de la búsqueda, o sea alrededor de comienzos de 2025 (fecha exacta no verificada) [OFICIAL/AUTODECLARADO] — [Nueva versión BAS CS 4.6.0](https://bas.com.ar/nueva-version-bas-cs-4-6-0/)
- Seguridad: el acceso a la información se restringe por usuario con menús personalizados. Trae numerosos reportes y emite factura electrónica [AUTODECLARADO] — [Landing BAS CS](https://bas.com.ar/landing-bas-cs/)
- Producción: un cliente lo usa en "producción, contabilidad, administración, facturación, cobranzas, pago a proveedores, compras" [AUTODECLARADO, caso de éxito] — [Software de Gestión ERP](https://bas.com.ar/productos/software-de-gestion-erp/)
- Neden describe producción planificada según stock de materias primas [DISTRIBUIDOR] — [Neden](https://neden.com.ar/bas-company-steering.php)
- Sueldos: BAS Laboro es un producto separado de administración de personal y liquidación de haberes (caso Banco Piano) — [Banco Piano](https://bas.com.ar/banco-piano/); [Folleto Laboro (PDF)](https://bas.com.ar/wp-content/uploads/2017/09/BAS_folleto-LABORO_RRHH.pdf)
- CRM: no se encontró módulo propio. El material habla de integrar el ERP con un CRM externo [DISTRIBUIDOR] — [Neden](https://neden.com.ar/bas-company-steering.php)

### Inferences
- Cubre el núcleo de un ERP de distribución/industria (ventas, compras, stock, producción, tesorería, contabilidad, bienes de uso). RRHH y punto de venta son productos satélite (Laboro, Quick POS).
- Que la contabilidad sea bimonetaria con ajuste por inflación indica que está pensado para la realidad argentina (inflación, operaciones en USD).

### Gaps
- No se pudo enumerar el TOC del manual, así que no hay lista oficial completa de módulos ni de la profundidad de cada uno.
- No se encontraron cuentas corrientes en detalle (aplicación de comprobantes, intereses), circuito de cobranzas, presupuestos/cotizaciones ni reportería/BI propia.

## 2. Arquitectura y tecnología

### Takeaway
BAS CS es una aplicación cliente-servidor on-premise para Windows sobre Microsoft SQL Server: un servidor dedicado y estaciones cliente, compatible con SQL Server 2016 Express hasta SQL Server 2025. La integración se hace con "BAS CS WebAPI". No se encontró evidencia de una versión web/SaaS nativa de BAS CS ni de app móvil.

### Cited Findings
- Según las notas de requerimientos de BAS, BAS CS, BAS Laboro y la Solución QP Router trabajan con un servidor dedicado y estaciones cliente. El documento lista versiones compatibles de Microsoft SQL Server desde 2016 Express hasta 2025 (incluye ediciones Express) y separa los requisitos de los puestos de BAS CS y de Laboro [OFICIAL-DOC; fragmento parcial] — [Requerimientos_LEN.pdf](https://sac.bas.com.ar/aplicacion/documentos/varios/GENERAL_LEN/Requerimientos_LEN.pdf)
- Una búsqueda laboral de BAS pide "scripts en MS SQL Server" — [Consultor implementador de sueldos](https://bas.com.ar/consultor-implementador-de-sueldos/)
- "BAS CS WebAPI" se presenta como capa para conectar el ERP con ecommerce, logística, BI y aplicaciones externas, independiente de lenguaje y tecnología [AUTODECLARADO] — [Software de Gestión ERP](https://bas.com.ar/productos/software-de-gestion-erp/); [Landing BAS CS](https://bas.com.ar/landing-bas-cs/)
- Factura electrónica: un servicio local "BcsCae"/"BASFiscalizador" se comunica con ARCA desde una PC determinada [OFICIAL-DOC] — [Certificado_electronico.pdf v36, vigencia 14/01/2025](https://sac.bas.com.ar/aplicacion/documentos/varios/BCS/Certificado_electronico.pdf)
- La modalidad SaaS ("datos en un Servidor de BAS") figura para otros productos (Easy Soft alquiler). Discovery (PyME) tiene versión "en la Nube", donde algunas funciones, como la impresión de etiquetas de código de barras, "no está disponible" — [FAQ Easy Soft](https://bas.com.ar/preguntas-frecuentes/); [Discovery](https://bas.com.ar/productos/sistema-de-gestion-para-pymes/)

### Inferences
- La arquitectura (SQL Server, servidor dedicado, servicio local de CAE) apunta a un cliente pesado Windows. El acceso remoto probablemente se resuelve con escritorio remoto/Terminal Server o hosting, pero no está verificado.

### Gaps
- No se confirmó el lenguaje ni el framework del cliente, ni si existe BAS CS web, hosting oficial, apps móviles o documentación pública de endpoints de la WebAPI (REST/SOAP, autenticación).
- No se encontró ningún producto "BAS Cloud" de este proveedor argentino. Los resultados de "BAS Cloud" corresponden a BAS ERP de Ucrania (ecosistema 1C), que **no tiene relación** — [baserp1.odoo.com](https://baserp1.odoo.com/bas-cloud)

## 3. Precios, artículos, stock, depósitos y sucursales

### Takeaway
La documentación oficial confirma listas de precios con vigencia por fecha, que también se usan para valuar stock, y un informe de hasta 4 listas en columnas. Un distribuidor agrega listas ilimitadas y dinámicas por reglas, listas futuras, y por depósito stock máximo, ideal y punto de reposición. Lo multisucursal se resuelve en general combinando BAS CS en casa central con Quick POS en los locales.

### Cited Findings
- Informe de emisión de listas de precios: se pueden elegir hasta cuatro listas y mostrarlas en cuatro columnas [OFICIAL-DOC, v4.5.0 2020] — [Documentación FX 4.5.0](https://sac.bas.com.ar/aplicacion/documentos/varios/BCS/Documentacion_FX_BAS_CS_450.pdf)
- Si un movimiento no indica costo, el sistema valúa con "la lista de precios indicada en parámetros de ítems, vigente a la fecha del movimiento" (las listas tienen vigencia por fecha) [OFICIAL-DOC] — [Documentación FX 4.5.0](https://sac.bas.com.ar/aplicacion/documentos/varios/BCS/Documentacion_FX_BAS_CS_450.pdf)
- Listas de precios ilimitadas y dinámicas, calculadas por reglas de negocio, y listas futuras. Por depósito: stock máximo, ideal y punto de reposición [DISTRIBUIDOR] — [Neden](https://neden.com.ar/bas-company-steering.php)
- Laboratorio OVER: depósitos en distintas localidades, control de stock en camiones de distribución y alertas de stock mínimo para compras [AUTODECLARADO, caso] — [Laboratorio Over](https://bas.com.ar/laboratorio-over/)
- Cuentas corrientes de clientes en distintas monedas y condiciones de venta (caso Blum) [AUTODECLARADO] — [Blum](https://bas.com.ar/blum-desde-austria-para-el-mundo/)
- Ópticas (Cosentino) y retail usan BAS CS en casa central y Quick POS en sucursales, con acceso de los locales a stocks de depósitos [AUTODECLARADO] — [Óptica Cosentino (PDF)](https://bas.com.ar/wp-content/uploads/2017/02/OPTICA-COSENTINO.pdf); [Eyelit (PDF)](https://bas.com.ar/wp-content/uploads/2017/02/EYELIT.pdf)
- Quick POS "conecta locales propios, franquicias y ecommerce con casa central y BAS CS" — [Software para Punto de Venta](https://bas.com.ar/productos/software-para-punto-de-venta/)

### Inferences
- Lo multidepósito y la reposición por punto de pedido parecen nativos. Lo multisucursal con locales de venta depende de licenciar Quick POS / QP Router.

### Gaps
- No se verificaron en el manual: actualización masiva de precios desde listas de proveedores (importación Excel), descuentos escalonados por cliente o rubro, listas por moneda, variantes (talle/color), equivalencias o artículos alternativos, números de serie o lotes.

## 4. Integraciones (ecommerce, Mercado Libre, ARCA/AFIP, bancos, BI)

### Takeaway
Las integraciones se hacen con la WebAPI y a menudo con partners. Hay casos con Mercado Libre (vía Balcony Software), VTEX, Producteca y RFID. La factura electrónica ARCA es nativa (web service WSFE, con BcsCae). No hay evidencia de conectores para Tiendanube o WooCommerce.

### Cited Findings
- Fox Head integró Mercado Libre con BAS CS a través del partner Balcony Software y consultores de BAS: notificaciones en tiempo real de la API de ML, stock, publicaciones, preguntas, Mercado Pago y Mercado Envíos. Pedidos, depósito y facturación quedaron automatizados (página de unos 640 días) [AUTODECLARADO] — [Fox Head](https://bas.com.ar/fox-head/)
- "Los sistemas de BAS se integran con varios sistemas. Producteca, Vtex, Mercado Libre, RFID… siempre que sea posible no usamos otra cosa que no sea API's" [AUTODECLARADO, caso Equus] — [Equus](https://bas.com.ar/equus-una-marca-que-trasciende-generaciones/)
- Caso Equus: un data warehouse alimentado con BAS CS, Quick POS Router, VTEX y Mercado Libre — [Equus](https://bas.com.ar/equus-una-marca-que-trasciende-generaciones/)
- La Quick POS Web API permite "hacer fácilmente interfase con un e-commerce y exponer el stock de todos tus locales, propios y franquiciados", reservar stock y enviar facturas electrónicas por mail — [Quick POS E-Commerce](https://bas.com.ar/solucion-quick-pos-e-commerce/)
- CAE en línea por web services, con alternativa manual "AFIP/DGI-RECE" (fuente antigua, cita la RG 3749 de 2015) [DISTRIBUIDOR] — [Tools Solution](http://www.toolssolution.com.ar/?sec=bascs)
- El certificado digital para ARCA vence a los 2 años. Requiere empadronamiento y se gestiona desde BASFiscalizador/BCSCae [OFICIAL-DOC, v36 vigente desde 14/01/2025] — [Certificado_electronico.pdf](https://sac.bas.com.ar/aplicacion/documentos/varios/BCS/Certificado_electronico.pdf)
- BAS también hace factura electrónica en Paraguay (Raízen, Nike/Zavidoro) — [Raízen Paraguay](https://bas.com.ar/raizen-paraguay-implementa-factura-electronica/); [Zavidoro](https://bas.com.ar/zavidoro-corporation-nike-paraguay/)
- Un directorio de terceros lista a "MERCADO LIBRE, SHOPIFY, TIENDA NUBE…" entre los clientes de BAS. Es una fuente secundaria, con unos 4 años, y no prueba la existencia de conectores — [tuguiadelaweb](https://tuguiadelaweb.com/item/buenos-aires-software/)

### Inferences
- No parece haber un conector "plug and play" para Tiendanube o WooCommerce. Para el ecommerce se espera un desarrollo sobre la WebAPI o un middleware (Producteca, Balcony).

### Gaps
- No se encontró información sobre integración bancaria (archivos de pago o extractos para conciliación), EDI, Power BI nativo ni scripts/automatizaciones programables dentro del ERP.

## 5. Empresa BAS: historia, clientes, familia de productos, distribuidores

### Takeaway
Buenos Aires Software S.A. fue fundada en 1979, tiene oficinas en Chacabuco 314 (CABA) y declara más de 6.500 clientes (autodeclarado, no verificado). Su familia de productos es BAS CS (ERP), Discovery (PyME), Quick POS / QP Router (retail), BAS Laboro (RRHH) y Easy Soft (alquiler). Opera también en Paraguay (bas.com.py) y vende con una red de distribuidores provinciales.

### Cited Findings
- Fundada en 1979. Se presenta como "la primera empresa argentina en desarrollar sistemas de gestión administrativo contable" y declara más de 40 años y más de 6.500 clientes [AUTODECLARADO] — [Institucional](https://bas.com.ar/institucional/)
- Dirección: Chacabuco 314, pisos 9 y 10, C1069AAH, CABA. Soporte por portal SAC — [Contáctenos](https://bas.com.ar/oficinas-bas/)
- Productos: Discovery (PyME, tiene versión nube), Quick POS (punto de venta), Laboro (RRHH), Easy Soft (alquiler) — [Productos](https://bas.com.ar/productos/); [Discovery](https://bas.com.ar/productos/sistema-de-gestion-para-pymes/); [Quick POS](https://bas.com.ar/productos/software-para-punto-de-venta/)
- Presencia en Paraguay — [bas.com.py](https://bas.com.py/); [Paraguay](https://bas.com.ar/sistemas-de-gestion-paraguay/)
- Red de distribuidores: IT Business Solutions y Access Power (CABA), Entre Sistemas (Gualeguaychú), entre otros, varios con BAS CS más Quick POS — [Distribuidores](https://bas.com.ar/distribuidores/). Otros revendedores: [Neden](https://neden.com.ar/bas-company-steering.php), [Tools Solution](http://www.toolssolution.com.ar/?sec=bascs)
- Neden informa que su precio de referencia de BAS Company Steering incluye el ERP completo, actualizaciones y 5 licencias de acceso, con usuarios adicionales cotizados aparte (no se obtuvo el importe) [DISTRIBUIDOR] — [Neden](https://neden.com.ar/bas-company-steering.php)
- Clientes publicados [AUTODECLARADO]: Laboratorio OVER, Dr. Martens Argentina, Fox Head, Equus, Galerías Pacífico, Red Intercable, Metalúrgica MIT, Plastimec, Petrilac, Microsules, Taverniti, Blum, Distribuidora Imperial, Gobbi Novag — [Clientes](https://bas.com.ar/clientes/); [Galerías Pacífico](https://bas.com.ar/galerias-pacifico-elige-software-erp/); [Metalúrgica MIT](https://bas.com.ar/metalurgica-mit/); [Distribuidora Imperial (PDF)](https://bas.com.ar/wp-content/uploads/2017/02/DISTRIBUIDORA-IMPERIAL.pdf)
- Nota de prensa sobre los resultados de la empresa — [Mercado: "Buen balance de Buenos Aires Software"](https://mercado.com.ar/negocios/buen-balance-de-buenos-aires-software) (no se leyó, fecha desconocida)

### Inferences
- Su base de clientes publicada está sesgada hacia distribución, retail o indumentaria con locales, laboratorios e industria mediana.

### Gaps
- No se verificaron independientemente la cantidad de clientes, la facturación ni la cantidad de empleados. No se encontró ningún rubro eléctrico o materiales eléctricos entre los casos publicados.

## 6. Fortalezas, limitaciones y opiniones de usuarios

### Takeaway
No hay reseñas independientes del producto (no aparece en Capterra/G2 en las búsquedas). Solo hay testimonios publicados por BAS y una calificación de empleados en Glassdoor. Fortalezas plausibles: trayectoria, contabilidad bimonetaria con ajuste por inflación, multidepósito, ecosistema retail (Quick POS) y WebAPI. Limitaciones: arquitectura on-premise Windows/SQL Server, integraciones ecommerce que suelen requerir partners o desarrollo, y documentación pública de la API no hallada.

### Cited Findings
- No se hallaron reseñas en Capterra, G2 ni GetApp. El listado "BAS" de GetApp corresponde a otro producto — [GetApp BAS](https://www.getapp.de/software/2070449/bas)
- Glassdoor: 3,9/5 sobre 17 reseñas de empleados (evalúa la empresa como empleador, no el software) — [Glassdoor](https://www.glassdoor.com/Overview/Working-at-Buenos-Aires-Software-EI_IE2822285.11,32.htm)
- Testimonios favorables publicados por BAS (Gobbi Novag, Distribuidora Imperial, Antonio Luquin) [AUTODECLARADO, 2017] — [Gobbi Novag](https://bas.com.ar/wp-content/uploads/2017/02/GOBBI_NOVAG.pdf); [Antonio Luquin](https://bas.com.ar/wp-content/uploads/2017/02/ANTONIO-LUQUIN.pdf)
- El perfil de CB Insights figura "unclaimed" — [CB Insights](https://www.cbinsights.com/compare/buenos-aires-software-vs-erpvar)
- Balcony advierte que el stock debe estar sincronizado para evitar sobreventas en ML (riesgo de las integraciones) — [Fox Head](https://bas.com.ar/fox-head/)

### Inferences
- Por complejidad, apunta a empresas medianas: varios depósitos, producción, multimoneda y operaciones con contabilidad formal. Es más pesado que un sistema PyME típico y requiere implementación con consultores.

### Gaps
- No hay opiniones de foros ni comparativas independientes, y no se publican precios.
- El manual (manualbascs.bas.com.ar) no se pudo leer. Para relevar listas de precios, actualización masiva, descuentos, variantes y reposición, hay que habilitar el dominio y revisar su TOC (whxdata/toc*.js).
