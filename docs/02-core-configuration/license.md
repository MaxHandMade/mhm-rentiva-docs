---
id: license
title: Lisans Yönetimi
sidebar_label: Lisans Yönetimi
slug: /core-configuration/license
---

![Version](https://img.shields.io/badge/version-4.9.8-blue?style=flat-square) ![Security](https://img.shields.io/badge/security-WPCS%20Compliant-green?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-11.02.2026-orange?style=flat-square)

# License Sayfası

`MHM Rentiva > License`, eklentinin lisans anahtarını yönetmek, aktivasyon durumu ve kullanım kısıtlarını görmek için kullanılır.

## Temel İşlevler

- **Lisans Anahtarı Girişi:** Satın alma sonrası aldığınız anahtarı girip “Activate” butonuyla doğrulama yapabilirsiniz.
- **Aktivasyon Durumu:** Lisansın aktif/pasif bilgisi, destek süresi ve kalan gün sayısı gösterilir.
- **Domain Yönetimi:** Lisans tek domain veya çoklu domain desteğine göre bağlı siteleri listeler; gerekirse “Deactivate” ile lisansı başka bir siteye taşıyabilirsiniz.
- **Kısıtlamalar:** Lite sürümdeki araç, rezervasyon ve modül limitleri bu ekranda özetlenir. Detaylar için aşağıdaki tabloya bakınız.

## Lite ve Pro Sürüm Karşılaştırması

Aşağıdaki tablo, MHM Rentiva'nın Lite (Ücretsiz) ve Pro (Ücretli) sürümleri arasındaki özellik farklarını ve limitleri göstermektedir.

| Özellik | Lite (Ücretsiz) | Pro (Premium) |
| :--- | :--- | :--- |
| **Maksimum Araç** | 3 Araç | **Sınırsız** |
| **Maksimum Rezervasyon** | 50 Rezervasyon | **Sınırsız** |
| **Maksimum Müşteri** | 3 Müşteri | **Sınırsız** |
| **Ek Hizmetler** | 4 Hizmet | **Sınırsız** |
| **VIP Transfer Rotası** | 3 Rota | **Sınırsız** |
| **Galeri Resmi** | 3 Resim / Araç | **Sınırsız** |
| **Rapor Tarih Aralığı** | Son 30 Gün | **Sınırsız** |
| **Rapor Satır Limiti** | 500 Satır | **Sınırsız** |
| **Mesajlaşma Sistemi** | ❌ Yok | ✅ Var |
| **Dışa Aktarım** | Sadece CSV | CSV, JSON |
| **Ödeme Altyapısı** | WooCommerce | WooCommerce |
| **REST API Erişimi** | Sınırlı | Tam Erişim |
| **Gelişmiş Raporlar** | ❌ Sınırlı | ✅ Tam Erişim |

> **Not:** Lite sürümü küçük işletmeler ve test amaçlı tasarlanmıştır. Sınırsız erişim ve gelişmiş özellikler için Pro sürüme geçiş yapın.

## En İyi Pratikler

- Anahtarı kaydetmeden önce internet bağlantınızın ve firewall izinlerinizin sağlıklı olduğundan emin olun.
- Staging ortamlarında farklı lisans anahtarı kullanmak veya staging domainlerini lisans merkezinde işaretlemek gerekebilir.
- Lisans süresi sona ermeden önce yenileme hatırlatmaları genellikle e-posta ile gönderilir; bu sayfadan da durum kontrolü yapabilirsiniz.

## İlgili Dokümanlar

- [Settings](settings.md) – Lisanslı özelliklerin aktif olduğu sekmeler.
- [Core Utilities](core-utilities.md) – API anahtarı ve bakım araçları.
- [Troubleshooting](../05-faq/index.md) *(hazırlanacak)* – Lisans aktivasyon sorunları için rehber.
