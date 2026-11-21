---
title: "Envío de vehículos por vendedores"
description: "Guía de uso y referencia técnica del módulo de envío de vehículos por vendedores."
sidebar_position: 25
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
Esta página describe el módulo de envío de vehículos por vendedores como referencia estándar y abarca tanto los aspectos técnicos como los operativos.
:::

# 🚗 Envío de vehículos por vendedores

## Contenido
- Uso
- Características
- Notas para desarrolladores

El módulo de envío de vehículos por vendedores está diseñado para gestionar y presentar a los visitantes los procesos de envío de vehículos por parte del **vendedor** en la plataforma Rentiva.

## Uso

:::tip IMAGEN PRÓXIMAMENTE
Aquí se añadirá una captura de pantalla que muestra el aspecto en la parte pública (la que ven los visitantes) de este módulo.
:::

Para añadir este módulo a cualquier página o entrada, usa el siguiente shortcode:

```shortcode
[rentiva_vehicle_submit]
```

También puedes insertarlo de forma visual desde el editor de bloques de Gutenberg seleccionando **"MHM Rentiva → Vendor Vehicle Submission"**.

### Parámetros

Los siguientes parámetros están disponibles dentro del shortcode:

| Parámetro | Valor predeterminado | Descripción |
| :--- | :--- | :--- |
| - | - | Este shortcode no admite parámetros. |


## Características

### 📱 Diseño adaptable
- **Móvil:** diseño de una sola columna.
- **Tableta (menos de 782px):** vista optimizada.
- **Escritorio:** vista completa con el número de columnas o el ancho configurados.

### 🚀 Orientado al rendimiento
- **Caché inteligente:** el sistema optimiza y almacena en caché las consultas a la base de datos.
- **Carga condicional:** los recursos estáticos solo se ponen en cola en las páginas donde se usa el módulo.

### 🚗 Selección de ubicaciones y rutas de transferencia (v4.23.0)

A partir de la v4.23.0, el formulario de envío de vehículos incluye campos específicos del módulo de transferencia.

#### Selección de ubicaciones filtrada por ciudad
Las ubicaciones de transferencia se filtran automáticamente según el valor meta `_vendor_city` del vendedor. Se consultan mediante `LocationProvider::get_by_city()`. Los vendedores solo pueden ver y seleccionar ubicaciones de su propia ciudad.

- **Clave meta:** `_mhmrentiva_transfer_locations` (array)
- **Clave meta:** `_mhmrentiva_transfer_routes` (array)

#### Introducción de precios por ruta
Para cada ruta seleccionada, el vendedor puede introducir su propio precio dentro del rango `min_price` / `max_price` establecido por el administrador. Los precios fuera de ese rango se rechazan.

- **Clave meta:** `_mhmrentiva_transfer_route_prices` (JSON)
- **Valor alternativo:** si el vendedor no ha establecido ningún precio, se usa el valor `base_price` de la ruta.

#### Capacidad de pasajeros y equipaje
- **Capacidad de pasajeros:** número máximo de pasajeros que puede transportar el vehículo.
- **Equipaje grande:** capacidad máxima de maletas grandes.
- **Equipaje pequeño:** capacidad máxima de bolsas pequeñas/equipaje de mano.

#### Subida del documento del vehículo (permiso de circulación)
El vendedor puede subir el permiso de circulación del vehículo a través del formulario. El administrador revisa el documento para su verificación.

## Notas para desarrolladores

- **Estructura HTML:** todos los contenedores empiezan con la clase `.mhm-rentiva-vehicle-submit-wrapper`.
- **Personalización:** las variables CSS (`--mhm-color-primary`, etc.) se heredan del archivo global `css-variables.css`.
- **Campos de transferencia:** se muestran u ocultan mediante un conmutador JS cuando el tipo de servicio se establece en "Transferencia" o "Ambos".

## Resumen de la sección
- El formulario de envío de vehículos por vendedores incluye, además de la información básica del vehículo, la selección de ubicaciones/rutas de transferencia, los precios por ruta y los campos de capacidad.
- El filtrado por ciudad garantiza que los vendedores solo puedan ver las ubicaciones de su propia región.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 27.03.2026 | 4.23.0 | Se han documentado la selección de ubicaciones/rutas de transferencia filtrada por ciudad, los precios por ruta, los campos de capacidad y la subida del permiso de circulación. |
| 19.03.2026 | 4.21.0-docs | Se ha ordenado alfabéticamente la página y se ha añadido un marcador de posición para la imagen. |
