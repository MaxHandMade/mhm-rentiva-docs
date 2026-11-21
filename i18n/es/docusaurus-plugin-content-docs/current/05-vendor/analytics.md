---
id: analytics
title: "Analíticas del vendedor"
sidebar_label: "Analíticas"
sidebar_position: 20
---

![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Función Pro
Esta página documenta una funcionalidad del complemento **MHM Rentiva Pro**. No forma parte de la edición gratuita
Lite de WordPress.org y requiere tener Pro instalado junto a Lite, además de una licencia válida.
Consulta [Ediciones — Lite frente a Pro](/docs/) para ver la división completa, o consigue Pro en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Propósito
MHM Rentiva ofrece a los vendedores Business Intelligence en tiempo real. Este documento explica los cálculos de las tarjetas de KPI, el análisis de tendencias y las estrategias de agregación de datos a nivel de base de datos.
:::

# 📊 Sistema de analíticas e informes

La **única fuente de verdad** para las analíticas financieras es la tabla Ledger. Las analíticas operativas se calculan dinámicamente en función de los estados de las reservas.

---

## 🏗️ 1. Estrategia de agregación de datos (`AnalyticsService`)

`AnalyticsService` opera sobre la tabla Ledger usando los filtros `status = 'cleared'` y `vendor_id`.

### Métricas financieras
- **Ingresos netos:** la suma de las entradas `commission_credit` (positivas) y `commission_refund` (negativas) dentro de un rango de fechas determinado.
- **Valor medio de reserva (ABV):** los ingresos netos totales divididos entre el número de valores `booking_id` distintos.

### Métricas operativas
- **Tasa de ocupación:** `(Rented Days / Total Available Days) * 100`.
- **Tasa de cancelación:** `(Cancelled Bookings / Total Requests) * 100`.

---

## 📉 2. Análisis de crecimiento y tendencias

El sistema calcula las tasas de crecimiento comparando el rango de fechas seleccionado con el periodo equivalente anterior.

### Modelo de cálculo
`Growth = ((Current Period - Previous Period) / Previous Period) * 100`

**Detalles técnicos:**
- **Ventana espejo:** si se seleccionan los últimos 7 días, se usan como referencia los 7 días anteriores (sin solapamiento).
- **Protección contra la división por cero:** si los ingresos del periodo anterior son 0, la tasa de crecimiento devuelve `NULL` en lugar de `0%`. En la interfaz se muestra como «—».

---

## 📈 3. Estructura de datos de los sparklines

El método `get_sparkline_data()` se usa para los gráficos de tendencia del escritorio.

- **Relleno de huecos:** las fechas sin actividad que la base de datos devuelve vacías se rellenan automáticamente con `0.0` en el lado de PHP.
- **Normalización UTC:** todas las agrupaciones por fecha usan la función `DATE()` de MySQL sobre UTC para evitar desfases de zona horaria.

---

## ⚡ 4. Rendimiento y caché (`MetricCacheManager`)

Los datos de analíticas implican consultas SQL costosas, por lo que se utiliza un mecanismo de caché de varias capas.

| Capa | Duración | Invalidación |
|---|---|---|
| **Transients** | 15 minutos | Nueva reserva, confirmación de pago o cambio de estado. |
| **Object Cache** | Por sesión | Sin nuevas consultas al cambiar de pestaña en el escritorio. |
| **Bypass** | — | La caché se desactiva en las búsquedas con rangos de fechas personalizados. |

---

## ⚙️ 5. Referencia técnica de la API

### Cálculo de ingresos
```php
// AnalyticsService::get_revenue_period($vendor_id, $from_ts, $to_ts)
// PostgreSQL/MySQL compatible UTC normalization.
```

### Rendimiento por vehículo
```php
// AnalyticsService::get_vehicle_performance($vehicle_id, $from_ts, $to_ts)
// Returns occupancy and revenue report for a specific vehicle.
```

## Resumen de la sección
- Solo las entradas del ledger `cleared` se usan como base para los informes financieros.
- Las tasas de crecimiento se calculan mediante un algoritmo de desplazamiento temporal lineal.
- `MetricCacheManager` minimiza la carga de la base de datos.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se han documentado las analíticas basadas en el ledger y las fórmulas de crecimiento. |
