---
id: auth-and-security
title: "Autenticación y seguridad de la API"
sidebar_label: "Autenticación y seguridad"
sidebar_position: 20
---

![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Documentación](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
Explica los protocolos de seguridad que se usan para garantizar la integridad y la confidencialidad del intercambio de datos en la capa de API de MHM Rentiva.
:::

# 🔐 Arquitectura de seguridad de la API

El sistema sigue una estrategia de verificación multicapa tanto para las peticiones internas como para las externas.

---

## 🛡️ 1. Métodos de autenticación

### A. Protección con nonce (CSRF) (interna)
Se usa para las peticiones AJAX internas y de la Interactivity API.
- **Cabecera:** `X-WP-Nonce`
- **Verificación:** `check_ajax_referer()` o `rest_cookie_check_errors()`.

### B. Clave de API (externa)
Se gestiona mediante `AuthHelper` para las integraciones externas.
- **Cabecera:** `X-Rentiva-API-Key`
- **Función:** La clave de API determina el nivel de permisos (lectura/escritura) asignado a esa clave.

### C. Verificación de firma HMAC (webhook)
Un paso de seguridad crítico para las notificaciones de pago.
- **Cabecera:** `X-Rentiva-Signature`
- **Lógica:** El hash generado a partir del cuerpo JSON recibido y la clave secreta se compara con el valor de la cabecera.

---

## 🚦 2. Autorización

Tras la autenticación, se comprueba si el usuario tiene permiso para realizar la operación:
- **`current_user_can('manage_options')`:** Operaciones de nivel de administrador.
- **`current_user_can('rentiva_vendor')`:** Operaciones de nivel de vendedor.
- **`Mode::featureEnabled()`:** Restricción de funciones según el nivel de licencia.

---

## 🚀 3. Seguridad y saneamiento de las peticiones

### Validación de parámetros
Todos los endpoints validan los datos mediante un array `args`:
```php
'id' => [
    'validate_callback' => function($param) {
        return is_numeric($param);
    },
    'sanitize_callback' => 'absint',
]
```

### Limitación de peticiones
Las peticiones excesivas desde la misma IP o clave de API se bloquean mediante el método `RateLimiter::check()`. Límite predeterminado: 60 peticiones por minuto.

---

## 📦 4. Seguridad del transporte de datos
- **HTTPS:** HTTPS es obligatorio para todos los endpoints de la API.
- **Secretos:** Las claves de API se almacenan cifradas en la base de datos.
- **Preflight (CORS):** Solo se aceptan peticiones de orígenes permitidos.

## Lista de comprobación
1. ¿Hay una comprobación de nonce en todas las peticiones POST?
2. ¿Se verifica la clave de API mediante `AuthHelper`?
3. ¿Se enmascaran los valores sensibles en las respuestas JSON?
4. ¿Está activo `RateLimiter`?

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se han añadido detalles sobre nonce, clave de API, HMAC y limitación de peticiones. |
