---
id: layout-import-pipeline
title: Layout Import Pipeline
sidebar_label: Layout Pipeline
slug: /developer/core/layout-import-pipeline
---
![Version](https://img.shields.io/badge/version-4.21.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-26.02.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, layout manifest import sürecinin doğrulama, atomiklik, rollback ve denetim akışını dokümante eder.
:::

# Layout Import Pipeline

## İçindekiler
- Bileşenler
- Komut Akışı
- Doğrulama ve Atomic Import
- Rollback ve Diff
- Bölüm Sonu Özeti
- Değişiklik Günlüğü

## Bileşenler
- `LayoutImportCommand`
- `BlueprintValidator`
- `CompositionBuilder`
- `AtomicImporter`
- `LayoutRollbackService`
- `LayoutDiffService`
- `LayoutAuditService`

## Komut Akışı
1. CLI komutu manifest dosyasını yükler.
2. Manifest `BlueprintValidator` ile sözleşmeye karşı doğrulanır.
3. `AtomicImporter`, değişikliği atomik olarak uygular.
4. Gerekirse `LayoutRollbackService` önceki snapshot'a döner.

## Doğrulama ve Atomic Import
- Yapısal kurallar `ContractRules` ile kontrol edilir.
- Hash tabanlı değişim kontrolü ile gereksiz yazma engellenir.
- Başarısız import durumunda sistem tutarlılığı korunur.

## Rollback ve Diff
- Rollback önceki manifest snapshot'ı üzerinden yapılır.
- Diff hizmeti mevcut/önceki sürüm farkını raporlar.
- Audit servisinde import ve rollback olayları izlenir.

![Placeholder: layout-pipeline-sequence](/img/docs/placeholders/layout-pipeline-sequence.svg)

## Bölüm Sonu Özeti
- Pipeline, "validate first, write atomically, rollback safely" yaklaşımına dayanır.
- Üretimde layout değişiklikleri mutlaka audit ve diff ile izlenmelidir.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 26.02.2026 | 4.21.0-docs | Layout import teknik sayfası eklendi. |
