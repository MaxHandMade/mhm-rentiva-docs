---
id: financial-payout-lifecycle
title: Payout Yaşam Döngüsü
sidebar_label: Payout Yaşam Döngüsü
slug: /developer/financial/financial-payout-lifecycle
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, Payout Yaşam Döngüsü konusunu teknik ve operasyonel açıdan standart bir referans formatında açıklar.
:::

# Payout Yaşam Döngüsü

## İçindekiler
- Talep
- Onay
- Callback

## Talep
`PayoutService::request_payout()` minimum eşik, bakiye ve pending kontrolü yapar.

## Onay
`GovernanceService::process_approval()` -> `AtomicPayoutService::approve()`

- `START TRANSACTION`
- ledger insert (`payout_debit`)
- CPT status update
- `COMMIT` / `ROLLBACK`

## Callback
`POST /mhm-rentiva/v1/payouts/{id}/callback`

- `confirmed`: meta güncellenir
- `failed`: `payout_reversal` kaydı eklenir
- idempotency: tekrar callback skip edilir

![Diyagram: financial-payout-lifecycle](/img/docs/financial/fin-fin-img-payout-001.svg)

## Bölüm Sonu Özeti
- Payout Yaşam Döngüsü sayfası, tekil referans başlıklarıyla standart dokümantasyon yapısına alınmıştır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 26.02.2026 | 4.21.0-docs | Sayfa, tek şablon standardına normalize edildi. |

