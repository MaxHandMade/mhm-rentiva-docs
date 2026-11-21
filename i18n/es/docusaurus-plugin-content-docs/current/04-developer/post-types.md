---
id: post-types
title: "Tipos de contenido personalizados"
sidebar_label: "Tipos de contenido personalizados"
sidebar_position: 10
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
Rentiva amplía las tablas estándar de WordPress con una arquitectura de tipos de contenido personalizados (CPT) para gestionar lógica de negocio compleja.
:::

# 🗄️ Tipos de contenido personalizados

El plugin almacena los datos en dos grupos principales: «Operativo» (vehículos/reservas) y «Sistema» (pagos al proveedor/registros).

---

## 💰 1. Tipos de contenido financieros

### `mhmrentiva_payout` (Solicitudes de pago al proveedor)
Gestiona las solicitudes de pago de los vendedores dentro del flujo de trabajo del Modelo B.
- **Uso:** Contiene los estados del flujo de trabajo fuera del libro contable (Pendiente, Aprobado, Procesando).
- **Seguridad:** Solo los usuarios con la capacidad `manage_options` o `rentiva_financial_manager` pueden ver estos registros.
- **Relación:** Cada registro de pago al proveedor se corresponde con filas de `mhmrentiva_ledger` en la base de datos mediante el ID de transacción.

---

## 💬 2. Tipos de contenido de comunicación

### `mhmrentiva_message` (Mensajes)
Gestiona el tráfico de mensajes entre clientes, vendedores y administradores.
- **Gestión de hilos:** Agrupa los mensajes mediante la clave meta `_mhmrentiva_thread_id`.
- **Compatibilidad con UUID:** Los ID de hilo admiten tanto el formato entero como el UUID (cadena).
- **Visibilidad:** Oculto en el menú de administración estándar; se gestiona a través de una interfaz de mensajería específica.

---

## 🪵 3. Tipos de contenido de sistema y auditoría

### `mhmrentiva_app_log` (Registros de la aplicación)
Almacena errores del sistema, llamadas críticas a la API y registros de auditoría.
- **Limpieza automática (retención):** La rutina `LogRetention::purge()` elimina por defecto los registros con más de 30 días de antigüedad y se ejecuta a diario.
- **Categorías:** Registra en los niveles de gravedad Error, Info y Crítico.

---

## 4. Tipos de contenido operativos

El plugin trabaja con los siguientes CPT:
- **`mhmrentiva_vehicle`:** Cartera de vehículos de alquiler.
- **`mhmrentiva_booking`:** Registros de reservas y calendario.
- **`mhmrentiva_addon`:** Servicios adicionales del vehículo (silla infantil, GPS, seguro, etc.).

---

## 5. Tipos de contenido del marketplace de vendedores (Pro)

### `mhmrentiva_vendor_app` (Solicitudes de vendedor)
Gestiona las solicitudes de vendedor dentro del marketplace de vendedores.
- **Slug del CPT:** `mhmrentiva_vendor_app` (14 caracteres, cumple el límite de 20 caracteres de WordPress). **NOTA:** NO es `mhmrentiva_vendor_application`.
- **Uso:** El proceso de incorporación de vendedores (solicitud, aprobación, rechazo, suspensión) se realiza a través de este CPT.
- **Gestión:** Operaciones CRUD mediante `VendorApplicationManager`; transiciones de estado (aprobar/rechazar/suspender) mediante `VendorOnboardingController`.
- **Seguridad:** Los datos IBAN se cifran con AES-256-CBC (indicador `OPENSSL_RAW_DATA`). Si OpenSSL no está disponible, se devuelve una cadena vacía: el texto sin cifrar NUNCA se almacena.
- **Archivo:** `src/Admin/Vendor/PostType/VendorApplication.php`

## Resumen de la sección
- Los CPT están optimizados con `no_found_rows` y consultas meta limitadas para reducir la carga de la base de datos.
- Los registros financieros (`mhmrentiva_payout`) nunca se eliminan directamente de la base de datos; se archivan mediante un cambio de estado.
- Los registros (`mhmrentiva_app_log`) se purgan periódicamente por rendimiento.
- Las solicitudes de vendedor se almacenan en el CPT `mhmrentiva_vendor_app` (14 caracteres, dentro del límite de 20 caracteres de WP).

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 27.03.2026 | 4.23.0 | Se han añadido los CPT `mhmrentiva_addon` y `mhmrentiva_vendor_app` y detalles del marketplace de vendedores. |
| 19.03.2026 | 4.21.2 | Se han añadido detalles de `mhmrentiva_payout`, `mhmrentiva_message` y `LogRetention`. |
