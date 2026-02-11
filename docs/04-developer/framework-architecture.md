---
id: framework-architecture
title: Kiralama Framework Mimarisi
sidebar_label: Mimari ve Özelleştirme
---

![Version](https://img.shields.io/badge/version-4.6.2-blue?style=flat-square) ![Security](https://img.shields.io/badge/security-WPCS%20Compliant-green?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-22.01.2026-orange?style=flat-square)

## Giriş

MHM Rentiva, artık sadece bir "Araç Kiralama" eklentisi değil, esnek bir "Kiralama Varlık Yönetimi" (Rental Asset Management) sistemidir. Bisiklet, Tekne, Karavan, Kamp Ekipmanı ve hatta Emlak gibi farklı kiralama senaryolarına uyum sağlayabilir.

Bu dönüşümün temelinde, **"Zorunlu Olmayan Her Şeyin Silinebilmesi"** felsefesi yatar.

## Core vs Attributes (Çekirdek ve Nitelik Alanları)

Eklenti, araç/varlık tanımlarını iki ana kategoride ele alır:

### Çekirdek Alanlar (Core)

:::danger Silinemez
Bu alanlar, sistemin çalışması, fiyat hesaplaması ve rezervasyon döngüsünün hatasız ilerlemesi için **ZORUNLUDUR**. Panelden silinemezler.
:::

*   **Fiyat (Price per Day):** Kiralama temel taşıdır.
*   **Marka & Model:** Varlığın kimliğidir.
*   **Müsaitlik (Availability):** Takvim yönetimi için şarttır.
*   **Yıl (Year):** Varlığın yaşını belirtir.
*   **Görseller (Image & Gallery):** Müşteri sunumu için gereklidir.
*   **Plaka/ID (License Plate):** Benzersiz tanımlayıcıdır.

### Nitelikler (Attributes)

:::tip İsteğe Bağlı
Bu alanlar varsayılan olarak gelir ancak **SİLİNEBİLİR**. Eğer kiralama modelinize uymuyorsa, "Araç Ayarları > Araç Tanımları" sekmesinden kaldırabilirsiniz.
:::

Yakıt Tipi, Vites, Motor Hacmi, Koltuk Sayısı gibi özellikler bu gruba girer.

> Bir niteliği sildiğinizde; araç ekleme ekranından, filtrelerden ve frontend görünümünden tamamen kalkar.

## Clean Slate (Temiz Sayfa) Politikası

Varsayılanlara dönüldüğünde veya ilk kurulumda sistem artık size bir özellik seti dayatmaz.

*   **Varsayılan Yok:** Hiçbir özellik seçili gelmez.
*   **Tam Kontrol:** Hangi özelliğin aktif olacağına siz karar verirsiniz.

## Finansal Güvenlik

:::info Depozito Güvenliği
Depozito alanını silerseniz, sistem otomatik olarak **"Depozitosuz Kiralama"** moduna geçer ve rezervasyon sırasında **Tam Ödeme (Full Payment)** talep eder.
:::

Bu sayede, depozito alanı silindiğinde sistemin `0 TL` (Bedava) kiralama yapması engellenmiş olur.

## Senaryo: Bisiklet Kiralama Kurulumu

1.  **Temizlik:** Araç Ayarları > Araç Tanımları'na gidin.
2.  **Gereksizleri Sil:** Yakıt, Motor, Vites, Kapı, Klima gibi araba odaklı özellikleri silin.
3.  **Yenileri Ekle:** "Kadro Boyu", "Jant Çapı", "Vites Sayısı" gibi alanlar ekleyin.
4.  **Sonuç:** Sadece bisiklet odaklı, temiz bir kiralama sistemi.
