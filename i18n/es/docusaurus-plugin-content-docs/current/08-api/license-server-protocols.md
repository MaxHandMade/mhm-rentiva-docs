---
id: license-server-protocols
title: "Servidor de licencias y protocolos de seguridad"
sidebar_label: "Protocolos de licencia"
sidebar_position: 105
---

![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Documentación](https://img.shields.io/badge/docs-security_hardened-0f766e?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
MHM Rentiva gestiona los procesos de validación y activación de licencias con el servidor de licencias externo (`https://api.maxhandmade.com/v1`) mediante un protocolo asíncrono de alta seguridad.
:::

# 🛡️ Servidor de licencias y protocolos de seguridad

El sistema exige la firma **HMAC-SHA256** y el cifrado de datos para evitar la manipulación de claves de licencia y los ataques de intermediario (Man-in-the-Middle).

---

## 🏗️ 1. Arquitectura de comunicación

El plugin gestiona todas las operaciones de licencia a través del servicio `LicenseManager`.

| Criterio | Detalle técnico |
| :--- | :--- |
| **Método de firma** | HMAC-SHA256 (código de autenticación de mensajes basado en hash) |
| **Cifrado** | El flujo de datos se cifra mediante `TLS 1.2/1.3` (HTTPS). |
| **Verificación** | Comprobación bidireccional de la firma mediante un secreto HMAC compartido. |
| **Clave de API** | Se utiliza `MHMRENTIVA_LICENSE_API_KEY` para identificar el servidor. |

---

## ✍️ 2. Generación de la firma

Para cada solicitud se genera una firma de forma dinámica, que se envía mediante la cabecera `X-MHM-SIGNATURE`.

### A. Estructura canónica del mensaje
Antes de firmar, se concatenan los siguientes datos para formar el mensaje sin procesar:
1. **Método HTTP:** (p. ej., `POST`)
2. **Ruta canónica:** (p. ej., `/v1/licenses/validate`)
3. **Marca de tiempo:** (p. ej., `1709825400`)
4. **Cuerpo sin procesar:** el conjunto de datos enviado en formato JSON.

### B. Ejemplo de código PHP para la firma
```php
$message   = "POST" . "/v1/licenses/validate" . "1709825400" . $raw_body;
$signature = hash_hmac('sha256', $message, $hmac_secret);
```

---

## 📡 3. Cabeceras HTTP de seguridad

Cabeceras personalizadas que se utilizan para garantizar la seguridad de las solicitudes:

- **`X-MHM-API-KEY`:** clave de API de la licencia que identifica la solicitud.
- **`X-MHM-TIMESTAMP`:** marca de tiempo de la solicitud (tolerancia de +/- 300 segundos).
- **`X-MHM-SIGNATURE`:** firma digital generada con `HMAC-SHA256`.
- **`X-MHM-SITE-HASH`:** identidad única del sitio, cifrada de forma unidireccional.
- **`X-Environment`:** modo (`production`, `staging`, `development`).

---

## ⏳ 4. Gestión de errores y periodo de gracia

Cuando se pierde la conexión con el servidor, el plugin no se desactiva inmediatamente:

1. **Periodo de gracia de 7 días:** si el sitio estaba activo anteriormente y han pasado menos de 7 días desde la última comprobación correcta, el plugin mantiene el estado "Activo" aunque se produzca un error de conexión.
2. **Auditoría del modo sin conexión:** las funciones críticas (p. ej., aceptar pagos) no se restringen durante este periodo, pero si no se puede realizar una verificación válida antes de que termine el día 7, se desactivan las funciones Pro.
3. **Verificación SSL:** la verificación del certificado SSL es obligatoria en los entornos de producción.

## Resumen de la sección
- El protocolo de licencias protege la propiedad intelectual del plugin y la integridad de los datos de los usuarios.
- HMAC-SHA256 garantiza que las solicitudes no han sido manipuladas (integridad).
- El mecanismo del periodo de gracia garantiza que las caídas del servidor no afecten a la experiencia del usuario.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se han detallado la arquitectura de firma HMAC, el periodo de gracia y las reglas del modo sin conexión. |
