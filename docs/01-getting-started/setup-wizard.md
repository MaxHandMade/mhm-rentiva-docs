---
id: setup-wizard
title: Kurulum Sihirbazı
sidebar_label: Kurulum Sihirbazı
slug: /getting-started/setup-wizard
---

![Version](https://img.shields.io/badge/version-4.6.2-blue?style=flat-square) ![Security](https://img.shields.io/badge/security-WPCS%20Compliant-green?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-22.01.2026-orange?style=flat-square)

# Kurulum Sihirbazı (Setup Wizard)

Rentiva’yı aktif eder etmez karşınıza çıkan Setup Wizard, eklentiyi birkaç dakikada çalışır hâle getirmeniz için tasarlandı. Sistem gereksinimlerinden zorunlu sayfalara, e-posta ayarlarından ön yüzde gözükecek varsayılanlara kadar tüm kritik noktaları tek akışta tamamlamanıza yardım eder.

## Nasıl Açılır?

- **İlk aktivasyonda otomatik:** Eklentiyi etkinleştirdiğinizde yönetici paneli `MHM Rentiva > Setup Wizard` ekranına yönlendirilir.  
- **Daha sonra tekrar:** Menüde `MHM Rentiva > Setup Wizard` bağlantısı her zaman erişilebilir. Sayfanın üst kısmındaki “Skip wizard and configure later” butonuyla sihirbazı kapatsanız bile menüden yeniden açabilirsiniz.

> Her adım bilgileri kaydeder. Tarayıcıyı kapatsanız bile kaldığınız yerden devam edebilirsiniz.

## Adım Adım Akış

### 1. System Check
**Amaç:** Sunucu ortamının MHM Rentiva için uygunluğunu doğrulamak.

**Kontroller:**
- **WooCommerce:** Eklenti kurulu mu? (Gerekli)
- **PHP Sürümü:** 7.4+ (Gerekli)
- **WordPress Sürümü:** 6.0+ (Gerekli)
- **Veritabanı:** MySQL 5.7+ / MariaDB 10.3+ (Gerekli)
- **Bellek Limiti:** 256 MB+ (Önerilen)
- **HTTPS/SSL:** SSL sertifikası (Önerilen)
- **WP-Cron:** Aktif mi? (Zamanlı görevler için gerekli)
- **Email Delivery:** SMTP eklentisi algılandı mı? (Önerilen)

**Önemli Notlar:**
- WooCommerce yoksa sistem "fail" durumuna düşer ve devam edilemez
- Bellek limiti 128 MB altındaysa "warning" gösterilir
- SMTP eklentisi yoksa e-posta adımında özel uyarı gösterilir

### 2. License
**Amaç:** Pro özelliklerin kilidini açmak için lisans anahtarını etkinleştirmek.

**İş Akışı:**
- Aktif lisans varsa kart üzerinde anahtar, plan ve bitiş tarihi gösterilir
- Lisans yoksa alanı doldurup kaydedebilir, isterseniz “Skip for now” ile sonraki adıma geçebilirsiniz
- **Developer Mode:** Yerel/staging ortamlarında lisans olmadan Pro özelliklerin test edilmesine izin verilir

**Güvenlik:** Tüm işlemler nonce doğrulaması ve yetki kontrolü ile korunur.

### 3. Required Pages
**Amaç:** Shortcode'lar için gerekli WordPress sayfalarını otomatik oluşturmak.

**Sayfa Listesi:**
- Rezervasyon Formu (`rentiva_booking_form`)
- Arama Formu (`rentiva_search`)
- Arama Sonuçları (`rentiva_search_results`)
- Araç Listesi (`rentiva_vehicles_list`)
- Araç Grid (`rentiva_vehicles_grid`)
- Araç Karşılaştırma (`rentiva_vehicle_comparison`)
- İletişim Formu (`rentiva_contact`)

**Özellikler:**
- Eksik sayfaları tek tıkla oluşturur
- Mevcut sayfaları algılar ve gösterir
- "Open Shortcode Pages" ile detaylı yönetimi açar

### 4. Email Settings
**Amaç:** E-posta gönderim ayarlarını yapılandırmak ve SMTP entegrasyonunu teşvik etmek.

**Ayarlar:**
- **Sender Name:** Gönderen ismi
- **Sender Email:** Gönderen e-posta adresi
- **Reply-To Address:** Cevap adresi
- **Test Mode:** Sadece test adresine gönderim
- **Test Email Address:** Test alıcı adresi
- **Automation:** 
  - E-posta gönderimi aktif
  - Otomatik gönderim aktif
  - Loglama aktif

**⚠️ ÖNEMLİ UYARI:**
```
📧 Important: Email Delivery Security

Default WordPress email system can be unreliable depending on server 
configuration, causing your emails to fall into Spam/Junk folders.

For uninterrupted communication and delivery of booking notifications, 
please install and configure an SMTP Plugin.

Recommended Plugins:
WP Mail SMTP or Fluent SMTP
```

### 5. Frontend & Display
**Amaç:** Rezervasyon formu ve araç kartları için varsayılan görünümleri ayarlamak.

**WooCommerce Entegrasyonu:**
- **Para Birimi:** WooCommerce para birimi otomatik algılanır (read-only)
- **Pozisyon:** `woocommerce_currency_pos` ayarından çekilir (read-only)
- **Senkronizasyon:** Tutarsızlıkları önlemek için kullanıcıya seçtirilmez

**Özellikler:**
| Ayar | Açıklama |
|------|----------|
| Currency | WooCommerce varsa read-only, yoksa seçilebilir |
| Currency Position | WooCommerce varsa read-only, yoksa seçilebilir |
| Default Rental Days | Varsayılan kiralama süresi (1-30) |
| Minimum Rental Days | Minimum kiralama süresi (1-365) |
| Maximum Rental Days | Maksimum kiralama süresi (min-365) |
| Show Features | Araç kartı özellik rozetleri |
| Show Availability | Araç kartı müsaitlik rozeti |

### 6. Summary & Tests
**Amaç:** Tüm adımların durumunu kontrol etmek ve sonraki adımları göstermek.

**Kontrol Listesi:**
- ✅ Sistem kontrolü tamamlandı mı?
- ✅ Lisans aktif mi?
- ✅ Gerekli sayfalar oluşturuldu mu?
- ✅ E-posta ayarları kaydedildi mi?
- ✅ Ön yüz ayarları kaydedildi mi?

**Hızlı Erişim:**
- **Open Settings:** Ayarlar sayfasını açar
- **Review Shortcode Pages:** Sayfa yönetimini açar
- **Send Test Email:** E-posta testi yapar
- **Go to Dashboard:** Kontrol paneline gider

**⚠️ Permalink Uyarısı:**
Eğer WordPress permalink yapısı "Plain" ise, frontend sayfalarının çalışması için mutlaka SEO dostu yapıya (Post name) çevrilmesi gerekir. Kurulum tamamlandıktan sonra bu uyarı gösterilir.

## Uyarılar ve Sorun Giderme

### System Check Warning’leri
- Bilgi amaçlıdır, devam etmeye engel değildir
- "Required" olanlar (örn. WP Memory Limit 40 MB) canlıya çıkmadan önce mutlaka düzeltilmeli

### HTTPS / SSL
- Yalnızca `is_ssl()` sonuçlarına bakar
- Reverse proxy kullanıyorsanız `FORCE_SSL_ADMIN` veya gerçek sertifika ile testi doğrulayın

### Email Delivery Warning
- Yalnızca SMTP eklentisi tespit edilmediğinde gösterilir
- FluentSMTP, WP Mail SMTP, Post SMTP gibi eklentiler otomatik algılanır

## Sihirbazı Tekrar Çalıştırmak

Kurulumu tamamladıktan sonra:
- **Complete Setup** butonuna tıklarsanız sihirbaz kapanır ve bir daha otomatik gösterilmez
- Ancak menüden `MHM Rentiva > Setup Wizard` ile her zaman yeniden açılabilir
- Ayarlarınızı sıfırlamak istemiyorsanız sadece rehber olarak açılır

Yeni bir sitede sıfırdan test etmek için:
1. Eklentiyi devre dışı bırakıp tekrar etkinleştirin
2. Veya `mhm_rentiva_setup_completed` seçeneğini veritabanından silin

## Teknik Detaylar

**Kaynak Kod:** `src/Admin/Setup/SetupWizard.php`

**Güvenlik:**
- 7 adet nonce doğrulaması
- `manage_options` yetki kontrolleri
- `sanitize_text_field`, `sanitize_email`, `esc_url` ile sanitizasyon
- `wp_safe_redirect` ile güvenli yönlendirme

**Veri Akışı:**
```
Admin Girişi → maybe_redirect() → Sihirbaz → Adım 1-6 → Tamamla → Dashboard
```

Daha ayrıntılı test senaryoları için [Testing Checklist](../04-developer/testing-checklists.md) dosyasına göz atmayı unutmayın. Ayrıca, eklentinin her bir yönetici sayfasının görev ve yeteneklerini görmek için [Yönetici Sayfaları rehberine](../intro.md) bakabilirsiniz.
