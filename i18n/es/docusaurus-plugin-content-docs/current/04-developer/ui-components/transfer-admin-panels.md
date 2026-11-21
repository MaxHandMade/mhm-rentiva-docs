---
id: transfer-admin-panels
title: "Paneles de administración de transferencias (interfaz y paneles)"
sidebar_label: "Paneles de transferencias"
sidebar_position: 7
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Función Pro
Esta página documenta una funcionalidad del complemento **MHM Rentiva Pro**. No forma parte de la edición gratuita
Lite de WordPress.org y requiere tener Pro instalado junto a Lite, además de una licencia válida.
Consulta [Ediciones — Lite frente a Pro](/docs/) para ver la división completa, u obtén Pro en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Propósito
Esta página describe la arquitectura técnica y las reglas de introducción de datos de las interfaces de administración que gestionan las operaciones de transferencia de vehículos de Rentiva (VIP aeropuerto, interurbanas, etc.).
:::

# 🛣️ Paneles de administración de transferencias

El módulo de transferencias funciona sobre una estructura de red basada en ubicaciones, distinta del alquiler de vehículos estándar. La clase `TransferAdmin` controla de forma centralizada las pantallas (Ubicaciones, Rutas, Estadísticas) donde se gestiona esta red.

---

## 🏗️ Componentes de la arquitectura

El módulo utiliza tres componentes principales para la introducción y visualización de datos:
1.  **Tarjetas de estadísticas:** panel superior que muestra datos de ubicaciones, rutas y la última operación.
2.  **Gestor de ubicaciones:** definición de puntos de transferencia como aeropuertos, hoteles y puertos.
3.  **Configurador de rutas:** reglas de distancia, duración y precios entre dos ubicaciones.

---

## 📊 Tarjetas de estadísticas de transferencias

El método `render_transfer_stats()`, situado en la parte superior del panel de administración, presenta datos operativos en tiempo real:

- **Total de ubicaciones:** puntos de transferencia activos en la tabla `rentiva_transfer_locations`.
- **Rutas activas:** rutas válidas definidas y con precio.
- **Última operación:** fecha de la reserva más reciente del tipo `transfer`.

---

## Tipos de ubicación

El sistema admite los siguientes tipos internos, que cambian la iconografía mostrada en el panel:
- **Aeropuerto:** puntos de transferencia en aeropuertos.
- **Hotel:** establecimientos de alojamiento.
- **Puerto:** terminales portuarias y de cruceros.
- **Estación:** terminales de tren y autobús.
- **Centro de la ciudad:** puntos en el centro de la ciudad.

### Campos del formulario de ubicación

A partir de la v4.23.0, se ha añadido un campo **ciudad** al formulario de ubicación. Este campo se utiliza para filtrar por ciudad en la integración del marketplace de vendedores:

| Campo | Tipo | Descripción |
|---|---|---|
| `name` | VARCHAR(255) | Nombre de la ubicación |
| `type` | ENUM | airport, hotel, port, station, city_center |
| `city` | VARCHAR(100) | Ciudad en la que se encuentra la ubicación (v4.23.0) |
| `lat` / `lng` | DECIMAL | Coordenadas |

---

## Formulario de ruta y campos de precio

En la v4.23.0 se añadió un campo **max_price** al formulario de ruta. En el marketplace de vendedores, los vendedores fijan sus propios precios dentro del rango `min_price`/`max_price` definido por el administrador:

| Campo | Tipo | Descripción |
|---|---|---|
| `origin_id` | BIGINT | Ubicación de origen |
| `destination_id` | BIGINT | Ubicación de destino |
| `base_price` | DECIMAL(10,2) | Precio base |
| `min_price` | DECIMAL(10,2) | Precio mínimo del vendedor |
| `max_price` | DECIMAL(10,2) | Precio máximo del vendedor (v4.23.0) |
| `distance_km` | FLOAT | Distancia (km) |
| `duration_min` | INT | Duración estimada (min) |

---

## Caja meta de vehículo del vendedor (`VehicleTransferMetaBox.php`)

Al editar el vehículo de un vendedor en el panel de administración, `VehicleTransferMetaBox` muestra la información de la ciudad del vendedor. Esto permite al administrador ver a qué rutas de qué ciudad puede acceder el vendedor.

---

## Guardado de datos y seguridad

Todas las operaciones de formulario se gestionan de forma asíncrona y segura (protegidas con nonce) mediante los hooks `admin_post`:

```php
// Example: hooks triggered during route saving
add_action('admin_post_mhmrentiva_save_route', array(self::class, 'handle_save_route'));
add_action('admin_post_mhmrentiva_delete_route', array(self::class, 'handle_delete_route'));
```

---

## 📦 Compatibilidad con versiones anteriores de la base de datos (DB Fallback)

Las tablas de transferencias funcionan con el prefijo moderno `rentiva_`, pero también detectan automáticamente las tablas antiguas `mhm_` de sistemas anteriores mediante el método `resolve_table_name()` y conservan los datos.

## Resumen de la sección
- Los paneles de transferencias están diseñados con un enfoque **centrado en las estadísticas**.
- El campo **ciudad** del formulario de ubicación es obligatorio para la integración del marketplace de vendedores.
- Los campos **min_price/max_price** del formulario de ruta definen el rango de precios del vendedor.
- `VehicleTransferMetaBox` muestra la información de la ciudad al editar un vehículo de un vendedor.
- Toda la introducción de datos se realiza de forma atómica a través de la clase `TransferAdmin`.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Añadida la traducción al inglés. |
| 27.03.2026 | 4.23.0 | Añadido el campo ciudad al formulario de ubicación, añadido el campo max_price al formulario de ruta y añadida la información de la ciudad del vendedor en VehicleTransferMetaBox. |
| 19.03.2026 | 4.21.2 | Página actualizada para reflejar las tarjetas de estadísticas de TransferAdmin y la estructura moderna de ubicaciones. |
