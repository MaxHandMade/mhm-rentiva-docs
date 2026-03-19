---
id: rest-api-v1
title: REST API v1 Genel Bakış
sidebar_label: REST API
sidebar_position: 10
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

:::info Amaç
MHM Rentiva v1 REST API, dış sistemlerle entegrasyon, mobil uygulama desteği ve asenkron operasyonlar için temel uç noktaları sağlar. Tüm uç noktalar `wp-json/mhm-rentiva/v1` ad alanı (namespace) altında sunulur.
:::

# 🌐 REST API v1 Yapısı

v1 API katmanı, geriye dönük uyumluluğu korurken güvenli ve hızlı veri erişimi sağlar.

---

## 🔑 1. Kimlik Doğrulama ve Güvenlik

API uç noktalarına erişim, işlemin türüne göre üç farklı yöntemle sağlanır:

| Yöntem | Kullanım Alanı | Detay |
|---|---|---|
| **Public** | Konumlar, Müsaitlik | Herkese açık veriler için kimlik doğrulama gerekmez. |
| **Nonce** | AJAX/Web etkileşimleri | `_wpnonce` header/parametre doğrulaması gerekir. |
| **API Key** | Dış Servis Entegrasyonları | `X-Rentiva-API-Key` veya `Bearer Token` üzerinden doğrulama. |

---

## 🚀 2. Temel Uç Noktalar (Endpoints)

### A. Sistem Sağlığı (`/health`)
- **Metot:** `GET`
- **İşlev:** Veritabanı tablolarının varlığını, eklenti sürümünü ve lisans durumunu kontrol eder.
- **Yanıt:** `{"status": "ok", "version": "4.21.2"}`

### B. Konum Servisleri (`/locations`)
- **Metot:** `GET`
- **İşlev:** Rezervasyon ve transfer modülleri için tanımlı aktif lokasyonları döner.
- **Parametreler:** `?type=airport`, `?city=istanbul`

### C. Müsaitlik ve Fiyatlandırma (`/availability`)
- **Metot:** `POST`
- **İşlev:** Belirli tarihler ve araç ID'si için müsaitlik kontrolü yapar ve Pricing Engine üzerinden net fiyat hesaplar.
- **Girdi:** `vehicle_id`, `pickup_date`, `return_date`

---

## 🛡️ 3. Güvenlik Katmanı (AuthHelper)

Tüm "yazma" (POST/PUT/DELETE) işlemlerinde `AuthHelper` sınıfı devreye girer:
- **Rate Limiting:** Her API anahtarı için dakikalık istek sınırı.
- **HMAC Verification:** Webhook geri dönüşlerinde veri bütünlüğünü garanti eder.

---

## 📊 4. Yanıt ve Hata Formatı

Sistem standart olarak JSON yanıtlar döner:

```json
{
  "success": true,
  "data": { ... },
  "message": "İşlem başarılı."
}
```

Hata durumunda:
```json
{
  "success": false,
  "error_code": "INVALID_PARAMS",
  "message": "Eksik parametre gönderildi."
}
```

## Bölüm Sonu Özeti
- v1 API, `mhm-rentiva/v1` altında hizmet verir.
- Kimlik doğrulama, işlemin kritiklik seviyesine göre değişkenlik gösterir.
- Tüm operasyonlar merkezi `AuthHelper` ve `ErrorHandler` ile denetlenir.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | v1 API mimarisi ve güvenlik katmanları güncellendi. |
