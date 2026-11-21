---
id: post-install-checklist
title: "Lista de comprobación posterior a la instalación"
sidebar_label: "Lista de comprobación"
sidebar_position: 4
---

![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Documentación](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Después de completar los pasos de instalación y el asistente de configuración, sigue la lista de comprobación siguiente para asegurarte de que tu sitio funciona por completo. Esta lista es el último control de seguridad antes de empezar a aceptar reservas reales.

---

### 🛠️ Comprobación de la configuración
- [ ] **Ajustes guardados:** Se han revisado y guardado todas las pestañas de la página `MHM Rentiva > Settings`.
- [ ] **Moneda:** La moneda y su símbolo se muestran correctamente en la pestaña `General Settings`.
- [ ] **Fecha y hora:** La zona horaria de tu sitio (`Settings > General`) coincide con la ubicación de tu negocio.
- [ ] **Licencia:** Se ha confirmado que tu clave aparece como «Activo» en la página `License`.

### 📄 Páginas y shortcodes
- [ ] **Asignación de páginas:** Cada función (Búsqueda, Listado, Detalle, Pago, Mi cuenta) está asignada a la página correcta en `Settings > Shortcode Pages`.
- [ ] **Prueba de visualización:** Estas páginas generadas se abren correctamente y sin errores en la parte pública.
- [ ] **Integración en el menú:** Las páginas del panel del cliente (Mi cuenta) y de búsqueda se han añadido al menú principal.

### 💰 Pagos y finanzas
- [ ] **Pasarelas de pago:** Se han activado los métodos de pago de WooCommerce (Stripe, PayPal, transferencia bancaria, etc.).
- [ ] **Pago de prueba:** Se ha completado al menos un pago de reserva correctamente en modo Sandbox/prueba.
- [ ] **Cálculo de precios:** Los precios diarios de los vehículos y los servicios adicionales se reflejan correctamente en el carrito.

### 📧 Sistema de notificaciones
- [ ] **Correo electrónico de prueba:** Se ha enviado un correo electrónico de prueba mediante `Settings > Email Templates`.
- [ ] **Verificación SMTP:** Los correos electrónicos llegan a los destinatarios sin acabar en la carpeta de spam (se recomienda SMTP).
- [ ] **Notificaciones al administrador:** Se envía una notificación por correo electrónico al administrador cuando se recibe una nueva reserva.

### 🚗 Gestión de vehículos e inventario
- [ ] **Vehículo de ejemplo:** Se ha añadido al sistema al menos un vehículo con atributos reales.
- [ ] **Categorías:** Los vehículos se han agrupado por clase (Económico, SUV, VIP, etc.).
- [ ] **Comprobación del calendario:** El calendario de disponibilidad del vehículo se actualiza correctamente después de una reserva.

---

## Verificación técnica (para desarrolladores)

Si encuentras algún problema técnico, comprueba lo siguiente:

1. **Enlaces permanentes:** Visita `Settings > Permalinks` y haz clic en «Guardar cambios» para regenerar las reglas de reescritura (`flush_rewrite_rules`).
2. **Sincronización con WooCommerce:** Usa los registros de `WooCommerceBridge` para verificar que Rentiva está enviando datos al carrito de WooCommerce.
3. **Comprobación de la base de datos:** Puedes verificar los datos de las sesiones activas en la tabla `wp_mhmrentiva_sessions` mediante phpMyAdmin.

---

### Resumen de la sección
- La lista de comprobación consta de **5 categorías principales**.
- Es fundamental completar un pago de prueba **antes de pasar a producción**.
- **Regenerar los enlaces permanentes** resuelve muchos errores relacionados con las páginas.

### Registro de cambios
| Fecha | Versión | Nota |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 18.03.2026 | 4.21.2 | Se ha renovado la estructura de la lista de comprobación con iconos y categorías modernos. |
| 26.02.2026 | 4.21.0 | Se ha creado la versión inicial. |
