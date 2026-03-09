---
id: audit-crypto-and-export-integrity
title: Audit Kriptografi ve Export Bütünlüğü
sidebar_label: Audit Kripto ve Bütünlük
slug: /developer/financial/audit-crypto-and-export-integrity
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, finansal audit export süreçlerinde kullanılan imza, anahtar ve hash-chain bütünlük modelini açıklar.
:::

# Audit Kriptografi ve Export Bütünlüğü

## İçindekiler
- Bileşenler
- Anahtar Yönetimi
- İmzalama Akışı
- Hash Chain
- Bölüm Sonu Özeti
- Değişiklik Günlüğü

## Bileşenler
- `KeyPairManager`
- `ExportSignatureService`
- `AuditExportService`
- `HashChainBuilder`
- `ExportAuditCommand`

## Anahtar Yönetimi
- Anahtar çifti üretimi ve saklama `KeyPairManager` üzerinden yürütülür.
- Özel anahtar erişimi minimum yetki prensibiyle sınırlandırılmalıdır.

## İmzalama Akışı
1. Export payload hazırlanır.
2. Hash hesaplanır.
3. Payload imzalanır.
4. İmza ve meta bilgiler export paketiyle birlikte saklanır.

## Hash Chain
- Olaylar sıralı hash zinciriyle bağlanır.
- Her yeni olay bir önceki hash'e referans verir.
- Zincir kırılması durumunda manipülasyon tespiti yapılabilir.

![Placeholder: audit-hash-chain-flow](/img/docs/placeholders/audit-hash-chain-flow.svg)

## Bölüm Sonu Özeti
- Audit export güvenliği için anahtar yönetimi ve zincir bütünlüğü birlikte ele alınmalıdır.
- Regülasyon uyumluluğu için doğrulanabilir export çıktısı zorunludur.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 26.02.2026 | 4.21.0-docs | Audit kripto ve export bütünlüğü dokümanı eklendi. |
