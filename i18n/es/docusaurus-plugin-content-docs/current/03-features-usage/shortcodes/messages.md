---
title: "Mensajes de la cuenta"
description: "Guía de uso y referencia técnica del módulo Mensajes de la cuenta."
sidebar_position: 4
---
![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Función Pro
Esta página documenta una funcionalidad del complemento **MHM Rentiva Pro**. No forma parte de la edición gratuita
Lite de WordPress.org y requiere tener Pro instalado junto a Lite, además de una licencia válida.
Consulta [Ediciones — Lite frente a Pro](/docs/) para ver la división completa, u obtén Pro en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Propósito
Esta página describe el módulo Mensajes de la cuenta como referencia estándar, abarcando tanto los aspectos técnicos como los operativos.
:::

# 🚗 Mensajes de la cuenta

## Contenido
- Uso
- Características
- Notas para desarrolladores

El módulo Mensajes de la cuenta está diseñado para gestionar y presentar a los visitantes de la plataforma Rentiva los procesos de mensajería de **soporte**.

## Uso

:::tip IMAGEN PRÓXIMAMENTE
Aquí se añadirá una captura de pantalla que muestre el aspecto en el frontend (de cara al visitante) de este módulo.
:::

Para añadir este módulo a cualquier página o entrada, usa el siguiente shortcode:

```shortcode
[rentiva_messages]
```

También puedes insertarlo visualmente desde el editor de bloques de Gutenberg seleccionando **"MHM Rentiva → Mensajes de la cuenta"**.

### Parámetros

Los siguientes parámetros están disponibles dentro del shortcode:

| Parámetro | Predeterminado | Descripción |
| :--- | :--- | :--- |
| - | - | Este shortcode no acepta parámetros. |


## Características

### 📱 Diseño adaptable
- **Móvil:** Diseño de una sola columna.
- **Tableta (menos de 782px):** Vista optimizada.
- **Escritorio:** Vista completa con el número de columnas o el ancho configurados.

### 🚀 Orientado al rendimiento
- **Caché inteligente:** El sistema optimiza y almacena en caché las consultas a la base de datos.
- **Carga condicional:** Los recursos estáticos solo se cargan en las páginas donde se usa el módulo.

## Notas para desarrolladores

- **Estructura HTML:** Todos los contenedores comienzan con la clase `.mhm-rentiva-messages-wrapper`.
- **Personalización:** Las variables CSS (`--mhm-color-primary`, etc.) se heredan del archivo global `css-variables.css`.

## Resumen de la sección
- La página Mensajes de la cuenta se ha adaptado a la estructura de documentación estándar con encabezados de referencia coherentes.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.0-docs | Página ordenada alfabéticamente y marcador de imagen añadido. |
