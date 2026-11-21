---
id: license-management
title: "Gestión de licencias"
sidebar_label: "Gestión de licencias"
sidebar_position: 8
slug: /core-configuration/license
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

MHM Rentiva (Lite) es gratuito y no necesita clave de licencia. **Rentiva Pro** es un plugin complementario independiente, y sus funciones (transferencia VIP, mensajería, informes avanzados, el marketplace de vendedores y más) necesitan una clave de licencia válida. Con Pro instalado, gestiona tu clave desde el menú **MHM Rentiva > Licencia**.

---

## 💻 Entornos locales y de pruebas

**Se requiere una clave de licencia válida en todos los entornos**, incluidos los sitios locales y de pruebas (staging).

Las versiones anteriores desbloqueaban Pro automáticamente en los hosts terminados en `.dev`, `.local`, `.test`, `.staging` o `.localhost` («Modo desarrollador»). Esto se eliminó en la **5.0.0**: `.dev` es un dominio real que cualquiera puede registrar, por lo que un sitio en producción podría acabar con funciones de pago desbloqueadas por accidente. Ahora una función solo se concede mediante un token de licencia firmado que se verifica correctamente; no hay ninguna constante, opción ni filtro que la active sin él.

Para trabajar en una copia local o de pruebas, activa allí tu licencia como lo harías en cualquier otro sitio. Si necesitas la clave en más de un sitio a la vez, desactívala primero en el sitio con el que hayas terminado (consulta más abajo).

---

## 🟢 Estado y activación de la licencia

El panel de administración de la página se divide en tres bloques principales:

1. **Estado de la licencia:**
   Muestra la validez de la licencia actual. Cuando la licencia está activa, la página muestra **«✅ Licencia Pro activa»** y, debajo, una línea con las funciones Pro que tu licencia concede realmente, por ejemplo *«Funciones Pro activas: Vendedores y liquidaciones, Informes avanzados, Mensajes, Exportación ampliada»*. Sin una licencia activa muestra **«⚠️ Versión Lite activa»** y te pide la clave.

2. **Activación de la licencia:**
   Pega la clave de licencia que has comprado en el campo con formato `XXXX-XXXX-XXXX-XXXX` y haz clic en el botón **«Activar licencia»**. La API la valida al instante.

3. **Gestión de la licencia (liberación):**
   Si quieres trasladar el plugin a otro sitio web (dominio), o desactivar una licencia real por pruebas o cancelación, usa el botón **«Desactivar licencia»** de la parte inferior. De lo contrario, podrías recibir un error de activación (demasiadas activaciones) en el nuevo dominio.

---

## 💎 Qué incluye Lite y qué añade Pro

Lite **no tiene límites de vehículos, reservas, clientes ni servicios adicionales, ni temporizadores de funciones ni pantallas bloqueadas**. Pro no amplía ningún límite de Lite; añade sus propios módulos. Cada módulo Pro solo se habilita cuando tu licencia lo incluye.

| Área | Incluido en Lite | Añade con Pro |
| :--- | :--- | :--- |
| **Vehículos, reservas, clientes, servicios adicionales** | Todos los que necesites, sin límites | Nada adicional (no hay ningún límite que ampliar) |
| **Galería del vehículo** | Hasta el número de imágenes definido en los ajustes (50 por vehículo de forma predeterminada) | Nada adicional |
| **Escritorio** | Tarjetas de estadísticas, gráfico de ingresos, reservas recientes, próximas operaciones, resúmenes de estado y de pagos | Nada adicional |
| **Informes** | Solo las métricas del escritorio | La pantalla **Informes**: informes de ingresos, reservas y clientes |
| **Exportar** | Lista de clientes en CSV | **Exportación ampliada**: reservas, vehículos y registros en CSV o JSON, con filtros |
| **Correo electrónico** | 14 plantillas editables (reserva, estado, cancelación, recordatorio, reembolso, bienvenida, comprobante sin conexión, pago restante) | Plantillas adicionales para los módulos propios de Pro (vendedores, anuncios, liquidaciones, mensajes) |
| **Mensajería** | Formulario de contacto y la pantalla de mensajes de contacto | **Mensajes**: conversaciones entre cliente y administrador, también en Mi cuenta del cliente |
| **Marketplace de vendedores y liquidaciones** | — | Solicitudes de vendedores, panel del vendedor, comisiones, liquidaciones e informes de vendedores |
| **Transferencia VIP** | — | Ubicaciones, rutas, búsqueda y reserva de transferencias (se habilita con cualquier licencia Pro activa) |
| **Privacidad / RGPD** | Exportación y borrado de datos personales en las herramientas de privacidad de WordPress (reservas, mensajes de contacto, registro de correos electrónicos, datos de la cuenta, registro de la aplicación) y el texto de la guía de la política | La tarjeta de consentimiento y las solicitudes de datos en Mi cuenta, exportación y borrado de los mensajes, los datos de vendedores y los registros de consentimiento de Pro, limpieza por conservación de datos (consulta [Privacidad y datos personales](../03-features-usage/privacy-personal-data.md)) |

---

## ⏰ Recordatorio de renovación y problemas de conexión (Pro)

- **Recordatorio de renovación:** En los últimos 14 días antes de que caduque la licencia, un aviso indica la **fecha de caducidad** e incluye un botón **Gestionar licencia** que abre la página Licencia. Solo aparece en las pantallas de Rentiva, en **Plugins** y en el escritorio de WordPress, no en todas las páginas de administración. **Recordármelo dentro de 3 días** lo oculta para ti durante tres días; el botón solo se ofrece mientras queden al menos cuatro días, y el último día el recordatorio se muestra siempre.
- **Problemas con el servidor de licencias:** Si no se puede contactar con el servidor de licencias, este responde con un fallo temporal (HTTP 5xx) o un límite de peticiones (HTTP 429), o la respuesta no procede del propio servidor (por ejemplo, una página de portal cautivo), Pro no se desactiva: sigue funcionando hasta **siete días** después de la última comprobación de licencia correcta y muestra un aviso de **advertencia de conexión**.
- **Más de siete días:** Si la licencia sigue sin poder verificarse pasados siete días, Pro **pausa** sus funciones y muestra un aviso con un botón **Comprobar ahora**. La activación se conserva: las funciones vuelven por sí solas en la siguiente comprobación correcta (la comprobación programada se ejecuta cada seis horas, y al abrir la página Licencia se comprueba al momento), así que no necesitas volver a activarla.
- **Un rechazo real:** Cualquier rechazo del servidor de licencias (por ejemplo, una licencia no válida, revocada o desconocida) sigue desactivando Pro.

:::info Cambiado en Pro 6.5.0
El recordatorio de renovación indica la fecha de caducidad, enlaza a la página Licencia y ya no aparece en todas las páginas de administración.
:::

:::info Cambiado en Pro 6.5.1
Cuando la licencia no puede verificarse durante más de siete días, Pro se pausa en lugar de eliminar la activación del sitio, y vuelve por sí solo en la siguiente comprobación correcta.
:::

---

### Resumen de la sección
- Lite funciona sin licencia y no tiene límites; una clave de licencia solo desbloquea los módulos de Rentiva Pro.
- Tu licencia se activa o desactiva en un solo paso desde el menú **MHM Rentiva > Licencia**.
- Se requiere una licencia válida en todas partes, incluidos los sitios locales y de pruebas; desde la 5.0.0 no hay ningún entorno que desbloquee Pro sin ella.
- Antes de cambiar de dominio, libera siempre la licencia antigua con el botón **Desactivar**.

### Registro de cambios
| Fecha | Versión | Nota |
| :--- | :--- | :--- |
| 19.11.2026 | Pro 6.5.1 | Se documenta la pausa tras siete días sin una licencia verificada y la recuperación sin volver a activarla. |
| 18.11.2026 | 6.4.0 / Pro 6.5.0 | Se documentan el recordatorio de renovación, el margen de siete días durante problemas con el servidor de licencias y la separación de Privacidad / RGPD entre Lite y Pro. |
| 09.11.2026 | 6.3.1 | Corrección: Lite no tiene límites de vehículos, reservas, clientes ni servicios adicionales desde la 5.2.0. La antigua tabla «Lite (límite) / Pro (ilimitado)» se ha sustituido por lo que incluye Lite y lo que añade Pro, comprobado con el código del plugin. Se han eliminado «API REST completa» y «Notificaciones por correo electrónico» como elementos exclusivos de Pro. |
| 23.04.2026 | 4.27.2 | Se añade la traducción al inglés. |
| 27.03.2026 | 4.23.0 | Límites de Lite actualizados (vehículos: 3→5, clientes: 3→10, galería: 3→5). Funciones exclusivas de Pro separadas: Vendedores y liquidaciones, RGPD, Notificaciones por correo electrónico. |
| 19.03.2026 | 4.21.2 | Guía de gestión de licencias modernizada con imágenes y notas técnicas. |
| 26.02.2026 | 4.21.0 | Versión inicial creada. |
