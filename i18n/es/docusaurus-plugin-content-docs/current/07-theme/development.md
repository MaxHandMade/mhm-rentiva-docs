---
id: development
title: "Guía técnica y canal de CI/CD"
sidebar_label: "Técnico y desarrollo"
slug: /theme/development
---
![Versión](https://img.shields.io/badge/version-v0.3.0-blue?style=flat-square) ![PHP](https://img.shields.io/badge/PHP-8.1+-777bb4?style=flat-square) ![CI](https://img.shields.io/badge/CI-GitHub_Actions-success?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
Esta guía cubre el flujo de trabajo de desarrollo, la compilación de recursos y la infraestructura de pruebas y el canal de CI/CD del tema.
:::

## Flujo de trabajo de desarrollo

El `mhm-rentiva-theme` está diseñado para ofrecer rendimiento y un cumplimiento estricto de los estándares de codificación de WordPress (WPCS).

### Gestión de recursos — 6 archivos CSS

Los archivos estáticos se almacenan en el directorio `/assets`. A partir de la v0.3.0, la pila CSS consta de 6 archivos:

| # | Archivo | Propósito |
|---|-------|------|
| 1 | `header.css` | Navegación superior, superposición de navegación móvil (tema oscuro `#101922`). |
| 2 | `3-layout.css` | Maquetación de página, modo `content-wide`, max-width: `var(--wp--style--global--content-size, 1280px)`. `@layer layout` **ELIMINADO**. |
| 3 | `components.css` | Componentes de interfaz reutilizables como tarjetas, botones e insignias. |
| 4 | `utilities.css` | Clases auxiliares (espaciado, visibilidad, tipografía). |
| 5 | `plugin-pages.css` | Sobrescrituras de estilo específicas de las páginas del plugin. |
| 6 | `elementor-compat.css` | Capa de compatibilidad con Elementor. |

- `/assets/js`: JS nativo ligero (p. ej., `header.js` para el menú móvil).

:::caution Nota sobre la arquitectura CSS
El `@layer layout` utilizado anteriormente en `3-layout.css` **se eliminó en la v0.3.0**. Además, se añadió `white-space: nowrap` a la clase `rv-trust-value` (corrección de las tarjetas de estadísticas con más de 10.000).
:::

#### Lógica de carga

Todos los recursos se cargan mediante `mhmrentiva_theme_enqueue_header_assets()` dentro de `functions.php`:

```php
wp_enqueue_style( 'mhm-theme-plugin-pages', $css_uri . 'plugin-pages.css', array(), $ver );
wp_enqueue_script( 'mhm-theme-header', $js_uri . 'header.js', array(), $ver, true );
```

### Gestión de dependencias

El tema utiliza **Composer** para las dependencias de desarrollo (PHPUnit, PHPCS) y **npm/npx** para la minificación de recursos (cuando corresponda).

- **Instalar dependencias**: `composer install`

---

## Infraestructura de pruebas

El tema incluye un completo conjunto de pruebas PHPUnit ubicado en `/tests`.

### Conjuntos de pruebas principales

| Conjunto de pruebas | Archivo | Responsabilidad |
|------------|------|----------------|
| **Estructura del tema** | `ThemeStructureTest.php` | Garantiza que existan `templates/`, `parts/` y `theme.json`. |
| **Comprobación de recursos** | `AssetEnqueueTest.php` | Valida la correcta puesta en cola de CSS y JS. |
| **Patrones** | `PatternRegistrationTest.php` | Verifica la categoría `rentiva` y los patrones esenciales. |
| **Plantillas** | `ThemeTemplatesSemanticTest.php`| Garantiza que las plantillas clave como `single-vehicle.html` sean correctas. |

### Ejecutar las pruebas en local

Utiliza la configuración `phpunit.xml.dist` incluida:

```bash
vendor/bin/phpunit
```

---

## Canal de CI/CD

El tema utiliza GitHub Actions (`.github/workflows/ci.yml`) para las comprobaciones de calidad automatizadas.

### Etapas del flujo de trabajo

1. **PHP Lint**: comprueba si hay errores de sintaxis en todas las versiones.
2. **Estándares de codificación PHP (PHPCS)**: valida el cumplimiento de `WordPress-Core` y `WordPress-Extra`.
3. **Pruebas unitarias**: ejecuta el conjunto completo de PHPUnit en un entorno de WordPress sin interfaz gráfica.
4. **Comprobación de compilación**: verifica la validez del esquema de `theme.json`.

### Configuración del flujo de trabajo

```yaml
# Examples from .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  phpcs:
    runs-on: ubuntu-latest
    steps:
      - name: PHPCS Check
        run: vendor/bin/phpcs --standard=phpcs.xml.dist .
```

---

## Estándares de codificación

El tema sigue estas reglas estrictas (tal como se definen en `phpcs.xml.dist`):
- `declare(strict_types=1);` obligatorio en todos los archivos PHP.
- Prohibido el uso directo de `extract()`.
- Uso de las etiquetas `@since` y `@return` en los docblocks.
- Prefijo `mhmrentiva_theme_` en todas las funciones.

---

## DemoSeeder y WP-CLI

### Correcciones de errores de DemoSeeder (v0.3.0)
En la v0.3.0 se corrigieron 7 errores en DemoSeeder. El más importante: el método `add_booking_review()` ahora funciona de forma totalmente compatible con el shortcode de testimonios. El shortcode de testimonios lee del meta de entrada `mhmrentiva_booking` (`_mhmrentiva_customer_review`), **no** de los comentarios de WP.

### Creación de páginas con WP-CLI
Para evitar problemas de escape de `!` en bash al crear páginas de WordPress mediante WP-CLI, se utiliza el método heredoc `wp eval-file -`:

```bash
wp eval-file - <<'PHPEOF'
<?php
// Page creation code here
wp_insert_post([
    'post_title'   => 'Vehicles',
    'post_name'    => 'vehicles',
    'post_content' => '<!-- wp:shortcode -->[rentiva_vehicles_grid]<!-- /wp:shortcode -->',
    'post_status'  => 'publish',
    'post_type'    => 'page',
]);
PHPEOF
```

## Registro de cambios
| Fecha | Versión | Nota |
|-------|-------|-----|
| 23.04.2026 | v0.3.0 | Traducción al inglés aplicada a las secciones en idiomas mixtos. |
| 27.03.2026 | v0.3.0 | Se añadieron los detalles de la pila CSS (6 archivos), las correcciones de DemoSeeder y el método de WP-CLI. |
| 09.03.2026 | 4.21.0-docs | Se creó la guía de desarrollo y la documentación de CI/CD. |
