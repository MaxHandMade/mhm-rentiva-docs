---
id: rest-api-v1
title: "Descripción general de la REST API v1"
sidebar_label: "REST API"
sidebar_position: 10
---

![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Documentación](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
La REST API v1 de MHM Rentiva ofrece endpoints principales para la integración con sistemas externos, el soporte de aplicaciones móviles y las operaciones asíncronas. Todos los endpoints se sirven bajo el espacio de nombres `wp-json/mhm-rentiva/v1`.
:::

# 🌐 Estructura de la REST API v1

La capa de la API v1 proporciona un acceso a los datos seguro y rápido, manteniendo la compatibilidad con versiones anteriores.

---

## 🔑 1. Autenticación y seguridad

El acceso a los endpoints de la API se proporciona mediante tres métodos diferentes según el tipo de operación:

| Método | Caso de uso | Detalles |
|---|---|---|
| **Público** | Ubicaciones, disponibilidad | No se requiere autenticación para los datos de acceso público. |
| **Nonce** | Interacciones AJAX/web | Se requiere la verificación de la cabecera/parámetro `_wpnonce`. |
| **Clave de API** | Integraciones con servicios externos | Autenticación mediante `X-Rentiva-API-Key` o Bearer Token. |

---

## 🚀 2. Endpoints principales

### A. Estado del sistema (`/health`)
- **Método:** `GET`
- **Función:** Comprueba la existencia de las tablas de la base de datos, la versión del plugin y el estado de la licencia.
- **Respuesta:** `{"status": "ok", "version": "4.21.2"}`

### B. Servicios de ubicación (`/locations`)
- **Método:** `GET`
- **Función:** Devuelve las ubicaciones activas definidas para los módulos de reserva y transferencia.
- **Parámetros:** `?type=airport`, `?city=istanbul`

### C. Disponibilidad y precios (`/availability`)
- **Método:** `POST`
- **Función:** Comprueba la disponibilidad para unas fechas concretas y un ID de vehículo, y calcula el precio neto mediante el motor de precios.
- **Entrada:** `vehicle_id`, `pickup_date`, `return_date`

---

## 🛡️ 3. Capa de seguridad (AuthHelper)

`AuthHelper` interviene en todas las operaciones de «escritura» (POST/PUT/DELETE):
- **Limitación de peticiones:** Límite de peticiones por minuto para cada clave de API.
- **Verificación HMAC:** Garantiza la integridad de los datos en las devoluciones de llamada de los webhooks.

---

## 📊 4. Formato de respuesta y de error

El sistema devuelve respuestas JSON estándar:

```json
{
  "success": true,
  "data": { ... },
  "message": "İşlem başarılı."
}
```

En caso de error:
```json
{
  "success": false,
  "error_code": "INVALID_PARAMS",
  "message": "Eksik parametre gönderildi."
}
```

---

## ⚛️ 5. Endpoints de las SPA de React del administrador (v4.36.0+)

A partir de la v4.36.0, todas las páginas principales del administrador se migraron a SPA de React. Cada página se apoya en un controlador REST específico. Todos los endpoints requieren la capacidad `manage_options`.

### Escritorio (v4.36.0)

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/dashboard/stats` | Tarjetas de KPI: total de reservas, ingresos, vehículos activos, clientes |
| `GET` | `/dashboard/recent-bookings` | Widget paginado de reservas recientes |
| `GET` | `/dashboard/recent-transfers` | Resumen de las próximas transferencias |

### Informes (v4.37.x)

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/reports/overview` | Estadísticas resumidas de todas las pestañas |
| `GET` | `/reports/revenue` | Datos del gráfico de barras de ingresos + lista de detalle diario |
| `GET` | `/reports/bookings` | Distribución de estados de las reservas |
| `GET` | `/reports/vehicles` | KPI de rendimiento de los vehículos + vehículos principales |
| `GET` | `/reports/customers` | Gráfico del ciclo de vida de los clientes + métricas resumidas |

Todos los endpoints de informes aceptan `?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD` para filtrar por intervalo de fechas.

### Clientes (v4.39.0)

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/customers` | Lista paginada: admite `?search=`, `?sort_by=`, `?sort_order=`, `?page=` |
| `GET` | `/customers/{id}` | Detalle de un cliente (número de reservas, total gastado, primera/última reserva) |
| `DELETE` | `/customers/bulk` | Eliminación masiva: acepta un array `ids[]` en el cuerpo de la petición |

### Mensajes (v4.40.0)

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/messages` | Bandeja de entrada paginada: filtrable por estado, prioridad y categoría |
| `GET` | `/messages/{id}` | Vista de la conversación de un mensaje |
| `POST` | `/messages/{id}/reply` | Enviar una respuesta en una conversación |
| `POST` | `/messages/{id}/status` | Actualizar el estado del mensaje (pendiente/respondido/cerrado) |

### Informes de vendedores (v4.40.0)

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/vendor-reports` | Lista paginada: filtrable por estado y tipo de contexto |
| `GET` | `/vendor-reports/{id}` | Detalle de un informe con la descripción completa y el registro de auditoría |
| `POST` | `/vendor-reports/{id}/resolve` | Marcar como resuelto (libera o aplica la penalización según el contexto) |
| `POST` | `/vendor-reports/{id}/reject` | Rechazar el informe (activa la penalización diferida para el contexto vehicle_action) |

### Gestión de vendedores (v4.40.0)

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/vendor-management/applications` | Solicitudes de vendedores pendientes |
| `GET` | `/vendor-management/vendors` | Lista de vendedores activos con búsqueda/filtro |
| `GET` | `/vendor-management/{id}` | Detalle del vendedor (IBAN enmascarado, documentos, estadísticas) |
| `POST` | `/vendor-management/{id}/approve` | Aprobar una solicitud pendiente |
| `POST` | `/vendor-management/{id}/reject` | Rechazar una solicitud pendiente |
| `POST` | `/vendor-management/{id}/suspend` | Suspender a un vendedor activo |
| `POST` | `/vendor-management/{id}/unsuspend` | Reactivar a un vendedor suspendido (v4.43.0) |
| `GET` | `/vendor-management/{id}/audit-log` | Registro de auditoría de comisiones + penalizaciones (v4.43.0) |

### Exportación (v4.52.0)

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/admin/export/history` | Registro de exportaciones paginado: basado en transients, máximo 50 entradas, TTL de 1 semana |
| `DELETE` | `/admin/export/{id}` | Eliminar una entrada concreta del historial de exportaciones |
| `POST` | `/admin/export/preview` | Número total de registros + muestra de 5 filas para el tipo de contenido y los filtros de fecha seleccionados |

---

## Resumen de la sección
- La API v1 se sirve bajo `mhm-rentiva/v1`.
- El método de autenticación varía según lo crítica que sea la operación.
- Todas las operaciones se auditan mediante `AuthHelper` y `ErrorHandler` centrales.
- Todos los endpoints de las SPA de React del administrador (v4.36.0+) requieren la capacidad `manage_options`.

## Registro de cambios
| Fecha | Versión | Nota |
| :--- | :--- | :--- |
| 12.05.2026 | 4.52.0 | Controlador REST de exportación: `/admin/export/history`, `/admin/export/{id}`, `/admin/export/preview`. |
| 07.05.2026 | 4.43.0 | Se han añadido los endpoints `/vendor-management/{id}/unsuspend` + `/vendor-management/{id}/audit-log`. |
| 06.05.2026 | 4.40.0 | Se han añadido los controladores REST de mensajes, informes de vendedores y gestión de vendedores (12 nuevos endpoints). |
| 10.04.2026 | 4.39.0 | Controlador REST de clientes: `GET /customers`, `/customers/{id}`, `DELETE /customers/bulk`. |
| 05.04.2026 | 4.37.x | Controlador REST de informes: 5 endpoints de pestañas con filtro de intervalo de fechas. |
| 10.05.2026 | 4.36.0 | Controlador REST del escritorio: /dashboard/stats, /dashboard/recent-bookings, /dashboard/recent-transfers. |
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Se han actualizado la arquitectura y las capas de seguridad de la API v1. |
