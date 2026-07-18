---
title: Bayi rezervasyon listesi
description: Bayi-tarafı rezervasyon gelen kutusu kısa kodunun kullanım kılavuzu ve teknik referansı — mevcut bayinin araçlarına yapılan tüm rezervasyonları listeler.
sidebar_position: 28
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro özelliği
Bu sayfa **MHM Rentiva Pro** eklentisinin bir yeteneğini anlatır. WordPress.org'daki ücretsiz
Lite sürümünün parçası değildir; Lite'ın yanına kurulu Pro ve geçerli bir lisans gerektirir.
Tam ayrım için: [Sürümler — Lite ve Pro farkı](/docs/). Pro'yu edinmek için: [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Amaç
Bu sayfa `[rentiva_vendor_bookings]` kısa kodunu belgeler — bayi panelinde (`/panel/`) müşterilerin mevcut bayinin araçlarına yaptığı tüm rezervasyonları listeleyen gelen kutusu. Halka açık yerleştirme için değil.
:::

# 📥 Bayi Rezervasyonları (panel gelen kutusu)

## İçerik
- Bu kısa kod nedir
- Kimlik doğrulama ve rol kilidi
- Frontend kullanım
- Attribute referansı
- Boş durumlar
- Bayi panelinde nereye oturuyor

## Bu kısa kod nedir

`[rentiva_vendor_bookings]` **bayi-yalnız bir panel widget'ıdır**. Mevcut giriş yapmış kullanıcı `rentiva_vendor` rolüne sahip olmalı; aksi halde kısa kod boş string döner. Çıktı, alttaki aracın `post_author`'ı mevcut kullanıcıyla eşleşen tüm `vehicle_booking` postlarının listesidir — bir başka deyişle, müşterinin bu bayiye ait bir araca yaptığı her rezervasyon.

Bu, müşteri-tarafı "rezervasyonlarım" listesi **değildir** (`[rentiva_my_bookings]` o iş için). Müşteri "rezervasyonlarım" **mevcut kullanıcının yaptığı** rezervasyonları okur; bayi rezervasyonları **mevcut kullanıcının envanterine sahip olduğu** rezervasyonları okur. İkisi bilinçli olarak ayrı kısa kodlar çünkü bayi-tarafı sorgular müşterinin kimliğini de yüzeye çıkarmak zorunda, müşteri-tarafı sorgular ise aracı ve bayiyi yüzeye çıkarır.

`/panel/` adresindeki bayi panel sayfası tarafından dahili kullanılır (panel İlanlar, Rezervasyon Talepleri ve Defter & Ödemeler arasında geçiş yapar). Özel bir bayi panel düzeni kuran geliştiriciler bu kısa kodu Pro-kilitli bir sayfaya isteğe bağlı olarak yerleştirebilir.

## Kimlik doğrulama ve rol kilidi

Çıktıyı iki katman korur:

1. **Auth zorunlu.** Registry'de `requires_auth = true` — giriş yapmamış ziyaretçiler `mhm_rentiva_shortcode_auth_error` filtresi üzerinden bir "Auth error" bildirimi görür (varsayılan: "Bu içeriği görüntülemek için lütfen giriş yapın.").
2. **Rol zorunlu.** Mevcut kullanıcı `rentiva_vendor` rolünden yoksunsa handler `error => 'not_vendor'` ile çıkar. Şablon o dalda hiçbir şey render etmez.

Pro kilidi **sayfadan miras alınır** — tipik yerleştirme `/panel/`'dir, ki o zaten `vendor_marketplace` Pro özelliğini gerektirir. Lite bayilerin panel sayfasına erişimi en başta yoktur.

## Frontend kullanım

```shortcode
[rentiva_vendor_bookings]
```

Kısa kod yalnızca tek attribute okur, `limit`:

```shortcode
[rentiva_vendor_bookings limit="10"]
```

Sorgu yolu:

1. Mevcut bayinin sahip olduğu tüm `vehicle` ID'lerini al (`post_author = $user_id`, `post_status` `[publish, pending]` içinde).
2. `vehicle_booking` sorgusunu o vehicle ID'lerine `_mhm_vehicle_id` meta üzerinden join ederek çalıştır.
3. Sonuç listesini müşteri kimliği, araç, tarihler ve durumla render et.

Pagination sunucu-tarafıdır ve istekten `?paged=N` okur.

## Attribute referansı

| Attribute | Varsayılan | Tip | Amaç |
| :--- | :--- | :--- | :--- |
| `limit` | `10` | int | Sayfa başına render edilecek rezervasyon sayısı. |

## Boş durumlar

| Durum | Render |
| :--- | :--- |
| Sahip olunan araç sayısı sıfır olan bayi | "Henüz envanter yok" ipucuyla boş liste |
| Araçları olan ama sıfır rezervasyonu olan bayi | "Henüz rezervasyon yok" ipucuyla boş liste |
| Bayi olmayan kullanıcı | Boş string (sessiz) |
| Giriş yapmamış kullanıcı | Auth error bildirimi (`mhm_rentiva_shortcode_auth_error` ile filtrelenir) |

## Bayi panelinde nereye oturuyor

`/panel/` adresindeki bayi paneli üç bölümden oluşur (müşterinin `/hesabim/`'i ve bayinin `/panel/`'i bilinçli olarak ayrı route'lardır):

| Panel bölümü | Kısa kod |
| :--- | :--- |
| İlanlar | `[rentiva_vehicle_submit]` (ekle/düzenle) + yerel bayi araç listesi |
| Rezervasyon Talepleri | `[rentiva_vendor_bookings]` ← **bu sayfa** |
| Defter & Ödemeler | `[rentiva_vendor_ledger]` ([referans](./vendor-ledger)) |

Müşteri-tarafı eşdeğeri `[rentiva_my_bookings]` ([referans](./my-bookings)) — o `_mhm_customer_user_id` meta'sı üzerinde çalışır, bu ise aracın author'ı üzerinde çalışır.

## Ayrıca bakınız

- [Bayi defter kısa kodu](./vendor-ledger) — bayi finansal işlem listesi
- [Bayi başvuru formu](./vendor-apply) — onboarding
- [Bayi profil sayfası](./vendor-profile) — halka açık güven sayfası
- [Müşteri "rezervasyonlarım" kısa kodu](./my-bookings) — müşteri-tarafı eşdeğeri (farklı sorgu yolu)
- [Bayi onboarding](/docs/vendor/onboarding) — operasyonel kılavuz
