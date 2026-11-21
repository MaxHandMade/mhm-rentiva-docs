---
id: onboarding
title: "Incorporación de vendedores"
sidebar_label: "Incorporación"
sidebar_position: 2
---

![Versión](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Actualizado](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Función Pro
Esta página documenta una función del complemento **MHM Rentiva Pro**. No forma parte de la edición gratuita
Lite de WordPress.org y requiere tener Pro instalado junto a Lite, además de una licencia válida.
Consulta [Ediciones: Lite frente a Pro](/docs/) para ver la división completa, o consigue Pro en [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Propósito
Esta página ofrece una explicación técnica del proceso de incorporación de vendedores: desde el formulario de solicitud hasta la aprobación del administrador, la asignación de rol y la sincronización de datos.
:::

# 🚀 Proceso de incorporación de vendedores

El módulo de incorporación de Rentiva utiliza un **mecanismo de aprobación en dos fases** para garantizar una estructura de Marketplace controlada.

---

## 📝 1. Formulario de solicitud y shortcode

Las solicitudes de vendedor se envían a través de un formulario generado por el shortcode `[rentiva_vendor_apply]`.

### Implementación técnica
- **Clase:** `MHMRentiva\Admin\Frontend\Shortcodes\Vendor\VendorApply`
- **Gestor AJAX:** Se ejecuta mediante el método `handle_ajax()` en la acción `mhmrentiva_vendor_apply`.
- **Seguridad:** La protección CSRF se proporciona mediante `wp_create_nonce('mhmrentiva_vendor_apply_nonce')` para cada solicitud.

### Campos obligatorios
| Campo | Clave meta | Tipo | Cifrado |
|---|---|---|---|
| Nombre completo | `_vendor_full_name` | Texto | No |
| Teléfono | `_vendor_phone` | Texto | No |
| Ciudad / Región | `_vendor_city` | SelectWoo | No |
| **IBAN** | `_vendor_iban` | Texto | **Sí (AES-256)** |
| **Titular de la cuenta** | `_vendor_account_holder` | Texto | No |
| Documento de identidad | `_vendor_doc_id` | Archivo | No |
| Permiso de conducir | `_vendor_doc_license` | Archivo | No |
| Justificante de domicilio | `_vendor_doc_address` | Archivo | No |

### Campos opcionales
| Campo | Clave meta | Tipo | Nota |
|---|---|---|---|
| Delegación de Hacienda | `_vendor_tax_office` | Texto | Añadido en la v4.23.1 |

:::info Cambios en el formulario de la v4.23.1
- **Zonas de servicio:** Se ha eliminado la sección de casillas de verificación y se ha sustituido por una nota informativa.
- **Seguro del vehículo:** Se ha eliminado del formulario de solicitud y se ha trasladado al formulario de envío de vehículos (`[rentiva_vehicle_submit]`).
- **Selección de ciudad:** Se ha convertido de un campo de texto (`<datalist>`) a un componente `<select>` + SelectWoo de WooCommerce (`CityHelper::render_select()`).
- **Titular de la cuenta:** Nuevo campo obligatorio con la información del titular de la cuenta bancaria.
- **Delegación de Hacienda:** Nuevo campo opcional.
:::

### Acuerdo de vendedor (v4.61.0)

Puedes exigir que los solicitantes lean y acepten un **acuerdo de vendedor** antes de poder enviar la solicitud.

- Activa **Exigir acuerdo de vendedor** en **Ajustes → Mercado de vendedores → Acuerdo de vendedor**. El campo **Texto del acuerdo** que aparece debajo contiene el texto que se muestra a los solicitantes.
- Cuando está activado, el formulario de solicitud muestra el acuerdo y una **casilla de consentimiento obligatoria**: el formulario no se puede enviar hasta que se marque. El mismo requisito se aplica también **en el servidor**, por lo que no es posible saltarse este control manipulando el formulario.
- La aceptación se guarda como prueba (con una **marca de tiempo**) en la solicitud y se muestra en el detalle de la solicitud, de modo que tienes constancia de quién aceptó y cuándo.
- **Texto vacío:** si activas el acuerdo y dejas el texto vacío, los solicitantes ven una plantilla integrada con ocho secciones: tus vehículos y anuncios, reservas, comisión y liquidaciones, cancelaciones, daños, seguro y responsabilidad, datos personales, suspensión y finalización del acuerdo, y cambios. La plantilla es un punto de partida, no asesoramiento jurídico: revísala y adáptala a tu negocio y a la legislación local.
- **Formato:** el texto admite un formato básico: `# Heading`, `**bold**`, `- list item` y `---` para una línea. No se muestra ningún otro HTML.

---

## 🛡️ 2. Comprobaciones de elegibilidad (`Eligibility`)

Antes de que un usuario pueda presentar su solicitud, se comprueban las siguientes reglas mediante `VendorApplicationManager::can_apply()`:
1. El usuario no debe tener ya el rol `rentiva_vendor`.
2. No debe existir ninguna solicitud pendiente.
3. La comprobación `Mode::canUseVendorMarketplace()` debe confirmar que la licencia admite esta función.

---

## 🔒 3. Almacenamiento y seguridad de los datos

Las solicitudes se guardan como entradas del CPT `mhmrentiva_vendor_app`.

### Protocolo de cifrado del IBAN
Los datos del IBAN nunca se escriben en la base de datos como texto sin cifrar:
```php
// VendorApplicationManager::encrypt_iban()
$key = substr(hash('sha256', AUTH_KEY . SECURE_AUTH_SALT), 0, 32);
$iv  = openssl_random_pseudo_bytes(16);
$cipher = openssl_encrypt($raw_iban, 'AES-256-CBC', $key, OPENSSL_RAW_DATA, $iv);
return base64_encode($iv . $cipher);
```
**Nota:** Si `AUTH_KEY` o `SECURE_AUTH_SALT` cambian, los IBAN cifrados anteriormente ya no se podrán descifrar.

---

## ⚙️ 4. Aprobación del administrador y asignación de rol

### Flujo de aprobación (`Approve`)
Al hacer clic en «Aprobar» en el panel de administración, `VendorOnboardingController::approve()` realiza lo siguiente en orden:
1. **Cambio de rol:** Se asigna al usuario el rol `rentiva_vendor`.
2. **Sincronización de metadatos:** Los datos de la entrada de la solicitud (`_vendor_*`) se copian en las tablas de metadatos de usuario (`_mhmrentiva_vendor_*`). Desde la v4.23.1, también se sincronizan los campos `_vendor_account_holder` y `_vendor_tax_office`.
3. **Registro:** Se guardan la fecha de aprobación y el ID del administrador que la aprueba.
4. **Notificación:** Se activa el hook `mhmrentiva_vendor_approved`.

### Flujo de rechazo (`Reject`)
Cuando el administrador rechaza una solicitud:
1. El estado de la solicitud pasa a `trash`.
2. El motivo del rechazo se escribe en `_vendor_rejection_note`.
3. Se activa el hook `mhmrentiva_vendor_rejected`.

---

## 📧 5. Notificaciones por correo electrónico

Todos los cambios de estado del ciclo de vida del vendedor los gestiona la clase `VendorNotifications`:
- **Solicitud recibida:** Se avisa al solicitante de que su solicitud está en revisión.
- **Aprobada:** Se envía un mensaje de bienvenida y los datos de acceso al panel.
- **Rechazada:** Se envía un correo electrónico informativo con el motivo del rechazo.

---

## 🚗 6. Proceso de envío de vehículos (v4.23.0)

Una vez aprobado, el vendedor puede añadir vehículos mediante el formulario `[rentiva_vehicle_submit]`. Funciones añadidas en la v4.23.0:

### Selección de ubicación/ruta filtrada por ciudad
Las ubicaciones y rutas de transferencia se filtran según el valor meta `_vendor_city` del vendedor. Se utiliza `LocationProvider::get_by_city()` para consultar por ciudad.

### Precios por ruta
Los vendedores pueden fijar su propio precio para cada ruta. Se aplica el rango `min_price` / `max_price` definido por el administrador. Clave meta: `_mhmrentiva_transfer_route_prices` (JSON).

### Campos de capacidad
- **Capacidad de pasajeros:** Número máximo de pasajeros.
- **Límites de equipaje:** Capacidad de equipaje grande y pequeño.

### Subida del permiso de circulación
Los vendedores pueden subir el permiso de circulación del vehículo a través del formulario. El administrador revisa este documento para su verificación.

### Subida del documento del seguro del vehículo (v4.23.1)
Además del permiso de circulación, se puede subir un documento del seguro. Clave meta: `_mhmrentiva_vehicle_insurance_doc`. Este campo se trasladó del formulario de solicitud al formulario de envío de vehículos, lo que permite un documento de seguro independiente para cada vehículo.

### Control de anuncios de pago (v4.24.1)

Si el administrador ha activado el sistema de anuncios de pago, el vehículo se guarda como **borrador** cuando el vendedor envía el formulario, y se redirige al vendedor a la página de pago de WooCommerce. Una vez completado el pago, el vehículo pasa automáticamente al estado «Pendiente de revisión». Consulta [Sistema de anuncios de pago](/docs/vendor/vendor-management#-paid-listing-system-v4241) para más detalles.

### Edición y nueva revisión
Cuando un vendedor modifica un campo crítico (marca, modelo, matrícula, etc.), el vehículo vuelve a ponerse automáticamente en la cola de revisión (`VendorVehicleReviewManager`). Los cambios menores (precio, descripción) se publican de inmediato.

### Insignia de vendedor
Los vehículos de vendedores se marcan con una insignia de vendedor en las tarjetas de vehículo.

---

## Resumen de la sección
- El proceso de incorporación se basa totalmente en AJAX y no requiere recargar la página.
- Los datos financieros sensibles (IBAN) se cifran a nivel de hardware/servidor.
- La sincronización de rol y metadatos se ejecuta como una operación atómica.
- El formulario de solicitud admite la subida de 3 documentos (identidad, permiso de conducir, justificante de domicilio). El documento del seguro se trasladó al formulario de envío de vehículos en la v4.23.1.
- El formulario de envío de vehículos incluye selección de ubicación/ruta filtrada por ciudad, precios por ruta y subida del documento del seguro.
- La selección de ciudad usa el componente SelectWoo en todos los formularios (v4.23.1).
- Si la función de anuncios de pago está activada, el envío del formulario de vehículo redirige a la página de pago de WC (v4.24.1).

## Registro de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 18.11.2026 | Pro 6.5.0 | Documentados la plantilla de acuerdo integrada para un texto vacío y el formato básico. |
| 29.06.2026 | 4.61.0 | Documentado el control del acuerdo de vendedor: casilla de consentimiento obligatoria en el formulario de solicitud, aplicación en el servidor y prueba de aceptación con marca de tiempo en la solicitud. |
| 23.04.2026 | 4.27.2 | Añadida la traducción al inglés. |
| 01.04.2026 | 4.24.1 | Control de anuncios de pago: añadido el flujo envío del vehículo → borrador → pago en WC → pendiente de revisión. |
| 28.03.2026 | 4.23.1 | Formulario de solicitud: eliminados Zonas de servicio y Seguro del vehículo. Añadidos Titular de la cuenta (obligatorio) y Delegación de Hacienda (opcional). Selección de ciudad convertida a SelectWoo. Documento del seguro del vehículo trasladado al formulario de envío de vehículos. Sincronización de metadatos actualizada. |
| 27.03.2026 | 4.23.0 | Añadidos la subida de documentos (4 tipos), el proceso de envío de vehículos, la selección de rutas filtrada por ciudad, los precios por ruta, los campos de capacidad y el mecanismo de nueva revisión. |
| 19.03.2026 | 4.21.2 | Página actualizada con detalles del cifrado HMAC y de la sincronización de metadatos. |
