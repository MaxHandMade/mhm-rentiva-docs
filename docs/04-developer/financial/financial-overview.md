---
id: financial-overview
title: Finansal Sistem Genel Bakış
sidebar_label: Finansal Genel Bakış
slug: /developer/financial/financial-overview
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa finansal çekirdeğin bileşenlerini, veri akışını ve mimari invariantlarını özetler.
:::

## İçindekiler
- Kapsam
- Çekirdek bileşenler
- Komisyon çözümleme sırası
- Mimari invariantlar

# Finansal Sistem Genel Bakış

## Kapsam
- Komisyon hesaplama hiyerarşisi
- Immutable ledger modeli
- Payout yaşam döngüsü
- Governance kontrolleri
- Analytics metrikleri

## Çekirdek Bileşenler
- `CommissionResolver`
- `PolicyService` / `PolicyRepository`
- `TierService`
- `Ledger` / `LedgerEntry`
- `PayoutService` / `AtomicPayoutService`
- `GovernanceService`
- `AnalyticsService`

## Komisyon Çözümleme Sırası
1. Araç override
2. Vendor override
3. Tier indirimi
4. Global policy oranı

## Mimari İnvariantlar
- Ledger üzerinde sadece `INSERT`.
- Callback idempotent.
- Audit append-only.
- Finansal raporlamada tek kaynak ledger.

![Diyagram: financial-overview](/img/docs/financial/fin-fin-img-overview-001.svg)

## Bölüm Sonu Özeti
- Finansal çekirdeğin modüler sınırları ve karar sırası netleştirildi.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 2026-02-26 | 4.21.0-docs | Karakter/encoding düzeltmesi ve içerik standardizasyonu. |

