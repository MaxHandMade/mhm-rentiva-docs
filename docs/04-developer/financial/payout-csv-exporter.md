---
id: payout-csv-exporter
title: Payout CSV Exporter
sidebar_label: Payout CSV Exporter
slug: /developer/financial/payout-csv-exporter
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, `PayoutCsvExporter` bileşeninin finansal dışa aktarım davranışını ve güvenli kullanım kurallarını açıklar.
:::

# Payout CSV Exporter

## İçindekiler
- Genel Bakış
- Export Kapsamı
- Güvenlik Kontrolleri
- Operasyon Notları
- Bölüm Sonu Özeti
- Değişiklik Günlüğü

## Genel Bakış
`PayoutCsvExporter`, payout kayıtlarını denetlenebilir CSV formatında dışa aktarmak için kullanılır.

## Export Kapsamı
- Payout kimliği ve durum bilgisi
- İlgili vendor ve zaman damgası
- Finansal tutar alanları
- İzleme/audit amaçlı referans alanları

## Güvenlik Kontrolleri
- Yetkisiz export engellenmelidir (`current_user_can`).
- CSV çıktısında PII alanları maskeleme politikasına uygun olmalıdır.
- Export işlemleri audit log ile birlikte izlenmelidir.

## Operasyon Notları
- Büyük dataset için sayfalı export yaklaşımı önerilir.
- Export sonrası doğrulama için toplam kayıt sayısı ve checksum kontrol edilmelidir.

## Bölüm Sonu Özeti
- `PayoutCsvExporter`, finansal raporlamada denetlenebilirlik için kritik bir bileşendir.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 26.02.2026 | 4.21.0-docs | `PayoutCsvExporter` teknik dokümanı eklendi. |

