---
id: auth-and-security
title: API Kimlik Doğrulama ve Güvenlik
sidebar_label: Auth ve Güvenlik
sidebar_position: 20
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
MHM Rentiva API katmanındaki veri alışverişinin bütünlüğünü ve gizliliğini sağlamak için kullanılan güvenlik protokollerini açıklar.
:::

# 🔐 API Güvenlik Mimarisi

Sistem, hem dahili hem de harici talepler için çok katmanlı bir doğrulama stratejisi izler.

---

## 🛡️ 1. Kimlik Doğrulama Yöntemleri

### A. Nonce (CSRF) Koruması (Internal)
Dahili AJAX ve Interactivity API taleplerinde kullanılır.
- **Header:** `X-WP-Nonce`
- **Doğrulama:** `check_ajax_referer()` veya `rest_cookie_check_errors()`.

### B. API Key (External)
Dış entegrasyonlar için `AuthHelper` ile yönetilir.
- **Header:** `X-Rentiva-API-Key`
- **İşlev:** API anahtarı, o anahtara atanmış yetki seviyesini (Read/Write) belirler.

### C. HMAC İmza Doğrulaması (Webhook)
Ödeme geri bildirimleri (Callback) için kritik güvenlik adımıdır.
- **Header:** `X-Rentiva-Signature`
- **Mantık:** Gelen JSON gövdesi ve gizli anahtar (Secret Key) kullanılarak üretilen hash, başlıktaki veriyle karşılaştırılır.

---

## 🚦 2. Yetkilendirme (Authorization)

Kimlik doğrulandıktan sonra, kullanıcının işlem yetkisi kontrol edilir:
- **`current_user_can('manage_options')`:** Admin bazlı işlemler.
- **`current_user_can('rentiva_vendor')`:** Tedarikçi bazlı işlemler.
- **`Mode::featureEnabled()`:** Lisans seviyesine göre özellik kısıtlaması.

---

## 🚀 3. İstek Güvenliği ve Sanitizasyon

### Parametre Doğrulama
Tüm uç noktalar `args` dizisi üzerinden veri doğrulaması yapar:
```php
'id' => [
    'validate_callback' => function($param) {
        return is_numeric($param);
    },
    'sanitize_callback' => 'absint',
]
```

### Rate Limiting
`RateLimiter::check()` metodu ile aynı IP veya API anahtarından gelen aşırı istekler bloklanır. Varsayılan limit: Dakikada 60 istek.

---

## 📦 4. Veri Taşıma Güvenliği
- **HTTPS:** Tüm API uç noktaları için HTTPS zorunludur.
- **Secrets:** API anahtarları veritabanında şifrelenmiş olarak saklanır.
- **Preflight (CORS):** Sadece izin verilen alan adlarından (Origin) gelen talepler kabul edilir.

## Denetim Listesi
1. Tüm POST isteklerinde Nonce kontrolü var mı?
2. `AuthHelper` ile API Key doğrulaması yapılıyor mu?
3. Hassas veriler JSON yanıtında gizlenmiş mi?
4. `RateLimiter` aktif mi?

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | Nonce, API Key, HMAC ve Rate Limiting detayları eklendi. |
