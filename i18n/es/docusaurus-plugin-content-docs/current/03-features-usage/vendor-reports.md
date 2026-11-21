---
id: vendor-reports
title: "Informes y apelaciones de vendedores"
sidebar_label: "Informes de vendedores"
sidebar_position: 12
slug: /features-usage/vendor-reports
---

![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Función Pro
Esta página documenta una función del complemento **MHM Rentiva Pro**. No forma parte de la edición gratuita
Lite de WordPress.org y requiere tener Pro instalado junto con Lite, además de una licencia válida.
Consulta [Ediciones — Lite frente a Pro](/docs/) para ver la división completa, o consigue Pro en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info React SPA (desde v4.40.0)
La página de administración de informes de vendedores se migró a una **SPA de React** en la v4.40.0 (Faz 6). Los datos se obtienen mediante endpoints REST `/wp-json/mhm-rentiva/v1/vendor-reports/*`. Componentes: `VendorReportsPage`, `FilterBar`, `ReportTable`, `DetailView`, `ActionForm`, `StatusBadge`. Los mensajes flash usan el patrón `window.mhmRentivaVendorReports.flash` (PHP `enqueue_assets()` lee `$_GET['updated']`/`$_GET['error']` antes de que `history.replaceState` elimine los parámetros).
:::

El sistema de informes de vendedores ofrece a los vendedores un canal estructurado para escalar incidencias al administrador de la plataforma y para apelar acciones automáticas (como las penalizaciones por retirada). Una tabla personalizada, un modal compartido, una página de administración: cinco contextos distintos lo activan. **Requiere una licencia Pro.**

Introducido en la [v4.35.0](/blog/rentiva-v4.35.0-release).

---

## ¿Qué es un informe de vendedor?

Un informe de vendedor es un mensaje estructurado de un vendedor al administrador de la plataforma. **No** es un mensaje dirigido al cliente y **no** es una reseña pública. El sistema admite cinco contextos distintos:

| Contexto | Se usa para | Dónde está el activador |
| :--- | :--- | :--- |
| `booking` | Incidencias con clientes (no presentado, daños, disputa) | Botón "Sorun Bildir" en cada tarjeta de reserva del vendedor |
| `mhmrentiva_vehicle` | Apelaciones contra un vehículo pausado/retirado | Botón "İtiraz Et" en la página de anuncios (solo en estados pausado/retirado) |
| `vehicle_action` | Registro del motivo al retirar/pausar: suspende la penalización | El modal se abre automáticamente cuando el vendedor hace clic en Retirar o Pausar |
| `penalty` | Apelar una entrada del libro contable de penalización ya aplicada | Botón "Appeal" en cada fila de la tabla del historial de puntuación |
| `general` | "Yöneticiye Yaz": línea directa con el administrador | Enlace en el pie de cada página del panel del vendedor |

Los cinco comparten la misma estructura de datos (una fila en `wp_mhmrentiva_vendor_reports`) y la misma interfaz de administración. Los efectos secundarios al resolverlos varían según el contexto.

---

## Flujo del vendedor: enviar un informe

### Desde la tarjeta de reserva

1. El vendedor abre **Hesabım → Rezervasyonlar**
2. Cada tarjeta de reserva tiene un botón "Sorun Bildir" junto a "Ver detalles"
3. Clic → se abre un modal con los campos de título y descripción
4. Enviar → el informe se guarda con `context_type=booking`, `context_id=<booking_id>`, `status=open`
5. Se envía un correo electrónico al administrador de la plataforma

### Retirar un vehículo (la ampliación de la Not 2)

El flujo de retirada es el contexto con más consecuencias. De forma predeterminada, retirar un vehículo resta 10 puntos de la puntuación de fiabilidad del vendedor y escribe un cargo en el libro contable financiero (su importe depende del historial de retiradas del vendedor: la primera es gratuita y después es el 10 % / 25 % de los ingresos medios mensuales).

Con la v4.35.0, el vendedor puede indicar un motivo al retirar:

1. El vendedor abre **Hesabım → İlanlar**
2. Hace clic en "Çek" en un vehículo activo
3. **Se abre el modal de registro del motivo** (sustituye al anterior cuadro de diálogo `confirm()` del navegador)
4. El vendedor introduce un motivo: se requiere un mínimo de 20 caracteres
5. Enviar → ocurren dos cosas en secuencia:
   - Se crea un informe `vehicle_action` con `status=open`
   - Se llama al AJAX de retirada
6. Dentro de `VehicleLifecycleManager::withdraw()` se ejecuta el nuevo filtro `mhmrentiva_before_apply_penalty`. El callback `PenaltySuspensionHook` detecta el informe abierto y devuelve `false`. **Se omiten la deducción de puntuación y el cargo en el libro contable.**
7. El vehículo sigue pasando a `withdrawn` (se establecen el estado de la entrada, los metadatos del ciclo de vida y la fecha de espera), pero la penalización económica queda suspendida a la espera de la revisión del administrador.

El mismo flujo se aplica a las acciones de pausa.

### Apelar una penalización pasada

1. El vendedor abre **Hesabım → Güvenilirlik & Cezalar → Score History**
2. Cada fila que representa una penalización (variación negativa vinculada a un vehículo) tiene un botón "Appeal"
3. Clic → se abre el modal con el título prerrellenado con `Appeal: <event> on <vehicle>`
4. Enviar → el informe se guarda con `context_type=penalty`, `context_id=<ledger_uuid>`

Nota: actualmente, las apelaciones de penalizaciones no revierten la entrada aplicada en el libro contable; para ello hace falta el asistente de asientos compensatorios que llegará en la v4.36.0+. La resolución actualiza el estado del informe, envía un correo electrónico al vendedor y marca la apelación como aceptada a efectos de registro.

### Contactar con el administrador

Cada página del panel del vendedor tiene un enlace "Yöneticiye Yaz" en el pie. Abre el modal con `context_type=general` (sin `context_id`) y permite al vendedor enviar un mensaje libre al administrador. Úsalo para sugerencias de funciones, preguntas sobre la cuenta o cualquier cosa que no encaje en ninguno de los otros cuatro contextos.

---

## Flujo del administrador: resolver un informe

### Página de lista

**Yönetim → MHM Rentiva → Bayi Raporları** abre una lista paginada filtrada por estado (predeterminado: `open`) y contexto. Columnas:

- ID del informe
- Nombre e ID del vendedor
- Etiqueta del contexto (Rezervasyon / Araç / Araç işlemi / Ceza itirazı / Genel)
- Título (enlace al detalle)
- Etiqueta de estado
- Fecha de creación
- Botón de acción (abrir detalle)

### Página de detalle

Al hacer clic en un informe se abre la vista de detalle con:

- Título del informe (encabezado)
- Estado, vendedor, contexto (con enlace a context_id si procede)
- Fecha y hora de envío
- Descripción completa en un bloque con estilo
- Nota existente del administrador (si la hay)
- Formulario de acción (solo para informes no finalizados):
  - Área de texto opcional para la nota del administrador
  - Tres botones de envío: **Marcar como resuelto**, **Rechazar**, **Marcar como en revisión**

### Efectos secundarios de la resolución

| Contexto | "Marcar como resuelto" | "Rechazar" |
| :--- | :--- | :--- |
| `booking` | Actualización del estado + correo electrónico al vendedor | Igual |
| `mhmrentiva_vehicle` | Igual | Igual |
| `vehicle_action` | **Sin efecto**: la penalización ya se suspendió en el momento de la retirada y el vendedor conserva su puntuación | **Se ejecuta `apply_deferred_penalty()`**: `ReliabilityScoreCalculator::update()` recalcula (la retirada figura en el estado, así que la puntuación baja) y `PenaltyRecorder::record_penalty()` escribe el cargo diferido en el libro contable |
| `penalty` | (v4.36.0+: asistente de asientos compensatorios en el libro contable) | Sin efecto (la penalización ya está aplicada; el rechazo solo cierra la apelación) |
| `general` | Actualización del estado + correo electrónico | Igual |

Ambas resoluciones envían al vendedor un correo electrónico (plantilla `vendor_report_resolved`) con la nota del administrador y el nuevo estado.

### Marcar como en revisión

Establece `status=in_review`. La suspensión de la penalización sigue activa (in_review cuenta como "abierto" para el callback del filtro). No se envía correo electrónico al vendedor: es un indicador interno para la clasificación.

---

## El filtro de penalización: `mhmrentiva_before_apply_penalty`

Dos puntos de enganche del filtro envuelven la deducción de puntuación y la entrada del libro contable. Los plugins o temas pueden engancharse a este filtro para introducir motivos de suspensión adicionales, además de los informes de vendedores:

```php
/**
 * @param bool   $apply      Whether to apply the penalty. Default true.
 * @param int    $vehicle_id Vehicle post ID.
 * @param int    $vendor_id  Vendor user ID.
 * @param string $reason     Penalty reason ('withdrawal').
 * @param float  $penalty    Pre-calculated penalty amount.
 */
add_filter('mhmrentiva_before_apply_penalty', function ($apply, $vehicle_id, $vendor_id, $reason, $penalty) {
    if ($reason === 'withdrawal' && my_holiday_freeze_active()) {
        return false; // suspend penalties during a platform-wide freeze
    }
    return $apply;
}, 20, 5);
```

El propio `PenaltySuspensionHook` del plugin se registra con prioridad 10. Cualquier callback del filtro que devuelva `false` bloquea la penalización en esa ejecución del hook; un informe vendor_action abierto es solo uno de los múltiples motivos posibles.

---

## Base de datos

Nueva tabla personalizada `{prefix}mhmrentiva_vendor_reports`:

| Columna | Tipo | Notas |
| :--- | :--- | :--- |
| `id` | BIGINT UNSIGNED AUTO_INCREMENT | Clave primaria |
| `vendor_id` | BIGINT UNSIGNED | Indexada |
| `context_type` | VARCHAR(20) | `booking` / `mhmrentiva_vehicle` / `vehicle_action` / `penalty` / `general` |
| `context_id` | VARCHAR(64) | ID entero, UUID del libro contable o NULL |
| `title` | VARCHAR(255) | |
| `description` | LONGTEXT | Mínimo de 20 caracteres exigido en la capa de servicio |
| `status` | VARCHAR(20) | `open` / `in_review` / `resolved` / `rejected` |
| `admin_note` | LONGTEXT | NULL hasta la primera acción del administrador |
| `admin_user_id` | BIGINT UNSIGNED | NULL hasta la primera acción del administrador |
| `created_at` | DATETIME | |
| `updated_at` | DATETIME | |
| `resolved_at` | DATETIME | Se establece cuando el estado pasa a uno final (resuelto/rechazado) |

Índices: `vendor_id`, `context_type`, `context_id`, `status`, compuesto `(vendor_id, status)`, compuesto `(context_type, context_id, status)` (la ruta crítica de búsqueda de informes abiertos), `created_at`.

Clase de migración: `src/Core/Database/Migrations/VendorReportsMigration.php`. Registrada en `DatabaseMigrator::run_migrations()`. `DatabaseMigrator::CURRENT_VERSION` se incrementó de 3.5.0 a 3.6.0 para lanzar la migración en las instalaciones existentes.

---

## Lite frente a Pro

Todo el sistema de informes de vendedores está condicionado por `Mode::canUseVendorMarketplace()`. En los planes Lite:

- El submenú de administración "Bayi Raporları" no se registra.
- El gestor AJAX devuelve 403.
- El modal compartido no se encola.
- El callback del filtro de penalización sigue registrado, pero siempre devuelve `apply` sin cambios (no hay informes abiertos porque los vendedores no pueden enviar ninguno).

En la práctica, los vendedores de Lite retiran vehículos a la manera antigua: penalización directa, sin registro del motivo y sin vía de apelación. La actualización a Pro desbloquea el sistema completo.

Para probarlo en local, activa una licencia real en el sitio local: desde la 5.0.0 no existe ninguna constante ni ajuste que desbloquee Pro sin un token de licencia verificado.

---

## Puntos de extensión para desarrolladores

| Hook / Clase | Finalidad |
| :--- | :--- |
| `mhmrentiva_before_apply_penalty` | Filtro: condiciona la deducción de puntuación y la entrada del libro contable. Firma de 5 argumentos. |
| `mhmrentiva_vendor_report_created` | Acción: se ejecuta después de guardar un informe. El subsistema de correo electrónico la escucha. 3 argumentos. |
| `mhmrentiva_vendor_report_resolved` | Acción: se ejecuta después de que el estado cambie a uno final. 3 argumentos (report_id, vendor_id, new_status). |
| `VendorReportRepository` | API pública: `create()`, `find()`, `update_status()`, `find_by_vendor()`, `has_open_report_for()`, `reset_has_open_cache()` |
| `VendorReportService` | API pública: `create_report()`, `resolve_report()`, `reject_report()` |

---

## Componentes de React (v4.40.0+)

| Componente | Finalidad |
| :--- | :--- |
| `VendorReportsPage` | Raíz: orquestación de la vista de lista y la vista de detalle |
| `FilterBar` | Controles de filtro de estado y contexto |
| `ReportTable` | Lista de informes paginada y filtrable |
| `DetailView` | Detalle completo del informe con información del vendedor y descripción |
| `ActionForm` | Formulario Resolver / Rechazar / Marcar como en revisión con nota del administrador |
| `StatusBadge` | Etiqueta de estado con código de colores (open / in_review / resolved / rejected) |

**Endpoints REST:**
- `GET /wp-json/mhm-rentiva/v1/vendor-reports` — lista paginada, filtrable por estado y contexto
- `GET /wp-json/mhm-rentiva/v1/vendor-reports/{id}` — detalle de un único informe

Todos los endpoints requieren la capacidad `manage_options`.

---

### Registro de cambios

| Fecha | Versión | Nota |
| :--- | :--- | :--- |
| 06.05.2026 | 4.40.0 | Migración completa a SPA de React. VendorReportsPage, FilterBar, ReportTable, DetailView, ActionForm, StatusBadge. Patrón de indicador flash mediante `window.mhmRentivaVendorReports.flash`. |
| 23.04.2026 | 4.27.2 | Documentación sincronizada con la versión actual del plugin. |
| 05.04.2026 | 4.35.0 | Versión inicial: se introduce el sistema de informes de vendedores. 5 contextos (booking, vehicle, vehicle_action, penalty, general), filtro de suspensión de penalizaciones, tabla personalizada en la base de datos. |

---

## Consulta también

- [Notas de la versión v4.35.0](/blog/rentiva-v4.35.0-release) — introducción de la función
- [Ciclo de vida del vehículo](./vehicle-lifecycle) — flujo de pausa/retirada/caducidad con el que se integra el contexto `vehicle_action`
- [Solicitud de vendedor](./shortcodes/vendor-apply) — cómo se unen los vendedores al marketplace en primer lugar
