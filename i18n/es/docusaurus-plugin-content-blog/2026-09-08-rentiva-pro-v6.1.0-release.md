---
slug: rentiva-pro-v6.1.0-release
title: "Rentiva Pro 6.1.0 — Un botón de eliminación que solo un cliente puede pulsar"
authors: [maxhandmade]
tags: [release, rentiva, pro, privacy, gdpr, security, money]
date: 2026-09-08T02:00
---

Esta versión gira casi por completo en torno a una pregunta: qué ocurre cuando se elimina una cuenta. En la 6.0.0, la respuesta era peor de lo que debería en tres puntos distintos, y uno de ellos destruía los mensajes de un cliente en sitios que ni siquiera habían comprado la función de cumplimiento normativo. **Actualiza primero MHM Rentiva a la 6.1.4 y después Pro.** Esta vez no hay migración de datos ni cambios de nombre de hooks.

<!--truncate-->

## El botón de eliminación de autoservicio estaba activo para todo el mundo

Las herramientas de RGPD de Pro colocan un botón de «eliminar mis datos» en el área de cuenta del cliente. Su único requisito era haber iniciado sesión, nada más.

Cualquier usuario con sesión iniciada llegaba a él: un editor, un gestor de la tienda, **un administrador**. Escribir DELETE y confirmar ejecutaba la eliminación de cuentas de WordPress sobre la propia cuenta de la sesión actual. Todo lo que esa cuenta había creado desaparecía con ella, y los adjuntos no se envían a la papelera salvo que el sitio lo active expresamente, así que los archivos subidos se destruían sin posibilidad de recuperarlos. Cualquier otro tipo de contenido creado por la cuenta —entre ellos las plantillas de Elementor— se eliminaba de la misma forma.

Ahora el gestor rechaza cualquier cuenta que no tenga el rol de cliente y únicamente ese. A un administrador que lo pulse se le indica que la cuenta no puede borrarse mediante autoservicio.

## Una protección contra pérdida de datos que dependía de la licencia equivocada

Pro excluye a los vendedores, los pagos al proveedor y los mensajes de la eliminación de una cuenta. Esa protección estaba ligada a la función de herramientas de RGPD, pero el tipo de contenido que más protege, los **mensajes**, lo registra una función de licencia distinta.

Así, un sitio con licencia de mensajería y *sin* herramientas de RGPD registraba el tipo de contenido de mensajes sin activar ninguna protección. Un mensaje tiene autor y no es ni una entrada ni una página, lo que significa que WordPress lo elimina directamente en lugar de enviarlo a la papelera. Eliminar a ese cliente desde la pantalla de clientes del plugin gratuito destruía la parte del cliente en todas las conversaciones en las que había participado, sin nada en la papelera que restaurar, y dejaba las respuestas de la otra parte en un hilo que ya no se lee como tal.

Ahora la protección se activa siempre que Pro se carga, diga lo que diga la licencia. Es un escudo contra la pérdida de datos, no una función: tiene que cubrir eliminaciones que Pro no inicia por sí mismo.

## La limpieza por retención no comprobaba a quién pertenecía la cuenta

Pro puede eliminar los datos de clientes inactivos tras un periodo de retención. En la 6.0.0, la consulta que elegía las cuentas preguntaba tres cosas: si la cuenta llevaba suficiente tiempo inactiva, si se había registrado hace suficiente tiempo y si no tenía reservas. No preguntaba **de quién era la cuenta**, y tampoco había ninguna comprobación de rol en el bucle.

Por tanto, una cuenta inactiva sin reservas era candidata fuera lo que fuera: un vendedor, un gestor de la tienda, un administrador.

Ahora la consulta filtra del mismo modo, y una segunda pasada conserva solo las cuentas cuyos roles sean el de cliente y ningún otro. Peca de no eliminar, que es la dirección correcta para un código cuya función es destruir datos.

Tres cambios más en el mismo subsistema:

- **El periodo de retención no puede ser inferior a un año.** Cualquier valor menor, configurado o pasado como parámetro, se eleva a 365 días y la sustitución se anota en el registro.
- **El borrado programado ahora borra de verdad.** La función de eliminación de cuentas de WordPress está en un archivo exclusivo del área de administración que una ejecución programada nunca carga, así que en la ruta de cron el paso de eliminación no hacía absolutamente nada, sin avisar. Medido en un contexto de cron real: la función no existía antes de la corrección y sí después.
- **La dirección de correo electrónico del cliente borrado ya no forma parte de lo que registra la limpieza.** Solo se anota el ID de la cuenta. Además, dos avisos de seguridad —incluido el que se emite cuando una cuenta no ha podido eliminarse y se ha anonimizado en su lugar— se escribían en un nivel que la configuración predeterminada descarta. Ahora son errores, así que se registran de verdad.

## En una red multisitio, la eliminación ahora falla con sinceridad

WordPress no puede quitar una cuenta de una red desde dentro de un único sitio: su llamada de eliminación solo quita al usuario de ese sitio concreto, y la cuenta y su dirección siguen existiendo en toda la red.

La solicitud se respondía como si se hubiera llevado a cabo. Ahora se rechaza con un error que indica que la eliminación de cuentas no está disponible en esta instalación.

Es un cambio de comportamiento: quien antes veía «Eliminación de datos completada» ahora verá un error. El error es la respuesta veraz. Antes tampoco se eliminaba nada.

**Algo que no ha cambiado y que conviene saber:** cuando un cliente se borra a sí mismo, sus propias reservas desaparecen con la cuenta. Es el sujeto de la solicitud, así que se eliminan en lugar de conservarse, de forma permanente, no a la papelera. La protección anterior cubre a los vendedores, los pagos al proveedor y los mensajes, no las reservas del propio solicitante. En la 6.1.0 no hay ningún ajuste por sitio para esto. Una versión que anonimice la reserva en lugar de eliminarla es la siguiente parte de este trabajo.

## Una única fuente para la moneda

Diez puntos de Pro decidían la moneda por su cuenta cuando WooCommerce no estaba disponible, y no coincidían entre sí. Seis decían TRY y uno USD; el símbolo aparecía como el de la lira dos veces y como el del dólar una vez.

Son alternativas de respaldo, así que se ejecutan precisamente cuando se da la condición que cubren: una ejecución programada, una tienda desactivada, una devolución de llamada de pago que llega antes de que WooCommerce se haya cargado. En ese intervalo, un mismo pago al proveedor podía quedar marcado en USD mientras la exportación CSV, el asiento de la penalización en el registro contable, la devolución de llamada del webhook y el extracto impreso que cubrían el mismo dinero decían TRY.

Ahora los diez consultan la misma función auxiliar, que usa WooCommerce cuando está activo y el ajuste de moneda del propio plugin cuando no lo está. La auditoría previa al lanzamiento encontró después cinco puntos más del mismo tipo —el panel de analíticas del vendedor, la alternativa propia del extracto impreso cuando falta la moneda, el asiento contable de anulación de penalizaciones, el correo de extracto disponible y la indicación de precio del formulario de vehículos del vendedor— y también pasaron a usar la función auxiliar.

Por el camino se corrigieron dos errores relacionados con el dinero, y ambos llegaban al vendedor:

- **Una penalización enviada por correo a un vendedor parecía un abono.** Cuando WooCommerce no estaba disponible, la notificación formateaba el importe por su cuenta y tomaba su valor absoluto. Las penalizaciones se guardan como importes negativos, así que al vendedor se le enviaba la cuantía de la deducción sin signo: la misma cadena que genera un pago.
- **El extracto impreso de liquidación podía estar equivocado por un factor de mil.** Sus cifras proceden de datos almacenados, y un valor ya formateado como `1.234.567,89` se convertía directamente en número, lo que da `1.234`, sin avisar, en el documento que conserva el vendedor.

## Vuelven cuatro accesos directos al escritorio

Informes, Vendedores, Mensajes y Exportar salieron del escritorio con la separación del plugin gratuito para WordPress.org el 8 de agosto, y nada podía devolverlos hasta que el plugin gratuito abriera un punto de extensión para ello. Las páginas siguieron en el menú de administración todo el tiempo; simplemente habían perdido sus accesos directos.

Cada uno se añade según la función de la licencia, de modo que a una licencia que no puede abrir una pantalla no se le da un enlace a ella, y una instalación sin licencia no añade ninguno. Transferencia no está entre ellos de forma deliberada: lleva a ubicaciones y rutas, que se configuran una vez y no se vuelven a tocar.

Por eso también **Pro requiere ahora MHM Rentiva 6.1.4 o posterior**, requisito elevado desde la 6.1.3 durante la auditoría previa al lanzamiento: los accesos directos se enganchan a un filtro que el plugin gratuito no abre hasta la 6.1.4. En un sitio con la 6.1.3 la combinación se habría aceptado y los accesos directos simplemente nunca habrían aparecido, sin nada que explicara por qué. Si Pro encuentra una versión anterior del plugin gratuito, se desactiva con un aviso y no toca ningún dato.

## También en esta versión

Se ha eliminado el subsistema de monitorización: un registrador de mensajes, un gestor de monitorización y un monitor de rendimiento, unas 1.400 líneas a las que no llegaba ninguna ruta de código. La biblioteca de interfaz compartida de MHM ha pasado de la 0.4 a la 0.9.4, en paralelo con el plugin gratuito.

---

El registro de cambios completo se incluye con el plugin en ambos idiomas.
