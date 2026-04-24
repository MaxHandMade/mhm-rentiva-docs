---
title: Featured vehicles
description: Featured vehicles modülünün kullanım kılavuzu ve teknik detayları.
sidebar_position: 12
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
Bu sayfa, Featured vehicles modülü konusunu teknik ve operasyonel açıdan standart bir referans formatında açıklar.
:::

# 🚗 Featured vehicles

## İçindekiler
- Kullanım
- Özellikler
- Geliştirici Notları

Featured vehicles modülü, Rentiva platformundaki **vehicle** süreçlerini yönetmek ve kullanıcılara sunmak için tasarlanmıştır.

## Kullanım

:::tip GÖRSEL GELECEK
Buraya bu modülün frontend (kullanıcı tarafı) görünümünü temsil eden bir ekran görüntüsü eklenecektir.
:::

Bu modülü herhangi bir sayfaya veya yazıya eklemek için aşağıdaki kısa kodu (shortcode) kullanabilirsiniz:

```shortcode
[rentiva_featured_vehicles title="__(Featured Vehicles"]
```

Gutenberg blok editöründe **"MHM Rentiva -> Featured vehicles"** bloğunu seçerek görsel olarak da ekleyebilirsiniz.

### Parametreler

Aşağıdaki parametreler kısa kod içerisinde kullanılabilir:

| Parametre | Varsayılan | Açıklama |
| :--- | :--- | :--- |
| `title` | `__(Featured Vehicles` | Modülün **general** davranışını kontrol eder. |
| `ids` | `(boş)` | Virgülle ayrılmış ID listesi (Örn: `12,15,44`). |
| `category` | `(boş)` | Modülün **feature** davranışını kontrol eder. |
| `limit` | `6` | Görüntülenecek maksimum öğe sayısı. |
| `layout` | `grid` | Modülün **general** davranışını kontrol eder. |
| `columns` | `3` | Modülün **general** davranışını kontrol eder. |
| `autoplay` | `1` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `interval` | `5000` | Modülün **layout** davranışını kontrol eder. |
| `orderby` | `date` | Modülün **general** davranışını kontrol eder. |
| `order` | `DESC` | Modülün **general** davranışını kontrol eder. |
| `show_price` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_rating` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_category` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_book_button` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_features` | `1` | Modülün **general** davranışını kontrol eder. |
| `max_features` | `5` | Modülün **feature** davranışını kontrol eder. |
| `show_brand` | `0` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `show_availability` | `0` | Modülün **general** davranışını kontrol eder. |
| `show_compare_button` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_badges` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_favorite_button` | `1` | Modülün **general** davranışını kontrol eder. |
| `image_size` | `medium_large` | Modülün **layout** davranışını kontrol eder. |
| `price_format` | `daily` | Modülün **layout** davranışını kontrol eder. |
| `filter_brands` | `(boş)` | Modülün **data** davranışını kontrol eder. |
| `filter_categories` | `(boş)` | Modülün **feature** davranışını kontrol eder. |


## Özellikler

### 📱 Responsive Tasarım
- **Mobil:** Tek sütun düzeni.
- **Tablet (782px altı):** Optimize edilmiş görünüm.
- **Masaüstü:** Ayarlanan sütun veya genişlikte tam görünüm.

### 🚀 Performans Odaklı
- **Akıllı Önbellek:** Veritabanı sorguları sistem tarafından optimize edilerek önbelleğe alınır.
- **Koşullu Yükleme:** Statik dosyalar sadece modülün kullanıldığı sayfalarda yüklenir.

## Geliştirici Notları

- **HTML Yapısı:** Tüm kapsayıcılar `.mhm-rentiva-featured-vehicles-wrapper` sınıfı ile başlar.
- **Özelleştirme:** CSS değişkenleri (`--mhm-color-primary` vb.) global `css-variables.css` dosyasından miras alınır.

## Bölüm Sonu Özeti
- Featured vehicles sayfası, tekil referans başlıklarıyla standart dokümantasyon yapısına alınmıştır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.0-docs | Sayfa alfabetik olarak sıralandı ve görsel yer tutucusu eklendi. |
