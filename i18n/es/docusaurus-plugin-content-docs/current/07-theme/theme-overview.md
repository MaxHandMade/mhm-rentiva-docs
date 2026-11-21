---
id: theme-overview
title: "Compatibilidad con temas y estándares visuales"
sidebar_label: "Resumen"
sidebar_position: 1
hide_table_of_contents: true
---

import Link from '@docusaurus/Link';

![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Tema](https://img.shields.io/badge/theme-v0.3.0-0f766e?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

# 🎨 Tema y estándares visuales

MHM Rentiva ofrece una compatibilidad total con los temas de bloques modernos de WordPress (FSE) y con los temas clásicos. Accede aquí a las directrices de diseño completas para lograr coherencia visual.

:::tip GUÍA DE DISEÑO
Usa las tarjetas de abajo para explorar la arquitectura del tema, la jerarquía de plantillas y las opciones de personalización de estilos.
:::

---

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #0f766e' }}>
      <h3 className="cardTitle">🏗️ Arquitectura del tema</h3>
      <p className="cardDescription">El impacto del plugin en el tema, las políticas de carga de CSS/JS y la integración con Asset Manager.</p>
      <Link className="button button--secondary button--block" to="/docs/theme/introduction">Resumen de la arquitectura</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #3578e5' }}>
      <h3 className="cardTitle">📦 Plantillas y patrones</h3>
      <p className="cardDescription">Uso de patrones de bloques, plantillas de página de vehículo individual y vistas de lista.</p>
      <Link className="button button--secondary button--block" to="/docs/theme/templates-patterns">Guía de plantillas</Link>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #e5ad24' }}>
      <h3 className="cardTitle">🛠️ Compatibilidad con theme.json</h3>
      <p className="cardDescription">Paletas de colores globales, ajustes de tipografía y parámetros de estilo específicos del tema para el plugin.</p>
      <Link className="button button--secondary button--block" to="/docs/theme/theme-json">Reglas de estilo</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #df3c29' }}>
      <h3 className="cardTitle">💻 Desarrollo de temas</h3>
      <p className="cardDescription">Hooks y mecanismos de sobrescritura para desarrolladores que quieran crear un tema personalizado.</p>
      <Link className="button button--secondary button--block" to="/docs/theme/development">Detalles de desarrollo</Link>
    </div>
  </div>
</div>

---

### Datos clave del tema v0.3.0

| Métrica | Valor |
|---|---|
| **Versión del tema** | v0.3.0 |
| **Plantillas (templates/)** | 10 en total (front-page, page, single-vehicle, archive-vehicle, page-account, 404, archive, index, search, single) |
| **Patrones (patterns/)** | 31 en total (en las categorías homepage, rentiva y 404) |
| **Archivos CSS** | 6 en total: `header.css`, `3-layout.css`, `components.css`, `utilities.css`, `plugin-pages.css`, `elementor-compat.css` |
| **Páginas de WordPress** | Más de 10 páginas (con slugs localizados) |

### Notas de arquitectura
- El tema está construido sobre la arquitectura **FSE (Full Site Editing)**.
- **Superposición de navegación móvil:** tema oscuro (`#101922`), `backdrop-filter` trasladado al pseudoelemento `::before` (corrección del bloque contenedor).
- **header.html:** atributo `style` alineado con el comentario de bloque de WP (corrección de la validación de bloques).
- **3-layout.css:** `@layer layout` ELIMINADO; `white-space: nowrap` añadido para `rv-trust-value` (corrección de la tarjeta de estadísticas de más de 10.000).
- **Ancho de página:** usa `content-wide` en lugar de `content-narrow`; el max-width de `3-layout.css` se sincroniza con `theme.json` mediante `var(--wp--style--global--content-size, 1280px)`.
- Todos los componentes visuales se gestionan de forma centralizada mediante `AssetManager`.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 27.03.2026 | 4.23.0 | Se han añadido los detalles del tema v0.3.0: 31 patrones, 10 plantillas, 6 archivos CSS y notas de arquitectura. |
| 19.03.2026 | 4.21.2 | Se ha creado la página de resumen con diseño de tarjetas premium para la categoría de temas. |
