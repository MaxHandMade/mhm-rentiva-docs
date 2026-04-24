---
id: financial-rest-callbacks
title: Ödeme Geri Bildirim API (Payout Callback)
sidebar_label: Payout Callback API
sidebar_position: 50
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
Bu uç nokta (endpoint), dış ödeme işlemcilerinden (Bankalar, Ödeme Kuruluşları) gelen para çekme (payout) sonuçlarını güvenli bir şekilde karşılamak ve Ledger (Defter) kayıtlarını güncellemek için kullanılır.
:::

# 🧾 Ödeme Geri Bildirim API'si

Payout Callback API, finansal döngünün son adımıdır. Dış dünyadan gelen "Başarılı" veya "Hatalı" sinyallerine göre sistemin mali durumunu günceller.

---

## 📍 Endpoint Bilgileri
- **URL:** `/wp-json/mhm-rentiva/v1/payouts/{id}/callback`
- **Metot:** `POST`
- **Doğrulama:** HMAC SHA-256 (Zorunlu)

---

## 🛡️ 1. Güvenlik ve Doğrulama (HMAC)

Sahte bildirimleri önlemek için her istek şu başlıkları içermelidir:
- **`X-MHM-Timestamp`:** İsteğin yapıldığı UTC zaman damgası. Sunucu saatiyle farkı 300 saniyeden fazla ise istek reddedilir.
- **`X-MHM-Signature`:** İstek gövdesi (payload) ve gizli anahtar (Secret Key) kullanılarak üretilen `HMAC SHA-256` hash değeri.

---

## 📥 İstek Gövdesi (Payload)

```json
{
  "status": "confirmed",
  "external_reference": "TRX_998877",
  "reason": "" 
}
```

- **`status`:** `confirmed` (Başarılı) veya `failed` (Hatalı).
- **`external_reference`:** Ödeme kuruluşundan gelen işlem referans numarası.
- **`reason`:** Hata durumunda (failed) reddedilme nedeni.

---

## ⚙️ 2. İş Kuralları ve Ledger Güncellemesi

Sistem, gelen duruma göre Ledger (Defter) üzerinde atomik işlemler yapar:

| Durum | İşlem | Açıklama |
|---|---|---|
| **confirmed** | Statü Güncellemesi | Payout kaydı `completed` olarak işaretlenir. Ledger üzerinde yeni bir satır eklenmez (Bakiye zaten düşülmüştü). |
| **failed** | `payout_reversal` | Ödeme başarısız olduğu için, önceden düşülen bakiye tedarikçiye iade edilir. Ledger'a ters yönlü bir kayıt eklenir. |
| **Mükerrer İstek** | Idempotency | Eğer isteğe konu olan `payout_id` zaten nihai bir statüdeyse, işlem yapılmaz ve `200 OK` dönülür. |

---

## 🚦 3. Hata Yönetimi
- **401 Unauthorized:** İmza doğrulaması başarısız.
- **404 Not Found:** Geçersiz Payout ID.
- **429 Too Many Requests:** Rate limit (20 istek/dakika) aşıldı.

## Bölüm Sonu Özeti
- Callback API, finansal veri bütünlüğünü sağlamak için HMAC doğrulaması kullanır.
- `failed` durumunda otomatik bakiye iade mekanizması (`reversal`) çalışır.
- Tüm işlemler `AdvancedLogger` üzerinden denetim izi (audit trail) olarak kaydedilir.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | HMAC doğrulama detayları ve Reversal (Ters Kayıt) mantığı eklendi. |
