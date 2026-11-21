---
id: controller-audit
title: "Arquitectura de controladores y lógica de negocio"
sidebar_label: "Auditoría de controladores"
sidebar_position: 20
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
MHM Rentiva busca delegar la lógica de negocio en clases de servicio para evitar el antipatrón «Fat Controller» (controlador sobrecargado). Esta página es un informe de auditoría técnica de los controladores actuales.
:::

# 🧬 Arquitectura de controladores y capa de servicios

La arquitectura del plugin se basa en que los controladores solo reciben peticiones, realizan comprobaciones de autorización y delegan el trabajo en las clases de servicio correspondientes.

---

## 🏗️ 1. Patrones de diseño de controladores

Todas las clases `*Controller.php` deben seguir estas reglas:
- **Solo presentación:** No deben realizar cálculos de datos.
- **Validación:** Deben validar los datos de entrada de la petición.
- **Autorización:** Deben realizar comprobaciones de capacidades mediante `current_user_can` o `SecurityHelper`.

---

## 📊 2. Informe de controladores AJAX

### A. AnalyticsController (controlador ligero)
- **Archivo:** `src/Core/Dashboard/AnalyticsController.php`
- **Función:** Gestiona las peticiones de estadísticas.
- **Lógica de negocio:** Los ingresos, la ocupación y los datos de los gráficos se encuentran íntegramente en `AnalyticsService`.
- **Resultado:** ✅ **Cumple los estándares.**

### B. PayoutAjaxController (controlador ligero)
- **Archivo:** `src/Core/Financial/PayoutAjaxController.php`
- **Función:** Inicia las solicitudes de pago al proveedor.
- **Lógica de negocio:** Las clases `PayoutService` y `AtomicPayoutService` (Transaction) ejecutan la operación.
- **Resultado:** ✅ **Cumple los estándares.**

---

## 🌐 3. Informe de controladores REST

### A. HealthController (estado de la auditoría)
- **Archivo:** `src/Api/REST/HealthController.php`
- **Observación:** Algunas consultas de estado de la base de datos se encuentran directamente dentro del controlador.
- **Recomendación:** Está previsto migrar esta lógica a una clase `SystemHealthService`.
- **Resultado:** ⚠️ **Mejora pendiente.**

### B. PayoutCallbackController (controlador de transacciones)
- **Archivo:** `src/Api/REST/PayoutCallbackController.php`
- **Función:** Procesa las devoluciones de llamada (callbacks) de pago junto con sus justificantes.
- **Seguridad:** La verificación de firmas HMAC se gestiona de forma centralizada mediante `AuthHelper`.
- **Resultado:** ✅ **Cumple los estándares.**

---

## 🛠️ 4. Estándares y recomendaciones de arquitectura

Se utilizan los siguientes métodos para estandarizar la gestión de errores:
1. **`ErrorHandler::format_error()`:** Todas las respuestas de error se estandarizan mediante este método.
2. **Clases DTO:** Al devolver cargas JSON de gran tamaño, se utilizan clases DTO en lugar de arrays para garantizar un contrato de datos.
3. **`Sanitizer::*`:** Todas las variables entrantes se procesan a través de la capa de saneamiento en lugar de tratarse como datos sin procesar.

## Resumen de la sección
- Los controladores se mantienen «ligeros».
- La lógica de negocio se centraliza en las clases de «servicio».
- La seguridad de la API la proporcionan `AuthHelper` y `SecurityHelper`.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se han añadido el informe de auditoría de controladores y los patrones de diseño. |
