---
id: payment-settings
title: 💳 PaymentSettings Sınıf Mimarisi
sidebar_label: Ödeme Ayarları (Teknik)
description: PaymentSettings sınıfının teknik yapısı, WooCommerce entegrasyonu, yetki kontrolleri ve güvenlik protokolleri.
---

# PaymentSettings Sınıfı - Teknik Dokümantasyon

![Version](https://img.shields.io/badge/version-4.6.2-blue?style=flat-square) ![Security](https://img.shields.io/badge/security-WPCS%20Compliant-green?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-24.01.2026-orange?style=flat-square)

> **🎯 Amaç** - Bu belge, MHM Rentiva eklentisinin ödeme yapılandırmasını yöneten `PaymentSettings` sınıfının teknik mimarisini ve WooCommerce entegrasyon süreçlerini detaylandırır.

---

## 📋 İçindekiler

- [Genel Bakış](#-genel-bakis)
- [Sınıf Yapısı ve Sabitler](#-sinif-yapisi-ve-sabitler)
- [Metotlar](#-metotlar)
- [WordPress ve WooCommerce Entegrasyonu](#-wordpress-ve-woocommerce-entegrasyonu)
- [Güvenlik ve Yetkilendirme](#-guvenlik-ve-yetkilendirme)
- [Sık Sorulan Sorular](#-sik-sorulan-sorular)
- [Değişiklik Günlüğü](#-degisiklik-gunlugu)

---

## 🏗️ Genel Bakış

`PaymentSettings` sınıfı, ödeme işlemlerinin yapılandırılmasından ve sistemin **WooCommerce** ile olan bağından sorumlu `final` bir sınıftır. Sınıfın temel felsefesi "Delegasyon"dur; yani ödeme işlemlerini doğrudan yapmak yerine, bu süreci güvenli bir şekilde WooCommerce'e delege eder.

**Temel Fonksiyonlar:**
- ✅ WooCommerce aktiflik kontrolü ve yönlendirme.
- ✅ WordPress Settings API entegrasyonu.
- ✅ Dinamik hata/bilgilendirme mesajları (Notices).
- ✅ Yetki bazlı eklenti kurulum önerileri.

:::info Önemli Bilgi
Bu sınıf PCI DSS uyumluluğu ve güvenlik nedeniyle ödeme verilerini doğrudan işlemez.
:::

---

## 📌 Sınıf Yapısı ve Sabitler

| Sabit | Değer | Açıklama |
| :--- | :--- | :--- |
| `SECTION_GENERAL` | `mhm_rentiva_general_payment_section` | Settings API için benzersiz bölüm kimliği. |

---

## ⚙️ Metotlar

### 1. `register()`
Ödeme ayarları bölümünü WordPress'e kaydeder. `SettingsCore::PAGE` üzerinden merkezi ayar sayfasına bağlanır.

```php
public static function register(): void
```

### 2. `render_payment_section_description()`
Bu metot sınıfın kalbidir. WooCommerce durumunu kontrol eder ve kullanıcıya şu üç durumdan birini gösterir:
1.  **Aktif:** WooCommerce ayarlarına yönlendirme butonu.
2.  **Yüklü Değil/Deaktif:** Kurulum/Aktivasyon önerisi ve butonu.
3.  **Yetkisiz:** Kullanıcı admin değilse sadece metinsel uyarı.

### 3. `get_default_settings()`
Statik olarak boş bir dizi döndürür. Bu sınıf veri saklamak yerine bir "proxy/yönlendirici" görevi gördüğü için varsayılan bir ayar dizisi içermez.

---

## ⚓ WordPress ve WooCommerce Entegrasyonu

### Settings API Entegrasyonu
Sınıf, `add_settings_section` fonksiyonu aracılığıyla MHMRentiva'nın ana ayar sayfasına (`mhm-rentiva-settings`) enjekte edilir.

### WooCommerce Yönlendirmesi
WooCommerce aktif olduğunda, kullanıcıyı doğrudan ödeme yöntemleri sekmesine yönlendirir:
`admin.php?page=wc-settings&tab=checkout`

---

## 🔒 Güvenlik ve Yetkilendirme

### Yetki Kontrolü
WooCommerce kurulum butonu (`Install WooCommerce`), WordPress'in `install_plugins` yetkisini (capability) kontrol eder. Bu sayede düşük yetkili kullanıcıların sisteme müdahale etmesi engellenir.

### URL Güvenliği
Tüm dinamik oluşturulan linkler `esc_url()` fonksiyonundan geçirilerek XSS saldırılarına karşı korunur.

### Çıktı Güvenliği (Late Escaping)
Render edilen tüm bildirimler ve butonlar `wp_kses_post()` veya `esc_html()` ile son aşamada temizlenir.

---

## ❓ Sık Sorulan Sorular

**S: Neden ödeme ayarları bu sınıfta saklanmıyor?**
C: Güvenlik için. Ödeme altyapısı karmaşık ve hassas bir süreçtir. WooCommerce bu konuda global bir standart sunduğu için biz sadece entegrasyonu yönetiyoruz.

**S: WooCommerce olmadan eklenti çalışır mı?**
C: Admin panelinden manuel rezervasyonlar için çalışır, ancak frontend tarafında (müşteri tarafı) online ödeme almak için WooCommerce zorunludur.

---

## 🔄 Değişiklik Günlüğü

| Tarih | Değişiklik | Sürüm |
| :--- | :--- | :--- |
| 24.01.2026 | Docusaurus teknik standartlarına göre revize edildi. | 4.6.2 |
| 22.01.2026 | WooCommerce entegrasyon butonları modernize edildi. | 4.5.0 |
| 15.01.2026 | İlk sürüm yayınlandı. | 4.0.0 |
