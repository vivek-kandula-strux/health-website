/* ============================================================
   Anara V2 Glass — Self-contained JS
   Motion budget: 3 named systems + utility (nav, FAQ native, form).
   ============================================================ */

(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------- 1. Mobile nav toggle -------- */
  function initNav() {
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('primaryNav');
    if (!toggle || !links) return;

    var setOpen = function (open) {
      links.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      setOpen(!isOpen);
    });

    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* -------- 2. Sticky nav scrolled state -------- */
  function initNavScroll() {
    var nav = document.querySelector('.nav-wrap');
    if (!nav) return;
    var update = function () {
      if (window.scrollY > 24) nav.setAttribute('data-scrolled', '');
      else nav.removeAttribute('data-scrolled');
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* -------- 3. Hero stat count-up (motion #1) -------- */
  function initCountUp() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    var animate = function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      var em = el.querySelector('em');
      var emHTML = em ? em.outerHTML : '';

      if (reduce) {
        el.innerHTML = target.toFixed(decimals) + suffix + emHTML;
        return;
      }

      var dur = 1400;
      var start = performance.now();
      var tick = function (now) {
        var p = Math.min(1, (now - start) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        var v = (target * eased).toFixed(decimals);
        el.innerHTML = v + suffix + emHTML;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (!('IntersectionObserver' in window)) {
      counters.forEach(animate);
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          animate(en.target);
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { obs.observe(el); });
  }

  /* -------- 4. Sample report bar reveal (motion #2) -------- */
  function initSampleReport() {
    var card = document.querySelector('.sample-card');
    if (!card) return;

    if (!('IntersectionObserver' in window)) {
      card.classList.add('is-revealed');
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-revealed');
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(card);
  }

  /* Reveal animation removed — motion restraint per audit consensus. */

  /* -------- 6. Lead form (validation + Formspree submit + inline success) -------- */
  function initLeadForm() {
    var form = document.getElementById('leadForm');
    if (!form) return;

    var successEl = form.parentElement.querySelector('.form-success');
    var submitBtn = form.querySelector('button[type="submit"]');
    var submitBtnLabel = submitBtn ? submitBtn.textContent : '';

    var clearError = function (row) {
      row.classList.remove('has-error');
      var input = row.querySelector('input, select, textarea');
      if (input) input.removeAttribute('aria-invalid');
      var errorEl = row.querySelector('.form-error');
      if (errorEl) errorEl.textContent = '';
    };

    var setError = function (row, message) {
      row.classList.add('has-error');
      var input = row.querySelector('input, select, textarea');
      if (input) input.setAttribute('aria-invalid', 'true');
      var errorEl = row.querySelector('.form-error');
      if (errorEl && message) errorEl.textContent = message;
    };

    // Clear errors as the user types/changes
    form.querySelectorAll('input, select, textarea').forEach(function (input) {
      input.addEventListener('input', function () {
        var row = input.closest('.form-row');
        if (row) clearError(row);
      });
      input.addEventListener('change', function () {
        var row = input.closest('.form-row');
        if (row) clearError(row);
      });
    });

    var validate = function () {
      var valid = true;
      form.querySelectorAll('.form-row').forEach(function (row) { clearError(row); });

      form.querySelectorAll('[required]').forEach(function (input) {
        var row = input.closest('.form-row');
        var value = (input.value || '').trim();
        if (!value) {
          setError(row, 'Required');
          valid = false;
          return;
        }
        if (input.type === 'email') {
          var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRe.test(value)) {
            setError(row, 'Enter a valid work email');
            valid = false;
          }
        }
      });

      return valid;
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) {
        var firstError = form.querySelector('.has-error input, .has-error select, .has-error textarea');
        if (firstError) firstError.focus();
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      var data = new FormData(form);
      var endpoint = form.getAttribute('action');
      var isPlaceholder = !endpoint || endpoint.indexOf('REPLACE_WITH_YOUR_ID') !== -1;

      var showSuccess = function () {
        form.style.display = 'none';
        if (successEl) {
          successEl.classList.add('is-visible');
          successEl.setAttribute('tabindex', '-1');
          successEl.focus();
        }
      };

      // If the endpoint is still the placeholder, fake a success state so the page
      // is usable for QA / preview. Replace REPLACE_WITH_YOUR_ID with a real
      // Formspree (or other) form endpoint to actually deliver leads.
      if (isPlaceholder) {
        setTimeout(showSuccess, 600);
        return;
      }

      fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      })
        .then(function (res) {
          if (res.ok) {
            showSuccess();
          } else {
            throw new Error('Submission failed');
          }
        })
        .catch(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtnLabel;
          }
          alert('Could not submit. Please email Sales@anara.health directly.');
        });
    });
  }

  /* -------- Boot -------- */
  function boot() {
    initNav();
    initNavScroll();
    initCountUp();
    initSampleReport();
    initLeadForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
