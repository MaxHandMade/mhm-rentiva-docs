---
id: framework-architecture
title: Kiralama Framework Mimarisi
sidebar_label: Mimari ve Özelleştirme
slug: /developer/core/framework-architecture
---

![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, Rentiva'nın esnek kiralama varlık modeli için çekirdek alanlar ile özelleştirilebilir niteliklerin nasıl ayrıldığını anlatır.
:::

# Kiralama Framework Mimarisi

## İçindekiler
- Giriş
- Core vs Attributes (Çekirdek ve Nitelik Alanları)
- Clean Slate (Temiz Sayfa) Politikası
- Finansal Güvenlik
- Senaryo: Bisiklet Kiralama

## Giriş
MHM Rentiva, sadece araç kiralama için değil, farklı varlık türleri için uyarlanabilen bir kiralama yönetim altyapısı sunar.

Bu yaklaşımın temelinde, zorunlu olmayan alanların sistemden temizlenebilmesi ilkesi yer alır.

## Core vs Attributes (Çekirdek ve Nitelik Alanları)
Eklenti, varlık tanımlarını iki kategoriye ayırır.

### Çekirdek Alanlar (Core)
:::danger Silinemez
Bu alanlar sistemin doğru çalışması, fiyat hesaplaması ve rezervasyon akışı için zorunludur.
:::

- Fiyat (Price per Day)
- Marka ve Model
- Müsaitlik (Availability)
- Yıl
- Görseller (Image ve Gallery)
- Plaka/ID

### Nitelikler (Attributes)
:::tip İsteğe Bağlı
Bu alanlar varsayılan olarak gelir ancak iş modelinize uymuyorsa kaldırılabilir.
:::

Yakıt tipi, vites, motor hacmi, koltuk sayısı gibi alanlar bu gruptadır.

## Clean Slate (Temiz Sayfa) Politikası
- Varsayılanlar zorunlu değildir.
- Sadece iş modeliniz için gerekli alanları aktif tutabilirsiniz.

## Finansal Güvenlik
:::info Depozito Güvenliği
Depozito alanı kaldırılırsa sistem rezervasyon akışında tam ödeme davranışına geçerek ücretsiz rezervasyon riskini engeller.
:::

## Senaryo: Bisiklet Kiralama
1. Araç tanımlarından araç odaklı olmayan alanları temizleyin.
2. Bisiklet odaklı alanlar ekleyin (`Kadro Boyu`, `Jant Çapı`, `Vites Sayısı`).
3. Sadece ihtiyaca uygun sade bir form bırakın.

## Bölüm Sonu Özeti
- Çekirdek alanlar operasyonel güvenlik için korunur.
- Nitelik alanları model bazlı özelleştirilebilir.
- Clean-slate yaklaşımı, farklı kiralama dikeylerine hızlı uyarlama sağlar.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 2026-02-26 | 4.21.0-docs | Karakter bozukluğu temizlendi, sayfa premium şablona geçirildi. |
