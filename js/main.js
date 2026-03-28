/* ============================================================
   MillenETech — main.js
   Navigation, GSAP animations, scroll effects, interactions
   ============================================================ */

/* ── Wait for DOM ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Nav scroll behaviour ───────────────────────────────── */
  const nav = document.getElementById('nav');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const particlesCanvas = document.getElementById('particles-canvas');

  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    if (scrollIndicator) {
      scrollIndicator.classList.toggle('hidden', window.scrollY > 120);
    }

    // Fade particles canvas out as user scrolls past the hero
    if (particlesCanvas) {
      const heroH = document.getElementById('hero')?.offsetHeight || window.innerHeight;
      const fadeStart = heroH * 0.35;
      const fadeEnd   = heroH * 0.75;
      const progress  = Math.min(1, Math.max(0, (window.scrollY - fadeStart) / (fadeEnd - fadeStart)));
      particlesCanvas.style.opacity = String((1 - progress) * parseFloat(particlesCanvas.dataset.baseOpacity || 1));
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile nav ─────────────────────────────────────────── */
  const burger  = document.querySelector('.nav-burger');
  const overlay = document.querySelector('.nav-overlay');

  if (burger && overlay) {
    burger.addEventListener('click', () => {
      const open = overlay.classList.toggle('open');
      burger.classList.toggle('active', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    overlay.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        overlay.classList.remove('open');
        burger.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Active nav link on scroll ──────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  function updateActiveLink() {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 140) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  }
  window.addEventListener('scroll', updateActiveLink, { passive: true });

  /* ── GSAP page load sequence ────────────────────────────── */
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to(nav, { opacity: 1, y: 0, duration: 0.6 }, 0)
    .to('.hero-eyebrow', { opacity: 1, duration: 0.5 }, 0.2)
    .to('.hero-headline', {
      opacity: 1,
      y: 0,
      duration: 0.7,
      clearProps: 'transform',
    }, 0.4)
    .to('.hero-sub', { opacity: 1, duration: 0.6 }, 0.6)
    .to('.hero-ctas', { opacity: 1, duration: 0.6, scale: 1 }, 0.8);

  // Canvas reveals via class — store base opacity for scroll fade
  setTimeout(() => {
    const c = document.querySelector('#particles-canvas');
    if (c) {
      c.classList.add('visible');
      c.dataset.baseOpacity = '1';
    }
    document.querySelector('.hero-eyebrow')?.classList.add('visible');
  }, 1000);

  /* ── Scroll animations ──────────────────────────────────── */

  // Generic section header reveal
  document.querySelectorAll('.section-reveal').forEach(el => {
    gsap.to(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out',
    });
  });

  // Card stagger groups
  document.querySelectorAll('.stagger-group').forEach(group => {
    const cards = group.querySelectorAll('.card-stagger');
    gsap.to(cards, {
      scrollTrigger: { trigger: group, start: 'top 80%', toggleActions: 'play none none none' },
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    });
  });

  // Philosophy — slide from sides
  gsap.to('.philosophy-quote', {
    scrollTrigger: { trigger: '#philosophy', start: 'top 75%' },
    opacity: 1,
    x: 0,
    duration: 0.9,
    ease: 'power3.out',
  });

  gsap.to('.principles-grid .principle-card', {
    scrollTrigger: { trigger: '.principles-grid', start: 'top 80%' },
    opacity: 1,
    x: 0,
    duration: 0.6,
    stagger: 0.12,
    ease: 'power3.out',
  });

  // Product rows
  document.querySelectorAll('.product-row').forEach((row, i) => {
    const text   = row.querySelector('.product-text');
    const visual = row.querySelector('.product-visual');
    const isRev  = row.classList.contains('reverse');

    if (text) {
      gsap.fromTo(text,
        { opacity: 0, x: isRev ? 40 : -40 },
        {
          scrollTrigger: { trigger: row, start: 'top 80%' },
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        }
      );
    }
    if (visual) {
      gsap.fromTo(visual,
        { opacity: 0, x: isRev ? -40 : 40 },
        {
          scrollTrigger: { trigger: row, start: 'top 80%' },
          opacity: 1, x: 0, duration: 0.8, delay: 0.15, ease: 'power3.out',
        }
      );
    }
  });

  // Founders
  gsap.to('.founder-card', {
    scrollTrigger: { trigger: '.founders-grid', start: 'top 80%' },
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power3.out',
  });

  // CTA section
  gsap.fromTo('.cta-inner',
    { opacity: 0, y: 30 },
    {
      scrollTrigger: { trigger: '#cta-section', start: 'top 80%' },
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
    }
  );

  // Blog cards
  gsap.to('.blog-card', {
    scrollTrigger: { trigger: '.blog-grid', start: 'top 80%' },
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.12,
    ease: 'power3.out',
  });

  /* ── Count-up animation for case metrics ────────────────── */
  const metrics = [
    { el: document.querySelector('#metric-1'), target: 8,     suffix: ' hrs/wk', prefix: '' },
    { el: document.querySelector('#metric-2'), target: 40,    suffix: 'K',        prefix: '$' },
    { el: document.querySelector('#metric-3'), target: 36,    suffix: 'K/yr',     prefix: '$' },
  ];

  metrics.forEach(({ el, target, suffix, prefix }) => {
    if (!el) return;
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = prefix + Math.round(obj.val) + suffix;
          },
          onComplete: () => {
            el.closest('.case-metric')?.classList.add('counted');
          },
        });
      },
    });
  });

  /* ── Product visual mouse-move parallax (desktop) ────────── */
  if (window.innerWidth > 1024) {
    document.querySelectorAll('.product-visual').forEach(vis => {
      vis.addEventListener('mousemove', e => {
        const rect = vis.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const dx   = (e.clientX - cx) / rect.width  * 10;
        const dy   = (e.clientY - cy) / rect.height * 10;
        vis.style.transform = `perspective(600px) rotateY(${dx}deg) rotateX(${-dy}deg)`;
      });
      vis.addEventListener('mouseleave', () => {
        vis.style.transform = '';
      });
    });
  }

  /* ── Keyboard-accessible mobile nav ─────────────────────── */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay?.classList.contains('open')) {
      overlay.classList.remove('open');
      burger?.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  /* ── Lazy load below-fold sections ──────────────────────── */
  const lazyTargets = document.querySelectorAll('.lazy-section');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('loaded');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px' });

    lazyTargets.forEach(t => io.observe(t));
  }

});
