---
id: payout-csv-exporter
title: Payout CSV Exporter (Reporting)
sidebar_label: Payout CSV Exporter
sidebar_position: 13
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, finansal ödeme kayıtlarının toplu olarak dışa aktarılmasını sağlayan `PayoutCsvExporter` bileşeninin teknik işleyişini ve veri güvenliği kurallarını açıklar.
:::

# 📊 Payout CSV Exporter

`PayoutCsvExporter`, yöneticilerin ödeme geçmişini denetlemek veya banka entegrasyonları için toplu veri almak amacıyla kullandığı bir yardımcı sınıftır. Veriyi hafızaya almadan doğrudan tarayıcıya "stream" ederek yüksek performans sağlar.

---

## 🛠️ Teknik İşleyiş

### 1. Erişim ve Güvenlik
Dışa aktarma işlemi standart bir WordPress `admin_post` kancası üzerinden yürütülür:
- **Endpoint:** `/wp-admin/admin-post.php?action=mhm_export_payouts`
- **Yetki Kontrolü:** Sadece `manage_options` (Yönetici) yetkisine sahip kullanıcılar erişebilir.
- **Nonce Doğrulama:** İşlemin geçerliliği `mhm_export_payouts` anahtarlı bir **WP Nonce** üzerinden doğrulanır.

### 2. Veri Formatı (Excel Uyumluluğu)
Sistem, CSV dosyalarının özellikle Excel'de düzgün açılabilmesi için **UTF-8 with BOM (Byte Order Mark)** kullanır:
- **BOM:** `\xEF\xBB\xBF` karakter dizisi dosyanın başına eklenir.
- **Ayrıcı:** Standart virgül (`,`) ayrıcı olarak kullanılır.

---

## 📋 CSV Sütun Yapısı (Mapping)

Dışa aktarılan dosyadaki kolonlar ve kaynakları aşağıdaki gibidir:

| Kolon Adı | Veri Kaynağı | Açıklama |
| :--- | :--- | :--- |
| `Payout ID` | `Post ID` | Sistemsel benzersiz kimlik. |
| `Vendor Name` | `WP_User` Display Name | Ödemenin yapıldığı satıcının tam adı. |
| `Amount` | `_mhm_payout_amount` | Ödeme tutarı (Decimal format). |
| `Currency` | WC Currency | WooCommerce baz para birimi. |
| `CPT Status` | `post_status` | WordPress tarafındaki durum (Pending, Approved vb.). |
| `Processor Status`| `_mhm_payout_status` | Ödeme sağlayıcısından dönen statü kodu (n/a ise bekliyor). |
| `Requested At` | `post_date_gmt` | Talebin UTC zaman damgası. |

---

## 🔒 Güvenlik Protokolleri

### PII (Kişisel Veri) Maskeleme
CSV çıktıları finansal denetim için tasarlandığından, satıcıların hassas bilgileri (IBAN, Vergi No) varsayılan olarak bu exportta yer almaz. Bu verilere sadece `Payout` dökümü içindeki şifreli meta katmanından erişilebilir.

### Loglama
Her dışa aktarma (Export) işlemi, `mhm_rentiva_payout_audit` tablosuna "export_triggered" aksiyonu ile kaydedilir. Kimin, ne zaman veri indirdiği forensics sisteminde izlenebilir.

---

## 💡 Geliştirici Notları

İhracat linkini dinamik olarak oluşturmak için PHP tarafında şu metod kullanılmalıdır:

```php
// Güvenli (Nonce-protected) Export URL'si alma
$export_url = \MHMRentiva\Admin\PostTypes\Payouts\PayoutCsvExporter::get_export_url();
```

## Bölüm Sonu Özeti
- `PayoutCsvExporter`, yüksek veri hacimleri için **Streaming** metodunu kullanır.
- Tüm operasyon **Nonce** ve **Capability** kontrolü ile korunur.
- Çıktılar **Excel-Ready (UTF-8 BOM)** formatındadır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | Sayfa, PayoutCsvExporter sınıfındaki streaming mantığı ve Excel BOM yapısına göre güncellendi. |
