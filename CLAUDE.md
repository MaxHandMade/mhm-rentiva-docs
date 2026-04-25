# mhm-rentiva-docs — Docusaurus Disiplin Sözleşmesi

Bu repo, **mhm-rentiva** WordPress eklentisi için Docusaurus tabanlı dokümantasyon sitesidir. WordPress projesi DEĞİLDİR: `wp-conductor` ve diğer `wp-*` skill'leri **invoke edilmez**. Bu dosya bu projeye özel disiplin sözleşmesidir; her görevin başında oku, sonunda gate'leri çalıştır.

## Stack

- **Docusaurus 3.9.x** (Node 22, MDX, React)
- **i18n:** `en` (default) + `tr`. Kaynak metin EN, çeviri TR — ikisi paralel zorunlu
- **Deploy:** GitHub Pages (`peaceiris/actions-gh-pages`), workflow [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
- **Site:** https://maxhandmade.github.io/mhm-rentiva-docs/

## Komutlar

```bash
npm ci                          # bağımlılık kurulumu (CI tarzı, tekrarlanabilir)
npm run build                   # production build → ./build (EN + TR)
npm run serve -- --port 3050    # local preview (docusaurus serve)
bash scripts/check-links.sh     # build sonrası TÜM internal href'leri HEAD-test
```

> `docusaurus serve` lokal'de dot içeren URL'leri (`v4.6.2-security-update`) 404 verir — bilinen quirk. Gerçek nav testi için `cd build && python -m http.server 3060` kullan; bu nginx/GH Pages davranışına eştir.

## Görev Başı: Zorunlu Gate'ler

Her görev bittiğinde, "tamamlandı" demeden önce:

1. **`npm run build` → SUCCESS.** `onBrokenLinks: 'throw'` aktif; kırılma build'i durdurur.
2. **`bash scripts/check-links.sh` → 0 broken.** Build-time checker'ın yakalamadığı runtime nav bug'larını yakalar (özellikle JSX `<a href>`).
3. **i18n parite:** Sayfa içeriği değiştiyse hem `docs/<dosya>` hem `i18n/tr/docusaurus-plugin-content-docs/current/<dosya>` güncellenir. TR bayatlamış kalmaz.
4. **Push'tan önce nav simülasyonu** (mümkünse): `python -m http.server` ile build/ serve, etkilenen sayfalardaki kart/buton link'lerine **gerçekten tıkla** — direct URL curl yetmez.

CI (`deploy.yml`) PR'da build + link-check çalıştırır, push to main'de bunlara ek deploy. Link-check fail ederse deploy hiç olmaz.

## Sert Kurallar (Daha Önce Yandığımız Yerler)

### 1. JSX `<a href>` her zaman absolute olmalı

```jsx
// ❌ KIRIK — sayfanın URL'ine göre çözülür, slug + trailing slash ile yanlış path üretir
<a href="./post-install-checklist">Checklist</a>

// ✅ DOĞRU — absolute path, tarayıcı her sayfadan aynı yere gider
<a href="/docs/getting-started/post-install-checklist">Checklist</a>
```

**Neden:** Docusaurus markdown `[text](./xxx)` link'lerini build-time'da çözer ve absolute URL üretir. Ama JSX `<a href>` raw HTML olarak HTML'e gider; browser path resolution kullanılır. Sayfa URL'i `/docs/<section>/reading-order/` (trailing slash) ise relative `./xxx` → `/docs/<section>/reading-order/xxx` (genelde 404).

`onBrokenLinks: 'throw'` bu hatayı yakalamaz — JSX raw href'leri opaque kabul eder. CI link-check yakalar; yine de yazarken kuralı uygula.

### 2. `slug:` frontmatter'ı sadece gerekirse override

Default davranış (slug yok) → URL = klasör yolu + dosya adı. Bu çoğu zaman doğru ve link'lerle uyumlu.

`slug:` ekleyince:
- Eski URL'ler kırılır (SEO regression riski — yayında olan site için redirect planı gerekir)
- `id:` ile uyumsuzluk riski (id farklı slug üretebilir, link veren dosyaların URL beklentisi şaşar)

Override gerekçesi: kullanıcı-dostu kısa URL (örn. `/docs/getting-started/checklist` yerine `/docs/getting-started/post-install-checklist`). Gerekçesiz override etme.

### 3. Hardcoded `/mhm-rentiva-docs/` prefix yasak

```markdown
<!-- ❌ KIRIK — TR locale'de Docusaurus prefix'i Y duplicate ekler: /mhm-rentiva-docs/tr/mhm-rentiva-docs/... -->
<a href="/mhm-rentiva-docs/docs/vendor/onboarding">

<!-- ✅ DOĞRU — Docusaurus baseUrl + locale prefix'ini otomatik ekler -->
<a href="/docs/vendor/onboarding">
```

CI link-check her PR'da bunu yakalar; yine de yazarken yapma.

### 4. i18n: TR çeviri zorunlu, msgmerge mantığıyla davran

EN sayfa eklendiğinde / değiştiğinde TR karşılığı aynı commit'te güncellenir. TR bayatlamasına izin verme. Eski TR sayfasını silersen TR build "missing translation" düşer (sayfa fallback'le EN gösterilir, kullanıcı için bozuk hissi verir).

Çeviri yaparken: WP eklenti tarafındaki `feedback_turkish_chars.md` global feedback'i geçerli — Türkçe içerikte ASCII karakter kullanma (ş, ğ, ı, vb. düzgün yaz).

### 5. Blog post pipeline

Yeni release blog post'u:
- EN: `blog/YYYY-MM-DD-vX.Y.Z-release.md`
- TR: `i18n/tr/docusaurus-plugin-content-blog/YYYY-MM-DD-vX.Y.Z-release.md`
- Kaynak: `mhm-rentiva` repo'sundaki `changelog.json` + `changelog-tr.json`
- Frontmatter `slug:` zorunlu (kısa, anlamlı; `vX.Y.Z-something` formatında)

İkisini birden ekle. Sadece EN eklenince TR'de fallback bozuk görünür.

## Memory Bağlantısı

- Hafıza dizini: `C:/Users/manag/.claude/projects/c--projects-rentiva-dev/memory/`
- Hot.md tepesinde "BROKEN-LINK FIX = nav simüle et" uyarısı var
- Detay: `feedback_link_navigation_testing.md`
- Bu CLAUDE.md o feedback'in repo-içi kalıcı versiyonudur — feedback değişirse buraya da yansıt

## Ne Zaman Bu Sözleşmeyi Esnet

Sadece okuma görevi (kullanıcı sayfa içeriği soruyor, "X şu sayfada nerede yazıyor"): build/serve/check gate'leri gereksiz. İçerik değişmiyorsa atla.

Diğer her şey için: gate'lerin tamamı zorunlu.
