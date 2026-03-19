---
id: test-suite
title: Test Suite & Altyapı
sidebar_label: Test Araçları
sidebar_position: 2
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, Rentiva'nın test ekosistemini (PHPUnit konfigürasyonu, Docker wrapper'ları ve özel Listener yapısı) geliştirenlere açıklar.
:::

# 🛠️ Test Suite Mimarisi

Rentiva, WordPress için özelleştirilmiş bir **PHPUnit 9.6** altyapısı kullanır. Bu altyapı, testlerin hem hızını hem de veritabanı temizlik kalitesini garanti eden özel araçlarla güçlendirilmiştir.

---

## 🏗️ Core Bileşenler

### 1. PHPUnit Konfigürasyonu (`phpunit.xml`)
Test süreci `tests/bootstrap.php` üzerinden WordPress test ortamını ayağa kaldırır.
- **Coverage:** `./src/` dizinini %100 kapsama hedefiyle izler.
- **Multisite:** Standart olarak `0` (false) ayarlıdır.

### 2. MHM Test Listener (`MHM_Test_Listener`)
"Hybrid Reset" stratejisini uygulayan özel bir dinleyicidir.
- **Görev:** İzole edilmiş test koşturmalarında (`MHM_TEST_IS_ISOLATED`) oluşturulan geçici tabloları (`wptests_` prefix) otomatik olarak temizler.
- **Güvenlik:** Sadece kontrollü pattern'e sahip tabloları siler (`DROP TABLE IF EXISTS`).

---

## 🐋 Docker ve CLI Kullanımı

Testler, Windows/MacOS/Linux fark etmeksizin izole bir **Docker** konteynerı içinde çalıştırılır.

```bash
# Tüm testleri koştur
npm run test

# Sadece belirli bir grubu koştur
docker exec -it mhm-container vendor/bin/phpunit --group financial
```

---

## 📊 Kapsama Raporu (Code Coverage)

Sistem, kritik finansal ve çekirdek (Core) modüller için katı kapsama kuralları uygular.
- **HTML Report:** `build/coverage` dizininde üretilir.
- **Kritik Modüller:** `src/Core/Financial` ve `src/Core/Security` modülleri her zaman denetlenir.

---

## 🧩 Test Fixtures (Veri Hazırlama)

Test verileri `tests/fixtures` dizininde tutulur.
- **Idempotency:** Her test suit öncesi veritabanı temizlendiği için testler birbirine bağımlı değildir.
- **Isolation:** `MHM_Test_Listener` sayesinde paralel test koşturmalarında veriler çakışmaz.

## Bölüm Sonu Özeti
- Test altyapısı **PHPUnit 9.6** üzerine kuruludur.
- **Hybrid Reset** stratejisi ile veritabanı kirliliği önlenir.
- Geliştirme sürecinde `npm run test` komutu ana doğrulama noktasıdır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | PHPUnit 9.6 ve MHM_Test_Listener dökümantasyonu eklendi. |

