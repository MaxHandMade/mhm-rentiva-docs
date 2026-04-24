---
id: payment-settings
title: PaymentSettings Sınıf Mimarisi (UI & Integration)
sidebar_label: Ödeme Ayarları (Teknik)
sidebar_position: 5
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
Bu sayfa, Rentiva'nın ödeme ayarları mimarisini ve `PaymentSettings` sınıfının ödeme geçitlerini (Gateways) yönetmek yerine **WooCommerce** ile nasıl köprü kurduğunu açıklar.
:::

# 💳 PaymentSettings Sınıfı

Rentiva, ödeme güvenliği ve esneklik için "Tekerleği Yeniden İcat Etme" prensibini izleyerek tüm ödeme işlemlerini **WooCommerce** katmanına delege eder. `PaymentSettings`, bu entegrasyonun sağlık durumunu yöneten bir kontrol merkezidir.

---

## 🏗️ Mimari Strateji: Delegasyon

Rentiva çekirdeği (Core), doğrudan kredi kartı veya banka verisi işlemez. Bunun yerine:
1.  **Frontend:** Rezervasyon formu tamamlandığında bir WooCommerce siparişi oluşturulur.
2.  **PaymentSettings:** Bu sınıf, WooCommerce'in aktif olup olmadığını denetler ve yöneticiyi WC ayarlarında doğru yere yönlendirir.
3.  **Hukuksal Uyumluluk:** Ödeme verileri WC standartlarında saklanır, Rentiva sadece işlem ID'sini referans alır.

---

## 🛡️ Entegrasyon Durum Takibi

`render_payment_section_description()` metodu, sistemin ödeme alıp alamayacağını anlık olarak doğrular:

```php
// WooCommerce yüklü mü?
if ( class_exists( 'WooCommerce' ) ) {
    // WC Ayarlarına hızlı link ve Status Active badge
} else {
    // Yöneticiye WC kurması için kritik uyarı
}
```

---

## 🔗 Kayıt ve Settings API

`PaymentSettings`, Rentiva'nın merkezi ayar sayfasında (`SettingsCore::PAGE`) bir bölüm (Section) olarak kaydedilir.

-   **Section ID:** `mhm_rentiva_general_payment_section`
-   **Hook:** `admin_init` (Merkezi `SettingsManager` üzerinden).

---

## 📋 İlişkili Sınıflar

Ödeme ayarları sadece bu sınıfla sınırlı değildir; operasyonel ayarlar şu sınıflara dağıtılmıştır:

| Sınıf | Sorumluluk |
| :--- | :--- |
| `WooCommerceBridge` | Ürün ve Sipariş eşleştirmeleri. |
| `EmailSettings` | Ödeme sonrası onay maillerinin yapılandırılması. |
| `MaintenanceSettings` | Ödeme sayfalarındaki Rate Limit ve Güvenlik kuralları. |

## Bölüm Sonu Özeti
- Rentiva ödeme geçidi yönetmez; **WooCommerce**'i bir motor olarak kullanır.
- `PaymentSettings`, bu köprünün ayarlarını ve bağlantı durumunu görselleştirir.
- Geçit (Gateway) bazlı ayarlar (Iyzico, Stripe vb.) her zaman WC üzerinden yapılır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | Sayfa, WooCommerce delegasyon stratejisine göre baştan yazıldı. |

