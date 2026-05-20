# Anara Health — Deploy Checklist

Production hosting requirements. These are configured at the web server / CDN
layer, not in HTML. Apply before flipping DNS at `anara.health`.

## 1. Canonical page served at `/`

The canonical landing page lives at `docs/index.html` and responds at
`https://anara.health/`. The Apache `DirectoryIndex` is set in `.htaccess`
so this works out of the box on cPanel / Apache. Static hosts (Netlify /
Vercel / Cloudflare Pages) serve `index.html` at `/` by convention — no
extra config needed.

The older variant prototypes (anara-v1-bento.html … anara-v7-swiss.html,
picker.html, header.html) have been moved to `archive/docs/` and are not
deployed. They are also listed in `robots.txt` under `Disallow:` as
belt-and-braces, in case stale links exist somewhere.

## 2. Response headers (security)

Add at edge / origin:

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; form-action https://formspree.io; frame-ancestors 'none'; base-uri 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
```

If you self-host fonts (recommended — see §5), tighten the CSP further:
remove `https://fonts.googleapis.com` from `style-src` and
`https://fonts.gstatic.com` from `font-src`.

## 3. Response headers (cache + compression)

```
# All hashed assets (images, fonts, css/js once you fingerprint them)
Cache-Control: public, max-age=31536000, immutable

# Unhashed HTML
Cache-Control: public, max-age=300, must-revalidate

# Compression
Content-Encoding: br      # brotli preferred; gzip acceptable
```

Brotli compresses the 76KB CSS to ~12KB on the wire — required for the <1.5s
LCP target.

## 4. Minify CSS + JS before upload

The repo ships unminified for readability. Add a build step:

```bash
npx esbuild docs/anara-v2-glass.css --minify --outfile=docs/anara-v2-glass.min.css
npx esbuild docs/anara-v2-glass.js  --minify --outfile=docs/anara-v2-glass.min.js
```

Then point the `<link>` and `<script>` tags to the `.min` files at deploy time.
Expected reduction: CSS 76KB → ~52KB, JS 18KB → ~10KB.

## 5. Self-host fonts (optional but recommended)

Currently loads from Google Fonts (Fraunces + Outfit). Self-hosting:

- Saves 1 third-party origin (preconnect, DNS, TLS).
- Tightens CSP (no `https://fonts.*` whitelist needed).
- Adds cache-control immutable for the woff2 files.

Use [google-webfonts-helper](https://gwfh.mranftl.com/) to download the woff2
subset (latin only saves ~40% per file), then update the `<link>` in
`index.html` to point at the local files.

## 6. Replace placeholders before launch

| File | Placeholder | Replace with |
|------|-------------|--------------|
| `index.html:885` | `REPLACE_WITH_YOUR_ID` in `https://formspree.io/f/REPLACE_WITH_YOUR_ID` | Real Formspree form ID |
| `index.html` head | `/apple-touch-icon.png` | 180×180 PNG icon |
| `index.html` head | `og-cover.jpg` references (currently using `indian-family-1500.png` as a fallback OG image) | 1200×630 branded JPEG for sharper share cards |

Add a deploy gate that rejects builds containing `REPLACE_WITH_YOUR_ID`:

```bash
grep -r "REPLACE_WITH_YOUR_ID" docs/ && echo "ERR: placeholder still present" && exit 1
```

## 7. Generate OG cover image (1200×630)

Currently `og:image` points at `https://anara.health/indian-family-1500.png`
(the hero family photo, 1500×1015). Social platforms will crop it. For sharper
share cards, design a dedicated 1200×630 JPEG:

- Anara wordmark top-left
- Hero family photo (or alternate brand imagery) centered
- Tagline "Corporate Healthcare for India's Workforce" bottom

Save as `docs/og-cover.jpg` (<200KB) and update the three OG/Twitter image
references in `index.html`.

## 8. Subresource Integrity (SRI) for third-party

If you keep loading from `fonts.googleapis.com` instead of self-hosting (§5),
note that Google rotates the CSS file, so SRI hashes can't be pinned. Either
accept this trade-off or self-host. Don't load any other third-party CSS/JS
without an SRI hash.

## 9. Social account handles

The footer's social-link block was removed because the previous URLs pointed
at bare domains (`https://www.linkedin.com/`, `https://www.instagram.com/`,
`https://twitter.com/`). Restore the block when handles are confirmed.
Each link must have `rel="noopener noreferrer"` and a real handle URL.

## 10. Verify after deploy

```bash
# Headers
curl -sI https://anara.health/ | grep -iE "strict-transport|csp|x-frame|referrer|cache"

# Sitemap + robots
curl -s https://anara.health/robots.txt
curl -s https://anara.health/sitemap.xml

# Structured data
# Paste rendered HTML into https://search.google.com/test/rich-results

# Performance
# Run https://pagespeed.web.dev/?url=https://anara.health/
# Target: LCP <1.5s mobile (4G), CLS <0.1, INP <200ms
```

## 11. Monitoring (post-launch)

- Search Console: submit sitemap, verify ownership, track indexing.
- Analytics (GA4 or Plausible): track conversion events on form submit.
- Uptime monitor: ping `/` every 5 min, alert on 5xx.
- Error tracking (Sentry / Rollbar): wire into the form-submit fetch path.
