---
id: vendor-onboarding
title: Tedarikçi Katılımı (Vendor Onboarding)
sidebar_label: Onboarding
sidebar_position: 2
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, bir kullanıcının tedarikçi olma sürecini; başvuru formundan admin onayına, rol atamasından veri senkronizasyonuna kadar teknik olarak açıklar.
:::

# 🚀 Tedarikçi Katılım Süreci

Rentiva onboarding modülü, kontrollü bir pazar yeri (Marketplace) yapısını garanti etmek için **iki aşamalı onay mekanizması** kullanır.

---

## 📝 1. Başvuru Formu ve Kısa Kod

Tedarikçi başvuruları `[rentiva_vendor_apply]` kısa kodu ile render edilen bir form üzerinden alınır.

### Teknik Uygulama
- **Sınıf:** `MHMRentiva\Admin\Frontend\Shortcodes\Vendor\VendorApply`
- **AJAX İşleyici:** `mhm_vendor_apply` eylemi üzerinden `handle_ajax()` metoduyla çalışır.
- **Güvenlik:** Her başvuru için `wp_create_nonce('mhm_vendor_apply_nonce')` ile CSRF koruması sağlanır.

### Zorunlu Alanlar
| Alan | Meta Anahtarı | Tip | Şifreleme |
|---|---|---|---|
| Ad Soyad | `_vendor_full_name` | Metin | Hayır |
| Telefon | `_vendor_phone` | Metin | Hayır |
| Şehir / Bölge | `_vendor_city` | Seçim | Hayır |
| **IBAN** | `_vendor_iban` | Metin | **Evet (AES-256)** |
| Kimlik/Ehliyet | `_vendor_doc_id` | Dosya | Hayır |

---

## 🛡️ 2. Uygunluk Kontrolleri (`Eligibility`)

Bir kullanıcı başvuru yapmadan önce `VendorApplicationManager::can_apply()` ile şu kurallar denetlenir:
1. Kullanıcı zaten `rentiva_vendor` rolüne sahip olmamalıdır.
2. Mevcut bir "Pending" (Beklemede) başvurusu olmamalıdır.
3. `Mode::canUseVendorMarketplace()` kontrolü ile lisansın bu özelliği desteklediği doğrulanmalıdır.

---

## 🔒 3. Veri Saklama ve Güvenlik

Başvurular `mhm_vendor_app` CPT'si olarak saklanır.

### IBAN Şifreleme Protokolü
IBAN bilgileri veritabanına asla düz metin olarak yazılmaz:
```php
// VendorApplicationManager::encrypt_iban()
$key = substr(hash('sha256', AUTH_KEY . SECURE_AUTH_SALT), 0, 32);
$iv  = openssl_random_pseudo_bytes(16);
$cipher = openssl_encrypt($raw_iban, 'AES-256-CBC', $key, OPENSSL_RAW_DATA, $iv);
return base64_encode($iv . $cipher);
```
**Not:** `AUTH_KEY` veya `SECURE_AUTH_SALT` değişirse eski şifrelenmiş IBAN'lar çözülemez.

---

## ⚙️ 4. Admin Onay ve Rol Atama

### Onay Akışı (`Approve`)
Admin panelinden "Approve" tıklandığında `VendorOnboardingController::approve()` şu işlemleri sırasıyla yapar:
1. **Rol Yükseltme:** Kullanıcıya `rentiva_vendor` rolü atanır.
2. **Meta Sync:** Başvuru postundaki veriler (`_vendor_*`) kullanıcı meta tablolarına (`_rentiva_vendor_*`) kopyalanır.
3. **Loglama:** Onay tarihi ve onaylayan admin ID'si kaydedilir.
4. **Bildirim:** `mhm_rentiva_vendor_approved` kancası tetiklenir.

### Red Akışı (`Reject`)
Admin reddettiğinde:
1. Başvuru statüsü `trash` (çöp) durumuna alınır.
2. `_vendor_rejection_note` içine red gerekçesi yazılır.
3. `mhm_rentiva_vendor_rejected` kancası tetiklenir.

---

## 📧 5. E-posta Bildirimleri

Tedarikçi döngüsündeki tüm statü değişiklikleri `VendorNotifications` sınıfı tarafından dinlenir:
- **Başvuru Alındı:** Adaya onaya alındığı bilgisi gider.
- **Onaylandı:** Hoş geldin mesajı ve panel erişim bilgileri gönderilir.
- **Reddedildi:** Red gerekçesiyle birlikte bilgilendirme yapılır.

## Bölüm Sonu Özeti
- Onboarding süreci tamamen AJAX tabanlıdır ve sayfa yenileme gerektirmez.
- Hassas finansal veriler (IBAN) donanım/sunucu seviyesinde şifrelenir.
- Rol ve meta senkronizasyonu atomik bir işlem olarak yürütülür.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | Sayfa, HMAC şifreleme ve meta senkronizasyon detaylarıyla güncellendi. |
