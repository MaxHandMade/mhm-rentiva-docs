---
id: payout-list-table
title: "Tabla de lista de pagos al proveedor (interfaz de administración)"
sidebar_label: "Tabla de pagos al proveedor"
sidebar_position: 6
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Función Pro
Esta página documenta una funcionalidad del complemento **MHM Rentiva Pro**. No forma parte de la edición gratuita
Lite disponible en WordPress.org y requiere tener Pro instalado junto a Lite, además de una licencia válida.
Consulta [Ediciones — Lite vs Pro](/docs/) para ver la división completa, o consigue Pro en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Propósito
Este documento describe las capacidades técnicas y el flujo operativo de la clase `PayoutListTable`, que gestiona la pantalla «Solicitudes de pago» del panel de administración.
:::

# 🧾 Tabla de lista de pagos al proveedor

`PayoutListTable` es el componente principal de interfaz de administración de la capa de gobernanza financiera de Rentiva. Construido sobre la clase `WP_List_Table`, presenta datos financieros complejos en un formato legible y sobre el que se puede actuar.

---

## 🏗️ Responsabilidades principales

1.  **Vista analítica:** visualización en tiempo real de los saldos de los vendedores y de los importes de pago al proveedor solicitados.
2.  **Filtrado seguro:** solo se listan las solicitudes de pago al proveedor en estados válidos.
3.  **Gestión de transacciones:** aprobación masiva e integración de exportación a CSV.

---

## 📊 Estructura de columnas y fuentes de datos

Cada columna de la tabla se alimenta de distintas capas de la base de datos:

| Columna | Fuente de datos | Descripción |
| :--- | :--- | :--- |
| **Vendedor** | `WP_User` | Nombre visible e ID del vendedor que envió la solicitud. |
| **Importe** | `post_meta` | Importe del pago al proveedor solicitado (formateado con `wc_price`). |
| **Saldo** | `Ledger` | Saldo disponible actual del vendedor en la tabla Ledger. |
| **Estado** | `post_status` | Estado de la solicitud (Pendiente, Aprobada, Rechazada). |
| **Solicitado**| `post_date` | Fecha en que se creó la solicitud (con normalización a GMT). |

---

## ⚡ Acciones en lote

### Aprobación en lote
Los administradores pueden seleccionar varias solicitudes y activar el mecanismo central de aprobación:
- **Método:** `process_bulk_approve()`
- **Cómo funciona:** llama a `GovernanceService::process_approval` para cada ID seleccionado.
- **Idempotencia:** solo se procesan las solicitudes `pending`; las que ya están aprobadas se omiten (protección contra doble cargo).

---

## 🔄 Estados y códigos de color

La tabla muestra los estados de las transacciones con colores dinámicos:
- 🟡 **Pendiente:** en espera de aprobación.
- 🔵 **Aprobada:** aprobada (orden de pago emitida).
- 🟢 **Confirmada:** finalizada (completada en el lado del banco o del procesador).
- 🔴 **Rechazada / Fallida:** rechazada o se ha producido un error.

## 🛡️ Seguridad y autorización

- **Capacidad:** se requiere la capacidad `mhmrentiva_approve_payout` para realizar acciones en lote.
- **Nonce:** todas las acciones en lote pasan por la seguridad estándar de WP.
- **Protección de idempotencia:** dentro de `PayoutListTable` se realiza una comprobación `post_status` antes de cada operación para evitar el procesamiento duplicado a nivel de código.

## Resumen de la sección
- `PayoutListTable` es una herramienta interna de administración que muestra el libro contable financiero.
- Los datos se obtienen de forma híbrida de `Ledger` y `post_meta`.
- La aprobación en lote pasa por el filtro **GovernanceService**.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se ha actualizado la clase PayoutListTable con la aprobación en lote y la integración con el libro contable. |
