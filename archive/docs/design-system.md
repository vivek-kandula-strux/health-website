# Anara Health — Design System

**Variant:** v2-glass (`docs/anara-v2-glass.html`)
**Date:** 2026-05-17
**Status:** Living document — update with every meaningful UI change.

The Anara design system is built for a single buyer persona: the **HR Director at an MNC or GCC in India** who reports up to a global CHRO and inwards to procurement and finance. Every choice below — colour, type, spacing, motion, voice — is selected to register as *clinical credibility wrapped in premium polish*, not consumer-app flash.

---

## 1. Brand Premise

| | |
|---|---|
| **Mission** | Corporate healthcare that India's HR teams can actually deliver on. |
| **Promise** | 85%+ participation. Every employee followed up personally. No new budget line. |
| **Voice** | Direct, confident, operational. Founder-led. Never salesy, never apologetic. |
| **Anti-voice** | "Cutting-edge solutions". "Holistic wellness journeys". "Empowering employees". |

**Three things every page must communicate inside the first 800px of scroll:**
1. We come to your office (operational difference).
2. We follow up with every employee (closes the participation loop).
3. We fit inside your existing GMC / OPD budget (no procurement battle).

---

## 2. Colour System

### Primary palette

| Token | Hex | Role |
|---|---|---|
| `--anara-purple` | `#8E108C` | Primary brand. CTAs, headings accents, recommended states, links. |
| `--anara-purple-deep` | `#6C0C69` | Hover/active for primary purple. Gradient stops. |
| `--anara-gold` | `#C9A56C` | Accent. "RECOMMENDED" badges, focus rings, CTA shimmer. Used sparingly — gold is the second voice, not the first. |
| `--anara-ink` | `#1D0A2F` | Primary text on light surfaces. Never pure black. |
| `--anara-ink-deep` | `#140624` | Hero overlay shadows, footer base. |
| `--anara-cream` | `#FCF8FF` | Tinted neutral background. Used in trust strip + comparison head row. |

### Semantic colours

| Token | Hex | Use |
|---|---|---|
| `--success` | `#15803D` | Good state in comparison rows, mock chart bars, checkmarks. |
| `--success-soft` | `#4FB37A` | Gradient endpoint for success bars. |
| `--warning` | `#E89A3F` | Mock chart warning bars (gradient with red). |
| `--danger` | `#B91C1C` | Bad state in comparison rows. Destructive markers. |
| `--whatsapp` | `#25D366` | WhatsApp FAB only. Don't reuse for other accents. |

### Text on dark / glass overrides

| Context | Token |
|---|---|
| White on glass | `rgba(255,255,255,0.85)` — labels |
| White on glass | `rgba(255,255,255,0.78)` — body |
| Ink on glass | `rgba(29,10,47,0.78)` — secondary body |
| Ink on glass | `rgba(29,10,47,0.62)` — captions, helper text |

### Pairing rules

1. Purple + Gold is the only two-colour gradient permitted (`linear-gradient(135deg, #8E108C 0%, #C9A56C 100%)`). Used on: brand mark hover, scroll progress bar, monogram avatars, mock chart bars.
2. **Never** use red and green as the only signal of state (WCAG colour-only rule). Always pair with icon (`✓` / `✕`) or label.
3. Dark mode is not currently supported. If added, desaturate purple by 15% and lift ink to `#E8DDF0`.

---

## 3. Typography

### Type families

| Family | Use | Weights loaded |
|---|---|---|
| **Fraunces** (variable serif) | Headings, blockquotes, pull stats, mock chart titles | 400, 500, 600, 700 |
| **Inter** (sans-serif) | Body, UI, navigation, labels, form fields | 400, 500, 600, 700 |

Loaded via Google Fonts with `display=swap` and preconnect.

### Scale (consolidated to 8 steps)

| Token | Size | Use |
|---|---|---|
| `--t-xs` | 11px | Eyebrows, RECOMMENDED badge — uppercase + letter-spacing |
| `--t-sm` | 13px | Hero credential pills, footer platforms, captions |
| `--t-base` | 14–15px | Body text, card descriptions, form labels |
| `--t-md` | 16–17px | Sub-heads, FAQ summary text |
| `--t-lg` | 19–24px | Role cards, founder quote body |
| `--t-xl` | 28–34px | Section h2 (Pricing, What we don't do) |
| `--t-2xl` | clamp(36px, 5vw, 52px) | Pricing figure ₹5K–15K, founder quote-mark |
| `--t-display` | clamp(36px, 6vw, 64px) | Hero h1, primary section h2 |

### Rules

- **Body minimum:** 14px desktop, 15px mobile. Anything smaller is reserved for eyebrows and badges (and must be uppercase with `letter-spacing: 0.12em+` to remain legible).
- **Line height:** 1.5 for body, 1.2–1.3 for display, 1.45 for blockquotes.
- **Letter-spacing:** Default for body. `-0.005em to -0.01em` for h1/h2. `0.12–0.18em` for uppercase eyebrows.
- **Weight hierarchy:** 600 for h1/h2/h3, 500 for medium emphasis, 400 default body, 700 reserved for inline `<strong>` and stats.
- **Numbers:** Fraunces 600 with `font-variant-numeric: tabular-nums` for pricing, stats, comparison values to prevent layout shift.

---

## 4. Spacing & Layout

### Spacing scale (8pt rhythm)

| Token | Px | Use |
|---|---|---|
| `--space-1` | 4 | Inline gap between icon and label |
| `--space-2` | 8 | Tag/pill internal padding-y |
| `--space-3` | 12 | Card internal gap |
| `--space-4` | 16 | Card padding small |
| `--space-5` | 20 | Card padding medium |
| `--space-6` | 24 | Card padding default |
| `--space-7` | 32 | Section internal gap |
| `--space-8` | 48 | Section sub-block gap |
| `--space-9` | 64 | Section vertical padding (mobile) |
| `--space-10` | 100 | Section vertical padding (desktop) |

Use `clamp(min, vw, max)` for responsive section padding instead of explicit breakpoints — e.g., `clamp(60px, 9vw, 110px)`.

### Container

- **Max width:** 1200px default. 1100px for comparison strip + sample report (data-dense). 980px for pricing card + what-we-don't-do (text-dense). 920px for founder quote (focal).
- **Side padding:** `clamp(20px, 4vw, 32px)` — adapts gutter to device width.

### Breakpoints

| Width | Reflow |
|---|---|
| ≥ 1024px | Default grid (3-col services, 2-col pricing, etc.) |
| 720–1023px | Comparison strip stacks to 1-col, role grid drops to 2-col |
| ≤ 600px | Form grid stacks to 1-col, role grid stacks to 1-col, FAB labels hide |
| ≤ 375px | Hero h1 reduces, ticker stacks vertically |

### Z-index scale

| Layer | Value | Use |
|---|---|---|
| Base | 0 | Default flow |
| Sticky nav | 100 | Header nav-wrap |
| FAB | 950 | WhatsApp + Call cluster |
| Modals | 1000+ | Reserved — not currently used |
| Scroll progress | 9999 | Top progress bar |

---

## 5. Effects & Materials

### Glass card recipe

```css
background: rgba(255, 255, 255, 0.65);
backdrop-filter: blur(22px) saturate(140%);
-webkit-backdrop-filter: blur(22px) saturate(140%);
border: 1px solid rgba(255, 255, 255, 0.65);
border-radius: 28px;
box-shadow: 0 24px 60px -28px rgba(36, 12, 52, 0.28);
```

**Blur intensity by context:**
- Hero glass card: 22px (atop photography) — needs strong separation
- Standard glass card: 16px
- Trust pill: 8–10px
- Modal/dialog (future): 24px + saturate(160%)

**Border opacity:**
- On light bg: `rgba(255,255,255,0.65)` — visible highlight
- On dark/photo bg: `rgba(255,255,255,0.5)` — softer
- Hover state: +0.15 opacity bump

### Elevation scale (shadow)

| Level | Shadow | Use |
|---|---|---|
| 0 | none | Inline elements |
| 1 | `0 6px 18px -8px rgba(142, 16, 140, 0.28)` | Hover lift on trust pills |
| 2 | `0 12px 30px -8px rgba(36, 12, 52, 0.4)` | FAB resting state |
| 3 | `0 24px 60px -28px rgba(36, 12, 52, 0.28)` | Glass cards default |
| 4 | `0 30px 80px -36px rgba(36, 12, 52, 0.28)` | Comparison strip, sample mock |

Shadows must always include a negative spread to keep them tight and *implied* rather than heavy.

### Border radius scale

| Token | Value | Use |
|---|---|---|
| `--r-pill` | 999px | Pills, badges, FAB, buttons |
| `--r-input` | 12px | Form fields |
| `--r-sm` | 14px | Inline alerts, success/error messages |
| `--r-md` | 22px | Sample mock inner card |
| `--r-lg` | 28px | Glass cards default |
| `--r-xl` | 32px | Hero overlay (if used) |

---

## 6. Components

### Button

| Variant | Class | Use |
|---|---|---|
| Primary | `.btn .btn-primary` | One per section. Purple, with gold shimmer on hover. |
| Outline (on light) | `.btn .btn-outline` | Secondary action paired with primary. |
| Ghost (on dark) | `.btn .btn-ghost-light` | Secondary action when primary is on dark background. |
| Pill nav | `.btn .btn-pill` | Header nav CTA only. |

**Rules:**
- Minimum touch target: 44px height. All buttons currently meet this via padding.
- Hover: `translateY(-2px)` + lift shadow. Active: `translateY(0)` with 80ms transition.
- Primary button shimmer: 600ms diagonal sweep on hover. Disabled under `prefers-reduced-motion`.
- One primary CTA per section maximum.

### Glass card

```html
<article class="g-glass-card">…</article>
```

- Always rounded 28px.
- Cursor-glow on `pointermove` (desktop) — set `--mx` and `--my` custom props.
- Focus-visible: 2px gold outline, 4px offset.
- Hover lift: -4px on `a.g-glass-card` and `.g-service-card`. Disabled under reduced motion.

### Pills

| Variant | Background | Border | Use |
|---|---|---|---|
| Trust pill | `rgba(255,255,255,0.7)` + blur 8px | `rgba(142,16,140,0.12)` | Industry + city pills in trust strip |
| Hero credential pill | `rgba(255,255,255,0.72)` + blur 10px | `rgba(255,255,255,0.65)` | Hero compliance pills |
| Service tag (Package 01) | `rgba(142,16,140,0.08)` | `rgba(142,16,140,0.18)` | Service card eyebrow tag |

### Form fields

- Height: minimum 44px.
- Background: `rgba(255,255,255,0.94)` — high-contrast inside the dark CTA section.
- Focus ring: 3px `rgba(201,165,108,0.25)` (gold at low opacity) + 1px gold border.
- Labels: 12px, 600 weight, uppercase, 0.06em letter-spacing — sits above input.
- Required indicator: gold asterisk, not red.

### FAQ accordion

- One-open-at-a-time enforced via JS.
- `transitionend` listener animates height smoothly.
- Chevron rotates 180° on `[open]` state.
- Summary minimum 56px height for touch.

---

## 7. Motion

### Duration tokens

| Token | Value | Use |
|---|---|---|
| `--motion-1` | 80ms | Active/press state |
| `--motion-2` | 150ms | Micro-interactions, hover |
| `--motion-3` | 220ms | Card lift, button hover |
| `--motion-4` | 300ms | FAQ accordion, content reveal |
| `--motion-5` | 600ms | Primary button shimmer, count-up |
| `--motion-6` | 1400ms | Stat ticker count-up |

### Easing

- Default: `cubic-bezier(0.34, 1.56, 0.64, 1)` — soft spring out, used on button hover.
- Reveal: ease-out only — never linear, never ease-in for entering content.
- Exit: 60–70% of entry duration.

### Reduced motion

`@media (prefers-reduced-motion: reduce)` MUST disable:
- Hero parallax translate
- Card hover translateY
- Button shimmer
- Pulse dot animation
- Count-up animation (jump to target value)
- Cursor glow tracking

Smooth-scroll `scroll-behavior: smooth` also reverts to `auto`.

---

## 8. Imagery

### Photography rules

- **Documentary > stock when claiming real engagements.** Use stock only when framing is illustrative.
- Captions must match the framing. Don't write "Bengaluru, on-site clinic" over a stock photo. Use "On-site clinic day" + descriptive body copy.
- Alt text discipline: describe what is *visually shown*, never claim it represents real Anara work unless it does. Append "— illustrative" when stock.
- **Aspect ratios:** 1:1 for gallery tall cards, 4:3 for gallery wide cards, 16:9 for backdrop images.
- All images: `loading="lazy"`, `decoding="async"`, declared width/height to prevent CLS. Hero image is the only `fetchpriority="high"` + preloaded.

### Icons

- **SVG only.** Never emoji.
- Stroke width: 1.8 or 2.0 — consistent within a section.
- Size: 14px (inline labels), 18px (FAB, comparison), 22px (service cards, principles cards).
- Colour: `currentColor` so it inherits — except brand mark (`#8E108C`) and success/danger states.
- Icon families allowed: Lucide-style stroke icons. **No mixed sets.**

---

## 9. Voice & Copywriting Principles

### Diagnostic, not aspirational

✅ "Your benefits package is strong. Your employees still are not getting healthier."
❌ "Transform your wellness journey with Anara."

### Operational, not glossy

✅ "We come to your office. We run the health checks. We follow up on WhatsApp."
❌ "Cutting-edge AI-powered preventive care platform."

### Numbers always specific, never approximate

✅ "85%+ participation."
❌ "Industry-leading participation."

### One promise per section

Each section answers one question. Don't pile up.

| Section | Question it answers |
|---|---|
| Hero | What is this? |
| Trust strip | Who else trusts you? |
| About | Why are you different? |
| Why Anara | What do I get? |
| Comparison strip | How are you better than what I have? |
| Founder quote | Why does this exist? |
| Services | What can I buy? |
| Pricing | What does it cost? |
| Sample report | What will my CHRO see? |
| What we don't do | Where do you stop? |
| Process | What does week-1 look like? |
| Gallery | What does this look like? |
| Team | Who actually does the work? |
| Testimonials | Who else says this works? |
| Principles | Is this built for me specifically? |
| FAQ | What are the objections I have? |
| CTA | How do I start? |

### Words to avoid

`solutions`, `journey`, `empower`, `seamless`, `holistic`, `synergy`, `cutting-edge`, `revolutionary`, `disrupting`, `passionate`, `world-class`, `best-in-class`.

### Phrases that work (keep)

- "No new budget line."
- "Short of putting the pill in their mouth..."
- "A story you can tell at global health and wellness reviews."
- "Ready to make your India HR look good?"
- "We come during working hours, we come to your office, and we make it easy."

---

## 10. Accessibility Floor

Every page must meet:

| Requirement | Floor |
|---|---|
| Body text contrast | ≥ 4.5:1 (WCAG AA) |
| Large text + UI components | ≥ 3:1 |
| Touch target | ≥ 44×44 CSS px (Apple HIG) |
| Focus indicator | 2px gold outline, 3–4px offset, never removed |
| Keyboard navigation | Tab order matches visual order. Skip-link first. |
| Reduced motion | All decorative animation disabled |
| Screen-reader landmarks | `header`, `main`, `footer`, `nav`, `aside` for FAB |
| Alt text | All meaningful images. Stock images marked "illustrative." |
| Heading hierarchy | Sequential h1 → h6. No skips. One h1 per page. |
| Form labels | Visible above each input. Required marked with asterisk + colour. |
| Toast / status | `aria-live="polite"` on success state, `role="status"` on form feedback |
| Colour-only meaning | Never. Pair colour with icon + label. |

---

## 11. Page Structure & Section Order

**Canonical order for v2-glass (and all marketing variants):**

1. **Hero** — headline, subhead, 2 CTAs, credential pills, ticker
2. **Trust strip** — industry pills + city pills + partner count
3. **About** — split image + glass card with differentiator
4. **Why Anara** — 4-card grid with reasons
5. **Comparison strip** — Anara vs Traditional, 6 dimensions
6. **Founder quote break**
7. **Services** — 4 service packages on dark backdrop
8. **Pricing band** — ₹ range + OPD-fit messaging
9. **Sample report** — population health mock + CTA
10. **What we don't do** — 6 boundaries
11. **Process** — 4 steps on dark backdrop
12. **Gallery** — 4 illustrative scenes
13. **Team** — 6 role cards + founder quote on darker backdrop
14. **Testimonials** — 3 cards
15. **Principles** — 4-card grid (HR-team-specific reasons)
16. **FAQ** — 6 collapsible items
17. **Final CTA** — lead capture form + contact strip
18. **Footer** — brand, services, company, get started, legal base

**Rationale for the order:**
- Hero → Trust strip → About: hook → social proof → differentiator
- Why → Comparison → Founder: belief building (rational → comparative → emotional)
- Services → Pricing → Sample → Boundaries: full offer disclosure
- Process → Gallery → Team: how it actually happens
- Testimonials → Principles → FAQ: residual objection handling
- CTA → Footer: convert, then resources

---

## 12. Performance Floor

| Metric | Target |
|---|---|
| LCP | < 2.5s on 4G |
| CLS | < 0.05 |
| INP | < 200ms |
| First Contentful Paint | < 1.8s |
| Total page weight | < 1.2 MB |

### Page-level rules

- Hero image: preloaded, `fetchpriority="high"`, srcset with 800/1200/1800/2400w
- All other images: `loading="lazy"`, `decoding="async"`, explicit width/height
- Fonts: `display=swap`, preconnect to fonts.googleapis.com + fonts.gstatic.com
- CSS: keep glass blur layers under 4 stacked (compositor load)
- JS: single inline IIFE, no external deps beyond `script.js`
- Avoid `backdrop-filter` on full-viewport elements (kills FPS on low-end Android)

---

## 13. Anti-Patterns (Do Not Do)

1. **Emoji as icons.** Always SVG.
2. **More than one primary CTA per section.** Pair with outline or ghost variant.
3. **Stock photo + "real engagement" caption.** Either real or marked illustrative.
4. **Mailto: as primary conversion path.** Always a form + Calendly + WhatsApp fallback.
5. **Anonymous testimonials presented as named quotes.** Either name or disclose.
6. **Pricing absent on a procurement-driven sale.** Always show a band or "fits in your existing OPD budget" framing.
7. **Decorative animations without reduced-motion fallback.** Mandatory.
8. **Colour-only state indication.** Pair with icon or label.
9. **More than 4 sections covering the same theme.** Why + Principles already overlap — don't add a third "reasons to pick us" section.
10. **Custom controls replacing native ones** (e.g., custom select with no keyboard a11y). Use native `<select>` unless there's a real reason.

---

## 14. Open Questions / Roadmap

- [ ] Dark mode tokens — not yet defined.
- [ ] Real photography for gallery + team — currently illustrative.
- [ ] Named CMO and clinical leadership in team section.
- [ ] Real client logos in trust strip (requires consent).
- [ ] Terms + Privacy pages (footer currently `href="#"`).
- [ ] Form endpoint configured (currently placeholder formspree URL).
- [ ] Live A/B test on hero headline diagnostic-vs-promise phrasing.
- [ ] Investigate replacing glass with a denser, more clinical alternate variant for procurement-led buyers.

---

*Owned by: Design + Brand at Anara Health.*
*Source of truth for: every marketing surface, sales deck, and email template that uses Anara visual identity.*
