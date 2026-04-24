---
id: payout-list-table
title: Payout List Table (Admin UI)
sidebar_label: Payout List Table
sidebar_position: 6
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
Bu döküman, yönetim panelindeki "Ödeme Talepleri" ekranını yöneten `PayoutListTable` sınıfının teknik yeteneklerini ve operasyonel akışını açıklar.
:::

# 🧾 Payout List Table

`PayoutListTable`, Rentiva'nın finansal yönetişim katmanının admin tarafındaki ana UI bileşenidir. `WP_List_Table` sınıfını temel alarak, karmaşık finansal verileri okunabilir ve aksiyon alınabilir bir formatta sunar.

---

## 🏗️ Temel Sorumluluklar

1.  **Analitik Görünüm:** Satıcı bakiyeleri ve talep edilen tutarların anlık gösterimi.
2.  **Güvenli Filtreleme:** Sadece geçerli durumdaki ödeme taleplerinin listelenmesi.
3.  **İşlem Yönetimi:** Toplu onay (Bulk Approve) ve CSV dışa aktarım entegrasyonu.

---

## 📊 Kolon Yapısı ve Veri Kaynakları

Tablodaki her kolon, veritabanının farklı katmanlarından beslenir:

| Kolon | Veri Kaynağı | Açıklama |
| :--- | :--- | :--- |
| **Vendor** | `WP_User` | Talebi oluşturan satıcının Display Name ve ID'si. |
| **Amount** | `post_meta` | Talep edilen hakediş tutarı (`wc_price` formatında). |
| **Balance** | `Ledger` | Satıcının Ledger tablosundaki anlık kullanılabilir bakiyesi. |
| **Status** | `post_status` | Talebin durumu (Pending, Approved, Rejected). |
| **Requested**| `post_date` | Talebin oluşturulduğu tarih (GMT normalizasyonu ile). |

---

## ⚡ Toplu İşlemler (Bulk Actions)

### Toplu Onay (Bulk Approve)
Yöneticiler, birden fazla talebi seçerek merkezi onay mekanizmasını tetikleyebilir:
- **Metot:** `process_bulk_approve()`
- **İşleyiş:** Seçilen ID'ler üzerinden `GovernanceService::process_approval` metodunu çağırır.
- **İdempozens:** Sadece `pending` durumundaki talepler işlenir; zaten onaylanmış olanlar atlanır (Double-debit koruması).

---

## 🔄 Durum ve Renk Kodları

Tablo, işlem durumlarını dinamik renklerle görselleştirir:
- 🟡 **Pending:** Beklemede (Onay bekliyor).
- 🔵 **Approved:** Onaylandı (Ödeme emri verildi).
- 🟢 **Confirmed:** Kesinleşti (Banka/Processor tarafı tamamlandı).
- 🔴 **Rejected / Failed:** Reddedildi veya Hata oluştu.

## 🛡️ Güvenlik ve Yetkilendirme

- **Capability:** Toplu işlemleri gerçekleştirmek için `mhm_rentiva_approve_payout` yetkisi zorunludur.
- **Nonce:** Tüm bulk action'lar standart WP güvenliğinden geçirilir.
- **Idempotency Guard:** `PayoutListTable` içinde her işlem öncesi `post_status` kontrolü yapılarak mükerrer işlem yapılması kod seviyesinde engellenir.

## Bölüm Sonu Özeti
- `PayoutListTable` finansal dökümü gösteren dâhili bir admin aracıdır.
- Veriler `Ledger` ve `post_meta` üzerinden hibrit olarak çekilir.
- Toplu onay işlemi **GovernanceService** süzgecinden geçer.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | PayoutListTable sınıfı, bulk approve ve ledgar entegrasyonuyla güncellendi. |
