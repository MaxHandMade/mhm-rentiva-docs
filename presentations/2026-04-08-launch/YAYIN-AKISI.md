# Yayın Akışı — MHM Rentiva Lansman (8 Nisan 2026)

## Hazırlık (Yayın öncesi)

- [ ] `index.html` tarayıcıda tam ekran aç (F11)
- [ ] WP Admin `localhost:8080` giriş yap — admin paneli hazır olsun
- [ ] Docker container çalışıyor mu kontrol et
- [ ] OBS: Browser source veya ekran paylaşımı hazır

---

## Yayın Segmentleri

### 🎬 Segment 1 — Açılış & Tanışma (5 dk)
- Merhaba, kanalı tanıt
- "Bugün MHM Rentiva'yı tanıtıyoruz — WordPress için araç kiralama eklentisi"
- Slayt: **KAPAK**
- Slayt: **Bugün Ne Yapacağız** (3 yayın planı)

---

### 🤔 Segment 2 — Problem & Çözüm (5 dk)
- Slayt: **Bir Sorundan Başlayalım**
- Slayt: **MHM Rentiva Nedir?**
- Slayt: **Kim Kullanır?**
- Kısaca anlatım: "Bu eklentiyi neden yaptım?"

---

### ✨ Segment 3 — Özellikler Genel Bakış (5 dk)
- Slayt: **Neler Yapabilirsiniz?**
- Slayt: **Rakamlarla MHM Rentiva** (683 test, 2277 senaryo vurgusu)
- Slayt: **Teknik Altyapı**

---

### 🗺️ Segment 4 — Canlı Menü Turu (20 dk)

> Slaytları kapatıp WP Admin'e geç.

**Sırasıyla her menüyü aç ve kısaca göster:**

1. **Dashboard** — Anlık istatistikler, son aktiviteler
2. **Araçlar** — Liste görünümü, bir araca tıkla, fotoğraf galerisi, fiyat, takvim göster
3. **Araç Kategorileri** — Kısa
4. **Araç Ayarları** — Kısa (detaylar Yayın 2'de)
5. **Rezervasyonlar** — Filtreleme, bir rezervasyona tıkla, depozito durumunu göster
6. **Lokasyonlar** — Şehir→Nokta hiyerarşisi
7. **Transfer Güzergahları** — Bir güzergah göster
8. **Ek Hizmetler** — Kısa (GPS, sigorta örneği)
9. **Müşteriler** — Profil sayfası
10. **Raporlar** (PRO işareti) — "Bu Pro özelliği, sonraki yayında konuşacağız"
11. **Dışa Aktarım** — CSV export kısa demo
12. **Ayarlar** — "Detaylar Yayın 2'de"

---

### 💎 Segment 5 — Lite vs Pro (3 dk)
- Slayt: **Lite vs Pro**
- "Ücretsiz başlayın, büyüdükçe Pro'ya geçin"

---

### 🎉 Segment 6 — Kapanış (5 dk)
- Slayt: **Kapanış**
- GitHub linki ver
- "Sonraki yayın: Ayarlar detayı"
- "Sonraki yayın: Canlı kurulum"
- Soru-cevap (chat'ten)

---

## Sık Gelebilecek Sorular

**"WooCommerce olmadan çalışır mı?"**
→ Hayır, ödemeler için WooCommerce gerekli. Zaten çoğu WP sitede mevcut.

**"Kaç araçla kullanabilirim?"**
→ Lite sürümde küçük filo için limit var. Pro'da sınırsız.

**"Elementor olmadan çalışır mı?"**
→ Evet! Gutenberg blokları ve shortcode'lar tüm temalarda çalışır. Elementor isteğe bağlı.

**"Türkçe dil desteği var mı?"**
→ Evet, tam Türkçe çeviri mevcut.

**"Mobil uyumlu mu?"**
→ Evet, frontend tamamen responsive.

**"Transfer ve araç kiralama aynı anda kullanılabilir mi?"**
→ Evet, ikisi birbirinden bağımsız modül olarak çalışır.

---

## Önemli Notlar

- Test sayısı: **720 test, 2277+ senaryo** — slayttaki ve söyleyeceğin sayı bu
- Sürüm: **v4.26.0** — en son sürüm
- GitHub: **github.com/MaxHandMade/mhm-rentiva** — PUBLIC repo
