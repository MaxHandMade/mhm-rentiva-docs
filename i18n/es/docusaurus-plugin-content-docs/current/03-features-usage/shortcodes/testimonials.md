---
title: "Testimonios"
description: "Guía de uso y referencia técnica del módulo Testimonios."
sidebar_position: 15
---
![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Documentación](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
Esta página describe el módulo Testimonios como referencia estándar y abarca tanto los aspectos técnicos como los operativos.
:::

# 🚗 Testimonios

## Contenido
- Uso
- Características
- Notas para desarrolladores

El módulo Testimonios está diseñado para gestionar y mostrar a los visitantes las valoraciones de **soporte** en la plataforma Rentiva.

## Uso

:::tip IMAGEN PRÓXIMAMENTE
Aquí se añadirá una captura de pantalla que muestre el aspecto en la parte pública (la que ven los visitantes) de este módulo.
:::

Para añadir este módulo a cualquier página o entrada, usa el siguiente shortcode:

```shortcode
[rentiva_testimonials limit="apply_filters(mhmrentiva_testimonials_limit"]
```

También puedes insertarlo de forma visual desde el editor de bloques de Gutenberg seleccionando **"MHM Rentiva → Testimonios"**.

### Parámetros

Los siguientes parámetros están disponibles dentro del shortcode:

| Parámetro | Valor predeterminado | Descripción |
| :--- | :--- | :--- |
| `limit` | `apply_filters(mhmrentiva_testimonials_limit` | Número máximo de elementos que se muestran. |
| `rating` | `apply_filters(mhmrentiva_testimonials_rating` | Controla el comportamiento del filtro de **características** del módulo. |
| `vehicle_id` | `apply_filters(mhmrentiva_testimonials_vehicle_id` | Controla el comportamiento del filtro de **características** del módulo. |
| `orderby` | `apply_filters(mhmrentiva_testimonials_orderby` | Controla el comportamiento **general** de ordenación del módulo. |
| `order` | `apply_filters(mhmrentiva_testimonials_order` | Controla la dirección **general** de ordenación del módulo. |
| `show_rating` | `apply_filters(mhmrentiva_testimonials_show_rating` | Controla el comportamiento **general** de visualización del módulo. |
| `show_date` | `apply_filters(mhmrentiva_testimonials_show_date` | Interruptor de visibilidad. `1` (activado) o `0` (desactivado). |
| `show_vehicle` | `apply_filters(mhmrentiva_testimonials_show_vehicle` | Interruptor de visibilidad. `1` (activado) o `0` (desactivado). |
| `show_customer` | `apply_filters(mhmrentiva_testimonials_show_customer` | Interruptor de visibilidad. `1` (activado) o `0` (desactivado). |
| `layout` | `apply_filters(mhmrentiva_testimonials_layout` | Controla el comportamiento **general** del diseño del módulo. |
| `columns` | `apply_filters(mhmrentiva_testimonials_columns` | Controla el comportamiento **general** del diseño del módulo. |
| `auto_rotate` | `apply_filters(mhmrentiva_testimonials_auto_rotate` | Interruptor de visibilidad. `1` (activado) o `0` (desactivado). |
| `class` | `apply_filters(mhmrentiva_testimonials_class` | Controla el comportamiento **general** del diseño del módulo. |


## Características

### 📱 Diseño adaptable
- **Móvil:** diseño de una sola columna.
- **Tableta (menos de 782px):** vista optimizada.
- **Escritorio:** vista completa con el número de columnas o el ancho configurados.

### 🚀 Orientado al rendimiento
- **Caché inteligente:** el sistema optimiza las consultas a la base de datos y las guarda en caché.
- **Carga condicional:** los recursos estáticos solo se cargan en las páginas en las que se usa el módulo.

## Notas para desarrolladores

- **Estructura HTML:** todos los contenedores empiezan con la clase `.mhm-rentiva-testimonials-wrapper`.
- **Personalización:** las variables CSS (`--mhm-color-primary`, etc.) se heredan del archivo global `css-variables.css`.

## Resumen de la sección
- La página Testimonios se ha adaptado a la estructura estándar de la documentación, con encabezados de referencia coherentes.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.0-docs | Página ordenada alfabéticamente y marcador de posición de imagen añadido. |
