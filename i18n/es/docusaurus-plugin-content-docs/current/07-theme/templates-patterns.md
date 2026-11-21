---
id: templates-patterns
title: "Plantillas personalizadas y patrones de bloques"
sidebar_label: "Plantillas y patrones"
slug: /theme/templates-patterns
---
![Version](https://img.shields.io/badge/version-v0.3.0-blue?style=flat-square) ![FSE](https://img.shields.io/badge/FSE-Full_Site_Editing-success?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
Esta página documenta las plantillas de bloques y los patrones que definen la representación visual de los anuncios de alquiler, los resultados de búsqueda y las interfaces de gestión de vendedores.
:::

## Plantillas principales (`/templates`) — 10 en total

Estas plantillas HTML definen el diseño estructural base para tipos de contenido y vistas específicos:

| Plantilla | Archivo | Descripción |
|--------|-------|----------|
| **Página de inicio** | `front-page.html` | Diseño de la página de inicio del sitio. |
| **Página general** | `page.html` | Diseño `content-wide` para páginas estándar de WordPress. |
| **Vehículo individual** | `single-vehicle.html` | Diseño de la página de un vehículo individual. |
| **Archivo de vehículos** | `archive-vehicle.html` | Resultados de búsqueda y archivo general de vehículos. |
| **Página de cuenta** | `page-account.html` | Estructura unificada para el panel del vendedor. |
| **Página 404** | `404.html` | Página de error personalizada para contenido no encontrado. |
| **Archivo general** | `archive.html` | Plantilla de archivo predeterminada. |
| **Índice principal** | `index.html` | Plantilla de respaldo predeterminada de WordPress. |
| **Buscar** | `search.html` | Página de resultados de búsqueda de WordPress. |
| **Entrada individual** | `single.html` | Plantilla estándar de entrada de blog. |

### Diseño del archivo de vehículos (`archive-vehicle.html`)
```text
┌──────────────────────────────────────────┐
│              [Header Part]               │
├──────────────────────────────────────────┤
│           [Search Hero Pattern]          │
├───────────────────┬──────────────────────┤
│                   │                      │
│   [Filter Block]  │    [Results Grid]    │
│   (Collapsible on │    (3-column card)   │
│    Mobile)        │                      │
│                   │                      │
├───────────────────┴──────────────────────┤
│              [Footer Part]               │
└──────────────────────────────────────────┘
```

---

## Patrones de bloques (`/patterns`) — 31 en total

Los patrones de bloques son conjuntos de bloques de Gutenberg preconfigurados, registrados en la categoría `rentiva`. La v0.3.0 alcanza los 31 patrones:

### Patrones de la página de inicio

| Patrón | Archivo | Descripción |
|-------|-------|----------|
| **Hero** | `homepage-hero.php` | Sección hero de la página de inicio. |
| **Hero de búsqueda** | `rentiva-search-hero.php` | Búsqueda destacada con campos de ubicación y fecha. |
| **Franja de confianza** | `homepage-trust-strip.php` | Logotipos de marcas de confianza. |
| **Cómo funciona** | `homepage-how-it-works.php` | Guía de uso paso a paso. |
| **Servicios** | `homepage-services.php` | Sección de presentación de servicios. |
| **Cuadrícula informativa** | `homepage-info-grid.php` | Cuadrícula de tarjetas informativas. |
| **Vehículos destacados** | `homepage-featured-vehicles.php` | Sección de exhibición de vehículos en la página de inicio. |
| **CTA de reserva** | `homepage-booking-cta.php` | Llamada a la acción de reserva. |
| **Testimonios** | `homepage-testimonials.php` | Sección de opiniones de clientes. |

### Patrones de páginas

| Patrón | Archivo | Descripción |
|-------|-------|----------|
| **Sobre nosotros** | `rentiva-about-page.php` | Contenido de la página «Sobre nosotros». |
| **Contacto** | `rentiva-contact-page.php` | Formulario de la página de contacto. |
| **Preguntas frecuentes** | `rentiva-faq-page.php` | Preguntas frecuentes. |
| **Privacidad** | `rentiva-privacy-page.php` | Política de privacidad. |
| **Condiciones** | `rentiva-terms-page.php` | Condiciones de uso. |
| **Solicitud de vendedor** | `rentiva-vendor-apply-page.php` | Página de solicitud para vendedores. |

### Patrones de componentes

| Patrón | Archivo | Descripción |
|-------|-------|----------|
| **Estructura de cuenta** | `rentiva-account-shell.php` | Contenedor principal del panel del vendedor. |
| **Detalles del vehículo** | `rentiva-vehicle-details.php` | Cuadrícula de información de un vehículo individual. |
| **Cuadrícula de vehículos** | `rentiva-vehicles-grid-section.php` | Cuadrícula de tarjetas de vehículos. |
| **Vehículos destacados** | `rentiva-featured-vehicles-section.php` | Sección de vehículos destacados. |
| **Comparación de vehículos** | `rentiva-vehicle-comparison-page.php` | Página de comparación de vehículos. |
| **Opiniones de vehículos** | `rentiva-vehicle-reviews.php` | Opiniones con valoraciones de vehículos. |
| **Resultados de búsqueda** | `rentiva-search-results.php` | Diseño de los resultados de búsqueda. |
| **Búsqueda de traslados** | `rentiva-transfer-search.php` / `rentiva-transfer-search-page.php` | Formulario y página de búsqueda de transferencias. |
| **Resultados de traslados** | `rentiva-transfer-results.php` / `rentiva-transfer-results-page.php` | Diseño de los resultados de transferencias. |
| **Marcas** | `rentiva-brands.php` | Sección de marcas de vehículos. |
| **CTA principal** | `rentiva-primary-cta.php` | Llamada a la acción general. |
| **CTA de reserva** | `rentiva-booking-cta.php` | Llamada a la acción de reserva. |
| **Equipos de confianza** | `rentiva-trusted-teams.php` | Socios comerciales de confianza. |
| **Contenido 404** | `404-content.php` | Contenido de la página 404. |

---

## Implementación del diseño adaptable

El tema utiliza un enfoque de «tipografía y espaciado fluidos»:

```json
/* theme.json - Fluid Header font size example */
"fontSizes": [
  {
    "slug": "xx-large",
    "size": "clamp(2rem, 4vw, 3rem)",
    "name": "XX Large"
  }
]
```

**Sistema de cuadrícula mobile-first**:
- Todos los patrones están diseñados con **CSS Grid** o **Flexbox**.
- El patrón de cuadrícula de resultados utiliza `repeat(auto-fill, minmax(300px, 1fr))` para ajustar automáticamente las columnas.

---

## Cómo personalizar las plantillas

Como se trata de un tema FSE, las plantillas se pueden sobrescribir en el editor del sitio de WordPress:
1. Ve a **Apariencia → Editor → Plantillas**.
2. Selecciona la plantilla (p. ej., `Single Vehicle`).
3. Añade, elimina o reordena los bloques según necesites.
4. **Publicar**: tus cambios se guardan en la base de datos y los archivos del tema permanecen intactos.

### Sobrescribir mediante un tema hijo (opcional)
Si prefieres una personalización basada en archivos, puedes crear un tema hijo y colocar tus plantillas HTML en la misma estructura de carpetas.

---

## Registro de cambios
| Fecha | Versión | Nota |
|-------|-------|-----|
| 23.04.2026 | v0.3.0 | Traducción al inglés aplicada a las secciones en turco. |
| 27.03.2026 | v0.3.0 | Actualizada la lista completa de plantillas (10) y patrones (31). |
| 09.03.2026 | 1.0.0-docs | Creada la documentación de plantillas y patrones. |
