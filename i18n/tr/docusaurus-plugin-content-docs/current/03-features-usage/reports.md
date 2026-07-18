---
id: reports
title: Raporlama
sidebar_position: 11
slug: /features-usage/reports
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro özelliği
Bu sayfa **MHM Rentiva Pro** eklentisinin bir yeteneğini anlatır. WordPress.org'daki ücretsiz
Lite sürümünün parçası değildir; Lite'ın yanına kurulu Pro ve geçerli bir lisans gerektirir.
Tam ayrım için: [Sürümler — Lite ve Pro farkı](/docs/). Pro'yu edinmek için: [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info React SPA (v4.37.x'ten beri)
Raporlar sayfası v4.37.x sürümünde (Faz 1b) **Chart.js'li bir React SPA**'ya taşındı. Tüm grafik render'ı ve veri çekimi REST API üzerinden istemci tarafında yapılır. 9 eski PHP/JS rapor dosyası silindi. Tarih filtresi ve 5 sekme bileşeni React bileşenleridir.
:::

Raporlar, MHM Rentiva'nin tum operasyonel verilerini finansal ve istatistiksel çıktılara dönüşturen gelişmiş analiz merkezidir. **MHM Rentiva > Raporlar** menusu üzerinden işletmenizin buyume trendlerini ve verimliligini izleyebilirsiniz.

:::caution Lite / Pro Farki
**Gelir Grafigi** ve **Yaklasan Operasyonlar** widget'lari yalnızca Pro sürümde kullanilabilir. Lite sürümde bu widget'lar gorunmez. Guard: `Mode::canUseAdvancedReports()`.
:::

---

## Global Performans Metrikleri (İstatistik Widget'i)

Sayfanin en üstünde, secilen tarih araligina gore güncellenen 4 ana performans gostergesi **2x2 grid** duzende, ikon ve renklerle zenginlestirilmis olarak yer alir:

- **Toplam Rezervasyonlar:** Belirlenen araliktaki tum işlemler.
- **Bu Ayin Geliri:** Mevcut ayin toplam cirosu (Para birimi simgesiyle).
- **Aktif Rezervasyonlar:** Su an devam eden (Müşteride olan) araç sayısı.
- **Doluluk Orani (%):** Filonuzun kapasite kullanim yuzdesi.

:::info Teknik Not
İstatistik widget'i `mhm_rentiva_dashboard_stats` cache key prefix'i ile önbelleklenir. Tum tarih hesaplamalari WordPress timezone'unu kullanir (`wp_date`).
:::

---

## 🧪 Rapor Sekmeleri ve Detaylar

MHM Rentiva, veriyi 5 farklı perspektiften işlemenize olanak tanır:

### 1. Genel Bakış (Overview)
Tüm raporların bir "özet panosu" (Snapshot) halidir. Gelir, Rezervasyon, Müşteri ve Araç analizlerini tek ekranda karşılaştırmalı grafiklerle sunar.

### 2. Gelir Raporu (Revenue) — Yalnızca Pro
Finansal sagliginizi detaylandirir.
- **Gelir Analitigi:** Günlük ciro ortalamasi ve toplam kazanc.
- **Gelir Egilimi:** Haftalik bazda (Pzt-Paz) hangi gunlerin daha karli olduğunu gosteren bar grafikler. Tarih formati `date_i18n(get_option('date_format'))` ile yerellestirilerek gosterilir.
- **Iptal Dataset'i:** Iptal edilen rezervasyonlar kırmızı kesikli cizgiyle ayri bir dataset olarak grafige yansitilir.
- **Günlük Detaylar:** Tarih bazli seffaf gelir listesi.

### 3. Rezervasyon Şikayeti (Distribution)
Rezervasyonların durum dağılımını ve iptal oranlarını analiz eder.
- **İptal Oranı (%):** Toplam rezervasyonlar içinde iptal edilenlerin yüzdesi.
- **Durum Dağılımı:** Onaylı, Beklemede, Tamamlandı ve İptal Edilenlerin adet/yüzde bazlı dökümü.

### 4. Araç Raporu (Vehicle Performance)
Hangi araçların veya kategorilerin daha çok kazandırdığını ölçer.
- **En Popüler Araçlar:** Kiralama adedi en yüksek olan modeller.
- **Kiralama Sayısı vs Toplam Gelir:** Her aracın toplamda ne kadar ciro ürettiği.

### 5. Müşteri Raporu (Customer Analysis)
Müşteri sadakatini ve harcama alışkanlıklarını takip eder.
- **Müşteri Özeti:** Toplam müşteri, tekrar gelen müşteri (Repeat) ve ortalama harcama tutarı.
- **Yaşam Döngüsü (LTV):** Yeni vs Geri gelen müşteri oranlarını grafikleştirir.

---

## 🔍 Veri Filtreleme ve Dışa Aktar

- **Özel Tarih Aralığı:** Başlangıç ve bitiş tarihleri seçerek geriye dönük (Historical) veya ileriye dönük analizler yapabilirsiniz.
- **Dinamik Güncelleme:** Filtre uygulandığı anda takvim ve grafikler anlık olarak yeniden hesaplanır.

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>📸 GÖRSEL: RAPORLAMA VE ANALİZ PANTOLARI</strong><br/>
  <em>mhm-rentiva-reports-all-tabs</em>
</div>

---

### Bölüm Özeti
- **Genel Bakış** ile işletmenin röntgenini çekin.
- **Gelir/Araç Raporları** ile en karlı segmentleri belirleyin.
- **Müşteri Raporları** ile sadakat stratejileri geliştirin.

## React Bileşenleri (v4.37.x+)

| Bileşen | Amaç |
| :--- | :--- |
| `ReportsPage` | Kök — başlık istatistikleri + sekme navigasyonu + tarih aralığı filtresi |
| `BookingsTab` | Rezervasyon dağılım grafiği + durum tablosu |
| `RevenueTab` | Gelir çubuk grafiği (Chart.js) + günlük detay listesi |
| `VehiclesTab` | Araç performans KPI + en iyi araçlar tablosu |
| `CustomersTab` | Müşteri yaşam döngüsü grafiği + özet metrikler |

**Tarih filtresi:** Mobilde (≤782px) dikey olarak yığılır — sınıf `.mhm-reports__date-filter`.

**REST Ad Alanı:** `GET /wp-json/mhm-rentiva/v1/reports/*`

---

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 12.05.2026 | 4.49.0 | Tarih filtresi dikey yığılma mobil düzeltmesi (782px breakpoint). |
| 11.05.2026 | 4.48.0 | İstatistik grid'i 2 sütun mobil düzen. |
| 06.05.2026 | 4.37.x | Chart.js ile tam React SPA geçişi. 9 eski PHP/JS dosyası kaldırıldı. ReportsRestController + 5 sekme bileşeni. |
| 27.03.2026 | 4.23.0 | Lite/Pro gating (Gelir Grafigi + Yaklasan Ops), stats widget 2x2 grid tasarimi, timezone düzeltmeleri (`wp_date`), iptal dataset'i, cache key prefix düzeltmesi dokumante edildi. |
| 19.03.2026 | 4.21.2 | Raporlar sayfası 5 farkli sekme ve tum grafik detaylariyla gerçek arayuze gore güncellendi. |
| 26.02.2026 | 4.21.0 | İlk sürüm oluşturuldu. |

