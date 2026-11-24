---
id: addon-settings
title: "Architektur der AddonSettings-Klasse (UI)"
sidebar_label: "Zusatzleistungen-Einstellungen (Technik)"
sidebar_position: 1
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Diese Seite erklärt, wie die Einstellungen für die „Zusatzleistungen“ (Add-ons) von Rentiva im Admin-Bereich konfiguriert werden, und beschreibt die technische Architektur der Klasse `AddonSettings`.
:::

# 🛠️ AddonSettings-Klasse

`AddonSettings` ist eine auf der WP Settings API aufbauende Einstellungsgruppe, die das globale Verhalten der Zusatzleistungen steuert.

---

## 🏗️ Architektur

Die Klasse ist über eine modulare Struktur mit `SettingsCore` und `SettingsHelper` integriert:
- **Namespace:** `MHMRentiva\Admin\Settings\Groups`
- **Methoden:** Registrierung (`register`), Festlegung der Standardwerte (`get_default_settings`) und Zugriff (`require_confirmation`) erfolgen jeweils über statische Methoden.

---

## 📝 Registrierung und Felddefinitionen

Die Methode `register()` fügt WordPress einen neuen Abschnitt und Einstellungsfelder hinzu:

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

## 📋 Verfügbare Einstellungsfelder

| Optionsschlüssel | UI-Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `require_confirmation` | **Checkbox** | `0` (False) | Legt fest, ob für Zusatzleistungen eine manuelle Bestätigung erforderlich ist. |
| `show_prices_in_calendar` | **Checkbox** | `1` (True) | Legt fest, ob die Preise der Zusatzleistungen im Kalender angezeigt werden. |
| `display_order` | **Auswählen** | `menu_order` | Sortierkriterium für Zusatzleistungen (Titel, Preis, Datum). |

---

## 🛡️ Datenzugriff (statische Accessoren)

Entwickler sollten statt des direkten `get_option` die typsicheren Accessor-Methoden verwenden:

```php
// Check confirmation requirement
if ( AddonSettings::require_confirmation() ) {
    // Logic
}
```

## Zusammenfassung des Abschnitts
- `AddonSettings` ist eine Modernisierungsschicht auf Basis der WP Settings API.
- Alle Einstellungen werden atomar über `SettingsCore::get()` abgerufen.
- Referenzen zum visuellen Design findest du in den Assets unter `/website/static/img/docs/ui-components/`.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Seite aktualisiert, um die moderne SettingsHelper- und Modularitätsstruktur widerzuspiegeln. |
