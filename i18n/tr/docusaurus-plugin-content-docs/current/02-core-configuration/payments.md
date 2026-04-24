---
id: payments
title: Ödeme Yapılandırması
sidebar_label: Ödeme Ayarları
sidebar_position: 4
slug: /core-configuration/payments
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

MHM Rentiva, finansal işlemlerini dünyanın en popüler e-ticaret altyapısı olan **WooCommerce** üzerine inşa eder. Bu sayede yüzlerce ödeme ağ geçidini (Stripe, PayPal, iyzico vb.) ek bir geliştirme yapmadan kullanabilirsiniz.

---

## 💳 Ödeme Akış Senaryoları

Sistem, ödemeleri iki temel kanal üzerinden yönetir:

### 1. Frontend (Müşteri) Ödemeleri
Web siteniz üzerinden müşterilerin yaptığı tüm kiralama işlemleri **WooCommerce** sepeti üzerinden döner.
- **Süreç:** Müşteri aracı seçer > Tarih belirler > "Hemen Kirala" der > Ürün sepete eklenir > Ödeme sayfasında kart bilgileri girilir.
- **Kritik Not:** Müşteri ödemeyi tamamladığında WooCommerce siparişi "Processing" veya "Completed" olur; buna bağlı olarak Rentiva rezervasyonu da otomatik "Confirmed" olur.

### 2. Backend (Yönetici) ve Offline Ödemeler
Yönetim panelinden manuel oluşturulan rezervasyonlar için kullanılır.
- **Elden Tahsilat:** Aracı teslim ederken nakit ödeme alıyorsanız, rezervasyon detayından "Offline Payment" olarak işaretleyebilirsiniz.
- **Banka Havalesi:** WooCommerce üzerindeki "BACS" (Banka Havalesi) yöntemiyle entegre çalışır.

---

## 💰 Depozito Sistemi

MHM Rentiva, gelişmiş bir depozito (ön ödeme) mantığına sahiptir. 
- **Ayarlama:** Araç bazında veya genel ayarlarda "% X oranında depozito al" seçeneği aktiftir.
- **Çalışma Biçimi:** Araç toplam kirası 1000 TL ise ve %20 depozito aktifse, WooCommerce sepetine sadece 200 TL yansıtılır. Kalan 800 TL "Kalan Ödeme" (Due Balance) olarak dökümlerde görünür.

:::tip Geliştirici Notu
Depozito hesaplamaları için `DepositCalculator::calculate_deposit()` sınıfı kullanılır. Bu sınıf, ekstraları ve vergileri de hesaba katar.
:::

---

## 🛠️ Desteklenen Ödeme Yöntemleri

WooCommerce ile uyumlu tüm eklentiler Rentiva ile çalışır. En sık kullanılanlar:
- **Global:** Stripe, PayPal, Square.
- **Yerel (Türkiye):** iyzico, PayTR, Param.

---

### 🖼️ GÖRSEL: ÖDEME AYARLARI EKRANI
*(MHM Rentiva > Ayarlar > Ödeme sekmesindeki depozito ve diğer ayarları gösteren ekran)*

---

---

### Bölüm Özeti
- Frontend ödemeleri için **WooCommerce zorunludur**.
- **Depozito** özelliği ile ön ödeme alabilirsiniz.
- Manuel rezervasyonlar için **Offline** ödeme desteği mevcuttur.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 18.03.2026 | 4.21.2 | İçerik hibrit modele göre güncellendi. |
| 26.02.2026 | 4.21.0 | İlk sürüm oluşturuldu. |

