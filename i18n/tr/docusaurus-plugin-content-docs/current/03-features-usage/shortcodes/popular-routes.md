---
title: Popüler rotalar
description: Popüler Rotalar vitrini modülünün kullanım kılavuzu ve teknik referansı.
sidebar_position: 18
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
Bu sayfa Popüler Rotalar modülünü — VIP transfer rotalarının ana sayfa vitrinini — operasyonel kullanım, tüm attribute referansı ve geliştirici uzantı noktaları açısından anlatır.

[v4.34.0](/blog/rentiva-v4.34.0-release) ile tanıtıldı; tıklanabilir kartlar + deep-link ön-doldurma [v4.34.1](/blog/rentiva-v4.34.1-release) ile geldi.
:::

# 🌟 Popüler Rotalar

## İçindekiler
- Modül nedir
- Yönetici akışı — rotaları sabitleme
- Frontend kullanımı (kısa kod / Gutenberg blok / Elementor widget)
- Attribute referansı (16 parametre)
- Kart tıklama davranışı — deep-link ön-doldurma
- Geliştirici uzantı noktaları (filter hook'ları)
- Lite ve Pro davranışı
- Boş durum

Popüler Rotalar modülü, ana sayfada en güçlü VIP transfer rotalarınızı A → B kartları olarak (kalkış → varış, ortalama süre, mesafe, başlangıç fiyatı) öne çıkarır. Her kart tıklanabilir bir bağlantıdır ve seçilen kalkış/varış zaten doldurulmuş olarak transfer arama formuna deep-link yapar; ziyaretçi sadece tarih/saat ekleyip gönderir.

## Modül nedir

**Transfer modülü için bir conversion yüzeyi**, arama arayüzü değil. Transfer modülü zaten arama formunu (`[rentiva_transfer_search]`) ve sonuç listesini (`[rentiva_transfer_results]`) içeriyor. Popüler Rotalar, ziyaretçilere VIP transfer hizmetinizin var olduğunu söyleyen ve "istediğim rotayı görüyorum"dan "arama formu onu zaten seçili"ye tek tıklamada götüren upstream dürtüdür.

Üç render yüzeyi tek bir kanonik renderer paylaşır (Render Parite kuralı):

| Yüzey | Tanımlayıcı |
| :--- | :--- |
| Kısa kod | `[rentiva_popular_routes]` |
| Gutenberg bloğu | `mhm-rentiva/popular-routes` ("MHM Popüler Transfer Rotaları" başlığı) |
| Elementor widget | `mhm_rentiva_popular_routes` ("MHM Popüler Rotalar" başlığı) |

Blok ve widget, kısa koda `do_shortcode()` üzerinden delege eder. Kısa kod ne render ediyorsa, blok ve widget aynısını render eder — çift kod yolu yok.

## Yönetici akışı — rotaları sabitleme

Modül mevcut **Transfer Güzergâhları** tablosundan okur — ayrı bir "popüler rotalar" veri kaynağı yoktur. Hangi rotaların popüler olduğuna bir checkbox işaretleyerek karar verirsiniz.

### 1. Rotalarınızı tanımlayın

**MHM Rentiva → Transfer Güzergâhları**'na gidin ve rotaları normal yolla oluşturun veya düzenleyin: kalkış ve varış lokasyonlarını seçin, mesafe ve süreyi girin, fiyatlandırma yöntemini seçin (sabit fiyat veya km başı) ve fiyatı girin.

### 2. Ana sayfada görünmesini istediğiniz rotaları sabitleyin

Her rota düzenleme formunun altında bir checkbox vardır:

> **🌟 Vitrine Koy (popüler rotalar bloğuna sabitle)**
>
> Vitrindeki rotalar, ana sayfadaki `[rentiva_popular_routes]` kısa kodunda, Gutenberg bloğunda ve Elementor widget'ında önce sabitlenir.

Kutuyu işaretleyin ve kaydedin. Rota artık güzergâh listesinde "🌟 Vitrin" rozeti ile görünür ve kısa kod/blok/widget'ı render eden her yüzeyde Popüler Rotalar bölümünün başına sabitlenir.

Transient cache (1 saatlik TTL) her kayıt ve silme işleminde otomatik olarak temizlenir; değişiklikler bir sonraki sayfa isteğinde canlıya geçer.

## Frontend kullanımı

### Kısa kod

Kısa kodu herhangi bir sayfa veya yazıya bırakın:

```shortcode
[rentiva_popular_routes]
```

Bu varsayılan render eder — altı kart, masaüstünde üç sütun, "vitrin önce" sıralama düzeni, tüm görünürlük flag'leri açık, açık tema.

Daha yapılandırılmış bir örnek:

```shortcode
[rentiva_popular_routes
    columns="3"
    limit="6"
    order="featured"
    heading="Popüler Transfer Rotaları"
    subheading="En çok tercih edilen güzergahlar"
    filter_origin_city="Istanbul"
    show_view_all="true"]
```

### Gutenberg bloğu

**MHM Popüler Transfer Rotaları** bloğunu blok ekleyiciden ekleyin (kategori: Widget'lar). Inspector kontrolleri dört panelde gruplandırılmıştır:

| Panel | Kontroller |
| :--- | :--- |
| Düzen | Sütunlar (2/3/4), maksimum kart, tema (açık/koyu) |
| Başlık | Başlık, alt başlık, "Tümünü gör" anahtarı, "Tümünü gör" URL override |
| Sıralama ve Filtreler | Sıralama düzeni (5 seçenek), yalnızca-vitrin anahtarı, kalkış şehir filtresi, kalkış tip filtresi |
| Kart Görünümü | Süre göster, mesafe göster, trafik notu göster, başlangıç fiyatı göster, para birimi simgesi |

Blok `ServerSideRender` kullanır, bu yüzden editör önizlemesi canlı frontend ile birebir aynıdır.

### Elementor widget

**MHM Popüler Rotalar** widget'ını Elementor panelinden ekleyin (kategori: MHM Rentiva). Aynı dört kontrol bölümü mevcut, ayrıca Elementor'un standart sarmalayıcı stillendirme kontrolleri (kenar boşluğu, dolgu, renk, tipografi) da var.

## Attribute referansı

16 attribute'un hepsi kanonik snake_case formunu (kısa kod) ve camelCase alias'ını (blok / widget) kabul eder. Eklentinin CAM (Canonical Attribute Mapper) ikisini aynı dahili forma normalize eder.

| Attribute | Varsayılan | Tip | Amaç |
| :--- | :--- | :--- | :--- |
| `limit` | `6` | int (1-50) | Render edilen maksimum kart sayısı. Lite planlarda `Mode::maxTransferRoutes()` ile sınırlanır. |
| `columns` | `3` | enum | Masaüstü grid sütun sayısı: `2`, `3` veya `4`. Tablet her zaman 2, mobil her zaman 1. |
| `order` | `featured` | enum | `featured` / `price_asc` / `price_desc` / `alphabetical` / `newest` |
| `heading` | "Popüler Rotalar" | string | Bölüm başlığı (çevrilebilir). |
| `subheading` | "En çok tercih edilen VIP transfer güzergahları" | string | Alt başlık (çevrilebilir). |
| `show_view_all` | `true` | bool | Bölüm header'ında "Transfer arayın" linkini göster. |
| `view_all_url` | boş | url | Link hedefini override et. Boşken `mhm_rentiva_popular_routes_view_all_url` filtresi kullanılır; o da boşsa link gizlenir. |
| `show_duration` | `true` | bool | Her kartta "Yaklaşık X dk" satırını render et. |
| `show_distance` | `true` | bool | Her kartta "X km" satırını render et. |
| `show_traffic_note` | `true` | bool | "Trafiğe göre değişebilir" uyarısını render et. |
| `show_price` | `true` | bool | Her kartta başlangıç-fiyatı satırını render et. |
| `currency_symbol` | `₺` | string | Fiyat ön eki (tek karakter veya kısa kod). |
| `filter_origin_city` | boş | string | Yalnızca kalkış lokasyonu bu şehirde olan rotaları göster (büyük/küçük harf duyarsız). |
| `filter_origin_type` | boş | enum | Yalnızca kalkış tipi bu olan rotaları göster: `airport` / `train` / `hotel` / `marina` / `city_center`. |
| `featured_only` | `false` | bool | Yalnızca "🌟 Vitrin" checkbox'ı işaretli rotaları render et. |
| `theme` | `light` | enum | `light` / `dark` (açık tema üretim-test edilmiş varsayılandır). |

### Sıralama düzeni detayları

- **`featured`** — sabitlenmiş rotalar önce (sabitlenmiş set içinde `created_at DESC` sıralı), sonra sabitlenmemiş rotalar (yine `created_at DESC`). Bu varsayılan ve amaçlanan vitrin sıralamasıdır.
- **`price_asc`** / **`price_desc`** — `min_price` (calculated pricing) veya `base_price` (fixed pricing) üzerinden artan/azalan sıralama.
- **`alphabetical`** — kalkış adına, sonra varış adına göre sıralar.
- **`newest`** — sabitleme durumu fark etmeksizin saf `created_at DESC`.

### Kalkış tipi ikonları

Kart sağ üst köşesi, kalkış lokasyonunun tipine göre bir ikon gösterir:

| Tip | Varsayılan ikon |
| :--- | :--- |
| `airport` | ✈️ |
| `train` | 🚆 |
| `hotel` | 🏨 |
| `marina` | ⛵ |
| `city_center` | 🏙️ |
| (diğer) | ↗ |

Eşleştirmeyi `mhm_rentiva_popular_routes_type_icon` filtresi ile override edin (aşağıdaki Geliştirici uzantı noktalarına bakın).

## Kart tıklama davranışı — deep-link ön-doldurma

Her kart bir `<a>` elementi ile sarılmıştır. Ona tıklamak transfer arama sayfasına (filtreler ile çözümlenmiş, aşağıya bakın) seçilen `origin_id` ve `destination_id`'yi query parametresi olarak ekleyerek götürür:

```
.../transfer/?origin_id=73&destination_id=76
```

Transfer arama kısa kodu bu query parametrelerini okur ve `<select>` elementlerinde eşleşen seçenekleri otomatik seçer. Ziyaretçi şunu görür:

> **TESLİM ALMA KONUMU:** İstanbul Havalimanı (IST)
> **BIRAKMA KONUMU:** Taksim Ofis
> **TARİH:** _(boş — ziyaretçi girer)_
> **SAAT:** 10:00

…ve sadece tarih ekleyip göndermesi gerekir. "Ana sayfa kartına tıkla"dan "sonuçları gör"e yol dört etkileşim yerine iki etkileşime iner.

Ön-doldurma **geriye uyumludur**: query parametresi olmadan yüklenen bir transfer arama sayfası, v4.34.1'den önceki gibi davranır. Değişiklik tamamen ekleyicidir.

## Geliştirici uzantı noktaları

### `mhm_rentiva_popular_routes_view_all_url`

**Bölüm header link** hedefi için filtre ("Transfer arayın" linki). `resolve_view_all_url()` tarafından döndürülür.

```php
add_filter('mhm_rentiva_popular_routes_view_all_url', function ($url) {
    return home_url('/transfer/');
});
```

Bu filtre boş döndüğünde bölüm header linki gizlenir — henüz transfer arama sayfası olmayan kurulumlar için faydalı.

### `mhm_rentiva_popular_routes_search_url`

**Kart tıklama hedefi** taban URL'i için filtre (v4.34.1'de tanıtıldı). Bölüm header linkinden bağımsız, böylece tema'lar bunları farklı sayfalara yönlendirebilir.

```php
add_filter('mhm_rentiva_popular_routes_search_url', function ($url) {
    return home_url('/transfer-search/');
});
```

Boş olduğunda `mhm_rentiva_popular_routes_view_all_url` filtresine fallback yapar; o da `home_url('/transfer/')`'e fallback yapar.

### `mhm_rentiva_popular_routes_type_icon`

Kalkış-tipi ikonunu filtreler. Varsayılan ikon ve tip slug'ını alır.

```php
add_filter('mhm_rentiva_popular_routes_type_icon', function ($icon, $type) {
    if ($type === 'airport') {
        return '🛫';
    }
    return $icon;
}, 10, 2);
```

Marka diliniz farklı emoji veya kısa metin sembolü istediğinde faydalı.

### `TransferRouteProvider::get_popular_routes()`

Repository sınıfı public-ish API'nın parçası. Sanitize edilmiş bir argüman dizisi alır ve kalkış/varış verisi JOIN edilmiş rota nesneleri döndürür. Kendi kart markup'ını render etmek isteyen temalar bunu doğrudan çağırabilir:

```php
$routes = \MHMRentiva\Admin\Transfer\Engine\TransferRouteProvider::get_popular_routes([
    'limit'              => 6,
    'order'              => 'featured',
    'featured_only'      => false,
    'filter_origin_city' => 'Istanbul',
    'filter_origin_type' => 'airport',
]);

foreach ($routes as $route) {
    // $route->origin_name, $route->destination_name, $route->min_price,
    // $route->is_featured, $route->origin_type, vs.
}
```

Sorgu sonucu 1 saat boyunca transient-cache'lenir. `TransferRouteProvider::clear_cache()` çağrısı tüm cache varyantlarını temizler — admin route CRUD bunu otomatik yapar.

## Lite ve Pro davranışı

| Plan | Render edilen maksimum kart | Yöneticinin tanımlayabileceği maksimum rota |
| :--- | :--- | :--- |
| Lite | 3 | 3 (mevcut kota) |
| Pro | `limit` attribute (varsayılan 6, maks 50) | sınırsız |

Render edilen kart sayısının üst sınırı `Mode::maxTransferRoutes()` üzerinden enforce edilir. `limit="20"` kullanan bir Lite site sessizce 3'e iner — hata yok, upsell modal yok, bölüm sadece üç kart render eder.

## Boş durum

Eğer hiçbir rota eligibility filtresinden geçmezse (her iki uç `is_active=1` VE `allow_transfer=1`, ek kullanıcı filtreleri dahil), bölüm **hiç render edilmez** — "Yakında..." placeholder yok, boş grid yok, console gürültüsü yok. Yeni kurulumlar temiz görünür; doldurulmuş kurulumlar yalnızca sahip olduklarını gösterir.

Bu bilinçli. Boş-ama-mevcut bir bölüm bozuk gibi okunur; eksik bir bölüm görünmez.

## Ayrıca bakın

- [v4.34.0 sürüm notları](/blog/rentiva-v4.34.0-release) — özelliğin orijinal tanıtımı
- [v4.34.1 sürüm notları](/blog/rentiva-v4.34.1-release) — tıklanabilir kartlar + deep-link ön-doldurma
- [v4.34.2 sürüm notları](/blog/rentiva-v4.34.2-release) — transfer kartı ikon stili hotfix'i
- [Transfer arama kısa kodu](./transfer-search) — Popüler Rotaların deep-link yaptığı form
- [Transfer sonuçları kısa kodu](./transfer-results) — arama gönderiminden sonra render edilen sonuç sayfası
- [VIP Transfer modülü](../vip-transfer) — geniş transfer özelliği için operasyonel kılavuz
