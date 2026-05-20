# Anara V2-Glass — Asset Procurement Spec

**For:** Vivek Kandula / Anara Health
**Use:** Replace all placeholder visuals on `anara-v2-glass.html` to reach 10/10 premium glassmorphism.
**Status:** placeholders are intentional CSS gradient + monogram. They read as deliberate design until replaced. Replace one section at a time; the page remains shippable throughout.

This is the **single source of truth** for every image, video, logo, and badge that must be procured. Each row tells you exactly what to shoot, at what resolution, in what style, and where it lands in the HTML.

---

## Asset Priority Tiers

| Tier | What | Impact on 10/10 score |
|---|---|---|
| **P0 — Ship-stoppers** | Hero photography, founder portrait, client logos, compliance badges | +1.5 pts (6→7.5) |
| **P1 — High impact** | Team portraits, named-testimonial portraits, on-site engagement photos | +0.8 pts (7.5→8.3) |
| **P2 — Premium polish** | Press logos, sample PDF, video, custom favicon, OG cover | +0.7 pts (8.3→9.0) |
| **P3 — Future tiers** | 3D/WebGL hero, custom icon family, brand video | +1.0 pts (9.0→10) |

---

## A1. Hero photography — P0 [TOP PRIORITY]

**Where in HTML:** `<section class="h1">` → `.stack` block. Three `<img>` tags currently using Unsplash stock URLs.

**What:** Three commissioned photographs from a single shoot, color-graded identically, telling the story of an Anara engagement from first contact to follow-up.

**Style direction:**
- Cinematic, slightly desaturated (saturation -10%), warm tonal grade (lift shadows toward 5500K)
- Documentary realism — NOT corporate stock. People mid-action, never posing into camera.
- India context visible (office context, signage, environment)
- Natural light preferred; if studio, soft north-light feel
- Avoid the healthcare-stock cliches: smiling clinician with tablet, blue gradient backdrop, white lab coat + stethoscope, generic medical equipment closeups, DNA helix imagery

**Three required compositions:**

1. **`hero-1.jpg`** — Doctor + employee in conversation at an on-site clinic table. Doctor mid-explanation, gesturing toward a tablet showing health data. Side-angle, three-quarter framing. Anara-branded folder or pen visible.
2. **`hero-2.jpg`** — Wide shot of the on-site clinic setup in a corporate lobby/conference room. Curtain dividers, screening stations, employees waiting. Shows the operational scale that's the differentiator.
3. **`hero-3.jpg`** — Closer crop of an employee on their phone receiving the WhatsApp follow-up. Phone screen visible (mock the conversation onto the screen in post). Hands + phone composition.

**Technical:**
- Dimensions: 1800×1800 minimum, 4:5 portrait crop
- Format: JPEG, sRGB, quality 85
- Filename pattern: `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg`
- Save under `docs/img/hero/`
- Optimize: pass through Squoosh.app to MozJPEG at q=82 + WebP fallback

**Replace in HTML:**
```html
<!-- Current -->
<img src="https://images.unsplash.com/..." ... />

<!-- New -->
<img src="img/hero/hero-1.jpg" alt="Anara doctor reviewing health results with employee at an on-site clinic" width="900" height="1125" fetchpriority="high" decoding="async" />
```

**Substitute if photo shoot is delayed (3+ months):** Use Pexels / Stocksy curated India healthcare set, NOT Unsplash. Apply uniform Lightroom preset for color consistency.

---

## A2. Founder portrait — Rahul Reddy — P0

**Where in HTML:** `.g-founder-block .g-portrait` (currently shows monogram "RR" on purple gradient).

**What:** One environmental portrait. Three-quarter angle, eye-level. Subject looks slightly off-camera (avoid direct-to-camera CEO stare). Setting: Anara office OR a clinical environment OR a clean neutral seamless backdrop in purple-tinted lavender (#FAF7FF). Wardrobe: business casual, soft texture (no flat black suit).

**Technical:**
- Dimensions: 1200×1500 (4:5)
- Plus crops: 600×600 (1:1, for footer use), 1080×1080 (Open Graph share variant)
- Format: JPEG, sRGB, q=85
- Filename: `founder-rahul-reddy.jpg`
- Save under `docs/img/team/`

**Replace in HTML:**
```html
<figure class="g-portrait g-portrait--a" aria-hidden="true">
  <span class="monogram">RR</span>
  <span class="placeholder-tag">Placeholder · replace with portrait</span>
</figure>
```
becomes
```html
<figure class="g-portrait">
  <img src="img/team/founder-rahul-reddy.jpg" alt="Rahul Reddy, Founder and CEO of Anara Health" width="600" height="750" loading="lazy" />
</figure>
```

**Also required:** LinkedIn URL for Rahul (currently placeholder `https://www.linkedin.com/`).

---

## A3. Compliance badges — P0

**Where in HTML:** `.g-compliance-row` (5 badges currently rendered with CSS-only "D N ISO A M" lettermarks).

**What:** Either keep the CSS lettermark approach (already premium-looking, costs nothing) OR commission small SVG badge marks. The text underneath is the trust signal — the icon is visual rhythm.

**If procuring real badges:**
- **DPDP Act 2023** — no official badge exists. Keep CSS lettermark "D" or use a small shield SVG with "DPDP" text.
- **NABL** — official NABL India logo (PNG) available from `nabl-india.org/logos`. Verify usage rights before placing.
- **ISO 27001** — only if Anara has actually certified. If not, REMOVE this badge. Faking it is regulatory risk.
- **Azure Central India** — Microsoft Azure logo permitted under press kit terms. Or keep CSS lettermark.
- **MBBS / MD** — no badge. CSS lettermark is fine.

**Decision recommended:** Keep all 5 as CSS lettermarks. Verify ISO 27001 status — if not certified, replace with **"SOC 2 in pursuit"** or **"NABH-empanelled doctors"**.

---

## A4. Client logos — P0 (BLOCKED ON CONSENT)

**Where in HTML:** `.h1 .g-logo-wall` (currently 5 text spans: Razorpay, Swiggy, Zerodha, CRED, PhonePe).

**Critical:** Do NOT show client logos without written permission. The current text-only treatment is honest. Replacing with real logos requires:

1. Written consent from each client (LinkedIn DM or formal letter)
2. Official SVG logo from their press kit (NOT scraped from their website)
3. Single-color (monochrome) usage rights confirmed

**Recommended approach:**
- Get permission from 3-5 actual current clients (regardless of name brand)
- Render their logos at 32px height, single colour (`var(--pg-ink-soft)`, 60% opacity)
- Hover state: 100% opacity, original brand color
- Filename: `img/logos/client-{name}.svg`

**Format spec:**
- SVG, optimized via SVGO
- 32px height, width auto
- Single-color version (no gradients, no shadows) for the wall
- Save under `docs/img/logos/`

**HTML pattern:**
```html
<li><img class="logo" src="img/logos/client-razorpay.svg" alt="Razorpay" height="32" /></li>
```

**Fallback if no consent yet:** Keep the current text spans. They look premium with the new CSS treatment. Mark in code: `<!-- TODO: replace with real client logos when permission secured. -->`

---

## A5. Team portraits — P1

**Where in HTML:** `.g-team-photos` (8 placeholder portraits with monograms).

**What:** Consistent treatment across all 8 (and any future additions). Same backdrop, same lighting, same time of day, same wardrobe palette. Photographed in one or two sessions to ensure visual consistency.

**Style:**
- Studio with purple-tinted lavender backdrop (#F0E6F5 → #FAF7FF)
- Three-quarter angle, looking 15° off-camera
- Soft key light upper-left (matches the page's implied light source)
- Same wardrobe palette: muted ink + cream + purple accent

**Technical:**
- Dimensions: 800×800 (1:1)
- Format: JPEG, sRGB, q=85
- Filename pattern: `img/team/dr-a-sharma.jpg`, `img/team/dr-p-krishnan.jpg`, etc.
- Optimize via Squoosh + WebP fallback

**HTML pattern:**
```html
<figure class="g-portrait">
  <img src="img/team/dr-a-sharma.jpg" alt="Dr. A. Sharma, CMO of Anara Health" width="400" height="400" loading="lazy" />
</figure>
```

**Verify with each person:**
- Real name (currently placeholders: A. Sharma, P. Krishnan, R. Menon, S. Nair, V. Kapoor, A. Rao, M. Sundaram, I. Kaur)
- Real title
- LinkedIn URL
- Medical license number for clinicians (display in modal or tooltip)

---

## A6. Named testimonial portraits — P1

**Where in HTML:** `.g-tc-named .g-tc-meta .g-portrait` (3 placeholders RM / PM / TR).

**What:** Real headshots from the actual quoted contacts. Same treatment as team portraits (see A5) but typically supplied by the client, not commissioned.

**Critical:**
- Get **written permission** from each named contact before showing photo+name+company together
- If they prefer anonymity, keep monogram and add a "Name on file · consent for case study under NDA" line

**Technical:**
- 200×200 minimum, 1:1
- Cropped tight to face (top of head to collarbone)
- Save under `docs/img/testimonials/`

---

## A7. Press logos — P2

**Where in HTML:** `.g-press-row` (5 placeholder text spans: Forbes India, ET, YourStory, Inc42, LiveMint).

**Critical:** Only include outlets where Anara has actually been featured AND you can link to the live article. **Faking press kills trust faster than having none.**

**For each verified press mention:**
- Get the official outlet logo (SVG from their press kit)
- Link to the actual article URL
- Single-color monochrome treatment at 18-24px height

**HTML pattern:**
```html
<a class="press-logo" href="https://www.forbesindia.com/article/..." rel="noopener">
  <img src="img/press/forbes-india.svg" alt="Featured in Forbes India" height="22" />
</a>
```

**If no press yet:** Remove the entire `.g-press-strip` section. Empty press = honesty. Fake press = liability.

---

## A8. Real sample PDF report — P2

**Where in HTML:** `#sample-report` section — currently a CSS browser-chrome mock.

**What:** A real anonymised population health report PDF (8-12 pages) embeddable via PDF.js viewer or `<embed type="application/pdf">`.

**Spec:**
- A4 portrait, 8-12 pages
- Cover + summary + 3-4 metric breakdowns + appendix
- Fully anonymized client identifiers
- Branded in Anara visual identity (Fraunces serif headings, Geist sans body)
- Generated as actual PDF, not screenshot

**Replace in HTML:** Add an iframe or PDF.js viewer below the existing CSS mock, with a "Download anonymised full report" button.

---

## A9. On-site engagement gallery — P1

**Where in HTML:** `.g-gallery-grid` (4 CSS mockup tiles currently).

**What:** 6-8 real photographs from active client engagements. Replace CSS mockups with real photos showing:

1. On-site clinic in a corporate lobby (wide establishing shot)
2. Doctor + employee one-on-one consultation (close, intimate)
3. Phone screen capture of an actual WhatsApp summary (use a real conversation with PII removed)
4. Population report being reviewed at a leadership meeting (over-the-shoulder)
5. Lab coordinator processing samples (procedural)
6. Care manager doing a home visit for elder care (warm, domestic)
7. Telehealth consultation in progress (split-screen feel)
8. Group of doctors in Anara office reviewing a complex case (clinical credibility)

**Spec same as A1.** Save under `docs/img/gallery/`.

**Replace each `<figure class="g-gcard">` `.g-mockart` block with `<img>` tag.**

---

## A10. Founder video — P2 (optional but 10/10 needs at least one video)

**What:** 30-60 second silent loop, plays in hero or as a section break.

**Direction:**
- Founder talking to camera OR documentary cuts of an Anara engagement day OR mix
- No music, no voiceover (silent loops respect autoplay)
- Captions optional, burned in at the bottom 1/3
- Color graded to match site palette

**Technical:**
- Format: MP4 (H.264) + WebM (VP9)
- Resolution: 1920×1080
- File size: ≤4 MB per format (10 MB worst case)
- Filename: `img/video/founder-loop.mp4` + `.webm`

---

## A11. Customer video testimonial — P2

**What:** 30-60 second on-camera quote from a real HR Director. Same direction as A10 but with quoted captions burned in (because muted autoplay).

**Critical:** Written video release + agreement on what footage can air.

---

## A12. Open Graph + favicon set — P2

**Where in HTML:**
- `<meta property="og:image" content="https://anara.health/og-cover.jpg" />`
- `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,..." />` (currently inline SVG)

**OG cover image (`og-cover.jpg`):**
- 1200×630, JPEG q=85
- Brand mark + tagline + dominant purple gradient
- Tested via opengraph.xyz preview

**Favicon set:**
- `favicon.ico` (32×32 ICO)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180×180)
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`
- `site.webmanifest`

Use realfavicongenerator.net to generate the set from a 512×512 source SVG.

---

## A13. Custom icon family — P3 (Tier 5)

**Current:** 24+ Lucide-style stroke icons, mixed sources, inconsistent.

**Premium upgrade:** Commission a 40-60 icon family with:
- Consistent 1.8px stroke
- Slightly hand-tuned terminals (rounded but not perfectly geometric)
- Designed for the medical/healthcare context (stethoscope, clipboard, vials, on-site clinic kit, etc.)
- SVG sprite or React/Vue component set

**Vendor recommendation:** Streamline, Iconscout custom set, or commission Fons Mans / Iconfair.

---

## Color grading & visual consistency — apply to ALL photo assets

A unified Lightroom / Capture One preset that all photography passes through. The preset should:

1. **Reduce saturation** by 8-12% globally (premium = restrained colour)
2. **Lift shadows** slightly to +15 (warm midshadows)
3. **Drop highlights** to -10 (no blown-out windows)
4. **Add warmth** to white balance (+200K from neutral)
5. **Add green tint** -3 to push the magenta complement softly
6. **Vignette** -8 to focus the eye
7. **Grain** +2 for filmic texture (matches the page's grain overlay)
8. **HSL: orange channel** saturation -15, luminance +5 (skin tones)
9. **HSL: blue channel** saturation -8 (avoid corporate blue)

Save the preset as `Anara-Standard.xmp` and apply to every commissioned image.

---

## File structure

Create this directory tree under `docs/`:

```
docs/
  img/
    hero/                  (hero-1.jpg, hero-2.jpg, hero-3.jpg)
    team/                  (founder-rahul-reddy.jpg, dr-a-sharma.jpg, ...)
    testimonials/          (rm.jpg, pm.jpg, tr.jpg, ...)
    logos/                 (client-razorpay.svg, client-swiggy.svg, ...)
    press/                 (forbes-india.svg, et.svg, ...)
    gallery/               (clinic-setup.jpg, whatsapp-followup.jpg, ...)
    video/                 (founder-loop.mp4, founder-loop.webm, ...)
    og-cover.jpg
    apple-touch-icon.png
    favicon-32x32.png
    favicon-16x16.png
    site.webmanifest
```

All asset filenames lowercase, kebab-case, descriptive (not generic IDs).

---

## Replacement procedure (per asset)

1. Drop the new file into the correct subdirectory
2. Find the matching placeholder in `anara-v2-glass.html` (search for the ASSET comment)
3. Replace the placeholder `<figure>` block with the real `<img>` tag (HTML pattern given per asset above)
4. Remove the `placeholder-tag` span if present
5. Reload the page — premium glass treatment of the surrounding card stays intact, the photo just slides in

---

## When everything is replaced — final score check

Run page against the 20-item premium-glass checklist in the audit. Target: 18 of 20. With all P0 + P1 assets replaced + Tier 5 (video + custom icons) deferred:

- All glass-material checks: pass (CSS-driven, already 10/10)
- Stock photography removed: pass
- Logo wall monochrome: pass
- SOC2/DPDP/NABL badges visible: pass
- Real founder photo: pass
- Real team photos: pass
- Named testimonials with photos: pass
- 3-tier transparent pricing: pass (already done)
- Press strip with real links: pass (or removed)
- Video testimonial: deferred to Tier 5

**Estimated score after asset procurement: 9.0 / 10**

Final 1.0 point gap: 3D/WebGL hero, custom icon family, brand video — Tier 5 future iteration.

---

## Photographer / vendor recommendations (India)

- **On-site documentary photography:** Bandeep Singh, Vicky Roy, Showkat Nanda (editorial photojournalism style)
- **Studio portraits (Bengaluru/Mumbai):** Akarshan Studio, Niraj Gera Photography, Bhumika Studio
- **Mid-tier reliable:** Avinash Sharma (Mumbai), Yash Bhanage (Bengaluru)
- **Video production:** Frizzon Studios, OML, Vice India (corporate documentary)

Budget guidance for the P0 + P1 stack:
- Hero photoshoot (1 day, 3 hero shots + reuse for gallery): ₹80K–₹1.5L
- Founder + team studio session (1 day, 9 portraits): ₹40K–₹80K
- Logo design + brand polish (if commissioning): ₹50K–₹1L
- Color grading preset development: ₹15K
- Total P0+P1: **₹1.85L–₹3.45L** (roughly $2,200–$4,200)

---

*Document owned by Vivek Kandula. Update with every shoot. Mark assets as ✅ delivered or ⏳ in production.*
