# Archive

Files kept for reference but **not part of the production site**. The cPanel
deploy manifest only copies `docs/` to `public_html/`, so nothing in this
folder is deployed.

## archive/docs/

### Design variants (exploration, superseded by v2-glass)
- `anara-v1-bento.html` + `anara-v1.css` — bento-grid concept
- `anara-v3-gradient.html` + `anara-v3.css` — gradient-heavy concept
- `anara-v4-minimal.html` + `anara-v4.css` — minimalist concept
- `anara-v5-editorial.html` + `anara-v5.css` — editorial / magazine concept
- `anara-v6-dark-luxury.html` + `anara-v6.css` — dark luxury concept
- `anara-v7-swiss.html` + `anara-v7.css` — Swiss typographic concept

### Previous canonical (superseded)
- `anara.html` + `anara.css` — earlier homepage version before v2-glass

### Backups (auto-saved before edits)
- `anara-v2-glass.html.bak`
- `anara-v2.css` + `anara-v2.css.bak`

### Internal tooling
- `picker.html` — variant chooser used during design review
- `header.html` — header-only component snippet
- `pricing-section.html` — orphan pricing module
- `premium-glass.css` + `premium-glass.js` — shared utility CSS/JS for variants

### Not-Anara stray file (different brand, kept to inspect)
- `index.html` — SeniorNest senior-care prototype (different product)
- `script.js` + `styles.css` — the SeniorNest stylesheet/script

### Internal specs (do not ship)
- `ASSET_SPEC.md` — photo / asset brief for sourcing
- `design-system.md` — design-system notes
- `Anara-Website-Content-v2.pdf` — copy spec source
- `Anara_v2glass_Content_Spec.pdf` — v2-glass content spec

## archive/assets/2026 Anara Website Assets/

Original source images before WebP conversion:

- Indian family hero source (~19 MB)
- Team headshots in original format (LK 600 KB PNG, Jason 150 KB PNG, etc.)
- Logo variants (favicon, square, landscape)
- Stock medical/health graphics

The deployed site uses the converted WebP/AVIF versions in `docs/`. Keep
this folder for future edits (re-crop, re-export, alternative imagery).

## Why archive instead of delete

These files captured design exploration, copy iteration, and original source
imagery. They aren't deployed (cPanel deploys `docs/` only), they aren't
indexed (`robots.txt` blocks them at the prototype URLs), and they cost
nothing to keep in the repo for future reference.

If you ever want to reclaim repo space, the largest single item is
`archive/assets/2026 Anara Website Assets/` (~21 MB). Move it to your own
backup and `git rm -r` the folder.
