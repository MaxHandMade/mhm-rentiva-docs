---
title: Öne Çıkan Araçlar Modülü
description: Ana sayfa veya diğer sayfalarda öne çıkan araçları kaydırılabilir bir slider ile gösterir.
sidebar_position: 3
---

# 🚗 Öne Çıkan Araçlar (Featured Vehicles)

Öne Çıkan Araçlar modülü, Rentiva platformundaki araçları belirli kriterlere göre (örneğin: `secili-araclar`, `kategori`, `son-eklenenler`) ana sayfanızda şık bir kaydırıcı (slider) veya ızgara (grid) düzeninde sunmanıza olanak tanır.

## Kullanım

Bu modülü herhangi bir sayfaya veya yazıya eklemek için aşağıdaki kısa kodu (shortcode) kullanabilirsiniz:

```shortcode
[rentiva_featured_vehicles limit="6" layout="slider" columns="3" autoplay="1"]
```

Gutenberg blok editöründe "MHM Rentiva -> Öne Çıkan Araçlar" bloğunu seçerek görsel olarak da ekleyebilirsiniz.

### Parametreler

Aşağıdaki parametreler kısa kod içerisinde kullanılabilir:

| Parametre | Varsayılan | Açıklama |
| :--- | :--- | :--- |
| `limit` | `6` | Toplamda kaç aracın listeleneceğini belirler. |
| `layout` | `slider` | Görünüm düzeni. Seçenekler: `slider` (Kaydırıcı), `grid` (Izgara). |
| `columns` | `3` | Masaüstü görünümünde yan yana kaç araç gösterileceğini belirler. |
| `ids` | `(boş)` | Sadece belirli araçları göstermek için virgülle ayrılmış ID listesi (Örn: `12,15,44`). |
| `category` | `(boş)` | Belirli bir kategorideki araçları göstermek için kategori kısa adı (slug). |
| `autoplay` | `1` | Slider modunda otomatik kaydırmayı açar (`1`) veya kapatır (`0`). |
| `interval` | `5000` | Otomatik kaydırma süresi (milisaniye cinsinden). Varsayılan 5 saniyedir. |
| `orderby` | `date` | Sıralama kriteri. Seçenekler: `date` (Tarih), `price` (Fiyat), `title` (Başlık), `rand` (Rastgele). |
| `order` | `DESC` | Sıralama yönü. `DESC` (Azalan - Yeni > Eski), `ASC` (Artan - Eski > Yeni). |

## Özellikler

### 📱 Responsive Tasarım
- **Mobil:** Tek sütun (1 araç)
- **Tablet (782px altı):** Maksimum 2 sütun
- **Masaüstü:** Ayarladığınız sütun sayısı (Örn: 3 veya 4)

### 🚀 Performans Odaklı
- **Akıllı Önbellek:** Veritabanı sorguları 1 saat boyunca önbelleğe alınır (`transient`), sunucu yükünü hafifletir.
- **Koşullu Yükleme:** Swiper JS ve CSS dosyaları, sadece modülün kullanıldığı sayfalarda yüklenir.

## Geliştirici Notları

- **HTML Yapısı:** Tüm kapsayıcılar `.mhm-rentiva-featured-wrapper` sınıfı ile başlar.
- **Özelleştirme:** `assets/css/frontend/featured-vehicles.css` dosyası üzerinden stiller ezilebilir. CSS değişkenleri (`--mhm-color-primary` vb.) global `css-variables.css` dosyasından miras alınır.
