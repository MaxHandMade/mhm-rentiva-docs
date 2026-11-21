---
id: theme-json
title: "Configuración del tema (theme.json)"
sidebar_label: "theme.json"
slug: /theme/theme-json
---
![Versión](https://img.shields.io/badge/version-v0.3.0-blue?style=flat-square) ![Documentación](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
`theme.json` es el centro de configuración de los estilos, ajustes y comportamiento globales. Define la paleta de colores, la jerarquía tipográfica, las escalas de espaciado y los estilos de bloque globales.
:::

## Ajustes globales

### 🎨 Paleta de colores

El tema utiliza un sistema de colores completo y armonizado:

| Slug | Color | Nombre | Uso |
|------|-------|------|-------|
| `base` | `#FFFFFF` | Base | Fondo global. |
| `surface` | `#F7F7F7` | Superficie | Fondo de secciones y tarjetas. |
| `contrast` | `#222222` | Contraste | Texto principal y encabezados. |
| `accent` | `#0066FF` | Acento | Enlaces, estados activos y acciones principales. |
| `cta` | `#FF5A5F` | CTA | Botones de llamada a la acción (p. ej., Reservar ahora). |
| `success` | `#00A699` | Éxito | Pagos a proveedores, etiquetas de estado confirmado. |
| `warning` | `#FFB400` | Advertencia | Cambios de IBAN pendientes o alertas. |

### 🔡 Jerarquía tipográfica

Fuentes integradas: **Plus Jakarta Sans** (principal) e **Inter** (secundaria).

| Escala (slug) | Tamaño | Nombre |
|--------------|------|------|
| `display` | `clamp(3rem, 6vw, 4.5rem)` | Encabezados de alto impacto de la página de inicio. |
| `xx-large` | `clamp(2rem, 4vw, 3rem)` | Encabezados principales de página. |
| `medium` | `1rem` | Texto de cuerpo estándar. |
| `small` | `0.875rem` | Enlaces del pie de página y etiquetas de metadatos. |

### 📏 Sistema de espaciado

El tema utiliza pasos de espaciado proporcionales de `3xs` a `3xl`:

```json
{
  "slug": "xs",
  "size": "0.75rem",
  "name": "XS"
},
{
  "slug": "m",
  "size": "1.5rem",
  "name": "M"
}
```

---

## Estilos globales

### Elementos principales

`theme.json` impone estilos globales para garantizar que los componentes generados por el plugin hereden la estética correcta del tema:

```json
"styles": {
  "typography": {
    "fontFamily": "var(--wp--preset--font-family--jakarta)",
    "lineHeight": "1.65"
  },
  "elements": {
    "button": {
      "border": { "radius": "9999px" },
      "color": { "background": "var(--wp--preset--color--accent)" }
    }
  }
}
```

### Restricciones de diseño

- **Tamaño del contenido**: `1280px` (ancho estándar).
- **Tamaño ancho**: `1440px` (para secciones a ancho completo o con alineación ancha).

:::info Cambio en la v0.3.0
La plantilla `page.html` ahora utiliza `content-wide` en lugar de `content-narrow`. El valor de `max-width` en `3-layout.css` se ha sincronizado con `theme.json` mediante `var(--wp--style--global--content-size, 1280px)`. Esto significa que, al cambiar el tamaño del contenido en el editor del tema, también se actualizan automáticamente las páginas del plugin.
:::

---

## Por qué es importante esta arquitectura

Al centralizar todos los tokens de diseño en `theme.json`, el plugin `mhm-rentiva` puede hacer referencia a estas variables directamente en su CSS:

```css
/* Inheriting global theme colors in plugin components */
.mhm-payout-card {
    background-color: var(--wp--preset--color--surface);
    border-color: var(--wp--preset--color--accent-subtle);
}
```

**Este «acoplamiento estrecho»** garantiza que cualquier cambio de color global en el editor del tema se propague automáticamente a:
- El widget de reserva
- Las tarjetas de analíticas del vendedor
- La cuadrícula de resultados de búsqueda
- La interfaz de gestión de pagos a proveedores

---

## Registro de cambios
| Fecha | Versión | Nota |
|-------|-------|-----|
| 23.04.2026 | v0.3.0 | Traducción al inglés aplicada a las secciones en turco. |
| 27.03.2026 | v0.3.0 | Documentada la sincronización del diseño `content-wide` y de las variables CSS. |
| 09.03.2026 | 4.21.0-docs | Creada la documentación de configuración del tema. |
