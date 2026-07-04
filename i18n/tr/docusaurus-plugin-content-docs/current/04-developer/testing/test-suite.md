---
id: test-suite
title: Test Suite & Altyapı
sidebar_label: Test Araçları
sidebar_position: 2
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
Bu sayfa, Rentiva'nın test ekosistemini (PHPUnit konfigürasyonu, CI matrisi, Docker wrapper'ları ve özel Listener yapısı) geliştirenlere açıklar.
:::

# Test Suite Mimarisi

Rentiva, WordPress için özelleştirilmiş bir **PHPUnit 9.6** altyapısı kullanır. Bu altyapı, testlerin hem hızını hem de veritabanı temizlik kalitesini garanti eden özel araçlarla güçlendirilmiştir.

---

## Mevcut Test Baseline

| Sürüm | Test | Assertion | Atlanmış | Tarih |
|---|---|---|---|---|
| **v4.63.0** (güncel) | **1.366** | **4.060** | 26 | 02.07.2026 |
| v4.60.0 | 1.350 | — | — | 23.06.2026 |
| v4.58.2 | 1.237 | 3.736 | 15 | 22.05.2026 |
| v4.58.1 | 1.231 | 3.726 | 15 | 21.05.2026 |
| v4.58.0 | 1.215 | — | — | 15.05.2026 |
| v4.39.0 | 1.115 | 3.425 | — | 10.05.2026 |
| v4.38.2 | 1.070 | 3.332 | 7 | 09.05.2026 |
| v4.37.0 | 982 | 3.162 | — | 05.05.2026 |
| v4.27.0 | 728 | — | 6 | 23.04.2026 |
| v4.26.5 | 720 | 2.601 | 6 | 15.04.2026 |
| v4.23.0 | 567 | 2.036 | 4 | 26.03.2026 |
| v4.20.0 (ilk kilitli temel) | 268 | 1.379 | — | — |

> **Atlanan testler hakkında not:** 26 atlanan test, WooCommerce'in PHPUnit test veritabanında yüklenmediği ortamlarda atlanan WooCommerce-bağımlı entegrasyon testleridir (`WP_Ajax_UnitTestCase`) — bilinen bir ortam sınırlaması, bir kusur değil. Bu kod yollarının doğruluğu ayrıca canlı `wp eval` reprodüksiyonu ve tarayıcı smoke testleriyle doğrulanır. Daha önce dokümante edilen `saas_block` env-quota baseline başarısızlıkları artık geçerli değil — o orchestration katmanı v4.60.0'da kaldırıldı.

---

## Test Kategorileri

### Shortcode Render Testleri
13 adet shortcode render test dosyası ile tum shortcode'larin çıktısi dogrulanir. Bu testler CAM pipeline'i uctan uca kapsar: `AllowlistRegistry` -> `CanonicalAttributeMapper` -> shortcode `render()`.

### SettingsSanitizer Testleri
4 adet SettingsSanitizer test dosyası ile ayar değerlerinin sanitizasyonu ve validasyonu test edilir.

### AllowlistRegistry Testleri
199 benzersiz attribute key, 19 TAG_MAPPING girişi ve enum değerlerinin tutarliligi dogrulanir.

### KeyNormalizer Testleri
27 test, 32 assertion — camelCase/snake_case dönüşumu, alias çözümlemesi ve edge case'ler.

---

## CI Matrisi

CI pipeline'i asagidaki matris uzerinde çalışır:

| | PHP 8.1 | PHP 8.2 | PHP 8.3 |
|---|---|---|---|
| **WP 6.7** | PHPUnit | PHPUnit | PHPUnit |
| **WP latest** | PHPUnit | PHPUnit + PHPCS | PHPUnit |

- **Toplam:** 6 paralel job (PHP 8.1/8.2/8.3 x WP 6.7/latest)
- **PHPCS gate:** PHP 8.2 uzerinde `composer phpcs` komutuyla çalışır ve zorunlu gecit noktasidir
- Tum job'lar başarılı olmadan merge yapilamaz

---

## Core Bileşenler

### 1. PHPUnit Konfigurasyonu (`phpunit.xml`)
Test süreci `tests/bootstrap.php` üzerinden WordPress test ortamini ayaga kaldirir.
- **Coverage:** `./src/` dizinini %100 kapsama hedefiyle izler.
- **Multisite:** Standart olarak `0` (false) ayarlidir.

### 2. MHM Test Listener (`MHM_Test_Listener`)
"Hybrid Reset" stratejisini uygulayan ozel bir dinleyicidir.
- **Gorev:** Izole edilmis test kosturmalarinda (`MHM_TEST_IS_ISOLATED`) oluşturulan gecici tabloları (`wptests_` prefix) otomatik olarak temizler.
- **Güvenlik:** Sadece kontrollu pattern'e sahip tabloları siler (`DROP TABLE IF EXISTS`).

---

## Docker ve CLI Kullanimi

Testler, Windows/MacOS/Linux fark etmeksizin izole bir **Docker** konteyneri içinde çalıştırilir.

```bash
# Tum testleri kostur
npm run test

# Sadece belirli bir grubu kostur
docker exec -it mhm-container vendor/bin/phpunit --group financial

# PHPCS kontrolu (CI gate)
composer phpcs
```

---

## Kapsama Raporu (Code Coverage)

Sistem, kritik finansal ve cekirdek (Core) moduller için kati kapsama kuralları uygular.
- **HTML Report:** `build/coverage` dizininde üretilir.
- **Kritik Moduller:** `src/Core/Financial` ve `src/Core/Security` modulleri her zaman denetlenir.

---

## Test Fixtures (Veri Hazirlama)

Test verileri `tests/fixtures` dizininde tutulur.
- **Idempotency:** Her test suit öncesi veritabanı temizlendigi için testler birbirine bagimli değildir.
- **Isolation:** `MHM_Test_Listener` sayesinde paralel test kosturmalarinda veriler cakismaz.

## Bölüm Sonu Özeti
- Test altyapısı **PHPUnit 9.6** üzerine kuruludur.
- **1.366 test, 4.060 assertion, 26 atlanmış** (v4.63.0 baseline; atlamalar bilinen bir WooCommerce-PHPUnit ortam sınırlaması, kusur değil).
- CI matrisi **6 job** (PHP 8.1/8.2/8.3 x WP 6.7/latest) + PHPCS gate.
- **Hybrid Reset** stratejisi ile veritabanı kirliligi onlenir.
- Gelistirme sürecinde `npm run test` komutu ana doğrulama noktasidir.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 02.07.2026 | 4.63.0 | Baseline tablosu yenilendi (güncel satır v4.63.0 — 1.366 / 4.060 / 26). Bayat `saas_block` notu kaldırıldı (o orchestration katmanı v4.60.0'da kaldırılmıştı); 26 atlamanın gerçek nedenini açıklayan doğru bir not eklendi (WooCommerce-PHPUnit ortam sınırlaması). v4.60.0 milestone satırı eklendi. |
| 22.05.2026 | 4.58.2 | Baseline tablosu yenilendi (güncel satır v4.58.2 — 1.237 / 3.736 / 15). 7 dokümante `saas_block` env-quota baseline başarısızlığı not edildi (kapsam dışı). v4.23.0 ile v4.58.2 arası ara milestone'lar eklendi. |
| 27.03.2026 | 4.23.0 | Test baseline v4.23.0 (567/2036/4), CI matrisi (6 job + PHPCS), test kategorileri (shortcode render, sanitizer, allowlist, key normalizer) eklendi. |
| 19.03.2026 | 4.21.2 | PHPUnit 9.6 ve MHM_Test_Listener dokumantasyonu eklendi. |

