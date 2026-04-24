---
id: rate-limits-and-errors
title: API Hata Yönetimi ve İstek Limitleri (Rate Limiting)
sidebar_label: Rate Limit ve Hata Kodları
sidebar_position: 90
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
MHM Rentiva API servislerinin sürekliliğini sağlamak ve hatalı durumları standart bir dille raporlamak için kullanılan kurallar kümesidir.
:::

# 🚦 API Hata Yönetimi ve İstek Limitleri

Sistem, hem kötü niyetli saldırıları (Brute-force, DoS) engellemek hem de istemcilere tutarlı hata mesajları dönmek için `RateLimiter` ve `ErrorHandler` sınıflarını kullanır.

---

## 🛑 1. İstek Limitleri (Rate Limiting)

İstek limitleri, API anahtarı (v1) veya IP adresi (Public) bazlı olarak uygulanır.

| Katman | Limit (İstek/Dakika) | Aşım Sonucu |
|---|---|---|
| **Public API** | 30 | HTTP 429 |
| **Authenticated (API Key)** | 60 | HTTP 429 |
| **Admin/internal** | 120 | HTTP 429 |

**Korumalar:**
- **`RateLimiter::check()`:** Belirlinen zaman pencerelerinde (Sliding Window) istek limitini denetler.
- **Loglama:** Limit aşımları `AdvancedLogger` üzerinde `SECURITY_WARNING` seviyesinde kaydedilir.

---

## ❌ 2. Standart Hata Kodları

Tüm API yanıtlarında standart HTTP durum kodları ve özel uygulama hata kodları kullanılır.

| HTTP Kod | Uygulama Kodu | Açıklama |
|---|---|---|
| **400** | `INVALID_PARAMS` | Eksik veya hatalı formatta parametre. |
| **401** | `AUTH_REQUIRED` | Kimlik doğrulama başlığı eksik veya hatalı. |
| **403** | `PERMISSION_DENIED` | Kullanıcı veya anahtarın bu işlem için yetkisi yok. |
| **404** | `RESOURCE_NOT_FOUND` | Belirtilen ID'ye sahip kayıt mevcut değil. |
| **409** | `STATE_CONFLICT` | İşlem, kaynağın mevcut durumuyla uyumsuz (Örn: Dolu aracı kiralama). |
| **429** | `RATE_LIMIT_EXCEEDED` | Dakikalık istek sınırı aşıldı. |
| **500** | `INTERNAL_ERROR` | Beklenmedik bir sunucu hatası oluştu. |

---

## 🛠️ 3. Loglama ve Correlation ID

Sistem, her hata yanıtı ile birlikte bir **Correlation ID** (Örn: `req_abc123`) üretir:
- **Geliştirici İpucu:** Hata gövdesinde sorunun teknik detayı (Stack trace vb.) asla dönülmez; bunun yerine günlüklerdeki (logs) ilgili kaydı bulmaya yarayan ID dönülür.
- **`ErrorHandler::format_error()`:** Tüm hataları merkezi olarak yakalar, loglar ve istemciye güvenli JSON formatında servis eder.

---

## 📤 4. Örnek Hata Yanıtı

```json
{
  "success": false,
  "error": {
    "code": "PERMISSION_DENIED",
    "message": "Bu işlem için 'rentiva_vendor' yetkisi gereklidir.",
    "correlation_id": "err_1773849524"
  }
}
```

## Bölüm Sonu Özeti
- `RateLimiter` sistemi korur, `ErrorHandler` iletişimi standartlaştırır.
- Hatalar asla ham PHP hatası olarak değil, formatlanmış JSON olarak döner.
- Correlation ID ile canlı ortamdaki hatalar kolayca takip edilebilir.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | Rate limit katmanları, Uygulama Hata Kodları ve Correlation ID detayları eklendi. |
