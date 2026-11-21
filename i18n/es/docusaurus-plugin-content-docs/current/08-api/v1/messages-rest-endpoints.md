---
id: messages-rest-endpoints
title: "API de mensajería y comunicación (Messages REST)"
sidebar_label: "Mensajería REST"
sidebar_position: 70
---

![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Documentación](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
La API de mensajería describe los endpoints utilizados para gestionar la comunicación entre clientes, vendedores y administradores del sistema.
:::

# 💬 API de mensajería y comunicación

El sistema de mensajería de Rentiva se basa en una arquitectura asíncrona de «hilos» (Thread). Todos los endpoints utilizan la clase de servicio `Messages` y los helpers `MessageFormatter`.

---

## 🏗️ 1. Arquitectura del módulo

Punto de registro: `MHMRentiva\Admin\Messages\REST\Messages::register()`

El sistema funciona a través de dos espacios de nombres principales:
- **Endpoints de administración:** `/v1/admin/messages/*`
- **Endpoints de cliente/vendedor:** `/v1/portal/messages/*`

---

## 👨‍💼 2. Endpoints de administración

La sección en la que los administradores del sistema supervisan y responden a todo el tráfico de comunicación.

| Endpoint | Método | Función |
|---|---|---|
| `/admin/messages` | `GET` | Lista todos los hilos de mensajes. |
| `/admin/messages/{id}` | `GET` | Devuelve el historial completo de mensajes de un hilo concreto. |
| `/admin/messages/{id}/reply` | `POST` | Envía una respuesta al hilo en nombre del administrador. |
| `/admin/messages/{id}/status`| `PUT` | Marca el hilo como «Cerrado» o «Resuelto». |

---

## 👤 3. Endpoints de cliente y vendedor

La sección en la que los usuarios se comunican entre sí o con el equipo de soporte.

| Endpoint | Método | Función |
|---|---|---|
| `/portal/messages/create` | `POST` | Inicia un nuevo hilo de mensajes. |
| `/portal/messages/threads` | `GET` | Lista los hilos activos en los que participa el usuario. |
| `/portal/messages/reply` | `POST` | Añade un nuevo mensaje a un hilo existente. |

---

## 🛡️ 4. Permisos y seguridad (propiedad)

El sistema de mensajería aplica un control de **propiedad** (Ownership) además de la autenticación:

1. **Comprobación de propiedad:** antes de obtener los mensajes de un hilo, `Messages::verify_access()` verifica que el usuario que realiza la solicitud es parte de ese hilo (remitente o destinatario).
2. **Verificación de rol:** los endpoints de administración solo son accesibles para usuarios con la capacidad `manage_options`.
3. **Saneamiento del contenido:** todo el contenido de los mensajes se sanea con `wp_kses()` para eliminar etiquetas HTML dañinas antes de guardarse.

---

## 📤 5. Ejemplo de respuesta (mensaje formateado)

```json
{
  "success": true,
  "data": {
    "thread_id": 45,
    "subject": "Regarding Vehicle Booking",
    "messages": [
      {
        "author_name": "Ahmet Y.",
        "content": "Is a child seat available in the vehicle?",
        "created_at": "2026-03-19 14:30:00",
        "is_read": true
      }
    ]
  }
}
```

## Resumen de la sección
- La API de mensajería ofrece un modelo de comunicación basado en hilos.
- Las responsabilidades de administración y de portal/cliente están separadas por límites claros.
- La seguridad y la privacidad de los datos se mantienen al más alto nivel mediante la capa `verify_access()`.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se han añadido la arquitectura de hilos, el control de propiedad y la estructura de respuesta formateada. |
