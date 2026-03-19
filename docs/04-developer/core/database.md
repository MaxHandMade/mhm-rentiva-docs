---
id: database
title: Veritabanı Mimarisi (Database Architecture)
sidebar_label: Veritabanı
sidebar_position: 1
---

![Version](https://img.shields.io/badge/version-4.23.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, MHM Rentiva'nın hibrit veritabanı yapısını (WP Core + Native Custom Tables), tablo şemalarını ve veri bütünlüğü standartlarını açıklar.
:::

# 🗄️ Veritabanı Mimarisi

MHM Rentiva, yüksek performans ve veri bütünlüğü gereksinimleri için **WordPress Post/User Meta** sistemi ile birlikte **Yüksek Performanslı Özel Tablolar** (Custom Tables) kullanan hibrit bir mimariye sahiptir.

## 📊 Özel Tablolar (Custom Tables)

Eklenti, finansal kayıtlar ve SaaS operasyonları için WordPress'in standart tablolarını bypass ederek doğrudan SQL üzerinde optimize edilmiş şu tabloları kullanır:

| Tablo Adı | Amaç | Kritik Alanlar |
| :--- | :--- | :--- |
| `wp_mhm_rentiva_ledger` | Değiştirilemez finansal defter (Immutable Ledger). | `transaction_uuid`, `amount`, `tenant_id` |
| `wp_mhm_rentiva_commission_policy` | Komisyon politikalarının versiyonlanmış kayıtları. | `version_hash`, `global_rate`, `effective_from` |
| `wp_mhm_rentiva_tenants` | Çoklu kiracı (Multi-tenant) kayıt ve kotaları. | `tenant_id`, `status`, `subscription_plan` |
| `wp_mhm_rentiva_usage_metrics` | SaaS kullanım limitleri ve metrik takibi. | `metric_type`, `metric_value`, `cycle_start` |

### 🏗️ Veri Bütünlüğü Prensipleri
- **Immutability (Değiştirilemezlik):** `ledger` tablosundaki kayıtlar asla güncellenmez veya silinmez. Düzeltmeler yeni bir ters kayıt (offsetting entry) ile yapılır.
- **Tenant Isolation:** Tüm özel tablolarda `tenant_id` alanı mevcuttur. Veriler veritabanı seviyesinde mantıksal olarak izole edilmiştir.
- **Audit Trail:** Komisyon politikaları `version_hash` (SHA-256) ile imzalanarak mali denetim izi oluşturulur.

---

## 🔑 Meta Key Standartları

Operasyonel veriler (araç özellikleri, müşteri tercihleri vb.) WordPress meta tablolarında şu prefix kuralı ile saklanır:
`_mhm_rentiva_[kategori]_[alan_adı]`

| Kategori | Örnek Key |
| :--- | :--- |
| **Araç (Vehicle)** | `_mhm_rentiva_vehicle_license_plate` |
| **Rezervasyon** | `_mhm_rentiva_booking_payout_status` |
| **Müşteri** | `_mhm_rentiva_customer_banned` |

---

## 🧬 Tablo İlişkileri (ER)

```mermaid
erDiagram
    TENANTS ||--o{ LEDGER : "veris kayıtları"
    TENANTS ||--o{ USAGE_METRICS : "limit takibi"
    LEDGER ||--o{ COMMISSION_POLICY : "politika referansı"
    WP_POSTS ||--o{ LEDGER : "rezervasyon kaynağı"
    
    TENANTS {
        bigint tenant_id UK
        string status
        string subscription_plan
    }
    LEDGER {
        string transaction_uuid UK
        bigint tenant_id FK
        decimal amount
        string type
    }
    COMMISSION_POLICY {
        string version_hash UK
        decimal global_rate
        datetime effective_from
    }
```

---

## 🛠️ Bakım ve Geliştirme

- **Migrations:** Veritabanı şeması `src/Core/Database/Migrations/` altında tanımlanmıştır. `MultiTenantMigration` ve `LedgerMigration` sınıfları `dbDelta` kullanarak güvenli güncelleme yapar.
- **Audit Tool:** Veritabanı tutarlılığı `wp mhm-rentiva audit` CLI komutları ile doğrulanabilir.

## Bölüm Sonu Özeti
- Kritik finans verileri **Custom Tables** üzerinde SQL gücüyle yönetilir.
- Esnek veriler **WP Meta** sisteminde saklanır.
- **Multi-tenancy** yapısı `tenant_id` parametresiyle tüm katmanlara yayılmıştır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.23.0 | Veritabanı dökümantasyonu SaaS ve Finans mimarisine göre baştan yazıldı. |

