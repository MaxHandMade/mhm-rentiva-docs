---
id: financial-troubleshooting
title: "Solución de problemas financieros y matriz de errores"
sidebar_label: "Problemas financieros"
sidebar_position: 2
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
Esta página es una guía para diagnosticar errores técnicos en los módulos financieros y resolverlos rápidamente.
:::

# 🔍 Solución de problemas financieros

Los errores financieros suelen deberse a interrupciones de red, permisos que faltan o incoherencias en los datos.

---

## 🛠️ Matriz de códigos de error y soluciones

| Código de error | Significado | Primera respuesta |
|---|---|---|
| `401 Unauthorized` | Error de HMAC / firma | Comprueba que la clave secreta de la API coincide y la hora del servidor (NTP). |
| `403 Forbidden` | Bloqueo de gobernanza | Comprueba mediante `GovernanceService` si el vendedor está en estado `Freeze`. |
| `409 Invalid State` | Conflicto de estado | Verifica que la devolución de llamada del webhook solo llega para pagos al proveedor en estado `Processing` o `Approved`. |
| `429 Too Many Requests` | Límite de peticiones superado | Borra los registros de `WebhookRateLimiter` o amplía los límites. |
| `Atomic Failure` | Reversión de la base de datos | Es posible que la conexión se haya perdido durante la transacción. Confirma que no hay entradas duplicadas en `Ledger`. |

---

## 🚩 Escenarios habituales y diagnóstico

### 1. El saldo esperado es incorrecto (descuadre de saldo)
Si el panel del vendedor no coincide con las tablas del libro mayor (Ledger):
- **Diagnóstico:** Busca en la tabla `mhmrentiva_ledger` con un filtro `source_type`.
- **Solución:** Ejecuta `Ledger::calculate_net_balance()` de forma asíncrona para forzar un recálculo en la base de datos.

### 2. El pago al proveedor se queda en "Aprobado" (sin devolución de llamada)
Si un pago aprobado no pasa al estado "Confirmado":
- **Diagnóstico:** Revisa los registros de `WebhookLog` para encontrar el error de notificación del banco.
- **Solución:** Vuelve a ejecutar manualmente el webhook (mediante cURL con simulación de firma).

### 3. Entrada duplicada
Si se han creado dos registros en el libro mayor con el mismo ID de transacción:
- **Diagnóstico:** Ejecuta el script `ForensicHardeningTest` para ese usuario.
- **Solución:** Neutraliza el segundo registro con `record_reversal()`. **Nunca lo borres manualmente.**

---

## 📄 Procedimiento de análisis de registros

Supervisa los siguientes canales de registro para localizar el origen de un problema:
- **Registro de depuración de WP:** Para errores de PHP y avisos de `Util`.
- **Registros de Stitch / API:** Para validar el contenido de la carga útil del webhook.
- **Registros de auditoría:** Para las denegaciones de permisos registradas por `GovernanceService`.

## Resumen de la sección
- La mayoría de los errores se deben a problemas de **HMAC** o **NTP** (sincronización horaria).
- En caso de incoherencias en el libro mayor, la referencia son siempre las filas de la base de datos (WPDB).
- Los registros son pruebas forenses del problema y no deben borrarse.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se han añadido la matriz de errores y los problemas de saldo asíncrono. |
