---
title: Unified search
description: Unified search modülünün kullanım kılavuzu ve teknik detayları.
sidebar_position: 18
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, Unified search modülü konusunu teknik ve operasyonel açıdan standart bir referans formatında açıklar.
:::

# 🚗 Unified search

## İçindekiler
- Kullanım
- Özellikler
- Geliştirici Notları

Unified search modülü, Rentiva platformundaki **vehicle** süreçlerini yönetmek ve kullanıcılara sunmak için tasarlanmıştır.

## Kullanım

:::tip GÖRSEL GELECEK
Buraya bu modülün frontend (kullanıcı tarafı) görünümünü temsil eden bir ekran görüntüsü eklenecektir.
:::

Bu modülü herhangi bir sayfaya veya yazıya eklemek için aşağıdaki kısa kodu (shortcode) kullanabilirsiniz:

```shortcode
[rentiva_unified_search default_tab="default"]
```

Gutenberg blok editöründe **"MHM Rentiva -> Unified search"** bloğunu seçerek görsel olarak da ekleyebilirsiniz.

### Parametreler

Aşağıdaki parametreler kısa kod içerisinde kullanılabilir:

| Parametre | Varsayılan | Açıklama |
| :--- | :--- | :--- |
| `default_tab` | `default` | Modülün **workflow** davranışını kontrol eder. |
| `default_tab_alias` | `defaultTab` | Modülün **feature** davranışını kontrol eder. |
| `show_rental_tab` | `default` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `show_transfer_tab` | `default` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `show_location_select` | `default` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `show_time_select` | `default` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `show_date_picker` | `default` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `show_dropoff_location` | `default` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `show_pax` | `default` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `show_luggage` | `default` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `service_type` | `both` | Modülün **feature** davranışını kontrol eder. |
| `filter_categories` | `(boş)` | Modülün **feature** davranışını kontrol eder. |
| `redirect_page` | `default` | Modülün **workflow** davranışını kontrol eder. |
| `layout` | `horizontal` | Modülün **general** davranışını kontrol eder. |
| `search_layout` | `(boş)` | Modülün **layout** davranışını kontrol eder. |
| `style` | `glass` | Modülün **layout** davranışını kontrol eder. |
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

- **HTML Yapısı:** Tüm kapsayıcılar `.mhm-rentiva-unified-search-wrapper` sınıfı ile başlar.
- **Özelleştirme:** CSS değişkenleri (`--mhm-color-primary` vb.) global `css-variables.css` dosyasından miras alınır.

## Bölüm Sonu Özeti
- Unified search sayfası, tekil referans başlıklarıyla standart dokümantasyon yapısına alınmıştır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.0-docs | Sayfa alfabetik olarak sıralandı ve görsel yer tutucusu eklendi. |
