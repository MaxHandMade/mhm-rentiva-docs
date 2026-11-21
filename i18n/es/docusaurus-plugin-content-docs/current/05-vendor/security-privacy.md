---
id: security-privacy
title: "Arquitectura de seguridad y privacidad de vendedores"
sidebar_label: "Seguridad y privacidad"
sidebar_position: 30
---

![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Función Pro
Esta página documenta una funcionalidad del complemento **MHM Rentiva Pro**. No forma parte de la edición gratuita
Lite de WordPress.org y requiere tener Pro instalado junto con Lite, además de una licencia válida.
Consulta [Ediciones — Lite frente a Pro](/docs/) para ver la división completa, u obtén Pro en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Propósito
MHM Rentiva utiliza una arquitectura de seguridad multicapa (defensa en profundidad) para proteger los datos financieros y la información personal de los vendedores. Esta página explica los métodos de cifrado, el aislamiento de datos y los mecanismos de registro de auditoría.
:::

# 🛡️ Capas de seguridad y privacidad

Los datos de los vendedores están protegidos por cuatro capas principales, desde el nivel de la base de datos hasta la interfaz de la aplicación.

---

## 🔒 1. Cifrado de datos financieros (seguridad del IBAN)

Los datos de IBAN de los vendedores nunca se almacenan como texto plano en la base de datos.

### Cifrado AES-256-CBC
- **Algoritmo:** `AES-256-CBC`, estándar del sector.
- **Gestión de claves:** claves derivadas de las constantes `AUTH_KEY` y `SECURE_AUTH_SALT` de WordPress.
- **Mecanismo a prueba de fallos:** si la biblioteca de cifrado (OpenSSL) no está disponible, el sistema devuelve un valor vacío y detiene el guardado para evitar fugas de datos.

```php
// VendorApplicationManager::encrypt_iban();
// Encrypted data is stored using base64_encode().
```

:::warning Advertencia crítica
Cambiar las claves de seguridad en `wp-config.php` hace que todos los datos de IBAN cifrados existentes resulten ilegibles. Estas claves deben tener siempre una copia de seguridad.
:::

---

## 🚦 2. Aprobación de cambios en campos de alta criticidad

Los cambios que el vendedor realiza en campos críticos como el IBAN no se aplican de inmediato: se activa un **proceso de aprobación del administrador**.

### Flujo de cambio de IBAN
1. **Solicitud:** el vendedor introduce un nuevo IBAN.
2. **Almacenamiento temporal:** el nuevo IBAN se cifra y se guarda en el campo meta `_mhmrentiva_pending_iban`.
3. **Notificación al administrador:** aparece una insignia con contador en el panel de administración.
4. **Aprobar/Rechazar:** si el administrador lo aprueba, el IBAN temporal se traslada al campo de IBAN principal. Si se rechaza, los datos temporales se eliminan y el vendedor recibe un correo electrónico.

---

## 📁 3. Aislamiento de datos y medios

Los vendedores no pueden acceder a los datos ni a los archivos multimedia de otros usuarios.

- **Aislamiento de medios:** el filtro `ajax_query_attachments_args` limita a los vendedores a ver solo las imágenes que han subido.
- **Aislamiento del panel:** la clase `VendorOwnershipEnforcer` añade automáticamente un filtro `post_author` a todas las consultas a la base de datos, lo que impide el acceso no autorizado.

---

## 📝 4. Registro de auditoría

Todos los eventos de seguridad críticos se registran mediante `AdvancedLogger`.

| Evento | Contenido | Nivel |
|---|---|---|
| Cambio de IBAN | "El vendedor #X ha solicitado un cambio de IBAN." | `INFO` |
| Intento de inicio de sesión | Intentos fallidos de inicio de sesión en el panel del vendedor. | `WARNING` |
| Aprobación de pago al proveedor | "El administrador #Y ha aprobado un pago al proveedor para el vendedor #X." | `CRITICAL` |

Los registros se pueden supervisar desde la sección **Registros del sistema** del panel de administración y se purgan automáticamente según el ajuste `mhmrentiva_log_retention_days`.

---

## ⚙️ 5. Resumen técnico de seguridad

| Mecanismo | Tipo de protección | Detalle |
|---|---|---|
| **Nonce (CSRF)** | Seguridad de formularios | Token único para cada operación AJAX y de formulario. |
| **Capacidad** | Autorización | Se bloquea el acceso fuera del rol `rentiva_vendor`. |
| **Enmascaramiento** | Privacidad | En la interfaz solo se muestran los 4 últimos dígitos de los IBAN. |

## Resumen de la sección
- Los datos de IBAN se almacenan cifrados con `AES-256-CBC`.
- Los cambios críticos están sujetos a la aprobación del administrador.
- El aislamiento multicapa mantiene separados los datos de cada vendedor.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se han añadido detalles sobre el cifrado de datos, el flujo de aprobación de IBAN y el aislamiento de medios. |
