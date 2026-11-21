---
title: "Comparación de vehículos"
description: "Guía de uso y referencia técnica del módulo de comparación de vehículos."
sidebar_position: 19
---
![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Documentación](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
Esta página describe el módulo de comparación de vehículos como referencia estándar, abarcando tanto los aspectos técnicos como los operativos.
:::

# 🚗 Comparación de vehículos

## Contenido
- Uso
- Características
- Notas para desarrolladores

El módulo de comparación de vehículos está diseñado para gestionar y presentar a los visitantes los procesos de comparación de **vehículos** en la plataforma Rentiva.

## Uso

:::tip IMAGEN PRÓXIMAMENTE
Aquí se añadirá una captura de pantalla que muestre el aspecto en el frontend (de cara al visitante) de este módulo.
:::

Para añadir este módulo a cualquier página o entrada, usa el siguiente shortcode:

```shortcode
[rentiva_vehicle_comparison vehicle_ids=""]
```

También puedes insertarlo de forma visual desde el editor de bloques de Gutenberg seleccionando **"MHM Rentiva → Comparación de vehículos"**.

### Parámetros

Los siguientes parámetros están disponibles dentro del shortcode:

| Parámetro | Valor predeterminado | Descripción |
| :--- | :--- | :--- |
| `vehicle_ids` | `(empty)` | Controla el comportamiento del filtro de **características** del módulo. |
| `max_vehicles` | `4` | Controla el comportamiento de visualización **general** del módulo. |
| `show_add_vehicle` | `1` | Controla el comportamiento de visualización **general** del módulo. |
| `show_remove_buttons` | `1` | Controla el comportamiento de visualización **general** del módulo. |
| `show_prices` | `1` | Controla el comportamiento de visualización **general** del módulo. |
| `show_images` | `1` | Controla el comportamiento de visualización **general** del módulo. |
| `show_booking_buttons` | `1` | Controla el comportamiento de visualización **general** del módulo. |
| `layout` | `table` | Controla el comportamiento de diseño **general** del módulo. |
| `title` | `(empty)` | Controla el comportamiento de visualización **general** del módulo. |
| `manual_add` | `0` | Controla el comportamiento de visualización **general** del módulo. |
| `class` | `(empty)` | Controla el comportamiento de diseño **general** del módulo. |


## Características

### 📱 Diseño adaptable
- **Móvil:** diseño de una sola columna.
- **Tablet (menos de 782px):** vista optimizada.
- **Escritorio:** vista completa con el número de columnas o el ancho configurados.

### 🚀 Orientado al rendimiento
- **Caché inteligente:** el sistema optimiza y almacena en caché las consultas a la base de datos.
- **Carga condicional:** los recursos estáticos solo se cargan en las páginas donde se usa el módulo.

## Notas para desarrolladores

- **Estructura HTML:** todos los contenedores empiezan con la clase `.mhm-rentiva-vehicle-comparison-wrapper`.
- **Personalización:** las variables CSS (`--mhm-color-primary`, etc.) se heredan del archivo global `css-variables.css`.

## Resumen de la sección
- La página de comparación de vehículos se ha adaptado a la estructura estándar de la documentación con encabezados de referencia coherentes.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 11.10.2026 | 6.2.0 | `show_features` eliminado: la 6.2.0 ya no lo lee. |
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.0-docs | Página ordenada alfabéticamente y marcador de posición de imagen añadido. |
