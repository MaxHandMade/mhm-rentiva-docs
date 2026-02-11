---
id: technical-architecture
title: 🏗️ Modül Mimarisi ve Teknik Harita
sidebar_label: Modül Mimarisi
description: MHM Rentiva v4.6.2 Teknik Modül Yapısı ve Güvenlik Durumu
---

![Version](https://img.shields.io/badge/version-4.6.2-blue?style=flat-square) ![Security](https://img.shields.io/badge/security-WPCS%20Compliant-green?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-22.01.2026-orange?style=flat-square)

# MHM Rentiva - Modül Mimarisi ve Teknik Dokümantasyon

![Version](https://img.shields.io/badge/version-4.6.2-blue.svg)
![Modules](https://img.shields.io/badge/modules-22-green.svg)
![Security](https://img.shields.io/badge/security-WPCS%20Compliant-brightgreen.svg)
![Last Audit](https://img.shields.io/badge/last%20audit-2026--01--21-blue.svg)

> **Teknik Anayasa** - Bu belge, MHM Rentiva eklentisinin mimari referansı olup, 22 modülün tümünü, sorumluluklarını, ilişkilerini ve güvenlik durumlarını detaylandırır.

---

## 📋 İçindekiler

- [Mimari Genel Bakış](#mimari-genel-bakis)
- [Modül Kategorileri](#modul-kategorileri)
- [İş Mantığı Modülleri](#-is-mantigi-modulleri)
- [Kullanıcı Operasyonları Modülleri](#-kullanici-operasyonlari-modulleri)
- [Sistem Altyapısı Modülleri](#-sistem-altyapisi-modulleri)
- [Güvenlik ve API Modülleri](#-guvenlik-ve-api-modulleri)
- [Modül İlişkileri Grafiği](#modul-iliskileri-grafigi)
- [Güvenlik Denetim Özeti](#guvenlik-denetim-ozeti)

---

## 🏗️ Mimari Genel Bakış

MHM Rentiva, sorumlulukların net bir şekilde ayrıldığı **modüler monolit** mimarisini takip eder:

```
┌─────────────────────────────────────────────────────────────────┐
│                        WORDPRESS CORE                           │
├─────────────────────────────────────────────────────────────────┤
│                     MHM RENTIVA PLUGIN                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   BUSINESS LOGIC (İŞ MANTIĞI)            │   │
│  │   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │   │
│  │   │ Booking │ │ Vehicle │ │Transfer │ │ Payment │       │   │
│  │   └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘       │   │
│  │        │           │           │           │             │   │
│  │        └───────────┴─────┬─────┴───────────┘             │   │
│  │                          │                                │   │
│  │  ┌───────────────────────┴───────────────────────┐       │   │
│  │  │              CORE INFRASTRUCTURE              │       │   │
│  │  │  Settings │ Emails │ Reports │ Utilities     │       │   │
│  │  └───────────────────────────────────────────────┘       │   │
│  │                          │                                │   │
│  │  ┌───────────────────────┴───────────────────────┐       │   │
│  │  │              USER OPERATIONS                  │       │   │
│  │  │  Customers │ Messages │ Frontend │ Account   │       │   │
│  │  └───────────────────────────────────────────────┘       │   │
│  │                          │                                │   │
│  │  ┌───────────────────────┴───────────────────────┐       │   │
│  │  │              SECURITY & API                   │       │   │
│  │  │   Auth │ Privacy │ Licensing │ REST │ Addons │       │   │
│  │  └───────────────────────────────────────────────┘       │   │
│  └─────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                    WOOCOMMERCE (Opsiyonel)                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📂 Modül Kategorileri

| Kategori | Modül Sayısı | Açıklama |
|----------|--------------|----------|
| **İş Mantığı** | 4 | Temel kiralama operasyonları (Booking, Vehicle, Transfer, Payment) |
| **Kullanıcı Operasyonları** | 4 | Müşteri odaklı özellikler (Customers, Messages, Frontend, Account) |
| **Sistem Altyapısı** | 8 | Arka uç servisleri (Settings, Emails, Reports, Utilities, Core, Setup, PostTypes, About) |
| **Güvenlik ve API** | 6 | Güvenlik ve entegrasyon (Auth, Privacy, Licensing, REST, Addons, Testing) |

---

## 💼 İş Mantığı Modülleri

### 📦 Booking (Rezervasyon)
* **Dizin:** `src/Admin/Booking/`
* **Tip:** Çekirdek İş Mantığı
* **Açıklama:** Oluşturulmasından tamamlanmasına kadar; müsaitlik kontrolleri, fiyat hesaplamaları ve durum yönetimi dahil tüm rezervasyon yaşam döngüsünü yönetir.
* **Kritik Dosyalar:**
  - `Core/Handler.php` - Ana rezervasyon formu işleyicisi
  - `Core/BookingManager.php` - Rezervasyon CRUD işlemleri
  - `Actions/DepositManagementAjax.php` - Depozito ödeme yönetimi
  - `Meta/BookingMeta.php` - Rezervasyon meta veri yönetimi
* **Güvenlik Durumu:** ✅ Doğrulandı (v4.6.2 - WPCS & Nonce Hardened)
* **Nonce Yamaları:** 21 konum
* **İlişkiler:** Vehicle, Payment, Customers, WooCommerce, Emails

---

### 📦 Vehicle (Araç)
* **Dizin:** `src/Admin/Vehicle/`
* **Tip:** Çekirdek İş Mantığı
* **Açıklama:** Galeriler, teknik özellikler, müsaitlik kuralları ve fiyatlandırma katmanları dahil tam araç envanter yönetimi.
* **Kritik Dosyalar:**
  - `Meta/VehicleMeta.php` - Araç meta veri işleyicisi
  - `Meta/VehicleGallery.php` - Görsel galerisi yönetimi
  - `Settings/VehicleSettings.php` - Araç yapılandırması
  - `ListTable/VehicleColumns.php` - Admin listesi özelleştirme
* **Güvenlik Durumu:** ✅ Doğrulandı (v4.6.2 - WPCS & Nonce Hardened)
* **Nonce Yamaları:** 12 konum
* **İlişkiler:** Booking, Frontend, PostTypes

---

### 📦 Transfer (VIP)
* **Dizin:** `src/Admin/Transfer/`
* **Tip:** Çekirdek İş Mantığı
* **Açıklama:** Konum/rota yönetimi, mesafe bazlı fiyatlandırma ve araç seçimi ile noktadan noktaya şoförlü transfer hizmeti.
* **Kritik Dosyalar:**
  - `Frontend/TransferShortcodes.php` - Arama formu ve sonuçlar
  - `Integration/TransferCartIntegration.php` - WooCommerce sepet köprüsü
  - `TransferSearchEngine.php` - Rota ve araç eşleştirme
  - `TransferAdmin.php` - Admin paneli yönetimi
* **Güvenlik Durumu:** ✅ Doğrulandı (v4.6.2 - WPCS & Nonce Hardened)
* **Nonce Yamaları:** 7 konum
* **İlişkiler:** WooCommerce, Vehicle, Payment, Frontend

---

### 📦 Payment (Ödeme)
* **Dizin:** `src/Admin/Payment/`
* **Tip:** Çekirdek İş Mantığı
* **Açıklama:** WooCommerce entegrasyonu, depozito sistemi, iadeler ve çoklu ödeme ağ geçidi desteği ile ödeme işlemleri.
* **Kritik Dosyalar:**
  - `WooCommerce/WooCommerceBridge.php` - WooCommerce entegrasyonu
  - `Refunds/Service.php` - İade işlemleri
  - `DepositCalculator.php` - Depozito tutarı hesaplama
  - `PaymentGatewayManager.php` - Ağ geçidi yönetimi
* **Güvenlik Durumu:** ✅ Doğrulandı (v4.6.2 - WPCS & Nonce Hardened)
* **Nonce Yamaları:** 2 konum
* **İlişkiler:** Booking, Transfer, WooCommerce, Emails

---

## 👥 Kullanıcı Operasyonları Modülleri

### 📦 Customers (Müşteriler)
* **Dizin:** `src/Admin/Customers/`
* **Tip:** Kullanıcı Operasyonları
* **Açıklama:** Profil yönetimi, rezervasyon geçmişi ve yönetim araçları ile müşteri yönetim sistemi.
* **Kritik Dosyalar:**
  - `CustomersPage.php` - Admin müşteri listesi
  - `AddCustomerPage.php` - Müşteri oluşturma formu
  - `CustomerProfile.php` - Profil yönetimi
* **Güvenlik Durumu:** ✅ Doğrulandı (v4.6.2 - WPCS & Nonce Hardened)
* **Nonce Yamaları:** 3 konum
* **İlişkiler:** Booking, Messages, Frontend

---

### 📦 Messages (Mesajlar)
* **Dizin:** `src/Admin/Messages/`
* **Tip:** Kullanıcı Operasyonları
* **Açıklama:** Konu takibi (thread) ve bildirimlerle müşteriler ve yöneticiler arası dahili mesajlaşma sistemi.
* **Kritik Dosyalar:**
  - `Core/Messages.php` - Çekirdek mesajlaşma mantığı
  - `Core/MessageUrlHelper.php` - URL oluşturma
  - `Monitoring/MessageLogger.php` - Mesaj denetim logları
* **Güvenlik Durumu:** ✅ Doğrulandı (v4.6.2 - WPCS & Nonce Hardened)
* **Nonce Yamaları:** 2 konum
* **İlişkiler:** Customers, Emails, Frontend

---

### 📦 Frontend (Ön Yüz)
* **Dizin:** `src/Admin/Frontend/`
* **Tip:** Kullanıcı Operasyonları
* **Açıklama:** Shortcode'lar, hesap sayfaları, bloklar ve müşteri portalı dahil tüm ön yüz bileşenleri.
* **Kritik Dosyalar:**
  - `Shortcodes/BookingForm.php` - Rezervasyon formu shortcode'u
  - `Shortcodes/VehiclesList.php` - Araç listesi ve puanlama
  - `Shortcodes/VehicleRatingForm.php` - Müşteri puanlama sistemi
  - `Account/AccountController.php` - Hesabım sayfası kontrolcüsü
* **Güvenlik Durumu:** ✅ Doğrulandı (v4.6.2 - WPCS & Nonce Hardened)
* **Nonce Yamaları:** 18 konum
* **İlişkiler:** Booking, Vehicle, Customers, Messages, WooCommerce

* **Not:** Vertical search blokları artık `.rv-search-block-wrapper` üzerinde yer alan 
  görsel kabukla (gradyan, gölge, radius) birlikte render edilmelidir; iç form 
  sadece düzen akışı sağlar ve `overflow:hidden` ile taşmayı engeller. 
  48px input yüksekliği ile 10px border radius token değerleri (`var(--mhm-radius-xl)`, `var(--mhm-space-4)`) wrapper 
  üzerinden uygulanmalı, form elementi yalnızca `gap` ve `width:100%` ayarlarıyla çocukları hizalamalıdır.
  Tüm yeni arama blokları bu kabuğu temel görsel katman olarak kullanmalı (bkz. `assets/css/frontend/vehicle-search.css`). 

---

### 📦 Account (Hesap)
* **Dizin:** `src/Admin/Frontend/Account/`
* **Tip:** Kullanıcı Operasyonları
* **Açıklama:** Rezervasyon yönetimi, favoriler, profil düzenleme ve belge yükleme ile müşteri self-servis portalı.
* **Kritik Dosyalar:**
  - `AccountController.php` - Ana hesap koordinatörü
  - `Tabs/BookingsTab.php` - Rezervasyon geçmişi görünümü
  - `Tabs/FavoritesTab.php` - Favori araçlar
  - `Tabs/ProfileTab.php` - Profil düzenleme
* **Güvenlik Durumu:** ✅ Doğrulandı (v4.6.2 - WPCS & Nonce Hardened)
* **İlişkiler:** Frontend, Customers, Booking, Messages

---

## ⚙️ Sistem Altyapısı Modülleri

### 📦 Settings (Ayarlar)
* **Dizin:** `src/Admin/Settings/`
* **Tip:** Sistem Altyapısı
* **Açıklama:** Gruplandırılmış ayarlar, sanitizasyon ve validasyon ile merkezi yapılandırma yönetimi.
* **Kritik Dosyalar:**
  - `Core/SettingsCore.php` - Çekirdek ayarlar API
  - `SettingsHandler.php` - Ayarlar kaydetme/sıfırlama işleyicisi
  - `Groups/*.php` - Gruplandırılmış ayar tanımları
* **Güvenlik Durumu:** ✅ Doğrulandı (v4.6.2 - WPCS & Nonce Hardened)
* **Nonce Yamaları:** 4 konum
* **İlişkiler:** Tüm modüller (merkezi konfigürasyon)

---

### 📦 Emails (E-postalar)
* **Dizin:** `src/Admin/Emails/`
* **Tip:** Sistem Altyapısı
* **Açıklama:** Özelleştirilebilir HTML şablonları ve tetiklenen gönderimler ile otomatik e-posta bildirim sistemi.
* **Kritik Dosyalar:**
  - `Core/EmailTemplates.php` - Şablon yönetimi
  - `Sender/EmailSender.php` - E-posta gönderimi
  - `Templates/*.php` - Bireysel e-posta şablonları
* **Güvenlik Durumu:** ✅ Doğrulandı (v4.6.2 - WPCS & Nonce Hardened)
* **Nonce Yamaları:** 1 konum
* **İlişkiler:** Booking, Customers, Messages, Settings

---

### 📦 Reports (Raporlar)
* **Dizin:** `src/Admin/Reports/`
* **Tip:** Sistem Altyapısı
* **Açıklama:** Gelir, müşteri ve araç analizleri ile kapsamlı analiz panosu.
* **Kritik Dosyalar:**
  - `Reports.php` - Ana rapor koordinatörü
  - `BusinessLogic/RevenueReport.php` - Gelir analizleri
  - `BusinessLogic/BookingReport.php` - Rezervasyon istatistikleri
  - `Charts.php` - Chart.js entegrasyonu
* **Güvenlik Durumu:** ✅ Doğrulandı (v4.6.2 - WPCS & Nonce Hardened)
* **Nonce Yamaları:** 0 (form gönderimi yok)
* **İlişkiler:** Booking, Vehicle, Payment, Settings

---

### 📦 Utilities (Araçlar)
* **Dizin:** `src/Admin/Utilities/`
* **Tip:** Sistem Altyapısı
* **Açıklama:** Dışa aktarma, veritabanı temizliği, cron izleme ve kaldırma işleyicileri dahil sistem bakım araçları.
* **Kritik Dosyalar:**
  - `Export/Export.php` - Veri dışa aktarma işlevi
  - `Actions/Actions.php` - Yardımcı eylemler (log temizleme vb.)
  - `Database/DatabaseCleanupPage.php` - Veritabanı bakımı
  - `Cron/CronMonitorPage.php` - Zamanlanmış görev izleme
* **Güvenlik Durumu:** ✅ Doğrulandı (v4.6.2 - WPCS & Nonce Hardened)
* **Nonce Yamaları:** 4 konum
* **İlişkiler:** Tüm modüller (bakım operasyonları)

---

### 📦 Core (Çekirdek)
* **Dizin:** `src/Admin/Core/`
* **Tip:** Sistem Altyapısı
* **Açıklama:** Soyut sınıflar, trait'ler, yardımcılar ve temel araçlar dahil paylaşılan altyapı bileşenleri.
* **Kritik Dosyalar:**
  - `Utilities/AbstractListTable.php` - Temel liste tablosu sınıfı
  - `Traits/AdminHelperTrait.php` - Ortak admin yardımcıları
  - `MetaBoxes/AbstractMetaBox.php` - Temel meta kutusu sınıfı
  - `Helpers/Sanitizer.php` - Merkezi sanitizasyon araçları
* **Güvenlik Durumu:** ✅ Doğrulandı (v4.6.2 - WPCS & Nonce Hardened)
* **Nonce Yamaları:** 3 konum
* **İlişkiler:** Tüm modüller (temel altyapı)

---

### 📦 Setup (Kurulum)
* **Dizin:** `src/Admin/Setup/`
* **Tip:** Sistem Altyapısı
* **Açıklama:** Eklenti kurulum sihirbazı ve ilk yapılandırma rehberliği.
* **Kritik Dosyalar:**
  - `SetupWizard.php` - Adım adım kurulum
* **Güvenlik Durumu:** ✅ Doğrulandı (v4.6.2 - Nonce işlemi yok)
* **Nonce Yamaları:** 0
* **İlişkiler:** Settings, PostTypes

---

### 📦 PostTypes (Yazı Tipleri)
* **Dizin:** `src/Admin/PostTypes/`
* **Tip:** Sistem Altyapısı
* **Açıklama:** Araçlar ve rezervasyonlar için custom post type ve taksonomi kaydı.
* **Kritik Dosyalar:**
  - `VehiclePostType.php` - Araç CPT
  - `BookingPostType.php` - Rezervasyon CPT
  - `Taxonomies.php` - Özel taksonomiler
* **Güvenlik Durumu:** ✅ Doğrulandı (v4.6.2 - Nonce işlemi yok)
* **Nonce Yamaları:** 0
* **İlişkiler:** Vehicle, Booking

---

### 📦 About (Hakkında)
* **Dizin:** `src/Admin/About/`
* **Tip:** Sistem Altyapısı
* **Açıklama:** Sistem teşhisi, özellik özeti ve destek kaynakları ile eklenti bilgi sayfası.
* **Kritik Dosyalar:**
  - `About.php` - Ana hakkında sayfası
  - `SystemInfo.php` - Sistem teşhisi
  - `Tabs/*.php` - Bilgi sekmeleri
* **Güvenlik Durumu:** ✅ Doğrulandı (v4.6.2 - WPCS & Nonce Hardened)
* **Nonce Yamaları:** 1 konum
* **İlişkiler:** Settings, Licensing

---

## 🔒 Güvenlik ve API Modülleri

### 📦 Auth (Kimlik Doğrulama)
* **Dizin:** `src/Admin/Auth/`
* **Tip:** Güvenlik ve API
* **Açıklama:** Gelişmiş hesap güvenliği için İki Faktörlü Kimlik Doğrulama (2FA) sistemi.
* **Kritik Dosyalar:**
  - `TwoFactorManager.php` - 2FA uygulaması (TOTP)
* **Güvenlik Durumu:** ✅ Doğrulandı (v4.6.2 - WPCS & Nonce Hardened)
* **Nonce Yamaları:** 3 konum
* **İlişkiler:** Customers, Frontend, Settings

---

### 📦 Privacy (Gizlilik)
* **Dizin:** `src/Admin/Privacy/`
* **Tip:** Güvenlik ve API
* **Açıklama:** Veri dışa aktarma, silme ve rıza yönetimi dahil GDPR uyumluluk özellikleri.
* **Kritik Dosyalar:**
  - `GDPRManager.php` - GDPR işlem yöneticisi
* **Güvenlik Durumu:** ✅ Doğrulandı (v4.6.2 - WPCS & Nonce Hardened)
* **Nonce Yamaları:** 3 konum
* **İlişkiler:** Customers, Settings, Booking

---

### 📦 Licensing (Lisanslama)
* **Dizin:** `src/Admin/Licensing/`
* **Tip:** Güvenlik ve API
* **Açıklama:** Pro özellik aktivasyonu ve doğrulaması için lisans anahtarı yönetimi.
* **Kritik Dosyalar:**
  - `LicenseManager.php` - Lisans API entegrasyonu
  - `LicenseAdmin.php` - Admin lisans sayfası
  - `Mode.php` - Pro/Lite mod tespiti
* **Güvenlik Durumu:** ✅ Doğrulandı (v4.6.2 - WPCS & Nonce Hardened)
* **Nonce Yamaları:** 3 konum
* **İlişkiler:** Settings, About, Tüm Pro özellikler

---

### 📦 REST (API)
* **Dizin:** `src/Admin/REST/`
* **Tip:** Güvenlik ve API
* **Açıklama:** Üçüncü taraf entegrasyonlar ve mobil uygulamalar için tam kapsamlı REST API.
* **Kritik Dosyalar:**
  - `VehicleEndpoint.php` - Araç API
  - `BookingEndpoint.php` - Rezervasyon API
  - `AuthEndpoint.php` - Kimlik Doğrulama API
* **Güvenlik Durumu:** ✅ Doğrulandı (v4.6.2 - WordPress REST nonce sistemini kullanır)
* **Nonce Yamaları:** 0 (WordPress REST kimlik doğrulamayı yönetir)
* **İlişkiler:** Tüm herkese açık modüller

---

### 📦 Addons (Eklentiler)
* **Dizin:** `src/Admin/Addons/`
* **Tip:** Güvenlik ve API
* **Açıklama:** Fiyatlandırma ve entegrasyon ile rezervasyon eklentileri/ekstraları yönetimi.
* **Kritik Dosyalar:**
  - `AddonManager.php` - Eklenti CRUD ve fiyatlandırma
* **Güvenlik Durumu:** ✅ Doğrulandı (v4.6.2 - WPCS & Nonce Hardened)
* **Nonce Yamaları:** 2 konum
* **İlişkiler:** Booking, Payment, Vehicle

---

### 📦 Testing (Test)
* **Dizin:** `src/Admin/Testing/`
* **Tip:** Güvenlik ve API
* **Açıklama:** Shortcode testi ve güvenlik doğrulaması için geliştirme ve QA araçları.
* **Kritik Dosyalar:**
  - `ShortcodeTestHandler.php` - Shortcode testi
  - `SecurityTest.php` - Güvenlik denetim araçları
* **Güvenlik Durumu:** ✅ Doğrulandı (v4.6.2 - WPCS & Nonce Hardened)
* **Nonce Yamaları:** 1 konum
* **İlişkiler:** Frontend, Tüm shortcode modülleri

---

### 📦 Actions (Eylemler)
* **Dizin:** `src/Admin/Actions/`
* **Tip:** Güvenlik ve API
* **Açıklama:** İadeler, log yönetimi ve sayfa oluşturma dahil global admin eylemleri.
* **Kritik Dosyalar:**
  - `Actions.php` - Global eylem işleyicileri
* **Güvenlik Durumu:** ✅ Doğrulandı (v4.6.2 - WPCS & Nonce Hardened)
* **Nonce Yamaları:** 1 konum
* **İlişkiler:** Booking, Payment, Settings, Utilities

---

## 🔗 Modül İlişkileri Grafiği

```
                              ┌──────────────┐
                              │   SETTINGS   │
                              └──────┬───────┘
                                     │ (yapılandırır)
         ┌───────────────────────────┼───────────────────────────┐
         │                           │                           │
    ┌────┴────┐                ┌─────┴─────┐              ┌──────┴─────┐
    │ VEHICLE │◄───────────────│  BOOKING  │──────────────►│  PAYMENT  │
    └────┬────┘                └─────┬─────┘              └──────┬─────┘
         │                           │                           │
         │    ┌──────────────────────┼──────────────────────┐   │
         │    │                      │                      │   │
         ▼    ▼                      ▼                      ▼   ▼
    ┌─────────────┐            ┌───────────┐         ┌───────────────┐
    │  FRONTEND   │◄───────────│ CUSTOMERS │────────►│  WOOCOMMERCE  │
    │ (Shortcodes)│            └─────┬─────┘         └───────────────┘
    └──────┬──────┘                  │
           │                         │
           ▼                         ▼
    ┌─────────────┐            ┌───────────┐
    │  TRANSFER   │            │ MESSAGES  │
    │   (VIP)     │            └─────┬─────┘
    └──────┬──────┘                  │
           │                         ▼
           └────────────────────►┌───────────┐
                                 │  EMAILS   │
                                 └───────────┘
```

---

## 🛡️ Güvenlik Denetim Özeti

### v4.6.2 Güvenlik Yamaları (21.01.2026)

| Metrik | Değer |
|--------|-------|
| **Denetlenen Toplam Modül** | 22 |
| **Düzenlenen Toplam Dosya** | 59+ |
| **Nonce Güçlendirme Yaması** | 91 |
| **WPCS Uyumluluğu** | %100 |
| **Kritik Açıklar** | 0 |

### Uygulanan Güvenlik Standartları

1. **Nonce Doğrulama**: Tüm `wp_verify_nonce()` çağrıları `sanitize_text_field(wp_unslash())` ile sarmalandı
2. **Girdi Sanitizasyonu**: `Sanitizer::text_field_safe()` yardımcısının tutarlı kullanımı
3. **SQL Enfeksiyonu Önleme**: Tüm sorgular prepared statement kullanır
4. **XSS Önleme**: Tüm çıktılar `esc_html()`, `esc_attr()`, `wp_kses_post()` ile düzgün şekilde kaçış karakterlerine alındı
5. **CSRF Koruması**: Tüm formlar ve AJAX işleyiciler nonce ile korunmaktadır

### Modül Güvenlik Matrisi

| Modül | Nonce | Sanitize | Escape | Prepared SQL |
|-------|:-----:|:--------:|:------:|:------------:|
| Booking | ✅ | ✅ | ✅ | ✅ |
| Vehicle | ✅ | ✅ | ✅ | ✅ |
| Transfer | ✅ | ✅ | ✅ | ✅ |
| Payment | ✅ | ✅ | ✅ | ✅ |
| Customers | ✅ | ✅ | ✅ | ✅ |
| Messages | ✅ | ✅ | ✅ | ✅ |
| Frontend | ✅ | ✅ | ✅ | ✅ |
| Settings | ✅ | ✅ | ✅ | ✅ |
| Emails | ✅ | ✅ | ✅ | ✅ |
| Reports | ✅ | ✅ | ✅ | ✅ |
| Utilities | ✅ | ✅ | ✅ | ✅ |
| Core | ✅ | ✅ | ✅ | ✅ |
| Auth | ✅ | ✅ | ✅ | ✅ |
| Privacy | ✅ | ✅ | ✅ | ✅ |
| Licensing | ✅ | ✅ | ✅ | ✅ |
| REST | ✅ | ✅ | ✅ | ✅ |
| Addons | ✅ | ✅ | ✅ | ✅ |
| Testing | ✅ | ✅ | ✅ | ✅ |
| Actions | ✅ | ✅ | ✅ | ✅ |
| About | ✅ | ✅ | ✅ | ✅ |
| Setup | N/A | ✅ | ✅ | N/A |
| PostTypes | N/A | ✅ | ✅ | N/A |

---

## 📝 Belge Künyesi

| Özellik | Değer |
|---------|-------|
| **Belge Sürümü** | 1.0.0 |
| **Eklenti Sürümü** | 4.6.2 |
| **Son Güncelleme** | 21.01.2026 |
| **Yazar** | MHM Development Team |
| **Lisans** | GPL-2.0+ |
