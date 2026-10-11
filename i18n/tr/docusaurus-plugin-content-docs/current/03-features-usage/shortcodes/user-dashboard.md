---
title: Master account dashboard (emekli)
description: Müşteri paneli kısa kodu, bloğu ve Elementor bileşeni Rentiva 6.2.0'da emekliye ayrıldı; müşteriler Hesabım sayfasını kullanır.
sidebar_position: 13
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::warning 6.2.0'da emekliye ayrıldı
Ayrı müşteri paneli emekliye ayrıldı. Müşterinin ana sayfası artık rezervasyonların, favorilerin ve ödemelerin listelendiği **Hesabım** sayfasıdır (WooCommerce hesap sayfası). `[rentiva_user_dashboard]` kısa kodunu, bloğunu ya da Elementor bileşenini sayfalarınızdan kaldırın.
:::

# 🚗 Master account dashboard (emekli)

## İçindekiler
- Kısa kod artık ne gösteriyor
- Müşteriler bunun yerine nereye gidiyor
- Geliştirici Notları

## Kısa kod artık ne gösteriyor

Kısa kod hâlâ kayıtlı; içinde bu kısa kod bulunan bir sayfa bozulmaz:

```shortcode
[rentiva_user_dashboard]
```

Rentiva 6.2.0'dan beri kısa kod, **Master account dashboard** bloğu ve Elementor bileşeni artık bir panel çizmiyor:

| Sayfayı kim görüntülüyor | Ne görüyor |
| :--- | :--- |
| Giriş yapmış müşteri | Hesabın taşındığını söyleyen tek bir satır ve Hesabım sayfasına giden bir **Hesabıma git** bağlantısı. |
| Ziyaretçi (giriş yapmamış) | Hiçbir şey. |
| Yönetici | Aynı satır ve bağlantı, ayrıca bu panelin kullanımdan kalktığını ve sayfadan kaldırılması gerektiğini söyleyen bir uyarı. Uyarıyı yalnız yöneticiler görür. |

- Blok ve Elementor bileşeni düzenleyicilerde gizlendi; yeni sayfalara artık eklenemez.
- **MHM Rentiva > Kısa Kod Sayfaları** artık bu sayfayı oluşturmayı önermiyor.
- Kısa adı `panel` olan bir sayfada ziyaretçiler ve giriş yapmış, yönetici olmayan kullanıcılar Hesabım'a yönlendirilir; yöneticiler sayfayı açmaya devam edebilir.
- Kısa kod parametre almaz.

## Müşteriler bunun yerine nereye gidiyor

**Hesabım** sayfasını kullanın. Bölümleri şu sayfalarda anlatılıyor:

- [Rezervasyonlarım](./my-bookings)
- [Favorilerim](./my-favorites)
- [Ödeme Geçmişi](./payment-history)

## Geliştirici Notları

- **HTML Yapısı:** Bildirim `.mhm-rentiva-retired-dashboard` içinde yer alır; yönetici uyarısı `.mhm-rentiva-retired-dashboard__admin` sınıfını taşır.
- **Filtre:** `mhmrentiva_retired_dashboard_notice` basılan işaretlemeyi filtreler (`$html`, `$role` = `customer` ya da `admin`).
- **6.2.0'da kaldırılanlar:** müşteri paneli sınıfları (`CustomerDashboard`, `DashboardConfig`, `DashboardContext`, `DashboardDataProvider`, `DashboardNavigation`) ve `mhmrentiva_dashboard_*` hook'ları. Ayrıntı için [6.2.0 sürüm yazısına](/blog/rentiva-v6.2.0-release) bakın.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 11.10.2026 | 6.2.0 | Sayfa yeniden yazıldı: müşteri paneli emekliye ayrıldı; müşteriler Hesabım sayfasını kullanıyor. |
| 19.03.2026 | 4.21.0-docs | Sayfa alfabetik olarak sıralandı ve görsel yer tutucusu eklendi. |
