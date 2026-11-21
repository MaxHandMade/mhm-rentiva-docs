---
id: financial-operations-runbook
title: "Manual de operaciones financieras (L1/L2)"
sidebar_label: "Manual de operaciones"
sidebar_position: 1
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
Esta guía define las rutinas diarias y los pasos de intervención críticos para el equipo de operaciones financieras de Rentiva y los administradores del sistema.
:::

# 📖 Manual de operaciones financieras

Las operaciones financieras consisten en pasos secuenciales diseñados para mantener el flujo de caja y la integridad de los datos del sistema.

---

## 🕒 Conciliación diaria

Las siguientes comprobaciones deben realizarse al inicio de cada jornada laboral:
1. **Pagos al proveedor pendientes:** revisa la antigüedad de las solicitudes pendientes mediante `Payout List Table`. Marca para revisión cualquier solicitud con más de 48 horas de antigüedad.
2. **Saldo del libro mayor:** verifica que el saldo total de débitos/créditos de las tablas del libro mayor (Ledger) coincide con el `Net Balance` que informa el sistema.
3. **Webhooks fallidos:** examina la tabla `WebhookLog` para identificar las notificaciones de pago fallidas.

---

## ⚖️ Operaciones de gobernanza

Procedimientos de intervención mediante `GovernanceService` para situaciones críticas:

### ❄️ Congelación de vendedor
Cuando se detecte actividad sospechosa:
- Introduce el ID del vendedor en el panel `Governance`.
- Activa el indicador **Congelar**.
- Esta acción suspende todos los pagos al proveedor pendientes del vendedor y le impide crear nuevas solicitudes.

### 🔓 Ciclo de aprobación de pagos al proveedor (Maker-Checker)
- **Maker:** el responsable de operaciones revisa y registra la solicitud.
- **Checker:** el responsable financiero realiza la acción `Bulk Approve` tras confirmar que el responsable de operaciones no ha aprobado un pago al proveedor a su propia cuenta.

---

## 📝 Verificación del registro de auditoría

En caso de cualquier disputa financiera:
1. Localiza el ID de la transacción en la tabla `mhmrentiva_ledger`.
2. Verifica que coincide con el registro de auditoría creado por `GovernanceService::log_decision()`.
3. Confirma la integridad forense comprobando la coherencia de la marca de tiempo y la dirección IP.

---

## 🔄 Gestión de reversiones

Para pagos erróneos o duplicados:
- Usa el método `Ledger::record_reversal()` para añadir una nueva entrada de "Reversión".
- **Nunca** borres ni actualices un registro existente del libro mayor.

## Resumen de la sección
- El permiso "Borrar" no existe en ningún nivel de los pasos operativos.
- Toda intervención debe dejar un registro de auditoría.
- La conciliación diaria es obligatoria para la salud financiera del sistema.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Página actualizada con los pasos operativos de conciliación y gobernanza. |
