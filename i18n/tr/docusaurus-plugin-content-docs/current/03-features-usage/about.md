---
id: about
title: MHM Rentiva Hakkında (About)
sidebar_label: Hakkında
sidebar_position: 16
slug: /features-usage/about
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

**MHM Rentiva Hakkında** sayfası, eklentinin teknik altyapısını, sürüm notlarını, istatistiklerini izleyebileceğiniz ve doğrudan geliştirici ekiple (MaxHandMade) iletişim kurabileceğiniz merkezi yönetim destek alanıdır. Bu sayfaya WordPress admin panelinden **MHM Rentiva > Hakkında** yolunu izleyerek ulaşabilirsiniz.

---

## ℹ️ 1. Genel Bilgi (General Info)

Eklentinin mevcut durumu ve platform büyüklüğünüz hakkında makro düzeyde özet sağlar:

- **Eklenti Bilgileri:** Eklentinin adı, yüklü sürüm (Örn: *v4.21.2*), geliştirici bilgisi ve dosya boyutu.
- **Uygunluk:** WordPress sürümünüz (Örn: 6.9.4), PHP sürümünüz ve MySQL versiyonlarınızın, eklentinin test edildiği versiyonlarla kıyaslamasını gösterir.
- **İstatistikler:** Sisteminizdeki **Toplam Araç Sayısı**, **Toplam Rezervasyon** ve **Toplam Müşteri** istatistiklerini anlık olarak bir tabloda tutar.

---

## 💎 2. Lite ve Pro

Hakkında sayfasında artık **Özellikler** sekmesi yok. Sekmeler şunlar: **Genel bilgi**, **Sistem bilgisi**, **Destek** ve **Geliştirici**.

Lite'ta **araç, rezervasyon, müşteri ya da ek hizmet sınırı yoktur**; süreli özellik ya da kilitli ekran da yoktur. Rentiva Pro ayrı bir eklentidir ve kendi modüllerini ekler (bayi pazaryeri ve ödemeler, VIP Transfer, Mesajlar, Raporlar, Genişletilmiş Dışa Aktarım, GDPR araçları). Lite'ta neler olduğunun ve Pro'nun neler eklediğinin tam listesi için [Lisans Yönetimi](../02-core-configuration/license.md) sayfasına bakın.

---

## ⚙️ 3. Sistem Bilgisi (System Info)

Sunucu ve site yapılandırmanızın *Developer* düzeyinde incelendiği diagnostik sekmesidir. Geliştirici ekibe destek talebi açarken buradaki verilerin iletilmesi çok önemlidir:

- **WordPress Bilgileri:** Dil ayarı (`tr_TR`), Zaman Dilimi (`+03:00`), Site URL'si, Çoklu Site (Multisite) durumu.
- **PHP Bilgisi:** Sürüm (`8.2.30`), Bellek Sınırı (`128M`), Maksimum Yürütme Süresi (`30s`), Maksimum Yükleme Boyutu (`2M`), Post Max Boyutu.
- **Eklenti Bilgileri:** Sürüm, dosya boyutu, kurulum ve son güncellenme tarihleri.
- **Veritabanı Bilgileri:** MySQL sürümü (`10.6.25`), Karakter kümesi (`utf8mb4`) ve Karşılaştırma/Derleme (`utf8mb4_unicode_520_ci`).

---

## 🆘 4. Destek (Support & Changelog)

Kullanıcı destek kanallarına ve dökümanlara hızlı erişim sağlar:

- **Belgeler:** Kullanıcı rehberimiz, API Dökümantasyonumuz ve Video Öğreticilerimize anında bağlantılar.
- **Destek Kanalları:** Bize ulaşabileceğiniz **İletişim Formu** ve doğrudan geliştirici destek e-postası / telefon numarası bölümü.
- **Topluluk:** Deneyimlerinizi paylaşmak veya çözüm bulmak için *WordPress Destek Forumu* entegrasyonu.
- **Sürüm Geçmişi (Changelog):** Eklentinin geçmişten günümüze yayınlanan güncellemelerini detaylandırır (Örn: v4.21.2 versiyonundaki Security hardening, REST API geliştirmeleri vb. yama notlarını içerir).

---

## 👨‍💻 5. Geliştirici (Developer Details)

MHM Rentiva'yı var eden ana geliştirici **MHM (MaxHandMade)** hakkındaki dijital portfolyodur:

- **Hakkımızda:** 10 yılı aşkın WordPress, e-ticaret, restorasyon ve özel yazılım çözümleri deneyimimizle `%100 Müşteri Memnuniyeti` ilkesi ile çalışan ekibimizin misyon açıklaması.
- **Uzmanlık Alanlarımız:** WordPress Geliştirme (Performans ve Optimizasyon), E-ticaret Çözümleri (WooCommerce kişiselleştirmeleri) ve Karmaşık Rezervasyon Sistemleri altyapı inşası.
- **İletişim & Diğer Projeler:** Kurumsal website (`maxhandmade.com`), Kocaeli / Türkiye resmi ofis adresi ve aktif olan diğer başarılı WordPress ticari projelerimizin (`MHM E-ticaret Paketi` vb.) linkleri yer alır.

---

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 09.11.2026 | 6.3.1 | Düzeltme: "Lite (Sınır) / Pro (Limitsiz)" tablosu kaldırıldı. Hakkında sayfasında artık Özellikler sekmesi yok; Lite'ta araç, rezervasyon, müşteri ya da ek hizmet sınırı da yok. Lisans durumu ve Pro'ya özel "Öncelikli destek" satırı, sayfa bunları göstermediği için çıkarıldı. |
