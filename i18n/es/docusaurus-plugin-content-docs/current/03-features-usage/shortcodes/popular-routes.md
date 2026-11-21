---
title: "Rutas populares"
description: "Guía de uso y referencia técnica del módulo de escaparate Rutas populares."
sidebar_position: 18
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Función Pro
Esta página documenta una funcionalidad del complemento **MHM Rentiva Pro**. No forma parte de la edición
gratuita Lite de WordPress.org y requiere tener Pro instalado junto con Lite, además de una licencia válida.
Consulta [Ediciones: Lite frente a Pro](/docs/) para ver la división completa, o consigue Pro en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Propósito
Esta página describe el módulo Rutas populares —el escaparate de la página de inicio para las rutas de transferencia VIP— y abarca el uso operativo, la referencia completa de atributos y los puntos de extensión para desarrolladores.

Introducido en [v4.34.0](/blog/rentiva-v4.34.0-release); las tarjetas clicables y el rellenado previo mediante enlace profundo llegaron en [v4.34.1](/blog/rentiva-v4.34.1-release).
:::

# 🌟 Rutas populares

## Contenido
- Qué es este módulo
- Flujo de trabajo en la administración: fijar rutas
- Uso en el frontend (shortcode / bloque de Gutenberg / widget de Elementor)
- Referencia de atributos (16 atributos)
- Comportamiento al hacer clic en la tarjeta: rellenado previo mediante enlace profundo
- Puntos de extensión para desarrolladores (hooks de filtro)
- Comportamiento en Lite frente a Pro
- Estado vacío

El módulo Rutas populares muestra tus mejores rutas de transferencia VIP en la página de inicio como tarjetas A → B (origen → destino, duración media, distancia, precio desde). Cada tarjeta es un enlace clicable que lleva mediante enlace profundo al formulario de búsqueda de transferencias con el origen y el destino elegidos ya seleccionados, de modo que el visitante solo tiene que añadir la fecha y la hora y enviarlo.

## Qué es este módulo

Una **superficie de conversión para el módulo de transferencias**, no una interfaz de búsqueda. El módulo de transferencias ya incluye el formulario de búsqueda (`[rentiva_transfer_search]`) y el listado de resultados (`[rentiva_transfer_results]`). Rutas populares es el empujón previo que indica a los visitantes que se ofrece la transferencia VIP y les da un camino de un solo clic desde «veo una ruta que quiero» hasta «el formulario de búsqueda la tiene preseleccionada».

Tres superficies de renderizado comparten un único renderizador canónico (contrato de paridad de renderizado):

| Superficie | Identificador |
| :--- | :--- |
| Shortcode | `[rentiva_popular_routes]` |
| Bloque de Gutenberg | `mhm-rentiva/popular-routes` (con el título «MHM Popular Transfer Routes») |
| Widget de Elementor | `mhmrentiva_popular_routes` (con el título «MHM Popular Routes») |

El bloque y el widget delegan en el shortcode mediante `do_shortcode()`. Lo que renderice el shortcode lo renderizan el bloque y el widget de forma idéntica, sin rutas de código duplicadas.

## Flujo de trabajo en la administración: fijar rutas

El módulo lee de la tabla existente de **Rutas de traslado**; no hay una fuente de datos independiente de «rutas populares». Tú decides qué rutas son populares marcando una casilla.

### 1. Define tus rutas

Ve a **MHM Rentiva → Rutas de traslado** y crea o edita rutas de la forma habitual: elige las ubicaciones de origen y destino, establece la distancia y la duración, elige un método de precio (precio fijo o por km) e introduce el precio.

### 2. Fija las rutas que quieres en la página de inicio

El formulario de edición de cada ruta tiene una casilla en la parte inferior:

> **🌟 Vitrine Koy (fijar en el bloque de rutas populares)**
>
> Las rutas destacadas se fijan en primer lugar en el bloque `[rentiva_popular_routes]`, el bloque de Gutenberg y el widget de Elementor de la página de inicio.

Marca la casilla y guarda. La ruta aparece ahora con una insignia «🌟 Showcase» en la lista de rutas y queda fijada en la parte superior de la sección Rutas populares en todas las superficies que renderizan el shortcode, el bloque o el widget.

La caché transitoria (TTL de 1 hora) se invalida automáticamente con cada guardado y eliminación, así que los cambios se publican en la siguiente petición de página.

## Uso en el frontend

### Shortcode

Inserta el shortcode en cualquier página o entrada:

```shortcode
[rentiva_popular_routes]
```

Esto renderiza la configuración predeterminada: seis tarjetas, tres columnas en escritorio, orden «destacadas primero», todos los indicadores de visibilidad activados y tema claro.

Un ejemplo más configurado:

```shortcode
[rentiva_popular_routes
    columns="3"
    limit="6"
    order="featured"
    heading="Popüler Transfer Rotaları"
    subheading="En çok tercih edilen güzergahlar"
    filter_origin_city="Istanbul"
    show_view_all="true"]
```

### Bloque de Gutenberg

Añade el bloque **MHM Popular Transfer Routes** desde el insertador de bloques (categoría: Widgets). Los controles del inspector se agrupan en cuatro paneles:

| Panel | Controles |
| :--- | :--- |
| Diseño | Columnas (2/3/4), número máximo de tarjetas, tema (claro/oscuro) |
| Encabezado | Título, subtítulo, interruptor «Ver todo», URL personalizada de «Ver todo» |
| Ordenación y filtros | Orden (5 opciones), interruptor de solo fijadas, filtro por ciudad de origen, filtro por tipo de origen |
| Visualización de tarjetas | Mostrar duración, mostrar distancia, mostrar nota de tráfico, mostrar precio desde, símbolo de moneda |

El bloque usa `ServerSideRender`, por lo que la vista previa del editor coincide exactamente con el frontend en vivo.

### Widget de Elementor

Añade el widget **MHM Popular Routes** desde el panel de Elementor (categoría: MHM Rentiva). Están disponibles las mismas cuatro secciones de controles, además de los controles de estilo estándar del contenedor de Elementor (margen, relleno, color, tipografía).

## Referencia de atributos

Los 16 atributos aceptan la forma canónica snake_case (usada por el shortcode) y un alias camelCase (usado por el bloque / widget). El CAM (Canonical Attribute Mapper) del plugin normaliza ambos a la misma forma interna.

| Atributo | Predeterminado | Tipo | Propósito |
| :--- | :--- | :--- | :--- |
| `limit` | `6` | int (1-50) | Número máximo de tarjetas renderizadas. |
| `columns` | `3` | enum | Columnas de la cuadrícula en escritorio: `2`, `3` o `4`. En tableta siempre 2, en móvil siempre 1. |
| `order` | `featured` | enum | `featured` / `price_asc` / `price_desc` / `alphabetical` / `newest` |
| `heading` | "Rutas populares" | string | Título de la sección (traducible). |
| `subheading` | "Rutas de traslado VIP más solicitadas" | string | Subtítulo de la sección (traducible). |
| `show_view_all` | `true` | bool | Muestra el enlace «Buscar transferencias» en el encabezado de la sección. |
| `view_all_url` | vacío | url | Sustituye el destino del enlace. Si está vacío, se usa el filtro `mhmrentiva_popular_routes_view_all_url`; si este también está vacío, el enlace se oculta. |
| `show_duration` | `true` | bool | Renderiza la línea «Aprox. X min» en cada tarjeta. |
| `show_distance` | `true` | bool | Renderiza la línea «X km» en cada tarjeta. |
| `show_traffic_note` | `true` | bool | Renderiza el aviso «Puede variar según el tráfico». |
| `show_price` | `true` | bool | Renderiza la línea del precio desde en cada tarjeta. |
| `currency_symbol` | `₺` | string | Prefijo del precio (un solo carácter o un código corto). |
| `filter_origin_city` | vacío | string | Muestra solo las rutas cuya ubicación de origen está en esta ciudad (sin distinguir mayúsculas y minúsculas). |
| `filter_origin_type` | vacío | enum | Muestra solo las rutas cuyo origen es de este tipo: un tipo de ubicación almacenado `airport` / `hotel` / `port` / `station` / `city_center` / `hospital`, o un tipo personalizado que hayas añadido. Desde Pro 6.3.0 los editores listan estos tipos; las antiguas opciones fijas `train` y `marina` no coincidían con ninguna ubicación y se eliminaron. |
| `featured_only` | `false` | bool | Renderiza solo las rutas que tienen marcada la casilla «🌟 Showcase». |
| `theme` | `light` | enum | `light` / `dark` (el claro es el predeterminado probado en producción). |

### Detalles del orden

- **`featured`**: primero las rutas fijadas (en orden `created_at DESC` dentro del conjunto fijado) y después las no fijadas (también `created_at DESC`). Es el orden predeterminado y el previsto para el escaparate.
- **`price_asc`** / **`price_desc`**: ordena por `min_price` (precio calculado) o `base_price` (precio fijo) de forma ascendente o descendente.
- **`alphabetical`**: ordena por el nombre del origen y después por el nombre del destino.
- **`newest`**: `created_at DESC` puro, independientemente de si están fijadas.

### Iconos de tipo de origen

La esquina superior derecha de la tarjeta muestra un icono según el tipo de la ubicación de origen:

| Tipo | Icono predeterminado |
| :--- | :--- |
| `airport` | ✈️ |
| `station` | 🚆 |
| `hotel` | 🏨 |
| `port` | ⛵ |
| `city_center` | 🏙️ |
| (otro) | ↗ |

Sustituye esta correspondencia con el filtro `mhmrentiva_popular_routes_type_icon` (consulta Puntos de extensión para desarrolladores más abajo).

## Comportamiento al hacer clic en la tarjeta: rellenado previo mediante enlace profundo

Cada tarjeta está envuelta en un elemento `<a>`. Al hacer clic, se llega a la página de búsqueda de transferencias (resuelta mediante filtros, ver más abajo) con los valores `origin_id` y `destination_id` elegidos añadidos como parámetros de consulta:

```
.../transfer/?origin_id=73&destination_id=76
```

El shortcode de búsqueda de transferencias lee estos parámetros de consulta y preselecciona las opciones correspondientes en sus elementos `<select>`. El visitante ve:

> **TESLİM ALMA KONUMU:** İstanbul Havalimanı (IST)
> **BIRAKMA KONUMU:** Taksim Ofis
> **TARİH:** _(vacío: lo introduce el visitante)_
> **SAAT:** 10:00

…y solo tiene que añadir la fecha y enviar. El camino desde «hacer clic en una tarjeta de la página de inicio» hasta «ver los resultados» son dos interacciones en lugar de cuatro.

El rellenado previo es **retrocompatible**: una página de búsqueda de transferencias cargada sin parámetros de consulta se comporta exactamente igual que antes de la v4.34.1. El cambio es puramente aditivo.

## Puntos de extensión para desarrolladores

### `mhmrentiva_popular_routes_view_all_url`

Filtro para el destino del **enlace del encabezado de la sección** (enlace «Buscar transferencias»). Lo devuelve `resolve_view_all_url()`.

```php
add_filter('mhmrentiva_popular_routes_view_all_url', function ($url) {
    return home_url('/transfer/');
});
```

Cuando este filtro devuelve un valor vacío, el enlace del encabezado de la sección se oculta, lo que resulta útil en instalaciones que aún no tienen una página de búsqueda de transferencias.

### `mhmrentiva_popular_routes_search_url`

Filtro para la URL base del **destino del clic en la tarjeta** (introducido en la v4.34.1). Es independiente del enlace del encabezado de la sección, de modo que los temas pueden dirigirlos a páginas distintas.

```php
add_filter('mhmrentiva_popular_routes_search_url', function ($url) {
    return home_url('/transfer-search/');
});
```

Si está vacío, recurre al filtro `mhmrentiva_popular_routes_view_all_url`, que a su vez recurre a `home_url('/transfer/')`.

### `mhmrentiva_popular_routes_type_icon`

Filtra el icono del tipo de origen. Recibe el icono predeterminado y el slug del tipo.

```php
add_filter('mhmrentiva_popular_routes_type_icon', function ($icon, $type) {
    if ($type === 'airport') {
        return '🛫';
    }
    return $icon;
}, 10, 2);
```

Útil cuando la identidad de la marca pide emojis diferentes o glifos de texto cortos.

### `TransferRouteProvider::get_popular_routes()`

La clase del repositorio forma parte de la API semipública. Acepta un array de argumentos saneados y devuelve objetos de ruta con los datos de origen y destino unidos. Los temas que quieran renderizar su propio marcado de tarjeta pueden llamarla directamente:

```php
$routes = \MHMRentiva\Admin\Transfer\Engine\TransferRouteProvider::get_popular_routes([
    'limit'              => 6,
    'order'              => 'featured',
    'featured_only'      => false,
    'filter_origin_city' => 'Istanbul',
    'filter_origin_type' => 'airport',
]);

foreach ($routes as $route) {
    // $route->origin_name, $route->destination_name, $route->min_price,
    // $route->is_featured, $route->origin_type, etc.
}
```

El resultado de la consulta se almacena en caché transitoria durante 1 hora. Llamar a `TransferRouteProvider::clear_cache()` invalida todas las variantes en caché; las operaciones CRUD de rutas en la administración lo hacen automáticamente.

## Comportamiento en Lite frente a Pro

La transferencia VIP, y con ella este shortcode, viene con Rentiva Pro y se activa con cualquier licencia Pro activa. No hay cuota de rutas: el administrador puede definir tantas rutas como necesite y la sección renderiza tantas tarjetas como indique el atributo `limit` (6 por defecto, máximo 50). Sin una licencia Pro activa, la etiqueta no renderiza nada.

## Estado vacío

Si ninguna ruta supera el filtro de elegibilidad (ambos extremos `is_active=1` Y `allow_transfer=1`, además de cualquier filtro indicado por el usuario), la sección no renderiza **absolutamente nada**: ni un marcador «Próximamente...», ni una cuadrícula vacía, ni ruido en la consola. Las instalaciones nuevas se ven limpias; las instalaciones con datos solo muestran lo que tienen.

Esto es intencionado. Una sección presente pero vacía parece rota; una sección ausente pasa desapercibida.

## Consulta también

- [Notas de la versión v4.34.0](/blog/rentiva-v4.34.0-release): introducción original de la función
- [Notas de la versión v4.34.1](/blog/rentiva-v4.34.1-release): tarjetas clicables y rellenado previo mediante enlace profundo
- [Notas de la versión v4.34.2](/blog/rentiva-v4.34.2-release): corrección urgente del estilo de los iconos de las tarjetas de transferencia
- [Shortcode de búsqueda de transferencias](./transfer-search): el formulario al que enlaza Rutas populares
- [Shortcode de resultados de transferencias](./transfer-results): la página de resultados que se renderiza tras enviar la búsqueda
- [Módulo de transferencia VIP](../vip-transfer): guía operativa de la funcionalidad de transferencias en general
