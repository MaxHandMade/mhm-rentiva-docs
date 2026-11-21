---
title: "Lista de reservas del vendedor"
description: "Guía de uso y referencia técnica del shortcode de bandeja de reservas del vendedor: muestra todas las reservas realizadas sobre los vehículos del vendedor actual."
sidebar_position: 28
---
![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Función Pro
Esta página documenta una funcionalidad del complemento **MHM Rentiva Pro**. No forma parte de la edición gratuita
Lite de WordPress.org y requiere tener Pro instalado junto a Lite, además de una licencia válida.
Consulta [Ediciones — Lite frente a Pro](/docs/) para ver la división completa, o consigue Pro en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Propósito
Esta página documenta el shortcode `[rentiva_vendor_bookings]`, la bandeja de entrada del lado del vendedor que muestra todas las reservas que los clientes han hecho sobre los vehículos del vendedor actual. Se usa en el panel del vendedor (`/panel/`); no está pensado para colocarse en páginas públicas.
:::

# 📥 Reservas del vendedor (bandeja del panel del vendedor)

## Contenido
- Qué es este shortcode
- Autenticación y control por rol
- Uso en el frontend
- Referencia de atributos
- Estados vacíos
- Dónde encaja en el panel del vendedor

## Qué es este shortcode

`[rentiva_vendor_bookings]` es un **widget de panel exclusivo para vendedores**. El usuario conectado debe tener el rol `rentiva_vendor`; de lo contrario, el shortcode devuelve una cadena vacía. La salida es una lista de entradas `mhmrentiva_booking` cuyo vehículo asociado tiene un `post_author` que coincide con el usuario actual; es decir, todas las reservas que un cliente ha hecho sobre un coche que pertenece a este vendedor.

Esta **no** es la lista de «mis reservas» del lado del cliente (para eso está `[rentiva_my_bookings]`). «Mis reservas» del cliente lee las reservas que **ha hecho el usuario actual**; las reservas del vendedor leen las reservas del **inventario que pertenece al usuario actual**. Son shortcodes separados a propósito, porque las consultas del lado del vendedor también tienen que mostrar la identidad del cliente, mientras que las del lado del cliente muestran el vehículo y el vendedor.

Lo usa internamente la página del panel del vendedor en `/panel/` (el escritorio alterna entre Anuncios, Solicitudes de reserva y Libro contable y liquidaciones). Quienes creen un diseño personalizado del panel del vendedor pueden insertar este shortcode en una página restringida a Pro según lo necesiten.

## Autenticación y control por rol

Dos capas protegen la salida:

1. **Requiere autenticación.** `requires_auth = true` en el registro: los visitantes no conectados ven un aviso de «error de autenticación» mediante el filtro `mhmrentiva_shortcode_auth_error` (por defecto: «Accede para ver este contenido.»).
2. **Requiere rol.** El controlador sale con `error => 'not_vendor'` cuando el usuario actual no tiene el rol `rentiva_vendor`. La plantilla no muestra nada en ese caso.

El control de Pro se **hereda de la página**: la ubicación habitual es `/panel/`, que ya requiere la función Pro `vendor_marketplace`. Los vendedores de Lite ni siquiera tienen acceso a la página del panel.

## Uso en el frontend

```shortcode
[rentiva_vendor_bookings]
```

El shortcode solo lee un atributo, `limit`:

```shortcode
[rentiva_vendor_bookings limit="10"]
```

El flujo de la consulta:

1. Obtiene todos los ID de `mhmrentiva_vehicle` que pertenecen al vendedor actual (`post_author = $user_id`, `post_status` en `[publish, pending]`).
2. Ejecuta una consulta de `mhmrentiva_booking` que se une a esos ID de vehículo mediante el meta `_mhmrentiva_vehicle_id`.
3. Muestra la lista resultante con la identidad del cliente, el vehículo, las fechas y el estado.

La paginación se realiza en el servidor y lee `?paged=N` de la petición.

## Referencia de atributos

| Atributo | Por defecto | Tipo | Propósito |
| :--- | :--- | :--- | :--- |
| `limit` | `10` | int | Número de reservas que se muestran por página. |

## Estados vacíos

| Estado | Resultado |
| :--- | :--- |
| Vendedor sin ningún vehículo propio | Lista vacía con la indicación «aún no hay inventario» |
| Vendedor con vehículos pero sin ninguna reserva | Lista vacía con la indicación «aún no hay reservas» |
| Usuario que no es vendedor | Cadena vacía (sin aviso) |
| Usuario no conectado | Aviso de error de autenticación (filtrado mediante `mhmrentiva_shortcode_auth_error`) |

## Dónde encaja en el panel del vendedor

El panel del vendedor en `/panel/` se compone de tres secciones (`/hesabim/` del cliente y `/panel/` del vendedor son rutas separadas a propósito):

| Sección del panel | Shortcode |
| :--- | :--- |
| Anuncios | `[rentiva_vehicle_submit]` (añadir/editar) + lista nativa de vehículos del vendedor |
| Solicitudes de reserva | `[rentiva_vendor_bookings]` ← **esta página** |
| Libro contable y liquidaciones | `[rentiva_vendor_ledger]` ([referencia](./vendor-ledger)) |

El equivalente del lado del cliente es `[rentiva_my_bookings]` ([referencia](./my-bookings)): ese se ejecuta sobre el meta `_mhmrentiva_customer_user_id`, y este sobre el autor del vehículo.

## Ver también

- [Shortcode del libro contable del vendedor](./vendor-ledger): lista de transacciones financieras del vendedor
- [Formulario de solicitud de vendedor](./vendor-apply): alta de vendedores
- [Perfil público del vendedor](./vendor-profile): la página pública que genera confianza
- [Shortcode «mis reservas» del cliente](./my-bookings): la contraparte del lado del cliente (flujo de consulta distinto)
- [Alta de vendedores](/docs/vendor/onboarding): guía operativa
