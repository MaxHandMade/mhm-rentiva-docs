---
title: Bayi dizini
description: Bayi Dizini modülünün kullanım kılavuzu ve teknik referansı — şehir, rozet ve puan filtreleriyle aktif bayilerin halka açık kataloğu.
sidebar_position: 27
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
Bu sayfa Bayi Dizini modülünü belgeler — `/vendors/` (EN) / `/bayiler/` (TR) adresindeki Pro-kilitli halka açık katalog; her aktif bayiyi şehir, rozet ve minimum puan filtreleriyle listeler. Operasyonel kullanım, attribute referansı, schema/SEO ve geliştirici uzantı noktaları kapsanır.

[v4.38.0](/blog/rentiva-v4.38.0-release)'da tanıtıldı; araç sayısı lifecycle paritesi, pagination strict-type fix'i ve SEO/cache parite guard'ları [v4.38.1](/blog/rentiva-v4.38.1-release)'de eklendi.
:::

# 🗂️ Bayi Dizini

## İçerik
- Bu modül nedir
- URL yapısı (`/bayiler/` TR, `/vendors/` EN)
- Frontend kullanım (kısa kod / Gutenberg bloğu / Elementor widget'ı)
- Filtre UI'ı (şehir, rozet, minimum puan, sıralama)
- Pagination
- Attribute referansı (8 attribute)
- Schema.org `ItemList` + `BreadcrumbList` JSON-LD
- Cache stratejisi (30dk transient + prefix-wildcard invalidation)
- Geliştirici uzantı noktaları (5 filter hook + `seo_disable` kill switch)
- İki katmanlı Pro kilidi
- Boş durumlar

Bayi Dizini, pazaryeri keşif döngüsünü kapatır. Profil sayfaları mevcuttur ([v4.37.0](/blog/rentiva-v4.37.0-release)'da tanıtıldı) ama bir liste olmadan ulaşılamaz. Dizin işte o liste — sunucu-render, JS gerektirmez, SEO-öncelikli, Dokan-stili.

## Bu modül nedir

`[rentiva_vehicles_grid]`'in araçlar için keşif yüzeyi olduğu gibi, **bayiler için bir keşif yüzeyi**. Müşteriler genellikle bayi adlarını a priori bilmez; bir liste taramak, lokasyona göre filtrelemek ve bir profile tıklamak isterler. Bayi Dizini işte o tarama-listesi — crawler'ların ve ekran okuyucularının da anladığı bir şekille.

Üç render yüzeyi tek bir kanonik renderer'ı paylaşır (Render Parity sözleşmesi):

| Yüzey | Tanımlayıcı |
| :--- | :--- |
| Kısa kod | `[rentiva_vendor_directory]` |
| Gutenberg bloğu | `mhm-rentiva/vendor-directory` ("MHM Vendor Directory") |
| Elementor widget'ı | `mhm_rentiva_vendor_directory` ("MHM Vendor Directory") |

Blok ve widget kısa koda `do_shortcode()` ile delege eder. Kısa kod ne render ediyorsa, blok ve widget aynı şeyi render eder — çift kod yolu yok.

Manuel yerleştirme yanı sıra modül `/{base}/` adresinde tam-sayfa wrapper'ını otomatik servis eden bir **rewrite kuralı** kayıt eder — WordPress sayfası gerektirmez.

## URL yapısı

Base segment çevrilebilirdir:

| Locale | URL |
| :--- | :--- |
| EN (varsayılan) | `/vendors/` |
| TR | `/bayiler/` (`_x('vendors', 'URL slug', ...)` `.po` çevirisi) |
| Özel | `mhm_rentiva_vendor_directory_url_base` filtresi ile override |

Base, Bayi Profil base'inin kardeşidir ama ayrıdır — Profil tek-bayi + slug capture group (`/vendor/{slug}/`), Dizin yalnızca base (`/vendors/`).

Filtre, sıralama ve pagination durumu query string'de taşınır:

```
/bayiler/?city=Istanbul&badge=verified&min_rating=4&sort=rating&paged=2
```

Her kombinasyon benzersiz, indekslenebilir bir URL'dir — arama motorları tüm filtre matrisini tarar.

## Frontend kullanım

### Manuel yerleştirme (sayfa veya yazı)

Kısa kodu istediğin sayfaya yapıştır:

```shortcode
[rentiva_vendor_directory]
```

Bu varsayılanı render eder — sayfa başına 12 bayi, rating-DESC sıralama, tüm UI bölümleri görünür.

Yapılandırılmış örnek:

```shortcode
[rentiva_vendor_directory
    per_page="12"
    default_sort="rating"
    show_filter_bar="yes"
    show_breadcrumb="yes"
    show_pagination="yes"
    empty_message="Şu an aktif bayi bulunmuyor."]
```

### Gutenberg bloğu

**MHM Vendor Directory** bloğunu blok inserter'dan ekle (kategori: Widgets). Inspector kontrolleri her kısa kod attribute'unu Inspector panelleri üzerinden açar.

### Elementor widget'ı

**MHM Vendor Directory** widget'ını Elementor panelinden ekle (kategori: MHM Rentiva). Auto-parity kontrolleri kısa kod attribute'larıyla eşleşir.

## Filtre UI'ı

Varsayılan filtre bar'ı yatay bir dört `<select>` dropdown satırı + "Uygula" submit butonudur (`<form method="get">`). Her kontrol native HTML elementidir — form JavaScript olmadan çalışır. JS katmanı (etkinleştirildiğinde) opsiyonel `change` event auto-submit'i progressive enhancement olarak ekler.

| Kontrol | Query parametresi | Seçenekler |
| :--- | :--- | :--- |
| Şehir | `city` | Tüm şehirler (bayi merkezi ∪ araç teslim noktası, distinct) |
| Rozet | `badge` | Tümü / Doğrulanmış bayiler / Yeni bayiler |
| Minimum puan | `min_rating` | Tüm puanlar / 3+ ★ / 4+ ★ / 5 ★ |
| Sıralama | `sort` | Puanı en yüksek (varsayılan) / En yeni / A → Z |

Mobilde (≤600px) filtre bar'ı iki butona daralır ("Filtre (N)" + "Sırala") ve native bir `<details>` elementi üzerinden tam-ekran sheet açılır — yine JS gerektirmez.

### Varsayılan sıralama: rating DESC + en yeni tiebreaker

Varsayılanın rating-DESC olmasının sebebi en güçlü bayileri öne çıkarmasıdır. Puanı olmayan (veya aynı puanlı) bayiler `user_registered` DESC ile tiebreak'lenir — aynı puanda yeni hesaplar eski hesapların üstüne çıkar; taze bir pazaryeri durağan hissetmez.

## Pagination

Klasik sayfa-numarası pagination — `?paged=N` query parametresi, AJAX yok. Varsayılan 12/sayfa (masaüstünde 4 sütun × 3 satır, tablette 2 × 6, mobilde 1 × 12). `.current` selector'ı `.mhm-vendor-directory-pagination` altına scope'lanmıştır; tema `.current` kuralları stillendirmeyi hijack edemez (regression test'leriyle [v4.38.1](/blog/rentiva-v4.38.1-release)'den itibaren doğrulanır).

## Attribute referansı

8 attribute kanonik snake_case (kısa kod kullanır) ve camelCase alias (blok/widget kullanır) formatlarını kabul eder.

| Attribute | Varsayılan | Tip | Amaç |
| :--- | :--- | :--- | :--- |
| `per_page` | `12` | int (1-50) | Sayfa başına kart sayısı. Aralığa clamp'lenir. |
| `default_sort` | `rating` | enum | `?sort=` yokken kullanılan varsayılan sıralama. Seçenekler: `rating`, `newest`, `alpha`. |
| `show_filter_bar` | `yes` | bool | Grid üstüne filtre bar'ını render et. |
| `show_breadcrumb` | `yes` | bool | Eklenti `Anasayfa › Bayiler` breadcrumb'ını render et (aktif SEO eklentisi varsa otomatik devre-dışı — bkz. Schema/SEO). |
| `show_pagination` | `yes` | bool | Grid altına sayfa-numarası nav'ını render et. |
| `empty_message` | boş | string | "Bu kriterlere uyan bayi bulunamadı." metnini override et (filtre-sonucu boş dalı). |
| `class` | boş | string | Wrapper'a ek CSS class(lar)ı. Birden fazla token kabul; her biri ayrı sanitize. |
| `id` | boş | string | Wrapper element'i üzerinde DOM id. `sanitize_html_class()` ile sanitize. |

## Schema.org `ItemList` + `BreadcrumbList` JSON-LD

Modül dizin sayfasının `<head>`'ine iki `<script type="application/ld+json">` bloğu yayar:

- **`ItemList`** — bayi profil URL'lerinin sıralı listesi (yalnızca render edilen sayfa, tüm sonuç seti değil — payload sınırlı tutulur).
- **`BreadcrumbList`** — görünür breadcrumb'ı yansıtan `Anasayfa › Bayiler` izi.

JSON encoding `JSON_HEX_TAG | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES` kullanır — Türkçe karakterler korunur, `</script>` enjeksiyonları hex-encoded.

### SEO eklenti probe'u — otomatik yol verir

Hem JSON-LD emisyonu hem de görsel breadcrumb **aktif bir büyük SEO eklentisi varken inert olur**. Probe seti:

- Yoast SEO (`WPSEO_VERSION` constant veya `WPSEO_Frontend` class)
- Rank Math (`RANK_MATH_VERSION` constant veya `RankMath` class)
- All in One SEO (`AIOSEO_VERSION` constant veya `AIOSEO\Plugin\AIOSEO` class)
- SEOPress (`SEOPRESS_VERSION` constant)
- The SEO Framework (`THE_SEO_FRAMEWORK_VERSION` constant)
- SmartCrawl (`SMARTCRAWL_VERSION` constant veya `Smartcrawl_Init` class)

Google çift schema'yı cezalandırır ve bu eklentilerin daha zengin ayar UI'ları vardır; biz onlara yol veririz. Probe hem `register()` early-return'unda ([v4.38.1](/blog/rentiva-v4.38.1-release)'den itibaren) hem her callback içinde defansif ikinci katman olarak çalışır (SEO eklentisinin bizim wiring'imizden sonra yüklenmesi ihtimali için).

Sayfa başlığı (varsayılan: `Vendors — {site adı}`) ve meta açıklaması (varsayılan: `Discover all our vendors. {N} vendors · {M} vehicles`) aynı probe'u takip eder — yalnızca SEO eklentisi yokken yayınlanır. İkisinin de varsayılanını filtre üzerinden override edebilirsin (bkz. Geliştirici uzantı noktaları).

## Cache stratejisi

Filtre + sıralama + sayfa kombinasyonunun her benzersiz hali 30 dakikalık TTL'li bir transient'ta cache'lenir:

```
mhm_rentiva_vendor_dir_{md5(query_args)}
```

Invalidation **Bayi Profil invalidator'ının bir alt kümesidir** — yalnızca dizin listelemesini etkileyen alanlar flush tetikler:

- `_rentiva_vendor_status` user_meta değişimi (active ↔ suspended)
- `_rentiva_vendor_city` user_meta değişimi (filtre dropdown'u + şehir-bazlı sonuç seti)
- `_rentiva_vendor_reliability_score` user_meta değişimi (rozet filtre kovaları)
- `save_post_vehicle` (araç ekleme/kaldırma vehicle_count + şehir havuzunu değiştirir)
- `mhm_rentiva_vehicle_lifecycle_changed` (active/withdrawn/paused dahil olmayı etkiler)
- `transition_comment_status` (yorum onayı puan agregatını değiştirir)
- `profile_update` (display name değişimi kart etiketi + alpha sort'u etkiler)

Bio değişiklikleri ve avatar yüklemeleri **bilinçli olarak invalidate edilmez** — dizin kartları o alanları render etmediği için, oradaki bir flush boşa iş olurdu. Cache, bir prefix-wildcard SQL `DELETE` (tek sorgu tüm cache'lenmiş varyantları aynı anda düşürür) tarafından desteklenir.

Lifecycle status gerçekten değişmediğinde invalidator no-op yapar ([v4.38.1](/blog/rentiva-v4.38.1-release)'den itibaren comment-status no-op'uyla parite) — lifecycle transition olmadan araç re-save'leri cache'i boşa düşürmez.

## Geliştirici uzantı noktaları

### `mhm_rentiva_vendor_directory_url_base`

URL base segment'ini override et. Özel pazaryeri slug'ları için kullanışlı.

```php
add_filter('mhm_rentiva_vendor_directory_url_base', function ($base) {
    return 'firmalar';
});
```

Locale değişim takipçisi yeni değeri otomatik algılar ve rewrite kurallarını flush eder.

### `mhm_rentiva_vendor_directory_per_page`

Per-page cap'ini kısa kod dışından override et. Her blok/widget örneğini düzenlemeden site-genel politika belirlemeyi sağlar.

```php
add_filter('mhm_rentiva_vendor_directory_per_page', function () {
    return 24;
});
```

### `mhm_rentiva_vendor_directory_empty_message`

"Bayi bulunamadı" metnini filtrele. İki bağlam:

- Filtre-sonucu boş (kullanıcı sıfır eşleşmeye filtreledi)
- Site-genel sıfır (hiç aktif bayi yok)

Bağlama göre override:

```php
add_filter('mhm_rentiva_vendor_directory_empty_message', function ($message, $context) {
    if ($context === 'site_wide_zero') {
        return 'Henüz kayıtlı bayimiz yok. Yakında!';
    }
    return $message;
}, 10, 2);
```

### `mhm_rentiva_vendor_directory_page_title`

Sayfa başlığını override et (varsayılan: `Vendors — {site adı}`). `VendorDirectorySeo::build_title()` tarafından döndürülür. Aktif SEO eklentisi varken inert.

### `mhm_rentiva_vendor_directory_meta_description`

Meta açıklamasını override et. Filter üç argüman alır — varsayılan metin, bayi sayısı, araç sayısı — bağlam-aware metin kurabilirsin.

```php
add_filter('mhm_rentiva_vendor_directory_meta_description',
    function (string $default, int $vendor_count, int $vehicle_count): string {
        return sprintf(
            'Antalya rent-a-car pazaryeri — %d aktif bayi, %d araç.',
            $vendor_count,
            $vehicle_count
        );
    },
    10,
    3
);
```

### `mhm_rentiva_vendor_directory_seo_disable`

Hem schema JSON-LD hem title/description emisyonu için global kill switch. Varsayılan `false`; tamamen opt-out etmek için `true` döndür (genellikle tema dizin metadata'sını kendi yöntemiyle yönetiyorsa).

```php
add_filter('mhm_rentiva_vendor_directory_seo_disable', '__return_true');
```

## İki katmanlı Pro kilidi

Bayi Dizini **Pro-yalnız bir özelliktir** — `vendor_marketplace` flag'i gerekir. Lite kullanıcıları iki kilide takılır:

1. **Dispatch-time kilidi** — `template_redirect` handler'ı `Mode::canUseVendorMarketplace()` false döndüğünde `/{base}/` istekleri için WordPress 404 döner. Kullanıcı temanın 404 sayfasını görür.
2. **Render-time kilidi** — Lite kullanıcısının manuel kısa kod kullanımı (sayfada blok / widget / kısa kod) boş string döndürür. Yükseltme modal'ı yok, error log yok, yarı render edilmiş HTML yok.

Yükseltme istemleri `/pricing` ve mevcut `[mhm_rentiva_pricing_table]` kısa kodunda yer alır.

## Boş durumlar

| Durum | Render |
| :--- | :--- |
| Filtre sonucu boş (aktif bayi var ama filtreler hepsini hariç tutuyor) | "Bu kriterlere uyan bayi bulunamadı." + `/{base}/`'a dönen "Filtreleri Temizle" linki |
| Site-genel sıfır (hiç aktif bayi yok) | "Henüz kayıtlı bayimiz yok. Yakında!" — filter ile override edilebilir |
| Lite kullanıcı | WordPress 404 (dispatch kilidi) veya boş string (manuel yerleştirme) |

## Ayrıca bakınız

- [v4.38.0 sürüm notları](/blog/rentiva-v4.38.0-release) — orijinal özellik tanıtımı
- [v4.38.1 sürüm notları](/blog/rentiva-v4.38.1-release) — araç sayısı lifecycle paritesi, pagination strict-type fix, SEO/cache parite guard'ları
- [Bayi profil sayfası kısa kodu](./vendor-profile) — her dizin kartının yönlendirdiği hedef sayfa
- [Bayi başvuru formu kısa kodu](./vendor-apply) — onboarding formu
- [Bayi onboarding](/docs/vendor/onboarding) — bayilerin dizine nasıl girdiği
