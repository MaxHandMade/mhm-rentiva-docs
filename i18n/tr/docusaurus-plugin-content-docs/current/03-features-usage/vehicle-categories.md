---
id: vehicle-categories
title: Araç Kategorileri ve Taksonomiler
sidebar_label: Araç Kategorileri
sidebar_position: 4
slug: /features-usage/vehicle-categories
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Araç Kategorileri, filonuzdaki araçları mantıksal gruplara ayırmanızı ve frontend tarafında güçlü filtreleme seçenekleri sunmanızı sağlar. **MHM Rentiva > Araç Kategorileri** menüsünden yönetilir.

Bu sayfada araçlarınızı ana sınıflara ayırabilir ve hiyerarşik bir yapı oluşturabilirsiniz.

---

## 📂 Kategori Yönetimi (Categories)

Araçlarınızı ana sınıflara ayırmak için kullanılır (Örn: Ekonomik, VIP, SUV, Ticari).

- **Hiyerarşik Yapı:** Kategorileri iç içe tanımlayabilirsiniz (Örn: Binek > Sedan).
- **Kategori Görseli:** Bazı temalarda kategori ikonları veya görselleri listeleme sayfalarında kullanılır.
- **Kısa Kod Entegrasyonu:** Belirli bir kategorideki araçları listelemek için `[rentiva_vehicles category="vip"]` gibi parametreler kullanabilirsiniz.

---

### 🖼️ GÖRSEL: ARAÇ KATEGORİ LİSTESİ
*(Araç Kategorileri yönetim sayfası ve kategori hiyerarşisi)*

<div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', backgroundColor: '#f9fafb', textAlign: 'center', margin: '20px 0' }}>
  <p style={{ margin: 0, color: '#6b7280', fontWeight: 'bold' }}>🖼️ GÖRSEL: ARAÇ KATEGORİ LİSTESİ</p>
  <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#9ca3af' }}>mhm-rentiva-vehicle-category-list</p>
</div>

---

## 🔍 Filtreleme ve Arama Uyumu

Burada tanımladığınız her kategori, frontend araç arama formunda otomatik olarak birer filtre seçeneğine dönüşür. Müşterileriniz belirli bir kategorideki araçları bu tanımlar sayesinde kolayca bulabilir.

---

### Bölüm Özeti
- **Kategoriler** ile araçlarınızı segmentlere ayırın.
- **Hiyerarşi** kullanarak karmaşık filoları (örn: Binek > Sedan > Lüks Sedan) düzenli tutun.
- **URL Yapısı:** Kategorilere özel arşiv sayfalarını SEO uyumlu hale getirin.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 19.03.2026 | 4.21.2 | Özellikler (Features) bölümü "Araç Ayarları"na taşındığı için kaldırıldı, döküman sadeleştirildi. |
