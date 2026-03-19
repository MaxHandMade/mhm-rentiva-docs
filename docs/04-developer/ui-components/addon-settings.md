---
id: addon-settings
title: AddonSettings Sınıf Mimarisi (UI)
sidebar_label: Addon Ayarları (Teknik)
sidebar_position: 1
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, Rentiva "Ek Hizmetler" (Addons) ayarlarının yönetim panelinde nasıl yapılandırıldığını ve `AddonSettings` sınıfının teknik mimarisini açıklar.
:::

# 🛠️ AddonSettings Sınıfı

`AddonSettings`, WP Settings API'si üzerine inşa edilmiş, ek hizmetlerin (Addon) global davranışlarını yöneten bir ayar grubudur.

---

## 🏗️ Mimari Yapı

Sınıf, modular bir yapı kullanarak `SettingsCore` ve `SettingsHelper` bileşenleriyle entegre çalışır:
- **Namespace:** `MHMRentiva\Admin\Settings\Groups`
- **Methodlar:** Statik metodlar üzerinden kayıt (`register`), varsayılan değer tanımlama (`get_default_settings`) ve erişim (`require_confirmation`) sağlar.

---

## 📝 Kayıt ve Alan Tanımları

`register()` metodu, WordPress'e yeni bir sekme (Section) ve ayar alanları ekler:

```php
public static function register(): void {
    $page_slug = SettingsCore::PAGE;

    add_settings_section(
        self::SECTION_ID,
        __( 'Additional Services Settings', 'mhm-rentiva' ),
        array( self::class, 'render_section_description' ),
        $page_slug
    );

    // SettingsHelper kullanımı ile alan kaydı
    SettingsHelper::checkbox_field($page_slug, 'mhm_rentiva_addon_require_confirmation', ...);
    SettingsHelper::select_field($page_slug, 'mhm_rentiva_addon_display_order', ...);
}
```

---

## 📋 Mevcut Ayar Alanları

| Ayar Anahtarı (Option) | UI Tipi | Varsayılan | Açıklama |
| :--- | :--- | :--- | :--- |
| `require_confirmation` | **Checkbox** | `0` (False) | Ek hizmetler için manuel onay gerekip gerekmediği. |
| `show_prices_in_calendar` | **Checkbox** | `1` (True) | Takvimde ek hizmet fiyatlarının gösterilip gösterilmeyeceği. |
| `display_order` | **Select** | `menu_order` | Ek hizmetlerin sıralama kriteri (Başlık, Fiyat, Tarih). |

---

## 🛡️ Veri Erişimi (Static Accessors)

Geliştiriciler, ham `get_option` yerine tip güvenli (type-safe) accessor metodlarını kullanmalıdır:

```php
// Onay gereksinimi kontrolü
if ( AddonSettings::require_confirmation() ) {
    // Mantık
}
```

## Bölüm Sonu Özeti
- `AddonSettings`, WP Settings API'sini modernize eden bir katmandır.
- Tüm ayarlar `SettingsCore::get()` üzerinden atomik olarak çekilir.
- Görsel tasarım rehberi için `/website/static/img/docs/ui-components/` altındaki varlıklara bakılabilir.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | Sayfa, modern SettingsHelper ve modularite yapısına göre güncellendi. |

