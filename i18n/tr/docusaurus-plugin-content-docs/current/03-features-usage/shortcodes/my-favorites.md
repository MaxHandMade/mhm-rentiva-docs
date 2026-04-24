---
title: Account favorites
description: Account favorites modülünün kullanım kılavuzu ve teknik detayları.
sidebar_position: 3
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
Bu sayfa, Account favorites modülü konusunu teknik ve operasyonel açıdan standart bir referans formatında açıklar.
:::

# 🚗 Account favorites

## İçindekiler
- Kullanım
- Özellikler
- Geliştirici Notları

Account favorites modülü, Rentiva platformundaki **account** süreçlerini yönetmek ve kullanıcılara sunmak için tasarlanmıştır.

## Kullanım

:::tip GÖRSEL GELECEK
Buraya bu modülün frontend (kullanıcı tarafı) görünümünü temsil eden bir ekran görüntüsü eklenecektir.
:::

Bu modülü herhangi bir sayfaya veya yazıya eklemek için aşağıdaki kısa kodu (shortcode) kullanabilirsiniz:

```shortcode
[rentiva_my_favorites limit="12"]
```

Gutenberg blok editöründe **"MHM Rentiva -> Account favorites"** bloğunu seçerek görsel olarak da ekleyebilirsiniz.

### Parametreler

Aşağıdaki parametreler kısa kod içerisinde kullanılabilir:

| Parametre | Varsayılan | Açıklama |
| :--- | :--- | :--- |
| `limit` | `12` | Görüntülenecek maksimum öğe sayısı. |
| `columns` | `3` | Modülün **general** davranışını kontrol eder. |
| `orderby` | `date` | Modülün **general** davranışını kontrol eder. |
| `order` | `DESC` | Modülün **general** davranışını kontrol eder. |
| `show_image` | `1` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `show_title` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_price` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_features` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_rating` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_booking_button` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_favorite_button` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_badges` | `1` | Modülün **general** davranışını kontrol eder. |
| `layout` | `grid` | Modülün **general** davranışını kontrol eder. |
| `show_remove_button` | `1` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `show_added_date` | `0` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `no_results_text` | `__(You have no favorite vehicles yet.` | Modülün **content** davranışını kontrol eder. |


## Özellikler

### 📱 Responsive Tasarım
- **Mobil:** Tek sütun düzeni.
- **Tablet (782px altı):** Optimize edilmiş görünüm.
- **Masaüstü:** Ayarlanan sütun veya genişlikte tam görünüm.

### 🚀 Performans Odaklı
- **Akıllı Önbellek:** Veritabanı sorguları sistem tarafından optimize edilerek önbelleğe alınır.
- **Koşullu Yükleme:** Statik dosyalar sadece modülün kullanıldığı sayfalarda yüklenir.

## Geliştirici Notları

- **HTML Yapısı:** Tüm kapsayıcılar `.mhm-rentiva-my-favorites-wrapper` sınıfı ile başlar.
- **Özelleştirme:** CSS değişkenleri (`--mhm-color-primary` vb.) global `css-variables.css` dosyasından miras alınır.

## Bölüm Sonu Özeti
- Account favorites sayfası, tekil referans başlıklarıyla standart dokümantasyon yapısına alınmıştır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.0-docs | Sayfa alfabetik olarak sıralandı ve görsel yer tutucusu eklendi. |
