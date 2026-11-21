---
id: setup-wizard
title: "Asistente de configuración"
sidebar_label: "Asistente de configuración"
sidebar_position: 15
slug: /features-usage/setup-wizard
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

El asistente de configuración te guía para preparar MHM Rentiva en una nueva instalación de WordPress y configurar sus ajustes. Puedes volver a abrir este asistente en cualquier momento desde **MHM Rentiva > Asistente de configuración**. Tiene cinco pasos numerados, cada uno mostrado como una tarjeta: Comprobación del sistema, Páginas necesarias, Ajustes de correo electrónico, Página pública y visualización, y Resumen y pruebas.

---

## Paso 1: Requisitos del sistema (Comprobación del sistema)

Analiza tu entorno de WordPress para confirmar que Rentiva puede funcionar de forma fiable. Cada fila muestra el valor actual, el valor recomendado y un estado. Resuelve todo lo que esté marcado como obligatorio antes de continuar:

- **WooCommerce:** Se comprueba que esté instalado y activo (obligatorio).
- **Versión de PHP:** Se compara con la mínima que requiere el plugin (PHP 8.1+).
- **Versión de WordPress:** Se compara con la mínima que requiere el plugin (WordPress 7.0+).
- **Versión de la base de datos:** Se recomienda MySQL 5.7+ o MariaDB 10.3+.
- **Límite de memoria de PHP:** Se recomiendan 256 MB. Por debajo de ese valor, el paso muestra una nota con la línea que debes añadir a `wp-config.php`.
- **PHP `max_execution_time`:** *Advertencia* por debajo de 60 segundos; auméntalo para importaciones grandes.
- **HTTPS / SSL:** *Advertencia* si no se detecta un certificado SSL válido.
- **WP-Cron:** *Advertencia* si WP-Cron está desactivado; los correos programados y los recordatorios lo necesitan, o bien una tarea cron real del servidor.
- **Entrega de correo electrónico:** *Advertencia* si no se detecta ningún proveedor SMTP.

Las versiones mínimas de PHP y WordPress se leen del propio plugin, por lo que este paso siempre coincide con los requisitos reales del plugin.

---

## Paso 2: Páginas necesarias

Rentiva utiliza páginas personalizadas de WordPress para la búsqueda, los detalles del vehículo, la reserva y el contacto (páginas de shortcodes). Puedes crear estas páginas con el botón **Crear páginas que faltan** o usar **Abrir páginas de shortcodes** para enlazar páginas existentes. Las páginas que configura el asistente (con sus URL recomendadas) son:

1. **Formulario de reserva** (`[rentiva_booking_form]`) -> `/rentiva/booking-form/`
2. **Búsqueda unificada** (`[rentiva_unified_search]`) -> `/rentiva/search/`
3. **Resultados de búsqueda** (`[rentiva_search_results]`) -> `/rentiva/search-results/`
4. **Detalles del vehículo** (`[rentiva_vehicle_details]`) -> `/rentiva/vehicle/`
5. **Lista de vehículos** (`[rentiva_vehicles_list]`) -> `/rentiva/vehicles/`
6. **Formulario de contacto** (`[rentiva_contact]`) -> `/rentiva/contact/`

:::info Páginas opcionales
Las páginas **Cuadrícula de vehículos** (`[rentiva_vehicles_grid]`) y **Comparación de vehículos** (`[rentiva_vehicle_comparison]`) son opcionales y el asistente no las exige. Puedes crearlas manualmente según las necesites.
:::

Junto a cada página se muestra el estado «Presente» o «Falta», junto con un enlace «Editar» para las páginas existentes.

---

## Paso 3: Ajustes de correo electrónico y notificaciones

La pantalla en la que configuras los datos del remitente y las notificaciones automáticas por correo electrónico de las reservas.
*El asistente advierte de antemano que el sistema de correo predeterminado de WordPress puede no ser fiable y recomienda un plugin SMTP como WP Mail SMTP o Fluent SMTP.*

**Campos de configuración:**
- **Nombre del remitente** y **Correo electrónico del remitente:** El nombre y la dirección que se usan en los correos enviados a los clientes.
- **Dirección de respuesta (Reply-To):** A dónde va el correo cuando un cliente hace clic en «Responder».
- **Modo de prueba** y **Dirección de correo de prueba:** Mientras el modo de prueba está activado, todos los correos se envían solo a la dirección de prueba. Desactívalo antes de pasar a producción.

**Opciones de automatización:**
- **Envío de correos activado**
- **Envío automático de correos activado** (por ejemplo, cuando cambia el estado de una reserva)
- **Registrar los correos en el tipo de entrada de registro de correos:** guarda un registro de los correos enviados.

---

## Paso 4: Página pública y visualización

Ajustes básicos de importes, duración y color que aparecen en la parte visible para el cliente, en los formularios de reserva y en las tarjetas de vehículos:

- **Moneda y posición de la moneda:** *MHM Rentiva se integra con WooCommerce.* Con WooCommerce activo, el asistente muestra «Gestionado por WooCommerce: …» y no cambia la moneda; un enlace te lleva a los ajustes de WooCommerce si necesitas cambiarla.
- **Días de alquiler predeterminados:** La duración de alquiler predeterminada que aparece rellenada en los formularios (1–30).
- **Días mínimos de alquiler:** El número mínimo de días que aceptará el sistema.
- **Días máximos de alquiler:** Un límite que evita alquileres excesivamente largos.
- **Color de acento:** El mismo ajuste que **Ajustes > Página pública y visualización > Colores** (Automático o Personalizado, con vista previa).

:::info Cambiado en 6.4.0
Los interruptores «Mostrar insignias de características» y «Mostrar insignia de disponibilidad» de las tarjetas de vehículos se han eliminado; ahora se controlan mediante parámetros del shortcode (`show_features`, `show_badges`, etc.).
:::

---

## Paso 5: Resumen y pruebas

Muestra cada paso con su estado. Si tu estructura de enlaces permanentes es «Simple», un aviso te pide que la cambies (por ejemplo, a «Nombre de la entrada») para que funcionen las páginas públicas. Usa **Abrir ajustes**, **Revisar páginas de shortcodes** o **Enviar correo electrónico de prueba** para comprobarlo todo y, después, pulsa **Completar configuración**.

---

### Resumen de la sección
- El asistente de configuración empieza con una comprobación del sistema y usa WooCommerce para la moneda, lo que te proporciona una base sólida.
- Una vez completado el asistente, las páginas necesarias, los shortcodes y la automatización del correo electrónico están listos.

### Registro de cambios
| Fecha | Versión | Nota |
| :--- | :--- | :--- |
| 18.11.2026 | 6.4.0 | El asistente refleja los cinco pasos reales (el paso de la licencia no forma parte del asistente); se añade el color de acento; se actualizan los pasos de correo electrónico y visualización; los mínimos se leen del plugin. |
| 23.04.2026 | 4.27.2 | Documentación sincronizada con la versión actual del plugin. |
| 27.03.2026 | 4.22.1 | Lista de páginas necesarias actualizada: se añade `rentiva_vehicle_details` y se eliminan `rentiva_vehicles_grid` y `rentiva_vehicle_comparison` (ahora opcionales). De 7 a 6 páginas. |
| 19.03.2026 | 4.21.2 | Guía de uso creada. |
