---
id: locations
title: "Gestión de ubicaciones"
sidebar_label: "Gestión de ubicaciones"
sidebar_position: 7
slug: /features-usage/locations
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

La gestión de ubicaciones es donde defines los puntos físicos (aeropuerto, oficina, hotel, etc.) para tus operaciones de alquiler de vehículos y de transferencia. Accede a ella desde **MHM Rentiva > Ubicaciones**.

Los vehículos y las rutas de transferencia del sistema se basan en estas ubicaciones.

---

## 📍 Añadir una nueva ubicación y sus detalles

Al definir una ubicación, introduce la siguiente información:

- **Nombre de la ubicación:** El título que verá el cliente (p. ej., Aeropuerto de Estambul (IST)).
- **Tipo de ubicación:** Selección de categoría, como aeropuerto, hotel u oficina.
- **Ciudad:** La ciudad a la que pertenece la ubicación. Este campo es fundamental para la **jerarquía Ciudad → Punto**. Los vendedores solo pueden ver las ubicaciones y rutas de su propia ciudad. *(Añadido en la v4.23.0)*
- **Dirección y coordenadas:** La posición exacta en el mapa (necesaria para la integración con Google Maps).
- **Horario de apertura:** Las franjas horarias en las que esta ubicación está abierta para la recogida y la devolución de vehículos.
- **Tarifas adicionales:** Aquí se configuran las tarifas de entrega/devolución (solo ida) específicas de cada ubicación.

---

### 🖼️ IMAGEN: PANEL DE GESTIÓN DE UBICACIONES
*(Lista de ubicaciones y formulario de alta de una nueva ubicación)*

---

## 🚘 Asignación de vehículos

Puedes «asignar» cada vehículo a una o varias ubicaciones. Así, cuando un cliente selecciona el Aeropuerto de Estambul, solo se muestran los vehículos que dan servicio en esa zona.

---

## 🗺️ Conexión con las transferencias

Las ubicaciones constituyen los puntos de recogida y de destino del módulo de transferencia VIP. No se puede crear una ruta de transferencia hasta que se haya definido una ubicación aquí.

### Jerarquía Ciudad → Punto (v4.23.0)

A partir de la v4.23.0, cada ubicación tiene un campo **ciudad**. Esta jerarquía permite lo siguiente:
- **Administrador:** Puede ver y editar todas las ubicaciones y rutas.
- **Vendedor:** Solo puede ver las ubicaciones de la ciudad indicada en su solicitud. El formulario de envío de vehículos solo muestra las ubicaciones y rutas de su propia ciudad.
- **Motor de búsqueda:** El filtrado por rutas muestra al cliente únicamente los vehículos activos de la ciudad correspondiente.

:::tip Base de datos
Esta función se basa en la columna `city` VARCHAR(100) introducida con `DatabaseMigrator v3.4.0`.
:::

---

### Resumen de la sección
- **Define los puntos:** Delimita tus zonas de operación.
- **Horario de apertura:** Bloquea las entregas fuera de horario o define recargos.
- **Inventario por ubicación:** Muestra tus vehículos en las regiones adecuadas.

### Registro de cambios
| Fecha | Versión | Nota |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Documentación sincronizada con la versión actual del plugin. |
| 26.03.2026 | 4.23.0 | Se añadió la documentación del campo Ciudad y de la jerarquía Ciudad→Punto. |
| 19.03.2026 | 4.21.2 | Se creó la guía de uso de la gestión de ubicaciones. |
