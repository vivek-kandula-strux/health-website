# Anara Health — Corporate Healthcare for India's Workforce

Production marketing site for **Anara Health** (anara.health). Single-page
landing site for HR / procurement buyers at Indian corporates.

> **Status:** Pre-launch. CRITICAL + HIGH audit fixes shipped. One remaining
> blocker is the Formspree form ID — see `docs/DEPLOY.md` §6.

## Repository layout

```
.
├── docs/                  ← Production site. Deployed verbatim to public_html/.
│   ├── index.html         ← Canonical landing page (was anara-v2-glass.html).
│   ├── anara-v2-glass.css ← Stylesheet (~75 KB unminified; brotli to ~12 KB).
│   ├── anara-v2-glass.js  ← Behaviour (~18 KB; deferred).
│   ├── terms.html         ← Terms of Service (linked from footer).
│   ├── privacy.html       ← Privacy Policy (DPDP-aware).
│   ├── 404.html           ← Custom 404.
│   ├── .htaccess          ← Apache config (HTTPS, cache, security headers).
│   ├── robots.txt         ← Indexable; prototypes blocked.
│   ├── sitemap.xml        ← anara.health URLs only.
│   ├── DEPLOY.md          ← Production deploy checklist (CSP, cache, OG, etc.).
│   ├── Anara.png          ← Brand wordmark logo.
│   ├── indian-family-*    ← Hero family photo (3 sizes × AVIF/WebP/PNG).
│   ├── team-*.webp        ← Leadership headshots (responsive WebP).
│   └── onsite-clinic-*    ← On-site clinic environment shot.
│
├── archive/               ← NOT deployed. Reference material.
│   ├── docs/              ← Older design variants (v1, v3-v7), backups,
│   │                        component fragments, internal spec PDFs.
│   ├── assets/            ← Source PSDs/originals before WebP conversion.
│   └── README.md          ← What's in here and why we kept it.
│
├── .cpanel.yml            ← cPanel git-deploy manifest (copies docs/ → public_html/).
├── .gitignore             ← Excludes local tooling (.claude, .gstack, etc.).
└── README.md              ← This file.
```

## Preview locally

```bash
# Python 3 (any platform)
cd docs
python -m http.server 8000
# → open http://127.0.0.1:8000/
```

Or simply open `docs/index.html` in a browser (most things work; the form
submission and the `<picture>` srcset behave more reliably over HTTP).

## Deploy

Production deploy is documented in `docs/DEPLOY.md`. Three supported targets:

| Target | How |
|--------|-----|
| **cPanel** (current setup) | `git push` → cPanel "Pull or Deploy" → `.cpanel.yml` copies `docs/` to `public_html/`. |
| **Netlify** | Drag-and-drop the `docs/` folder, or connect this repo with publish directory `docs/`. |
| **Vercel** | Connect this repo. In Project Settings → Build & Output → Root Directory: `docs`. Framework: "Other". |

Before flipping DNS at `anara.health`, complete the checklist in `docs/DEPLOY.md`:

1. Swap the Formspree form ID in `docs/index.html` (line ~880).
2. Add server headers (CSP, HSTS, X-Frame-Options, Referrer-Policy).
3. Minify CSS/JS and enable brotli at the edge.
4. Generate a dedicated 1200×630 OG cover image.
5. Optionally self-host the Google Fonts subset for tighter CSP.

## What was audited

A 7-track parallel audit (visual design, accessibility WCAG 2.1 AA,
performance / Core Web Vitals, SEO, mobile, conversion / copy, security)
identified 131 issues. All 10 CRITICAL and all 32 HIGH-severity items are
shipped. Audit findings and fix decisions are tracked in commit history.

## Stack

Plain HTML, CSS, JavaScript. No build step. No framework. The site is
intentionally framework-free so it can be served from any static host with
zero runtime dependencies.

Fonts: Fraunces (serif display) + Outfit (sans-serif body), loaded from
Google Fonts.

Form submissions: routed via [Formspree](https://formspree.io) — see DEPLOY.md
to wire the real form ID before launch.

## Contact

Sales: [sales@anara.health](mailto:sales@anara.health)
Privacy: [privacy@anara.health](mailto:privacy@anara.health)
WhatsApp: [+91 90563 32891](https://wa.me/919056332891)
