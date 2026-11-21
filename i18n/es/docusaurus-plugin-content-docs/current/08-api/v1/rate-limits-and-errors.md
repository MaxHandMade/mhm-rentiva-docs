---
id: rate-limits-and-errors
title: "Gestión de errores y limitación de peticiones de la API"
sidebar_label: "Límite de peticiones y códigos de error"
sidebar_position: 90
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
Conjunto de reglas que se utiliza para garantizar la continuidad de los servicios de la API de MHM Rentiva e informar de los estados de error en un lenguaje estandarizado.
:::

# 🚦 Gestión de errores y limitación de peticiones de la API

El sistema utiliza las clases `RateLimiter` y `ErrorHandler` tanto para bloquear ataques maliciosos (fuerza bruta, DoS) como para devolver mensajes de error coherentes a los clientes.

---

## 🛑 1. Limitación de peticiones

Los límites de peticiones se aplican por clave de API (v1) o por dirección IP (pública).

| Capa | Límite (peticiones/minuto) | Resultado al superarlo |
|---|---|---|
| **API pública** | 30 | HTTP 429 |
| **Autenticada (clave de API)** | 60 | HTTP 429 |
| **Administración/interna** | 120 | HTTP 429 |

**Protecciones:**
- **`RateLimiter::check()`:** Aplica el límite de peticiones dentro de ventanas de tiempo definidas (ventana deslizante).
- **Registro:** Las infracciones del límite se registran mediante `AdvancedLogger` con el nivel `SECURITY_WARNING`.

---

## ❌ 2. Códigos de error estándar

Todas las respuestas de la API utilizan códigos de estado HTTP estándar y códigos de error propios de la aplicación.

| Código HTTP | Código de la aplicación | Descripción |
|---|---|---|
| **400** | `INVALID_PARAMS` | Falta un parámetro o tiene un formato incorrecto. |
| **401** | `AUTH_REQUIRED` | Falta la cabecera de autenticación o no es válida. |
| **403** | `PERMISSION_DENIED` | El usuario o la clave no tiene permiso para esta operación. |
| **404** | `RESOURCE_NOT_FOUND` | No se ha encontrado ningún registro con el ID indicado. |
| **409** | `STATE_CONFLICT` | La operación es incompatible con el estado actual del recurso (p. ej., reservar un vehículo no disponible). |
| **429** | `RATE_LIMIT_EXCEEDED` | Se ha superado el límite de peticiones por minuto. |
| **500** | `INTERNAL_ERROR` | Se ha producido un error inesperado en el servidor. |

---

## 🛠️ 3. Registro e ID de correlación

El sistema genera un **ID de correlación** (p. ej., `req_abc123`) junto con cada respuesta de error:
- **Consejo para desarrolladores:** Los detalles técnicos del error (traza de la pila, etc.) nunca se devuelven en el cuerpo del error. En su lugar, se devuelve un ID que ayuda a localizar la entrada correspondiente en los registros.
- **`ErrorHandler::format_error()`:** Captura de forma centralizada todos los errores, los registra y los sirve a los clientes en un formato JSON seguro.

---

## 📤 4. Ejemplo de respuesta de error

```json
{
  "success": false,
  "error": {
    "code": "PERMISSION_DENIED",
    "message": "Bu işlem için 'rentiva_vendor' yetkisi gereklidir.",
    "correlation_id": "err_1773849524"
  }
}
```

## Resumen de la sección
- `RateLimiter` protege el sistema; `ErrorHandler` estandariza la comunicación.
- Los errores nunca se devuelven como errores PHP sin procesar, sino como JSON con formato.
- El ID de correlación facilita el seguimiento de los errores en producción.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se han añadido las capas de límite de peticiones, los códigos de error de la aplicación y los detalles del ID de correlación. |
