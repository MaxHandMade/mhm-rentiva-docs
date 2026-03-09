---
id: financial-troubleshooting
title: Finansal Sorun Giderme
sidebar_label: Finansal Sorun Giderme
slug: /developer/operations/financial-troubleshooting
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, Finansal Sorun Giderme konusunu teknik ve operasyonel açıdan standart bir referans formatında açıklar.
:::

# Finansal Sorun Giderme

## İçindekiler
- Genel Bakış

- `invalid_status`: payout state kontrol et.
- `atomic_approve_failed`: ledger insert / rows_affected / post update kontrol et.
- `401 unauthorized`: HMAC secret ve timestamp kontrol et.
- `409 invalid_state`: callback yalnız `publish` payout için geçerli.

![Diyagram: financial-troubleshooting](/img/docs/financial/fin-fin-img-trouble-001.svg)

## Bölüm Sonu Özeti
- Finansal Sorun Giderme sayfası, tekil referans başlıklarıyla standart dokümantasyon yapısına alınmıştır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 26.02.2026 | 4.21.0-docs | Sayfa, tek şablon standardına normalize edildi. |

