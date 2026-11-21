---
slug: rentiva-pro-v6.4.0-release
title: "Rentiva Pro 6.4.0: las transferencias cobran el anticipo que configuras, el carrito de transferencias se calcula en el servidor y vistas previas seguras en los editores"
authors: [maxhandmade]
tags: [release, rentiva, pro, transfer, payments, elementor, security]
date: 2026-10-24T06:30
---

6.4.0 hace que las transferencias cobren lo que indican tus ajustes. El carrito de transferencias ahora calcula el precio de cada transferencia en el servidor y cobra el anticipo configurado en Ajustes > Transferencia; antes, tomaba el precio del navegador y siempre cobraba el importe completo. Los widgets de Pro muestran vistas previas seguras en los editores, y los correos electrónicos de Pro reciben nombres traducidos y el idioma del sitio. No se ejecuta ningún paso de base de datos al actualizar. **Actualiza primero MHM Rentiva (Lite) a 6.3.0 y después Pro.** Junto a Rentiva 6.2.1 o anterior, Pro 6.4.0 desactiva sus funciones hasta que se actualice Rentiva, así que haz las dos actualizaciones una tras otra.

<!--truncate-->

:::caution Revisa los anticipos de tus transferencias
Las transferencias ahora cobran el anticipo que configuras en **Ajustes > Transferencia** en lugar del importe completo. **Prevalece el porcentaje de anticipo propio del vehículo:** un vehículo que guarda su propio porcentaje (el antiguo valor por defecto escribía 10) cobra ese anticipo también en las transferencias, incluso cuando el ajuste de transferencia es «Pago completo obligatorio». Vacía el campo de anticipo del vehículo para que siga el ajuste de transferencia. **La comisión del vendedor se calcula sobre el importe cobrado en línea**, así que en una transferencia de ese tipo se calcula sobre el anticipo; un importe restante cobrado fuera de línea no genera ningún registro de comisión.
:::

## Las transferencias cobran lo que indican tus ajustes

- **Se aplica el ajuste de anticipo de transferencia.** Independientemente de lo que se eligiera en Ajustes > Transferencia («Tipo de pago» / «Porcentaje de anticipo (%)»), las transferencias se cobraban por completo. El carrito ahora cobra el anticipo que configuras.
- **El porcentaje de anticipo propio de un vehículo prevalece sobre el ajuste de transferencia**, igual que en los alquileres; consulta el recuadro anterior.
- **Los vehículos de vendedores** ya no reciben un anticipo fijo del 20 %; siguen el ajuste general del sitio.
- En Ajustes > Transferencia, el campo del porcentaje de anticipo empieza en 1 (elige «Pago completo obligatorio» para no cobrar anticipo), y la pantalla explica que prevalece el porcentaje propio del vehículo.
- Los tipos de ubicación personalizados guardados en la pestaña Transferencia ahora surten efecto; un valor guardado antiguo ya no los oculta.

## Un carrito de transferencias calculado en el servidor

- **El precio de cada transferencia se calcula en el servidor.** Se ignora cualquier precio enviado por el navegador.
- **No se puede añadir un vehículo que la búsqueda de transferencias no ofrece para esa ruta**: no disponible para transferencias, ocupado, ruta no asignada o demasiado pequeño.
- **El formulario de vehículo del vendedor ya no acepta un valor de anticipo que no muestra.** Un vendedor podía enviarlo manualmente y reducir tanto el anticipo como la base de la comisión.
- **Las líneas del carrito y del pedido indican «Transferencia VIP: A ➝ B»** en el carrito de bloques, el minicarrito y el pedido guardado, en lugar del nombre genérico de reserva. Cada servicio adicional aparece una sola vez con su precio, la fila adicional «Total de servicios adicionales» ha desaparecido, la fila de la fecha de devolución se oculta en todos los idiomas del sitio y la fila «Duración» de los pedidos ahora es «Duración estimada», como en el carrito.

## Elementor y los editores

- **Los widgets de Elementor Resultados de transferencias (11 ajustes) y Mis mensajes (1 ajuste)** tienen una sección «Ajustes adicionales» con los mismos ajustes que sus bloques. Los valores por defecto equivalen a la salida actual, así que las páginas guardadas se ven igual.
- **Vistas previas seguras.** En los editores de Elementor y de bloques, Resultados de transferencias, Perfil del vendedor, Mis mensajes, Búsqueda de transferencias, Rutas populares y Directorio de vendedores se muestran dentro del mismo marco de vista previa que los widgets de Rentiva. Hasta que eliges ubicaciones de búsqueda o un vendedor, muestran transferencias de ejemplo, un vendedor de ejemplo y conversaciones de mensajes de ejemplo con una nota; las ubicaciones elegidas ejecutan una búsqueda real y un vendedor elegido muestra ese perfil. Tus propios mensajes nunca aparecen y los formularios están inactivos. Perfil del vendedor explica cuándo no se encuentra ningún vendedor en lugar de mostrar un recuadro vacío.
- **Los bloques de Pro están traducidos** y se encuentran en la categoría «Rentiva» junto con los bloques de Rentiva. Se ha eliminado el prefijo «MHM » de los nombres de los widgets y bloques de Pro, y han cambiado dos títulos de bloque: «Mensajes» ahora es «Mis mensajes» y «Rutas de transferencia populares» ahora es «Rutas populares».

## Correos electrónicos

- **La vista previa de correos electrónicos muestra las 31 plantillas de Pro con su nombre traducido** (aparecían «Vendor approved», «Payout approved», etc. en inglés), cada una rellenada con datos de ejemplo de vendedor, pago al proveedor, comisión, informe y mensaje en lugar de huecos vacíos.
- **Los correos electrónicos de Pro usan el idioma del sitio**, junto con los de Rentiva, incluso mientras trabaja un administrador con otro idioma en su perfil.

## Correcciones

- La exportación de datos personales vuelve a incluir los vehículos favoritos del cliente.
- Los mensajes de error de la pantalla Mis mensajes muestran su texto; cuatro de ellos estaban vacíos.
- Resultados de transferencias ya no ofrece un resultado en caché obsoleto cuando los ajustes cambian dos veces en el mismo segundo, y su ajuste `columns` tiene un mínimo de 1, así que 0 o un valor no numérico ya no producen una cuadrícula vacía.
- La unidad de duración de la transferencia («min») está traducida.
- **Turco:** «Deposit Rate (%)» ahora dice «Kapora oranı», «Full Payment Required» dice «Tam ödeme gerekli», las cadenas de correo electrónico dicen «etkin» y la terminología de recogida / devolución ha pasado a «Teslim alma / Dönüş».

:::caution Limitación conocida (sin cambios desde 6.3.0)
Un vendedor cuyo IBAN no se pudo leer tras la actualización a 6.3.0 no puede solicitar un pago al proveedor hasta que se vuelva a introducir el IBAN, y 6.4.0 sigue sin tener un formulario para introducirlo. El aviso de administración muestra cada uno de esos vendedores.
:::

## Para desarrolladores

Requiere MHM Rentiva 6.3.0 (antes 6.2.0). Eliminado: una antigua página de ajustes de transferencia a la que no llegaba ningún menú ni enlace, su gestor de guardado y la acción `admin_post_mhmrentiva_save_transfer_settings`. El carrito de transferencias solo lee las claves `mhmrentiva_transfer_deposit_*` de la pestaña Transferencia, ya no `rentiva_transfer_deposit_*`. Pro se engancha a `mhmrentiva_cart_item_name`, `mhmrentiva_email_template_labels`, `mhmrentiva_email_preview_context` y `mhmrentiva_parity_labels` de Rentiva. Los filtros `_html` de Directorio de vendedores, Perfil del vendedor y Rutas populares ahora también reciben las salidas vacías tempranas, con atributos normalizados.

---

**Dónde conseguirlo.** Pro 6.4.0 está publicado en GitHub como `v6.4.0` y se distribuye mediante la descarga de Rentiva Pro en wpalemi.com. Actualiza primero [Rentiva a 6.3.0](/blog/rentiva-v6.3.0-release). El registro de cambios completo se incluye con el plugin en ambos idiomas.
