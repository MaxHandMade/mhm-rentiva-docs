---
id: financial-troubleshooting
title: Finansal Sorun Giderme & Hata Matrisi
sidebar_label: Finansal Sorun Giderme
sidebar_position: 2
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, finansal modüllerde karşılaşılan teknik hataların teşhisi ve hızlı çözümü için bir rehberdir.
:::

# 🔍 Finansal Sorun Giderme

Finansal hatalar genellikle ağ kesintileri, yetki eksiklikleri veya veri tutarsızlıklarından kaynaklanır.

---

## 🛠️ Hata Kodu & Çözüm Matrisi

| Hata Kodu | Anlamı | İlk Müdahale |
|---|---|---|
| `401 Unauthorized` | HMAC / İmza Hatası | API Secret key eşleşmesini ve sunucu saatini (NTP) kontrol edin. |
| `403 Forbidden` | Governance Blokajı | Satıcının `Freeze` durumunda olup olmadığını `GovernanceService` üzerinden denetleyin. |
| `409 Invalid State` | Statü Çakışması | Webhook callback'in sadece `Processing` veya `Approved` statüsündeki payout'lar için geldiğini doğrulayın. |
| `429 Too Many Requests` | Rate Limit Aşımı | `WebhookRateLimiter` kayıtlarını temizleyin veya limitleri esnetin. |
| `Atomic Failure` | DB Rollback | İşlem sırasında bağlantı kopmuş olabilir. `Ledger` üzerinde mükerrer kayıt olmadığını teyit edin. |

---

## 🚩 Yaygın Senaryolar ve Teşhis

### 1. Beklenen Bakiye Yanlış (Balance Mismatch)
Eğer satıcının paneli ile Ledger tabloları uyuşmuyorsa:
- **Teşhis:** `mhm_rentiva_ledger` tablosunda `source_type` filtresiyle arama yapın.
- **Çözüm:** `Ledger::calculate_net_balance()` metodunu asenkron olarak tetikleyerek veritabanı toplamını zorlayın.

### 2. Payout "Approved" Kalıyor (No Callback)
Onaylanan bir ödeme "Confirmed" statüsüne geçmiyorsa:
- **Teşhis:** `WebhookLog` kayıtlarını inceleyerek bankadan gelen bildirim hatasını bulun.
- **Çözüm:** Webhook'u manuel olarak (cURL üzerinden imza simülasyonu ile) tekrar tetikleyin.

### 3. Çift Kayıt (Double Entry)
Aynı işlem ID'si ile iki Ledger kaydı oluştuysa:
- **Teşhis:** `ForensicHardeningTest` scriptini o kullanıcı için koşturun.
- **Çözüm:** İkinci kaydı `record_reversal()` ile nötrleyin. **Asla manuel silme yapmayın.**

---

## 📄 Log Tarama Prosedürü

Sorunun kaynağını bulmak için şu log kanallarını izleyin:
- **WP Debug Log:** PHP hataları ve `Util` uyarıları için.
- **Stitch / API Logs:** Webhook payload içeriğini doğrulamak için.
- **Audit Logs:** `GovernanceService` tarafından kaydedilen yetki redleri için.

## Bölüm Sonu Özeti
- Hataların çoğu **HMAC** veya **NTP** (zaman senkronizasyonu) kaynaklıdır.
- Ledger tutarsızlıklarında referans her zaman veritabanı (WPDB) satırlarıdır.
- Loglar, sorunun adli (Forensic) kanıtıdır; silinmemelidir.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | Hata matrisi ve asenkron bakiye sorunları ekendi. |

