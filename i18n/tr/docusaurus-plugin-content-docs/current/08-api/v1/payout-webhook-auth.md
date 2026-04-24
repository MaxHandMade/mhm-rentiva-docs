---
id: payout-webhook-auth
title: Ödeme Webhook Kimlik Doğrulama
sidebar_label: Payout Webhook Auth
sidebar_position: 80
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
`PayoutWebhookAuth`, dış ödeme servislerinden gelen bildirimlerin (webhooks) güvenilirliğini doğrulamak için kullanılan uzmanlaşmış bir güvenlik katmanıdır.
:::

# 🔒 Ödeme Webhook Kimlik Doğrulama

MHM Rentiva, finansal veri bütünlüğünü korumak için dış dünyadan gelen her ödeme bildirimini sıkı bir doğrulama sürecinden geçirir.

---

## 🛡️ 1. Kimlik Doğrulama Modeli

Bu bileşen, `AuthHelper` sınıfının bir uzantısı olarak çalışır ve sadece ödeme servis sağlayıcıları (PSP) için tanımlanan özel anahtarları kullanır.

- **Kaynak Doğrulaması:** İsteklerin sadece bilinen IP adreslerinden veya geçerli bir uygulama kimliğiyle geldiğini kontrol eder.
- **Gizli Anahtar (Secret Key):** Her PSP entegrasyonu için benzersiz bir `Webhook Secret` tanımlanır.

---

## ✍️ 2. İmza Doğrulama (Signature Verification)

En yaygın kullanılan güvenlik methodu `HMAC-SHA256`'dır. Süreç şu adımlardan oluşur:

1. **Header Çıkarma:** İstek başlığındaki `X-Rentiva-Signature` değeri alınır.
2. **Hash Üretimi:** Gelen ham istek gövdesi (Raw Body) ve sistemdeki `Webhook Secret` kullanılarak sunucu tarafında yeni bir hash hesaplanır.
3. **Karşılaştırma:** Hesaplanan hash ile başlıktaki imza `hash_equals()` (timing-attack safe) fonksiyonu ile karşılaştırılır.

---

## ⏳ 3. Replay ve Rate Koruması

### Zaman Damgası (Timestamp) Kontrolü
İstek içindeki zaman damgası, sunucu saatiyle karşılaştırılır. Eğer fark 5 dakikadan (300sn) fazlaysa, istek bir "Replay Attack" (Tekrar Saldırısı) kabul edilerek reddedilir.

### Webhook Rate Limiter
- Aynı işlem ID'si için saniyede birden fazla bildirim gelirse, sistem sadece ilkini işler.
- `WebhookRateLimiter` sınıfı, ödeme sağlayıcısından kaynaklanan mükerrer çağrıları (retries) yönetir.

---

## ⚙️ 4. İdempotent İşlem Stratejisi

Eğer ödeme servis sağlayıcısı aynı başarılı bildirimi (`confirmed`) tekrar gönderirse:
- Sistem veritabanında bu işlemin statüsünü kontrol eder.
- Eğer işlem zaten "Completed" ise, herhangi bir Ledger (Defter) işlemi yapmaz ancak servis sağlayıcısına `200 OK` dönerek sürecin sona ermesini sağlar.

## Bölüm Sonu Özeti
- `PayoutWebhookAuth`, finansal manipülasyonları önleyen en kritik güvenlik katmanıdır.
- `hash_equals` kullanımı ile zamanlama saldırılarına karşı korunur.
- Replay koruması ile eski veya ele geçirilmiş isteklerin tekrar yürütülmesi engellenir.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | HMAC-SHA256, hash_equals ve Replay Attack koruma detayları eklendi. |
