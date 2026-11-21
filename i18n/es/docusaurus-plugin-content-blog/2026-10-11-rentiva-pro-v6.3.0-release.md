---
slug: rentiva-pro-v6.3.0-release
title: "Rentiva Pro 6.3.0: IBAN y documentos de vendedores cifrados en reposo, mensajes reconstruidos como conversaciones y todos los ajustes de vendedores en un solo lugar"
authors: [maxhandmade]
tags: [release, rentiva, pro, vendor, security, messages, admin]
date: 2026-10-11T06:30
---

6.3.0 protege lo que entregan los vendedores: los IBAN, los documentos de identidad y los documentos de los vehículos se cifran y se mantienen fuera de la biblioteca de medios. Los mensajes se reconstruyen como conversaciones, y la gestión de vendedores incorpora una página de detalle del vendedor y un único lugar para todos los ajustes de vendedores. **Actualiza primero MHM Rentiva (Lite) a la 6.2.0 y después Pro.** Rentiva Pro 6.1.0 o anterior se detiene con un error en el panel del vendedor junto a Rentiva 6.2.0, así que haz las dos actualizaciones una tras otra.

<!--truncate-->

## Los IBAN y documentos de los vendedores se cifran en reposo

- **Los IBAN y los documentos de identidad** (DNI, permiso de conducir, justificante de domicilio) se cifran y se almacenan fuera de la biblioteca de medios. Los documentos solo se aceptan en JPG, PNG o PDF y se comprueban su tipo y su tamaño. Los administradores muestran un IBAN con Mostrar / Copiar / Ocultar y abren los documentos mediante rutas que registran quién los ha consultado; los extractos de pago al proveedor muestran el IBAN enmascarado.
- **Los documentos de matriculación y de seguro de los vehículos** también salen de la biblioteca de medios pública. La pantalla de edición del vehículo tiene una caja Documentos del vehículo con registro de quién los consulta, y el administrador recibe un correo electrónico cuando un vendedor renueva un documento.
- **Al actualizar, los IBAN y documentos existentes se convierten, y los antiguos adjuntos de documentos se eliminan de la biblioteca de medios una vez copiados** al almacén cifrado. Se eliminan las entradas de galería o de portada que apuntaban a uno de esos archivos.

**Recomendado:** sin más configuración, las claves de cifrado proceden de las claves de WordPress en `wp-config.php`, por lo que cambiar esas claves hace ilegibles los IBAN y documentos almacenados. Define `MHM_RENTIVA_SENSITIVE_KEY` en `wp-config.php` para dar a los datos una clave propia: un aviso de administración lo recomienda, explica dónde va y muestra una línea `define()` lista para usar con una clave nueva.

:::caution Limitación conocida
Un vendedor cuyo IBAN no se pudo leer tras la actualización (por ejemplo, porque las claves de WordPress en `wp-config.php` se cambiaron después de aprobar al vendedor) **no puede solicitar un pago al proveedor hasta que se vuelva a introducir el IBAN, y la 6.3.0 no tiene ningún formulario para introducirlo.** El aviso de administración nombra y enlaza a cada uno de esos vendedores.
:::

## Mensajes, reconstruidos como conversaciones

Una conversación es un primer mensaje más sus respuestas. Hay una nueva bandeja de entrada de administración y una vista de hilo (prioridad, última actividad, cliente, estado y reserva relacionada) con tarjetas laterales que se pliegan y recuerdan su estado. Los clientes solo ven sus propias conversaciones, como texto sin formato. Las reglas de correo electrónico son claras: un correo de estado solo cuando un administrador hace un cambio individual, exactamente un correo por cada respuesta de un administrador, ninguno para las acciones en lote ni para la actualización, y una respuesta automática solo para una conversación nueva. Los mensajes tienen sus propios permisos. Los mensajes existentes se convierten una sola vez, al actualizar, sin enviar correos electrónicos. Ahora las notificaciones por correo electrónico de mensajes se pueden desactivar de verdad.

## Gestión de vendedores

- **Una página de detalle del vendedor:** cifras, contacto (ciudad editable), pago e impuestos con la visualización auditada del IBAN, la solicitud aprobada y sus documentos, fiabilidad e insignia, la comisión efectiva y su procedencia, reservas y reseñas de los vehículos del vendedor, y suspender / reactivar.
- **La gestión de vendedores se abre en Vendedores activos**, con correo electrónico, ciudad, número de vehículos, comisión efectiva y valoración de cada vendedor, una franja de contadores y una tarjeta «Ingresos por ciudad». Las acciones de aprobar, rechazar, IBAN y suspender se confirman dentro de la página en lugar de en una ventana emergente del navegador. Una solicitud se rechaza a menos que tenga adjuntos sus tres documentos.
- **Todos los ajustes de vendedores se trasladan a Ajustes del plugin > Mercado de vendedores**, y la gestión de vendedores pierde su pestaña Ajustes. Un nuevo interruptor «Aceptar nuevas solicitudes de vendedor» está activado por defecto. Los ajustes de la tarifa de publicación ahora se guardan de verdad. Las ocho opciones sueltas de vendedores se trasladan allí al actualizar.
- En la pantalla **Clientes** de Rentiva, los vendedores llevan una insignia «Vendedor» o «Vendedor suspendido», y la pantalla **Reservas** incorpora un filtro y una columna Vendedor.

## Correcciones

- **Una instalación nueva sin ninguna tasa de comisión guardada ya no rompe los pagos, las finalizaciones ni los reembolsos de WooCommerce.** La comisión queda retenida con una nota del pedido y se registra con la tasa que se guarde más tarde; un aviso de administración muestra cuántas están retenidas.
- Una solicitud de vendedor pendiente ya no vacía el escritorio de todos los demás clientes conectados.
- Los correos electrónicos de vendedores (13 plantillas y el extracto de pago al proveedor) enlazan con la sección correspondiente del Panel del vendedor en lugar de devolver a los vendedores a Mi cuenta.
- Los informes de clientes, vehículos e ingresos solo cuentan las reservas completadas y confirmadas, y los cambios simultáneos de la tasa global ya no se sobrescriben entre sí.
- Los seis widgets Pro de Elementor aplican los ajustes guardados en ellos, y los ajustes que se guardaban pero se ignoraban ahora se aplican; por ejemplo, el diseño «Vertical» de Búsqueda de transferencias y el filtro por tipo de origen de Rutas populares, que ahora muestra tus tipos de ubicación almacenados. Se han eliminado los ajustes que nunca hacían nada del bloque Mensajes, Resultados de transferencias, Búsqueda de transferencias y Rutas populares.

## Para desarrolladores

Eliminados: la acción `mhmrentiva_message_read`, el filtro `mhmrentiva_account_vendor_panel`, los antiguos gestores del formulario de mensajes y métodos como `Message::mark_as_read()`, `VendorApplicationManager::encrypt_iban()` / `decrypt_iban()`, y las rutas REST `GET/POST /vendors/settings`. `mhmrentiva_message_status_changed` ahora pasa el id del primer mensaje de la conversación y `array( 'actor' => … )`. **Los IBAN almacenados cambian de formato:** el código que lee directamente el meta del IBAN deja de funcionar. Cinco pasos de base de datos se ejecutan una vez al actualizar.

---

**Dónde conseguirlo.** Pro 6.3.0 está publicado en GitHub como `v6.3.0` y se distribuye mediante la descarga de Rentiva Pro en wpalemi.com. Actualiza primero [Rentiva a la 6.2.0](/blog/rentiva-v6.2.0-release). El registro de cambios completo se incluye con el plugin en ambos idiomas.
