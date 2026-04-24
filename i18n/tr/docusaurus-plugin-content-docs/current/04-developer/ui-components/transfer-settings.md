---
id: transfer-settings
title: Transfer Settings (Global Config)
sidebar_label: Transfer Settings
sidebar_position: 8
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
Bu sayfa, transfer modülünün global davranışını (Ödeme kuralları, depozito oranları ve özel kategoriler) belirleyen `TransferSettings` sınıfını açıklar.
:::

# ⚙️ Transfer Settings

`TransferSettings`, transfer operasyonlarının finansal ve yapısal kurallarını belirleyen merkezi sınıftır. Rentiva'nın modern `SettingsHelper` ve `SettingsCore` mimarisine tam entegre çalışır.

---

## 🏗️ Ayar Grupları ve Sahalar

Sınıf, admin panelinde `mhm_rentiva_transfer_section` ID'si ile aşağıdaki ayarları yönetir:

### 1. Ödeme Davranışı (Payment Type)
Müşterinin transfer rezervasyonu sırasında yapacağı ödeme modelini belirler:
- **Full Payment Required:** Ücretin tamamı rezervasyon anında tahsil edilir.
- **Deposit (Percentage):** Sadece belirlenen bir yüzde (depozito) tahsil edilir.

### 2. Depozito Oranları (Deposit Rate)
Eğer ödeme modeli "Percentage" seçildiyse uygulanacak orandır.
- **Default:** %20
- **Range:** %0 - %100 (Type-safe `number_field` doğrulaması).

### 3. Özel Lokasyon Tipleri (Custom Location Types)
Varsayılan lokasyon tiplerine (Havalimanı, Otel vb.) ek olarak operasyonel ihtiyaçlara göre elle girilen tiplerdir.
- **Format:** Her satıra bir kategori gelecek şekilde `textarea_field` üzerinden girilir.
- **Örnek:** `Stadium`, `Exhibition Center`, `Yacht Marina`.

---

## 🛠️ Teknik Entegrasyon

### Kayıt (Registration)
Ayar sahaları `SettingsHelper` üzerinden tip güvenliği ile kaydedilir:

```php
SettingsHelper::select_field(
    $page_slug,
    'mhm_transfer_deposit_type',
    __( 'Payment Type', 'mhm-rentiva' ),
    $options,
    $description,
    self::SECTION_TRANSFER
);
```

### Erişim (Accessors)
Kodun diğer kısımlarından bu ayarlara güvenli erişim için statik metodlar mevcuttur:
- `TransferSettings::get_deposit_type()`
- `TransferSettings::get_deposit_rate()`

---

## 🛡️ Doğrulama Kuralları

- **Sanitization:** String veriler `sanitize_text_field`, textarea verileri `sanitize_textarea_field` ile süzülür.
- **Validation:** Sayısal alanlar `absint` ile tam sayıya zorlanır ve belirtilen min/max değerleri dışına çıkamaz.

## Bölüm Sonu Özeti
- Transfer modülünün tüm global kuralları bu sınıf tarafından yönetilir.
- Ayarlar Rentiva'nın genel ayar sayfasında entegre bir bölüm olarak sunulur.
- Ödeme kuralları doğrudan `TransferBookingHandler` tarafından referans alınır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | TransferSettings sınıfı, ödeme modelleri ve lokasyon tiplerine göre güncellendi. |
