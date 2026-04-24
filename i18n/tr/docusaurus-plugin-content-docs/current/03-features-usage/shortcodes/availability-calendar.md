---
title: Availability calendar
description: Availability calendar modülünün kullanım kılavuzu ve teknik detayları.
sidebar_position: 6
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, Availability calendar modülü konusunu teknik ve operasyonel açıdan standart bir referans formatında açıklar.
:::

# 🚗 Availability calendar

## İçindekiler
- Kullanım
- Özellikler
- Geliştirici Notları

Availability calendar modülü, Rentiva platformundaki **reservation** süreçlerini yönetmek ve kullanıcılara sunmak için tasarlanmıştır.

## Kullanım

:::tip GÖRSEL GELECEK
Buraya bu modülün frontend (kullanıcı tarafı) görünümünü temsil eden bir ekran görüntüsü eklenecektir.
:::

Bu modülü herhangi bir sayfaya veya yazıya eklemek için aşağıdaki kısa kodu (shortcode) kullanabilirsiniz:

```shortcode
[rentiva_availability_calendar vehicle_id=""]
```

Gutenberg blok editöründe **"MHM Rentiva -> Availability calendar"** bloğunu seçerek görsel olarak da ekleyebilirsiniz.

### Parametreler

Aşağıdaki parametreler kısa kod içerisinde kullanılabilir:

| Parametre | Varsayılan | Açıklama |
| :--- | :--- | :--- |
| `vehicle_id` | `(boş)` | Modülün **feature** davranışını kontrol eder. |
| `show_pricing` | `apply_filters(mhm_rentiva/availability_calendar/show_pricing` | Modülün **general** davranışını kontrol eder. |
| `show_seasonal_prices` | `apply_filters(mhm_rentiva/availability_calendar/show_seasonal_prices` | Modülün **general** davranışını kontrol eder. |
| `show_discounts` | `apply_filters(mhm_rentiva/availability_calendar/show_discounts` | Modülün **general** davranışını kontrol eder. |
| `show_booking_button` | `apply_filters(` | Modülün **general** davranışını kontrol eder. |
| `theme` | `apply_filters(mhm_rentiva/availability_calendar/theme` | Modülün **general** davranışını kontrol eder. |
| `start_date` | `(boş)` | Modülün **general** davranışını kontrol eder. |
| `months_ahead` | `apply_filters(mhm_rentiva/availability_calendar/months_ahead` | Modülün **general** davranışını kontrol eder. |
| `months_to_show` | `apply_filters(mhm_rentiva/availability_calendar/months_to_show` | Modülün **general** davranışını kontrol eder. |
| `start_month` | `(boş)` | Modülün **general** davranışını kontrol eder. |
| `show_weekends` | `apply_filters(mhm_rentiva/availability_calendar/show_weekends` | Modülün **general** davranışını kontrol eder. |
| `show_past_dates` | `apply_filters(mhm_rentiva/availability_calendar/show_past_dates` | Modülün **general** davranışını kontrol eder. |
| `integrate_pricing` | `apply_filters(mhm_rentiva/availability_calendar/integrate_pricing` | Modülün **general** davranışını kontrol eder. |
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

- **HTML Yapısı:** Tüm kapsayıcılar `.mhm-rentiva-availability-calendar-wrapper` sınıfı ile başlar.
- **Özelleştirme:** CSS değişkenleri (`--mhm-color-primary` vb.) global `css-variables.css` dosyasından miras alınır.

## Bölüm Sonu Özeti
- Availability calendar sayfası, tekil referans başlıklarıyla standart dokümantasyon yapısına alınmıştır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.0-docs | Sayfa alfabetik olarak sıralandı ve görsel yer tutucusu eklendi. |
