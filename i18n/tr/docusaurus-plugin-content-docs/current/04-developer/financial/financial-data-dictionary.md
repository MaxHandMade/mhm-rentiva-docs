---
id: financial-data-dictionary
title: Finansal Veri Sözlüğü (Data Dictionary)
sidebar_label: Finansal Veri Sözlüğü
sidebar_position: 6
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
Bu sayfa, MHM Rentiva finansal modülünde kullanılan tüm anahtar kelimelerin, veritabanı alanlarının ve teknik tanımların standart referans dökümantasyonudur.
:::

# 📖 Finansal Veri Sözlüğü

Finansal veriler Rentiva ekosisteminde üç ana katmanda saklanır: **Global Ayarlar (Options)**, **Kullanıcı Bilgileri (User Meta)** ve **İşlem Detayları (Payout/Booking Meta)**.

## ⚙️ Global Ayarlar (Options)
`wp_options` tablosunda saklanan sistem geneli finansal konfigürasyonlar:

| Anahtar (Key) | Tip | Açıklama |
| :--- | :--- | :--- |
| `mhm_min_payout_amount` | `float` | Bir satıcının ödeme talep edebilmesi için gereken minimum bakiye. |
| `mhm_rentiva_global_payout_freeze` | `bool` | Sistem genelinde tüm ödemeleri durduran acil durum anahtarı. |
| `mhm_rentiva_payout_webhook_secret`| `string` | Payout bildirimleri için kullanılan HMAC imzalı secret key. |
| `mhm_rentiva_commission_tiers` | `json` | Satış hacmine göre indirim oranlarını belirleyen eşik değerleri. |

---

## 👤 Kullanıcı Finansal Verileri (User Meta)
`wp_usermeta` tablosunda satıcı (Vendor) bazlı saklanan veriler:

| Anahtar (Key) | Tip | Açıklama |
| :--- | :--- | :--- |
| `_mhm_vendor_commission_rate` | `float` | Satıcıya özel tanımlanmış sabit komisyon oranı (Override). |
| `_mhm_vendor_payout_freeze` | `bool` | Sadece bu satıcının ödeme almasını engelleyen blokaj durumu. |
| `_mhm_vendor_tier_id` | `string` | Satıcının şu an dahil olduğu performans kategorisi. |

---

## 💰 Payout (Ödeme) Verileri (Post Meta)
`mhm_rentiva_payout` post type altında saklanan meta veriler:

| Anahtar (Key) | Tip | Açıklama |
| :--- | :--- | :--- |
| `_mhm_payout_amount` | `float` | Talep edilen veya ödenen net tutar. |
| `_mhm_payout_status` | `string` | Durum: `pending`, `processing`, `completed`, `rejected`. |
| `_mhm_payout_external_ref` | `string` | Banka veya ödeme geçidi (Stripe vb.) referans numarası. |
| `_mhm_payout_rejection_reason` | `string` | Reddedilen talepler için girilen açıklama metni. |

---

## 🔑 Yetkilendirme (Capabilities)
Finansal işlemleri yönetmek için gerekli WordPress yetkileri:

- **`mhm_rentiva_approve_payout`**: Ödeme taleplerini onaylama yetkisi.
- **`mhm_rentiva_freeze_payout`**: Ödemeleri durdurma/blokaj uygulama yetkisi.
- **`mhm_rentiva_view_financial_audit`**: Audit loglarını ve Ledger detaylarını görme yetkisi.

---

## 🔄 Veri İlişki Haritası

```mermaid
graph LR
    U[User Meta] -- overrides --> P[Policy]
    O[Options] -- defines --> P
    P -- resolves --> C[Commission]
    C -- records --> L[Ledger]
    L -- sums to --> PM[Payout Meta]
```

## Bölüm Sonu Özeti
- Tüm finansal anahtarlar `_mhm_` ön eki ile (private meta) saklanır.
- Kritik işlemler (Örn: `payout_status`) sadece yetkili (Capabilities) kullanıcılar tarafından değiştirilebilir.
- Ledger tablosundaki alanlar için [Ledger Modeli](./financial-ledger-model) sayfasına bakınız.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | Sayfa, eklentinin güncel Meta ve Option anahtarlarına göre güncellendi. |
