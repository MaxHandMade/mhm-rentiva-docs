---
id: financial-ledger-model
title: "Modelo de datos del libro mayor (esquema y lógica)"
sidebar_label: "Modelo del libro mayor"
sidebar_position: 11
---

![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Función Pro
Esta página documenta una funcionalidad del complemento **MHM Rentiva Pro**. No forma parte de la edición gratuita
Lite de WordPress.org y requiere tener Pro instalado junto con Lite, además de una licencia válida.
Consulta [Ediciones: Lite frente a Pro](/docs/) para ver la división completa, o consigue Pro en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Propósito
Esta página detalla el esquema de datos del libro mayor inmutable, las reglas de almacenamiento y la lógica financiera que constituyen la base del sistema financiero de Rentiva.
:::

# 🧾 Modelo de datos del libro mayor

La tabla `wp_mhmrentiva_ledger` es el almacén de registros definitivo para todos los eventos financieros. Esta tabla es de **solo anexión** (Append-Only); las filas existentes nunca se actualizan ni se eliminan.

---

## 🏗️ Esquema SQL (esquema técnico)

A continuación se muestra la estructura de la tabla principal que utiliza el sistema. Se usa `DECIMAL(12,2)` para realizar cálculos financieros precisos.

```sql
CREATE TABLE wp_mhmrentiva_ledger (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    tenant_id BIGINT UNSIGNED NOT NULL DEFAULT 1,
    transaction_uuid CHAR(36) NOT NULL, -- Idempotency Key
    vendor_id BIGINT UNSIGNED NOT NULL,
    booking_id BIGINT UNSIGNED NULL,
    order_id BIGINT UNSIGNED NULL,
    type VARCHAR(30) NOT NULL,          -- Transaction Type
    amount DECIMAL(12,2) NOT NULL,      -- Net Impact Amount
    gross_amount DECIMAL(12,2) NULL,    -- WC Order Total
    status VARCHAR(30) NOT NULL,        -- 'cleared', 'pending', 'void'
    policy_id BIGINT UNSIGNED NULL,     -- Associated Policy ID
    policy_version_hash CHAR(64) NULL,  -- Policy Hash for Auditing
    created_at DATETIME NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (transaction_uuid),      -- Duplicate Entry Prevention
    INDEX (vendor_id, status, created_at)
) ENGINE=InnoDB;
```

---

## 🔄 Tipos de transacción e impacto en el saldo

La columna `type` determina cómo afecta la transacción al saldo del vendedor:

| Tipo de transacción (`type`) | Impacto en el saldo | Descripción |
| :--- | :--- | :--- |
| `commission_credit` | **Positivo (+)** | Ganancias de una venta completada. |
| `commission_refund` | **Negativo (-)** | Asiento inverso de un pedido reembolsado. |
| `payout_debit` | **Negativo (-)** | Pago al proveedor realizado con éxito al vendedor (salida). |
| `payout_reversal` | **Positivo (+)** | Reversión de un pago al proveedor fallido o devuelto. |

---

## 🛡️ Reglas de dominio y seguridad

### 1. Inmutabilidad
Según los estándares de auditoría financiera, las operaciones `UPDATE` o `DELETE` sobre esta tabla están terminantemente prohibidas. Si se necesita una corrección, debe añadirse un nuevo asiento inverso (corrección/reembolso) que neutralice el error.

### 2. UUID de transacción (idempotencia)
Cada evento financiero (pago de un pedido, aprobación de un pago al proveedor) genera un UUID en su origen. La restricción `UNIQUE` a nivel de base de datos impide que el sistema procese el mismo evento dos veces a nivel de hardware.

### 3. Auditoría temporal
Todas las transacciones se registran con una marca de tiempo en UTC mediante la columna `created_at`. Los campos `policy_id` y `policy_version_hash` permiten verificar, incluso 2 años después, la política de comisiones vigente en el momento de la transacción.

---

## 📊 Lógica de cálculo del saldo

El saldo actual de un vendedor se obtiene siempre sumando todas las filas «liquidadas» (cleared):

```sql
SELECT SUM(amount) FROM wp_mhmrentiva_ledger 
WHERE vendor_id = %d AND status = 'cleared';
```

## Resumen de la sección
- El tipo de dato es siempre **DECIMAL** (Float está prohibido).
- La estructura de la tabla es de **solo anexión** (Append-Only) y está **aislada por inquilino** (Tenant-Isolated).
- Cada asiento tiene un **UUID** único.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Página actualizada con el esquema de LedgerMigration y la matriz de impacto en el saldo. |
