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
[rentiva_featured_vehicles limit="6"]
```

Gutenberg blok editöründe **"MHM Rentiva -> Featured vehicles"** bloğunu seçerek görsel olarak da ekleyebilirsiniz.

### Parametreler

Aşağıdaki parametreler kısa kod içerisinde kullanılabilir:

| Parametre | Varsayılan | Açıklama |
| :--- | :--- | :--- |
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
| `show_booking_button` | `1` | Her kartta rezervasyon düğmesini gösterir. `1` (Açık) veya `0` (Kapalı). 6.2.0'ın artık okumadığı `show_book_button` yerine kullanılır. |
| `show_features` | `1` | Modülün **general** davranışını kontrol eder. |
| `max_features` | `5` | Modülün **feature** davranışını kontrol eder. |
| `show_brand` | `0` | Görünürlük kontrolü. `1` (Açık) veya `0` (Kapalı). |
| `show_compare_button` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_favorite_button` | `1` | Modülün **general** davranışını kontrol eder. |
| `image_size` | `medium_large` | Modülün **layout** davranışını kontrol eder. |
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

## Araç kartı ayrıntıları

- **Toplamda zorunlu hizmetler:** sayfa tarihlerle açıldığında (örneğin bir aramadan), her kart dönem toplamını gösterir. Bazı ek hizmetleri zorunlu işaretlediyseniz toplamın altındaki satır onları adıyla söyler; örneğin "Zorunlu hizmet dahil: Tam sigorta ₺25" (birden çok hizmet virgülle sıralanır ve tek bir toplam tutar yazılır; günlük ücretli hizmet gün sayısıyla çarpılır). Tarihsiz kartta günlük fiyat görünür, bu satır görünmez.
- **Fiyat ve düğme düzeni:** düzeni kartın kendi genişliği belirler. Dar kartta (örneğin ana sayfadaki öne çıkan araçlar ya da üç sütunlu araçlar sayfası) fiyat, **Rezervasyon yap** düğmesinin üstünde durur; geniş kartta (örneğin tarihli arama sonuçları) yan yana durur. Aynı satırdaki kartlar her zaman aynı görünür.
- **Sayı biçimi:** kilometre ve motor hacmi sayfanın diline göre yazılır: İngilizce "18,500 km" ve "1.6 L", Türkçe "18.500 km" ve "1,6 L".

## Geliştirici Notları

- **HTML Yapısı:** Tüm kapsayıcılar `.mhm-rentiva-featured-vehicles-wrapper` sınıfı ile başlar.
- **Özelleştirme:** CSS değişkenleri (`--mhm-color-primary` vb.) global `css-variables.css` dosyasından miras alınır.

## Bölüm Sonu Özeti
- Featured vehicles sayfası, tekil referans başlıklarıyla standart dokümantasyon yapısına alınmıştır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 18.11.2026 | 6.4.0 | Araç kartı ayrıntıları: zorunlu hizmet satırı, fiyat/düğme düzeni, sayı biçimi. |
| 11.10.2026 | 6.2.0 | `title`, `show_book_button`, `show_availability`, `show_badges` ve `price_format` kaldırıldı: 6.2.0 bunları artık okumuyor. `show_booking_button` belgelendi (`show_book_button` yerine). |
| 19.03.2026 | 4.21.0-docs | Sayfa alfabetik olarak sıralandı ve görsel yer tutucusu eklendi. |
