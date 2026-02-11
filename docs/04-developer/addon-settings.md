---
id: addon-settings
title: 🛠️ AddonSettings Sınıf Mimarisi
sidebar_label: Addon Ayarları (Teknik)
description: AddonSettings sınıfının teknik yapısı, önbellek yönetimi, kancalar ve güvenlik protokolleri.
---

# AddonSettings Sınıfı - Teknik Dokümantasyon

![Version](https://img.shields.io/badge/version-4.9.8-blue?style=flat-square) ![Security](https://img.shields.io/badge/security-WPCS%20Compliant-green?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-24.01.2026-orange?style=flat-square)

> **🎯 Amaç** - Bu belge, MHM Rentiva eklentisindeki ek hizmetlerin (addons) davranışlarını yöneten `AddonSettings` sınıfının teknik mimarisini ve geliştirici dökümantasyonunu detaylandırır.

---

## 📋 İçindekiler

- [Genel Bakış](#-genel-bakis)
- [Sınıf Sabitleri](#-sinif-sabitleri)
- [Metotlar ve Yapı](#-metotlar-ve-yapi)
- [Performans ve Önbellek](#-performans-ve-onbellek)
- [Hooks (Kancalar)](#-hooks-kancalar)
- [Güvenlik ve Sanitizasyon](#-guvenlik-ve-sanitizasyon)
- [Değişiklik Günlüğü](#-degisiklik-gunlugu)

---

## 🏗️ Genel Bakış

`AddonSettings` sınıfı, ek hizmetlerin (GPS, çocuk koltuğu vb.) görüntülenmesini, fiyatlandırılmasını ve admin paneli üzerindeki davranışlarını yapılandırmak için geliştirilmiş `final` bir sınıftır. Tüm işlemler statik metotlar üzerinden yürütülür.

**Temel Fonksiyonlar:**
- ✅ WordPress Settings API ile tam entegrasyon
- ✅ Multi-level Caching (Runtime + Object Cache)
- ✅ Dinamik Form Render (Match Expressions & Fallback)
- ✅ Whitelist Kayıt Mekanizması

---

## 📌 Sınıf Sabitleri

Sınıfın çalışmasını kontrol eden temel yapılandırma değerleri:

| Sabit | Değer | Açıklama |
| :--- | :--- | :--- |
| `SECTION_ID` | `mhm_rentiva_addons_section` | Ayarlar sayfasındaki bölüm ID'si. |
| `OPTION_NAME` | `mhm_rentiva_settings` | Ana ayarlar dizisinin opsiyon adı. |
| `CACHE_KEY` | `mhm_rentiva_settings_addons_v1` | Nesne önbelleği için kullanılan anahtar. |
| `CACHE_TTL` | `3600` | Önbellek geçerlilik süresi (1 saat). |

---

## ⚙️ Metotlar ve Yapı

### 1. `init()`
Bileşeni başlatır. Şu an için `SettingsCore` tarafından çağrılmaktadır ancak bileşene özel kancaların eklenebileceği merkezi noktadır.

```php
public static function init(): void
```

### 2. `get_fields_config()`
Alan yapılandırmasını merkezi bir dizi olarak döndürür. Bu dizi; tip, başlık ve varsayılan değerleri belirler.

**Önemli Alanlar:**
- `mhm_rentiva_addon_require_confirmation`: (checkbox) Ek hizmet onayı gerekir mi?
- `mhm_rentiva_addon_show_prices_in_calendar`: (checkbox) Takvimde fiyat gösterimi.
- `mhm_rentiva_addon_display_order`: (select) Sıralama düzeni.

### 3. `register()`
Ayarları WordPress'e kaydeder. Whitelist (beyaz liste) kontrolü için `register_setting` çağrısını içerir.

```php
public static function register(): void
```

---

## 🚀 Performans ve Önbellek

Sınıf, veritabanı yükünü minimize etmek için **iki aşamalı** bir önbellek stratejisi uygular:

1.  **Level 1: Runtime Cache:** `$runtime_cache` değişkeni üzerinden aynı sayfa yüklemesi içindeki tekrarlı çağrıları engeller.
2.  **Level 2: Object Cache:** Redis veya Memcached aktifse `wp_cache_set` üzerinden veriyi hafızada tutar.

**Önbelleği Temizleme:**
`clear_cache()` metodu ayarlar güncellendiğinde veya manuel olarak tetiklendiğinde her iki seviyeyi de temizler:

```php
public static function clear_cache(): void
{
    self::$runtime_cache = null;
    wp_cache_delete(self::CACHE_KEY, 'mhm-rentiva');
}
```

---

## 🪝 Hooks (Kancalar)

Geliştiricilerin ayarları genişletebilmesi için sağlanan filtreler:

| Filtre Adı | Parametreler | Açıklama |
| :--- | :--- | :--- |
| `mhm_rentiva_addon_settings_fields` | `array $fields` | Ayar alanları listesini değiştirir. |
| `mhm_rentiva_addon_default_settings` | `array $defaults` | Varsayılan değer dizisini filtreler. |

---

## 🔒 Güvenlik ve Sanitizasyon

`sanitize_settings` metodu, PHP 8.0 `match` ifadesini kullanarak tüm girişleri tip bazlı doğrular:

- **Checkbox:** `1` veya `0` olarak zorlanır.
- **Select:** Sadece `get_fields_config` içinde tanımlı opsiyonları kabul eder.
- **Number/Int:** `absint()` ile mutlak tam sayıya dönüştürülür.
- **Whitelist:** `manage_options` yetkisi olmayan kullanıcıların kaydetme işlemi engellenir.

**Hata Önleme:** `register_field` metodu dinamik callback yapısında `is_callable` kontrolü yaparak tanımlanmamış metodların siteyi çökertmesini (Fatal Error) engeller.

---

## 🔄 Değişiklik Günlüğü

| Tarih | Değişiklik | Sürüm |
| :--- | :--- | :--- |
| 24.01.2026 | PHP 8.0 `match` ifadesi ve tip casting optimizasyonları yapıldı. | 4.9.8 |
| 24.01.2026 | `init()` metodu ve merkezi `clear_cache` yapısı eklendi. | 4.9.8 |
| 24.01.2026 | `is_callable` güvenliği ve fallback render metodu eklendi. | 4.6.1 |
| 22.01.2026 | Çok katmanlı caching desteği eklendi. | 4.0.0 |
