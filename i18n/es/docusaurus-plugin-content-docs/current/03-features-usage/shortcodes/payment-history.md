---
title: "Pagos de la cuenta"
description: "Guía de uso y referencia técnica del módulo Pagos de la cuenta."
sidebar_position: 5
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
Esta página describe el módulo Pagos de la cuenta como referencia estándar y abarca tanto los aspectos técnicos como los operativos.
:::

# 🚗 Pagos de la cuenta

## Contenido
- Uso
- Características
- Notas para desarrolladores

El módulo Pagos de la cuenta está diseñado para gestionar y mostrar a los visitantes el historial de pagos de la **cuenta** en la plataforma Rentiva.

## Uso

:::tip IMAGEN PRÓXIMAMENTE
Aquí se añadirá una captura de pantalla que muestre el aspecto en el frontend (visible para los visitantes) de este módulo.
:::

Para añadir este módulo a cualquier página o entrada, usa el siguiente shortcode:

```shortcode
[rentiva_payment_history limit="20"]
```

También puedes insertarlo de forma visual desde el editor de bloques de Gutenberg seleccionando **"MHM Rentiva → Pagos de la cuenta"**.

### Parámetros

Los siguientes parámetros están disponibles dentro del shortcode:

| Parámetro | Predeterminado | Descripción |
| :--- | :--- | :--- |
| `limit` | `20` | Número máximo de elementos que se mostrarán. |
| `hide_nav` | `false` | Interruptor de visibilidad. `1` (activado) o `0` (desactivado). |


## Características

### 📱 Diseño adaptable
- **Móvil:** Diseño de una sola columna.
- **Tableta (menos de 782px):** Vista optimizada.
- **Escritorio:** Vista completa con el número de columnas o el ancho configurados.

### 🚀 Orientado al rendimiento
- **Caché inteligente:** El sistema optimiza y almacena en caché las consultas a la base de datos.
- **Carga condicional:** Los recursos estáticos solo se cargan en las páginas en las que se usa el módulo.

## Notas para desarrolladores

- **Estructura HTML:** Todos los contenedores empiezan con la clase `.mhm-rentiva-payment-history-wrapper`.
- **Personalización:** Las variables CSS (`--mhm-color-primary`, etc.) se heredan del archivo global `css-variables.css`.

## Resumen de la sección
- La página Pagos de la cuenta se ha adaptado a la estructura de documentación estándar con encabezados de referencia coherentes.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.0-docs | Página ordenada alfabéticamente y marcador de posición de imagen añadido. |
