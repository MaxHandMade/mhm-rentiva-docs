---
title: Vendor vehicle submission
description: Vendor vehicle submission modülünün kullanım kılavuzu ve teknik detayları.
sidebar_position: 25
---
![Version](https://img.shields.io/badge/version-4.23.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-27.03.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, Vendor vehicle submission modülü konusunu teknik ve operasyonel açıdan standart bir referans formatında açıklar.
:::

# 🚗 Vendor vehicle submission

## İçindekiler
- Kullanım
- Özellikler
- Geliştirici Notları

Vendor vehicle submission modülü, Rentiva platformundaki **vendor** süreçlerini yönetmek ve kullanıcılara sunmak için tasarlanmıştır.

## Kullanım

:::tip GÖRSEL GELECEK
Buraya bu modülün frontend (kullanıcı tarafı) görünümünü temsil eden bir ekran görüntüsü eklenecektir.
:::

Bu modülü herhangi bir sayfaya veya yazıya eklemek için aşağıdaki kısa kodu (shortcode) kullanabilirsiniz:

```shortcode
[rentiva_vehicle_submit]
```

Gutenberg blok editöründe **"MHM Rentiva -> Vendor vehicle submission"** bloğunu seçerek görsel olarak da ekleyebilirsiniz.

### Parametreler

Aşağıdaki parametreler kısa kod içerisinde kullanılabilir:

| Parametre | Varsayılan | Açıklama |
| :--- | :--- | :--- |
| - | - | Bu kısa kod parametre almaz. |


## Özellikler

### 📱 Responsive Tasarim
- **Mobil:** Tek sutun düzeni.
- **Tablet (782px alti):** Optimize edilmis gorunum.
- **Masaustu:** Ayarlanan sutun veya genislikte tam gorunum.

### 🚀 Performans Odakli
- **Akilli Önbellek:** Veritabanı sorgulari sistem tarafından optimize edilerek onbellege alınır.
- **Koşullu Yükleme:** Statik dosyalar sadece modulun kullanildigi sayfalarda yüklenir.

### 🚗 Transfer Lokasyon ve Rota Seçimi (v4.23.0)

v4.23.0 ile araç ekleme formuna transfer modulune ozel alanlar eklenmiştir:

#### Şehir-Filtrelenms Lokasyon Seçimi
Vendor'in `_vendor_city` meta değerine gore transfer lokasyonlari otomatik filtrelenir. `LocationProvider::get_by_city()` ile sorgulama yapilir. Vendor yalnızca kendi sehrine ait lokasyonlari gorebilir ve secebilir.

- **Meta key:** `_mhm_rentiva_transfer_locations` (array)
- **Meta key:** `_mhm_rentiva_transfer_routes` (array)

#### Rota Basi Fiyat Girişi
Her secilen rota için vendor, admin tarafından belirlenen `min_price` / `max_price` araligi dahilinde kendi fiyatini girebilir. Aralik disinda fiyat kabul edilmez.

- **Meta key:** `_mhm_rentiva_transfer_route_prices` (JSON)
- **Fallback:** Vendor fiyati yoksa rotanin `base_price` değeri kullanılır.

#### Yolcu ve Bagaj Kapasitesi
- **Yolcu kapasitesi:** Aracın tasiyabilecegi maksimum yolcu sayısı.
- **Buyuk bagaj:** Maksimum buyuk valiz kapasitesi.
- **Kucuk bagaj:** Maksimum kucuk valiz/canta kapasitesi.

#### Araç Belgesi (Ruhsat) Yükleme
Vendor, araç ruhsat belgesini form üzerinden yukleyebilir. Bu belge admin tarafından doğrulama için incelenir.

## Geliştirici Notları

- **HTML Yapısı:** Tum kapsayıcılar `.mhm-rentiva-vehicle-submit-wrapper` sınıfı ile başlar.
- **Ozellestirme:** CSS degiskenleri (`--mhm-color-primary` vb.) global `css-variables.css` dosyasından miras alınır.
- **Transfer alanları:** Hizmet turu "Transfer" veya "Her Ikisi" secildiginde JS ile gosterilir/gizlenir (hide/show toggle).

## Bölüm Sonu Özeti
- Vendor araç ekleme formu, temel araç bilgilerinin yaninda transfer lokasyon/rota seçimi, rota basi fiyatlandırma ve kapasite alanlarıni icerir.
- Şehir bazli filtreleme ile vendor yalnızca kendi bolgesindeki lokasyonlari gorebilir.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 27.03.2026 | 4.23.0 | Şehir-filtrelenmiş transfer lokasyon/rota seçimi, rota basi fiyatlandırma, kapasite alanları, ruhsat yükleme dokumante edildi. |
| 19.03.2026 | 4.21.0-docs | Sayfa alfabetik olarak siralandi ve görsel yer tutucusu eklendi. |
