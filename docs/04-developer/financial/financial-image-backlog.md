---
id: financial-image-backlog
title: Finansal Görsel Backlog (Assets)
sidebar_label: Finansal Görsel Backlog
sidebar_position: 10
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

:::info Amaç
Bu sayfa, finansal dökümantasyonda kullanılan diyagramların, teknik çizimlerin ve medya varlıklarının (assets) güncel durumunu takip etmek için kullanılır.
:::

# 🖼️ Finansal Görsel Backlog

Dökümantasyon sistemimiz artık **Dinamik Mermaid Diyagramları** ve **Statik SVG** ikonlarını hibrit olarak kullanmaktadır. Aşağıdaki liste, hangi teknik sayfanın hangi görsel varlığa dayandığını gösterir.

## 📊 Diyagram ve İmaj Envanteri

| Kod | Dosya Yolu / Tip | Durum | Sayfa İlişkisi |
| :--- | :--- | :--- | :--- |
| **FIN-MERMAID-OVERVIEW** | `Mermaid Code` | ✅ Güncel | Finansal Genel Bakış |
| **FIN-IMG-LEDGER-001** | `ledger-001.svg` | 🔄 Revizyon Bekliyor | Ledger Modeli |
| **FIN-MERMAID-POLICY** | `Mermaid Code` | ✅ Güncel | Komisyon ve Policy |
| **FIN-MERMAID-GOV** | `Mermaid Code` | ✅ Güncel | Governance Kontrolleri |
| **FIN-IMG-ANALYTICS-001** | `analytics-001.svg`| ✅ Güncel | Analytics Metrikleri |
| **FIN-IMG-DB-001** | `db-001.svg` | ⚠️ Eksik (V4.21) | Veritabanı Mimarisi |
| **FIN-MERMAID-SIG** | `Mermaid Code` | ✅ Güncel | Audit Kripto ve Bütünlük |

---

## 🛠️ Görsel Standartlar

1. **Mermaid Kullanımı:** Mimari akışlar ve sıra diyagramları (Sequence Diagrams) için her zaman Mermaid tercih edilmelidir. Bu, döküman güncellendiğinde diyagramın da kolayca güncellenmesini sağlar.
2. **SVG Formatı:** Sabit şemalar ve tablo ilişkileri için `/static/img/docs/financial/` altındaki SVG dosyaları kullanılır.
3. **Naming Convention:** `fin-fin-img-{category}-{index}.svg` formatına sadık kalınmalıdır.

---

## 📅 Yakın Zamanda Eklenecekler (TODO)

- [ ] **Payout Journey Map:** Ödeme talebinin son kullanıcıdan bankaya kadar olan serüveni (Sequence Diagram).
- [ ] **Crypto Hash Chain Visualizer:** SHA-256 zincirinin nasıl bağlandığını gösteren teknik illüstrasyon.
- [ ] **Tax Flow Diagram:** Vergi kalemlerinin (KDV, Stopaj) ledger üzerindeki dağılım şeması.

## Bölüm Sonu Özeti
- Görsel backlog, dinamik ve statik varlıkların merkezi kontrol listesidir.
- Yeni eklenen tüm Mermaid diyagramları bu listeye kaydedilmelidir.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | Görsel backlog, Mermaid geçişi ve yeni asset yapısına göre modernize edildi. |

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 26.02.2026 | 4.21.0-docs | Sayfa, tek şablon standardına normalize edildi. |
