---
id: availability-rest
title: "Comprobación de disponibilidad (REST de disponibilidad)"
sidebar_label: "REST de disponibilidad"
sidebar_position: 40
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
Este endpoint comprueba si un vehículo concreto está disponible para alquiler dentro de un intervalo de fechas y horas seleccionado, y calcula el precio actual.
:::

# 🚗 Endpoint de comprobación de disponibilidad

La comprobación de disponibilidad es el primer paso, y el más crítico, del proceso de reserva. Devuelve resultados en tiempo real usando las clases `Util::has_overlap()` y `PricingEngine`.

---

## 📍 Detalles del endpoint
- **URL:** `/wp-json/mhm-rentiva/v1/availability`
- **Método:** `POST`
- **Permiso:** Público (si no es una interfaz de administrador/vendedor)

---

## 📥 Parámetros de la petición (cuerpo JSON)

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `vehicle_id` | `int` | Sí | El ID del vehículo que se va a comprobar. |
| `pickup_date` | `string` | Sí | Fecha de recogida (`YYYY-MM-DD`). |
| `pickup_time` | `string` | Sí | Hora de recogida (`HH:MM`). |
| `return_date` | `string` | Sí | Fecha de devolución (`YYYY-MM-DD`). |
| `return_time` | `string` | Sí | Hora de devolución (`HH:MM`). |
| `location_id` | `int` | No | Lugar de entrega (puede afectar al precio). |

---

## 📤 Ejemplo de respuesta correcta

```json
{
  "success": true,
  "data": {
    "available": true,
    "pricing": {
      "base_price": 1200.00,
      "service_fee": 150.00,
      "total_price": 1350.00,
      "currency": "TRY"
    },
    "duration": {
      "days": 3,
      "hours": 0
    }
  }
}
```

---

## 🛡️ Seguridad y validación
1. **Orden de fechas:** La fecha de devolución no puede ser anterior a la fecha de recogida.
2. **Comprobación de hora:** La hora de recogida debe cumplir las reglas de duración mínima de reserva.
3. **`RateLimiter`:** Las consultas múltiples desde la misma IP en menos de un segundo se limitan automáticamente.
4. **Saneamiento:** Todos los datos de entrada se sanean mediante `Sanitizer::absint()` y `sanitize_text_field()`.

---

## ❌ Estados de error

| Código | Mensaje | Motivo |
|---|---|---|
| **400** | `INVALID_DATE_RANGE` | Las fechas de recogida/devolución no son lógicas. |
| **404** | `VEHICLE_NOT_FOUND` | No se ha encontrado ningún vehículo con el ID indicado. |
| **409** | `VEHICLE_NOT_AVAILABLE` | El vehículo ya está reservado para las fechas indicadas. |
| **429** | `TOO_MANY_REQUESTS` | Se ha superado el límite de peticiones. |

## Resumen de la sección
- El endpoint `availability` proporciona información tanto de disponibilidad como de precios.
- `Util::has_overlap()` detecta conflictos en cuestión de segundos.
- Se usa para actualizaciones reactivas en los calendarios y formularios de reserva del front-end.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se han detallado el esquema JSON de petición/respuesta y los códigos de error. |
