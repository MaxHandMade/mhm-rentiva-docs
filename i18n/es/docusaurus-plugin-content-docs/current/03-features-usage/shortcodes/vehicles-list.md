---
title: "Lista de vehículos"
description: "Guía de uso y referencia técnica del módulo Lista de vehículos."
sidebar_position: 23
---
![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Documentación](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
Esta página describe el módulo Lista de vehículos como referencia estándar y abarca tanto los aspectos técnicos como los operativos.
:::

# 🚗 Lista de vehículos

## Contenido
- Uso
- Características
- Notas para desarrolladores

El módulo Lista de vehículos está diseñado para gestionar y mostrar a los visitantes los listados de **vehículos** en la plataforma Rentiva.

## Uso

![Vista en la parte pública de este shortcode](/img/docs/screens/sc-vehicles-list.webp)

Para añadir este módulo a cualquier página o entrada, usa el siguiente shortcode:

```shortcode
[rentiva_vehicles_list limit="12"]
```

También puedes insertarlo de forma visual desde el editor de bloques de Gutenberg seleccionando **"MHM Rentiva → Lista de vehículos"**.

### Parámetros

Dentro del shortcode están disponibles los siguientes parámetros:

| Parámetro | Valor predeterminado | Descripción |
| :--- | :--- | :--- |
| `limit` | `12` | Número máximo de elementos que se muestran. |
| `columns` | `1` | Controla el comportamiento **general** del diseño del módulo. |
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
| `show_description` | `1` | Interruptor de visibilidad. `1` (activado) o `0` (desactivado). |
| `show_compare_button` | `1` | Controla el comportamiento **general** de visualización del módulo. |
| `enable_lazy_load` | `1` | Interruptor de visibilidad. `1` (activado) o `0` (desactivado). |
| `enable_ajax_filtering` | `0` | Interruptor de visibilidad. `1` (activado) o `0` (desactivado). |
| `enable_infinite_scroll` | `0` | Interruptor de visibilidad. `1` (activado) o `0` (desactivado). |
| `image_size` | `medium` | Controla el comportamiento del **diseño** del módulo. |
| `ids` | `(empty)` | Lista de ID separados por comas (p. ej., `12,15,44`). |
| `max_features` | `5` | Controla el comportamiento del filtro de **características** del módulo. |
| `class` | `(empty)` | Controla el comportamiento **general** del diseño del módulo. |
| `custom_css_class` | `(empty)` | Controla el comportamiento del **diseño** del módulo. |
| `min_rating` | `(empty)` | Controla el comportamiento de la **consulta** del módulo. |
| `min_reviews` | `(empty)` | Controla el comportamiento de la **consulta** del módulo. |


## Características

### 📱 Diseño adaptable
- **Móvil:** diseño de una sola columna.
- **Tableta (menos de 782px):** vista optimizada.
- **Escritorio:** vista completa con el número de columnas o el ancho configurados.

### 🚀 Orientado al rendimiento
- **Caché inteligente:** el sistema optimiza y almacena en caché las consultas a la base de datos.
- **Carga condicional:** los recursos estáticos solo se cargan en las páginas donde se usa el módulo.

## Detalles de la tarjeta de vehículo

- **Servicios obligatorios en el total:** cuando la página se abre con fechas (por ejemplo, desde una búsqueda), cada tarjeta muestra el total del periodo. Si has marcado algunos servicios adicionales como obligatorios, una línea bajo el total los nombra, por ejemplo "Servicio obligatorio incluido: Seguro a todo riesgo 25" (si hay varios servicios, se enumeran separados por comas con un único importe conjunto; un servicio por día se multiplica por el número de días). Una tarjeta sin fechas muestra el precio diario y no incluye esa línea.
- **Disposición del precio y el botón:** el ancho de la propia tarjeta determina la disposición. En una tarjeta estrecha (por ejemplo, los vehículos destacados de la página de inicio o una página de vehículos de tres columnas), el precio aparece encima del botón **Realizar reserva**; en una tarjeta ancha (por ejemplo, los resultados de búsqueda con fechas), aparecen uno al lado del otro. Las tarjetas de una misma fila siempre tienen el mismo aspecto.
- **Formato numérico:** el kilometraje y la cilindrada siguen el idioma de la página: en inglés "18,500 km" y "1.6 L", en turco "18.500 km" y "1,6 L".

## Notas para desarrolladores

- **Estructura HTML:** todos los contenedores empiezan con la clase `.mhm-rentiva-vehicles-list-wrapper`.
- **Personalización:** las variables CSS (`--mhm-color-primary`, etc.) se heredan del archivo global `css-variables.css`.

## Resumen de la sección
- La página Lista de vehículos se ha adaptado a la estructura estándar de la documentación, con encabezados de referencia coherentes.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 18.11.2026 | 6.4.0 | Detalles de la tarjeta de vehículo: línea de servicios obligatorios, disposición del precio y el botón, formato numérico. |
| 11.10.2026 | 6.2.0 | Se han eliminado `show_badges`, `show_availability` y `price_format`: la versión 6.2.0 ya no los lee. |
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.0-docs | Página ordenada alfabéticamente y marcador de posición de imagen añadido. |
