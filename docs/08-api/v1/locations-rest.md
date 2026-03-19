---
id: locations-rest
title: Konum Servisleri (Locations REST)
sidebar_label: Locations REST
sidebar_position: 60
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

:::info Amaç
Bu uç nokta (endpoint), sistemde tanımlı olan kiralama ve transfer konumlarını (Havalimanları, Oteller, Şehir Merkezleri vb.) listelemek için kullanılır.
:::

# 📍 Konum Servisleri Endpointi

Konum verileri, hem "Rent-a-Car" (Kiralama) hem de "Transfer" modülleri için merkezi bir kaynaktan beslenir. `LocationProvider` sınıfı, bu endpoint üzerinden gelen verileri işleyerek UI bileşenlerini doldurur.

---

## 📍 Endpoint Bilgileri
- **URL:** `/wp-json/mhm-rentiva/v1/locations`
- **Metot:** `GET`
- **Yetki:** Public

---

## 🔍 1. Filtreleme ve Sorgu Parametreleri

İhtiyaca göre konum listesini daraltmak için şu parametreler kullanılabilir:

| Parametre | Tip | Değerler | Açıklama |
|---|---|---|---|
| `type` | `string` | `rental`, `transfer`, `both` | Servis tipine göre filtreleme yapar. |
| `class` | `string` | `airport`, `city`, `hotel` | Konum kategorisine göre filtreleme. |
| `active_only` | `bool` | `0`, `1` | Sadece yayında olan konumları getirir (Varsayılan: `1`). |
| `search` | `string` | Serbest metin | Konum adı veya kodu içinde arama yapar. |

---

## 📤 2. Yanıt Yapısı Örneği

```json
{
  "success": true,
  "data": [
    {
      "id": 101,
      "title": "İstanbul Havalimanı (IST)",
      "type": "both",
      "class": "airport",
      "coordinates": {
        "lat": 41.2752,
        "lng": 28.7519
      },
      "code": "IST"
    },
    {
      "id": 102,
      "title": "Sabiha Gökçen Havalimanı (SAW)",
      "type": "both",
      "class": "airport",
      "coordinates": {
        "lat": 40.8986,
        "lng": 29.3092
      },
      "code": "SAW"
    }
  ]
}
```

---

## ⚡ 3. Performans ve Önbellekleme

Konum listesi sık değişmeyen bir veri yapısı olduğu için:
- **`MetricCacheManager`:** Konum listesini 1 saat boyunca önbellekte tutar.
- **`LocationProvider`:** Veriyi dönerken sadece gerekli alanları (ID, Başlık, Koordinat) seçerek JSON boyutunu minimize eder.

---

## 🚀 4. Operasyonel Notlar
- **Coğrafi Veri:** Koordinatlar, harita üzerinde seçim yapılmasına olanak tanır.
- **Transfer Entegrasyonu:** Transfer mesafesi ve fiyat hesaplamaları, bu endpoint'ten gelen ID'ler üzerinden yürütülür.
- **SEO Uyumlu:** `title` ve `code` alanları, arama formlarında kullanıcı dostu arama yapılmasına imkan verir.

## Bölüm Sonu Özeti
- Locations endpointi, tüm lokasyon bazlı modüllerin temelidir.
- Tip ve sınıf bazlı esnek filtreleme sunar.
- Yüksek performans için `MetricCacheManager` ile optimize edilmiştir.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | Koordinat desteği, servis tipi filtreleri ve önbellekleme detayları eklendi. |
