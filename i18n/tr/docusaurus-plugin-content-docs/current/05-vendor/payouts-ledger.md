---
id: payouts-ledger
title: Ödemeler ve Finansal Defter (Payouts & Ledger)
sidebar_label: Payouts & Ledger
sidebar_position: 10
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
MHM Rentiva, "Model B" olarak adlandırılan, değişmez (immutable) ve her zaman denetlenebilir bir finansal motor kullanır. Bu doküman, tedarikçi kazançlarının nasıl hesaplandığını ve ödeme süreçlerinin nasıl atomik olarak yönetildiğini açıklar.
:::

# 💳 Finansal Motor ve Payout Döngüsü

Sistem, tedarikçi bakiyelerini dinamik bir bakiye alanı yerine, append-only (sadece ekleme yapılabilen) bir defter üzerinden hesaplar.

---

## 🏗️ 1. Model B Ledger Yapısı

Ledger, sistemdeki tek finansal gerçeklik kaynağıdır (`Single Source of Truth`).

### Değişmezlik (Immutability) İlkesi
- **Update/Delete Yasaktır:** Hiçbir ledger satırı güncellenemez veya silinemez.
- **Düzeltme Kayıtları:** Hatalı bir işlem ancak ters yönlü bir kayıtla (reversal) düzeltilebilir.
- **SaaS İzolasyonu:** Her kayıt bir `tenant_id` ile ilişkilendirilmiştir.

### Kayıt Tipleri (`Entry Types`)
| Tip | Yön | Açıklama |
|---|---|---|
| `commission_credit` | `+` | Tamamlanan rezervasyondan gelen hak ediş. |
| `payout_debit` | `−` | Onaylanan ödeme talebi sonucu bakiye düşümü. |
| `refund` | `−` | İptal edilen rezervasyonun geri iadesi. |

---

## ⚛️ 2. Atomik Ödeme Süreci (`AtomicPayoutService`)

Ödemelerin onaylanması, veritabanı seviyesinde bir **Transaction** içinde gerçekleşir. Bu, sistemin bir adımda hata alması durumunda tüm sürecin geri alınmasını (Rollback) sağlar.

### İşlem Adımları:
1. **Pre-flight Check:** Bakiye ve statü kontrolü (Transaction dışı).
2. **START TRANSACTION:** DB kilidi başlatılır.
3. **Concurrent Guard:** `post_status` DB'den tekrar okunur (Race condition engelleme).
4. **Ledger Write:** `payout_pending_debit` kaydı atılır.
5. **CPT Update:** Payout postu `publish` durumuna getirilir.
6. **COMMIT:** Tüm işlemler başarılıysa kalıcı hale getirilir.

---

## 🛡️ 3. Çift Ödemeyi Engelleme Katmanları

Double-spending riskine karşı 4 katmanlı koruma mevcuttur:

| Katman | Mekanizma | Seviye |
|---|---|---|
| **L1: Uygulama** | `vendor_has_pending_payout()` kontrolü. | PHP / AJAX |
| **L2: Bakiye** | `Ledger::get_balance() >= amount` doğrulaması. | Domain Logic |
| **L3: Transaction** | InnoDB Row Lock ve concurrent status guard. | Database |
| **L4: Idempotency** | `payout_{id}` formatında benzersiz UUID. | DB Unique Key |

---

## ⚙️ 4. Teknik API Referansı

### Bakiye Sorgulama
```php
// Sadece 'cleared' ve 'reserved' durumundaki kayıtların toplamını döner.
$balance = Ledger::get_balance($vendor_id);
```

### Ödeme Talebi Oluşturma
```php
// PayoutService::request_payout()
// 1. Minimum limit (mhm_min_payout_amount) kontrol edilir.
// 2. Bekleyen talep olup olmadığı denetlenir.
// 3. mhm_payout postu oluşturulur.
```

---

## 📧 5. Bildirimler ve Hook'lar

| Hook | Tetiklenme Anı | Alıcı |
|---|---|---|
| `mhm_rentiva_payout_approved` | Ödeme atomik olarak onaylandığında. | Vendor |
| `mhm_rentiva_payout_rejected` | Ödeme admin tarafından reddedildiğinde. | Vendor |

## Bölüm Sonu Özeti
- Ledger tablosu `APPEND-ONLY` mimaridedir.
- `AtomicPayoutService` veritabanı tutarlılığını transaction ile garanti eder.
- Çift ödeme engelleme (Idempotency) UUID seviyesinde zorunlu tutulmuştur.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | Model B Engine, Atomic Transactions ve SaaS izolasyonu detayları eklendi. |
