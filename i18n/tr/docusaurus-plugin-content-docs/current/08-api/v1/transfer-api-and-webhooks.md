---
id: transfer-api-and-webhooks
title: Transfer Servisleri ve Webhook Akışları
sidebar_label: Transfer API ve Webhook
sidebar_position: 100
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
Bu sayfa, Transfer modülünün asenkron çalışma yapısını, sepete ekleme süreçlerini ve dış servislerle olan webhook haberleşme trafiğini açıklar.
:::

# 🛣️ Transfer Servisleri ve Webhook Akışları

Transfer modülü, kiralama modülünden farklı olarak noktadan noktaya (Point-to-Point) fiyatlandırma ve özel rota hesaplamaları içerir. Bu süreçler AJAX ve REST API üzerinden hibrit bir şekilde yönetilir.

---

## 🛒 1. Transfer Rezervasyon Akışı (Frontend)

Müşteri tarafındaki etkileşimler yüksek performans için AJAX tabanlı yürütülür:

- **Aksiyon:** `rentiva_transfer_add_to_cart`
- **Güvenlik:** `rentiva_transfer_nonce` kontrolü zorunludur.
- **Veri Modeli:** `booking_type=transfer` etiketi ile WooCommerce sepetine eklenir.
- **İş Akışı:** Seçilen araç tipi, kişi sayısı ve rota bilgileri `TransferPricingEngine` tarafından doğrulanarak sepete yansıtılır.

---

## 📡 2. Webhook ve Callback Mekanizması

Dış ödeme sağlayıcıları ve transfer partnerleri ile olan iletişim REST uç noktaları üzerinden sağlanır.

### Payout ve Rezervasyon Callback
- **Route:** `/mhm-rentiva/v1/payouts/{id}/callback`
- **Doğrulama:** `HMAC-SHA256` tabanlı imza kontrolü.
- **İşleyiş:** Ödeme servisinden gelen "Başarılı" sinyali sonrası `TransferService` rezervasyonu onaylar ve ilgili taraflara (Müşteri/Tedarikçi) bildirim gönderir.

---

## 🏥 3. Sistem Sağlık Denetimi (Health Endpoint)

Sistemin dışarıdan izlenebilirliğini (Monitoring) sağlar.

- **URL:** `/wp-json/mhm-rentiva/v1/health`
- **Kullanım Alanları:** Uptime izleme, Smoke Test ve CI/CD sonrası canlılık kontrolü.
- **Dönen Veri:** Veritabanı tablolarının durumu, `/tmp` dizini yazma izinleri ve PHP sürüm uyumluluğu.

---

## 🛡️ 4. Güvenlik ve Hız Sınırları (Rate Limiting)

- **Genel Sınır:** Transfer arama uç noktaları için dakikada 30 istek.
- **Callback Sınırı:** IP bazlı değil, servis sağlayıcı kimliği (PSP Identity) bazlı özel limitler uygulanır.
- **Idempotency:** Aynı bildirim ID'sine sahip tekrarlı istekler işlem görmez, ancak `200 OK` dönülür.

## Bölüm Sonu Özeti
- Transfer modülü, AJAX (Frontend) ve REST (Backend/External) katmanlarını bir arada kullanır.
- Tüm finansal etkileşimler imza tabanlı (`HMAC`) doğrulamaya tabidir.
- `Health` endpointi ile sistemin operasyonel durumu anlık takip edilebilir.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | TransferPricingEngine entegrasyonu, Health endpoint detayları ve HMAC doğrulama akışı eklendi. |
