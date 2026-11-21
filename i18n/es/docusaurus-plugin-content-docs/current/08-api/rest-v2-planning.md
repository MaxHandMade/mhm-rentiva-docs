---
id: rest-v2-planning
title: "Planificación y hoja de ruta de REST v2"
sidebar_label: "Plan de REST v2"
sidebar_position: 110
---

![Versión](https://img.shields.io/badge/status-planning-brighgreen?style=flat-square) ![Documentación](https://img.shields.io/badge/docs-v2--blueprint-0f766e?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::important Visión
La API REST v2 de MHM Rentiva tiene como objetivo modernizar los canales de comunicación interna existentes, actualmente dispersos (AJAX y REST v1), unificándolos en una única arquitectura centralizada y reforzando la compatibilidad con aplicaciones móviles (aplicación nativa).
:::

# 🏗️ Planificación de REST v2 y hoja de ruta de la arquitectura

La arquitectura v2 adopta un enfoque «API-First» para exponer toda la funcionalidad del plugin como endpoints JSON estándar.

---

## 🛤️ 1. Estructura de espacio de nombres prevista

Todos los nuevos endpoints se agruparán bajo el espacio de nombres `wp-json/mhm-rentiva/v2`, y la gestión de versiones mantendrá la retrocompatibilidad.

---

## 📦 2. Plan de migración modular

### A. Módulo financiero y de libro de cuentas (`/v2/ledger`)
- **GET `/v2/ledger/summary`:** Sustituirá a la acción AJAX `mhmrentiva_fetch_vendor_stats`.
- **POST `/v2/ledger/payouts`:** Sustituirá a la acción AJAX `mhmrentiva_request_payout`.
- **Análisis:** Esta migración hará que el panel del vendedor cargue un 40 % más rápido.

### B. Motor de reservas (`/v2/booking`)
- **POST `/v2/booking/check`:** Una versión más eficiente y validada con JSON Schema de la consulta `/v1/availability` existente.
- **POST `/v2/booking/create`:** Un nuevo endpoint que gestiona el proceso del carrito de WooCommerce íntegramente a través de la API.

### C. Vehículos y filtrado (`/v2/vehicles`)
- **GET `/v2/vehicles/search`:** Sustituirá a la acción AJAX `mhmrentiva_filter_results`.
- **Integración con la Interactivity API:** Este endpoint se utilizará directamente para obtener resultados de búsqueda reactivos.

---

## 🔒 3. Nuevos estándares de seguridad

Las siguientes capas de seguridad pasarán a ser estándar con la transición a v2:

1. **Compatibilidad con JWT (JSON Web Token):** Gestión de sesiones cifradas y con tiempo limitado para aplicaciones móviles.
2. **Obligatoriedad de X-WP-Nonce:** Verificación obligatoria en todas las peticiones asíncronas realizadas desde el navegador.
3. **Refuerzo de los métodos HTTP:** Modo «estricto» que solo permite ejecutar los métodos pertinentes (GET/POST/PUT).
4. **Limitación dinámica de peticiones:** Gestión dinámica de cuotas por clave de API mediante `RateLimiter`.

---

## 🛠️ 4. Pasos de implementación e integración

1. **Modernización de controladores:** Separación completa de los controladores sobrecargados en capas de servicio.
2. **Registro de rutas:** Creación de nuevas clases de controlador en `src/Api/REST/V2/`.
3. **Refactorización de JS:** Redirección de archivos JS como `vehicles-grid.js` de AJAX a los endpoints de REST v2.

## Resumen de la sección
- La arquitectura v2 es la base de la transformación «API-First» del sistema.
- Es una fase de preparación para la aplicación móvil y las integraciones con ecosistemas externos.
- La seguridad y el rendimiento se elevarán al máximo nivel.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se han detallado la compatibilidad con JWT, la visión de la aplicación móvil y el diseño de v2. |
