---
title: "Shortcode experimental POC"
description: "Guía de uso y referencia técnica del módulo Shortcode experimental POC."
sidebar_position: 11
---
![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Documentación](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
Esta página describe el módulo Shortcode experimental POC como referencia estándar, abarcando tanto los aspectos técnicos como los operativos.
:::

# 🚗 Shortcode experimental POC

## Contenido
- Uso
- Características
- Notas para desarrolladores

El módulo Shortcode experimental POC está diseñado para gestionar y presentar a los visitantes los procesos de **soporte** en la plataforma Rentiva.

## Uso

:::tip IMAGEN PRÓXIMAMENTE
Aquí se añadirá una captura de pantalla que muestre el aspecto en el frontend (de cara al visitante) de este módulo.
:::

Para añadir este módulo a cualquier página o entrada, usa el siguiente shortcode:

```shortcode
[rentiva_home_poc]
```

También puedes insertarlo de forma visual desde el editor de bloques de Gutenberg seleccionando **"MHM Rentiva → Experimental POC Shortcode"**.

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
- **Carga condicional:** Los recursos estáticos solo se ponen en cola en las páginas donde se usa el módulo.

## Notas para desarrolladores

- **Estructura HTML:** Todos los contenedores empiezan con la clase `.mhm-rentiva-home-poc-wrapper`.
- **Personalización:** Las variables CSS (`--mhm-color-primary`, etc.) se heredan del archivo global `css-variables.css`.

## Resumen de la sección
- La página Shortcode experimental POC se ha adaptado a la estructura estándar de documentación con encabezados de referencia coherentes.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.0-docs | Página ordenada alfabéticamente y marcador de posición de imagen añadido. |
