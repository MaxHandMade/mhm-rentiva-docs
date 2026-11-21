---
title: "Formulario de búsqueda de transferencias"
description: "Guía de uso y referencia técnica del módulo Formulario de búsqueda de transferencias."
sidebar_position: 17
---
![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Función Pro
Esta página documenta una funcionalidad del complemento **MHM Rentiva Pro**. No forma parte de la edición gratuita
Lite de WordPress.org y requiere tener Pro instalado junto con Lite, además de una licencia válida.
Consulta [Ediciones — Lite frente a Pro](/docs/) para ver la división completa, o consigue Pro en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Propósito
Esta página describe el módulo Formulario de búsqueda de transferencias como referencia estándar, y abarca tanto los aspectos técnicos como los operativos.
:::

# 🚗 Formulario de búsqueda de transferencias

## Contenido
- Uso
- Características
- Notas para desarrolladores

El módulo Formulario de búsqueda de transferencias está diseñado para gestionar y presentar a los visitantes los procesos de búsqueda de **transferencias** en la plataforma Rentiva.

## Uso

:::tip IMAGEN PRÓXIMAMENTE
Aquí se añadirá una captura de pantalla que muestra el aspecto en el frontend (de cara al visitante) de este módulo.
:::

Para añadir este módulo a cualquier página o entrada, usa el siguiente shortcode:

```shortcode
[rentiva_transfer_search]
```

También puedes insertarlo visualmente desde el editor de bloques de Gutenberg seleccionando **"MHM Rentiva → Transfer Search Form"**.

### Parámetros

Los siguientes parámetros están disponibles dentro del shortcode:

| Parámetro | Predeterminado | Descripción |
| :--- | :--- | :--- |
| - | - | Este shortcode no acepta parámetros. |


## Características

### 📱 Diseño adaptable
- **Móvil:** diseño de una sola columna.
- **Tableta (menos de 782px):** vista optimizada.
- **Escritorio:** vista completa con el número de columnas o el ancho configurados.

### 🚀 Orientado al rendimiento
- **Caché inteligente:** el sistema optimiza y almacena en caché las consultas a la base de datos.
- **Carga condicional:** los recursos estáticos solo se encolan en las páginas donde se usa el módulo.

## Notas para desarrolladores

- **Estructura HTML:** todos los contenedores empiezan con la clase `.mhm-rentiva-transfer-search-wrapper`.
- **Personalización:** las variables CSS (`--mhm-color-primary`, etc.) se heredan del archivo global `css-variables.css`.

## Resumen de la sección
- La página Formulario de búsqueda de transferencias se ha adaptado a la estructura de documentación estándar con encabezados de referencia coherentes.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.0-docs | Página ordenada alfabéticamente y marcador de imagen añadido. |
