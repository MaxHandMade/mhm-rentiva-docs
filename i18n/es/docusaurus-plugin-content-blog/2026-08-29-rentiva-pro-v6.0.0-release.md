---
slug: rentiva-pro-v6.0.0-release
title: "Rentiva Pro 6.0.0 — Todo tiene nombres coherentes y la suspensión por fin significa suspensión"
authors: [maxhandmade]
tags: [release, rentiva, pro, vendors, security, breaking]
date: 2026-08-29T05:00
---

Esta es una versión mayor y la primera compilación de Pro publicada desde la 5.2.3, a finales de julio. A la mayoría de los propietarios de sitios les bastan dos frases: **actualiza primero MHM Rentiva a la 6.1.3 y después Pro**, y tus datos se migrarán solos la próxima vez que abras la administración. Todos los demás —cualquiera que tenga código personalizado enganchado a Pro— tienen antes una breve lista que leer, porque han cambiado los nombres de 70 hooks y nada te avisa cuando uno deja de ejecutarse.

<!--truncate-->

## Lee esto primero si tienes código personalizado

Los identificadores de Pro han pasado a usar un único prefijo coherente, igual que hizo el plugin gratuito en su propia 6.0.0. Es algo bueno de hacer una sola vez y malo de descubrir por accidente, así que aquí lo tienes todo.

**La regla de los hooks es un solo paso.** Sustituye `mhm_rentiva_` por `mhmrentiva_`. Así, `mhm_rentiva_payout_approved` pasa a ser `mhmrentiva_payout_approved`. Tres hooks de mensajes usaban un prefijo `mhm_` simple y siguen la misma regla: `mhm_message_created`, `mhm_message_read` y `mhm_message_status_changed`.

**Un hook que la regla no describe.** `mhm_rentiva/currency_symbol` usaba una barra donde todos los demás nombres usaban un guion bajo. Ahora es `mhmrentiva_currency_symbol`.

**Un filtro ha desaparecido en lugar de cambiar de nombre.** `mhm_rentiva_vendor_apply_endpoint_slug` pasó al nuevo prefijo como todo lo demás y ahora se ha eliminado por completo, porque nunca funcionó. Solo se aplicaba donde se construye la redirección posterior al envío, mientras que el código que *registra* el endpoint de solicitud de vendedor nunca lo leía, ni en esta versión ni en la 5.2.3. Quien lo configuraba era redirigido a una dirección de la que WordPress no sabía nada y acababa en un 404. Lo hemos eliminado en lugar de conectarlo, porque aquí la dirección de un endpoint es un identificador fijado al idioma de tu sitio, no una etiqueta que otro código pueda reescribir.

**Lo que pilla a la gente no son nuestros nombres de hooks.** Se han renombrado los tres tipos de contenido de Pro, y eso cambia los hooks de WordPress derivados de ellos:

| Antes | Ahora |
| --- | --- |
| `mhm_message` | `mhmrentiva_message` |
| `mhm_payout` | `mhmrentiva_payout` |
| `mhm_vendor_app` | `mhmrentiva_vendor` |

Así, `save_post_mhm_payout` es ahora `save_post_mhmrentiva_payout`, y lo mismo se aplica a las familias `add_meta_boxes_*` y `manage_*_posts_columns`. Cualquier comprobación `WP_Query`, `get_posts` o `pre_get_posts` que nombre un tipo antiguo ya no coincide con nada, sin avisar.

Fíjate en la tercera fila. `mhm_vendor_app` **no** ha pasado a ser `mhmrentiva_vendor_app`: ese nombre tiene 21 caracteres y WordPress guarda el tipo de contenido en una columna de 20 caracteres, así que registrarlo falla directamente y el tipo de contenido sencillamente dejaría de existir. Es `mhmrentiva_vendor`.

**Antes de actualizar, busca en tu código personalizado** `mhm_rentiva`, `mhm_message_`, `save_post_mhm_payout` y los valores entre comillas `'mhm_message'`, `'mhm_payout'` y `'mhm_vendor_app'`.

**Tus shortcodes se han dejado intactos a propósito.** `rentiva_vendor_profile`, `rentiva_vendor_directory`, `rentiva_vendor_ledger`, `rentiva_transfer_search`, `rentiva_transfer_results`, `rentiva_popular_routes` y `rentiva_messages` conservan los nombres que siempre han tenido, porque esos nombres están guardados dentro del contenido de tus páginas. Renombrarlos habría dejado en blanco páginas publicadas. Las páginas creadas con ellos no necesitan ninguna atención.

## Tus datos se migran solos

Veinte ajustes, cuatro tablas de la base de datos —el registro de comisiones, la política de comisiones, los informes de vendedores y la cola de tareas en segundo plano—, diez tareas programadas y los campos personalizados de los tipos de contenido de Pro pasan a los nuevos nombres mediante una migración que se ejecuta una sola vez, la primera vez que un administrador, WP-CLI o una tarea programada accede al sitio tras la actualización. No se borra nada y no hay que volver a introducir nada.

## Actualiza primero el plugin gratuito

Pro siempre ha declarado qué versión de MHM Rentiva necesita. Hasta ahora nunca lo comprobaba: la única prueba preguntaba si el plugin gratuito estaba instalado, nunca si era lo bastante reciente.

Ahora sí lo comprueba, y necesita la **6.1.1 o posterior**. Por debajo de esa versión, Pro no registra nada, no toca ningún dato y muestra un aviso con ambas versiones; por eso también actualizar en el orden equivocado es seguro y no destructivo. Simplemente espera. En la 5.2.3, esa misma incompatibilidad producía un error fatal en el panel del vendedor en lugar de un mensaje.

## La suspensión ahora significa suspensión

Aquí fallaban tres cosas a la vez, y juntas hacían que un vendedor suspendido estuviera menos suspendido de lo que decía la pantalla.

Un vendedor suspendido **conservaba la capacidad de editar y borrar sus propios anuncios de vehículos**. La suspensión retira el rol de vendedor y pasa esos anuncios a borrador, pero un filtro de permisos devolvía los derechos de edición y borrado sobre cualquier vehículo del que fuera autor quien hacía la petición. Historial de reservas incluido. La mitad de ese filtro que concede derechos ahora pregunta si el vendedor está activo; la mitad que restringe sigue siendo exactamente igual de amplia que antes.

Además, suspender era **una puerta de un solo sentido**. Funcionaba, y cualquier intento posterior de levantar la suspensión fallaba con «vendedor no encontrado» —para siempre—, mientras la pantalla seguía mostrando al vendedor como suspendido y seguía ofreciendo el botón. Cinco endpoints pedían un rol que la suspensión retira. Tampoco un operador podía corregir la ciudad o el porcentaje de comisión de un vendedor suspendido.

Y la **solicitud pendiente de cambio de cuenta bancaria** de un vendedor suspendido desaparecía de la pestaña del operador y de su contador, porque también listaban por rol. Una solicitud que llegó justo antes de una suspensión ahora todavía puede resolverse.

Por otro lado, dos gestores de formularios más antiguos tomaban un ID de usuario directamente de la petición y escribían en él el estado de vendedor: apuntando a cualquier cuenta, se podía marcar a un desconocido como vendedor suspendido y pasar a borrador todo lo que hubiera creado. Nada en el plugin genera los tokens que esos gestores requieren, así que en la práctica eran inaccesibles, pero eran la misma operación tras una barrera más débil que las rutas que realmente se usan. Ahora ambos verifican el destino y lo rechazan de forma visible.

## Cinco pantallas de administración que no funcionaban

Cinco pantallas de administración de Pro leían la lista de endpoints REST del plugin gratuito, que no describe los de Pro, así que cada pantalla cargaba y luego fallaba. Pro ahora incluye su propio mapa, y una comprobación compara ese mapa con las rutas realmente registradas. Otras dos pantallas que se quedaban en blanco en lugar de mostrar un error cuando faltaban datos ahora están contenidas, de modo que el resto de la página sobrevive.

También se ha corregido el panel del vendedor: un vendedor con una licencia válida se identificaba como cliente, lo que le hacía perder su navegación y su panel, y las cifras financieras de la parte superior mostraban cero en lugar de leer el registro de comisiones.

## Ahora se te avisará cuando exista un Pro nuevo

Pro se distribuye desde wpalemi.com y no desde el directorio de WordPress.org, así que la comprobación de actualizaciones de WordPress nunca ha tenido nada que decir sobre él, y hasta ahora nosotros tampoco. La pantalla de Plugins muestra ahora una línea propia cuando hay una versión más reciente disponible. No se une al proceso de actualizaciones de WordPress; simplemente te lo indica.

## Otras correcciones

Un grupo de funciones de pago había dejado de funcionar cuando el plugin gratuito eliminó código que Pro estaba tomando prestado: el conjunto de contexto de servicios adicionales, el conjunto de fiabilidad y penalizaciones de vehículos, el cuerpo de los correos de notificación de mensajes, las plantillas de correo reubicadas junto con cualquier personalización que hubieras guardado, las definiciones de atributos de los shortcodes de pago, la hoja de estilos premium de resultados de transferencias y el propio rol de vendedor.

Pro tampoco cargaba su propio catálogo de traducciones, así que su turco nunca aparecía. Se ofrecían servicios adicionales exclusivos de transferencias en la parte de alquiler. La pantalla de informes escribía una etiqueta traducida en el campo de estado de una reserva. Y las migraciones de la base de datos ahora funcionan tanto en MySQL 8 como en MariaDB.

---

El registro de cambios completo se incluye con el plugin en ambos idiomas. Si actualizas desde la 5.2.3, todo lo anterior ocurrió entre medias.
