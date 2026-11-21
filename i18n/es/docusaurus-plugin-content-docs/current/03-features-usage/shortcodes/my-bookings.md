---
title: "Reservas de la cuenta"
description: "Guía de uso y referencia técnica del módulo Reservas de la cuenta."
sidebar_position: 2
---
![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Documentación](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
Esta página describe el módulo Reservas de la cuenta como referencia estándar, y abarca tanto los aspectos técnicos como los operativos.
:::

# 🚗 Reservas de la cuenta

## Contenido
- Uso
- Características
- Notas para desarrolladores

El módulo Reservas de la cuenta está diseñado para gestionar y presentar a los visitantes los procesos de reserva de la **cuenta** en la plataforma Rentiva.

## Uso

:::tip IMAGEN PRÓXIMAMENTE
Aquí se añadirá una captura de pantalla que muestre el aspecto en el frontend (de cara al visitante) de este módulo.
:::

Para añadir este módulo a cualquier página o entrada, usa el shortcode siguiente:

```shortcode
[rentiva_my_bookings limit="10"]
```

También puedes insertarlo de forma visual desde el editor de bloques de Gutenberg seleccionando **"MHM Rentiva → Account Bookings"**.

### Parámetros

Los siguientes parámetros están disponibles dentro del shortcode:

| Parámetro | Valor predeterminado | Descripción |
| :--- | :--- | :--- |
| `limit` | `10` | Número máximo de elementos que se mostrarán. |
| `status` | `(empty)` | Controla el comportamiento del **flujo de trabajo** del módulo. |
| `order` | `DESC` | Controla la dirección de ordenación **general** del módulo. |
| `hide_nav` | `false` | Interruptor de visibilidad. `1` (activado) o `0` (desactivado). |


## Características

### 📱 Diseño adaptable
- **Móvil:** diseño de una sola columna.
- **Tableta (menos de 782px):** vista optimizada.
- **Escritorio:** vista completa con el número de columnas o el ancho configurados.

### 🚀 Orientado al rendimiento
- **Caché inteligente:** el sistema optimiza y almacena en caché las consultas a la base de datos.
- **Carga condicional:** los recursos estáticos solo se ponen en cola en las páginas donde se usa el módulo.

## Notas para desarrolladores

- **Estructura HTML:** todos los contenedores empiezan con la clase `.mhm-rentiva-my-bookings-wrapper`.
- **Personalización:** las variables CSS (`--mhm-color-primary`, etc.) se heredan del archivo global `css-variables.css`.

## Resumen de la sección
- La página Reservas de la cuenta se ha adaptado a la estructura de documentación estándar con encabezados de referencia coherentes.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 11.10.2026 | 6.2.0 | `orderby` eliminado: la 6.2.0 ya no lo lee. |
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.0-docs | Página ordenada alfabéticamente y marcador de posición de imagen añadido. |
