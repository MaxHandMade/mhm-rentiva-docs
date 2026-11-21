---
title: "Formulario de solicitud de vendedor"
description: "Guía de uso y referencia técnica del módulo Formulario de solicitud de vendedor."
sidebar_position: 24
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Función Pro
Esta página documenta una funcionalidad del complemento **MHM Rentiva Pro**. No forma parte de la edición gratuita
Lite de WordPress.org y requiere Pro instalado junto con Lite, además de una licencia válida.
Consulta [Ediciones — Lite frente a Pro](/docs/) para ver la división completa, o consigue Pro en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Propósito
Esta página describe el módulo Formulario de solicitud de vendedor como referencia estándar, abarcando tanto los aspectos técnicos como los operativos.
:::

# 🚗 Formulario de solicitud de vendedor

## Contenido
- Uso
- Características
- Notas para desarrolladores

El módulo Formulario de solicitud de vendedor está diseñado para gestionar y presentar a los visitantes los procesos de incorporación de **vendedores** en la plataforma Rentiva.

## Uso

:::tip IMAGEN PRÓXIMAMENTE
Aquí se añadirá una captura de pantalla que muestre el aspecto en el frontend (de cara al visitante) de este módulo.
:::

Para añadir este módulo a cualquier página o entrada, usa el siguiente shortcode:

```shortcode
[rentiva_vendor_apply]
```

También puedes insertarlo visualmente desde el editor de bloques de Gutenberg seleccionando **"MHM Rentiva → Formulario de solicitud de vendedor"**.

### Parámetros

Los siguientes parámetros están disponibles dentro del shortcode:

| Parámetro | Valor predeterminado | Descripción |
| :--- | :--- | :--- |
| - | - | Este shortcode no acepta parámetros. |


## Características

### 📱 Diseño adaptable
- **Móvil:** Diseño de una sola columna.
- **Tableta (menos de 782px):** Vista optimizada.
- **Escritorio:** Vista completa con el número de columnas o el ancho configurado.

### 🚀 Orientado al rendimiento
- **Caché inteligente:** El sistema optimiza y almacena en caché las consultas a la base de datos.
- **Carga condicional:** Los recursos estáticos solo se cargan en las páginas donde se usa el módulo.

### 📜 Acuerdo de vendedor

Cuando **Exigir acuerdo de vendedor** está activado (**Ajustes → Mercado de vendedores → Acuerdo de vendedor**), el formulario muestra el texto del acuerdo y una casilla de consentimiento obligatoria; la solicitud no puede enviarse sin marcarla. Si el texto está vacío, se muestra en su lugar una plantilla integrada. Es un punto de partida, no asesoramiento legal: revísala y adáptala a tu negocio y a la legislación local. El texto admite `# Heading`, `**bold**`, `- list item` y `---`. Consulta [Incorporación de vendedores](/docs/vendor/onboarding).

## Notas para desarrolladores

- **Estructura HTML:** Todos los contenedores comienzan con la clase `.mhm-rentiva-vendor-apply-wrapper`.
- **Personalización:** Las variables CSS (`--mhm-color-primary`, etc.) se heredan del archivo global `css-variables.css`.

## Resumen de la sección
- La página Formulario de solicitud de vendedor se ha adaptado a la estructura de documentación estándar con encabezados de referencia coherentes.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 18.11.2026 | Pro 6.5.0 | Documentado el acuerdo de vendedor mostrado en el formulario, con la plantilla integrada para un texto vacío. |
| 23.04.2026 | 4.27.2 | Añadida la traducción al inglés. |
| 19.03.2026 | 4.21.0-docs | Página ordenada alfabéticamente y añadido el marcador de posición de imagen. |
