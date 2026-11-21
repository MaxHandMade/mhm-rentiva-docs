---
id: additional-services-usage
title: "Gestión de servicios adicionales"
sidebar_label: "Servicios adicionales"
sidebar_position: 9
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Los servicios adicionales son el área de gestión donde defines los productos que aportan un valor extra a las reservas de alquiler de vehículos (silla de bebé, GPS, seguro a todo riesgo, equipaje portuario, etc.). Accede a esta sección desde **MHM Rentiva > Servicios adicionales**.

Estos servicios se suman al total de la reserva y mejoran la eficiencia operativa.

---

## 🧺 Crear un nuevo servicio adicional

Al añadir un producto o servicio, se configuran los siguientes parámetros:

- **Nombre del servicio:** el nombre que ve el cliente en el carrito (p. ej., silla de bebé).
- **Descripción:** información detallada sobre el producto y sus condiciones de uso.
- **Precios:**
    - **Precio diario:** se cobra por cada día de alquiler (p. ej., 50 $ / día).
    - **Precio fijo:** se cobra una sola vez por reserva (p. ej., paquete de seguro de 500 $).
- **Servicio obligatorio:** si está marcado, el cliente no puede completar una reserva sin este servicio (p. ej., seguro estándar).
- **Cantidad máxima:** cuántas unidades se pueden seleccionar para un mismo vehículo (p. ej., máx. 2 sillas de bebé).

---

### 🖼️ IMAGEN: GESTIÓN DE SERVICIOS ADICIONALES
*(Lista de servicios adicionales y ajustes de precios)*

---

## 🚘 Compatibilidad con vehículos (asignación)

Puede que no todos los servicios sean adecuados para todos los vehículos.
- **Específico del vehículo:** puedes definir un servicio de equipaje para 8–9 personas exclusivamente para el grupo «Minibús».
- **Asignación global:** algunos servicios (p. ej., el permiso de salida internacional) se aplican automáticamente a toda la flota.

---

## 🛒 Selección del cliente y gestión del carrito

El cliente ve estos servicios como una lista en la página de detalle del vehículo o en el paso de pago.
- **Cálculo en tiempo real:** al seleccionar un servicio adicional, el importe total se actualiza al instante mediante Ajax.
- **Resumen:** los servicios adicionales seleccionados se detallan tanto en el correo electrónico del cliente como en el registro de la reserva en el panel de administración.

---

---

## 🆕 v4.36.0 — Contexto y tipo de precio

A partir de la v4.36.0, cada servicio adicional tiene dos campos nuevos en la pantalla de edición:

### Contexto (taxonomía `mhmrentiva_addon_context`)

Una caja de metadatos con botones de opción en el panel lateral, con tres opciones:

| Contexto | Significado |
| :--- | :--- |
| **Solo alquiler** | Se muestra solo en el flujo de reserva de alquiler |
| **Solo traslado** | Se muestra solo en el flujo de reserva de transferencia (selector modal) |
| **Ambos** | Se muestra en ambos flujos |

- **Valor predeterminado:** `Rental only` (los servicios adicionales existentes se migran automáticamente a este valor al actualizar)
- **Dónde lo ve el cliente:**
    - Alquiler: las casillas de verificación existentes en el formulario de reserva (sin cambios)
    - Transferencia: un aviso «+ N servicios adicionales disponibles» encima del botón «Añadir al carrito» en cada tarjeta de resultados de búsqueda; al hacer clic en el botón se abre un selector modal

### Tipo de precio (metadato de entrada `_mhmrentiva_addon_pricing_type`)

Un campo desplegable en la caja de metadatos principal, con tres opciones:

| Tipo | Cálculo | Válido en |
| :--- | :--- | :--- |
| **Por reserva (importe fijo)** | `mhmrentiva_addon_price` (fijo) | Ambos contextos |
| **Por día** | `addon_price × rental_days` | Alquiler |
| **Por pasajero** | `addon_price × (adults + children)` | Transferencia |

- **Valor predeterminado:** `Per booking (fixed)` (los servicios adicionales existentes se migran automáticamente)
- **Interfaz de administración dinámica:** al cambiar la opción de Contexto, el desplegable Tipo de precio desactiva las opciones incompatibles con el sufijo `(incompatible with context)`. Funciona con JS, no hace falta guardar para previsualizar.
- **Protección en el servidor:** si, por algún motivo, se elude el JS y se guarda una combinación no válida (p. ej., `Rental only` + `Per passenger`), el servidor restablece el tipo de precio a `Per booking` y muestra un aviso de administración.

### Vista previa del modal de transferencia

Cuando un cliente hace clic en «Añadir al carrito» en un resultado de búsqueda de transferencia y existe al menos un servicio adicional con contexto de transferencia:

```
┌─ Modal ──────────────────────────────────┐
│ Add-ons for your VIP transfer            │
│ İstanbul Havalimanı ➝ Taksim Ofis        │
├──────────────────────────────────────────┤
│ ☑ Welcome Banner (required)  +30 ₺       │
│ ☐ Child Seat                  +25 ₺      │
│ ☐ VIP Assistant   +15 ₺ × 3 yolcu = 45 ₺ │
├──────────────────────────────────────────┤
│ Vehicle 280 ₺ + add-ons 95 ₺ = 375 ₺     │
│           [ Cancel ]   [ Add to cart ]   │
└──────────────────────────────────────────┘
```

- Los servicios adicionales obligatorios aparecen arriba, premarcados y bloqueados.
- El total se actualiza en directo a medida que el cliente marca o desmarca las casillas.
- «Cancelar» cierra sin enviar nada; «Añadir al carrito» envía la selección junto con los datos de transferencia existentes.
- Si no hay ningún servicio adicional configurado con contexto de transferencia, el modal no se muestra y el comportamiento actual de añadido directo se mantiene sin cambios.

### Migración

En el primer `init` tras actualizar a la v4.36.0, a cada registro `vehicle_addon` antiguo se le asigna automáticamente:
- `addon_context = rental`
- `_mhmrentiva_addon_pricing_type = per_booking`

Esto es **idempotente**: un cambio manual del operador (cambiar el contexto a `transfer` o el tipo de precio a `per_day`) nunca se sobrescribe en los arranques posteriores. La migración está controlada por un indicador de opción interno.

### Sin límite de servicios adicionales

Lite **no tiene límite en el número de servicios adicionales**. Publica tantos como necesites; Pro no cambia esto.

---

### Resumen de la sección
- Ofrece opciones de servicio completas para crear **canales de ingresos adicionales**.
- Cubre tus costes con **estrategias de precios** (diario / fijo / por reserva / por pasajero).
- Usa la **presentación específica por vehículo** y la **segmentación por contexto** para mostrar los servicios adicionales adecuados en el flujo adecuado.
- Los clientes de transferencia ven un **selector modal** centrado, con totales en directo que tienen en cuenta los multiplicadores.

### Registro de cambios
| Fecha | Versión | Nota |
| :--- | :--- | :--- |
| 09.11.2026 | 6.3.1 | Corrección: se eliminó la nota «Lite está limitado a 4 servicios adicionales publicados». Lite no tiene límite de servicios adicionales. |
| 29.04.2026 | 4.36.0 | Se añadieron la taxonomía `mhmrentiva_addon_context` (alquiler / transferencia / ambos) y `_mhmrentiva_addon_pricing_type` (per_booking / per_day / per_passenger). Selector modal de transferencia con total en directo. Migración idempotente de datos. |
| 19.03.2026 | 4.21.2 | Se creó la guía de uso de servicios adicionales. |
