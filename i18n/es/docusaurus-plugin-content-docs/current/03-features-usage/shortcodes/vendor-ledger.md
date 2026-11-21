---
title: "Libro de cuentas del vendedor"
description: "Guía de uso y referencia técnica del shortcode del libro de cuentas financiero del vendedor: historial de transacciones paginado con filtros."
sidebar_position: 29
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Función Pro
Esta página documenta una funcionalidad del complemento **MHM Rentiva Pro**. No forma parte de la edición gratuita
Lite de WordPress.org y requiere tener Pro instalado junto a Lite, además de una licencia válida.
Consulta [Ediciones: Lite frente a Pro](/docs/) para ver la división completa, o consigue Pro en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Propósito
Esta página documenta el shortcode `[rentiva_vendor_ledger]`: el libro de cuentas financiero del lado del vendedor, que enumera todas las transacciones (abonos de comisión por reservas, reembolsos, pagos al proveedor) de la cuenta del vendedor actual. Se usa en el panel del vendedor (`/panel/`); no está pensado para colocarse en páginas públicas.
:::

# 📊 Libro de cuentas del vendedor (transacciones financieras)

## Contenido
- Qué es este shortcode
- Autenticación y control por rol
- Tipos de transacción mostrados
- Uso en el front-end (filtros por URL)
- Paginación
- Estados vacíos
- Dónde encaja en el panel del vendedor

## Qué es este shortcode

`[rentiva_vendor_ledger]` muestra el historial de transacciones financieras del vendedor (abonos obtenidos por cada reserva, reembolsos revertidos y pagos al proveedor desembolsados) a partir del servicio central `Ledger`. Cada fila muestra el tipo de transacción, la reserva relacionada (cuando corresponde), el importe (formateado según los ajustes de moneda de WooCommerce) y la fecha y hora.

Este es el **registro transparente** que respalda la cifra de ganancias del vendedor en el escritorio. Cuando un cliente reserva y paga uno de los vehículos del vendedor, aquí aparece automáticamente una entrada de abono; el abono siempre va al vendedor propietario del vehículo. Cuando el administrador procesa un pago al proveedor, aquí aparece el cargo correspondiente. Cuando se reembolsa una reserva, se registra una entrada inversa contra el vendedor cuyo abono revierte, de modo que el libro de cuentas nunca se descuadra. El reembolso de un pedido que nunca se pagó no registra nada hasta que el pedido se paga (entonces se registran juntos el abono y el reembolso), y los vehículos propios del sitio no registran ninguna fila.

## Autenticación y control por rol

El shortcode realiza dos comprobaciones:

1. `is_user_logged_in()`: los visitantes anónimos reciben una cadena vacía.
2. El usuario actual debe tener el rol `rentiva_vendor`: los usuarios que no son vendedores ven el aviso «Acceso denegado. Solo los vendedores pueden ver el libro de cuentas.».

El control de Pro se **hereda de la página**: la ubicación habitual es `/panel/`, que ya requiere la función Pro `vendor_marketplace`.

## Tipos de transacción mostrados

| Tipo | Origen | Sentido |
| :--- | :--- | :--- |
| Comisión por reserva | Se registra cuando el pedido de WooCommerce de la reserva se paga o se completa, a favor del propietario del vehículo alquilado | Abono (+) |
| Reembolso | Se registra cuando el pedido se reembolsa, contra el abono que revierte | Cargo (−) |
| Pago al proveedor | El envío de pagos al proveedor del administrador registra mediante `Ledger::debit()` | Cargo (−) |
| Ajuste manual | Entradas manuales en el libro de cuentas desde la administración (poco frecuentes) | Cualquiera |

El saldo acumulado que se muestra en el escritorio del vendedor es `SUM(credits) - SUM(debits)` sobre el libro de cuentas del vendedor.

## Uso en el front-end

```shortcode
[rentiva_vendor_ledger]
```

No tiene atributos de shortcode: en su lugar, el shortcode lee los filtros de la cadena de consulta de la URL, lo que permite compartir, guardar en marcadores o enlazar desde un control de paginación del vendedor cualquier combinación de filtros:

| Parámetro de consulta | Propósito |
| :--- | :--- |
| `paged` | Número de página (en el servidor, por defecto 1) |
| Otros argumentos de filtro | Tipo, rango de fechas, ID de reserva: se gestionan dentro de `Ledger::query()` |

El shortcode valida cada parámetro de consulta mediante funciones auxiliares específicas `get_query_int()` / `get_query_string()`; el docblock indica «complex shortcode wrappers limiting inputs securely via GET processing».

## Paginación

En el servidor. El tamaño de página predeterminado es de **15 entradas** por página; `?paged=N` avanza. El control de paginación situado al final de la cuadrícula conserva los filtros de URL activos, de modo que al pasar a la página 2 se mantiene el rango de fechas o el filtro de tipo que el usuario había aplicado en la página 1.

## Estados vacíos

| Estado | Se muestra |
| :--- | :--- |
| Vendedor sin transacciones todavía | Marcador «Aún no hay transacciones» (p. ej., un vendedor recién creado) |
| El filtro excluye todas las filas | «Ninguna transacción coincide con estos filtros» con un enlace «Quitar filtros» |
| Usuario que no es vendedor | Aviso «Acceso denegado. Solo los vendedores pueden ver el libro de cuentas.» |
| Usuario sin sesión iniciada | Cadena vacía (sin mensaje) |

## Dónde encaja en el panel del vendedor

El panel del vendedor en `/panel/` tiene tres secciones; este shortcode se encarga de la parte financiera:

| Sección del panel | Shortcode |
| :--- | :--- |
| Anuncios | `[rentiva_vehicle_submit]` (añadir/editar) + lista nativa de vehículos del vendedor |
| Solicitudes de reserva | `[rentiva_vendor_bookings]` ([referencia](./vendor-bookings)) |
| Libro de cuentas y pagos al proveedor | `[rentiva_vendor_ledger]` ← **esta página** |

El equivalente del lado del cliente para el historial de transacciones es `[rentiva_payment_history]` ([referencia](./payment-history)), que muestra los pagos del cliente en lugar de las ganancias del vendedor.

## Arquitectura relacionada

- **Servicio `Ledger`** (`MHMRentiva\Core\Financial\Ledger`): la única fuente de verdad para las transacciones del vendedor. Todas las escrituras en el libro de cuentas pasan por esta clase, de modo que el saldo acumulado nunca se desvía.
- **`CommissionBridge`**: escucha los eventos de pago, finalización y reembolso de WooCommerce y registra el abono y las entradas de reembolso en sentido inverso, de modo que el registro de auditoría se mantiene bidireccional.

## Ver también

- [Shortcode de reservas del vendedor](./vendor-bookings): bandeja de entrada de reservas del lado del vendedor
- [Shortcode del historial de pagos del cliente](./payment-history): el equivalente del lado del cliente
- [Incorporación de vendedores](/docs/vendor/onboarding): guía operativa
- [Documentación del libro de pagos al proveedor](/docs/vendor/payouts-ledger): flujo de pagos al proveedor desde la administración + modelo contable


## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 18.11.2026 | Pro 6.5.0 | El abono va al propietario del vehículo alquilado; los reembolsos siguen al abono original; orígenes corregidos. |