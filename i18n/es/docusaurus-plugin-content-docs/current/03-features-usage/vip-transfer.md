---
id: vip-transfer
title: "Módulo de transferencia VIP"
sidebar_label: "Transferencia VIP"
sidebar_position: 10
slug: /features-usage/vip-transfer
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Función Pro
Esta página documenta una funcionalidad del complemento **MHM Rentiva Pro**. No forma parte de la edición gratuita
Lite de WordPress.org y requiere tener Pro instalado junto a Lite, además de una licencia válida.
Consulta [Ediciones: Lite frente a Pro](/docs/) para ver la división completa, o consigue Pro en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

El módulo de transferencia VIP está diseñado para gestionar servicios de transporte con conductor (transferencias al aeropuerto, viajes interurbanos, etc.) de forma independiente de los alquileres de vehículos estándar. Este módulo se basa en precios por ruta y en el control de capacidad.

---

## Rutas de traslado

Usa **MHM Rentiva > Rutas de traslado** para definir los puntos a los que das servicio y los precios entre esos puntos.

### 1. Definición de ubicaciones
Crea los puntos donde empiezan o terminan las transferencias (aeropuerto, hotel, centro de la ciudad, etc.).
- **Consejo:** No olvides introducir las coordenadas de las ubicaciones para la integración con el mapa.

### 2. Ruta y precios
Define la ruta principal entre dos ubicaciones.
- **Tarifa fija:** Establece un cargo fijo por ruta (`base_price`).
- **Precio máximo:** El límite de precio que pueden establecer los vendedores (`max_price`). *(v4.23.0)*
- **Por kilómetro:** Precios dinámicos que cambian a medida que aumenta la distancia.
- **Precio del vendedor:** En una estructura multivendedor, cada vendedor puede establecer su propio precio para la ruta. *(v4.23.0)*

---

## Capacidad y compatibilidad de vehículos

El factor más importante en las reservas de transferencia es el número de pasajeros y de equipaje.
- **Número de pasajeros:** El filtrado se basa en la capacidad de asientos indicada en el registro del vehículo.
- **Capacidad de equipaje:** El número de maletas indicado en el formulario de reserva se compara con el volumen de equipaje del vehículo.

:::warning Importante
Si un vehículo es un «Minibús VIP» con capacidad para 8 personas, no aparecerá en los resultados cuando busque un grupo de 10 personas.
:::

---

## Motor de búsqueda por rutas (v4.23.0)

El motor de búsqueda de transferencias se reconstruyó en la v4.23.0:
- Los vehículos se filtran según las rutas que coinciden con los puntos de recogida y devolución seleccionados.
- Si existe un precio del vendedor, se utiliza ese; si no, se aplica como alternativa el `base_price` de la ruta.
- La capacidad de pasajeros y de equipaje se verifica automáticamente.

---

## Flujo del usuario y reserva

1. **Búsqueda:** El usuario selecciona un punto de recogida y de devolución, la fecha/hora y el número de pasajeros.
2. **Selección del vehículo:** Se muestran los vehículos que coinciden con la ruta y la capacidad, con los precios de los vendedores.
3. **Pago:** El pago se completa a través de WooCommerce.
4. **Confirmación:** Aparece una reserva de tipo «Transferencia» en el panel de administración.

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>IMAGEN PRÓXIMAMENTE: Formulario de búsqueda de transferencias</strong><br/>
  <em>Vista en la parte pública del motor de búsqueda de transferencias.</em>
</div>

---

## Nota técnica: hooks y filtros

Los desarrolladores pueden modificar los precios de las transferencias o añadir reglas adicionales:

```php
// To filter the transfer price:
add_filter('mhmrentiva_transfer_price', function($price, $route_id) {
    // Custom campaign logic
    return $price * 0.9; 
}, 10, 2);
```

---

### Resumen de la sección
- **Transferencia** es un módulo centrado en rutas y capacidad.
- Los **precios** pueden ser fijos o basados en la distancia.
- Los **límites de capacidad** (pasajeros/equipaje) los aplica automáticamente el sistema.

### Registro de cambios
| Fecha | Versión | Nota |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Documentación sincronizada con la versión actual del plugin. |
| 26.03.2026 | 4.23.0 | Se añadieron el motor de búsqueda por rutas, los precios de vendedor, max_price y la jerarquía Ciudad-a-Punto. |
| 18.03.2026 | 4.21.2 | Contenido actualizado al modelo híbrido. |
| 26.02.2026 | 4.21.0 | Versión inicial creada. |
