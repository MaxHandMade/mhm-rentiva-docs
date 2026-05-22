# MHM Rentiva Documentation

Documentation site for the [MHM Rentiva](https://github.com/MaxHandMade/mhm-rentiva)
WordPress vehicle rental plugin. Built with [Docusaurus](https://docusaurus.io/) 3.9
and deployed automatically to GitHub Pages. The site supports full-text search and
Mermaid diagrams.

**Live site:** https://maxhandmade.github.io/mhm-rentiva-docs/

## Repo Structure

```
docs/                     Documentation pages (8 categories)
  01-getting-started/     Installation, quick start, requirements
  02-core-configuration/
  03-features-usage/
  04-developer/           Hooks, REST API, architecture
  05-vendor/              Vendor marketplace docs
  06-faq/
  07-theme/               Theme customization
  08-api/                 REST API reference
blog/                     Release notes (one post per version, v4.5.5 → current)
i18n/tr/                  Turkish mirror (blog + docs + pages + theme strings)
presentations/            Slide decks
scripts/check-links.sh    CI link verifier (runs on every push)
src/, static/             Docusaurus assets + custom pages
```

## Local Development

Requirements: **Node.js ≥ 20** (CI uses Node 22 LTS).

```bash
npm install              # one-time
npm start                # dev server on http://localhost:3100 (English)
npm run start:tr         # Turkish locale on http://localhost:3100
```

## Build

```bash
npm run build            # builds both locales into ./build
npm run serve            # preview ./build on http://localhost:3100
npm run clear            # clear .docusaurus cache (when builds get weird)
```

## Deployment

**Fully automatic** via GitHub Actions on every push to `main`:

1. `npm ci` + `npm run build` (both locales)
2. `bash scripts/check-links.sh` — fails the build if any internal link is broken
3. `peaceiris/actions-gh-pages@v4` publishes `./build` to the `gh-pages` branch
4. GitHub Pages serves the live site

No manual deploy step needed. See [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

## Contributing

- **New documentation page** — add a Markdown file under the appropriate `docs/XX-*/`
  category. Docusaurus auto-generates the sidebar entry.
- **New release post** — add `blog/YYYY-MM-DD-rentiva-v<X.Y.Z>-release.md` with
  frontmatter (`slug`, `title`, `authors`, `tags`, `date`). Use **locale-agnostic
  English `slug` and `tags`** so both locales link to the same anchor — the CI
  link checker will fail otherwise.
- **Translation** — mirror the English file under
  `i18n/tr/docusaurus-plugin-content-{blog,docs}/` with the **same file name**.
  Turkish prose, English `slug` + `tags`.
- **Internal links** must resolve before push; `scripts/check-links.sh` blocks
  PRs with broken links.

## Related

- **Plugin source:** [MaxHandMade/mhm-rentiva](https://github.com/MaxHandMade/mhm-rentiva)
- **Plugin issues:** https://github.com/MaxHandMade/mhm-rentiva/issues
- **Live docs:** https://maxhandmade.github.io/mhm-rentiva-docs/
