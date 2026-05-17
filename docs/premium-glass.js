/* ============================================================
   Anara — Premium Glass Layer (v3) — JS
   Loads AFTER script.js + the inline IIFE in anara-v2-glass.html.

   Adds:
   - Magnetic primary CTAs (cursor-follow within 80px)
   - Spring card hover with mouse-position tracking for cursor light
   - Scroll-linked sample report builder (GSAP ScrollTrigger — loaded via CDN in HTML)
   - Word-by-word reveal on founder quote
   - Number ticker with spring overshoot (upgrade of existing count-up)
   - Spotlight tracking on dark sections
   - Reduced-motion guards everywhere
   ============================================================ */

(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.querySelector('.anara.v2-glass');
  if (!root) return;


  /* ---------- 1. Magnetic buttons ----------
     Primary CTAs and FAB lift slightly toward cursor within 80px radius.
     Adds tactility. Used sparingly: only on .btn-primary and .g-fab a. */
  function initMagnetic() {
    if (reduce) return;
    var radius = 80;
    var strength = 0.35;

    document.querySelectorAll('.anara.v2-glass .btn-magnetic').forEach(function (btn) {
      btn.addEventListener('pointermove', function (e) {
        var r = btn.getBoundingClientRect();
        var cx = r.left + r.width / 2;
        var cy = r.top + r.height / 2;
        var dx = e.clientX - cx;
        var dy = e.clientY - cy;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > radius + Math.max(r.width, r.height) / 2) return;
        btn.style.setProperty('--mag-x', (dx * strength) + 'px');
        btn.style.setProperty('--mag-y', (dy * strength) + 'px');
      });
      btn.addEventListener('pointerleave', function () {
        btn.style.setProperty('--mag-x', '0px');
        btn.style.setProperty('--mag-y', '0px');
      });
    });
  }


  /* ---------- 2. Cursor light on glass cards ----------
     Replaces the basic uniform glow with a multi-stop refractive trail.
     CSS handles the rendering; JS just sets --mx / --my. */
  function initCursorLight() {
    if (reduce) return;
    document.querySelectorAll('.anara.v2-glass .g-glass-card, .anara.v2-glass .g-tier, .anara.v2-glass .g-tc-named .g-tc-card, .anara.v2-glass .g-compliance-badge').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
      card.addEventListener('pointerleave', function () {
        card.style.setProperty('--mx', '-300px');
        card.style.setProperty('--my', '-300px');
      });
    });
  }


  /* ---------- 3. Spotlight tracking on dark sections ----------
     Mouse position updates a radial highlight on .g-spotlight sections. */
  function initSpotlight() {
    if (reduce) return;
    document.querySelectorAll('.anara.v2-glass .g-spotlight').forEach(function (section) {
      section.addEventListener('pointermove', function (e) {
        var r = section.getBoundingClientRect();
        section.style.setProperty('--sl-x', (e.clientX - r.left) + 'px');
        section.style.setProperty('--sl-y', (e.clientY - r.top) + 'px');
      });
    });
  }


  /* ---------- 4. Word-by-word reveal on founder quote ----------
     Splits .g-founder-block blockquote into spans, reveals on scroll-in. */
  function initWordReveal() {
    var quotes = document.querySelectorAll('.anara.v2-glass .g-founder-block blockquote, .anara.v2-glass [data-word-reveal]');
    if (!quotes.length) return;

    quotes.forEach(function (q) {
      // Only split text-node content, preserve ::before pseudo from CSS
      var html = q.innerHTML;
      // Find the first text content after any leading pseudo/element
      var textNodes = Array.prototype.filter.call(q.childNodes, function (n) {
        return n.nodeType === 3 && n.textContent.trim();
      });
      if (!textNodes.length) {
        // fall back: wrap raw text inside if there's no child nodes left to find
        return;
      }

      textNodes.forEach(function (tn) {
        var words = tn.textContent.split(/(\s+)/);
        var frag = document.createDocumentFragment();
        words.forEach(function (w, i) {
          if (/^\s+$/.test(w)) {
            frag.appendChild(document.createTextNode(w));
          } else if (w) {
            var span = document.createElement('span');
            span.className = 'g-word';
            span.style.cssText = 'display:inline-block;opacity:0;transform:translateY(12px);transition:opacity 540ms cubic-bezier(0.22,1,0.36,1) ' + (i * 28) + 'ms, transform 540ms cubic-bezier(0.22,1,0.36,1) ' + (i * 28) + 'ms;';
            span.textContent = w;
            frag.appendChild(span);
          }
        });
        tn.parentNode.replaceChild(frag, tn);
      });
    });

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.anara.v2-glass .g-word').forEach(function (w) {
        w.style.opacity = '1';
        w.style.transform = 'none';
      });
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.querySelectorAll('.g-word').forEach(function (w) {
          if (reduce) {
            w.style.opacity = '1';
            w.style.transform = 'none';
            w.style.transition = 'none';
          } else {
            w.style.opacity = '1';
            w.style.transform = 'none';
          }
        });
        obs.unobserve(en.target);
      });
    }, { threshold: 0.3, rootMargin: '0px 0px -10% 0px' });

    quotes.forEach(function (q) { obs.observe(q); });
  }


  /* ---------- 5. Light pulse on number tickers ----------
     The existing count-up runs in the original IIFE; we just add an "arrived" pulse. */
  function initStatPulse() {
    if (reduce) return;
    document.querySelectorAll('.anara.v2-glass [data-count]').forEach(function (el) {
      var done = false;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && !done) {
            done = true;
            setTimeout(function () {
              el.animate([
                { transform: 'scale(1)', filter: 'brightness(1)' },
                { transform: 'scale(1.04)', filter: 'brightness(1.15)' },
                { transform: 'scale(1)', filter: 'brightness(1)' }
              ], {
                duration: 600,
                easing: 'cubic-bezier(0.34,1.56,0.64,1)'
              });
              io.disconnect();
            }, 1500);
          }
        });
      }, { threshold: 0.5 });
      io.observe(el);
    });
  }


  /* ---------- 6. GSAP scroll-linked sample report builder ----------
     Sticky-pins the .g-sample-mock while bars draw in sequence as user scrolls.
     Falls back to existing IntersectionObserver bar animation if GSAP missing. */
  function initScrollLinkedReport() {
    if (reduce) return;
    if (!window.gsap || !window.ScrollTrigger) return; // graceful degradation

    var section = document.querySelector('.anara.v2-glass .g-sample-report');
    if (!section) return;

    var bars = section.querySelectorAll('.g-mock-bar i[data-bar]');
    if (!bars.length) return;

    // Reset to zero so GSAP can drive the width
    bars.forEach(function (bar) { bar.style.width = '0%'; });

    window.gsap.registerPlugin(window.ScrollTrigger);

    // Each bar animates within its slice of the scroll range
    bars.forEach(function (bar, i) {
      var target = parseFloat(bar.getAttribute('data-bar')) || 0;
      window.gsap.to(bar, {
        width: target + '%',
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'bottom 50%',
          scrub: 0.6,
          // each bar fires within its own segment
          toggleActions: 'play none none reverse'
        },
        delay: i * 0.08
      });
    });

    // Callout fade-in when last bar is well into view
    var callout = section.querySelector('.g-sample-callout');
    if (callout) {
      window.gsap.fromTo(callout,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          ease: 'back.out(1.6)',
          duration: 0.7,
          scrollTrigger: {
            trigger: section,
            start: 'top 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }


  /* ---------- 7. GSAP-driven hero stack subtle parallax ----------
     3-image stack — each image moves at slightly different velocity on scroll. */
  function initHeroParallax() {
    if (reduce) return;
    if (!window.gsap || !window.ScrollTrigger) return;

    var stack = document.querySelector('.anara.v2-glass .h1 .stack');
    if (!stack) return;
    var imgs = stack.querySelectorAll('img');
    if (imgs.length < 3) return;

    window.gsap.registerPlugin(window.ScrollTrigger);
    var depths = [-30, 20, -10]; // px translate range, alternating

    imgs.forEach(function (img, i) {
      window.gsap.fromTo(img,
        { y: -Math.abs(depths[i] || 0) },
        {
          y: Math.abs(depths[i] || 0),
          ease: 'none',
          scrollTrigger: {
            trigger: stack,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        }
      );
    });
  }


  /* ---------- 8. Spring hover lift on cards (replace ease) ---------- */
  // Already wired via CSS transition tokens — JS not needed.


  /* ---------- 9. SVG chromatic refraction filter mount ----------
     Mounts a global SVG filter <defs> for use via filter:url(#chromatic) on
     any element that needs the Apple Liquid Glass edge displacement. */
  function mountChromaticFilter() {
    if (document.getElementById('pg-svg-filters')) return;
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = 'pg-svg-filters';
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.style.position = 'absolute';
    svg.style.pointerEvents = 'none';
    svg.innerHTML = [
      '<defs>',
      // Chromatic edge refraction — RGB channel offset via feDisplacementMap
      '<filter id="chromatic-edge" x="-10%" y="-10%" width="120%" height="120%">',
        '<feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" result="noise" seed="2"/>',
        '<feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G"/>',
      '</filter>',
      // Soft film grain (alternative — already implemented in CSS via base64)
      '<filter id="film-grain">',
        '<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>',
        '<feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.08 0"/>',
        '<feComposite in2="SourceGraphic" operator="in"/>',
      '</filter>',
      '</defs>'
    ].join('');
    document.body.appendChild(svg);
  }


  /* ---------- 10. Nav scrolled state hookup ----------
     Already wired in the original IIFE, no-op. */


  /* ---------- Boot ---------- */
  function boot() {
    mountChromaticFilter();
    initMagnetic();
    initCursorLight();
    initSpotlight();
    initWordReveal();
    initStatPulse();
    // GSAP-dependent (may not be loaded yet — try now, retry on GSAP load)
    function tryGsap() {
      if (window.gsap && window.ScrollTrigger) {
        initScrollLinkedReport();
        initHeroParallax();
      } else {
        // retry once after a beat in case CDN is slow
        setTimeout(function () {
          if (window.gsap && window.ScrollTrigger) {
            initScrollLinkedReport();
            initHeroParallax();
          }
        }, 800);
      }
    }
    tryGsap();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
