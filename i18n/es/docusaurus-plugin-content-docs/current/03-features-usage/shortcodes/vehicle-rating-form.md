---
title: "Formulario de valoración de vehículos"
description: "Guía de uso y referencia técnica del módulo Formulario de valoración de vehículos."
sidebar_position: 21
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
Esta página describe el módulo Formulario de valoración de vehículos como referencia estándar, abarcando tanto los aspectos técnicos como los operativos.
:::

# 🚗 Formulario de valoración de vehículos

## Contenido
- Uso
- Características
- Notas para desarrolladores

El módulo Formulario de valoración de vehículos está diseñado para gestionar y mostrar a los visitantes formularios de valoración de **soporte** en la plataforma Rentiva.

## Uso

:::tip IMAGEN PRÓXIMAMENTE
Aquí se añadirá una captura de pantalla que muestre el aspecto en la parte pública (la que ven los visitantes) de este módulo.
:::

Para añadir este módulo a cualquier página o entrada, utiliza el siguiente shortcode:

```shortcode
[rentiva_vehicle_rating_form vehicle_id=""]
```

También puedes insertarlo de forma visual desde el editor de bloques de Gutenberg seleccionando **"MHM Rentiva → Formulario de valoración de vehículos"**.

### Parámetros

Los siguientes parámetros están disponibles dentro del shortcode:

| Parámetro | Predeterminado | Descripción |
| :--- | :--- | :--- |
| `vehicle_id` | `(empty)` | Controla el comportamiento del filtro de **características** del módulo. |
| `show_rating_display` | `1` | Interruptor de visibilidad. `1` (activado) o `0` (desactivado). |
| `show_form` | `1` | Interruptor de visibilidad. `1` (activado) o `0` (desactivado). |
| `show_ratings_list` | `1` | Interruptor de visibilidad. `1` (activado) o `0` (desactivado). |
| `class` | `(empty)` | Controla el comportamiento del diseño **general** del módulo. |


## Características

### 📱 Diseño adaptable
- **Móvil:** Diseño de una sola columna.
- **Tableta (menos de 782px):** Vista optimizada.
- **Ordenador:** Vista completa con el número de columnas o el ancho configurados.

### 🚀 Orientado al rendimiento
- **Caché inteligente:** El sistema optimiza y almacena en caché las consultas a la base de datos.
- **Carga condicional:** Los recursos estáticos solo se cargan en las páginas donde se utiliza el módulo.

## Notas para desarrolladores

- **Estructura HTML:** Todos los contenedores empiezan con la clase `.mhm-rentiva-vehicle-rating-form-wrapper`.
- **Personalización:** Las variables CSS (`--mhm-color-primary`, etc.) se heredan del archivo global `css-variables.css`.

## Resumen de la sección
- La página Formulario de valoración de vehículos se ha adaptado a la estructura de documentación estándar con encabezados de referencia coherentes.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.0-docs | Página ordenada alfabéticamente y marcador de imagen añadido. |
