---
title: Vehicle comparison
description: Vehicle comparison modülünün kullanım kılavuzu ve teknik detayları.
sidebar_position: 19
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, Vehicle comparison modülü konusunu teknik ve operasyonel açıdan standart bir referans formatında açıklar.
:::

# 🚗 Vehicle comparison

## İçindekiler
- Kullanım
- Özellikler
- Geliştirici Notları

Vehicle comparison modülü, Rentiva platformundaki **vehicle** süreçlerini yönetmek ve kullanıcılara sunmak için tasarlanmıştır.

## Kullanım

:::tip GÖRSEL GELECEK
Buraya bu modülün frontend (kullanıcı tarafı) görünümünü temsil eden bir ekran görüntüsü eklenecektir.
:::

Bu modülü herhangi bir sayfaya veya yazıya eklemek için aşağıdaki kısa kodu (shortcode) kullanabilirsiniz:

```shortcode
[rentiva_vehicle_comparison vehicle_ids=""]
```

Gutenberg blok editöründe **"MHM Rentiva -> Vehicle comparison"** bloğunu seçerek görsel olarak da ekleyebilirsiniz.

### Parametreler

Aşağıdaki parametreler kısa kod içerisinde kullanılabilir:

| Parametre | Varsayılan | Açıklama |
| :--- | :--- | :--- |
| `vehicle_ids` | `(boş)` | Modülün **feature** davranışını kontrol eder. |
| `show_features` | `all` | Modülün **general** davranışını kontrol eder. |
| `max_vehicles` | `4` | Modülün **general** davranışını kontrol eder. |
| `show_add_vehicle` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_remove_buttons` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_prices` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_images` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_booking_buttons` | `1` | Modülün **general** davranışını kontrol eder. |
| `layout` | `table` | Modülün **general** davranışını kontrol eder. |
| `title` | `(boş)` | Modülün **general** davranışını kontrol eder. |
| `manual_add` | `0` | Modülün **general** davranışını kontrol eder. |
| `class` | `(boş)` | Modülün **general** davranışını kontrol eder. |


## Özellikler

### 📱 Responsive Tasarım
- **Mobil:** Tek sütun düzeni.
- **Tablet (782px altı):** Optimize edilmiş görünüm.
- **Masaüstü:** Ayarlanan sütun veya genişlikte tam görünüm.

### 🚀 Performans Odaklı
- **Akıllı Önbellek:** Veritabanı sorguları sistem tarafından optimize edilerek önbelleğe alınır.
- **Koşullu Yükleme:** Statik dosyalar sadece modülün kullanıldığı sayfalarda yüklenir.

## Geliştirici Notları

- **HTML Yapısı:** Tüm kapsayıcılar `.mhm-rentiva-vehicle-comparison-wrapper` sınıfı ile başlar.
- **Özelleştirme:** CSS değişkenleri (`--mhm-color-primary` vb.) global `css-variables.css` dosyasından miras alınır.

## Bölüm Sonu Özeti
- Vehicle comparison sayfası, tekil referans başlıklarıyla standart dokümantasyon yapısına alınmıştır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.0-docs | Sayfa alfabetik olarak sıralandı ve görsel yer tutucusu eklendi. |
