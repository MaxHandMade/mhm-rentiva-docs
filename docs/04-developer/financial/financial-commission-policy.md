---
id: financial-commission-policy
title: Komisyon ve Policy Sistemi
sidebar_label: Komisyon ve Policy
slug: /developer/financial/financial-commission-policy
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa komisyon oranı çözümleme, policy zamanlaması ve tier indirimi kurallarını açıklar.
:::

# Komisyon ve Policy Sistemi

## İçindekiler
- Policy Tablosu
- Çözümleme Kuralı
- Tier İndirimi
- Öncelik

## Policy Tablosu
`${wpdb->prefix}mhm_rentiva_commission_policy`

- `vendor_id = NULL` => global policy
- `effective_from / effective_to` => zaman penceresi
- `version_hash` => audit izi

## Çözümleme Kuralı
`PolicyService::resolve_policy_at()` önce vendor policy, sonra global policy arar.

## Tier İndirimi
`TierService`, override yoksa devreye girer ve policy oranı üzerinden indirim uygular.

## Öncelik
1. Araç override
2. Vendor override
3. Tier indirimi
4. Global policy

![Diyagram: financial-commission-policy](/img/docs/financial/fin-fin-img-policy-001.svg)

## Bölüm Sonu Özeti
- Komisyon hesaplama sözleşmesi deterministik bir hiyerarşi ile uygulanır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 2026-02-26 | 4.21.0-docs | Karakter/encoding düzeltmesi ve içerik standardizasyonu. |

