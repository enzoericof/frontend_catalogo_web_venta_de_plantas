# Terramía Ornamentales

Catálogo Angular 20 para venta por cantidad de Sansón de campo. La segunda versión adapta la disposición de la captura de Apple indicada por el usuario: navegación compacta, presentación centrada y fotografía debajo de las acciones.

## Desarrollo

- `npm install` si faltan dependencias.
- `npm start` sirve la vista local en http://localhost:4200.
- `npm run build` genera `dist/catalogo-plantas/browser`.
- `npm run check:catalogo` comprueba cantidades, catálogo y contactos con Node 22.6 o posterior.

## Contenido y fotografías

`src/app/core/catalogo.data.ts` contiene las especies y `src/app/core/tienda.data.ts` contiene los contactos y anuncios. La información procede de las páginas 2–5 del Canva `DAHW-PAe_QI`. No se inventan precios ni disponibilidad.

Las fotografías de la web son archivos JPEG individuales, sin textos de los flyers:

- `sanson-hojas.jpg`: 1200 × 1600, recuperada de la imagen utilizada por Canva a través de la sesión del usuario.
- `sanson-vivero.jpg`: 960 × 1280, archivo original del ZIP de WhatsApp proporcionado por el usuario.
- `sanson-cerco.jpg`: 960 × 1280, archivo original del mismo ZIP.

Las fotos se muestran con proporciones conservadas. La portada usa un encuadre mediante `object-fit: cover`; al ampliarla se muestra la foto completa mediante `object-fit: contain`. Las miniaturas de los flyers de la primera versión se conservan como referencias, pero ya no se utilizan como fotografías del producto.

Agregar entradas a `PRODUCTOS` agrega tarjetas al catálogo y habilita sus fichas por identificador. Cada producto incluye su subtítulo, fotos de contexto, cuidados y opción de calculadora; no se reutilizan los cuidados de otra especie.

## Cálculo y contacto

Para una fila con una planta en cada extremo: `ceil(metros * 100 / separacionCm) + 1`. El resultado es orientativo. El enlace de WhatsApp prepara un mensaje con metros, separación y cantidad; no envía mensajes automáticamente.

El frontend se puede consultar sin el backend. Los servicios Java existentes se conservan para una futura integración de administración o disponibilidad.

## Verificación y próximos datos

La comparación visual está en `design-qa.md`, con capturas de escritorio y celular en `design-reference/`. La compilación conserva la advertencia original de estilos a 4 kB por componente; no supera el límite de error de 8 kB.

Pendiente de contenido: confirmar el enlace de Instagram y, cuando corresponda, conectar un dominio propio. Los contactos actuales provienen de los flyers de la marca.

## Estructura de la tienda

- `/`: feed de anuncios. Un anuncio de producto y otro de Terramía, con destinos explícitos.
- `/catalogo`: una tarjeta por producto. Cada tarjeta abre su ficha.
- `/plantas/:id`: información específica de esa especie, galería, cuidados y calculadora cuando corresponde.
- `/contacto`: contactos y condiciones generales de la tienda. Su WhatsApp prepara una consulta general.

`src/app/core/tienda.data.ts` contiene contactos, consulta general y anuncios. `src/app/core/catalogo.data.ts` contiene información de las especies. El header y footer compartidos están en `src/app/app.html` y el menú permanece visible al desplazarse. Los títulos de las pestañas distinguen cada página y producto.

`npm test -- --watch=false --browsers=ChromeHeadless` verifica cinco recorridos de la tienda: inicio, catálogo, ficha, contacto y producto inexistente. Los enlaces de ancla de la ficha conservan su ruta, con margen para el header fijo.

## Adaptación a pantalla

El anuncio principal utiliza el ancho y el alto del viewport (`svh`), con espacio flexible entre texto e imagen. La versión elegida muestra la foto del vivero en un encuadre horizontal debajo del título, con `object-fit: cover` y altura adaptable. En pantallas pequeñas se permite desplazamiento vertical para conservar tamaños legibles.

Revisado en 320×568, 390×844, 768×1024, 1366×768, 1920×1080, 844×390 y 640×360. No se observó desbordamiento horizontal. Las capturas están en `design-reference/responsive-mobile.png`, `responsive-1366.png` y `responsive-horizontal.png`.

## Publicación en Cloudflare Pages

Configuración para el proyecto Terramía Ornamentales:

- Proyecto: `terramia-ornamentales`.
- Dirección: https://terramia-ornamentales.pages.dev/.
- Proveedor: Cloudflare Pages, integración con GitHub.
- Repositorio: `enzoericof/frontend_catalogo_web_venta_de_plantas`.
- Rama inicial de publicación: `codex/terramia-catalogo`.
- Comando de compilación: `npm run build`.
- Directorio de salida: `dist/catalogo-plantas/browser`.
- Directorio raíz: raíz del repositorio.
- Node: versión de `.node-version`.

No se requieren variables secretas ni conexión al backend para esta versión. Pages utiliza su resolución de rutas SPA cuando no hay un `404.html` en el directorio de salida, de modo que `/catalogo`, `/contacto` y `/plantas/sanson-de-campo` pueden abrirse directamente.

Solo se publica el resultado de la compilación, sin referencias, ZIP originales, archivos de desarrollo ni credenciales. La rama de producción puede cambiarse a `main` cuando se integre la versión aprobada.
