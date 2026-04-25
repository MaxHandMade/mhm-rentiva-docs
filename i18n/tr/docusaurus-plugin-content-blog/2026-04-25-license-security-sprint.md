---
slug: license-security-sprint-v4.30.x
title: "Lisans Güvenlik Sertleştirme Sprint'i: Rentiva v4.30.0 → v4.30.2 (mhm-license-server v1.9.0–v1.9.3 ve CS v0.5.x ile)"
authors: [maxhandmade]
tags: [release, security, license, hardening, mhm-rentiva, mhm-license-server, mhm-currency-switcher]
date: 2026-04-25T22:00
---

Rentiva (ve Currency Switcher) Pro lisans katmanını kaynak-düzenleme bypass saldırılarına karşı sertleştiren iki günlük çapraz-eklenti sprint'i. **Üç Rentiva istemci sürümü** (v4.30.0 / v4.30.1 / v4.30.2), **dört lisans-sunucu sürümü** (v1.9.0 → v1.9.3) ve **üç Currency Switcher sürümü** (v0.5.0 / v0.5.1 / v0.5.2) ile birlikte yayımlandı. Canlıda mhmrentiva.com + wpalemi.com üzerinde uçtan-uca doğrulandı.

<!--truncate-->

## Bu sprint neden gerçekleşti

Rentiva eklentisi kaynak kodu **public GitHub repository'sinde** yayınlanıyor. Motive bir saldırgan kodu klonlayıp `Mode::canUseVendorMarketplace()`'i `return true;` olarak yamalayabilir ve lisans sunucusunu hiç çağırmadan Pro özellikleri açabilir. v1.8.0 *çapraz ürün* anahtar yeniden kullanımını (Currency Switcher anahtarı Rentiva'da) kapattı, ancak kaynak-düzenleme bypass'a karşı hiçbir şey yapmadı. **v4.30.x maliyeti yükseltir: bir crack artık HMAC imzası taklit etmek, sahte bir doğrulayıcı barındırmak VE sürekli yeni feature token'lar yaymak zorunda — ve yine de token'lar 24 saat içinde sona erer.**

Tasarım hedefi olarak beş saldırı senaryosu kullanıldı:

| Saldırı | Mekanizma | Tarafından savunulur |
|---|---|---|
| Kaynak-düzenleme `isActive() { return true; }` | Yerel Pro kapısını yama | Katman 4 (feature token) |
| Çapraz ürün anahtar yeniden kullanımı | CS anahtarını Rentiva'da kullan | Katman 1 (slug bağlama, v1.8.0) |
| Boş `product_slug` gövde | Satırı sil, eski uyumluluğa bin | v1.9.3'te sertleştirilmiş Katman 1 |
| Sahte activate POST (script'ten) | İddia edilen site üzerinde kontrol yok | Katman 3 (ters site doğrulaması) |
| Korsan anahtar + sahte sunucu | DNS hijack ile benzer | Katman 2 (yanıt imzalama) |

## v4.30.0 — Faz B İstemci (temel, 2026-04-24)

**mhm-license-server v1.9.0** (Faz A — sunucu tarafı üç katmanlı savunma) ile uyumlu.

### `src/Admin/Licensing/` altında dört yeni yardımcı

- **`ClientSecrets`** — üç yeni wp-config sabitini çözer (`MHM_RENTIVA_LICENSE_RESPONSE_HMAC_SECRET`, `MHM_RENTIVA_LICENSE_FEATURE_TOKEN_KEY`, `MHM_RENTIVA_LICENSE_PING_SECRET`).
- **`ResponseVerifier`** — her imzalı activate/validate yanıtının HMAC-SHA256 doğrulaması. Sunucunun recursive ksort + JSON_UNESCAPED_SLASHES|UNICODE canonicalization'ını byte-byte yansıtır — drift = legitimate yanıtlar tampered görünür.
- **`FeatureTokenVerifier`** — sunucunun yayınladığı `{base64(json)}.{hmac}` token'larını doğrular. 24s TTL. `hasFeature($payload, $flag)` erişimcisi Mode kapıları tarafından kullanılır.
- **`VerifyEndpoint`** — sunucunun ters doğrulama sırasında `X-MHM-Challenge`'ına yanıt veren public REST route `/wp-json/mhm-rentiva-verify/v1/ping`.

### Mode kapı refactor

`canUseVendorMarketplace()`, `canUseMessages()`, `canUseAdvancedReports()`, `canUseVendorPayout()` artık tek bir `featureGranted()` private helper üzerinden yönlendiriliyor:

1. Önce `isPro()` hard-check
2. Eğer `FEATURE_TOKEN_KEY` tanımsızsa → legacy `isPro()` fallback (mevcut müşteriler kırılmıyor)
3. Aksi takdirde yerel olarak saklanan feature token'ın HMAC'ini doğrular
4. Payload'dan belirli flag'i okur (`vendor_marketplace`, `messaging`, `advanced_reports`, vb.)

`isActive()` üzerinde bir `return true;` yaması artık hiçbir şey açmıyor çünkü kapı bağımsız olarak sunucu-tarafından verilmiş bir flag istiyor.

### LicenseManager bağlantısı

- `activate()` istek gövdesi artık `client_version = MHM_RENTIVA_VERSION` içeriyor. Sunucu bunu sürüm-bazlı ters doğrulama enforcement için kullanır (Rentiva için ≥4.30.0 alt sınır).
- Başarılı yanıtın `feature_token` alanı mevcut lisans kaydının yanında saklanır.
- Günlük doğrulama cron'u her tikte token'ı yeniler.

### Test kapsamı

`tests/Unit/Licensing/` ve `tests/Integration/Licensing/` altında 6 yeni test dosyası, **36 yeni test**. Toplam: 776 / 2715, PHPCS temiz, 3 yeni TR çevirisi.

## v4.30.1 — Ters Doğrulama UX Düzeltmesi (2026-04-25 sabah)

v4.30.0 `MHM_RENTIVA_LICENSE_PING_SECRET`'ı **zorunlu** yaptı — onsuz, `VerifyEndpoint` 503 `ping_secret_not_configured` döndürdü ve lisans sunucusu da `site_unreachable` ile aktivasyonu reddetti. **Her müşteri sitesi `wp-config.php`'de operatör-pinned bir secret'a ihtiyaç duyuyordu** — bir son kullanıcı ürünü için kabul edilemez.

### Düzeltme

`VerifyEndpoint::handle_ping()`, `ClientSecrets::getPingSecret()` boş döndüğünde aktivasyon başına `site_hash`'e geri düşer (`LicenseManager::siteHash()`'in yaptığı gibi hesaplanır — `sha256(home_url + site_url)` JSON-kodlanmış). Sunucu tarafı `mhm-license-server v1.9.1+`, `Security\SiteVerifier`'da eşleşen fallback'i uygular, böylece `site_hash` teknik olarak gizli olmasa bile HMAC challenge doğrulanabilir kalır.

### Neden yine güvenli

`site_hash` herkese açık olarak türetilebilir ancak ters ping iddia edilen `site_url`'i hedeflediği için tampering hala başarısız. O domaine sahip olmayan saldırgan GET'i intercept edip sahte HMAC ile yanıt veremez, HMAC anahtarı gizli olsun olmasın.

### Geriye dönük uyumluluk

`MHM_RENTIVA_LICENSE_PING_SECRET` tanımlıysa `VerifyEndpoint` hala onu kullanır — operatör yapılandırmasını sabitlenmiş v4.30.0 deploy'ları olduğu gibi çalışmaya devam eder.

## v4.30.2 — Lisans Bildirimi Defansif Düzeltmesi (2026-04-25 öğleden sonra)

`LicenseAdmin::admin_notices()` içinde iki katmanlı hata:

### Hata A — Boş error_message "License activation failed: " (sondaki boş kuyrukla) render ediyordu

Stale URL state (`?license=error`, `&message=...` olmadan; örn. tarayıcı geri/ileri, bookmark, kırpılmış kopyala-yapıştır) `match`'in default kısmından `sprintf("...: %s", '')` çağrısına sızıyordu. Müşteri hiçbir şey basmadığı halde License sayfasının üstünde görünüyordu.

### Hata B — v1.8.0+/v1.9.x sunucu hata kodları için eksik match arm'ları

`site_unreachable`, `site_verification_failed`, `tampered_response`, `product_mismatch`, `product_slug_required` için kullanıcı dostu çevirisi yoktu. Aynı default arm'a düşüyorlar, ham teknik kodları son kullanıcılara sızdırıyorlardı ("License activation failed: site_unreachable").

### Düzeltme (üç katman)

1. **Defansif guard:** `if ('' === $error_message) { break; }` aksiyona geçirilebilir bir kod yoksa notice'ı tamamen atlar.
2. **Beş yeni match arm'ı**, müşteri-dostu EN string'leri + Türkçe çevirilerle.
3. **Generic default + `data-error-code` attribute:** bilinmeyen gelecek kodları "Lisans etkinleştirme başarısız oldu. Lütfen tekrar deneyin." render eder, teknik kod `data-error-code` HTML attribute aracılığıyla açığa çıkarılır (sadece debug / destek için — asla inline metin değil).

### Stable tag drift yakalandı

Sürüm bump'ı sırasında bir audit `readme.txt` Stable tag'inin `4.30.0`'da takılı kaldığını yakaladı — v4.30.1 release'i yanlışlıkla bump'ı atlamıştı. v4.30.2 `4.30.2`'ye düzeltir.

### Test kapsamı

`tests/Unit/Licensing/LicenseAdminAdminNoticesTest.php` — empty defense, `site_unreachable` mapping, generic default + data attribute ve iki regression case'i (`activated`, no-license-query) kapsayan 5 yeni test. Toplam: **781 / 2726**, PHPCS temiz.

### Canlı doğrulama

Chrome DevTools MCP, v4.30.2 deploy'undan sonra mhmrentiva.com'da bir tur scriptledi:

| URL | Beklenen | Canlı sonuç |
|---|---|---|
| `?license=error` | Notice yok (defansif guard) | ✅ 0 notice elementi |
| `?license=error&message=site_unreachable` | Friendly EN mesaj + `data-error-code="site_unreachable"`, inline metinde ham kod yok | ✅ DOM script ile teyit |
| `?license=error&message=imaginary_code_42` | Generic mesaj + `data-error-code="imaginary_code_42"`, inline metinde ham kod yok | ✅ teyit |

## Eşlik eden sunucu sürümleri (mhm-license-server, wpalemi.com'da)

- **v1.9.0** — Faz A: HMAC yanıt imzalama, ters site doğrulama, feature token issuer (24s TTL).
- **v1.9.1** — `Security\SiteVerifier::verify()` içinde `site_hash` fallback (v4.30.1 istemcisi ile eşleşir).
- **v1.9.2** — `SecretManager::getPingSecret()` opt-in only (file fallback yok) — sunucu otomatik olarak `wp-uploads/mhm-license-secrets/ping.key` ürettiği için müşterilerin zero-config çalıştığı asimetrik HMAC hatasını kapattı.
- **v1.9.3 (KRİTİK)** — `LicenseActivator::activate()` artık slug-bağlı bir lisans satırına karşı boş `product_slug`'ı hard-reddediyor. Önceki kod yolu, tek bir kaynak düzenlemesinin slug'ı istek gövdesinden silmesine ve hem v1.8.0 bağlamayı HEM de v1.9.0 ters doğrulamayı (`REVERSE_VALIDATION_FLOOR[''] === null` legacy-pass branch'ine düştüğü için) atlamasına izin veriyordu.

Birleşik: sunucu tarafında **143 PHPUnit, 398 assertion, PHPCS temiz**.

v1.9.3 deploy'undan sonra üç canlı saldırı senaryosu `wpalemi.com`'da curl ile doğrulandı:

| Senaryo | Beklenen | Canlı sonuç |
|---|---|---|
| `product_slug` gövdeden kaldırılmış | `product_slug_required` reject | ✅ teyit |
| Çapraz ürün slug swap (CS slug + Rentiva site) | `site_unreachable` (CS verify endpoint Rentiva site'inde yok) | ✅ teyit |
| Doğru akış regression | 200 active | ✅ teyit |

## Eşlik eden Currency Switcher sürümleri

`mhm-currency-switcher v0.5.0` (Faz C istemcisi) → `v0.5.1` (CI hotfix: `str_ends_with` PHP 7.4 uyumu + `OrderFilterTest` `WC_Order` stub) → `v0.5.2` (`VerifyEndpoint` `site_hash` fallback). Aynı beş-saldırı yüzeyli savunma CS Mode kapılarına sekiz feature flag ile uygulandı (`fixed_pricing`, `nav_menu_switcher`, `flag_library`, `geolocation`, `payment_restrictions`, `auto_rate_update`, `multilingual`, `rest_api_filter`).

## Müşteri etkisi

Bu sprint'ten sonra Rentiva v4.30.1+ (ve CS v0.5.2+) müşterileri:

- **Sadece lisans anahtarını girip Activate'e basar.** `wp-config.php` düzenlemesi yok.
- Sunucu tarafı üç katmanlı savunma (slug bağlama + yanıt imzalama + ters doğrulama) tam aktif.
- Lisans bildirim mesajları kullanıcı dostu ve locale-aware; ham teknik jargon görünmüyor.
- Mevcut v4.27.x kurulumları, yükseltene kadar legacy fallback yolları üzerinden olduğu gibi çalışmaya devam eder.

## Bilinen sınır (ertelendi)

Yeterince kararlı bir saldırgan, **kendi** sitesinde **kendi** ürün-eşleşen lisansıyla kırılmış bir plugin binary'si çalıştırarak, müşteri `wp-config.php`'de `MHM_RENTIVA_LICENSE_FEATURE_TOKEN_KEY` tanımlamadığında (zero-config deployment kasıtlı olarak bu trade-off'u kabul ediyor) `Mode::canUse*()`'i hala doğrudan yamalayabilir.

Kaynak-düzenleme + zero-config açığını kapatmak **asimetrik kripto** gerektirir (RSA-imzalı feature token'lar, eklenti kaynağında gömülü public key — open-source güvenli). Bu **mhm-license-server v1.10.0 + mhm-rentiva v4.31.0 + mhm-currency-switcher v0.6.0**'a ertelendi, lansman sonrası planlandı.

## 🎓 Yakalanan dersler (hafıza + KB)

- **`patterns/license-defense-in-depth-stack.md`** — beş katmanlı savunma dokümantasyonu, saldırı matrisi, asimetrik kripto roadmap.
- **`patterns/admin-notice-url-state-defense.md`** — redirect-after-action notice'ları için üç katmanlı savunma (boş guard + generic default + data attribute).
- **`patterns/release-zip-audit.md`** — tag/release öncesi üç audit; bu sprint sırasında üç ZIP sızıntısı yakaladı (`drafts/`, `bin/`, `*.po~`).
- **`standards/i18n-workflow.md`** — `.po~` msgmerge backup pattern'i + `.l10n.php` deploy zorunluluğu ile güncellendi.
- **`wp-conductor` skill** — release başına doğrulama gereksinimlerine sahip yeni "Uzun Seans / Zincir Release Disiplini" gate (2026-04-25'teki 8 release zinciri bunu motive eden baseline failure'dı).

---

*GitHub Releases:*
- *Rentiva: [v4.30.0](https://github.com/MaxHandMade/mhm-rentiva/releases/tag/v4.30.0) · [v4.30.1](https://github.com/MaxHandMade/mhm-rentiva/releases/tag/v4.30.1) · [v4.30.2](https://github.com/MaxHandMade/mhm-rentiva/releases/tag/v4.30.2)*
- *License Server: [v1.9.0](https://github.com/MaxHandMade/mhm-license-server/releases/tag/v1.9.0) · [v1.9.1](https://github.com/MaxHandMade/mhm-license-server/releases/tag/v1.9.1) · [v1.9.2](https://github.com/MaxHandMade/mhm-license-server/releases/tag/v1.9.2) · [v1.9.3](https://github.com/MaxHandMade/mhm-license-server/releases/tag/v1.9.3)*
- *Currency Switcher: [v0.5.0](https://github.com/MaxHandMade/mhm-currency-switcher/releases/tag/v0.5.0) · [v0.5.1](https://github.com/MaxHandMade/mhm-currency-switcher/releases/tag/v0.5.1) · [v0.5.2](https://github.com/MaxHandMade/mhm-currency-switcher/releases/tag/v0.5.2)*
