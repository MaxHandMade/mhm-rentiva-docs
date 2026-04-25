---
id: onboarding
title: Tedarikçi Katılımı (Vendor Onboarding)
sidebar_label: Onboarding
sidebar_position: 2
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

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
| Alan | Meta Anahtari | Tip | Sifreleme |
|---|---|---|---|
| Ad Soyad | `_vendor_full_name` | Metin | Hayir |
| Telefon | `_vendor_phone` | Metin | Hayir |
| Sehir / Bolge | `_vendor_city` | SelectWoo | Hayir |
| **IBAN** | `_vendor_iban` | Metin | **Evet (AES-256)** |
| **Hesap Sahibi** | `_vendor_account_holder` | Metin | Hayir |
| Kimlik Belgesi | `_vendor_doc_id` | Dosya | Hayir |
| Ehliyet | `_vendor_doc_license` | Dosya | Hayir |
| Adres Belgesi | `_vendor_doc_address` | Dosya | Hayir |

### Opsiyonel Alanlar
| Alan | Meta Anahtari | Tip | Not |
|---|---|---|---|
| Vergi Dairesi | `_vendor_tax_office` | Metin | v4.23.1 ile eklendi |

:::info v4.23.1 Form Degisiklikleri
- **Hizmet Alanlari (Service Areas):** Checkbox bolumu kaldirildi, yerine bilgi notu eklendi.
- **Arac Sigortasi:** Basvuru formundan kaldirildi, arac ekleme formuna (`[rentiva_vehicle_submit]`) tasindi.
- **Sehir Secimi:** Metin girisi (`<datalist>`) yerine `<select>` + WooCommerce SelectWoo bilesenine donusturuldu (`CityHelper::render_select()`).
- **Hesap Sahibi:** Yeni zorunlu alan — banka hesap sahibi bilgisi.
- **Vergi Dairesi:** Yeni opsiyonel alan.
:::

---

## 🛡️ 2. Uygünlük Kontrolleri (`Eligibility`)

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

### Onay Akisi (`Approve`)
Admin panelinden "Approve" tiklandiginda `VendorOnboardingController::approve()` su islemleri sirasiyla yapar:
1. **Rol Yukseltme:** Kullaniciya `rentiva_vendor` rolu atanir.
2. **Meta Sync:** Basvuru postundaki veriler (`_vendor_*`) kullanici meta tablolarina (`_rentiva_vendor_*`) kopyalanir. v4.23.1 ile `_vendor_account_holder` ve `_vendor_tax_office` alanlari da senkronize edilir.
3. **Loglama:** Onay tarihi ve onaylayan admin ID'si kaydedilir.
4. **Bildirim:** `mhm_rentiva_vendor_approved` kancasi tetiklenir.

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

---

## 🚗 6. Araç Ekleme Süreci (v4.23.0)

Vendor onaylandiktan sonra `[rentiva_vehicle_submit]` formu ile araç ekleyebilir. v4.23.0 ile eklenen özellikler:

### Şehir Filtrelenms Lokasyon/Rota Seçimi
Vendor'in `_vendor_city` meta değerine gore transfer lokasyonlari ve rotalari filtrelenir. `LocationProvider::get_by_city()` ile sehre gore sorgulama yapilir.

### Rota Basi Fiyatlandırma
Her rota için vendor kendi fiyatini belirleyebilir. Admin tarafından tanımlanan `min_price` / `max_price` araligi zorunludur. Meta key: `_mhm_rentiva_transfer_route_prices` (JSON).

### Kapasite Alanları
- **Yolcu kapasitesi:** Maksimum yolcu sayısı.
- **Bagaj limitleri:** Buyuk ve kucuk bagaj kapasiteleri.

### Arac Belgesi (Ruhsat) Yukleme
Vendor, arac ruhsat belgesini form uzerinden yukleyebilir. Bu belge admin tarafindan dogrulama icin incelenir.

### Arac Sigorta Belgesi Yukleme (v4.23.1)
Arac ruhsatindan sonra sigorta belgesi de yuklenebilir. Meta key: `_mhm_rentiva_vehicle_insurance_doc`. Bu alan, basvuru formundan arac ekleme formuna tasindi — boylece her araca ozel sigorta belgesi yuklenebilir.

### Ücretli İlan Kapısı (v4.24.1)

Admin ücretli ilan sistemini etkinleştirdiyse, vendor araç formu gönderildiğinde araç **taslak** olarak kaydedilir ve vendor WooCommerce ödeme sayfasına yönlendirilir. Ödeme tamamlandığında araç otomatik olarak "İnceleme Bekliyor" durumuna geçer. Detaylar için [Ücretli İlan Sistemi](/mhm-rentiva-docs/docs/vendor/vendor-management#-ücretli-i̇lan-sistemi-v4241) bölümüne bakın.

### Düzenleme ve Yeniden İnceleme
Vendor, aracında kritik alan degisikligi yaptiginda (marka, model, plaka vb.) araç otomatik olarak yeniden inceleme kuyuguna alınır (`VendorVehicleReviewManager`). Minor değişiklikler (fiyat, açıklama) aninda yayinlanir.

### Vendor Badge
Vendor araçları, araç kartlarinda vendor badge'i ile işaretlenir.

---

## Bölüm Sonu Özeti
- Onboarding süreci tamamen AJAX tabanldir ve sayfa yenileme gerektirmez.
- Hassas finansal veriler (IBAN) donanim/sunucu seviyesinde şifrelenir.
- Rol ve meta senkronizasyonu atomik bir işlem olarak yurutulur.
- Basvuru formu 3 farkli belge yuklemesini destekler (kimlik, ehliyet, adres). Sigorta belgesi v4.23.1 ile arac ekleme formuna tasindi.
- Araç ekleme formu şehir-filtrelenmiş lokasyon/rota seçimi, rota başı fiyatlandırma ve sigorta belgesi yükleme içerir.
- Şehir seçimi tüm formlarda SelectWoo bileşeni üzerinden yapılır (v4.23.1).
- Ücretli ilan etkinse araç formu gönderildiğinde WC ödeme sayfasına yönlendirme yapılır (v4.24.1).

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 01.04.2026 | 4.24.1 | Ücretli ilan kapısı: araç ekleme → taslak → WC ödeme → inceleme bekliyor akışı eklendi. |
| 28.03.2026 | 4.23.1 | Başvuru formu: Hizmet Alanları ve Araç Sigortası kaldırıldı. Hesap Sahibi (zorunlu), Vergi Dairesi (opsiyonel) eklendi. Şehir seçimi SelectWoo'ya dönüştürüldü. Araç sigorta belgesi araç ekleme formuna taşındı. Meta senkronizasyonu güncellendi. |
| 27.03.2026 | 4.23.0 | Belge yüklemeleri (4 tip), araç ekleme süreci, şehir-filtrelenmiş rota seçimi, rota fiyatlandırma, kapasite alanları, yeniden inceleme mekanizması eklendi. |
| 19.03.2026 | 4.21.2 | Sayfa, HMAC şifreleme ve meta senkronizasyon detaylarıyla güncellendi. |
