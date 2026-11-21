---
id: financial-rest-callbacks
title: "API de callback de pagos (callback de liquidaciones)"
sidebar_label: "API de callback de liquidaciones"
sidebar_position: 50
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
Este endpoint se utiliza para recibir de forma segura los resultados de las liquidaciones procedentes de procesadores de pago externos (bancos, entidades de pago) y actualizar en consecuencia los registros del libro mayor (Ledger).
:::

# 🧾 API de callback de pagos

La API de callback de liquidaciones es el último paso del ciclo financiero. Actualiza el estado financiero del sistema en función de las señales de «Correcto» o «Fallo» recibidas desde el exterior.

---

## 📍 Detalles del endpoint
- **URL:** `/wp-json/mhm-rentiva/v1/payouts/{id}/callback`
- **Método:** `POST`
- **Verificación:** HMAC SHA-256 (obligatoria)

---

## 🛡️ 1. Seguridad y verificación (HMAC)

Para evitar notificaciones falsificadas, cada solicitud debe incluir las siguientes cabeceras:
- **`X-MHM-Timestamp`:** marca de tiempo UTC del momento en que se realizó la solicitud. Si la diferencia con la hora del servidor supera los 300 segundos, la solicitud se rechaza.
- **`X-MHM-Signature`:** el valor hash `HMAC SHA-256` generado a partir del contenido de la solicitud y la clave secreta.

---

## 📥 Cuerpo de la solicitud (payload)

```json
{
  "status": "confirmed",
  "external_reference": "TRX_998877",
  "reason": "" 
}
```

- **`status`:** `confirmed` (Correcto) o `failed` (Fallo).
- **`external_reference`:** el número de referencia de la transacción de la entidad de pago.
- **`reason`:** el motivo del rechazo en caso de fallo.

---

## ⚙️ 2. Reglas de negocio y actualización del Ledger

El sistema realiza operaciones atómicas en el Ledger en función del estado recibido:

| Estado | Operación | Descripción |
|---|---|---|
| **confirmada** | Actualización de estado | El registro de liquidación se marca como `completed`. No se añade ninguna fila nueva al Ledger (el saldo ya se había descontado). |
| **fallida** | `payout_reversal` | Como el pago ha fallado, el saldo descontado previamente se reembolsa al vendedor. Se añade un asiento inverso al Ledger. |
| **Solicitud duplicada** | Idempotencia | Si el `payout_id` en cuestión ya está en un estado final, no se realiza ninguna acción y se devuelve `200 OK`. |

---

## 🚦 3. Gestión de errores
- **401 Unauthorized:** la verificación de la firma ha fallado.
- **404 Not Found:** ID de liquidación no válido.
- **429 Too Many Requests:** se ha superado el límite de solicitudes (20 solicitudes/minuto).

## Resumen de la sección
- La API de callback utiliza la verificación HMAC para garantizar la integridad de los datos financieros.
- Un mecanismo automático de reembolso del saldo (`reversal`) se ejecuta con el estado `failed`.
- Todas las operaciones se registran como pista de auditoría mediante `AdvancedLogger`.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se han añadido los detalles de la verificación HMAC y la lógica de reversión. |
