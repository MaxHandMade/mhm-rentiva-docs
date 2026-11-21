---
id: addon-settings
title: "Arquitectura de la clase AddonSettings (UI)"
sidebar_label: "Ajustes de servicios adicionales (técnico)"
sidebar_position: 1
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Propósito
Esta página explica cómo se configuran en el panel de administración los ajustes de «Servicios adicionales» (Add-ons) de Rentiva y describe la arquitectura técnica de la clase `AddonSettings`.
:::

# 🛠️ Clase AddonSettings

`AddonSettings` es un grupo de ajustes construido sobre la WP Settings API que gestiona el comportamiento global de los servicios adicionales.

---

## 🏗️ Arquitectura

La clase se integra con `SettingsCore` y `SettingsHelper` mediante una estructura modular:
- **Espacio de nombres:** `MHMRentiva\Admin\Settings\Groups`
- **Métodos:** el registro (`register`), la definición de valores predeterminados (`get_default_settings`) y el acceso (`require_confirmation`) se gestionan mediante métodos estáticos.

---

## 📝 Registro y definiciones de campos

El método `register()` añade una nueva sección y campos de ajustes a WordPress:

```php
public static function register(): void {
    $page_slug = SettingsCore::PAGE;

    add_settings_section(
        self::SECTION_ID,
        __( 'Additional Services Settings', 'mhm-rentiva' ),
        array( self::class, 'render_section_description' ),
        $page_slug
    );

    // Field registration via SettingsHelper
    SettingsHelper::checkbox_field($page_slug, 'mhmrentiva_addon_require_confirmation', ...);
    SettingsHelper::select_field($page_slug, 'mhmrentiva_addon_display_order', ...);
}
```

---

## 📋 Campos de ajustes disponibles

| Clave de opción | Tipo de UI | Predeterminado | Descripción |
| :--- | :--- | :--- | :--- |
| `require_confirmation` | **Casilla de verificación** | `0` (False) | Si se requiere confirmación manual para los servicios adicionales. |
| `show_prices_in_calendar` | **Casilla de verificación** | `1` (True) | Si los precios de los servicios adicionales se muestran en el calendario. |
| `display_order` | **Seleccionar** | `menu_order` | Criterio de ordenación de los servicios adicionales (título, precio, fecha). |

---

## 🛡️ Acceso a los datos (accesores estáticos)

Los desarrolladores deben usar los métodos de acceso con seguridad de tipos en lugar de `get_option` directamente:

```php
// Check confirmation requirement
if ( AddonSettings::require_confirmation() ) {
    // Logic
}
```

## Resumen de la sección
- `AddonSettings` es una capa de modernización sobre la WP Settings API.
- Todos los ajustes se obtienen de forma atómica mediante `SettingsCore::get()`.
- Para referencias de diseño visual, consulta los recursos en `/website/static/img/docs/ui-components/`.

## Historial de cambios
| Fecha | Versión | Nota |
|---|---|---|
| 23.04.2026 | 4.27.2 | Se ha añadido la traducción al inglés. |
| 19.03.2026 | 4.21.2 | Página actualizada para reflejar la estructura moderna de SettingsHelper y la modularidad. |
