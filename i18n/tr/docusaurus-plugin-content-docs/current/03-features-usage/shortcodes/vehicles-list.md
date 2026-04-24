---
title: Vehicles list
description: Vehicles list modülünün kullanım kılavuzu ve teknik detayları.
sidebar_position: 23
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
Bu sayfa, Vehicles list modülü konusunu teknik ve operasyonel açıdan standart bir referans formatında açıklar.
:::

# 🚗 Vehicles list

## İçindekiler
- Kullanım
- Özellikler
- Geliştirici Notları

Vehicles list modülü, Rentiva platformundaki **vehicle** süreçlerini yönetmek ve kullanıcılara sunmak için tasarlanmıştır.

## Kullanım

:::tip GÖRSEL GELECEK
Buraya bu modülün frontend (kullanıcı tarafı) görünümünü temsil eden bir ekran görüntüsü eklenecektir.
:::

Bu modülü herhangi bir sayfaya veya yazıya eklemek için aşağıdaki kısa kodu (shortcode) kullanabilirsiniz:

```shortcode
[rentiva_vehicles_list limit="12"]
```

Gutenberg blok editöründe **"MHM Rentiva -> Vehicles list"** bloğunu seçerek görsel olarak da ekleyebilirsiniz.

### Parametreler

Aşağıdaki parametreler kısa kod içerisinde kullanılabilir:

| Parametre | Varsayılan | Açıklama |
| :--- | :--- | :--- |
| `limit` | `12` | Görüntülenecek maksimum öğe sayısı. |
| `columns` | `1` | Modülün **general** davranışını kontrol eder. |
| `orderby` | `title` | Modülün **general** davranışını kontrol eder. |
| `order` | `ASC` | Modülün **general** davranışını kontrol eder. |
| `category` | `(boş)` | Modülün **feature** davranışını kontrol eder. |
| `featured` | `0` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `show_image` | `1` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `show_title` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_price` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_features` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_rating` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_booking_button` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_favorite_button` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_category` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_brand` | `0` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `show_badges` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_description` | `1` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `show_availability` | `0` | Modülün **general** davranışını kontrol eder. |
| `show_compare_button` | `1` | Modülün **general** davranışını kontrol eder. |
| `enable_lazy_load` | `1` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `enable_ajax_filtering` | `0` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `enable_infinite_scroll` | `0` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `image_size` | `medium` | Modülün **layout** davranışını kontrol eder. |
| `ids` | `(boş)` | Virgülle ayrılmış ID listesi (Örn: `12,15,44`). |
| `max_features` | `5` | Modülün **feature** davranışını kontrol eder. |
| `price_format` | `daily` | Modülün **layout** davranışını kontrol eder. |
| `class` | `(boş)` | Modülün **general** davranışını kontrol eder. |
| `custom_css_class` | `(boş)` | Modülün **layout** davranışını kontrol eder. |
| `min_rating` | `(boş)` | Modülün **query** davranışını kontrol eder. |
| `min_reviews` | `(boş)` | Modülün **query** davranışını kontrol eder. |


## Özellikler

### 📱 Responsive Tasarım
- **Mobil:** Tek sütun düzeni.
- **Tablet (782px altı):** Optimize edilmiş görünüm.
- **Masaüstü:** Ayarlanan sütun veya genişlikte tam görünüm.

### 🚀 Performans Odaklı
- **Akıllı Önbellek:** Veritabanı sorguları sistem tarafından optimize edilerek önbelleğe alınır.
- **Koşullu Yükleme:** Statik dosyalar sadece modülün kullanıldığı sayfalarda yüklenir.

## Geliştirici Notları

- **HTML Yapısı:** Tüm kapsayıcılar `.mhm-rentiva-vehicles-list-wrapper` sınıfı ile başlar.
- **Özelleştirme:** CSS değişkenleri (`--mhm-color-primary` vb.) global `css-variables.css` dosyasından miras alınır.

## Bölüm Sonu Özeti
- Vehicles list sayfası, tekil referans başlıklarıyla standart dokümantasyon yapısına alınmıştır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.0-docs | Sayfa alfabetik olarak sıralandı ve görsel yer tutucusu eklendi. |
