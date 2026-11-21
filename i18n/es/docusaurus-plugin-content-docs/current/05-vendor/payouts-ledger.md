---
id: payouts-ledger
title: "Liquidaciones y libro mayor"
sidebar_label: "Liquidaciones y libro mayor"
sidebar_position: 10
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Función Pro
Esta página documenta una funcionalidad del complemento **MHM Rentiva Pro**. No forma parte de la edición gratuita
Lite de WordPress.org y requiere tener Pro instalado junto a Lite, además de una licencia válida.
Consulta [Ediciones — Lite frente a Pro](/docs/) para ver la división completa, o consigue Pro en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Propósito
MHM Rentiva utiliza un motor financiero llamado «Model B», inmutable y siempre auditable. Este documento explica cómo se calculan las ganancias de los vendedores y cómo se gestionan de forma atómica los procesos de pago al proveedor.
:::

# 💳 Motor financiero y ciclo de liquidaciones

El sistema calcula los saldos de los vendedores mediante un libro mayor de solo anexado (append-only) en lugar de un campo de saldo dinámico.

---

## 🏗️ 1. Estructura del libro mayor Model B

El libro mayor es la única fuente de verdad para todos los datos financieros del sistema.

### Principio de inmutabilidad
- **Prohibido actualizar/eliminar:** ninguna fila del libro mayor puede actualizarse ni eliminarse.
- **Asientos de corrección:** una transacción errónea solo puede corregirse mediante un asiento de reversión.
- **Aislamiento SaaS:** cada asiento está asociado a un `tenant_id`.

### Tipos de asiento
| Tipo | Dirección | Descripción |
|---|---|---|
| `commission_credit` | `+` | Ganancias de una reserva completada. |
| `payout_debit` | `−` | Reducción del saldo por una solicitud de liquidación aprobada. |
| `refund` | `−` | Reembolso de una reserva cancelada. |

### A quién se abona y cómo funcionan los reembolsos

- **El abono es para el propietario del vehículo.** El abono de la comisión se registra a favor del vendedor propietario del vehículo alquilado, independientemente de quién haya creado la reserva (un cliente al finalizar la compra o un administrador que la introduce manualmente). Los importes **Pendiente (en compensación)** y **Reservas, últimos 30 días** del panel del vendedor cuentan las reservas de los vehículos de ese vendedor.
- **Tu propia flota no genera ninguna fila.** Un vehículo que pertenece al sitio y no a un vendedor no genera ninguna fila en el libro mayor.
- **Un reembolso revierte el abono al que corresponde.** El reembolso se descuenta al vendedor cuyo abono revierte, con la tasa de comisión de ese abono, aunque el vehículo haya cambiado de propietario después.
- **Sin abono no hay cargo.** Un reembolso de un pedido que nunca se pagó (por ejemplo, una transferencia bancaria reembolsada mientras aún estaba en proceso) no registra nada y no se carga nada al vendedor. Si el pedido se paga más tarde, el abono y el reembolso se registran juntos, con la tasa de comisión del abono; un pedido por transferencia bancaria reembolsado íntegramente antes de pagarse no deja nada en la cuenta del vendedor.
- **La insignia del perfil del vendedor** se actualiza cuando se completa un alquiler.

:::info Cambiado en Pro 6.5.0
Antes de la 6.5.0, la comisión podía abonarse al cliente que hizo la reserva, y un reembolso sobre un vehículo propio del sitio podía cargarse al cliente. Las filas registradas antes de la actualización no se corrigen.
:::

---

## ⚛️ 2. Proceso atómico de liquidación (`AtomicPayoutService`)

Las aprobaciones de liquidaciones se realizan dentro de una **transacción** a nivel de base de datos. Esto garantiza que todo el proceso se revierta si falla algún paso.

### Pasos del proceso:
1. **Comprobación previa:** verificación del saldo y del estado (fuera de la transacción).
2. **START TRANSACTION:** se inicia el bloqueo de la base de datos.
3. **Protección de concurrencia:** `post_status` se vuelve a leer de la base de datos (prevención de condiciones de carrera).
4. **Escritura en el libro mayor:** se crea el asiento `payout_pending_debit`.
5. **Actualización del CPT:** la entrada de liquidación se establece con el estado `publish`.
6. **COMMIT:** si todo va bien, se confirman todas las operaciones.

---

## 🛡️ 3. Capas de prevención del doble gasto

Existen cuatro capas de protección frente al riesgo de doble gasto:

| Capa | Mecanismo | Nivel |
|---|---|---|
| **L1: Aplicación** | Comprobación de `vendor_has_pending_payout()`. | PHP / AJAX |
| **L2: Saldo** | Validación de `Ledger::get_balance() >= amount`. | Lógica de dominio |
| **L3: Transacción** | Bloqueo de fila de InnoDB y protección del estado ante concurrencia. | Base de datos |
| **L4: Idempotencia** | UUID único en formato `payout_{id}`. | Clave única de la BD |

---

## ⚙️ 4. Referencia técnica de la API

### Consulta de saldo
```php
// Returns the sum of entries with 'cleared' and 'reserved' statuses only.
$balance = Ledger::get_balance($vendor_id);
```

### Crear una solicitud de liquidación
```php
// PayoutService::request_payout()
// 1. Minimum limit (mhmrentiva_min_payout_amount) is checked.
// 2. Presence of a pending request is verified.
// 3. mhmrentiva_payout post is created.
```

---

## 📧 5. Notificaciones y hooks

| Hook | Disparador | Destinatario |
|---|---|---|
| `mhmrentiva_payout_approved` | Cuando la liquidación se aprueba de forma atómica. | Vendedor |
| `mhmrentiva_payout_rejected` | Cuando el administrador rechaza la liquidación. | Vendedor |

## Resumen de la sección
- La tabla del libro mayor utiliza una arquitectura `APPEND-ONLY`.
- `AtomicPayoutService` garantiza la coherencia de la base de datos mediante transacciones.
- La prevención del doble gasto (idempotencia) se aplica a nivel de UUID.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 18.11.2026 | Pro 6.5.0 | Documentado: la comisión se abona al propietario del vehículo, los reembolsos se aplican contra el abono original y no se registra ninguna fila para la flota propia del sitio. |
| 23.04.2026 | 4.27.2 | Se añadió la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se añadieron detalles del motor Model B, las transacciones atómicas y el aislamiento SaaS. |
