---
id: payout-csv-exporter
title: "Exportador CSV de pagos al proveedor (informes)"
sidebar_label: "Exportador CSV de pagos"
sidebar_position: 13
---

![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Función Pro
Esta página documenta una funcionalidad del complemento **MHM Rentiva Pro**. No forma parte de la edición gratuita
Lite de WordPress.org y requiere tener Pro instalado junto a Lite, además de una licencia válida.
Consulta [Ediciones — Lite vs Pro](/docs/) para ver la división completa, o consigue Pro en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Propósito
Esta página describe el funcionamiento técnico y las reglas de seguridad de datos del componente `PayoutCsvExporter`, que permite exportar de forma masiva los registros financieros de pagos al proveedor.
:::

# 📊 Exportador CSV de pagos al proveedor

`PayoutCsvExporter` es una clase de utilidad que usan los administradores para auditar el historial de pagos al proveedor u obtener datos masivos para integraciones bancarias. Transmite los datos directamente al navegador sin cargarlos en memoria, lo que garantiza un alto rendimiento.

---

## 🛠️ Funcionamiento técnico

### 1. Acceso y seguridad
La operación de exportación se ejecuta a través de un hook estándar de WordPress `admin_post`:
- **Endpoint:** `/wp-admin/admin-post.php?action=mhmrentiva_export_payouts`
- **Comprobación de capacidad:** Solo pueden acceder los usuarios con la capacidad `manage_options` (Administrador).
- **Verificación del nonce:** La validez de la solicitud se verifica mediante un **WP Nonce** con la clave `mhmrentiva_export_payouts`.

### 2. Formato de datos (compatibilidad con Excel)
El sistema usa **UTF-8 con BOM (Byte Order Mark)** para garantizar que los archivos CSV se abran correctamente en Excel:
- **BOM:** La secuencia de caracteres `\xEF\xBB\xBF` se antepone al archivo.
- **Delimitador:** Se usa la coma estándar (`,`) como delimitador.

---

## 📋 Estructura de columnas del CSV (mapeo)

Las columnas del archivo exportado y sus orígenes son los siguientes:

| Nombre de columna | Origen de los datos | Descripción |
| :--- | :--- | :--- |
| `Payout ID` | `Post ID` | Identificador único asignado por el sistema. |
| `Vendor Name` | Nombre visible de `WP_User` | Nombre completo del vendedor al que se paga. |
| `Amount` | `_mhmrentiva_payout_amount` | Importe del pago al proveedor (formato decimal). |
| `Currency` | Moneda de WC | Moneda base de WooCommerce. |
| `CPT Status` | `post_status` | Estado en WordPress (Pendiente, Aprobado, etc.). |
| `Processor Status`| `_mhmrentiva_payout_status` | Código de estado devuelto por el procesador de pagos (n/a si está pendiente). |
| `Requested At` | `post_date_gmt` | Marca de tiempo UTC de la solicitud. |

---

## 🔒 Protocolos de seguridad

### Enmascaramiento de PII (datos personales)
Como las exportaciones CSV están pensadas para auditorías financieras, la información sensible del vendedor (IBAN, NIF) no se incluye en esta exportación de forma predeterminada. Estos datos solo son accesibles a través de la capa de metadatos cifrada dentro del registro de pago al proveedor.

### Registro
Cada operación de exportación se registra en la tabla `mhmrentiva_payout_audit` con la acción "export_triggered". Quién descargó los datos, y cuándo, se puede rastrear en el sistema forense.

---

## 💡 Notas para desarrolladores

Usa el siguiente método en PHP para generar dinámicamente el enlace de exportación:

```php
// Get a secure (Nonce-protected) Export URL
$export_url = \MHMRentiva\Admin\PostTypes\Payouts\PayoutCsvExporter::get_export_url();
```

## Resumen de la sección
- `PayoutCsvExporter` usa el método de **streaming** para grandes volúmenes de datos.
- Toda la operación está protegida por comprobaciones de **nonce** y **capacidad**.
- Las exportaciones están en formato **listo para Excel (UTF-8 BOM)**.

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Página actualizada para reflejar la lógica de streaming y la estructura BOM para Excel en PayoutCsvExporter. |
