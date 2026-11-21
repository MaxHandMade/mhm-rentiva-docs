---
title: "Perfil público del vendedor"
description: "Guía de uso y referencia técnica del módulo Perfil público del vendedor: shortcode, bloque de Gutenberg y widget de Elementor."
sidebar_position: 26
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Función Pro
Esta página documenta una funcionalidad del complemento **MHM Rentiva Pro**. No forma parte de la edición gratuita
Lite de WordPress.org y requiere tener Pro instalado junto a Lite, además de una licencia válida.
Consulta [Ediciones — Lite frente a Pro](/docs/) para ver la división completa, o consigue Pro en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Propósito
Esta página documenta el módulo Perfil público del vendedor: la página de confianza pública a la que llegan los clientes antes de hacer una reserva con un vendedor. Abarca el uso operativo, la referencia completa de atributos, el comportamiento de schema/SEO y los puntos de extensión para desarrolladores.

Introducido en la [v4.37.0](/blog/rentiva-v4.37.0-release); conexión del filtro de la insignia + alternativa de metadatos de reseñas añadidas en la [v4.37.1](/blog/rentiva-v4.37.1-release); mejoras de UX (avatar, miniaturas de vehículos, detección de SEO, punto de ruptura móvil) en la [v4.37.2](/blog/rentiva-v4.37.2-release); corrección de colisiones al editar el slug desde la administración en la [v4.38.1](/blog/rentiva-v4.38.1-release).
:::

# 👤 Perfil público del vendedor

## Contenido
- Qué es este módulo
- Estructura de URL (`/vendor/{slug}/` EN, `/bayi/{slug}/` TR)
- Flujo de trabajo en la administración: slug, avatar, requisitos de la insignia
- Uso en el frontend (shortcode / bloque de Gutenberg / widget de Elementor)
- Referencia de atributos (12 atributos)
- JSON-LD `LocalBusiness` de Schema.org + detección de plugins de SEO
- Puntos de extensión para desarrolladores (6 hooks de filtro)
- Comportamiento en Lite frente a Pro
- Estados vacíos

El módulo Perfil público del vendedor ofrece a cada vendedor aprobado una página de confianza propia en una URL limpia y fácil de compartir. Los visitantes pueden ver la identidad del vendedor, el estado de su insignia, un resumen de su flota, las reseñas recientes y su ubicación antes de reservar, cerrando la brecha de confianza entre «veo un vehículo que me gusta» y «estoy dispuesto a enviar mis datos a esta persona».

## Qué es este módulo

Una **superficie de conversión para el mercado**, no un panel de administración. El formulario de solicitud de vendedor (`[rentiva_vendor_apply]`) se encarga del alta; la página del Panel del vendedor (Rentiva Pro 6.2.0+) se encarga de las operaciones. El Perfil público del vendedor es la vista pública de solo lectura que ve un cliente cuando hace clic en «ver vendedor» en la tarjeta de un vehículo o llega a través de una búsqueda o un enlace compartido.

Tres superficies de renderizado comparten un único renderizador canónico (contrato de paridad de renderizado):

| Superficie | Identificador |
| :--- | :--- |
| Shortcode | `[rentiva_vendor_profile]` |
| Bloque de Gutenberg | `mhm-rentiva/vendor-profile` (con el título «MHM Vendor Profile») |
| Widget de Elementor | `mhmrentiva_vendor_profile` (con el título «MHM Vendor Profile») |

El bloque y el widget delegan en el shortcode mediante `do_shortcode()`. Lo que renderiza el shortcode lo renderizan exactamente igual el bloque y el widget: no hay rutas de código duplicadas.

Además de la colocación manual, el módulo registra una **regla de reescritura** que sirve automáticamente una página completa en `/{base}/{slug}/`. En cuanto un vendedor tiene un slug asignado (manual o generado automáticamente), la página es accesible sin que tengas que crear una página de WordPress para ella.

## Estructura de URL

El segmento base es traducible:

| Idioma | URL |
| :--- | :--- |
| EN (por defecto) | `/vendor/{slug}/` |
| TR | `/bayi/{slug}/` (`.po`, traducción de `_x('vendor', 'URL slug', ...)`) |
| Personalizado | Sobrescríbelo con el filtro `mhmrentiva_vendor_profile_url_base` |

El slug siempre es ASCII (latino): `sanitize_title(remove_accents($display_name))`. Los diacríticos turcos del nombre visible (p. ej., «Akif Ötömötiv Şirketi») se convierten a ASCII (`akif-otomotiv-sirketi`) para que la URL sea segura en cualquier navegador, cliente de correo electrónico y destino de compartición antiguo.

Los cambios de slug generan una **redirección 301** permanente desde la URL antigua: el slug anterior se añade a un metadato de historial limitado a 10 entradas, y `VendorProfileRewrite::handle_request()` detecta los slugs antiguos y redirige al actual.

## Flujo de trabajo en la administración

### 1. Slug y avatar: perfil de usuario del vendedor

Ve a **Usuarios → Editar usuario** para el vendedor. Aparecen tres campos nuevos en «Ajustes de vendedor de MHM Rentiva»:

- **Sucursal/ubicación por defecto**: operativo, no está relacionado con el perfil público.
- **Avatar del vendedor**: imagen personalizada subida desde la biblioteca de medios de WP. Si está vacío, el perfil público recurre a Gravatar (según el correo electrónico) y, por último, a un avatar SVG determinista con las iniciales derivadas del nombre visible (así cada vendedor obtiene una imagen de identidad distinta, independiente del tema y sin la silueta genérica de «hombre misterioso»).
- **Slug de la URL del perfil público**: defínelo manualmente o déjalo en blanco para que se genere automáticamente a partir del nombre visible. Al cambiarlo se crea automáticamente una redirección 301 desde la URL antigua.

El guardado pasa por `VendorSlugManager::change_slug()` (desde la [v4.38.1](/blog/rentiva-v4.38.1-release)), de modo que se aplican automáticamente sufijos de colisión (`-2`, `-3`, ...) cuando dos vendedores envían el mismo slug sin procesar.

### 2. Requisitos de la insignia: automáticos

La insignia «✓ Vendedor verificado» depende totalmente de umbrales. Un vendedor queda verificado cuando se cumplen **las tres** condiciones:

| Umbral | Por defecto | Clave de ajuste |
| :--- | :--- | :--- |
| Antigüedad de la cuenta (días desde la aprobación) | 180 | `vendor_badge_min_age_days` |
| Puntuación de fiabilidad (0-100) | 80 | `vendor_badge_min_score` |
| Reservas completadas (total) | 10 | `vendor_badge_min_completed_bookings` |

Ajústalos en **MHM Rentiva → Ajustes → Mercado de vendedores** (o sobrescríbelos por vendedor con el filtro `mhmrentiva_vendor_badge_eligibility`; consulta Puntos de extensión para desarrolladores).

Los vendedores que no han alcanzado los tres umbrales reciben en su lugar la etiqueta «Yeni Bayi»: un enfoque positivo para cuentas nuevas, sin señales negativas en ningún sentido.

### 3. Biografía y ciudad: copiadas del alta

La sección «Acerca de» lee de `_mhmrentiva_vendor_bio` (recogido durante el alta). La línea «📍 Ciudad · Miembro desde AAAA» de la cabecera lee de `_mhmrentiva_vendor_city` y `_mhmrentiva_vendor_approved_at`. Los vendedores pueden actualizar ambos desde su escritorio en cualquier momento; los cambios invalidan automáticamente la caché transitoria de 1 hora.

## Uso en el frontend

### Colocación manual (página o entrada)

En la mayoría de instalaciones basta con la regla de reescritura: el slug del vendedor es suficiente y no hace falta crear ninguna página. Pero también puedes colocar el shortcode en cualquier lugar:

```shortcode
[rentiva_vendor_profile slug="akif-otomotiv"]
```

Ejemplo configurado:

```shortcode
[rentiva_vendor_profile
    slug="akif-otomotiv"
    show_badge="yes"
    show_about="yes"
    show_vehicles="yes"
    max_vehicles="6"
    vehicle_sort="rating-newest"
    show_reviews="yes"
    max_reviews="10"
    show_location="no"]
```

Cuando `slug` está vacío Y la página se sirve mediante la regla de reescritura, el slug se lee automáticamente de la variable de consulta `mhmrentiva_vendor_slug`.

### Bloque de Gutenberg

Añade el bloque **MHM Vendor Profile** desde el insertador (categoría: Widgets). Los controles del inspector exponen todos los atributos del shortcode en paneles del inspector.

### Widget de Elementor

Añade el widget **MHM Vendor Profile** desde el panel de Elementor (categoría: MHM Rentiva). Los controles de paridad automática coinciden con los atributos del shortcode; los controles de estilo estándar del contenedor de Elementor (margen, relleno, color, tipografía) envuelven el HTML renderizado.

## Referencia de atributos

Los 12 atributos aceptan la forma canónica en snake_case (usada por el shortcode) y un alias en camelCase (usado por el bloque / widget). El CAM (Canonical Attribute Mapper) del plugin normaliza ambas a la misma forma interna.

| Atributo | Por defecto | Tipo | Propósito |
| :--- | :--- | :--- | :--- |
| `slug` | vacío | string | Slug del vendedor. Si está vacío y la página se sirve mediante reescritura, se lee de la variable de consulta. |
| `show_badge` | `yes` | bool | Muestra la etiqueta «✓ Vendedor verificado» / «Yeni Bayi» en la cabecera. |
| `show_rating` | `yes` | bool | Muestra la barra de valoración agregada (★★★★½ 4,6) y el número de reseñas en la cabecera. |
| `show_about` | `yes` | bool | Renderiza la sección Acerca de (se oculta si `_mhmrentiva_vendor_bio` está vacío). |
| `show_vehicles` | `yes` | bool | Renderiza la sección de cuadrícula de vehículos activos. |
| `max_vehicles` | `6` | int (1-50) | Número máximo de tarjetas de vehículos renderizadas. Se limita al rango. |
| `vehicle_sort` | `rating-newest` | enum | Orden de la cuadrícula de vehículos. Actualmente hay un único modo (valoración DESC y luego `post_date` DESC). |
| `show_reviews` | `yes` | bool | Renderiza la sección de reseñas recientes. |
| `max_reviews` | `10` | int (1-50) | Número máximo de reseñas renderizadas. Cada reseña enlaza con el vehículo de origen. |
| `show_location` | `no` | bool | Renderiza la sección propia de Ubicación. **El valor por defecto cambió a `no` en la v4.37.2**: la cabecera ya muestra la ciudad. La sección propia está reservada para la mejora del Mapa de transferencias de la v4.40.0+; hasta entonces duplica los metadatos de la cabecera. |
| `empty_vehicles_message` | vacío | string | Sobrescribe el texto «Este vendedor no tiene ningún vehículo anunciado actualmente.». |
| `empty_reviews_message` | vacío | string | Sobrescribe el texto «Todavía no hay reseñas: sé el primero en dejar una.». |
| `class` | vacío | string | Clase(s) CSS adicional(es) en el contenedor. Se aceptan varios valores; cada uno se sanea por separado. |

### Contrato de privacidad

Las siguientes claves de user_meta **nunca** se muestran en el perfil público, ni siquiera con combinaciones extremas de atributos:

- `_mhmrentiva_vendor_phone`: se recoge para el alta del vendedor y se mantiene solo para la administración (contra la extracción de datos para spam).
- `_mhmrentiva_vendor_iban`: financiero.
- `_mhmrentiva_vendor_account_holder`: financiero.
- `_mhmrentiva_vendor_tax_number`: financiero.

La clase `VendorProfileProvider` incluye en una lista de permitidos exactamente los campos que alimentan el array de renderizado; los campos sensibles no se leen. El docblock del filtro `mhmrentiva_vendor_profile_data` advierte de que inyectar valores sensibles mediante este filtro los filtraría a la caché transitoria de 1 hora: mantén las funciones de callback del filtro en solo lectura.

## JSON-LD `LocalBusiness` de Schema.org + detección de plugins de SEO

El módulo emite un bloque `<script type="application/ld+json">` con un schema `LocalBusiness` en `<head>` en cada página de perfil de vendedor activo. Campos rellenados:

- `@type: LocalBusiness`
- `name` (nombre visible, codificado en hexadecimal contra la inyección de `</script>`: indicador JSON_HEX_TAG)
- `url` (URL canónica del perfil)
- `address.addressLocality` (ciudad del vendedor, si está definida)
- `aggregateRating` (media ponderada a nivel de vendedor + número de reseñas, cuando existe ≥1 reseña)

La codificación JSON usa `JSON_HEX_TAG | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES`: se conservan los caracteres turcos (`Ö` literal) y las inyecciones hostiles de `</script>` se codifican en hexadecimal.

El título de la página (`{vendor name} — {site name}`) y la meta descripción (biografía del vendedor, recortada a 155 caracteres en un límite de palabra) se emiten **solo cuando no hay ningún plugin de SEO activo**. La detección abarca Yoast SEO, Rank Math, AIOSEO, SEOPress, The SEO Framework y SmartCrawl; si alguno de ellos está activo, nuestra emisión de título/descripción queda inactiva (Google prohíbe los metadatos duplicados y estos plugins tienen interfaces de ajustes más completas).

La salida JSON-LD de Schema.org también cede ante el filtro de etiqueta canónica del plugin de SEO mediante `wpseo_canonical` (Yoast) y `rank_math/frontend/canonical` (Rank Math) con prioridad `PHP_INT_MAX - 10`, para que la URL canónica se mantenga coherente.

## Puntos de extensión para desarrolladores

### `mhmrentiva_vendor_profile_url_base`

Sobrescribe el segmento base de la URL. Útil cuando quieres un slug personalizado como `/dealers/` o `/firmalar/` independientemente del idioma.

```php
add_filter('mhmrentiva_vendor_profile_url_base', function ($base) {
    return 'firmalar';
});
```

El vigilante de cambios de idioma detectará el nuevo valor y vaciará automáticamente las reglas de reescritura.

### `mhmrentiva_vendor_profile_data`

Filtra el array completo de datos de renderizado (identidad, estado de la insignia, lista de vehículos, agregado de reseñas, datos de schema) antes de que se ejecute la plantilla. Úsalo para inyectar campos adicionales que lea una parte de plantilla personalizada, o para ocultar campos en cada página.

```php
add_filter('mhmrentiva_vendor_profile_data', function (array $data) {
    $data['custom_extra_text'] = 'Member of Antalya Tourism Association';
    return $data;
});
```

**De solo lectura por convención.** Inyectar aquí valores sensibles los filtraría a la caché transitoria de 1 hora.

### `mhmrentiva_vendor_badge_eligibility`

Sobrescribe el resultado de la insignia por vendedor. Uso típico: omitir los umbrales para vendedores «destacados», o retirar temporalmente la insignia a un vendedor en revisión.

```php
add_filter('mhmrentiva_vendor_badge_eligibility', function (bool $eligible, int $vendor_id, array $context) {
    if (in_array($vendor_id, get_option('featured_vendor_ids', []), true)) {
        return true;
    }
    return $eligible;
}, 10, 3);
```

`$context` contiene `age_days`, `score`, `completed_bookings`.

### `mhmrentiva_vendor_completed_bookings_count`

Sobrescribe el recuento total de reservas completadas que usa `VendorBadgeEligibility`. La función de callback por defecto delega en `ReliabilityScoreCalculator::count_completed_bookings()`. Sustitúyela para usar una estrategia de recuento personalizada (p. ej., contar solo determinadas categorías de producto).

### `mhmrentiva_vendor_profile_view_all_url`

Filtra el destino del enlace «Ver todos los vehículos →» de la sección de vehículos. Si está vacío, el enlace se oculta: útil en instalaciones que aún no tienen una página de resultados de búsqueda.

### `mhmrentiva_vendor_profile_seo_disable`

Interruptor global para desactivar la emisión del título + meta descripción. Devuelve `false` por defecto; establécelo en `true` para desactivarla por completo (normalmente porque tu tema gestiona los metadatos de los vendedores a su manera).

```php
add_filter('mhmrentiva_vendor_profile_seo_disable', '__return_true');
```

## Comportamiento en Lite frente a Pro

El Perfil público del vendedor es una **función exclusiva de Pro**: requiere el indicador `vendor_marketplace`. Los usuarios de Lite ven lo siguiente:

- La regla de reescritura está registrada, pero `template_redirect` devuelve un 404 en Lite (`Mode::canUseVendorMarketplace()` devuelve false).
- El uso manual del shortcode en una página devuelve una cadena vacía.
- El bloque y el widget de Elementor no renderizan nada (delegan en el shortcode).

Los avisos para actualizar se encuentran en `/pricing` y en el shortcode existente `[mhmrentiva_pricing_table]`.

## Estados vacíos

| Estado | Renderizado |
| :--- | :--- |
| Vendedor no encontrado / suspendido / sin slug | 404 de WordPress (cabecera de estado 404, plantilla 404 del tema) |
| 0 vehículos activos | «Este vendedor no tiene ningún vehículo anunciado actualmente.» (se puede sobrescribir con `empty_vehicles_message`) |
| 0 reseñas | «Todavía no hay reseñas: sé el primero en dejar una.» (se puede sobrescribir con `empty_reviews_message`) |
| 0 vehículos + 0 reseñas (vendedor nuevo) | Se renderizan ambos estados vacíos. La cabecera se sigue mostrando. La etiqueta «Yeni Bayi» aporta contexto. |

## Véase también

- [Notas de la versión v4.37.0](/blog/rentiva-v4.37.0-release): introducción original de la función
- [Notas de la versión v4.37.1](/blog/rentiva-v4.37.1-release): corrección urgente de la conexión de la insignia + alternativa de metadatos de reseñas
- [Notas de la versión v4.37.2](/blog/rentiva-v4.37.2-release): mejoras de UX (avatar, miniaturas de vehículos, detección de SEO, punto de ruptura móvil)
- [Notas de la versión v4.38.1](/blog/rentiva-v4.38.1-release): corrección de colisiones al editar el slug desde la administración
- [Shortcode del directorio de vendedores](./vendor-directory): la página de catálogo que muestra todos los vendedores activos
- [Shortcode del formulario de solicitud de vendedor](./vendor-apply): el formulario de alta
- [Alta de vendedores](/docs/vendor/onboarding): guía operativa para la aprobación de vendedores
