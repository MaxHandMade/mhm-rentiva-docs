---
id: financial-operations-runbook
title: Finansal Operasyon Runbook (L1/L2)
sidebar_label: Operasyon Runbook
sidebar_position: 1
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
Bu rehber, Rentiva finansal operasyon ekibi ve sistem yöneticileri için günlük rutinleri ve kritik müdahale adımlarını tanımlar.
:::

# 📖 Finansal Operasyon Runbook

Finansal operasyonlar, sistemin nakit akışını ve veri bütünlüğünü korumak için tasarlanmış sıralı adımlardan oluşur.

---

## 🕒 Günlük Mutabakat (Reconciliation)

Her iş günü başında aşağıdaki kontroller yapılmalıdır:
1. **Pending Payouts:** `Payout List Table` üzerinden bekleyen taleplerin yaşlandırmasını (Aging) kontrol edin. 48 saati geçen talepleri incelemeye alın.
2. **Ledger Balance:** Ledger tablolarındaki toplam giren/çıkan bakiyenin, sistemin raporladığı toplam `Net Balance` ile tutarlılığını test edin.
3. **Failed Webhooks:** `WebhookLog` tablosunu tarayarak başarılı olmayan ödeme bildirimlerini tespit edin.

---

## ⚖️ Governance Operasyonları

Kritik durumlarda `GovernanceService` üzerinden müdahale prosedürleri:

### ❄️ Satıcı Dondurma (Freeze)
Riskli aktivite tespit edildiğinde:
- Satıcı ID'sini `Governance` paneline girin.
- **Freeze** bayrağını aktif edin.
- Bu işlem, satıcının tüm bekleyen payout'larını askıya alır ve yeni talep oluşturmasını engeller.

### 🔓 Payout Onay Döngüsü (Maker-Checker)
- **Maker:** Operasyon sorumlusu talebi inceler ve listeler.
- **Checker:** Finans yöneticisi, operasyon sorumlusunun kendi hesabına payout yapmadığından emin olduktan sonra `Bulk Approve` işlemini gerçekleştirir.

---

## 📝 Audit Log Doğrulama

Herhangi bir finansal itiraz durumunda:
1. `mhm_rentiva_ledger` tablosundan işlem ID'sini bulun.
2. `GovernanceService::log_decision()` tarafından oluşturulan audit kaydıyla eşleştiğini doğrulayın.
3. Timestamp ve IP adresi tutarlılığını kontrol ederek adli (Forensic) bütünlüğü onaylayın.

---

## 🔄 Reversal (Ters İşlem) Yönetimi

Hatalı veya mükerrer ödemelerde:
- `Ledger::record_reversal()` metodunu kullanarak yeni bir "Reversal" satırı ekleyin.
- **Asla** mevcut bir Ledger kaydını silmeyin veya güncellemeyin.

## Bölüm Sonu Özeti
- Operasyonel adımlarda "Silme" (Delete) yetkisi hiçbir kademede yoktur.
- Her müdahale mutlaka bir audit kaydı bırakmalıdır.
- Günlük mutabakat, sistemin finansal sağlığı için zorunludur.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | Sayfa, mutabakat ve Governance operasyonel adımlarıyla güncellendi. |

