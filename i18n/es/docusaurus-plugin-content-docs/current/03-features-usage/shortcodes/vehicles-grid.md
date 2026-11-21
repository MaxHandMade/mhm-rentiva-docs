---
title: "Cuadrícula de vehículos"
description: "Guía de uso y referencia técnica del módulo Cuadrícula de vehículos."
sidebar_position: 22
---
![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Documentación](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
Esta página describe el módulo Cuadrícula de vehículos como referencia estándar y abarca tanto los aspectos técnicos como los operativos.
:::

# 🚗 Cuadrícula de vehículos

## Contenido
- Uso
- Características
- Notas para desarrolladores

El módulo Cuadrícula de vehículos está diseñado para gestionar y presentar a los visitantes los listados de **vehículos** en la plataforma Rentiva.

## Uso

![Vista en la parte pública de este shortcode](/img/docs/screens/sc-vehicles-grid.webp)

Para añadir este módulo a cualquier página o entrada, usa el siguiente shortcode:

```shortcode
[rentiva_vehicles_grid limit="12"]
```

También puedes insertarlo de forma visual desde el editor de bloques de Gutenberg seleccionando **"MHM Rentiva → Cuadrícula de vehículos"**.

### Parámetros

Los siguientes parámetros están disponibles dentro del shortcode:

| Parámetro | Valor predeterminado | Descripción |
| :--- | :--- | :--- |
| `limit` | `12` | Número máximo de elementos que se muestran. |
| `columns` | `2` | Controla el comportamiento **general** del diseño del módulo. |
| `orderby` | `title` | Controla el comportamiento **general** de ordenación del módulo. |
| `order` | `ASC` | Controla la dirección **general** de ordenación del módulo. |
| `category` | `(empty)` | Controla el comportamiento del filtro de **características** del módulo. |
| `featured` | `0` | Interruptor de visibilidad. `1` (activado) o `0` (desactivado). |
| `show_image` | `1` | Interruptor de visibilidad. `1` (activado) o `0` (desactivado). |
| `show_title` | `1` | Controla el comportamiento **general** de visualización del módulo. |
| `show_price` | `1` | Controla el comportamiento **general** de visualización del módulo. |
| `show_features` | `1` | Controla el comportamiento **general** de visualización del módulo. |
| `show_rating` | `1` | Controla el comportamiento **general** de visualización del módulo. |
| `show_booking_button` | `1` | Controla el comportamiento **general** de visualización del módulo. |
| `show_favorite_button` | `1` | Controla el comportamiento **general** de visualización del módulo. |
| `show_category` | `1` | Controla el comportamiento **general** de visualización del módulo. |
| `show_brand` | `0` | Interruptor de visibilidad. `1` (activado) o `0` (desactivado). |
| `show_compare_button` | `1` | Controla el comportamiento **general** de visualización del módulo. |
| `enable_lazy_load` | `1` | Interruptor de visibilidad. `1` (activado) o `0` (desactivado). |
| `enable_ajax_filtering` | `0` | Interruptor de visibilidad. `1` (activado) o `0` (desactivado). |
| `enable_infinite_scroll` | `0` | Interruptor de visibilidad. `1` (activado) o `0` (desactivado). |
| `image_size` | `medium` | Controla el comportamiento del **diseño** del módulo. |
| `class` | `(empty)` | Controla el comportamiento **general** del diseño del módulo. |
| `custom_css_class` | `(empty)` | Controla el comportamiento del **diseño** del módulo. |
| `min_rating` | `(empty)` | Controla el comportamiento de la **consulta** del módulo. |
| `min_reviews` | `(empty)` | Controla el comportamiento de la **consulta** del módulo. |
| `layout` | `grid` | Controla el comportamiento **general** del diseño del módulo. |


## Características

### 📱 Diseño adaptable
- **Móvil:** diseño de una sola columna.
- **Tableta (menos de 782px):** vista optimizada.
- **Escritorio:** vista completa con el número de columnas o el ancho configurados.

### 🚀 Orientado al rendimiento
- **Caché inteligente:** el sistema optimiza las consultas a la base de datos y las guarda en caché.
- **Carga condicional:** los recursos estáticos solo se cargan en las páginas donde se usa el módulo.

## Detalles de la tarjeta de vehículo

- **Servicios obligatorios en el total:** cuando la página se abre con fechas (por ejemplo, desde una búsqueda), cada tarjeta muestra el total del periodo. Si has marcado algunos servicios adicionales como obligatorios, una línea bajo el total los nombra, por ejemplo "Servicio obligatorio incluido: Seguro a todo riesgo 25" (si hay varios servicios, se enumeran separados por comas con un único importe combinado; un servicio por día se multiplica por el número de días). Una tarjeta sin fechas muestra el precio diario y no incluye esa línea.
- **Disposición del precio y del botón:** el propio ancho de la tarjeta decide la disposición. En una tarjeta estrecha (por ejemplo, los vehículos destacados de la página de inicio o una página de vehículos de tres columnas), el precio aparece encima del botón **Realizar reserva**; en una tarjeta ancha (por ejemplo, los resultados de búsqueda con fechas) aparecen uno al lado del otro. Las tarjetas de una misma fila siempre tienen el mismo aspecto.
- **Formato de números:** el kilometraje y la cilindrada siguen el idioma de la página: en inglés "18,500 km" y "1.6 L", en turco "18.500 km" y "1,6 L".

## Notas para desarrolladores

- **Estructura HTML:** todos los contenedores empiezan con la clase `.mhm-rentiva-vehicles-grid-wrapper`.
- **Personalización:** las variables CSS (`--mhm-color-primary`, etc.) se heredan del archivo global `css-variables.css`.

## Resumen de la sección
- La página Cuadrícula de vehículos se ha adaptado a la estructura estándar de la documentación con encabezados de referencia coherentes.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 18.11.2026 | 6.4.0 | Detalles de la tarjeta de vehículo: línea de servicios obligatorios, disposición del precio y del botón, formato de números. |
| 11.10.2026 | 6.2.0 | Se han eliminado `show_badges`, `show_description` y `show_availability`: la versión 6.2.0 ya no los lee. |
| 23.04.2026 | 4.27.2-docs | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.0-docs | Página ordenada alfabéticamente y marcador de imagen añadido. |
