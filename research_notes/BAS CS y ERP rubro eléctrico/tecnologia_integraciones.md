# Dimensión tecnológica de ERPs para distribuidoras/mayoristas argentinas: omnicanalidad, APIs y modernización (¿está vigente BAS CS?)

> Fecha de corte: noviembre 2026. Etiquetas: **[VERIFICADO]** = se leyó en fuente primaria (doc oficial / repo / sitio del proveedor leído en esta sesión); **[AUTODECLARADO]** = afirmación de marketing del proveedor (visto en un resultado de búsqueda, no en la página completa); **[NO VERIFICABLE]** = no se pudo confirmar.
> **Limitación de método importante:** En esta sesión no se pudieron abrir bas.com.ar, tiendanube.com, producteca.com, argentina.gob.ar ni centrodepartners.mercadolibre.com.ar porque estaban fuera de los dominios de red permitidos. Lo que se dice sobre esos sitios sale de fragmentos de buscador, no de leer la página completa. github.com sí se pudo abrir. Para cerrar los huecos sobre BAS hay que habilitar bas.com.ar o consultar al proveedor.

## 1. ¿Qué ofrece BAS (BAS CS / Buenos Aires Software) en omnicanalidad, API, web y móvil?

### Takeaway
No se encontró evidencia pública de que BAS CS tenga integración nativa u oficial con Mercado Libre o Tiendanube, una API REST pública, un portal B2B ni una app de preventa. Lo visible es un ERP de escritorio para Windows (cliente-servidor), con versión 4.6.0 anunciada hace unos 21 meses, y una línea "100% web" que corresponde a otro producto (Discovery, para pequeños comercios), no a BAS CS. Las únicas vías de omnicanalidad que aparecen son conectores de terceros que nombran a "BAS" entre los ERPs compatibles.

### Cited Findings
- Buenos Aires Software S.A. fue fundada en 1979. BAS CS (también "BAS Company Steering") es su ERP principal y cubre ventas, compras, finanzas, producción y contabilidad. Se ofrece para pymes mayoristas, minoristas y distribuidoras **[AUTODECLARADO]**. Fuentes: [BAS CS landing](https://bas.com.ar/landing-bas-cs/), [sistemasdefacturacionygestion.com.ar](https://sistemasdefacturacionygestion.com.ar/empresas/bas-software-erp/), [LinkedIn BAS](https://ar.linkedin.com/company/buenosairessoftware).
- Última versión de BAS CS encontrada: **4.6.0**. El anuncio habla de cambios en prefijos de comprobantes, opciones de valuación de stock y adjuntos de documentos. El buscador indicó que la página tenía unos 642 días (aprox. inicios de 2025). No describe funciones de ecommerce, API ni móvil **[AUTODECLARADO; fecha aproximada]**. Fuente: [Nueva versión BAS CS 4.6.0](https://bas.com.ar/nueva-version-bas-cs-4-6-0/), [Novedades productos](https://bas.com.ar/category/novedades-productos/).
- Las FAQs de BAS dicen que "es imprescindible que la PC tenga sistema operativo Windows". También mencionan "sistemas en la Nube" con 6 GB de almacenamiento gratis, sin aclarar si se trata de hosting o escritorio remoto ni a qué producto aplica **[AUTODECLARADO, fragmento]**. Fuente: [FAQs BAS](https://bas.com.ar/faq-items/).
- La etiqueta "NUEVO 100% WEB" del sitio corresponde a **Discovery (Easy Soft)**, sistema de punto de venta y gestión para pequeños comercios, no a BAS CS **[AUTODECLARADO, fragmento]**. Fuentes: [Productos BAS](https://bas.com.ar/productos/), [Home BAS](https://bas.com.ar/).
- **BAS Padrones** es una herramienta con interfaz web para importar padrones de retenciones y percepciones. Es compatible con Discovery 5.60 y BAS Company Steering 4.6.0 y está disponible para clientes abonados **[AUTODECLARADO]**. Fuentes: [BAS Padrones](https://bas.com.ar/padrones/), [¿Qué es BAS Padrones?](https://bas.com.ar/que-es-bas-padrones/).
- Otros productos de BAS: Quick POS (punto de venta para cadenas, "se integra con BAS CS"; versión 3.1.0 en novedades), BAS Laboro, Exacta y Salary. Se venden a través de una red de distribuidores regionales **[AUTODECLARADO]**. Fuentes: [Red de distribuidores](https://bas.com.ar/distribuidores/), [Software punto de venta](https://bas.com.ar/productos/software-para-punto-de-venta/).
- Caso de cliente: Distribuidora Imperial (Paraguay) eligió BAS CS para reemplazar un sistema a medida. El PDF es de 2017 **[AUTODECLARADO, antiguo]**. Fuente: [PDF caso Imperial](https://bas.com.ar/wp-content/uploads/2017/02/DISTRIBUIDORA-IMPERIAL.pdf).
- Una página del Ministerio de Producción (Asistencia Digital Pymes) lista una herramienta de ecommerce que "conecta y gestiona operatoria tienda de comercio electrónico con los sistemas de gestión empresarial ERP's como SOFTLAND - BAS - GBP - BEJERMAN - TANGO" (Mercado Libre, Linio, Amazon, Alibaba). Es la única mención de "BAS" junto a un conector de marketplaces. No se pudo abrir la página para identificar al proveedor **[fragmento de buscador; NO VERIFICABLE en detalle]**. Fuente: [argentina.gob.ar – Plataformas](https://www.argentina.gob.ar/produccion/asistencia-digital-para-pymes/vender-comprar-y-distribuir/plataformas).
- Búsquedas de "BAS CS" combinadas con Mercado Libre, Tiendanube, e-commerce, web service, API o app no devolvieron ninguna página de BAS ni de terceros que documente esas integraciones. La búsqueda en la tienda de apps de Tiendanube tampoco mostró una app de BAS. Ver resultados vía [búsqueda de apps de gestión Tiendanube](https://www.tiendanube.com/tienda-aplicaciones-nube/categorias/gestion?page=3) (no se pudo abrir).

### Inferences
- BAS CS sigue siendo un ERP cliente-servidor de escritorio para Windows. La "nube" que ofrece parece ser hosting del mismo sistema, aunque esto no está confirmado. La versión no cambió entre fines de 2024/inicios de 2025 y noviembre de 2026, o al menos no se publicó una nueva. Eso indica un ritmo de actualización lento frente a los SaaS, que publican cambios todo el tiempo.
- Si BAS tuviera integración oficial con Mercado Libre o Tiendanube, lo esperable sería que figurara en la tienda de apps de Tiendanube o en el Centro de Partners de Mercado Libre, como Tango, Dux o Contabilium. No aparece. Por lo tanto, para omnicanalidad un usuario de BAS CS probablemente dependa de middleware de terceros o de desarrollos a medida sobre la base de datos.

### Gaps
- Motor de base de datos de BAS CS (¿SQL Server? ¿otro?), lenguaje y arquitectura: no se encontró documentación pública.
- No se pudo confirmar si existe API o web services, portal de clientes, app de preventa, BI o funciones de IA. Hay que consultarlo directamente con BAS o habilitar bas.com.ar y releer el sitio completo.
- No se pudo identificar el conector de argentina.gob.ar que menciona "BAS" ni confirmar que esa "BAS" sea Buenos Aires Software.
- No se encontró ninguna versión de BAS CS posterior a la 4.6.0.

## 2. ¿Qué ERPs figuran en la tienda de apps de Tiendanube y en el directorio de partners de Mercado Libre? Hubs de terceros

### Takeaway
Tango, Dux y Contabilium tienen apps oficiales en Tiendanube. Contabilium y GlobalBluePoint aparecen con sello Platinum en el Centro de Partners de Mercado Libre (categoría finanzas y contabilidad), y Softland/Balcony es integrador Platinum. Flexxus declara integración propia con Mercado Libre y módulos B2B. Producteca hace de puente para Tango, SAP y, por medio de un tercero, Bejerman. BAS no aparece en ninguna de estas listas.

### Cited Findings
**Tiendanube App Store**
- **Tango**: app gratuita "Tango eCommerce". Exige ser usuario de Tango Gestión y las ventas entran al módulo Tango Ventas. Valoración 4.5 con 16 reseñas al momento de la búsqueda. También existe la app "Nexo Tiendas" **[fragmento de la ficha]**. Fuentes: [Tango eCommerce en Tiendanube](https://www.tiendanube.com/tienda-aplicaciones-nube/tangoecommerce), [Nexo Tiendas](https://www.tiendanube.com/tienda-aplicaciones-nube/nexo-tiendas), [Ayuda: integrar Tango](https://ayuda.tiendanube.com/es_ES/139131-aplicaciones-de-gestion-y-facturacion/como-integrar-tango-con-mi-tienda).
- **Dux Software**: app paga con prueba de 3 días. En la ficha chilena tiene 4.1 con 32 reseñas. Tiendanube publica una guía oficial de instalación **[fragmento]**. Fuentes: [Ayuda: integrar Dux](https://ayuda.tiendanube.com/es_AR/139131-aplicaciones-de-gestion-y-facturacion/como-integrar-dux-software-con-mi-tienda), [Dux en Tiendanube CL](https://www.tiendanube.com/cl/tienda-aplicaciones-nube/dux-software-erp).
- **Contabilium**: sincroniza ventas, stock y precios y emite facturación electrónica. Valoración 3.2 con 71 reseñas, con quejas por fallas y por soporte lento **[fragmento]**. Fuente: [Contabilium en Tiendanube](https://www.tiendanube.com/tienda-aplicaciones-nube/contabilium).
- **Flexxus**: no apareció en los resultados de la tienda de Tiendanube. Flexxus anuncia "nuevas integraciones eCommerce", pero no se pudo confirmar contra qué plataformas **[NO VERIFICABLE]**. Fuente: [Flexxus – Nuevas integraciones eCommerce](https://flexxus.com.ar/nuevas-integraciones-ecommerce-disponibles-2/).

**Mercado Libre**
- El Developer Partner Program funciona por niveles y medallas (Certificado, Silver, Gold, Platinum). Para consultoras en Argentina, el nivel Gold pide 35 sellers activos **[fragmento]**. Fuentes: [Developer Partner Program](https://developers.mercadolibre.com.ar/es_ar/developer-partner-program), [Consultoras MLA](https://partners.mercadolibre.com.ar/es_ar/consultant-mla).
- En la categoría "Finanzas y contabilidad" del Centro de Partners figuran con sello Platinum UpSeller ERP, **Contabilium** y **GlobalBluePoint ERP** ("ERP Argentino Completo") **[fragmento; listado cambiante]**. Fuentes: [Centro de Partners – Finanzas y contabilidad](https://centrodepartners.mercadolibre.com.ar/search/finanzas-y-contabilidad), [GlobalBluePoint ERP](https://centrodepartners.mercadolibre.com.ar/apps/globalbluepoint-erp).
- **Softland** (marca Balcony) se anunció como integrador **Platinum** de Mercado Libre, categoría que según ellos comparten solo 8 empresas en LATAM. Integra precios, stock, ventas y publicaciones con el ERP **[AUTODECLARADO]**. Fuentes: [Softland – Balcony Platinum](https://softland.com/ar/noticias-erp-softland-balcony-integrador-platinum-mercado-libre/), [Softland – ¿Cómo integrar mi ERP a Mercado Libre?](https://softland.com/ar/?p=23634).
- **Flexxus**: integración propia con Mercado Libre. Sincroniza catálogo, stock, precios y pedidos; cada venta genera una nota de pedido; permite publicar desde el ERP y vincular publicaciones existentes, incluido Catálogo ML **[AUTODECLARADO]**. Fuente: [Integración Flexxus – Mercado Libre](https://flexxus.com.ar/integracion-flexxus-mercado-libre/).
- Las búsquedas no mostraron a Tango, Flexxus ni Odoo dentro del Centro de Partners **[NO VERIFICABLE: no se pudo abrir el directorio]**.

**Hubs y middleware de terceros**
- **Producteca**: tiene páginas de integración con Tango (sincroniza precios, stock y pedidos) y con SAP (stock, precios y pedidos en tiempo real) **[AUTODECLARADO]**. Fuentes: [Producteca – Tango](https://www.producteca.com/en/integrations/tango), [Producteca – SAP](https://www.producteca.com/en/integrations/sap), [Producteca integraciones](https://www.producteca.com/en/integrations).
- **Bejerman**: CASE SA documenta que las notas de pedido de Producteca entran automáticamente a Bejerman. Un tercero advierte que Bejerman no tiene API REST pública, así que la integración depende de licencia y versión. Fuentes: [CASE SA catálogo](https://casesa.com.ar/catalogo/), [ProdConnecta – Integración ERP](https://www.prodconnecta.com/integracion-erp).
- **ProdConnecta** (producto distinto de Producteca) lista Tango, Bejerman, SAP Business One (vía Service Layer) y Odoo. Fuente: [ProdConnecta](https://www.prodconnecta.com/integracion-erp).
- Otros conectores Tiendanube↔Mercado Libre, como Astroselling y Ecomm-App, sincronizan entre canales pero no con un ERP. Fuente: [Ecomm-App integración Tiendanube](https://www.ecomm-app.com/integracion-tiendanube.html).
- Base.com/BaseLinker ofrece conectores con Mercado Libre (incluido Fulfillment AR) y con Tiendanube, y permite enviar pedidos a un ERP. Fuentes: [Base – ML AR Fulfillment](https://base.com/en-US/integrations/meliarfulfillment/), [BaseLinker – ML](https://baselinker.com/en-GB/integrations/melibr/).
- RealTrends, Multivende y Vinculado: no se encontraron fuentes en esta sesión.

### Inferences
- En Argentina, "estar en el ecosistema" significa tener app propia en Tiendanube y/o sello en el Centro de Partners de Mercado Libre. Tango, Dux y Contabilium lo cumplen en Tiendanube; Contabilium, GlobalBluePoint y Softland en Mercado Libre. Flexxus lo resuelve con integración propia. BAS no tiene presencia visible en ninguno de los dos canales.
- Para un ERP sin API pública, como Bejerman o, al parecer, BAS, la omnicanalidad depende de un middleware que lee o escribe la base de datos o hace de puente de pedidos, con el costo y la fragilidad que eso suma.

### Gaps
- No se pudo leer el listado completo y actualizado de la categoría Gestión de Tiendanube ni del Centro de Partners de Mercado Libre (dominios bloqueados).
- No hay datos de RealTrends, Multivende ni Vinculado.
- VTEX, Shopify y WooCommerce: no se investigaron conectores específicos por ERP argentino en esta sesión.

## 3. Documentación pública de APIs de ERPs relevantes

### Takeaway
Los competidores directos publican APIs documentadas: Tango (API Tiendas en GitHub, REST + webhooks), Dux (REST v1/v2, planes PRO/FULL), Contabilium (REST/JSON, plan Full), Finnegans (apidocs, REST) y Flexxus (declara integraciones). En BAS no se encontró nada equivalente.

### Cited Findings
- **Tango – API Tango Tiendas** (GitHub oficial de TangoSoftware) **[VERIFICADO]**:
  - API REST en `https://tiendas.axoft.com/api/Aperture/...`, con autenticación por header `accesstoken` (un token por cuenta).
  - Endpoints: POST de pedidos individuales y por lote (hasta 25 pedidos); GET paginado (pageSize hasta 5000) de productos, precios, listas de precios, stock por depósito, clientes, vendedores, cotizaciones, publicaciones y comprobantes.
  - Webhooks: OrderObserved, OrderProcessed, OrderRejected, OrderBilled, InvoiceFile, PriceProductUpdate y StockProductUpdate.
  - Requisitos: TLS 1.2, Tango Gestión o Punto de Venta Argentina (versión vigente o la inmediata anterior), licencia Tango Tiendas Full y pedidos solo en pesos.
  - Fuente: [github.com/TangoSoftware/ApiTiendas](https://github.com/TangoSoftware/ApiTiendas).
- **Tango – API Nexo Clientes**: devuelve en JSON las facturas electrónicas de Tango Gestión con CAE. Fuente: [github.com/TangoSoftware/ApiClientes](https://github.com/TangoSoftware/ApiClientes).
- Tango también tiene un módulo para Adobe Commerce (Magento) vía Tango Tiendas. Fuente: [Adobe Commerce Marketplace – Tango Tiendas](https://commercemarketplace.adobe.com/gento-module-tango-tiendas.html).
- **Dux Software**: API REST v1 y v2 en `erp.duxsoftware.com.ar/WSERP/rest/services/`, con token Bearer en v2. Solo está en los planes PRO y FULL, y Dux no hace integraciones a medida. Fuentes: [developers.duxsoftware.com.ar](https://developers.duxsoftware.com.ar/reference/inicio), [Ayuda Dux – API](https://ayuda.duxsoftware.com.ar/es/articles/8868252-api-dux-software), [duxsoftware.com.ar/api](https://duxsoftware.com.ar/api).
- **Contabilium**: API REST/JSON documentada en una colección de Postman. Disponible desde el plan Full; las credenciales se gestionan en Mi cuenta > Configuración > API. Fuentes: [Documentación de la API Contabilium](https://ayuda.contabilium.com/hc/es/articles/360013444234-Documentaci%C3%B3n-de-la-API), [Integraciones Contabilium](https://ayuda.contabilium.com/hc/es/sections/360003044473-Integraciones).
- **Finnegans**: documentación en apidocs.finneg.com. Las llamadas van a `api.teamplace.finneg.com/api/` con GET, POST, PUT y DELETE, y hay una política de consumo en la que POST y PUT cuentan aunque fallen. Fuentes: [Cómo usar APIs en Finnegans](https://bc.finneg.com/t/como-usar-apis-en-finnegans/4029), [Política de uso de APIs](https://bc.finneg.com/t/politica-de-uso-de-apis/5379).
- **Flexxus**: la empresa declara más de 5.000 clientes y un ERP con ventas, stock, compras, facturación, contabilidad y ecommerce sobre una misma base de datos. Para mayoristas ofrece módulos de logística, ecommerce B2B (tienda mayorista donde cada cliente entra con su usuario) y una app para viajantes/preventa. Tiene una página específica para "material eléctrico e iluminación" **[AUTODECLARADO]**. Fuentes: [Flexxus home](https://flexxus.com.ar/), [Flexxus distribuidoras y mayoristas](https://flexxus.com.ar/software-y-sistemas-de-gestion-para-distribuidores-y-mayoristas/), [Flexxus material eléctrico](https://flexxus.com.ar/software-de-gestion-para-negocios-de-electricidad-iluminacion/), [Flexxus B2C](https://flexxus.com.ar/ecommerce-para-minoristas-b2c/). No se encontró documentación pública de la API de Flexxus.
- **SAP Business One Service Layer**: lo usan conectores argentinos como ProdConnecta. Fuente: [ProdConnecta](https://www.prodconnecta.com/integracion-erp). Odoo (XML-RPC/JSON-RPC) y Business Central (API REST v2.0) tienen APIs públicas documentadas por sus fabricantes, pero no se volvieron a revisar en esta sesión. Referencias: [Odoo External API](https://www.odoo.com/documentation/17.0/developer/reference/external_api.html), [Business Central API v2.0](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/api-reference/v2.0/) **[NO re-verificado en esta sesión]**.
- Ya hay terceros que venden capas de IA sobre ERPs SaaS argentinos (por ejemplo, "Pulso Gestión IA" para Contabilium), apoyadas en sus APIs. Fuente: [usepulso.ai – Contabilium](https://usepulso.ai/sistemas/contabilium).

### Inferences
- Una API pública documentada (REST, tokens, webhooks) ya es lo normal en el segmento pyme argentino. Tango, que también nació como software de escritorio, la resolvió con una capa de nube (Tango Tiendas/Nexo) sobre el ERP local. Ese es el camino de modernización que no se ve en BAS CS.
- Que existan APIs abre la puerta a un ecosistema de terceros (IA, BI, conectores). Un ERP sin API queda afuera de ese ecosistema.

### Gaps
- No hay documentación pública de la API de Flexxus, Xubio ni Colppy en esta sesión.
- No se verificaron límites de uso, precios por llamada ni SLAs.

## 4. Tendencias 2024–2026 en ERP para Argentina

### Takeaway
Lo que más empuja las actualizaciones de ERP en 2026 es lo normativo (cambios de ARCA en facturación electrónica desde julio de 2026). Detrás vienen la preferencia por la nube y la incorporación de IA, sobre todo en proveedores SaaS. Varias fuentes son blogs de proveedores, así que conviene confirmar los detalles normativos en arca.gob.ar.

### Cited Findings
- Notas de prensa y blogs describen una **RG 5824/2026** que, desde el 1/7/2026, suma sujetos obligados a la factura electrónica, endurece la identificación del comprador y crea un esquema de liquidación electrónica mensual **[no confirmado en arca.gob.ar; una fuente menciona además bancos, aseguradoras y procesadoras de tarjetas, dato que no aparece en las otras]**. Fuentes: [Cronistas del Mundo](https://cronistasdelmundo.com.ar/tecno/arca-amplia-la-factura-electronica-desde-julio-de-2026-y-acelera-la-carrera-empresaria-por-actualizar-sistemas-2/), [Panorama Directo](https://panoramadirecto.com/arca-amplia-la-factura-electronica-desde-julio-de-2026-y-empresas-aceleran-la-actualizacion-de-sistemas/), [Cedalio – ARCA 2026](https://blog.cedalio.com/arca-2026-lo-que-cambia-en-facturacion-electronica-para-empresas-argentinas/), [Zetek – ARCA 2026](https://www.zetek.com.ar/blog/news/facturacion-electronica-arca-2026-guia-completa-para-negocios-en-argentina).
- Mordor Intelligence describe una preferencia estructural por módulos en la nube, aunque la soberanía de datos frena la adopción de nube pública. Fuente: [Mordor – ERP Argentina](https://www.mordorintelligence.ar/industry-reports/argentina-enterprise-resource-planning-market).
- Hay predicciones de agentes de IA que generan y validan facturas. Son proyecciones, no hechos consumados. Fuente: [DevelopArgentina – Tendencias IA 2026](https://developargentina.com/blog/tendencias-ia-argentina-2026-predicciones).
- Comparativas 2026 de ERPs para pymes en Argentina (blog de Commercy, que es parte interesada). Fuentes: [Commercy – comparativa 2026](https://commercy.com.ar/blog/sistemas-erp-pymes-argentina), [Commercy – mejores ERP 2026](https://commercy.com.ar/blog/mejores-erp-argentina).
- En distribución, el ecommerce B2B (tienda mayorista con login de cliente) y las apps de viajantes ya se venden como módulos estándar (ejemplo: Flexxus). Fuente: [Flexxus distribuidoras](https://flexxus.com.ar/software-y-sistemas-de-gestion-para-distribuidores-y-mayoristas/).

### Inferences
- Los cambios normativos frecuentes de ARCA favorecen a los SaaS, que actualizan a todos sus clientes de una vez. Un ERP local depende de que cada cliente instale la versión y del ritmo de releases del proveedor (en BAS, la última versión visible es la 4.6.0).

### Gaps
- No se leyó el texto oficial de la RG 5824/2026 en arca.gob.ar.
- No hay datos cuantitativos y confiables sobre la adopción de SaaS frente a on-premise en pymes argentinas.
- No hay evidencia de copilotos de IA nativos en Tango, Flexxus, Dux o Contabilium. Solo apareció la capa de terceros Pulso.

## 5. Criterios técnicos para juzgar obsolescencia (y cómo sale BAS CS)

### Takeaway
Con criterios objetivos (arquitectura, API, ecosistema de integraciones, web/móvil, ritmo de actualización), BAS CS aparece rezagado frente a Tango (que agregó una capa de nube, API y apps), Flexxus (Mercado Libre, B2B y app de viajantes) y los SaaS (Dux, Contabilium, Finnegans). La conclusión vale con una salvedad: falta información técnica directa de BAS.

### Cited Findings (evidencia por criterio)
| Criterio | Señal de "vigente" | BAS CS (evidencia) | Referentes |
|---|---|---|---|
| Arquitectura | SaaS multi-tenant o híbrido con capa nube | Escritorio Windows obligatorio; "nube" sin detalle ([FAQs](https://bas.com.ar/faq-items/)) | Dux/Contabilium/Finnegans SaaS; Tango híbrido vía Tiendas/Nexo ([ApiTiendas](https://github.com/TangoSoftware/ApiTiendas)) |
| API pública | REST documentada, tokens, webhooks | No encontrada | Tango, Dux, Contabilium, Finnegans (sección 3) |
| Ecosistema ecommerce | App en Tiendanube / sello en Mercado Libre | No figura; solo mención genérica "BAS" en un conector listado por el gobierno ([argentina.gob.ar](https://www.argentina.gob.ar/produccion/asistencia-digital-para-pymes/vender-comprar-y-distribuir/plataformas)) | Tango, Dux, Contabilium en Tiendanube; Contabilium, GlobalBluePoint, Softland Platinum en Mercado Libre; Flexxus con integración propia |
| Web/móvil | Portal B2B, app de preventa | No encontrados para BAS CS; "100% web" es Discovery ([Productos](https://bas.com.ar/productos/)) | Flexxus B2B + app de viajantes |
| Ritmo de actualización | Releases continuos | 4.6.0, anunciada hace ~21 meses ([release](https://bas.com.ar/nueva-version-bas-cs-4-6-0/)) | SaaS con actualización continua (inferencia) |
| Fiscal | Adaptación ágil a ARCA | BAS Padrones (web) para padrones ([Padrones](https://bas.com.ar/padrones/)) | — |

### Inferences
- Una regla práctica para la evaluación: un ERP de distribución "vigente" en 2026 debería tener al menos (1) API REST documentada o webhooks, (2) integración oficial o certificada con Mercado Libre y con al menos una plataforma de ecommerce (Tiendanube/WooCommerce/VTEX/Shopify), (3) app de preventa o portal B2B y (4) releases frecuentes con adaptación rápida a ARCA. Con la evidencia pública disponible, BAS CS no cumple claramente ninguno de los tres primeros.
- No ser SaaS no implica por sí solo obsolescencia: Tango es local y sigue vigente porque sumó una capa de nube y API. La pregunta clave para BAS es si existe esa capa y simplemente no está publicada.

### Gaps
- Faltan datos técnicos de BAS (base de datos, web services, roadmap, BI, IA). Preguntas sugeridas al proveedor: ¿hay API o web services documentados? ¿Integración Mercado Libre o Tiendanube oficial o por partner? ¿App de preventa? ¿Portal B2B? ¿Qué motor de base de datos usa y qué acceso ODBC/BI ofrece? ¿Cuál es el calendario de versiones?
- No se encontraron reseñas independientes de BAS CS (Capterra u otros) en esta sesión.
