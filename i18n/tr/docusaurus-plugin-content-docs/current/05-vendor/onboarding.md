---
id: onboarding
title: Tedarikçi Katılımı (Vendor Onboarding)
sidebar_label: Onboarding
sidebar_position: 2
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro özelliği
Bu sayfa **MHM Rentiva Pro** eklentisinin bir yeteneğini anlatır. WordPress.org'daki ücretsiz
Lite sürümünün parçası değildir; Lite'ın yanına kurulu Pro ve geçerli bir lisans gerektirir.
Tam ayrım için: [Sürümler — Lite ve Pro farkı](/docs/). Pro'yu edinmek için: [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

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
- **AJAX İşleyici:** `mhmrentiva_vendor_apply` eylemi üzerinden `handle_ajax()` metoduyla çalışır.
- **Güvenlik:** Her başvuru için `wp_create_nonce('mhmrentiva_vendor_apply_nonce')` ile CSRF koruması sağlanır.

### Zorunlu Alanlar
| Alan | Meta Anahtari | Tip | Sifreleme |
|---|---|---|---|
| Ad Soyad | `_vendor_full_name` | Metin | Hayır |
| Telefon | `_vendor_phone` | Metin | Hayır |
| Şehir / Bölge | `_vendor_city` | SelectWoo | Hayır |
| **IBAN** | `_vendor_iban` | Metin | **Evet (AES-256)** |
| **Hesap Sahibi** | `_vendor_account_holder` | Metin | Hayır |
| Kimlik Belgesi | `_vendor_doc_id` | Dosya | Hayır |
| Ehliyet | `_vendor_doc_license` | Dosya | Hayır |
| Adres Belgesi | `_vendor_doc_address` | Dosya | Hayır |

### Opsiyonel Alanlar
| Alan | Meta Anahtari | Tip | Not |
|---|---|---|---|
| Vergi Dairesi | `_vendor_tax_office` | Metin | v4.23.1 ile eklendi |

:::info v4.23.1 Form Değişiklikleri
- **Hizmet Alanları (Service Areas):** Checkbox bölümü kaldırıldı, yerine bilgi notu eklendi.
- **Araç Sigortası:** Başvuru formundan kaldırıldı, araç ekleme formuna (`[rentiva_vehicle_submit]`) taşındı.
- **Şehir Seçimi:** Metin girişi (`<datalist>`) yerine `<select>` + WooCommerce SelectWoo bileşenine dönüştürüldü (`CityHelper::render_select()`).
- **Hesap Sahibi:** Yeni zorunlu alan — banka hesap sahibi bilgisi.
- **Vergi Dairesi:** Yeni opsiyonel alan.
:::

### Bayi Sözleşmesi (v4.61.0)

Adayların, başvuruyu gönderebilmeden önce bir **bayi sözleşmesini** okuyup kabul etmesini zorunlu kılabilirsiniz.

- **Ayarlar → Bayi Pazar Yeri → Bayi Sözleşmesi** altından **Bayi sözleşmesini zorunlu kıl** seçeneğini etkinleştirin. Altındaki **Sözleşme Metni** alanı adaylara gösterilecek metni tutar.
- Etkinleştirildiğinde başvuru formu, sözleşmeyi ve **zorunlu bir onay kutusunu** gösterir — kutu işaretlenmeden form gönderilemez. Aynı zorunluluk **sunucu tarafında** da uygulanır; dolayısıyla form üzerinde oynanarak bu kapı atlatılamaz.
- Kabul, başvuruda kanıt olarak (bir **zaman damgasıyla**) saklanır ve başvuru detayında gösterilir; böylece kimin ne zaman kabul ettiğine dair kaydınız olur.
- **Metin boşsa:** sözleşmeyi açıp metni boş bırakırsanız adaylar sekiz bölümlük hazır bir şablon görür: araçlar ve ilanlar, rezervasyonlar, komisyon ve ödemeler, iptaller, hasar, sigorta ve sorumluluk, kişisel veriler, askıya alma ve sona erme, değişiklikler. Şablon bir başlangıç noktasıdır, hukuki görüş değildir: gözden geçirip işletmenize ve yerel mevzuata göre düzenleyin.
- **Biçim:** metin basit biçimlendirme kabul eder: `# Başlık`, `**kalın**`, `- madde` ve çizgi için `---`. Başka HTML basılmaz.

---

## 🛡️ 2. Uygünlük Kontrolleri (`Eligibility`)

Bir kullanıcı başvuru yapmadan önce `VendorApplicationManager::can_apply()` ile şu kurallar denetlenir:
1. Kullanıcı zaten `rentiva_vendor` rolüne sahip olmamalıdır.
2. Mevcut bir "Pending" (Beklemede) başvurusu olmamalıdır.
3. `Mode::canUseVendorMarketplace()` kontrolü ile lisansın bu özelliği desteklediği doğrulanmalıdır.

---

## 🔒 3. Veri Saklama ve Güvenlik

Başvurular `mhmrentiva_vendor_app` CPT'si olarak saklanır.

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
2. **Meta Sync:** Başvuru postundaki veriler (`_vendor_*`) kullanıcı meta tablolarına (`_mhmrentiva_vendor_*`) kopyalanır. v4.23.1 ile `_vendor_account_holder` ve `_vendor_tax_office` alanları da senkronize edilir.
3. **Loglama:** Onay tarihi ve onaylayan admin ID'si kaydedilir.
4. **Bildirim:** `mhmrentiva_vendor_approved` kancası tetiklenir.

### Red Akışı (`Reject`)
Admin reddettiğinde:
1. Başvuru statüsü `trash` (çöp) durumuna alınır.
2. `_vendor_rejection_note` içine red gerekçesi yazılır.
3. `mhmrentiva_vendor_rejected` kancası tetiklenir.

---

## 📧 5. E-posta Bildirimleri

Tedarikçi döngüsündeki tüm statü değişiklikleri `VendorNotifications` sınıfı tarafından dinlenir:
- **Başvuru Alındı:** Adaya onaya alındığı bilgisi gider.
- **Onaylandı:** Hoş geldin mesajı ve panel erişim bilgileri gönderilir.
- **Reddedildi:** Red gerekçesiyle birlikte bilgilendirme yapılır.

---

## 🚗 6. Araç Ekleme Süreci (v4.23.0)

Vendor onaylandiktan sonra `[rentiva_vehicle_submit]` formu ile araç ekleyebilir. v4.23.0 ile eklenen özellikler:

### Şehir Filtrelenmiş Lokasyon/Rota Seçimi
Vendor'in `_vendor_city` meta değerine göre transfer lokasyonları ve rotaları filtrelenir. `LocationProvider::get_by_city()` ile şehre göre sorgulama yapılır.

### Rota Başı Fiyatlandırma
Her rota için vendor kendi fiyatını belirleyebilir. Admin tarafından tanımlanan `min_price` / `max_price` aralığı zorunludur. Meta key: `_mhmrentiva_transfer_route_prices` (JSON).

### Kapasite Alanları
- **Yolcu kapasitesi:** Maksimum yolcu sayısı.
- **Bagaj limitleri:** Büyük ve küçük bagaj kapasiteleri.

### Araç Belgesi (Ruhsat) Yükleme
Vendor, araç ruhsat belgesini form üzerinden yükleyebilir. Bu belge admin tarafından doğrulama için incelenir.

### Araç Sigorta Belgesi Yükleme (v4.23.1)
Araç ruhsatından sonra sigorta belgesi de yüklenebilir. Meta key: `_mhmrentiva_vehicle_insurance_doc`. Bu alan, başvuru formundan araç ekleme formuna taşındı — böylece her araca özel sigorta belgesi yüklenebilir.

### Ücretli İlan Kapısı (v4.24.1)

Admin ücretli ilan sistemini etkinleştirdiyse, vendor araç formu gönderildiğinde araç **taslak** olarak kaydedilir ve vendor WooCommerce ödeme sayfasına yönlendirilir. Ödeme tamamlandığında araç otomatik olarak "İnceleme Bekliyor" durumuna geçer. Detaylar için [Ücretli İlan Sistemi](/docs/vendor/vendor-management#-ücretli-i̇lan-sistemi-v4241) bölümüne bakın.

### Düzenleme ve Yeniden İnceleme
Vendor, aracında kritik alan degisikligi yaptiginda (marka, model, plaka vb.) araç otomatik olarak yeniden inceleme kuyuguna alınır (`VendorVehicleReviewManager`). Minor değişiklikler (fiyat, açıklama) aninda yayinlanir.

### Vendor Badge
Vendor araçları, araç kartlarinda vendor badge'i ile işaretlenir.

---

## Bölüm Sonu Özeti
- Onboarding süreci tamamen AJAX tabanldir ve sayfa yenileme gerektirmez.
- Hassas finansal veriler (IBAN) donanim/sunucu seviyesinde şifrelenir.
- Rol ve meta senkronizasyonu atomik bir işlem olarak yurutulur.
- Başvuru formu 3 farklı belge yüklemesini destekler (kimlik, ehliyet, adres). Sigorta belgesi v4.23.1 ile araç ekleme formuna taşındı.
- Araç ekleme formu şehir-filtrelenmiş lokasyon/rota seçimi, rota başı fiyatlandırma ve sigorta belgesi yükleme içerir.
- Şehir seçimi tüm formlarda SelectWoo bileşeni üzerinden yapılır (v4.23.1).
- Ücretli ilan etkinse araç formu gönderildiğinde WC ödeme sayfasına yönlendirme yapılır (v4.24.1).

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 18.11.2026 | Pro 6.5.0 | Metin boşken hazır sözleşme şablonu ve basit biçimlendirme belgelendi. |
| 29.06.2026 | 4.61.0 | Bayi sözleşmesi onayı dokümante edildi: başvuru formunda zorunlu onay kutusu, sunucu tarafı uygulama ve başvuruda zaman damgalı kabul kanıtı. |
| 01.04.2026 | 4.24.1 | Ücretli ilan kapısı: araç ekleme → taslak → WC ödeme → inceleme bekliyor akışı eklendi. |
| 28.03.2026 | 4.23.1 | Başvuru formu: Hizmet Alanları ve Araç Sigortası kaldırıldı. Hesap Sahibi (zorunlu), Vergi Dairesi (opsiyonel) eklendi. Şehir seçimi SelectWoo'ya dönüştürüldü. Araç sigorta belgesi araç ekleme formuna taşındı. Meta senkronizasyonu güncellendi. |
| 27.03.2026 | 4.23.0 | Belge yüklemeleri (4 tip), araç ekleme süreci, şehir-filtrelenmiş rota seçimi, rota fiyatlandırma, kapasite alanları, yeniden inceleme mekanizması eklendi. |
| 19.03.2026 | 4.21.2 | Sayfa, HMAC şifreleme ve meta senkronizasyon detaylarıyla güncellendi. |
