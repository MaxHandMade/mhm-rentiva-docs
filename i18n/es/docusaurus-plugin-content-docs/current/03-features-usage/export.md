---
id: export
title: "Exportar"
sidebar_position: 13
slug: /features-usage/export
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Función Pro
Esta página documenta una funcionalidad del complemento **MHM Rentiva Pro**. No forma parte de la edición gratuita
Lite de WordPress.org y requiere tener Pro instalado junto a Lite, además de una licencia válida.
Consulta [Ediciones — Lite vs Pro](/docs/) para ver la división completa, o consigue Pro en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

La herramienta de exportación te permite extraer los datos de alquiler en varios formatos para análisis, contabilidad o copias de seguridad. Accede a exportaciones de datos completas desde **MHM Rentiva > Exportar**.

:::info SPA de React (desde la v4.52.0)
En la v4.52.0, la página de exportación se migró por completo a una **SPA de React** respaldada por la API REST. Se sustituyeron unas 780 líneas de código PHP heredado de renderizado y se eliminaron tres manejadores AJAX heredados (`wp_ajax_mhmrentiva_export_*`). La página ofrece ahora una vista previa de registros en tiempo real, un historial de exportaciones respaldado por REST con eliminación por entrada y el flujo de descarga CSV mediante `admin-post.php` conservado, todo ello sin recargar la página.
:::

---

## 📂 Módulos de exportación de datos

El sistema presenta los datos en cuatro categorías según su finalidad:

1.  **Exportación de reservas:** incluye información del cliente, detalles del alquiler y estados. (Formatos: **CSV**, **JSON**)
2.  **Exportación del registro de pagos:** informa de las transacciones de pago para la contabilidad y el análisis financiero. (Formatos: **CSV**, **JSON**)
3.  **Exportación de vehículos:** exporta el inventario de vehículos, las especificaciones y los criterios de precios. (Formatos: **CSV**, **JSON**)
4.  **Exportación de informes:** redirige a los informes de análisis que contienen resúmenes de ingresos, clientes y rendimiento de los vehículos.

---

## ⚙️ Filtros de exportación avanzados

Usa los filtros avanzados para acotar los datos antes de exportarlos y obtener solo el conjunto que necesitas:

- **Rango de fechas:** selecciona los registros de un periodo concreto (Hoy, Este mes, etc.).
- **Estado de la reserva y del pago:** filtra los registros con estados concretos, como «Completado» o «Pagado».
- **Pasarela de pago:** separa las transacciones realizadas con un método de pago concreto (efectivo, tarjeta de crédito, etc.).
- **Rango de importes (mín./máx.):** selecciona las reservas dentro de un rango de precios concreto (p. ej., 5.000 $ – 20.000 $).

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>📸 IMAGEN: PANEL DE EXPORTACIÓN Y FILTROS</strong><br/>
  <em>mhm-rentiva-export-filters-history</em>
</div>

---

## 📜 Historial de exportaciones

El sistema guarda un registro de cada exportación:
- **Formato y número de registros:** el formato (CSV/JSON) utilizado y el número de filas/registros que contenía.
- **Estado:** si la operación está «COMPLETADO».
- **Detalles:** revisa qué filtros se aplicaron en una exportación anterior.

---

## Corrección de errores de exportación en la v4.23.0

En esta versión se corrigieron cuatro errores críticos del módulo de exportación:

1. **Discrepancia de post_type en el registro de pagos:** el formulario de exportación enviaba `mhmrentiva_payment_log`, pero el CPT real era `mhmrentiva_app_log`. Se ha resuelto el error «Invalid export type».
2. **El número de registros devolvía 0:** el parámetro de consulta `no_found_rows => true` hacía que `found_posts` devolviera siempre 0. La consulta de recuento se corrigió con una sobrescritura independiente.
3. **Eliminación del historial:** la función de eliminación del historial de exportaciones era código provisional y no funcionaba. Se añadió un mecanismo de eliminación directa basado en transients.
4. **Error de PHP 8 en CSV/JSON de vehículos:** se enviaba un tipo de parámetro incorrecto (string en lugar de int) a `get_status_label()`. Esto provocaba un error fatal con los tipos estrictos de PHP 8.

---

## 🔎 Vista previa en tiempo real (v4.52.0+)

Antes de confirmar una exportación, la acción **Vista previa** devuelve el número total de registros junto con una muestra de 5 filas para el tipo de entrada y los filtros de fecha seleccionados. El botón **Exportar CSV** se desactiva automáticamente cuando el recuento es `0`, para que nunca lances una exportación vacía.

---

## Componentes de React (v4.52.0+)

| Componente | Finalidad |
| :--- | :--- |
| `ExportCards` | Selector visual de tarjetas para los tres tipos de exportación (reservas, vehículos, registros de la aplicación) |
| `AdvancedFilters` | Panel plegable de filtros de fecha: rangos predefinidos + campos personalizados desde/hasta |
| `PreviewBar` | Muestra el número de registros + una muestra de 5 filas tras una llamada de vista previa; desactiva la exportación cuando el recuento es 0 |
| `ExportForm` | Lanza el envío de un formulario `admin-post.php` oculto mediante `useRef`, sin recarga ni navegación de la SPA |
| `ExportHistory` | Carga el registro de exportaciones al montarse mediante REST; eliminación en línea por fila con borrado optimista |

**Endpoints REST:**
- `GET /wp-json/mhm-rentiva/v1/admin/export/history` — registro de exportaciones paginado (basado en transients, máx. 50 entradas, TTL de 1 semana)
- `DELETE /wp-json/mhm-rentiva/v1/admin/export/{id}` — elimina una entrada concreta del historial
- `POST /wp-json/mhm-rentiva/v1/admin/export/preview` — número de registros + muestra de 5 filas para el tipo y los filtros de fecha seleccionados

Todos los endpoints requieren la capacidad `manage_options`.

---

### Resumen de la sección
- Traslada tus datos a software de terceros con compatibilidad con **CSV y JSON**.
- Realiza segmentaciones financieras con el **filtrado por importe**.
- Audita conjuntos de datos anteriores con el **Historial de exportaciones**.

### Registro de cambios
| Fecha | Versión | Nota |
| :--- | :--- | :--- |
| 12.05.2026 | 4.52.0 | Migración completa a SPA de React. Vista previa de registros en tiempo real, historial de exportaciones respaldado por REST con eliminación por entrada y descarga CSV mediante admin-post.php conservada. Se eliminaron unas 780 líneas de renderizado PHP heredado. |
| 23.04.2026 | 4.27.2 | Documentación sincronizada con la versión actual del plugin. |
| 26.03.2026 | 4.23.0 | Corregidos 4 errores críticos de exportación (post_type, número de registros, eliminación del historial, error de tipo en PHP 8). |
| 19.03.2026 | 4.21.2 | Módulos de exportación, opciones de filtrado e historial de exportaciones explicados según la interfaz real. |
| 26.02.2026 | 4.21.0 | Versión inicial creada. |
