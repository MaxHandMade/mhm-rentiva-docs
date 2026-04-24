---
id: financial-ledger-model
title: Ledger Veri Modeli (Schema & Logic)
sidebar_label: Ledger Modeli
sidebar_position: 11
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, Rentiva finansal sisteminin temeli olan Değişmez Defter (Immutable Ledger) veri şemasını, depolama kurallarını ve finansal mantığını detaylandırır.
:::

# 🧾 Ledger Veri Modeli

`wp_mhm_rentiva_ledger` tablosu, tüm finansal olayların nihai kayıt yeridir. Bu tablo **Append-Only** (Sadece Ekleme) yapısındadır; mevcut satırlar asla güncellenmez veya silinmez.

---

## 🏗️ SQL Şeması (Technical Schema)

Sistemde kullanılan ana tablo yapısı aşağıdadır. Hassas finansal hesaplamalar için `DECIMAL(12,2)` kullanılmaktadır.

```sql
CREATE TABLE wp_mhm_rentiva_ledger (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    tenant_id BIGINT UNSIGNED NOT NULL DEFAULT 1,
    transaction_uuid CHAR(36) NOT NULL, -- Idempotency Key
    vendor_id BIGINT UNSIGNED NOT NULL,
    booking_id BIGINT UNSIGNED NULL,
    order_id BIGINT UNSIGNED NULL,
    type VARCHAR(30) NOT NULL,          -- İşlem Türü
    amount DECIMAL(12,2) NOT NULL,      -- Net Etki Tutarı
    gross_amount DECIMAL(12,2) NULL,    -- WC Sipariş Toplamı
    status VARCHAR(30) NOT NULL,        -- 'cleared', 'pending', 'void'
    policy_id BIGINT UNSIGNED NULL,     -- İlişkili Policy ID
    policy_version_hash CHAR(64) NULL,  -- Denetim için Policy Hash
    created_at DATETIME NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (transaction_uuid),      -- Mükerrer Kayıt Engeli
    INDEX (vendor_id, status, created_at)
) ENGINE=InnoDB;
```

---

## 🔄 İşlem Türleri ve Bakiye Etkisi

`type` kolonu, işlemin satıcı bakiyesine nasıl etki edeceğini belirler:

| İşlem Türü (`type`) | Bakiye Etkisi | Açıklama |
| :--- | :--- | :--- |
| `commission_credit` | **Pozitif (+)** | Tamamlanan bir satıştan gelen hakediş. |
| `commission_refund` | **Negatif (-)** | İade edilen bir siparişin ters kaydı. |
| `payout_debit` | **Negatif (-)** | Satıcıya yapılan başarılı ödeme (Çıkış). |
| `payout_reversal` | **Pozitif (+)** | Başarısız/Geri dönen bir ödemenin iadesi. |

---

## 🛡️ Domain Kuralları ve Güvenlik

### 1. Immutability (Değişmezlik)
Finansal denetim (Audit) standartları gereği, bu tabloda `UPDATE` veya `DELETE` işlemi yapılması kesinlikle yasaktır. Bir hata düzeltilmesi gerekiyorsa, hatayı nötralize eden yeni bir ters kayıt (Correction/Refund) eklenmelidir.

### 2. Transaction UUID (Idempotency)
Her finansal olay (Sipariş ödemesi, Payout onayı), kaynağında bir UUID üretir. Veritabanı seviyesindeki `UNIQUE` kısıtlaması, sistemin aynı olayı yanlışlıkla iki kez işlemesini donanım seviyesinde engeller.

### 3. Zamanlama (Temporal Audit)
Tüm işlemler `created_at` kolonu üzerinden UTC olarak damgalanır. `policy_id` ve `policy_version_hash` alanları sayesinde, işlemin yapıldığı tarihteki komisyon politikası ile tutarlılığı 2 yıl sonra bile doğrulanabilir.

---

## 📊 Bakiye Hesaplama Mantığı

Satıcının güncel bakiyesi her zaman tüm "cleared" satırların toplanmasıyla bulunur:

```sql
SELECT SUM(amount) FROM wp_mhm_rentiva_ledger 
WHERE vendor_id = %d AND status = 'cleared';
```

## Bölüm Sonu Özeti
- Veri tipi her zaman **DECIMAL**'dır (Float yasaktır).
- Tablo yapısı **Append-Only** ve **Tenant-Isolated**'dır.
- Her kaydın benzersiz bir **UUID**'si vardır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | Sayfa, LedgerMigration şeması ve bakiye etkisi matrisi ile güncellendi. |
