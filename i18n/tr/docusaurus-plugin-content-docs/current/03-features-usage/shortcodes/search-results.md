---
title: Search results
description: Search results modülünün kullanım kılavuzu ve teknik detayları.
sidebar_position: 14
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
Bu sayfa, Search results modülü konusunu teknik ve operasyonel açıdan standart bir referans formatında açıklar.
:::

# 🚗 Search results

## İçindekiler
- Kullanım
- Özellikler
- Geliştirici Notları

Search results modülü, Rentiva platformundaki **vehicle** süreçlerini yönetmek ve kullanıcılara sunmak için tasarlanmıştır.

## Kullanım

:::tip GÖRSEL GELECEK
Buraya bu modülün frontend (kullanıcı tarafı) görünümünü temsil eden bir ekran görüntüsü eklenecektir.
:::

Bu modülü herhangi bir sayfaya veya yazıya eklemek için aşağıdaki kısa kodu (shortcode) kullanabilirsiniz:

```shortcode
[rentiva_search_results layout="grid"]
```

Gutenberg blok editöründe **"MHM Rentiva -> Search results"** bloğunu seçerek görsel olarak da ekleyebilirsiniz.

### Parametreler

Aşağıdaki parametreler kısa kod içerisinde kullanılabilir:

| Parametre | Varsayılan | Açıklama |
| :--- | :--- | :--- |
| `layout` | `grid` | Modülün **general** davranışını kontrol eder. |
| `show_filters` | `1` | Modülün **general** davranışını kontrol eder. |
| `results_per_page` | `12` | Modülün **general** davranışını kontrol eder. |
| `show_pagination` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_sorting` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_view_toggle` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_favorite_button` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_compare_button` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_booking_button` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_price` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_title` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_features` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_rating` | `1` | Modülün **general** davranışını kontrol eder. |
| `show_badges` | `1` | Modülün **general** davranışını kontrol eder. |
| `default_sort` | `price_asc` | İlk sıralama düzeni: `relevance`, `price_asc`, `price_desc`, `name_asc`, `name_desc` ya da `year_desc`. 6.2.0'ın artık okumadığı `order` ve `orderby` yerine kullanılır. |
| `class` | `(boş)` | Modülün **general** davranışını kontrol eder. |


## Özellikler

### 📱 Responsive Tasarım
- **Mobil:** Tek sütun düzeni.
- **Tablet (782px altı):** Optimize edilmiş görünüm.
- **Masaüstü:** Ayarlanan sütun veya genişlikte tam görünüm.

### 🚀 Performans Odaklı
- **Akıllı Önbellek:** Veritabanı sorguları sistem tarafından optimize edilerek önbelleğe alınır.
- **Koşullu Yükleme:** Statik dosyalar sadece modülün kullanıldığı sayfalarda yüklenir.

## Sidebar Filtreleri

### Lokasyon Filtresi (Çoklu Seçim)

v4.22.1 itibariyla lokasyon filtresi **radio buton** yerine **checkbox** kullanir. Bu sayede kullanıcılar ayni anda birden fazla lokasyon secebilir. Secilen lokasyonlar `IN()` SQL clause'u ile sorgulanir.

- Tekli seçim: Bir lokasyon secildiginde sadece o lokasyondaki araclar listelenir.
- Çoklu seçim: Birden fazla lokasyon isaretlendiginde, secilen lokasyonlarin herhangi birinde bulunan araclar gosterilir.

## Araç kartları ve tarih sorunları

- **Toplamda zorunlu hizmetler:** sayfa tarihlerle açıldığında (örneğin bir aramadan), her kart dönem toplamını gösterir. Bazı ek hizmetleri zorunlu işaretlediyseniz toplamın altındaki satır onları adıyla söyler; örneğin "Zorunlu hizmet dahil: Tam sigorta ₺25" (birden çok hizmet virgülle sıralanır ve tek bir toplam tutar yazılır; günlük ücretli hizmet gün sayısıyla çarpılır). Tarihsiz kartta günlük fiyat görünür, bu satır görünmez.
- **Fiyat ve düğme düzeni:** düzeni kartın kendi genişliği belirler. Dar kartta (örneğin ana sayfadaki öne çıkan araçlar ya da üç sütunlu araçlar sayfası) fiyat, **Rezervasyon yap** düğmesinin üstünde durur; geniş kartta (örneğin tarihli arama sonuçları) yan yana durur. Aynı satırdaki kartlar her zaman aynı görünür.
- **Sayı biçimi:** kilometre ve motor hacmi sayfanın diline göre yazılır: İngilizce "18,500 km" ve "1.6 L", Türkçe "18.500 km" ve "1,6 L".

- **Tarih sorunları:** tarihler rezerve edilemiyorsa (dönüş teslimden önce ya da geçmişte kalmış bir teslim alma saati) sayfa bunu listenin üstündeki bildirimle söyler ("Dönüş tarihi teslim alma tarihinden sonra olmalıdır." ya da "Teslim alma zamanı geçti. Lütfen daha ileri bir tarih veya saat seçin.") ve **Tarihleri değiştir** bağlantısı sunar. "Müsait araç yok" denmez; geçmiş bir tarihte araçlar tarihsiz listelenir.
- **Çok dilli siteler:** Polylang ya da WPML kullanan sitede filtre kenar çubuğundaki yakıt, vites ve kategori adları her ziyaretçiye kendi dilinde gösterilir. Bkz. [Yaygın sorunlar](../../06-faq/common-issues.md).

## Geliştirici Notları

- **HTML Yapısı:** Tüm kapsayıcılar `.mhm-rentiva-search-results-wrapper` sınıfı ile başlar.
- **Özelleştirme:** CSS değişkenleri (`--mhm-color-primary` vb.) global `css-variables.css` dosyasından miras alınır.
- **Musaitlik Sorgusu:** `QueryHelper::get_availability_subquery()` bos tarih parametrelerine karsi korumalıdir. `strtotime('')` PHP'de `false` yerine bugunun timestamp'ini dondurur; bu durum v4.22.1'de duzeltilmistir. Bos tarih gonderildiginde musaitlik filtresi devre disi kalir.
- **Lokasyon Sorgusu:** `QueryHelper::get_location_subquery()` hem tekli (`int`) hem de çoklu (`array`) lokasyon ID'lerini kabul eder.

## Bölüm Sonu Özeti
- Search results sayfası, tekil referans başlıklarıyla standart dokümantasyon yapısına alınmıştır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 18.11.2026 | 6.4.0 | Zorunlu hizmet satırı, kart düzeni, tarih sorunu bildirimi ve çok dilli filtre adları. |
| 11.10.2026 | 6.2.0 | `default_sort` değerleri belgelendi; 6.2.0'ın artık okumadığı `order` / `orderby` yerine kullanılır. |
| 27.03.2026 | 4.22.1 | Lokasyon filtresi radio -> checkbox (çoklu seçim). Musaitlik sorgusu bos tarih koruması. Geliştirici notlarına QueryHelper bilgileri eklendi. |
| 19.03.2026 | 4.21.0-docs | Sayfa alfabetik olarak sıralandı ve görsel yer tutucusu eklendi. |
