---
title: "Directorio de vendedores"
description: "Guía de uso y referencia técnica del módulo Directorio de vendedores: catálogo público de vendedores activos con filtros por ciudad, insignia y valoración."
sidebar_position: 27
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Función Pro
Esta página documenta una funcionalidad del complemento **MHM Rentiva Pro**. No forma parte de la edición gratuita
Lite de WordPress.org y requiere tener Pro instalado junto con Lite, además de una licencia válida.
Consulta [Ediciones: Lite frente a Pro](/docs/) para ver la división completa, o consigue Pro en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Propósito
Esta página documenta el módulo Directorio de vendedores: el catálogo público, restringido a Pro, disponible en `/vendors/` (EN) / `/bayiler/` (TR), que muestra todos los vendedores activos con filtros por ciudad, insignia y valoración mínima. Cubre el uso operativo, la referencia de atributos, el schema/SEO y los puntos de extensión para desarrolladores.

Introducido en la [v4.38.0](/blog/rentiva-v4.38.0-release); la paridad del ciclo de vida del recuento de vehículos, la corrección de tipos estrictos en la paginación y las protecciones de paridad de SEO/caché llegaron en la [v4.38.1](/blog/rentiva-v4.38.1-release).
:::

# 🗂️ Directorio de vendedores

## Contenido
- Qué es este módulo
- Estructura de URL (`/vendors/` EN, `/bayiler/` TR)
- Uso en el frontend (shortcode / bloque de Gutenberg / widget de Elementor)
- Interfaz de filtros (ciudad, insignia, valoración mínima, orden)
- Paginación
- Referencia de atributos (8 atributos)
- JSON-LD de Schema.org `ItemList` + `BreadcrumbList`
- Estrategia de caché (transient de 30 min + invalidación por comodín de prefijo)
- Puntos de extensión para desarrolladores (5 hooks de filtro + interruptor de desactivación `seo_disable`)
- Doble capa de restricción Pro
- Estados vacíos

El Directorio de vendedores cierra el ciclo de descubrimiento del marketplace. Las páginas de perfil existen (introducidas en la [v4.37.0](/blog/rentiva-v4.37.0-release)), pero no se puede llegar a ellas sin una lista. El directorio es esa lista: renderizada en el servidor, compatible sin JS, pensada primero para el SEO, al estilo de Dokan.

## Qué es este módulo

Una **superficie de descubrimiento de vendedores**, paralela a cómo `[rentiva_vehicles_grid]` es una superficie de descubrimiento de vehículos. Normalmente los clientes no conocen de antemano los nombres de los vendedores; quieren recorrer una lista, filtrar por ubicación y hacer clic para entrar en un perfil. El Directorio de vendedores es esa lista, con una estructura que también entienden los rastreadores y los lectores de pantalla.

Tres superficies de renderizado comparten un único renderizador canónico (contrato de paridad de renderizado):

| Superficie | Identificador |
| :--- | :--- |
| Shortcode | `[rentiva_vendor_directory]` |
| Bloque de Gutenberg | `mhm-rentiva/vendor-directory` (con el título "MHM Vendor Directory") |
| Widget de Elementor | `mhmrentiva_vendor_directory` (con el título "MHM Vendor Directory") |

El bloque y el widget delegan en el shortcode mediante `do_shortcode()`. Lo que renderiza el shortcode lo renderizan exactamente igual el bloque y el widget: no hay doble ruta de código.

Además de la colocación manual, el módulo registra una **regla de reescritura** que sirve automáticamente un contenedor de página completa en `/{base}/`, sin necesidad de una página de WordPress.

## Estructura de URL

El segmento base es traducible:

| Idioma | URL |
| :--- | :--- |
| EN (predeterminado) | `/vendors/` |
| TR | `/bayiler/` (`.po` traducción de `_x('vendors', 'URL slug', ...)`) |
| Personalizado | Sobrescríbelo con el filtro `mhmrentiva_vendor_directory_url_base` |

La base es hermana de la base del Perfil de vendedor (aunque independiente de ella): el Perfil es de un único vendedor con un grupo de captura del slug (`/vendor/{slug}/`), mientras que el Directorio es solo la base (`/vendors/`).

El estado de los filtros, el orden y la paginación se transmite en la cadena de consulta:

```
/vendors/?city=Istanbul&badge=verified&min_rating=4&sort=rating&paged=2
```

Cada combinación es una URL única e indexable: los motores de búsqueda rastrean toda la matriz de filtros.

## Uso en el frontend

### Colocación manual (página o entrada)

Inserta el shortcode en cualquier página:

```shortcode
[rentiva_vendor_directory]
```

Esto renderiza la configuración predeterminada: 12 vendedores por página, orden por valoración descendente y todas las secciones de la interfaz visibles.

Ejemplo configurado:

```shortcode
[rentiva_vendor_directory
    per_page="12"
    default_sort="rating"
    show_filter_bar="yes"
    show_breadcrumb="yes"
    show_pagination="yes"
    empty_message="Şu an aktif bayi bulunmuyor."]
```

### Bloque de Gutenberg

Añade el bloque **MHM Vendor Directory** desde el insertador (categoría: Widgets). Los controles del inspector exponen todos los atributos del shortcode mediante paneles del inspector.

### Widget de Elementor

Añade el widget **MHM Vendor Directory** desde el panel de Elementor (categoría: MHM Rentiva). Los controles con paridad automática coinciden con los atributos del shortcode.

## Interfaz de filtros

La barra de filtros predeterminada es una fila horizontal de cuatro desplegables `<select>` + un botón de envío "Aplicar" (`<form method="get">`). Cada control es un elemento HTML nativo: el formulario funciona sin JavaScript. La capa de JS (cuando está activada) añade un envío automático opcional mediante el evento `change` como mejora progresiva.

| Control | Parámetro de consulta | Opciones |
| :--- | :--- | :--- |
| Ciudad | `city` | Todas las ciudades (sede del vendedor ∪ ubicaciones de recogida de vehículos, sin duplicados) |
| Insignia | `badge` | Todos / Vendedores verificados / Vendedores nuevos |
| Valoración mínima | `min_rating` | Todas las valoraciones / 3+ ★ / 4+ ★ / 5 ★ |
| Orden | `sort` | Mejor valorados (predeterminado) / Más recientes / A → Z |

En móviles (≤600px), la barra de filtros se contrae en dos botones ("Filtrar (N)" + "Ordenar") que abren una hoja a pantalla completa mediante un elemento nativo `<details>`, también sin necesidad de JS.

### Orden predeterminado: valoración descendente con desempate por más reciente

El orden por valoración descendente es el predeterminado porque muestra primero a los vendedores más sólidos. Los vendedores sin valoraciones (o con valoraciones idénticas) se desempatan por `user_registered` descendente: las cuentas más nuevas aparecen por encima de las más antiguas con la misma valoración, para que un marketplace recién creado no parezca estancado.

## Paginación

Paginación clásica por números de página: parámetro de consulta `?paged=N`, sin AJAX. El valor predeterminado es 12 por página (4 columnas × 3 filas en escritorio, 2 × 6 en tableta, 1 × 12 en móvil). El selector `.current` está acotado bajo `.mhm-vendor-directory-pagination` para evitar que las reglas `.current` del tema secuestren los estilos (verificado en pruebas de regresión desde la [v4.38.1](/blog/rentiva-v4.38.1-release)).

## Referencia de atributos

Los 8 atributos aceptan la forma canónica snake_case (usada por el shortcode) y un alias camelCase (usado por el bloque / widget).

| Atributo | Predeterminado | Tipo | Propósito |
| :--- | :--- | :--- | :--- |
| `per_page` | `12` | int (1-50) | Tarjetas por página. Se ajusta al rango. |
| `default_sort` | `rating` | enum | Orden predeterminado cuando falta `?sort=`. Opciones: `rating`, `newest`, `alpha`. |
| `show_filter_bar` | `yes` | bool | Renderiza la barra de filtros encima de la cuadrícula. |
| `show_breadcrumb` | `yes` | bool | Renderiza la ruta de navegación `Anasayfa › Bayiler` del plugin (se desactiva automáticamente cuando hay un plugin de SEO activo; consulta Schema/SEO más abajo). |
| `show_pagination` | `yes` | bool | Renderiza la navegación por números de página al final de la cuadrícula. |
| `empty_message` | vacío | string | Sobrescribe el texto "Ningún vendedor coincide con estos criterios." (rama vacía del resultado de filtrado). |
| `class` | vacío | string | Clase(s) CSS adicionales en el contenedor. Se aceptan varios valores; cada uno se sanea por separado. |
| `id` | vacío | string | id del DOM en el elemento contenedor. Saneado mediante `sanitize_html_class()`. |

## JSON-LD de Schema.org `ItemList` + `BreadcrumbList`

El módulo emite dos bloques `<script type="application/ld+json">` en `<head>` para la página del directorio:

- **`ItemList`**: lista ordenada de URL de perfiles de vendedores (solo la página renderizada, no el conjunto completo de resultados, para mantener acotado el tamaño).
- **`BreadcrumbList`**: la ruta `Home › Vendors`, que refleja la ruta de navegación visible.

La codificación JSON usa `JSON_HEX_TAG | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES`: se conservan los caracteres turcos y las inyecciones hostiles de `</script>` se codifican en hexadecimal.

### Detección de plugins de SEO: cede automáticamente

Tanto la emisión de JSON-LD como la ruta de navegación visual quedan **inactivas cuando hay algún plugin de SEO importante activo**. El conjunto detectado:

- Yoast SEO (constante `WPSEO_VERSION` o clase `WPSEO_Frontend`)
- Rank Math (constante `RANK_MATH_VERSION` o clase `RankMath`)
- All in One SEO (constante `AIOSEO_VERSION` o clase `AIOSEO\Plugin\AIOSEO`)
- SEOPress (constante `SEOPRESS_VERSION`)
- The SEO Framework (constante `THE_SEO_FRAMEWORK_VERSION`)
- SmartCrawl (constante `SMARTCRAWL_VERSION` o clase `Smartcrawl_Init`)

Google penaliza el schema duplicado, y estos plugins tienen interfaces de ajustes más completas que la nuestra, así que les cedemos el paso. La detección se ejecuta tanto en el retorno anticipado de `register()` (desde la [v4.38.1](/blog/rentiva-v4.38.1-release)) como en cada callback, como segunda capa defensiva (por si un plugin de SEO se carga después de que se ejecute nuestro enganche).

El título de la página (predeterminado: `Vendors — {site name}`) y la meta descripción (predeterminada: `Discover all our vendors. {N} vendors · {M} vehicles`) siguen la misma detección: solo se emiten cuando no hay ningún plugin de SEO activo. Puedes sobrescribir cualquiera de los dos valores predeterminados mediante un filtro (consulta Puntos de extensión para desarrolladores).

## Estrategia de caché

Cada combinación única de filtro + orden + página se almacena en caché en un transient con un TTL de 30 minutos:

```
mhmrentiva_vendor_dir_{md5(query_args)}
```

La invalidación es un **subconjunto del invalidador del Perfil de vendedor**: solo los campos que afectan al listado del directorio provocan un vaciado:

- Cambio del user_meta `_mhmrentiva_vendor_status` (activo ↔ suspendido)
- Cambio del user_meta `_mhmrentiva_vendor_city` (desplegable del filtro + conjunto de resultados por ciudad)
- Cambio del user_meta `_mhmrentiva_vendor_reliability_score` (grupos del filtro de insignias)
- `save_post_mhmrentiva_vehicle` (añadir/eliminar vehículos cambia vehicle_count + el conjunto de ciudades)
- `mhmrentiva_vehicle_lifecycle_changed` (activo/retirado/en pausa afecta a la inclusión)
- `transition_comment_status` (la aprobación de reseñas cambia la valoración agregada)
- `profile_update` (el cambio del nombre visible afecta a la etiqueta de la tarjeta + el orden alfabético)

Los cambios en la biografía y las subidas de avatar **no se invalidan deliberadamente**: las tarjetas del directorio no muestran esos campos, así que un vaciado en esos casos sería trabajo desperdiciado. La caché se apoya en un `DELETE` SQL con comodín de prefijo (una sola consulta elimina de golpe todas las variantes en caché).

Cuando el estado del ciclo de vida no cambia realmente, el invalidador no hace nada (en paridad con la no-operación del estado de comentarios desde la [v4.38.1](/blog/rentiva-v4.38.1-release)): volver a guardar vehículos sin transiciones de ciclo de vida no anula la caché.

## Puntos de extensión para desarrolladores

### `mhmrentiva_vendor_directory_url_base`

Sobrescribe el segmento base de la URL. Útil para slugs personalizados del marketplace.

```php
add_filter('mhmrentiva_vendor_directory_url_base', function ($base) {
    return 'firmalar';
});
```

El vigilante de cambios de idioma detecta el nuevo valor y vacía las reglas de reescritura automáticamente.

### `mhmrentiva_vendor_directory_per_page`

Sobrescribe el límite por página desde fuera del shortcode. Te permite establecer una política para todo el sitio sin editar cada instancia de bloque/widget.

```php
add_filter('mhmrentiva_vendor_directory_per_page', function () {
    return 24;
});
```

### `mhmrentiva_vendor_directory_empty_message`

Filtra el texto de "no se han encontrado vendedores". Dos contextos:

- Resultado de filtrado vacío (el usuario ha filtrado hasta quedarse sin coincidencias)
- Cero en todo el sitio (no hay vendedores activos en ningún lugar)

Sobrescríbelo según el contexto:

```php
add_filter('mhmrentiva_vendor_directory_empty_message', function ($message, $context) {
    if ($context === 'site_wide_zero') {
        return 'Henüz kayıtlı bayimiz yok. Yakında!';
    }
    return $message;
}, 10, 2);
```

### `mhmrentiva_vendor_directory_page_title`

Sobrescribe el título de la página (predeterminado: `Vendors — {site name}`). Lo devuelve `VendorDirectorySeo::build_title()`. Inactivo cuando hay un plugin de SEO activo.

### `mhmrentiva_vendor_directory_meta_description`

Sobrescribe la meta descripción. El filtro recibe tres argumentos (texto predeterminado, recuento de vendedores, recuento de vehículos) para que puedas crear un texto adaptado al contexto.

```php
add_filter('mhmrentiva_vendor_directory_meta_description',
    function (string $default, int $vendor_count, int $vehicle_count): string {
        return sprintf(
            'Antalya rent-a-car marketplace — %d aktif bayi, %d araç.',
            $vendor_count,
            $vehicle_count
        );
    },
    10,
    3
);
```

### `mhmrentiva_vendor_directory_seo_disable`

Interruptor global de desactivación tanto para el JSON-LD de schema como para la emisión del título/descripción. Devuelve `false` de forma predeterminada; establécelo en `true` para desactivarlo por completo (normalmente porque tu tema gestiona los metadatos del directorio a su manera).

```php
add_filter('mhmrentiva_vendor_directory_seo_disable', '__return_true');
```

## Doble capa de restricción Pro

El Directorio de vendedores es una **función exclusiva de Pro**: requiere el indicador `vendor_marketplace`. Los usuarios de Lite se encuentran con dos barreras:

1. **Barrera en el despacho**: el manejador `template_redirect` devuelve un 404 de WordPress para las peticiones a `/{base}/` cuando `Mode::canUseVendorMarketplace()` es false. El usuario ve la página 404 del tema.
2. **Barrera en el renderizado**: el uso manual del shortcode por parte de usuarios de Lite (bloque / widget / shortcode en una página) devuelve una cadena vacía. Sin ventana modal de venta, sin registro de errores, sin HTML renderizado a medias.

Los avisos de actualización están en `/pricing` y en el shortcode existente `[mhmrentiva_pricing_table]`.

## Estados vacíos

| Estado | Renderizado |
| :--- | :--- |
| Resultado de filtrado vacío (existen vendedores activos, pero los filtros los excluyen a todos) | "Bu kriterlere uyan bayi bulunamadı." + enlace "Filtreleri Temizle" que vuelve a `/{base}/` |
| Cero en todo el sitio (no hay vendedores activos en ningún lugar) | "Henüz kayıtlı bayimiz yok. Yakında!": se puede sobrescribir mediante un filtro |
| Usuario de Lite | 404 de WordPress (barrera en el despacho) o cadena vacía (colocación manual) |

## Véase también

- [Notas de la versión v4.38.0](/blog/rentiva-v4.38.0-release): introducción original de la función
- [Notas de la versión v4.38.1](/blog/rentiva-v4.38.1-release): paridad del ciclo de vida del recuento de vehículos, corrección de tipos estrictos en la paginación, protecciones de paridad de SEO/caché
- [Shortcode del perfil público del vendedor](./vendor-profile): la página de destino a la que enlaza cada tarjeta del directorio
- [Shortcode del formulario de solicitud de vendedor](./vendor-apply): el formulario de incorporación
- [Incorporación de vendedores](/docs/vendor/onboarding): cómo llegan los vendedores al directorio en primer lugar
