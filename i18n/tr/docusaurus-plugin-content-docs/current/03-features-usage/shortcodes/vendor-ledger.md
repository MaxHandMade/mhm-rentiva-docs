---
title: Bayi defteri
description: Bayi-tarafı finansal defter kısa kodunun kullanım kılavuzu ve teknik referansı — filtrelemeli sayfalı işlem geçmişi.
sidebar_position: 29
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro özelliği
Bu sayfa **MHM Rentiva Pro** eklentisinin bir yeteneğini anlatır. WordPress.org'daki ücretsiz
Lite sürümünün parçası değildir; Lite'ın yanına kurulu Pro ve geçerli bir lisans gerektirir.
Tam ayrım için: [Sürümler — Lite ve Pro farkı](/docs/). Pro'yu edinmek için: [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Amaç
Bu sayfa `[rentiva_vendor_ledger]` kısa kodunu belgeler — bayi panelinde (`/panel/`) mevcut bayinin hesabındaki tüm işlemleri (rezervasyon komisyon kredisi, iadeler, ödemeler) listeleyen bayi-tarafı finansal defter. Halka açık yerleştirme için değil.
:::

# 📊 Bayi Defteri (finansal işlemler)

## İçerik
- Bu kısa kod nedir
- Kimlik doğrulama ve rol kilidi
- Render edilen işlem türleri
- Frontend kullanım (URL filtreleri)
- Pagination
- Boş durumlar
- Bayi panelinde nereye oturuyor

## Bu kısa kod nedir

`[rentiva_vendor_ledger]` bayinin finansal işlem geçmişini render eder — rezervasyon başına kazanılan krediler, ters çevrilen iadeler ve dağıtılan ödemeler — merkezi `Ledger` servisi tarafından desteklenir. Her satır işlem türünü, ilgili rezervasyonu (varsa), tutarı (WooCommerce currency ayarlarıyla biçimlendirilmiş) ve zaman damgasını gösterir.

Bu, bayinin dashboard'undaki kazanç rakamının arkasındaki **şeffaf kayıt**tır. Bir müşteri araç rezervasyonu yaptığında, otomatik olarak bir kredi girdisi buraya iner. Yönetici bir ödeme işlediğinde, karşılık gelen bir borç buraya iner. Bir rezervasyon iade edildiğinde, `PayoutService::create_refund_entry()` ters bir girdi yazar; defter asla dengeden çıkmaz.

## Kimlik doğrulama ve rol kilidi

Kısa kod iki kontrol çalıştırır:

1. `is_user_logged_in()` — anonim ziyaretçiler boş string alır.
2. Mevcut kullanıcı `rentiva_vendor` rolüne sahip olmalı — bayi olmayan kullanıcılar "Erişim Reddedildi. Yalnızca bayiler finansal defteri görüntüleyebilir." bildirimini görür.

Pro kilidi **sayfadan miras alınır** — tipik yerleştirme `/panel/`'dir, ki o zaten `vendor_marketplace` Pro özelliğini gerektirir.

## Render edilen işlem türleri

| Tür | Kaynak | Yön |
| :--- | :--- | :--- |
| Rezervasyon komisyonu | Rezervasyon ödendiğinde `OrderManager`, `Ledger::credit()` ile yazar | Kredi (+) |
| İade | İptal/iade'de `PayoutService::create_refund_entry()` ters girdi yazar | Borç (−) |
| Ödeme | Yönetici ödeme dispatch'i `Ledger::debit()` ile yazar | Borç (−) |
| Manuel düzeltme | Yönetici-tarafı manuel defter girdileri (nadir) | İkisi de |

Bayi dashboard'unda gösterilen running balance bayinin defterindeki `SUM(krediler) - SUM(borçlar)`'dır.

## Frontend kullanım

```shortcode
[rentiva_vendor_ledger]
```

Kısa kod attribute'u yok — kısa kod filtreleri URL query string'inden okur, bu da her filtre kombinasyonunu paylaşılabilir / yer-imlenebilir / bayi pagination kontrolünden linklenebilir kılar:

| Query parametresi | Amaç |
| :--- | :--- |
| `paged` | Sayfa numarası (sunucu-tarafı, varsayılan 1) |
| Diğer filter args | Tür, tarih aralığı, rezervasyon ID — `Ledger::query()` içinde işlenir |

Kısa kod her query parametresini özel `get_query_int()` / `get_query_string()` helper'ları üzerinden doğrular; DocBlock "complex shortcode wrappers limiting inputs securely via GET processing" notunu taşır.

## Pagination

Sunucu-tarafı. Varsayılan sayfa boyutu **15 girdi**'dir; `?paged=N` ilerletir. Render edilen grid'in altındaki pagination kontrolü aktif URL filtrelerini ileri taşır; sayfa 2'ye gitmek kullanıcının sayfa 1'de uyguladığı tarih aralığı veya tür filtresini korur.

## Boş durumlar

| Durum | Render |
| :--- | :--- |
| Henüz işlemi olmayan bayi | "Henüz işlem yok" placeholder'ı (örn. yepyeni bayi) |
| Filtre tüm satırları hariç tutuyor | "Bu filtrelere uyan işlem yok" + "Filtreleri Temizle" linki |
| Bayi olmayan kullanıcı | "Erişim Reddedildi. Yalnızca bayiler finansal defteri görüntüleyebilir." bildirimi |
| Giriş yapmamış kullanıcı | Boş string (sessiz) |

## Bayi panelinde nereye oturuyor

`/panel/` adresindeki bayi panelinin üç bölümü vardır; bu kısa kod finansal üçüncüye sahiptir:

| Panel bölümü | Kısa kod |
| :--- | :--- |
| İlanlar | `[rentiva_vehicle_submit]` (ekle/düzenle) + yerel bayi araç listesi |
| Rezervasyon Talepleri | `[rentiva_vendor_bookings]` ([referans](./vendor-bookings)) |
| Defter & Ödemeler | `[rentiva_vendor_ledger]` ← **bu sayfa** |

İşlem geçmişi için müşteri-tarafı eşdeğeri `[rentiva_payment_history]` ([referans](./payment-history)) — o bayinin kazançlarını değil müşterinin ödemelerini yüzeye çıkarır.

## İlgili mimari

- **`Ledger` servisi** (`MHMRentiva\Core\Financial\Ledger`) — bayi işlemleri için tek doğru kaynak. Tüm defter yazımları bu sınıf üzerinden geçer; running balance asla kaymaz.
- **`PayoutService::create_refund_entry()`** — bir rezervasyon iade edildiğinde ters yön defter girdisini yazar, böylece audit izi çift yönlü kalır.
- **`OrderManager`** — bir rezervasyon siparişi tamamlandığında defteri kredilendirir (lisans-tabanlı eklentiler için lisans anahtarı veren aynı hook, kira tarafında bayiyi de kredilendirir).

## Ayrıca bakınız

- [Bayi rezervasyonları kısa kodu](./vendor-bookings) — bayi-tarafı rezervasyon gelen kutusu
- [Müşteri ödeme geçmişi kısa kodu](./payment-history) — müşteri-tarafı eşdeğeri
- [Bayi onboarding](/docs/vendor/onboarding) — operasyonel kılavuz
- [Ödeme defteri belgeleri](/docs/vendor/payouts-ledger) — yönetici-tarafı ödeme akışı + muhasebe modeli
