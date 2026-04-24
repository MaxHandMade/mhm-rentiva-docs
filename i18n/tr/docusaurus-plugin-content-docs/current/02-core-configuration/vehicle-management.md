---
id: vehicle-management
title: Araç Yönetimi (Ayarlar)
sidebar_label: Araç Yönetimi
sidebar_position: 2
slug: /core-configuration/vehicle-management
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

Araç Yönetimi sekmesi, filonuzdaki araçların kiralama fiyatlarını (çarpan bazlı) ve rezervasyon kısıtlamalarını merkezi olarak yönettiğiniz alandır. **MHM Rentiva > Ayarlar > Araç Yönetimi** altından ulaşılır.

---

## 💰 Araç Fiyatlandırma Ayarları

Sistemdeki tüm araçların fiyatlarını tek bir merkezden çarpanlar kullanarak optimize edebilirsiniz.

- **Temel Fiyat Çarpanı:** Tüm araç fiyatlarını global olarak artırmak veya azaltmak için kullanılır (Örn: 1.0 = Normal fiyat, 1.2 = %20 Zamlı fiyat).
- **Hafta Sonu Fiyat Çarpanı:** Cuma, Cumartesi ve Pazar günleri için uygulanacak fiyat artış oranı (Örn: Hafta sonu %20 artış için 1.2 girilmelidir).
- **Vergi Ayarları (WooCommerce):** "Vergi Dahil Fiyatlandırma" ve "Vergi Oranı (%)" ayarları tamamen WooCommerce merkezi vergi sistemi ile entegre çalışır. Değişiklikler WooCommerce panelinden çekilir.

---

### 🖼️ GÖRSEL: ARAÇ FİYATLANDIRMA PANELİ
*(Ayarlar > Araç Yönetimi sekmesi, fiyat çarpanları ve vergi alanı)*

---

## 📅 Araç Kullanılabilirlik Ayarları

Müşterilerin araçları hangi sürelerle ve hangi şartlarda kiralayabileceğine dair kurallar burada belirlenir.

- **Minimum / Maksimum Kiralama:** Araçların en az ve en fazla kaç gün için kiralanabileceği (Varsayılan: 1 - 30 Gün).
- **Önceden Rezervasyon Günleri:** Müşterilerin bugünden itibaren ne kadar ileriye yönelik rezervasyon yapabileceği (Örn: 365 Gün).
- **Aynı Gün Rezervasyona İzin Ver:** İşaretlendiğinde, müşteriler içinde bulunulan gün için (acil kiralama) rezervasyon talebi oluşturabilirler.
- **Default Rental Location (Varsayılan Lokasyon):** Eğer bir aracın veya aracın sahibinin (vendor) özel bir lokasyonu tanımlanmamışsa, sistem bu "Kurtarıcı (Fallback)" lokasyonu kullanır.

---

## 💡 Teknik Notlar

:::tip Fiyat Hesaplama Mantığı
Sistem fiyatı şu formülle hesaplar:
`Günlük Ücret x Gün Sayısı x Temel Çarpan x [Varsa Hafta Sonu Çarpanı]`
:::

---

### Bölüm Özeti
- **Fiyat Çarpanları** ile tüm filoya bir anda indirim veya zam uygulayabilirsiniz.
- **Kullanılabilirlik Limitleri** ile operasyonel sınırlarınızı (min/max gün) çizin.
- **WooCommerce Entegrasyonu** sayesinde vergi ve kuruş hesaplamaları hatasız yapılır.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 19.03.2026 | 4.21.2 | Araç Yönetimi (Ayarlar) dökümanı panel ekran görüntüsü ve kod analizine göre oluşturuldu. |
