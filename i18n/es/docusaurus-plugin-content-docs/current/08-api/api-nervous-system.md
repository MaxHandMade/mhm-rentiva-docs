---
id: api-nervous-system
title: "Sistema nervioso (comunicación interna)"
sidebar_label: "Sistema nervioso"
sidebar_position: 10
---

![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Documentación](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
MHM Rentiva utiliza una arquitectura de comunicación de tres capas («Sistema nervioso») para gestionar las interacciones de los usuarios y sincronizar los datos entre módulos: **AJAX**, **REST API (v1)** e **Interactivity API**.
:::

# 🧠 Sistema nervioso: canales de comunicación

La arquitectura de comunicación interna del plugin está optimizada para ofrecer un alto rendimiento y una baja latencia.

---

## ⚡ 1. Capa AJAX (admin-ajax.php)

El canal principal utilizado para las interacciones del escritorio del vendedor y de los formularios del front-end.

| Hook (acción) | Controlador responsable | Función |
| :--- | :--- | :--- |
| `mhmrentiva_fetch_vendor_stats` | `AnalyticsController` | Obtiene los datos de KPI y Sparkline del escritorio. |
| `mhmrentiva_request_payout` | `PayoutAjaxController` | Inicia las solicitudes de pago al proveedor de forma atómica. |
| `mhmrentiva_filter_results` | `SearchResults` | Filtra la lista de vehículos sin recargar la página. |
| `mhmrentiva_approve_iban` | `VendorOnboardingController` | Aprueba los cambios de IBAN desde el panel de administración. |

---

## 🌐 2. REST API v1 (mhm-rentiva/v1)

La arquitectura que se comunica con servicios externos (proveedores de pago, aplicaciones móviles) y gestiona configuraciones complejas.

### Endpoints principales:
- **`/locations`:** Proporciona datos de ubicación geográfica para los módulos de transferencia y reserva.
- **`/health`:** Audita las tablas de la base de datos, el estado de la licencia y el entorno PHP.
- **`/payouts/{id}/callback`:** Utiliza la verificación HMAC para rechazar las solicitudes no firmadas procedentes de los sistemas de pago.
- **`/availability`:** Realiza comprobaciones de disponibilidad del calendario en tiempo real y el cálculo de precios mediante el motor de precios (Pricing Engine).

---

## 🧪 3. Interactivity API (WP 6.5+)

Se utiliza para interfaces reactivas y basadas en bloques, en línea con los nuevos estándares de WordPress.

- **`mhmLive.endpoint`:** Se utiliza para reflejar en tiempo real en el frontend un cambio de estado del lado del servidor (p. ej., el contador de favoritos).
- **Filtrado:** Proporciona carga asíncrona de datos mediante `data-wp-context`.
- **Microinteracciones:** Las animaciones de los botones y los mensajes de validación de formularios utilizan esta capa.

---

## 🛡️ 4. Seguridad y verificación

Las siguientes capas de seguridad son obligatorias en todos los canales de comunicación:
- **Nonce (CSRF):** Verificación del campo `_wpnonce` en cada solicitud AJAX.
- **Capacidad:** Control de acceso basado en roles mediante `current_user_can`.
- **AuthHelper:** Verificación basada en clave de API para el acceso externo.

## Resumen de la sección
- AJAX está optimizado para las interacciones del escritorio del usuario.
- REST API v1 es la puerta de enlace a la integridad del sistema y al mundo exterior.
- La Interactivity API ofrece métodos reactivos para una experiencia de usuario moderna y fluida.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se han añadido detalles de la Interactivity API y de la auditoría de AJAX. |
