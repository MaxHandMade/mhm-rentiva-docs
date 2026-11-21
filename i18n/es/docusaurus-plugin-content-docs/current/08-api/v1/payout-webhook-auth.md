---
id: payout-webhook-auth
title: "Autenticación de webhooks de pago"
sidebar_label: "Autenticación webhook de pagos"
sidebar_position: 80
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
`PayoutWebhookAuth` es una capa de seguridad especializada que se utiliza para verificar la autenticidad de las notificaciones (webhooks) procedentes de servicios de pago externos.
:::

# 🔒 Autenticación de webhooks de pago

MHM Rentiva somete cada notificación de pago recibida del exterior a un estricto proceso de verificación para mantener la integridad de los datos financieros.

---

## 🛡️ 1. Modelo de autenticación

Este componente funciona como una extensión de la clase `AuthHelper` y utiliza únicamente las claves específicas definidas para los proveedores de servicios de pago (PSP).

- **Verificación del origen:** comprueba que las solicitudes procedan únicamente de direcciones IP conocidas o con una identidad de aplicación válida.
- **Clave secreta:** se define un `Webhook Secret` único para cada integración con un PSP.

---

## ✍️ 2. Verificación de la firma

El método de seguridad más utilizado es `HMAC-SHA256`. El proceso consta de los siguientes pasos:

1. **Extracción de la cabecera:** se obtiene el valor `X-Rentiva-Signature` de la cabecera de la solicitud.
2. **Generación del hash:** se calcula un nuevo hash en el servidor usando el cuerpo sin procesar de la solicitud entrante y el `Webhook Secret` del sistema.
3. **Comparación:** el hash calculado se compara con la firma de la cabecera mediante `hash_equals()` (seguro frente a ataques de temporización).

---

## ⏳ 3. Protección contra repetición y límite de frecuencia

### Comprobación de la marca de tiempo
La marca de tiempo de la solicitud se compara con la hora del servidor. Si la diferencia supera los 5 minutos (300 s), la solicitud se trata como un "ataque de repetición" (Replay Attack) y se rechaza.

### Limitador de frecuencia de webhooks
- Si llega más de una notificación por segundo para el mismo ID de transacción, el sistema procesa solo la primera.
- La clase `WebhookRateLimiter` gestiona las llamadas duplicadas (reintentos) procedentes del proveedor de pagos.

---

## ⚙️ 4. Estrategia de operación idempotente

Si el proveedor de servicios de pago vuelve a enviar la misma notificación de éxito (`confirmed`):
- El sistema comprueba el estado de esa operación en la base de datos.
- Si la operación ya está "Completado", no se realiza ninguna operación en el libro contable (Ledger), pero se devuelve `200 OK` al proveedor de servicios para indicar que el proceso ha finalizado.

## Resumen de la sección
- `PayoutWebhookAuth` es la capa de seguridad más crítica para evitar la manipulación financiera.
- El uso de `hash_equals` protege frente a ataques de temporización.
- La protección contra repetición impide que se vuelvan a ejecutar solicitudes antiguas o interceptadas.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se han añadido detalles sobre HMAC-SHA256, hash_equals y la protección contra ataques de repetición (Replay Attack). |
