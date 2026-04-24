---
title: Booking form
description: Booking form modülünün kullanım kılavuzu ve teknik detayları.
sidebar_position: 8
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
Bu sayfa, Booking form modülü konusunu teknik ve operasyonel açıdan standart bir referans formatında açıklar.
:::

# 🚗 Booking form

## İçindekiler
- Kullanım
- Özellikler
- Geliştirici Notları

Booking form modülü, Rentiva platformundaki **reservation** süreçlerini yönetmek ve kullanıcılara sunmak için tasarlanmıştır.

## Kullanım

:::tip GÖRSEL GELECEK
Buraya bu modülün frontend (kullanıcı tarafı) görünümünü temsil eden bir ekran görüntüsü eklenecektir.
:::

Bu modülü herhangi bir sayfaya veya yazıya eklemek için aşağıdaki kısa kodu (shortcode) kullanabilirsiniz:

```shortcode
[rentiva_booking_form vehicle_id=""]
```

Gutenberg blok editöründe **"MHM Rentiva -> Booking form"** bloğunu seçerek görsel olarak da ekleyebilirsiniz.

### Parametreler

Aşağıdaki parametreler kısa kod içerisinde kullanılabilir:

| Parametre | Varsayılan | Açıklama |
| :--- | :--- | :--- |
| `vehicle_id` | `(boş)` | Modülün **feature** davranışını kontrol eder. |
| `start_date` | `(boş)` | Modülün **general** davranışını kontrol eder. |
| `end_date` | `(boş)` | Modülün **workflow** davranışını kontrol eder. |
| `show_vehicle_selector` | `1` | Modülün **general** davranışını kontrol eder. |
| `default_days` | `(ayarlardan gelir)` | Modülün **workflow** davranışını kontrol eder. |
| `min_days` | `(ayarlardan gelir)` | Modülün **workflow** davranışını kontrol eder. |
| `max_days` | `(ayarlardan gelir)` | Modülün **workflow** davranışını kontrol eder. |
| `show_payment_options` | `1` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `show_addons` | `1` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `class` | `(boş)` | Modülün **general** davranışını kontrol eder. |
| `redirect_url` | `(boş)` | Modülün **workflow** davranışını kontrol eder. |
| `enable_deposit` | `1` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `default_payment` | `deposit` | Modülün **workflow** davranışını kontrol eder. |
| `form_title` | `(boş)` | Modülün **content** davranışını kontrol eder. |
| `show_vehicle_info` | `1` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `show_time_select` | `1` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |


## Özellikler

### 📱 Responsive Tasarım
- **Mobil:** Tek sütun düzeni.
- **Tablet (782px altı):** Optimize edilmiş görünüm.
- **Masaüstü:** Ayarlanan sütun veya genişlikte tam görünüm.

### 🚀 Performans Odaklı
- **Akıllı Önbellek:** Veritabanı sorguları sistem tarafından optimize edilerek önbelleğe alınır.
- **Koşullu Yükleme:** Statik dosyalar sadece modülün kullanıldığı sayfalarda yüklenir.

## Geliştirici Notları

- **HTML Yapısı:** Tüm kapsayıcılar `.mhm-rentiva-booking-form-wrapper` sınıfı ile başlar.
- **Özelleştirme:** CSS değişkenleri (`--mhm-color-primary` vb.) global `css-variables.css` dosyasından miras alınır.

## Bölüm Sonu Özeti
- Booking form sayfası, tekil referans başlıklarıyla standart dokümantasyon yapısına alınmıştır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.0-docs | Sayfa alfabetik olarak sıralandı ve görsel yer tutucusu eklendi. |
