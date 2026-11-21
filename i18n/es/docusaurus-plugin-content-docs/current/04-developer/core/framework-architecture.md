---
id: framework-architecture
title: "Arquitectura del framework de alquiler (Leasing Framework)"
sidebar_label: "Arquitectura y personalización"
sidebar_position: 2
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
Esta página explica cómo gestiona MHM Rentiva su modelo de activos de alquiler, las diferencias técnicas entre las versiones Lite y Pro, y el sistema flexible de atributos.
:::

# 🏗️ Arquitectura del framework de alquiler

MHM Rentiva no es solo un plugin de alquiler de vehículos; es un **framework de alquiler** flexible que puede personalizarse para coches, bicicletas, barcos u otros activos de alquiler similares.

## 🛠️ Arquitectura modular (Lite frente a Pro)

Lite no tiene capa de licencias. La antigua clase `MHMRentiva\Admin\Licensing\Mode` se eliminó de Lite en la versión 5.2.0 y, con ella, todos los límites de capacidad: Lite **no tiene límites de vehículos, reservas, clientes, galería ni servicios adicionales**.

Las licencias solo existen en el complemento Rentiva Pro. Pro comprueba su propia condición de acceso, `MHMRentiva\Pro\Edition`, antes de registrar cada uno de sus módulos.

### 📊 Funciones de la licencia Pro
| Módulo Pro | Condición de acceso |
| :--- | :--- |
| Marketplace de vendedores, pagos al proveedor, informes de vendedores, ciclo de vida de los anuncios | `Edition::canUseVendorMarketplace()` (función de licencia `vendor_marketplace`) |
| Mensajes | `Edition::canUseMessages()` (`messaging`) |
| Informes | `Edition::canUseAdvancedReports()` (`advanced_reports`) |
| Exportación ampliada (CSV y JSON) | `Edition::canUseExport()` (`export`) |
| Herramientas de RGPD | `Edition::canUseGdpr()` (`gdpr_tools`) |
| Transferencia VIP | `Edition::isPro()` (cualquier licencia activa) |

El servidor de licencias también emite `full_rest_api` y `custom_emails`, pero ningún código los lee: no desbloquean nada.

---

## 🧬 Separación entre campos principales y atributos

La plataforma divide los datos en dos grupos principales según su prioridad operativa:

### 1. Campos principales
:::danger No se pueden eliminar ni desactivar
Estos campos son obligatorios para el motor de cálculo de precios, reservas y facturación del sistema.
:::
- **Precios:** precio base diario y tipos impositivos.
- **Disponibilidad:** control de stock basado en calendario.
- **Identidad del activo:** matrícula, número de serie o ID único.

### 2. Campos de atributos
:::tip Personalizables
Campos que pueden añadirse o eliminarse por completo según el modelo de negocio.
:::
- **Detalles del activo:** tipo de combustible, transmisión, número de plazas.
- **Parámetros adicionales:** campos gestionados mediante `MHMRentiva\Core\Attribute\AllowlistRegistry` y que pueden usarse como parámetros en los shortcodes.

---

## 🧩 Flexibilidad de módulos (Clean Slate)

El plugin adopta una política de **«Clean Slate»** (borrón y cuenta nueva). Esto te permite simplificar la interfaz desactivando las funciones que no necesitas:

- **Ajustes del plugin:** los campos que no uses pueden ocultarse en las pestañas de `MHM Rentiva > Settings`.
- **Flujo de la interfaz:** cuando se oculta un campo, se elimina automáticamente tanto de los formularios de administración del backend como de la tabla de especificaciones del frontend.

## Resumen de la sección
- El sistema aplica los límites mediante la clase `Mode`.
- **Pro** elimina todos los límites técnicos y permite un escalado ilimitado.
- La arquitectura se adapta a modelos de alquiler más allá de los vehículos (cambiando los atributos técnicos).

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 09.11.2026 | 6.3.1 | Corrección: se eliminó la tabla de capacidad de Lite (3 vehículos, 50 reservas…); esos límites y la clase `Mode` desaparecieron de Lite en la versión 5.2.0. En su lugar se enumeran las condiciones de acceso `Edition` de Pro y sus funciones de licencia. |
| 23.04.2026 | 4.27.2 | Se añadió la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Página actualizada con los límites de Lite/Pro y los detalles de la arquitectura actual. |
