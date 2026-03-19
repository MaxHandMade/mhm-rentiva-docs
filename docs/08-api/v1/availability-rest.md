---
id: availability-rest
title: Müsaitlik Sorgulama (Availability REST)
sidebar_label: Availability REST
sidebar_position: 40
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

:::info Amaç
Bu uç nokta (endpoint), belirli bir aracın seçilen tarih ve saat aralığında kiralanabilir olup olmadığını kontrol eder ve güncel fiyatlandırmayı hesaplar.
:::

# 🚗 Müsaitlik Sorgulama Endpointi

Müsaitlik sorgulama, rezervasyon sürecinin ilk ve en kritik adımıdır. `Util::has_overlap()` ve `PricingEngine` sınıflarını kullanarak gerçek zamanlı sonuç döner.

---

## 📍 Endpoint Bilgileri
- **URL:** `/wp-json/mhm-rentiva/v1/availability`
- **Metot:** `POST`
- **Yetki:** Public (Eğer admin/vendor arayüzü değilse)

---

## 📥 İstek Parametreleri (JSON Gövdesi)

| Parametre | Tip | Zorunlu | Açıklama |
|---|---|---|---|
| `vehicle_id` | `int` | Evet | Kontrol edilecek aracın ID'si. |
| `pickup_date` | `string` | Evet | Alış tarihi (`YYYY-MM-DD`). |
| `pickup_time` | `string` | Evet | Alış saati (`HH:MM`). |
| `return_date` | `string` | Evet | Dönüş tarihi (`YYYY-MM-DD`). |
| `return_time` | `string` | Evet | Dönüş saati (`HH:MM`). |
| `location_id` | `int` | Hayır | Teslimat konumu (Fiyatı etkileyebilir). |

---

## 📤 Başarılı Yanıt Örneği

```json
{
  "success": true,
  "data": {
    "available": true,
    "pricing": {
      "base_price": 1200.00,
      "service_fee": 150.00,
      "total_price": 1350.00,
      "currency": "TRY"
    },
    "duration": {
      "days": 3,
      "hours": 0
    }
  }
}
```

---

## 🛡️ Güvenlik ve Doğrulama
1. **Tarih Sıralaması:** Dönüş tarihi, alış tarihinden önce olamaz.
2. **Saat Kontrolü:** Alış saati, minimum rezervasyon süresi kurallarına uygun olmalıdır.
3. **`RateLimiter`:** Aynı IP'den gelen saniyede çoklu sorgular otomatik olarak yavaşlatılır.
4. **Sanitizasyon:** Tüm girdi verileri `Sanitizer::absint()` ve `sanitize_text_field()` ile temizlenir.

---

## ❌ Hata Durumları

| Kod | Mesaj | Neden |
|---|---|---|
| **400** | `INVALID_DATE_RANGE` | Alış/Dönüş tarihleri mantıksız. |
| **404** | `VEHICLE_NOT_FOUND` | Belirtilen ID'ye sahip araç bulunamadı. |
| **409** | `VEHICLE_NOT_AVAILABLE` | Araç belirtilen tarihlerde zaten dolu. |
| **429** | `TOO_MANY_REQUESTS` | Rate limit aşıldı. |

## Bölüm Sonu Özeti
- `availability` endpointi, hem müsaitlik hem de fiyat bilgisi sağlar.
- `Util::has_overlap()` ile çakışmaları saniyeler içinde tespit eder.
- Frontend takvimlerinde ve rezervasyon formlarında reaktif güncellemeler için kullanılır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | JSON istek/yanıt şeması ve hata kodları detaylandırıldı. |
