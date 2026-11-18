---
title: Vehicle details
description: Vehicle details modülünün kullanım kılavuzu ve teknik detayları.
sidebar_position: 20
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
Bu sayfa, Vehicle details modülü konusunu teknik ve operasyonel açıdan standart bir referans formatında açıklar.
:::

# 🚗 Vehicle details

## İçindekiler
- Kullanım
- Özellikler
- Geliştirici Notları

Vehicle details modülü, Rentiva platformundaki **vehicle** süreçlerini yönetmek ve kullanıcılara sunmak için tasarlanmıştır.

## Kullanım

:::tip GÖRSEL GELECEK
Buraya bu modülün frontend (kullanıcı tarafı) görünümünü temsil eden bir ekran görüntüsü eklenecektir.
:::

Bu modülü herhangi bir sayfaya veya yazıya eklemek için aşağıdaki kısa kodu (shortcode) kullanabilirsiniz:

```shortcode
[rentiva_vehicle_details vehicle_id=""]
```

Gutenberg blok editöründe **"MHM Rentiva -> Vehicle details"** bloğunu seçerek görsel olarak da ekleyebilirsiniz.

### Parametreler

Aşağıdaki parametreler kısa kod içerisinde kullanılabilir:

| Parametre | Varsayılan | Açıklama |
| :--- | :--- | :--- |
| `vehicle_id` | `(boş)` | Modülün **feature** davranışını kontrol eder. |
| `show_gallery` | `1` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `show_features` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_pricing` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_booking` | `1` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `show_calendar` | `1` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `show_price` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_booking_button` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_favorite_button` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_compare_button` | `1` | Modülün **general** davranışını kontrol eder. |
| `class` | `(boş)` | Modülün **general** davranışını kontrol eder. |


## Özellikler

### 📱 Responsive Tasarım
- **Mobil:** Tek sütun düzeni.
- **Tablet (782px altı):** Optimize edilmiş görünüm.
- **Masaüstü:** Ayarlanan sütun veya genişlikte tam görünüm.

### 🚀 Performans Odaklı
- **Akıllı Önbellek:** Veritabanı sorguları sistem tarafından optimize edilerek önbelleğe alınır.
- **Koşullu Yükleme:** Statik dosyalar sadece modülün kullanıldığı sayfalarda yüklenir.

## Bilmekte fayda var

- **Dolu tarihler:** sayfa, zaten rezerve edilmiş tarihlerle açılırsa (örneğin bir aramadan) rezervasyon kartı toplam ya da kapora yerine günlük fiyatı gösterir ve "Alternatif araçlar" başlığı altında o tarihlerde boş, en fazla iki benzer araç önerir. Her birinde, aynı tarihlerle o aracın sayfasını açan **Bu aracı seç** düğmesi vardır. Müşteri tarihleri değiştirince müsaitlik ve fiyat hemen yenilenir.
- **Geçmiş ya da geçersiz tarihler:** geçmişte kalmış teslim alma saati ya da teslimden önceki dönüş fiyatlanmaz; kart nedenini söyler ("Teslim alma zamanı geçti. Lütfen daha ileri bir tarih veya saat seçin." / "Dönüş tarihi teslim alma tarihinden sonra olmalıdır.").
- **Telefon:** müsaitlik açıklaması (Seçili, Kısmen müsait, Rezerve, Kapalı) taşmaz, ikinci satıra geçer.
- **Sayı biçimi:** kilometre ve motor hacmi sayfanın diline göre yazılır (İngilizce "18,500 km" ve "1.6 L", Türkçe "18.500 km" ve "1,6 L").
- **Çok dilli siteler:** Polylang ya da WPML kullanan sitede müsaitlik mesajı her ziyaretçiye kendi dilinde gösterilir.

## Geliştirici Notları

- **HTML Yapısı:** Tüm kapsayıcılar `.mhm-rentiva-vehicle-details-wrapper` sınıfı ile başlar.
- **Özelleştirme:** CSS değişkenleri (`--mhm-color-primary` vb.) global `css-variables.css` dosyasından miras alınır.

## Bölüm Sonu Özeti
- Vehicle details sayfası, tekil referans başlıklarıyla standart dokümantasyon yapısına alınmıştır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 18.11.2026 | 6.4.0 | Dolu tarih önerileri, tarih mesajları, sayı biçimi ve çok dilli müsaitlik mesajı. |
| 19.03.2026 | 4.21.0-docs | Sayfa alfabetik olarak sıralandı ve görsel yer tutucusu eklendi. |
