---
id: technical-architecture
title: Modül Mimarisi ve Teknik Harita
sidebar_label: Modül Mimarisi
description: MHM Rentiva teknik modül yapısı, bağımlılıklar ve güvenlik prensipleri.
slug: /developer/core/technical-architecture
---

![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu belge, Rentiva modüllerinin sorumluluk sınırlarını, veri akışını ve güvenlik kontrol noktalarını tek bir teknik referansta toplar.
:::

# MHM Rentiva Modül Mimarisi

## İçindekiler
- Mimari Genel Bakış
- Modül Kategorileri
- Temel Bağımlılıklar
- Güvenlik Prensipleri
- Bölüm Sonu Özeti
- Değişiklik Günlüğü

## Mimari Genel Bakış
Rentiva, modüler monolit yaklaşımıyla geliştirilmiştir. Her modül tek sorumluluk ilkesine göre ayrılır ve servisler arası bağımlılık minimumda tutulur.

## Modül Kategorileri
- Core: bootstrap, container, shared helpers
- Financial: ledger, payout, governance, policy
- API: REST endpointleri ve callback yönetimi
- UI Components: admin ekranları, list table, ayar sayfaları
- Testing: unit, integration ve doğrulama senaryoları
- Operations: runbook, sorun giderme, bakım adımları

## Temel Bağımlılıklar
- Financial modülü `Core` altyapısına bağımlıdır.
- API modülü, iş kurallarını `Financial` ve `Core` servislerinden tüketir.
- UI katmanı, doğrudan veri erişimi yerine servis katmanı üzerinden işlem yapar.

## Güvenlik Prensipleri
- Girdi sanitizasyonu (`sanitize_*`) zorunludur.
- Çıktı kaçışlama (`esc_*`) tüm render noktalarında uygulanır.
- Yetki kontrolü (`current_user_can`) kritik aksiyonlarda zorunludur.
- Nonce doğrulaması admin form ve AJAX akışlarında standarttır.

## Bölüm Sonu Özeti
- Modüller arası sınırlar net olduğunda bakım maliyeti düşer.
- Güvenlik kuralları kod standardının bir parçası olarak uygulanmalıdır.
- Operasyonel görünürlük için test ve runbook dokümanları birlikte güncel tutulmalıdır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 2026-02-26 | 4.21.0-docs | Karakter bozukluğu temizlendi, sayfa yeniden standardize edildi. |
