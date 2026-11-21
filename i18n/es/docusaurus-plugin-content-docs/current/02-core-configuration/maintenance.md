---
id: maintenance
title: "Mantenimiento y limpieza de la base de datos"
sidebar_label: "Limpieza de la base de datos"
sidebar_position: 14
slug: /core-configuration/maintenance
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Eliminar periódicamente los datos innecesarios y optimizar las tablas de la base de datos es fundamental para el rendimiento del sistema a largo plazo. Estas operaciones se gestionan desde la pestaña **MHM Rentiva > Ajustes > Limpieza de la base de datos**.

---

## 🧹 Herramientas de limpieza de la base de datos

El panel tiene seis botones que puedes ejecutar con un solo clic:

1.  **Analizar base de datos:** Examina la base de datos y rellena el **Informe de limpieza de la base de datos** de más abajo (después, el botón muestra *Analizar integridad*).
2.  **Limpiar metadatos huérfanos:** Elimina los metadatos que han quedado de vehículos o reservas eliminados.
3.  **Limpiar transitorios caducados:** Borra los datos temporales (transitorios) del sistema que han caducado.
4.  **Optimizar carga automática:** Optimiza las opciones `autoload` que WordPress carga en cada petición, lo que mejora la velocidad.
5.  **Optimizar tablas:** Recupera el espacio sobrante en las tablas de MySQL y actualiza los índices.
6.  **Purgar registros antiguos:** Borra de forma permanente los registros y las entradas de la cola con más de 30 días de antigüedad.

Las **claves meta no válidas** se limpian desde el propio informe: tras un análisis, la fila *Claves meta no válidas* muestra un botón **Limpiar** cuando hay algo que eliminar. Desde la versión 6.1.5, esta limpieza no toca las claves bajo `_mhmcs_`: pertenecen a MHM Currency Switcher (los precios fijos de cada producto y, cuando los pedidos se guardan como entradas, la moneda y el tipo de cambio registrados en cada pedido), no a Rentiva.

:::info Sin copia de seguridad no se borra nada (6.1.5)
Las limpiezas de metadatos no válidos, metadatos huérfanos y registros antiguos copian primero lo que van a eliminar en una tabla de copia de seguridad. Si esa tabla de copia de seguridad no se puede crear o rellenar, la limpieza **no borra nada**, te indica el motivo y elimina la tabla de copia de seguridad que no ha podido rellenar. Las copias de seguridad que crea cada ejecución aparecen en **Copias de seguridad incrementales de limpieza**.
:::

---

### 🖼️ IMAGEN: PANEL DE LIMPIEZA DE LA BASE DE DATOS
*(Pestaña Ajustes > Limpieza de la base de datos y tabla del informe de limpieza)*

---

## 💾 Instantánea del sistema (copia de seguridad)

Antes de realizar cualquier operación crítica, puedes hacer una copia de seguridad completa de todos tus datos de alquiler (vehículos, definiciones, reservas).

- **Almacenamiento seguro:** Las copias de seguridad se guardan en un directorio protegido sin acceso web público.
- **Restaurar (reversión):** Si se produce un error, puedes volver a un estado anterior con un solo clic desde la lista «Copias de seguridad incrementales de limpieza».

:::caution Advertencia importante
Las operaciones de limpieza no se pueden deshacer. Crea siempre una copia de tu sistema con el botón **«Iniciar instantánea»** antes de continuar.
:::

---

## 📊 Informe de limpieza de la base de datos

Tras una operación, el sistema ofrece un informe detallado que muestra cuántos datos (en número y tamaño) se han limpiado en cada categoría.

### Seguimiento de tablas personalizadas
Desde esta pantalla puedes supervisar en tiempo real el número de filas y el tamaño en disco de las tablas propias del plugin, como `payment_log`, `transfer_routes` y `message_logs`.

---

## Desinstalación y limpieza de tablas

Cuando el plugin se elimina por completo (se borra), el desinstalador borra su contenido y elimina sus propias tablas.

**Contenido que borra.** Los vehículos, las reservas, los servicios adicionales, los mensajes de contacto y los dos tipos de registro son entradas de WordPress, no tablas, y se borran como entradas: `mhmrentiva_vehicle`, `mhmrentiva_booking`, `mhmrentiva_addon`, `mhmrentiva_contact`, `mhmrentiva_app_log`, `mhmrentiva_email_log`. Los registros que todavía usan los tipos de entrada anteriores a la 6.0.0, `vehicle` y `vehicle_booking`, se borran junto con ellos.

**Tablas que elimina.**

- Cola e informes: `mhmrentiva_queue`, `mhmrentiva_report_queue`, `mhmrentiva_notification_queue`
- Valoraciones: `mhmrentiva_ratings`
- Registros de pago: `mhmrentiva_payment_log`
- Sesiones: `mhmrentiva_sessions`
- Registros de mensajes: `mhmrentiva_message_logs`
- Control multisitio: `mhmrentiva_tenants`, `mhmrentiva_usage_metrics`
- Copias de recuperación: `mhmrentiva_backup_records`
- Ubicaciones de transferencia: `rentiva_transfer_locations` (+ heredada `mhm_rentiva_transfer_locations`)
- Rutas de transferencia: `rentiva_transfer_routes` (+ heredada `mhm_rentiva_transfer_routes`)

También se eliminan las grafías anteriores a la 6.0.0 de estos nombres, y cualquier otra cosa que quede con el prefijo de tabla propio del plugin, `mhmrentiva_`, se elimina después.

:::info Las seis tablas del complemento NO se eliminan
El libro de comisiones, la política de comisiones, los informes de vendedores, las tareas en segundo plano, el registro de auditoría de pagos a proveedores y el registro de claves pertenecen al complemento de pago, y eliminar Lite no los toca. Contienen un historial financiero de solo anexado, y puede que un sitio que elimina Lite vaya a reinstalarlo. Cada plugin elimina sus propios datos; desinstala el complemento para eliminarlos.
:::

:::caution
La desinstalación no se puede deshacer. Los datos de vehículos, reservas y transferencias se borran de forma permanente.

**Las cuentas de clientes se conservan.** Los clientes son usuarios de WordPress, y el desinstalador no borra usuarios ni los datos de su perfil, solo las reservas que hacían referencia a ellos.
:::

---

## Gestión de la caché

La caché del sistema se gestiona desde el acordeón **Caché** de la pestaña **Mantenimiento**. Esta sección la genera `MaintenanceSettings::render_group_cache()` y ofrece un único punto de control (el problema de renderizado duplicado se resolvió en la v4.22.1).

---

### Resumen de la sección
- Realiza una **limpieza periódica** para evitar que la base de datos crezca en exceso.
- El sistema de **instantáneas** ofrece una red de seguridad antes de cada operación.
- Los registros se pueden configurar para que se limpien automáticamente al cabo de 30 días.

### Registro de cambios
| Fecha | Versión | Nota |
| :--- | :--- | :--- |
| 17.09.2026 | 6.1.5 | Las etiquetas de las herramientas coinciden con la pantalla; documentadas la limpieza de metadatos no válidos, las claves de Currency Switcher y la regla de no borrar sin copia de seguridad. |
| 23.04.2026 | 4.27.2 | Añadida la traducción al inglés. |
| 27.03.2026 | 4.22.1 | Añadidas 5 tablas que faltaban al desinstalador. Sección de caché documentada como único punto de renderizado. |
| 19.03.2026 | 4.21.2 | Añadidos detalles de limpieza de la base de datos y copias de seguridad. |
