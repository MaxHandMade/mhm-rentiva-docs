---
title: Testimonials
description: Testimonials modülünün kullanım kılavuzu ve teknik detayları.
sidebar_position: 15
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
Bu sayfa, Testimonials modülü konusunu teknik ve operasyonel açıdan standart bir referans formatında açıklar.
:::

# 🚗 Testimonials

## İçindekiler
- Kullanım
- Özellikler
- Geliştirici Notları

Testimonials modülü, Rentiva platformundaki **support** süreçlerini yönetmek ve kullanıcılara sunmak için tasarlanmıştır.

## Kullanım

:::tip GÖRSEL GELECEK
Buraya bu modülün frontend (kullanıcı tarafı) görünümünü temsil eden bir ekran görüntüsü eklenecektir.
:::

Bu modülü herhangi bir sayfaya veya yazıya eklemek için aşağıdaki kısa kodu (shortcode) kullanabilirsiniz:

```shortcode
[rentiva_testimonials limit="apply_filters(mhm_rentiva/testimonials/limit"]
```

Gutenberg blok editöründe **"MHM Rentiva -> Testimonials"** bloğunu seçerek görsel olarak da ekleyebilirsiniz.

### Parametreler

Aşağıdaki parametreler kısa kod içerisinde kullanılabilir:

| Parametre | Varsayılan | Açıklama |
| :--- | :--- | :--- |
| `limit` | `apply_filters(mhm_rentiva/testimonials/limit` | Görüntülenecek maksimum öğe sayısı. |
| `rating` | `apply_filters(mhm_rentiva/testimonials/rating` | Modülün **feature** davranışını kontrol eder. |
| `vehicle_id` | `apply_filters(mhm_rentiva/testimonials/vehicle_id` | Modülün **feature** davranışını kontrol eder. |
| `orderby` | `apply_filters(mhm_rentiva/testimonials/orderby` | Modülün **general** davranışını kontrol eder. |
| `order` | `apply_filters(mhm_rentiva/testimonials/order` | Modülün **general** davranışını kontrol eder. |
| `show_rating` | `apply_filters(mhm_rentiva/testimonials/show_rating` | Modülün **general** davranışını kontrol eder. |
| `show_date` | `apply_filters(mhm_rentiva/testimonials/show_date` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `show_vehicle` | `apply_filters(mhm_rentiva/testimonials/show_vehicle` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `show_customer` | `apply_filters(mhm_rentiva/testimonials/show_customer` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `layout` | `apply_filters(mhm_rentiva/testimonials/layout` | Modülün **general** davranışını kontrol eder. |
| `columns` | `apply_filters(mhm_rentiva/testimonials/columns` | Modülün **general** davranışını kontrol eder. |
| `auto_rotate` | `apply_filters(mhm_rentiva/testimonials/auto_rotate` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `class` | `apply_filters(mhm_rentiva/testimonials/class` | Modülün **general** davranışını kontrol eder. |


## Özellikler

### 📱 Responsive Tasarım
- **Mobil:** Tek sütun düzeni.
- **Tablet (782px altı):** Optimize edilmiş görünüm.
- **Masaüstü:** Ayarlanan sütun veya genişlikte tam görünüm.

### 🚀 Performans Odaklı
- **Akıllı Önbellek:** Veritabanı sorguları sistem tarafından optimize edilerek önbelleğe alınır.
- **Koşullu Yükleme:** Statik dosyalar sadece modülün kullanıldığı sayfalarda yüklenir.

## Geliştirici Notları

- **HTML Yapısı:** Tüm kapsayıcılar `.mhm-rentiva-testimonials-wrapper` sınıfı ile başlar.
- **Özelleştirme:** CSS değişkenleri (`--mhm-color-primary` vb.) global `css-variables.css` dosyasından miras alınır.

## Bölüm Sonu Özeti
- Testimonials sayfası, tekil referans başlıklarıyla standart dokümantasyon yapısına alınmıştır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.0-docs | Sayfa alfabetik olarak sıralandı ve görsel yer tutucusu eklendi. |
