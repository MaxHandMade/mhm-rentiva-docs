---
title: Search results
description: Search results modülünün kullanım kılavuzu ve teknik detayları.
sidebar_position: 14
---
![Version](https://img.shields.io/badge/version-4.22.1-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-27.03.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, Search results modülü konusunu teknik ve operasyonel açıdan standart bir referans formatında açıklar.
:::

# 🚗 Search results

## İçindekiler
- Kullanım
- Özellikler
- Geliştirici Notları

Search results modülü, Rentiva platformundaki **vehicle** süreçlerini yönetmek ve kullanıcılara sunmak için tasarlanmıştır.

## Kullanım

:::tip GÖRSEL GELECEK
Buraya bu modülün frontend (kullanıcı tarafı) görünümünü temsil eden bir ekran görüntüsü eklenecektir.
:::

Bu modülü herhangi bir sayfaya veya yazıya eklemek için aşağıdaki kısa kodu (shortcode) kullanabilirsiniz:

```shortcode
[rentiva_search_results layout="grid"]
```

Gutenberg blok editöründe **"MHM Rentiva -> Search results"** bloğunu seçerek görsel olarak da ekleyebilirsiniz.

### Parametreler

Aşağıdaki parametreler kısa kod içerisinde kullanılabilir:

| Parametre | Varsayılan | Açıklama |
| :--- | :--- | :--- |
| `layout` | `grid` | Modülün **general** davranışını kontrol eder. |
| `show_filters` | `1` | Modülün **general** davranışını kontrol eder. |
| `results_per_page` | `12` | Modülün **general** davranışını kontrol eder. |
| `show_pagination` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_sorting` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_view_toggle` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_favorite_button` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_compare_button` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_booking_button` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_price` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_title` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_features` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_rating` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_badges` | `1` | Modülün **general** davranışını kontrol eder. |
| `default_sort` | `price_asc` | Modülün **general** davranışını kontrol eder. |
| `class` | `(boş)` | Modülün **general** davranışını kontrol eder. |


## Özellikler

### 📱 Responsive Tasarım
- **Mobil:** Tek sütun düzeni.
- **Tablet (782px altı):** Optimize edilmiş görünüm.
- **Masaüstü:** Ayarlanan sütun veya genişlikte tam görünüm.

### 🚀 Performans Odaklı
- **Akıllı Önbellek:** Veritabanı sorguları sistem tarafından optimize edilerek önbelleğe alınır.
- **Koşullu Yükleme:** Statik dosyalar sadece modülün kullanıldığı sayfalarda yüklenir.

## Sidebar Filtreleri

### Lokasyon Filtresi (Çoklu Seçim)

v4.22.1 itibariyla lokasyon filtresi **radio buton** yerine **checkbox** kullanir. Bu sayede kullanıcılar ayni anda birden fazla lokasyon secebilir. Secilen lokasyonlar `IN()` SQL clause'u ile sorgulanir.

- Tekli seçim: Bir lokasyon secildiginde sadece o lokasyondaki araclar listelenir.
- Çoklu seçim: Birden fazla lokasyon isaretlendiginde, secilen lokasyonlarin herhangi birinde bulunan araclar gosterilir.

## Geliştirici Notları

- **HTML Yapısı:** Tüm kapsayıcılar `.mhm-rentiva-search-results-wrapper` sınıfı ile başlar.
- **Özelleştirme:** CSS değişkenleri (`--mhm-color-primary` vb.) global `css-variables.css` dosyasından miras alınır.
- **Musaitlik Sorgusu:** `QueryHelper::get_availability_subquery()` bos tarih parametrelerine karsi korumalıdir. `strtotime('')` PHP'de `false` yerine bugunun timestamp'ini dondurur; bu durum v4.22.1'de duzeltilmistir. Bos tarih gonderildiginde musaitlik filtresi devre disi kalir.
- **Lokasyon Sorgusu:** `QueryHelper::get_location_subquery()` hem tekli (`int`) hem de çoklu (`array`) lokasyon ID'lerini kabul eder.

## Bölüm Sonu Özeti
- Search results sayfası, tekil referans başlıklarıyla standart dokümantasyon yapısına alınmıştır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 27.03.2026 | 4.22.1 | Lokasyon filtresi radio -> checkbox (çoklu seçim). Musaitlik sorgusu bos tarih koruması. Geliştirici notlarına QueryHelper bilgileri eklendi. |
| 19.03.2026 | 4.21.0-docs | Sayfa alfabetik olarak sıralandı ve görsel yer tutucusu eklendi. |
