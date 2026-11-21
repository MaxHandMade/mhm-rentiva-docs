---
slug: rentiva-pro-v6.5.0-release
title: "Rentiva Pro 6.5.0: comisión abonada al vendedor correcto, solicitudes de privacidad por correo electrónico, acuerdo de vendedor funcional e informes en la zona horaria del sitio"
authors: [maxhandmade]
tags: [release, rentiva, pro, vendor, privacy, security]
date: 2026-11-18T22:30
---

La 6.5.0 corrige cómo se gestionan el dinero de los vendedores, las cancelaciones y los datos personales. La comisión ahora va al vendedor propietario del vehículo reservado; antes, podía ir al cliente que hizo la reserva. Un reembolso solo revierte una comisión que realmente se haya abonado. Los mensajes, los datos de vendedores y los registros de consentimiento aparecen ahora en las herramientas de privacidad de WordPress, y los botones "Solicitar exportación de datos" y "Solicitar borrado de datos" de Mi cuenta inician una solicitud de privacidad que se confirma por correo electrónico. Activar "Exigir acuerdo de vendedor" ahora siempre muestra un acuerdo, con una plantilla inicial cuando el texto está vacío. Los informes y las analíticas de vendedores siguen la zona horaria del sitio. **Pro 6.5.0 requiere WordPress 7.0 o posterior y Rentiva (Lite) 6.4.0 o posterior: actualiza primero Lite y después Pro.**

<!--truncate-->

:::caution Las filas de comisión escritas antes de esta actualización no se corrigen
La comisión ahora va al propietario del vehículo reservado, y los vehículos propios del sitio no generan ninguna fila de comisión. Las filas escritas antes de esta actualización no se corrigen.
:::

:::caution Los botones de privacidad de Mi cuenta ya no actúan de inmediato
"Solicitar exportación de datos" y "Solicitar borrado de datos" ahora abren una solicitud de privacidad de WordPress que el cliente confirma por correo electrónico. El botón no descarga ni elimina nada.
:::

## La comisión va al vendedor correcto

- **La comisión se abona al vendedor propietario del vehículo.** Se abonaba al cliente que hizo la reserva (o a nadie), y un reembolso sobre un vehículo propio del sitio se cargaba al cliente. Ahora un reembolso se carga al vendedor cuyo abono revierte, y las ganancias y el dato "reservas, últimos 30 días" del panel del vendedor cuentan las reservas correctas.
- **Un reembolso solo crea una fila si existe un abono previo.** Un reembolso que llegaba antes de que se pagara el pedido (por ejemplo, una transferencia bancaria reembolsada mientras aún estaba en proceso) dejaba al vendedor con un cargo por dinero que nunca se había abonado. Ahora, un reembolso pendiente se registra cuando se completa el pago, con la tasa de comisión de ese abono.
- **Los bloqueos por cancelación solo se aplican a vehículos de vendedores.** Un administrador que cancelaba una reserva de su propio vehículo desde la pantalla de edición de la reserva bloqueaba las fechas de ese vehículo durante 30 días. Ahora el bloqueo solo se aplica a vehículos publicados por un vendedor.
- **La puntuación de fiabilidad cuenta las cancelaciones correctas.** Contaba cualquier cancelación que llevara el ID de usuario del vendedor, incluida la de un administrador que más tarde se convirtió en vendedor o la de un vendedor que cancelaba su propio alquiler desde Mi cuenta, y contaba según la fecha de creación de la reserva, de modo que una reserva hecha hace siete meses y cancelada ayer no se tenía en cuenta. Ahora solo cuenta las cancelaciones hechas como vendedor, según la fecha de la cancelación, en la zona horaria del sitio. Las fechas ya no se bloquean cuando un vendedor cancela su propio alquiler desde Mi cuenta.
- **Ajustes ocultos:** "Periodo de rebloqueo de reservas canceladas (días)" y "Puntos deducidos por cancelación" se ocultan en los ajustes del Mercado de vendedores, porque todavía no hay ninguna pantalla que permita a un vendedor cancelar la reserva de un cliente. Los valores guardados se conservan y siguen aplicándose.
- **Días de penalización:** los días de penalización por cancelación del vendedor ahora cuentan como reservados en la búsqueda de vehículos y se levantan automáticamente a los 30 días (el día de la cancelación más 29). "Aplicar a todos" y "Quitar de todos" ya no copian ni borran los días de penalización. Las fechas que bloqueaste a mano se conservan.

## Herramientas de privacidad

- **Tres entradas de Pro en las herramientas de privacidad de WordPress.** Herramientas > Exportar datos personales y Borrar datos personales incluyen ahora Mensajes (las conversaciones del cliente), Datos de vendedor (solicitudes, perfil, pagos al proveedor, informes y puntuación de fiabilidad, incluidos los solicitantes rechazados) y Registros de consentimiento. Funcionan incluso cuando la licencia ha caducado. Las cuentas bancarias se exportan solo con sus cuatro últimos dígitos. Los registros de vendedores se conservan al borrar (conservación legal) y el resultado lo indica. El texto sugerido para la política de privacidad incorpora una sección de Pro.
- **La exportación de vendedores es completa.** Ahora recorre todas las solicitudes, pagos al proveedor e informes; antes, se detenía en 20 solicitudes y 500 pagos al proveedor o informes y siempre indicaba que había terminado, y los pagos al proveedor rechazados quedaban fuera.
- **Las solicitudes de Mi cuenta se confirman por correo electrónico** (consulta el recuadro anterior). El correo de confirmación no se vuelve a enviar en un plazo de 10 minutos para la misma cuenta y acción, y se ha eliminado la exportación antigua, que también incluía los tokens de sesión y el IBAN cifrado.
- **Una única respuesta de consentimiento.** La tarjeta de consentimiento de privacidad de Mi cuenta y la comprobación de la reserva leían respuestas distintas, por lo que un cliente que aceptaba la tarjeta podía seguir tratándose como si no hubiera dado su consentimiento. Ahora ambas leen una única respuesta.
- **Turco:** el aviso de consentimiento menciona la KVKK (Ley n.º 6698) en lugar del RGPD.

## Un acuerdo de vendedor que siempre se muestra

Con "Exigir acuerdo de vendedor" activado y el texto vacío, los solicitantes no veían ningún acuerdo y el administrador no veía ningún aviso. Ahora, un texto vacío muestra una plantilla integrada y traducible que cubre los anuncios, las reservas, la comisión y los pagos al proveedor, las cancelaciones, los daños y el seguro, los datos personales, la suspensión y la rescisión, y los cambios. Es un punto de partida que debes revisar, no asesoramiento jurídico. El acuerdo también muestra un formato sencillo (# encabezados, **negrita**, - listas, --- líneas separadoras) en lugar de los símbolos sin procesar.

## Informes en la zona horaria del sitio

Las fechas de reserva en los informes de Clientes y de Reservas y en la exportación CSV, los días reservados del informe de vehículos, los intervalos predeterminados de los informes, el vencimiento del bloqueo por cancelación y los grupos por día de las analíticas de vendedores siguen ahora la zona horaria del sitio, de modo que una reserva cerca de la medianoche ya no cae en el día equivocado.

## Correcciones y mejoras menores

- **Las barras invertidas se conservan.** Una barra invertida escrita en el formulario de vehículo del vendedor (título, descripción, marca, modelo, color, kilometraje, matrícula, ciudad), en los campos de la solicitud de vendedor y en la nota de rechazo, en la referencia externa de un pago al proveedor ("BANK\6" se guardaba como "BANK6"), en las líneas de servicios adicionales de transferencia y en el historial de puntuación del vendedor se perdía al guardar.
- **La tabla de vendedores:** cambiar un filtro en la página 2 enviaba la página 2 con el nuevo filtro y después la página 1, y una respuesta lenta podía sobrescribir otra más reciente. Ahora la página y los filtros cambian juntos en una sola petición, la tabla y el paginador siguen visibles durante la carga, y "Cargando…" solo se muestra antes de la primera respuesta.
- **Pantalla de edición del vehículo.** Muestra las cajas de Pro en el orden del nuevo diseño, después de las cajas laterales de Lite (salvo que hayas ordenado tú las cajas), cada una con una etiqueta "Pro". La caja Ciclo de vida muestra el estado como una píldora de color con un aviso cuando quedan 10 días o menos, y sus colores se leen bien sobre fondo blanco. Las cajas Documentos y Transferencia usan los mismos estilos, y "solo alquiler" oculta los campos de transferencia de inmediato en lugar de deslizarlos.
- **La tarjeta de un vehículo solo de transferencia** ya no tiene botón de comparar, así que la comparación solo incluye vehículos que se pueden alquilar.
- **Compatible con Lite 6.4.0.** Pro funciona con el formulario de reserva, Mi cuenta, la comparación, el calendario, el contacto y las reseñas rediseñados de Lite 6.4.0. La ventana de servicios adicionales de transferencia muestra el símbolo de la moneda del sitio por sí solo, y la página de reservas del vendedor carga sus propios estilos. Cambiar ubicaciones o ejecutar una importación de transferencias actualiza la lista de ubicaciones en caché.
- **Recordatorio de licencia.** En los últimos 14 días indica la fecha de caducidad, enlaza a la página de la licencia y ofrece "Recordármelo dentro de 3 días"; se muestra en las pantallas de Rentiva, en Plugins y en el escritorio de WordPress en lugar de en todas las páginas de administración.
- **Turco:** "Detalles" es "Ayrıntı" en todas partes, como en Lite, el encabezado del panel de filtros del directorio de vendedores es "Filtre" y el botón de aplicar del libro de cuentas del vendedor es "Filtrele".

## Qué comprobar después de actualizar

- **Orden de actualización:** primero Rentiva (Lite) 6.4.0 y después Pro 6.5.0. Ambos necesitan WordPress 7.0 o posterior (antes era 6.7).
- **Comisión:** las filas escritas antes de esta actualización no se corrigen; revisa las ganancias anteriores de los vendedores teniéndolo en cuenta.
- **Acuerdo de vendedor:** si "Exigir acuerdo de vendedor" está activado, lee el texto que ven ahora los solicitantes, sobre todo si el tuyo estaba vacío.
- **Solicitudes de privacidad:** avisa a tus clientes de que los botones de Mi cuenta ahora envían un correo electrónico de confirmación.
- **Ajustes del Mercado de vendedores:** los dos ajustes de cancelación están ocultos, pero sus valores guardados siguen aplicándose.

---

**Dónde conseguirlo.** Pro 6.5.0 está disponible en el mismo sitio que antes, para los titulares de licencia en wpalemi.com. Actualiza primero [Rentiva a la 6.4.0](/blog/rentiva-v6.4.0-release). El registro de cambios completo se incluye con el plugin en ambos idiomas.
