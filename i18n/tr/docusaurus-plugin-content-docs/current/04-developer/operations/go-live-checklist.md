---
id: go-live-checklist
title: Canlıya Alma Kontrol Listesi (Release Protocol)
sidebar_label: Canlıya Alma Checklist
sidebar_position: 3
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::important Kritik Uyarı
Canlı ortama geçiş öncesi tüm maddelerin "Yeşil" (Passed) olması zorunludur. Özellikle finansal anahtarların doğruluğu telafi edilemez veri hatalarını önler.
:::

# 🚀 Canlıya Alma Kontrol Listesi

Bu protokol, Rentiva sürüm geçişlerinde sistem sürekliliğini ve veri güvenliğini garanti altına almak için tasarlanmıştır.

---

## 🏗️ 1. Altyapı ve Lisans Kontrolleri

- [ ] **Pro Mode Activation:** `Mode::featureEnabled()` kontrolleri için lisans anahtarı canlı sunucuda doğrulandı mı?
- [ ] **SQL Migrations:** `{$wpdb->prefix}mhm_rentiva_*` tabloları için gerekli `up()` scriptleri hatasız çalıştı mı?
- [ ] **SSL Enforcement:** Payout ve Webhook trafiğinin sadece HTTPS üzerinden aktığı teyit edildi mi?
- [ ] **SMTP / Mailer:** `Mailer::send()` üzerinden deneme e-postası başarıyla ulaştı mı?

---

## 💰 2. Finansal Güvenlik Ayarları

- [ ] **HMAC Secrets:** Üretim ortamı (Production) için özel API Secret ve Key setleri doğru girildi mi?
- [ ] **Webhook Idempotency:** Tekrarlanan callback'lerin `Ledger` üzerinde çift kayıt oluşturmadığı (Test mode kapalıyken) doğrulandı mı?
- [ ] **Currency Codes:** Mevcut WooCommerce para birimi ayarlarının Rentiva `CurrencyHelper` ile uyumlu olduğu teyit edildi mi?
- [ ] **Governance Freeze:** Kritik finansal yetkiler (Bulk Approve) sadece yetkili `Checker` rollerine atandı mı?

---

## ⚡ 3. Uygulama ve Performans

- [ ] **Asset Minification:** CSS ve JS dosyaları üretim ortamı için minifiye edildi mi?
- [ ] **Cache Flush:** `CacheManager` üzerinden eski sürümden kalan transient ve nesne cache'leri temizlendi mi?
- [ ] **Shortcode Audit:** Kritik rezervasyon sayfalarındaki `[rentiva_...]` kısa kodları doğru render ediliyor mu?
- [ ] **Cron Health:** `wp-cron` üzerinden tetiklenen finansal raporlama işleri aktif mi?

---

## 🚨 4. Acil Durum (Rollback) Hazırlığı

- [ ] **DB Backup:** Güncel veritabanı yedeğinin erişilebilirliği kontrol edildi mi?
- [ ] **Version Rollback:** Hata durumunda bir önceki stabil sürüme dönmek için `git` veya paket yedeği hazır mı?
- [ ] **Communication:** Tüm paydaşlar (Satıcılar, Operasyon Ekibi) sürüm penceresi hakkında bilgilendirildi mi?

## Bölüm Sonu Özeti
- Canlıya alım protokolü, sürüm yayınlama sürecinin ayrılmaz bir parçasıdır.
- Finansal maddelerdeki tek bir eksiklik, sürümü "Blok" statüsüne sokar.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | Sayfa, PRO aktivasyon ve finansal güvenlik maddeleriyle genişletildi. |

