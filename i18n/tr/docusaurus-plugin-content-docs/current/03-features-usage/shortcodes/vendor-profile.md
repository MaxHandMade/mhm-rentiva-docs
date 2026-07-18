---
title: Bayi profil sayfası
description: Bayi Profil Sayfası modülünün kullanım kılavuzu ve teknik referansı — kısa kod, Gutenberg bloğu ve Elementor widget'ı.
sidebar_position: 26
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro özelliği
Bu sayfa **MHM Rentiva Pro** eklentisinin bir yeteneğini anlatır. WordPress.org'daki ücretsiz
Lite sürümünün parçası değildir; Lite'ın yanına kurulu Pro ve geçerli bir lisans gerektirir.
Tam ayrım için: [Sürümler — Lite ve Pro farkı](/docs/). Pro'yu edinmek için: [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Amaç
Bu sayfa Bayi Profil Sayfası modülünü belgeler — müşterinin bir bayiyle rezervasyon yapmadan önce göreceği halka açık güven sayfası. Operasyonel kullanım, attribute referansı, schema/SEO davranışı ve geliştirici uzantı noktaları kapsanmaktadır.

[v4.37.0](/blog/rentiva-v4.37.0-release)'da tanıtıldı; rozet wiring + yorum meta fallback'i [v4.37.1](/blog/rentiva-v4.37.1-release)'de; UX cilası (avatar, araç thumbnail'ları, SEO probe, mobil breakpoint) [v4.37.2](/blog/rentiva-v4.37.2-release)'de; admin slug edit çakışma fix'i [v4.38.1](/blog/rentiva-v4.38.1-release)'de eklendi.
:::

# 👤 Bayi Profil Sayfası

## İçerik
- Bu modül nedir
- URL yapısı (`/bayi/{slug}/` TR, `/vendor/{slug}/` EN)
- Admin akışı — slug, avatar, rozet uygunluğu
- Frontend kullanım (kısa kod / Gutenberg bloğu / Elementor widget'ı)
- Attribute referansı (12 attribute)
- Schema.org `LocalBusiness` JSON-LD + SEO eklenti probe'u
- Geliştirici uzantı noktaları (6 filter hook)
- Lite vs Pro davranışı
- Boş durumlar

Bayi Profil Sayfası modülü, onaylanmış her bayiye temiz ve paylaşılabilir bir URL'de özel güven sayfası verir. Ziyaretçiler rezervasyon yapmadan önce bayinin kimliğini, rozet durumunu, filo özetini, son yorumları ve konumunu inceleyebilir — "Bu aracı sevdim" ile "Bu kişiye bilgilerimi göndermeye hazırım" arasındaki güven boşluğunu kapatır.

## Bu modül nedir

Pazaryeri için bir **dönüşüm yüzeyi**, admin paneli değil. Bayi başvuru formu (`[rentiva_vendor_apply]`) onboarding'i, bayi paneli (`[rentiva_user_dashboard]`) operasyonları üstlenir. Bayi Profil Sayfası ise müşterinin bir araç kartında "Bayiyi gör" tıkladığında veya arama/paylaşım yoluyla geldiğinde gördüğü herkese açık salt-okunur görünümdür.

Üç render yüzeyi tek bir kanonik renderer'ı paylaşır (Render Parity sözleşmesi):

| Yüzey | Tanımlayıcı |
| :--- | :--- |
| Kısa kod | `[rentiva_vendor_profile]` |
| Gutenberg bloğu | `mhm-rentiva/vendor-profile` ("MHM Vendor Profile") |
| Elementor widget'ı | `mhm_rentiva_vendor_profile` ("MHM Vendor Profile") |

Blok ve widget kısa koda `do_shortcode()` ile delege eder. Kısa kod ne render ediyorsa, blok ve widget aynı şeyi render eder — çift kod yolu yok.

Manuel yerleştirme yanı sıra modül bir **rewrite kuralı** kayıt eder; `/{base}/{slug}/` adresinde tam-sayfa wrapper'ını otomatik servis eder. Bayinin slug'ı atandığında (manuel veya otomatik), WordPress sayfası oluşturmana gerek kalmadan adres erişilebilir hale gelir.

## URL yapısı

Base segment çevrilebilirdir:

| Locale | URL |
| :--- | :--- |
| EN (varsayılan) | `/vendor/{slug}/` |
| TR | `/bayi/{slug}/` (`_x('vendor', 'URL slug', ...)` `.po` çevirisi) |
| Özel | `mhm_rentiva_vendor_profile_url_base` filtresi ile override |

Slug daima ASCII (Latin) — `sanitize_title(remove_accents($display_name))`. Display name'deki Türkçe diakritikler (örn. "Akif Ötömötiv Şirketi") ASCII'ye katlanır (`akif-otomotiv-sirketi`); URL her tarayıcı, e-posta istemcisi ve eski paylaşım hedefi için güvenli kalır.

Slug değişiklikleri eski URL'den yenisine kalıcı **301 yönlendirmesi** üretir — önceki slug 10 girdilik bir history meta'sına eklenir, `VendorProfileRewrite::handle_request()` eski slug'ları yakalayıp güncelse yönlendirir.

## Admin akışı

### 1. Slug ve avatar — bayi kullanıcı profili

**Kullanıcılar → Kullanıcıyı düzenle** sayfasına git. "MHM Rentiva Vendor Settings" altında üç yeni alan görünür:

- **Default Branch/Location** — operasyonel, public profille ilgili değil.
- **Vendor Avatar** — WP medya kütüphanesi üzerinden özel yükleme. Boş bırakılırsa public profil sırayla Gravatar'a (eşleşen e-posta) ve son olarak display_name'den deterministic üretilen SVG initials avatarına düşer (her bayi farklı, tema-bağımsız, "mystery man" görseli olmadan kimlik sanatı alır).
- **Public Profile URL Slug** — manuel doldur veya boş bırakırsan display_name'den otomatik üretilir. Değiştirildiğinde otomatik 301 yönlendirme oluşur.

Save yolu [v4.38.1](/blog/rentiva-v4.38.1-release)'den itibaren `VendorSlugManager::change_slug()` üzerinden geçer; iki bayiye aynı raw slug verildiğinde otomatik çakışma suffix'i (`-2`, `-3`, ...) uygulanır.

### 2. Rozet uygunluğu — otomatik

"✓ Doğrulanmış Bayi" rozeti tamamen eşik-tabanlıdır. Bir bayi şu **üç koşulun hepsini** sağlarsa onaylanmış sayılır:

| Eşik | Varsayılan | Ayar anahtarı |
| :--- | :--- | :--- |
| Hesap yaşı (onaydan beri gün sayısı) | 180 | `vendor_badge_min_age_days` |
| Güvenilirlik puanı (0-100) | 80 | `vendor_badge_min_score` |
| Tamamlanan rezervasyon (toplam) | 10 | `vendor_badge_min_completed_bookings` |

Eşikleri **MHM Rentiva → Ayarlar → Bayi Pazaryeri** altından ayarla (veya `mhm_rentiva_vendor_badge_eligibility` filtresi ile bayi-bazlı override et — Geliştirici uzantı noktalarına bak).

Üç eşiği henüz tutturmamış bayiler "Yeni Bayi" etiketini görür — yeni hesaplara olumlu çerçeveleme; iki yönde de olumsuz sinyal yok.

### 3. Bio, şehir — onboarding'den taşınır

"Hakkında" bölümü `_rentiva_vendor_bio`'dan (onboarding sırasında toplanır) okur. Hero "📍 Şehir · Üye YYYY" satırı `_rentiva_vendor_city` ve `_rentiva_vendor_approved_at`'tan okur. Bayiler ikisini de panelden istedikleri zaman güncelleyebilir — değişiklikler 1 saatlik transient cache'ini otomatik invalidate eder.

## Frontend kullanım

### Manuel yerleştirme (sayfa veya yazı)

Çoğu kurulumda rewrite kuralı işi yapar: bayi slug'ı yeterli, sayfa oluşturmaya gerek yok. Ama kısa kodu istediğin yere de yapıştırabilirsin:

```shortcode
[rentiva_vendor_profile slug="akif-otomotiv"]
```

Yapılandırılmış örnek:

```shortcode
[rentiva_vendor_profile
    slug="akif-otomotiv"
    show_badge="yes"
    show_about="yes"
    show_vehicles="yes"
    max_vehicles="6"
    vehicle_sort="rating-newest"
    show_reviews="yes"
    max_reviews="10"
    show_location="no"]
```

`slug` boş ve sayfa rewrite-routed ise slug otomatik olarak `mhm_rentiva_vendor_slug` query var'ından okunur.

### Gutenberg bloğu

**MHM Vendor Profile** bloğunu blok inserter'dan ekle (kategori: Widgets). Inspector kontrolleri her kısa kod attribute'unu Inspector panelleri üzerinden açar.

### Elementor widget'ı

**MHM Vendor Profile** widget'ını Elementor panelinden ekle (kategori: MHM Rentiva). Auto-parity kontrolleri kısa kod attribute'larıyla eşleşir; standart Elementor wrapper styling kontrolleri (margin, padding, color, typography) render edilen HTML'i sarar.

## Attribute referansı

12 attribute kanonik snake_case (kısa kod kullanır) ve camelCase alias (blok/widget kullanır) formatlarını kabul eder. Eklentinin CAM (Canonical Attribute Mapper) katmanı her ikisini aynı dahili forma normalize eder.

| Attribute | Varsayılan | Tip | Amaç |
| :--- | :--- | :--- | :--- |
| `slug` | boş | string | Bayi slug'ı. Boş + rewrite-routed sayfa query var'dan okur. |
| `show_badge` | `yes` | bool | Hero'da "✓ Doğrulanmış Bayi" / "Yeni Bayi" etiketini göster. |
| `show_rating` | `yes` | bool | Hero'da agregat puan barı (★★★★½ 4.6) ve yorum sayısını göster. |
| `show_about` | `yes` | bool | Hakkında bölümünü render et (`_rentiva_vendor_bio` boşsa gizli). |
| `show_vehicles` | `yes` | bool | Aktif araç grid bölümünü render et. |
| `max_vehicles` | `6` | int (1-50) | Maksimum araç kartı. Aralığa clamp'lenir. |
| `vehicle_sort` | `rating-newest` | enum | Araç grid sıralaması. Şu anda tek mod (rating DESC, sonra `post_date` DESC). |
| `show_reviews` | `yes` | bool | Son yorumlar bölümünü render et. |
| `max_reviews` | `10` | int (1-50) | Maksimum yorum girdisi. Her yorum kaynak araca link verir. |
| `show_location` | `no` | bool | Adanmış Konum bölümünü render et. **Varsayılan v4.37.2'de `no`'ya çevrildi** — hero zaten şehri gösteriyor. Adanmış bölüm v4.40.0+ Transfer Map zenginleştirmesi için saklı; o gelene kadar hero meta'sını tekrarlıyor. |
| `empty_vehicles_message` | boş | string | "Bu bayi şu anda araç listelememektedir." metnini override et. |
| `empty_reviews_message` | boş | string | "Henüz değerlendirme yok — ilk değerlendirmeyi siz yapın." metnini override et. |
| `class` | boş | string | Wrapper'a ek CSS class(lar)ı. Birden fazla token kabul edilir; her biri ayrı sanitize edilir. |

### Gizlilik sözleşmesi

Aşağıdaki user_meta anahtarları, en uç attribute kombinasyonlarında bile public profilde **asla** render edilmez:

- `_rentiva_vendor_phone` — bayi onboarding'de toplanır, admin-only kalır (anti-spam scraping).
- `_rentiva_vendor_iban` — finansal.
- `_rentiva_vendor_account_holder` — finansal.
- `_rentiva_vendor_tax_number` — finansal.

`VendorProfileProvider` sınıfı render array'ini besleyen alanları tam olarak allowlist'ler; hassas alanlar hiç okunmaz. `mhm_rentiva_vendor_profile_data` filtre DocBlock'u, hassas değerleri bu filtre üzerinden enjekte etmenin 1 saatlik transient'a sızdıracağı uyarısını taşır — filter callback'lerini salt-okunur tut.

## Schema.org `LocalBusiness` JSON-LD + SEO eklenti probe'u

Modül her aktif bayi profil sayfasının `<head>`'ine `LocalBusiness` schema'sı içeren bir `<script type="application/ld+json">` bloğu yayar. Doldurulan alanlar:

- `@type: LocalBusiness`
- `name` (display name, `</script>` enjeksiyonuna karşı hex-encoded — JSON_HEX_TAG bayrağı)
- `url` (kanonik profil URL'si)
- `address.addressLocality` (bayi şehri, ayarlıysa)
- `aggregateRating` (bayi-seviyesi ağırlıklı ortalama + yorum sayısı, ≥1 yorum varsa)

JSON encoding `JSON_HEX_TAG | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES` kullanır — Türkçe karakterler korunur (`Ö` literal), `</script>` enjeksiyonları hex-encoded.

Sayfa başlığı (`{bayi adı} — {site adı}`) ve meta açıklaması (bayi bio'su, kelime sınırında 155 karaktere trim'lenir) **yalnızca aktif bir SEO eklentisi yokken** yayınlanır. Probe seti Yoast SEO, Rank Math, AIOSEO, SEOPress, The SEO Framework ve SmartCrawl'u kapsar; herhangi biri aktifse bizim title/description emisyonumuz inert olur (Google çift metadata'yı cezalandırır ve bu eklentilerin daha zengin ayar UI'ları vardır).

Schema.org JSON-LD çıktısı SEO eklentisinin canonical-tag filtresine de yol verir — `wpseo_canonical` (Yoast) ve `rank_math/frontend/canonical` (Rank Math) `PHP_INT_MAX - 10` öncelikli — böylece kanonik URL tutarlı kalır.

## Geliştirici uzantı noktaları

### `mhm_rentiva_vendor_profile_url_base`

URL base segment'ini override et. Locale fark etmeksizin `/dealers/` veya `/firmalar/` gibi özel slug istediğinde işe yarar.

```php
add_filter('mhm_rentiva_vendor_profile_url_base', function ($base) {
    return 'firmalar';
});
```

Locale değişim takipçisi yeni değeri otomatik algılar ve rewrite kurallarını flush eder.

### `mhm_rentiva_vendor_profile_data`

Tam render data array'ini (kimlik, rozet durumu, araç listesi, yorum agregatı, schema verisi) şablon çalışmadan önce filtrele. Özel template partial'ının okuyacağı ek alanlar enjekte etmek veya sayfa-bazında alan redact etmek için kullan.

```php
add_filter('mhm_rentiva_vendor_profile_data', function (array $data) {
    $data['custom_extra_text'] = 'Antalya Turizm Derneği üyesi';
    return $data;
});
```

**Konvansiyonel olarak salt-okunur.** Burada hassas değer enjekte etmek 1 saatlik transient cache'e sızdırır.

### `mhm_rentiva_vendor_badge_eligibility`

Bayi-bazlı rozet sonucunu override et. Tipik kullanım: "öne çıkan" bayiler için eşikleri bypass et veya inceleme altındaki bir bayiden rozeti geçici olarak çek.

```php
add_filter('mhm_rentiva_vendor_badge_eligibility', function (bool $eligible, int $vendor_id, array $context) {
    if (in_array($vendor_id, get_option('featured_vendor_ids', []), true)) {
        return true;
    }
    return $eligible;
}, 10, 3);
```

`$context` `age_days`, `score`, `completed_bookings` taşır.

### `mhm_rentiva_vendor_completed_bookings_count`

`VendorBadgeEligibility`'nin kullandığı toplam tamamlanan rezervasyon sayısını override et. Varsayılan callback `ReliabilityScoreCalculator::count_completed_bookings()`'a delege eder. Özel sayım stratejisi (örn. yalnızca belirli ürün kategorilerini sayma) için değiştir.

### `mhm_rentiva_vendor_profile_view_all_url`

Araçlar bölümündeki "Tüm araçları görüntüle →" link hedefini filtrele. Boş döndürülürse link gizlenir — search-results sayfası olmayan kurulumlar için kullanışlı.

### `mhm_rentiva_vendor_profile_seo_disable`

Title + meta description emisyonu için global kill switch. Varsayılan `false`; tamamen opt-out etmek için `true` döndür (genellikle tema bayi metadata'sını kendi yöntemiyle yönetiyorsa).

```php
add_filter('mhm_rentiva_vendor_profile_seo_disable', '__return_true');
```

## Lite vs Pro davranışı

Bayi Profil Sayfası **Pro-yalnız bir özelliktir** — `vendor_marketplace` flag'i gerekir. Lite kullanıcıları görür:

- Rewrite kuralı kayıt edilir ama `template_redirect` Lite için 404 dispatch eder (`Mode::canUseVendorMarketplace()` false döner).
- Bir sayfada manuel kısa kod kullanımı boş string döndürür.
- Blok ve Elementor widget'ı boş render eder (kısa koda delege ettiklerinden).

Yükseltme istemleri `/pricing` ve mevcut `[mhm_rentiva_pricing_table]` kısa kodunda yer alır.

## Boş durumlar

| Durum | Render |
| :--- | :--- |
| Bayi bulunamadı / askıya alındı / slug eksik | WordPress 404 (status header 404, temanın 404 şablonu) |
| 0 aktif araç | "Bu bayi şu anda araç listelememektedir." (`empty_vehicles_message` ile override edilebilir) |
| 0 yorum | "Henüz değerlendirme yok — ilk değerlendirmeyi siz yapın." (`empty_reviews_message` ile override edilebilir) |
| 0 araç + 0 yorum (yeni bayi) | İki boş durum da render edilir. Hero hâlâ görünür. "Yeni Bayi" etiketi bağlam ekler. |

## Ayrıca bakınız

- [v4.37.0 sürüm notları](/blog/rentiva-v4.37.0-release) — orijinal özellik tanıtımı
- [v4.37.1 sürüm notları](/blog/rentiva-v4.37.1-release) — rozet wiring hotfix + yorum meta fallback
- [v4.37.2 sürüm notları](/blog/rentiva-v4.37.2-release) — UX cilası (avatar, araç thumbnail'ları, SEO probe, mobil breakpoint)
- [v4.38.1 sürüm notları](/blog/rentiva-v4.38.1-release) — admin slug edit çakışma fix
- [Bayi dizini kısa kodu](./vendor-directory) — her aktif bayiyi listeleyen katalog sayfası
- [Bayi başvuru formu kısa kodu](./vendor-apply) — onboarding formu
- [Bayi onboarding](/docs/vendor/onboarding) — bayi onayı operasyonel kılavuzu
