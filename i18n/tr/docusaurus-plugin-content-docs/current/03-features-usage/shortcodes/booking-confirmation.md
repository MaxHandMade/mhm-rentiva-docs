---
title: Booking confirmation
description: Booking confirmation modülünün kullanım kılavuzu ve teknik detayları.
sidebar_position: 7
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, Booking confirmation modülü konusunu teknik ve operasyonel açıdan standart bir referans formatında açıklar.
:::

# 🚗 Booking confirmation

## İçindekiler
- Kullanım
- Özellikler
- Geliştirici Notları

Booking confirmation modülü, Rentiva platformundaki **reservation** süreçlerini yönetmek ve kullanıcılara sunmak için tasarlanmıştır.

## Kullanım

:::tip GÖRSEL GELECEK
Buraya bu modülün frontend (kullanıcı tarafı) görünümünü temsil eden bir ekran görüntüsü eklenecektir.
:::

Bu modülü herhangi bir sayfaya veya yazıya eklemek için aşağıdaki kısa kodu (shortcode) kullanabilirsiniz:

```shortcode
[rentiva_booking_confirmation booking_id=""]
```

Gutenberg blok editöründe **"MHM Rentiva -> Booking confirmation"** bloğunu seçerek görsel olarak da ekleyebilirsiniz.

### Parametreler

Aşağıdaki parametreler kısa kod içerisinde kullanılabilir:

| Parametre | Varsayılan | Açıklama |
| :--- | :--- | :--- |
| `booking_id` | `(boş)` | Modülün **feature** davranışını kontrol eder. |
| `show_details` | `1` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `show_actions` | `1` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
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

- **HTML Yapısı:** Tüm kapsayıcılar `.mhm-rentiva-booking-confirmation-wrapper` sınıfı ile başlar.
- **Özelleştirme:** CSS değişkenleri (`--mhm-color-primary` vb.) global `css-variables.css` dosyasından miras alınır.

## Bölüm Sonu Özeti
- Booking confirmation sayfası, tekil referans başlıklarıyla standart dokümantasyon yapısına alınmıştır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.0-docs | Sayfa alfabetik olarak sıralandı ve görsel yer tutucusu eklendi. |
