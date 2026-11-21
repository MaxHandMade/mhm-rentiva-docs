---
id: transfer-routes
title: "Rutas de traslado y gestión de rutas"
sidebar_label: "Rutas de traslado"
sidebar_position: 8
slug: /features-usage/transfer-routes
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Función Pro
Esta página documenta una funcionalidad del complemento **MHM Rentiva Pro**. No forma parte de la edición gratuita
Lite de WordPress.org y requiere tener Pro instalado junto a Lite, además de una licencia válida.
Consulta [Ediciones: Lite frente a Pro](/docs/) para ver la división completa, o consigue Pro en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

En Rutas de traslado defines las rutas principales de tu servicio de transferencia VIP y los precios de esas rutas. Accede desde **MHM Rentiva > Rutas de traslado**.

Aquí creas las conexiones entre los puntos que definiste previamente en [Gestión de ubicaciones](./locations.md).

---

## Creación de rutas (definición de rutas)

Una ruta expresa la relación entre al menos dos ubicaciones:

- **Punto de recogida:** El punto donde el vehículo recoge al pasajero.
- **Punto de destino:** El punto principal donde se deja al pasajero.
- **Ruta de vuelta:** Permite guardar en el sistema la ruta inversa (p. ej., Aeropuerto-Hotel y Hotel-Aeropuerto).

---

## Precios y cargos adicionales

El precio de alquiler de una ruta cambia de forma dinámica según las solicitudes del cliente:

- **Tarifa fija:** Un importe fijo por ruta (`base_price`).
- **Precio máximo (v4.23.0):** El límite de precio fijado por el administrador para una ruta (`max_price`). Los vendedores pueden establecer sus propios precios dentro de este rango.
- **Precio por kilómetro:** Una tarifa que aumenta a medida que crece la distancia.
- **Límite de pasajeros/equipaje:** El precio cambia o el vehículo se excluye de los resultados de búsqueda según la capacidad (p. ej., 8 personas).
- **Tarifa nocturna:** Un multiplicador de recargo que se aplica en determinadas horas (p. ej., 00:00 - 06:00) (p. ej., 1,25x).

### Modelo de precios para vendedores (v4.23.0)

En una estructura multivendedor, cada vendedor puede establecer su propio precio específico por ruta dentro del rango `min_price` — `max_price` definido por el administrador:

- **El administrador** define `base_price` y `max_price` al crear una ruta.
- **El vendedor** introduce su precio dentro de este rango para las rutas que cubre en el formulario de envío de vehículos.
- **El motor de búsqueda** usa el precio del vendedor al filtrar por ruta; si no hay precio del vendedor, recurre al `base_price` de la ruta.
- Los precios de los vendedores se guardan como JSON en la clave meta `_mhmrentiva_transfer_route_prices`.

---

### 🖼️ IMAGEN: GESTIÓN DE RUTAS DE TRASLADO
*(Lista de rutas, tabla de precios y restricciones de capacidad)*

---

## Motor de búsqueda de transferencias (v4.23.0)

El motor de búsqueda de transferencias incorporó en la v4.23.0 compatibilidad con el **filtrado de vehículos por ruta** y los **precios de los vendedores**:

- Durante la búsqueda se localizan las rutas que coinciden con los puntos de recogida y destino seleccionados.
- Los vehículos asignados a estas rutas se filtran por capacidad de pasajeros y equipaje.
- Los resultados muestran el precio del vendedor para la ruta; si no hay precio del vendedor, se usa el `base_price` de la ruta.

---

## Experiencia del cliente en la transferencia VIP

Cuando un cliente realiza una búsqueda en la parte pública, los vehículos se muestran a través de estas rutas:
1. **Selección de ruta:** El cliente selecciona los puntos de recogida y destino.
2. **Número de pasajeros:** Se muestran los vehículos adecuados para el tamaño del grupo (furgoneta VIP, minibús, etc.).
3. **Comparación de precios:** Se pueden comparar los precios ofrecidos por distintos vendedores para la misma ruta.
4. **Reserva:** Una vez confirmada, aparece en el panel de operaciones una reserva de tipo "Transferencia".

---

### Resumen de la sección
- Define tus servicios **de punto a punto**.
- Mantén la rentabilidad con **precios dinámicos**.
- Evita reservas de vehículos incorrectas con el **control de capacidad**.

### Registro de cambios
| Fecha | Versión | Nota |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Documentación sincronizada con la versión actual del plugin. |
| 26.03.2026 | 4.23.0 | Se añadieron el modelo de precios para vendedores, max_price, el motor de búsqueda por rutas y la jerarquía Ciudad-Punto. |
| 19.03.2026 | 4.21.2 | Se creó la guía de uso de Rutas de traslado (gestión de rutas). |
