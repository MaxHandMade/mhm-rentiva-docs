---
id: badge-standards
title: Rozet Standartları ve Kullanım Kılavuzu
sidebar_label: Badge Standards
sidebar_position: 120
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-standard_v2-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

:::info Amaç
Bu kılavuz, MHM Rentiva dökümantasyon sayfalarında kullanılan görsel rozetlerin (badges) standartlarını, renk kodlarını ve kullanım kurallarını tanımlar.
:::

# 🏷️ Rozet Standartları ve Kullanım Kılavuzu

Dökümantasyonun güncelliğini ve teknik seviyesini hızlıca görselleştirmek için `Shields.io` tabanlı rozetler kullanılır.

---

## 🔝 1. Güncel Rozet Formatı (v4.21.2)

Her sayfanın başında bulunması gereken standart dizilim:

```markdown
![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)
```

---

## 🏛️ 2. Rozet Bileşenleri

### Versiyon Rozeti (Version)
- **Renk:** Mavi (`blue`)
- **Format:** `version-{plugin_version}`
- **Kullanım:** Eklentinin hangi ana sürümüyle uyumlu olduğunu belirtir.

### Güvenlik ve Uyum Rozetleri (Security/Compliance)
- **Renk:** Yeşil (`green`) veya Koyu Yeşil (`0f766e`)
- **Değerler:**
  - `WPCS Compliant`: WordPress Kod Standartlarına uygunluk.
  - `Security Hardened`: Güvenlik sıkılaştırması yapılmış.
  - `SQL Safe`: SQL Injection korumalı.

### Güncelleme Rozeti (Updated)
- **Renk:** Turuncu (`orange`)
- **Format:** `last updated-DD.MM.YYYY`
- **Kullanım:** Sayfanın en son ne zaman incelendiğini veya güncellendiğini gösterir.

---

## 🎨 3. Stil Parametreleri

Tüm rozetler görsel bütünlük için şu parametreleri kullanmalıdır:
- **`style=flat-square`**: Köşeli ve modern bir görünüm sağlar.
- **`logo=...`**: Gerekli durumlarda marka logoları eklenebilir.

---

## 📏 4. Kullanım Kuralları

1. **Konum:** Rozetler, YAML meta verilerinden (frontmatter) hemen sonra, ana başlıktan (`#`) önce eklenmelidir.
2. **Sıralama:** Standart sıra; **Versiyon** → **Döküman Tipi/Güvenlik** → **Son Güncelleme** şeklindedir.
3. **Boşluk:** Rozetler arasında birer boşluk bırakılmalıdır.
4. **Doğruluk:** Güncelleme tarihi her zaman işlemin yapıldığı günün tarihi olmalıdır.

---

## 📝 5. Örnek Uygulama

```markdown
---
id: sample-page
title: Örnek Sayfa
---
![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

# Örnek Başlık
İçerik buraya gelir...
```

## Bölüm Sonu Özeti
- Standart rozet kullanımı, dökümantasyonun profesyonel görünmesini sağlar.
- v4.21.2 ile tüm sayfalar yeni formatta normalize edilmiştir.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | Sürüm v4.21.2 standartları ve yeni renk kodları eklendi. |
