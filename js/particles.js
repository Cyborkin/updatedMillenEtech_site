/* ============================================================
   MillenETech — particles.js
   Canvas-based drifting particle network
   ============================================================ */

(function () {
  const canvas  = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx     = canvas.getContext('2d');
  const isMobile = () => window.innerWidth < 768;
  const COUNT   = () => isMobile() ? 30 : 60;
  const CONNECT_DIST = 140;
  const COLORS  = ['#3b82f6', '#8b5cf6', '#60a5fa', '#a78bfa'];

  let particles = [];
  let W, H, raf;

  function resize() {
    // Fixed canvas covers the full viewport — use innerWidth/Height for crisp sizing
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function createParticle() {
    return {
      x:     rand(0, W),
      y:     rand(0, H),
      vx:    rand(-0.3, 0.3),
      vy:    rand(-0.3, 0.3),
      r:     rand(1, 2.5),
      alpha: rand(0.3, 0.6),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  }

  function init() {
    resize();
    particles = [];
    const n = COUNT();
    for (let i = 0; i < n; i++) particles.push(createParticle());
    cancelAnimationFrame(raf);
    loop();
  }

  function hexAlpha(hex, a) {
    // parse #rrggbb → rgba
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return `rgba(${r},${g},${b},${a})`;
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);

    // Update & draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around
      if (p.x < -5) p.x = W + 5;
      if (p.x > W + 5) p.x = -5;
      if (p.y < -5) p.y = H + 5;
      if (p.y > H + 5) p.y = -5;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = hexAlpha(p.color, p.alpha);
      ctx.fill();
    }

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECT_DIST) {
          const lineAlpha = (1 - dist / CONNECT_DIST) * 0.18;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = hexAlpha('#3b82f6', lineAlpha);
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    raf = requestAnimationFrame(loop);
  }

  // Pause when tab hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else {
      loop();
    }
  });

  // Respect reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReduced.matches) return;

  window.addEventListener('resize', () => {
    clearTimeout(window._ptResize);
    window._ptResize = setTimeout(init, 200);
  });

  // Kick off after canvas is sized
  requestAnimationFrame(() => {
    init();
    setTimeout(() => canvas.classList.add('visible'), 200);
  });
})();
