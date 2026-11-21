---
id: introduction
title: "Introducción al tema"
sidebar_label: "Introducción"
slug: /theme/introduction
---
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=flat-square) ![FSE](https://img.shields.io/badge/FSE-Full_Site_Editing-success?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
`mhm-rentiva-theme` es un tema moderno y de alto rendimiento de **edición completa del sitio (FSE)**, diseñado específicamente para complementar el conjunto de plugins `mhm-rentiva`. Ofrece un lenguaje de diseño unificado y fluido tanto para el contenido estático como para las funciones dinámicas de alquiler.
:::

## Descripción general

A diferencia de los temas tradicionales de WordPress, `mhm-rentiva-theme` aprovecha las últimas capacidades basadas en bloques de WordPress. Esto significa que cada parte del sitio —desde la cabecera y el pie de página hasta los listados de vehículos y el escritorio del vendedor— se puede personalizar directamente en el editor del sitio.

### Por qué es la "combinación perfecta"

El tema y el plugin se desarrollan conjuntamente para garantizar:
1. **Lenguaje de diseño unificado**: uso coherente de la tipografía (Plus Jakarta Sans) y de las paletas de colores.
2. **Diseños optimizados**: patrones de bloques prediseñados para escenarios de alquiler habituales (búsqueda en la sección principal, detalles del vehículo, cuadrícula de resultados).
3. **Rendimiento**: lógica PHP mínima, basada en bloques estándar de Gutenberg y en un sistema ligero de utilidades CSS.
4. **Reactividad**: compatibilidad integrada con los componentes del plugin basados en AJAX (escritorio, pagos al proveedor, búsqueda).

---

## Stack técnico

- **Núcleo**: API de bloques de WordPress (Gutenberg).
- **Estilos**: `theme.json` para los estilos globales + utilidades de CSS atómico para microajustes.
- **Tipografía**: `Plus Jakarta Sans` para los encabezados y `Inter` para el texto del cuerpo.
- **Iconos**: `Material Symbols Outlined` (Google Fonts).
- **Plantillas FSE**: plantillas basadas en HTML para tipos de contenido estándar y personalizados (p. ej., `single-vehicle`, `archive-vehicle`).

---

## Jerarquía visual (estructura de bloques)

Las páginas principales siguen una estructura de bloques modular:

### Página de detalle del vehículo (`single-vehicle.html`)
```text
┌──────────────────────────────────────────┐
│              [Header Part]               │
├──────────────────────────────────────────┤
│         [Vehicle Images Slider]          │
├───────────────────┬──────────────────────┤
│                   │                      │
│ [Vehicle Specs]   │  [Booking Widget]    │
│ [Description]     │  (Sticky in Sidebar) │
│ [Features List]   │                      │
│                   │                      │
├───────────────────┴──────────────────────┤
│        [Similar Vehicles Pattern]        │
├──────────────────────────────────────────┤
│              [Footer Part]               │
└──────────────────────────────────────────┘
```

---

## Directorios clave

- `/templates`: estructura HTML de páginas y entradas.
- `/parts`: partes reutilizables del sitio, como `header` y `footer`.
- `/patterns`: conjuntos de bloques complejos (p. ej., sección principal de la página de inicio, cuadrícula de servicios).
- `/assets`: componentes CSS específicos del tema y JavaScript para la interactividad de la interfaz.

---

## Registro de cambios
| Fecha | Versión | Nota |
|------|---------|------|
| 2026-03-09 | 1.0.0-docs | Documentación inicial de introducción al tema. |
