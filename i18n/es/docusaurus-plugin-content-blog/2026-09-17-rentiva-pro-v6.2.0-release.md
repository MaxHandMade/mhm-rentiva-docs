---
slug: rentiva-pro-v6.2.0-release
title: "Rentiva Pro 6.2.0: un panel propio para los vendedores, una sola moneda en el libro contable y reembolsos que revierten la comisión exactamente"
authors: [maxhandmade]
tags: [release, rentiva, pro, vendor, payouts, money, security]
date: 2026-09-17T06:30
---

Los vendedores tienen un panel propio, y el dinero que hay detrás pasa a una base común: una sola moneda en el libro contable y reembolsos que retiran exactamente la comisión que se abonó. **Actualiza primero MHM Rentiva a la 6.1.5 y después Pro.** Si Pro encuentra una versión anterior de Rentiva, se desactiva a sí mismo con un aviso y no crea nada.

<!--truncate-->

## Un panel desde el que los vendedores pueden trabajar

Pro crea automáticamente una página **Panel del vendedor**, en la dirección `satici-panel`, con cinco secciones: Panel, Mis anuncios, Reservas, Ganancias y pagos y Valoraciones. La antigua zona de vendedor en Mi cuenta ahora redirige allí de forma permanente.

- Desde **Mis anuncios**, un vendedor pausa, reanuda, retira, renueva y vuelve a publicar un anuncio. Solo se muestran las acciones que permite el estado actual del anuncio; un anuncio que nunca se aprobó no muestra ninguna, y uno que está a la espera de su tarifa de publicación muestra *Completar el pago*. Un anuncio rechazado muestra la nota de rechazo, y un anuncio retirado conserva su historial de reservas.
- Desde **Ganancias y pagos**, un vendedor solicita un pago al proveedor. Mientras una solicitud está pendiente, el panel muestra esa solicitud en lugar del formulario.
- Un administrador puede abrir el panel para ver lo que ven los vendedores. Un vendedor suspendido ve por qué se ha interrumpido su acceso, y un solicitante cuya solicitud sigue pendiente ve su estado en lugar de ser devuelto al formulario de solicitud.

## Una sola moneda en el libro contable

El libro contable de vendedores registra ahora cada importe en **la moneda base de la tienda**, con la precisión decimal propia de la tienda, incluso cuando un visitante ha pagado en otra moneda mediante Currency Switcher. La comisión de un pedido así se convierte con **el tipo de cambio registrado en ese pedido**, y por eso esta versión necesita Rentiva 6.1.5: la 6.1.5 evita que la limpieza de la base de datos de Rentiva elimine precisamente ese tipo registrado.

Los saldos y los totales cuentan solo importes en la moneda base. Un saldo que un vendedor aún tenga en otra moneda se indica por separado en la tarjeta de saldo disponible, en lugar de sumarse sin avisar. Las columnas de importes del libro contable se amplían a cuatro decimales mediante una actualización única de la base de datos; el hash de auditoría de cada fila existente del libro contable no cambia.

## Los reembolsos retiran exactamente lo que se abonó

Un reembolso revierte ahora la comisión de forma **acumulativa**, vinculado a la comisión a la que corresponde. Cualquier serie de reembolsos parciales, incluido uno registrado antes que la propia comisión, retira exactamente lo que se abonó, en la moneda de esa comisión. Los reembolsos de un mismo pedido se procesan de uno en uno, de modo que dos que lleguen a la vez ya no pueden revertir ambos la comisión completa.

## «Total abonado» mostraba 0 tras un pago real

Los pagos al proveedor aprobados desde la pantalla de pagos se registraban con un tipo que los totales no reconocían, y como *reservados* en lugar de pagados, un estado del que nada los sacaba nunca. El «Total abonado» del vendedor mostraba 0 y las ganancias contaban el pago como negativo. Ahora los pagos al proveedor se registran como pagados, y los aprobados de esa forma antes de esta versión se corrigen en la siguiente carga de una página de administración.

## Lee esto antes de actualizar

- **Seguridad.** Con las tarifas de publicación activadas, una solicitud de renovación o de nueva publicación metía el anuncio en el carrito del vendedor solicitante **antes de comprobar que el anuncio era suyo**: un vendedor activo podía renovar o volver a publicar el anuncio de otro vendedor. Ahora se comprueba primero la propiedad.
- Con las tarifas de publicación activadas, una renovación o nueva publicación de pago también cobraba la tarifa **antes** de comprobar si el anuncio podía renovarse o volver a publicarse: una renovación fuera de su periodo de gracia se pagaba y el anuncio seguía caducado, y una nueva publicación se saltaba su periodo de espera. Ahora las reglas se comprueban antes del pago y de nuevo cuando el pago se completa.
- En un sitio en el que Rentiva se activó antes que Pro (el único orden que Pro permite), las tablas propias de Pro (libro contable de vendedores, auditoría de pagos, registro de claves, política de comisiones, informes de vendedores y las tablas de transferencias) nunca se creaban, así que **la comisión no se registraba y nada indicaba por qué**. Ahora Pro crea cualquier tabla que falte en la siguiente carga de una página de administración y sigue reintentándolo hasta que existan todas.
- La comprobación de integridad del libro contable escribía su resultado dentro de su propia transacción de solo lectura, por lo que una discrepancia detectada nunca se guardaba. Ahora se guarda.

## También en esta versión

Las fechas del libro contable se muestran en la zona horaria de tu sitio en lugar de en UTC. El panel del vendedor ya no falla cuando WooCommerce se desactiva fuera de la pantalla de plugins, y dos visitas que llegan a la vez en la primera carga ya no pueden crear dos páginas de Panel del vendedor. En Gestión de vendedores e Informes de vendedores, los avisos de administración ya aparecen cuando se muestra la pantalla por primera vez. El panel del vendedor y los mensajes de la tarifa de publicación están traducidos al turco.

---

**Dónde conseguirlo.** Pro 6.2.0 está publicado en GitHub como `v6.2.0` y se distribuye a través de la descarga de Rentiva Pro en wpalemi.com. Actualiza primero [Rentiva a la 6.1.5](/blog/rentiva-v6.1.5-release). El registro de cambios completo se incluye con el plugin en ambos idiomas.
