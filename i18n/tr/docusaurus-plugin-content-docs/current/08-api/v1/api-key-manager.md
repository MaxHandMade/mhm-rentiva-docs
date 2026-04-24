---
id: api-key-manager
title: API Anahtar Yönetimi (API Key Manager)
sidebar_label: API Key Manager
sidebar_position: 30
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
`APIKeyManager`, MHM Rentiva'nın dış dünya ile güvenli bir şekilde konuşmasını sağlayan anahtar (Key) yönetim merkezidir. Bu sayfa, anahtarların yaşam döngüsünü ve güvenlik standartlarını açıklar.
:::

# 🔑 API Anahtar Yönetimi

API anahtarları, üçüncü taraf yazılımların (Mobil App, ERP, Muhasebe Yazılımları vb.) Rentiva verilerine erişimini sağlayan dijital kimliklerdir.

---

## 🏗️ 1. Bileşen Rolü ve Mimarisi

`APIKeyManager` sınıfı, `AuthHelper` ile koordineli çalışarak şu görevleri üstlenir:
- **Benzersizlik:** Her anahtarın sistem genelinde benzersiz olmasını garanti eder.
- **Yetki Atama:** Anahtarlara `read_only` (Sadece Okuma) veya `read_write` (Okuma ve Yazma) yetkileri atar.
- **İzleme:** Hangi anahtarın ne zaman ve hangi IP'den kullanıldığını `AdvancedLogger` üzerinden kayıt altına alır.

---

## 🔄 2. Anahtar Yaşam Döngüsü

### Üretim (Generation)
- Anahtarlar, kriptografik olarak güvenli rastgele dizelerden (`wp_generate_password`) üretilir.
- Üretilen anahtarın hashlenmiş (şifrelenmiş) versiyonu veritabanında saklanır.

### Aktivasyon ve Kullanım
- Anahtar üretildiği an aktif olur.
- İstek sırasında `X-Rentiva-API-Key` başlığıyla gönderilir.

### Rotasyon (Rotation)
- **Güvenlik Politikası:** Anahtarların her 90 günde bir değiştirilmesi önerilir.
- **Grace Period:** Yeni anahtar üretildiğinde, eskisi 24 saat boyunca "geçersiz kılınana kadar" çalışmaya devam edebilir (Konfigürasyona bağlı).

---

## 🛡️ 3. Güvenlik ve Gizlilik Kuralları

- **Loglama Yasaktır:** API anahtarlarının yalın metin hali asla log dosyalarına (`debug.log`) yazılmamalıdır.
- **Veritabanı Güvenliği:** Anahtarlar veritabanında `MD5` veya `SHA-256` ile hashlenmiş olarak tutulur (WP standartlarına göre).
- **IP Kısıtlaması:** Belirli API anahtarları sadece tanımlanan IP adreslerinden gelen talepleri kabul edecek şekilde kısıtlanabilir.

---

## 🛠️ 4. Operasyonel Öneriler

1. **Ortam Ayrımı:** Geliştirme (Staging) ve Canlı (Production) ortamları için mutlaka farklı anahtarlar kullanın.
2. **Minimum Yetki:** Bir entegrasyon sadece veri okuyacaksa, ona hiçbir zaman `read_write` yetkisi vermeyin.
3. **Anlık İptal:** Bir sızıntı şüphesi durumunda, ilgili anahtar admin panelinden tek tıkla "İptal (Revoke)" edilmelidir.

## Bölüm Sonu Özeti
- `APIKeyManager`, tüm REST güvenliğinin kalbidir.
- Anahtarlar asla açık metin olarak saklanmaz veya paylaşılmaz.
- Periyodik rotasyon ve IP kısıtlaması en iyi uygulama (Best Practice) olarak kabul edilir.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | Anahtar yaşam döngüsü, Grace Period ve IP kısıtlama detayları eklendi. |
