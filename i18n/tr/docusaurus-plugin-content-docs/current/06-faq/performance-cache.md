---
id: performance-cache
title: Performans ve Önbellek Yönetimi
sidebar_label: Performans ve Önbellek
sidebar_position: 40
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
Rentiva'nın yüksek trafikli araç kiralama sitelerinde verimli çalışması için kullanılan önbellekleme (caching) mimarisini ve yaygın performans sorunlarının çözümünü açıklar.
:::

# ⚡ Performans ve Önbellek Yönetimi

Sistem; Object Cache, Transients ve Page Cache olmak üzere üç ana katmanda optimizasyon sağlar.

---

## 🛠️ 1. Önbellekleme Katmanları

### WordPress Transients (Veritabanı Seviyesi)
- **Kullanım:** Fiyat hesaplamaları, karmaşık araç listeleme sorguları ve tedarikçi analizleri.
- ** TTL (Ömür):** Kritik veriler için genellikle 15 dakika (`900 saniye`).
- **Önemli:** Eğer Transients veritabanında aşırı birikir ve temizlenmezse, site genelinde yavaşlamaya neden olabilir. `mhm_rentiva_flush_cache` fonksiyonuyla manuel temizlenebilir.

### Object Cache (Bellek Seviyesi)
- **Kullanım:** Redis veya Memcached aktifse, sistem tüm nesne (Object) verilerini bellek üzerinden çeker.
- **Avantaj:** SQL sorgu sayısını %80'e kadar azaltır.
- **Dikkat:** Veri tutarsızlığı yaşanıyorsa Redis'i geçici olarak kapatıp sorunu test edin.

---

## 🐢 2. Yaygın Performans Sorunları

### Yavaş Araç Arama Sonuçları
- **Neden:** Çok fazla `WP_Query` meta anahtarı (Meta Key) üzerinden arama yapılması.
- **Çözüm:** Rentiva "Meta Optimizer" özelliğini aktifleştirin. Sık kullanılan meta verilerini (Marka, Model, Yıl vb.) ayrı bir tabloda veya optimize edilmiş bir index yapısında saklamayı düşünün.

### Admin Panelinde "Yönetim" Sayfalarının Yavaşlığı
- **Neden:** Çok fazla rezervasyon verisinin (10k+) aynı anda listelenmesi.
- **Çözüm:** Sayfalama (Pagination) sayısını düşürün (Varsayılan: 20). Gereksiz sütunları "Ekran Tercihleri" menüsünden kapatın.

---

## 🕒 3. Gecikmiş Veri (Stale Data) Sorunları

### Bir ayarı değiştirdim ama frontend'de yansımadı?
- **Olası Nedenler:**
    1. **Page Cache:** WP Rocket, LiteSpeed gibi eklentilerin sayfa önbelleği eski kalmıştır.
    2. **Fragment Cache:** Fiyat tablosu veya SSS gibi alanlar bağımsız önbelleğe sahip olabilir.
- **Çözüm:** Rentiva > Hızlı İşlemler > Cache Sıfırla butonuna basın.

---

## 📈 4. İzleme ve Ölçüm (Monitoring)

Sitenizin performansını takip etmek için şunları izleyin:
- **TTFB (Time to First Byte):** Sunucu hızı ve PHP yürütme süresi.
- **Sorgu Sayısı (SQL Queries):** "Query Monitor" eklentisiyle Rentiva sorgularının toplam içindeki payını görün.
- **Cron Jobs:** Finansal güncellemelerin veya temizlik işlemlerinin düzenli çalışıp çalışmadığını kontrol edin.

## Denetim Listesi
1. Redis/Memcached durumunu kontrol edin.
2. Sayfa önbellekleme istisnalarını (Checkout sayfası hariç tutulmalıdır) doğrulayın.
3. Gereksiz meta sorgularını optimize edin.
4. Periyodik olarak "Database Cleanup" yapın.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | Object Cache, Transients ve Stale Data (Eskimiş Veri) senaryoları eklendi. |
