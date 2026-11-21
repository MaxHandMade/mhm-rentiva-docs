---
id: transfer-api-and-webhooks
title: "Servicios de transferencia y flujos de webhooks"
sidebar_label: "API de transferencia y webhooks"
sidebar_position: 100
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
Esta página explica la estructura de operaciones asíncronas del módulo de transferencia, el proceso de añadir al carrito y el tráfico de comunicación mediante webhooks con servicios externos.
:::

# 🛣️ Servicios de transferencia y flujos de webhooks

A diferencia del módulo de alquiler, el módulo de transferencia incluye precios de punto a punto y cálculos de rutas personalizadas. Estos procesos se gestionan de forma híbrida mediante AJAX y la API REST.

---

## 🛒 1. Flujo de reserva de transferencia (frontend)

Las interacciones del lado del cliente se ejecutan mediante AJAX para obtener un alto rendimiento:

- **Acción:** `rentiva_transfer_add_to_cart`
- **Seguridad:** se requiere la verificación de `rentiva_transfer_nonce`.
- **Modelo de datos:** se añade al carrito de WooCommerce con una etiqueta `booking_type=transfer`.
- **Flujo de trabajo:** el tipo de vehículo seleccionado, el número de pasajeros y la información de la ruta se validan mediante `TransferPricingEngine` antes de reflejarse en el carrito.

---

## 📡 2. Mecanismo de webhooks y callbacks

La comunicación con los proveedores de pago externos y los socios de transferencia se gestiona mediante endpoints REST.

### Callback de pago al proveedor y de reserva
- **Ruta:** `/mhm-rentiva/v1/payouts/{id}/callback`
- **Verificación:** comprobación de firma basada en `HMAC-SHA256`.
- **Flujo:** tras recibir una señal de «Correcto» del servicio de pago, `TransferService` confirma la reserva y envía notificaciones a las partes implicadas (cliente/vendedor).

---

## 🏥 3. Comprobación del estado del sistema (endpoint de estado)

Proporciona observabilidad externa (monitorización) del sistema.

- **URL:** `/wp-json/mhm-rentiva/v1/health`
- **Casos de uso:** monitorización del tiempo de actividad, pruebas de humo y comprobaciones de disponibilidad tras CI/CD.
- **Datos devueltos:** estado de las tablas de la base de datos, permisos de escritura del directorio `/tmp` y compatibilidad de la versión de PHP.

---

## 🛡️ 4. Seguridad y limitación de peticiones

- **Límite general:** 30 peticiones por minuto para los endpoints de búsqueda de transferencias.
- **Límite de callbacks:** se aplican límites personalizados por identidad de PSP, no por IP.
- **Idempotencia:** las peticiones repetidas con el mismo ID de notificación no se procesan, pero se devuelve `200 OK`.

## Resumen de la sección
- El módulo de transferencia utiliza conjuntamente las capas AJAX (frontend) y REST (backend/externa).
- Todas las interacciones financieras están sujetas a una verificación basada en firma (`HMAC`).
- El endpoint `Health` permite monitorizar en tiempo real el estado operativo del sistema.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se han añadido la integración de TransferPricingEngine, los detalles del endpoint de estado y el flujo de verificación HMAC. |
