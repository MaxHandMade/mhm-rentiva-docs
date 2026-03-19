---
id: common-issues
title: Yaygın Sorunlar ve Çözümleri
sidebar_label: Yaygın Sorunlar
sidebar_position: 10
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, MHM Rentiva kullanıcılarının ve yöneticilerinin karşılaşabileceği en yaygın teknik/operasyonel sorunları ve bunların hızlı çözüm yollarını içerir.
:::

# 🛠️ Yaygın Sorunlar ve Çözümleri

Aşağıdaki başlıklar, destek taleplerinde en sık karşılaşılan senaryolara göre düzenlenmiştir.

---

## 📅 1. Rezervasyon ve Takvim Sorunları

### Rezervasyon kaydı oluşuyor ama takvimde görünmüyor?
- **Neden:** Rezervasyon statüsü `pending` (beklemede) olabilir. Takvim sadece `confirmed` veya `completed` statüsündeki kayıtları gösterir.
- **Çözüm:** Rezervasyon listesinden statüyü kontrol edin ve onaylayın.

### "Selected dates are not available" hatası alıyorum?
- **Neden:** İlgili günlerde başka bir onaylı rezervasyon var veya araç "Bakım" modunda.
- **Çözüm:** `Vehicle Settings > Availability` sekmesinden özel kısıtlamaları veya `Util::has_overlap()` çakışmalarını kontrol edin.

---

## 💳 2. Ödeme ve WooCommerce Entegrasyonu

### Ödeme başarılı ancak rezervasyon statüsü değişmiyor?
- **Neden:** WooCommerce Webhook veya IPN (Instant Payment Notification) sinyali Rentiva'ya ulaşmıyor.
- **Çözüm:** 
    1. WooCommerce > Durum > Günlükler sekmesinden hata kayıtlarını inceleyin.
    2. Manuel tetikleme için `Order > Actions > Re-send Payment Notification` seçeneğini kullanın.
    3. `WooCommerceBridge` sınıfının statü eşleşmelerini doğrulayın.

### Ödeme sayfasında "No payment methods available" hatası?
- **Neden:** Araç için tanımlanan para birimi ile ödeme yönteminin kabul ettiği para birimi uyuşmuyor.
- **Çözüm:** `CurrencyHelper` ayarlarını ve WooCommerce ödeme yöntemi kısıtlamalarını kontrol edin.

---

## 👤 3. Tedarikçi (Vendor) Sorunları

### Tedarikçi paneline erişilemiyor (403 Hatası)?
- **Neden:** Kullanıcıya `rentiva_vendor` rolü atanmamış veya hesap "Askıya Alındı" durumunda.
- **Çözüm:** Kullanıcı profilinden hesabı aktife alın ve rolü doğrulayın.

### Tedarikçi bakiyesi 0 görünüyor?
- **Neden:** Rezervasyon henüz `completed` (tamamlandı) statüsüne geçmemiş veya Ledger (defter) kaydı henüz "cleared" olmamış.
- **Çözüm:** `Payouts & Ledger` dökümantasyonundaki "Hak Ediş Döngüsü" bölümünü inceleyin.

---

## ⚡ 4. Performans ve Arayüz Sorunları

### Değişiklikler frontend tarafında yansımıyor?
- **Neden:** Agresif bir sayfa önbellekleme (WP Rocket, Litespeed vb.) veya tarayıcı önbelleği.
- **Çözüm:** 
    1. Rentiva ayarlarından "Cache Flush" yapın.
    2. Kısa kodlarda `cache="false"` parametresini kullanmayı deneyin.

### Harita veya Konum servisleri çalışmıyor?
- **Neden:** Geçersiz Google Maps API anahtarı veya kısıtlanmış HTTP referer.
- **Çözüm:** Rentiva > Ayarlar > API sekmesinden anahtarı test edin.

---

## 📝 Denetim Listesi (Troubleshooting Checklist)
Sorun devam ederse şu adımları izleyin:
1. `WP_DEBUG` modunu açın.
2. `AdvancedLogger` kayıtlarını (Sistem Günlükleri) inceleyin.
3. Eklenti çakışması testi için diğer eklentileri geçici olarak devre dışı bırakın.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | Rezervasyon, ödeme ve tedarikçi bazlı detaylı sorun giderme maddeleri eklendi. |
