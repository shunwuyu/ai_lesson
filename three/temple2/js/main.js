/* ============================================================
   KAGE — orchestration
   Scroll-driven camera path, word-by-word reveals, active-chapter
   navigation, foreground cutouts, custom cursor, cinematic stills.
   Loaded last; depends on THREE (vendored), KAGE.WORLD, KAGE.CUTOUTS.
   ============================================================ */
(function () {
  'use strict';
  const K = window.KAGE = window.KAGE || {};

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE_POINTER = window.matchMedia('(pointer: fine)').matches;
  const V3 = THREE.Vector3;

  // ------------------------------------------------------------------
  // Easing / math helpers
  // ------------------------------------------------------------------
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function smoothstep(t) { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); }
  function easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function lerp(a, b, t) { return a + (b - a) * t; }

  // ------------------------------------------------------------------
  // Camera path + environment keyframes (index 0..6)
  // 0 hero · 1 threshold · 2 gardens · 3 pines · 4 craft · 5 afterlight · 6 footer
  // ------------------------------------------------------------------
  function env(fog, fogColor, mx, my, mz, moonScale, moonGlow, moonLight,
               ambient, lantern, shoji, rain, leaves, embers, grain) {
    return {
      fog, fogColor: new THREE.Color(fogColor),
      moonPos: { x: mx, y: my, z: mz },
      moonScale, moonGlow, moonLight, ambient, lantern, shoji,
      rain, leaves, embers, grain
    };
  }

  const KEYFRAMES = [
    {
      pos: new V3(0, 3.4, 30), look: new V3(0, 4.2, 0), fov: 55,
      env: env(0.006, 0x0a0f18, 3, 26, -100, 1.0, 0.50, 0.55, 0.55, 0.18, 0.20, 0.18, 0.12, 0.00, 0.50)
    },
    {
      pos: new V3(0, 2.7, 13), look: new V3(0, 3.8, 3), fov: 55,
      env: env(0.009, 0x0a0f18, 3, 26, -100, 1.15, 0.55, 0.50, 0.50, 0.40, 0.30, 0.50, 0.20, 0.00, 0.60)
    },
    {
      pos: new V3(9, 2.2, -17), look: new V3(13, 0.4, -26), fov: 55,
      env: env(0.010, 0x0b1019, 3, 26, -100, 1.20, 0.50, 0.65, 0.45, 0.25, 0.20, 0.00, 0.10, 0.00, 0.50)
    },
    {
      pos: new V3(1.5, 2.4, -33), look: new V3(-3, 2.6, -46), fov: 52,
      env: env(0.016, 0x0a1220, 3, 26, -100, 1.30, 0.50, 0.50, 0.40, 0.30, 0.25, 0.70, 0.75, 0.00, 0.70)
    },
    {
      pos: new V3(3.5, 2.8, -30), look: new V3(0, 3.6, -26), fov: 50,
      env: env(0.012, 0x0a0f1a, 3, 26, -100, 1.40, 0.55, 0.45, 0.45, 0.85, 0.90, 0.15, 0.30, 0.80, 0.60)
    },
    {
      pos: new V3(0, 5.0, -40), look: new V3(3, 24, -100), fov: 58,
      env: env(0.007, 0x0c0f16, 3, 26, -100, 2.60, 0.95, 1.00, 0.50, 0.40, 0.35, 0.10, 0.40, 0.50, 0.55)
    },
    {
      pos: new V3(0, 13, -54), look: new V3(0, 8, -85), fov: 55,
      env: env(0.008, 0x0a0f18, 3, 26, -100, 1.60, 0.60, 0.60, 0.50, 0.20, 0.20, 0.00, 0.15, 0.10, 0.50)
    }
  ];

  // Offscreen still poses (slightly pulled back for editorial framing).
  const STILLS = {
    threshold:  { pos: new V3(0, 2.7, 16), look: new V3(0, 4, 2), fov: 50, chapter: 1 },
    gardens:    { pos: new V3(11, 2.0, -19), look: new V3(14, 0, -26), fov: 50, chapter: 2 },
    pines:      { pos: new V3(0, 2.6, -30), look: new V3(-5, 3, -45), fov: 50, chapter: 3 },
    craft:      { pos: new V3(4, 2.6, -32), look: new V3(0, 3.5, -26), fov: 50, chapter: 4 },
    afterlight: { pos: new V3(0, 4.5, -36), look: new V3(3, 26, -100), fov: 50, chapter: 5 }
  };

  // Foreground cutout compositions per chapter.
  const CUTOUT_DEFS = {
    0: [
      { kind: 'hills', side: 'left', width: 104, bottom: -2, seed: 11 },
      { kind: 'grass', side: 'left', width: 122, bottom: -3, seed: 12 }
    ],
    1: [
      { kind: 'grass', side: 'left', width: 130, bottom: -3, seed: 21 },
      { kind: 'stones', side: 'right', width: 70, bottom: -1, seed: 22 },
      { kind: 'lantern', side: 'right', width: 26, bottom: -1, seed: 23 }
    ],
    2: [
      { kind: 'stones', side: 'left', width: 82, bottom: -1, seed: 31 },
      { kind: 'grass', side: 'left', width: 112, bottom: -3, seed: 32 },
      { kind: 'bush', side: 'right', width: 56, bottom: -1, seed: 33 }
    ],
    3: [
      { kind: 'pines', side: 'left', width: 68, bottom: -2, seed: 41 },
      { kind: 'pines', side: 'right', width: 58, bottom: -2, seed: 42 },
      { kind: 'grass', side: 'left', width: 120, bottom: -3, seed: 43 },
      { kind: 'bush', side: 'right', width: 44, bottom: -1, seed: 44 }
    ],
    4: [
      { kind: 'lantern', side: 'left', width: 24, bottom: -1, seed: 51 },
      { kind: 'wall', side: 'right', width: 70, bottom: -1, seed: 52 },
      { kind: 'bush', side: 'left', width: 50, bottom: -1, seed: 53 }
    ],
    5: [
      { kind: 'maple', side: 'left', width: 82, bottom: -2, seed: 61 },
      { kind: 'sakura', side: 'right', width: 88, bottom: -2, seed: 62 },
      { kind: 'grass', side: 'left', width: 120, bottom: -3, seed: 63 }
    ],
    6: [
      { kind: 'hills', side: 'left', width: 104, bottom: -2, seed: 71 },
      { kind: 'pines', side: 'right', width: 54, bottom: -2, seed: 72 }
    ]
  };

  // Canvas dimensions per species (aspect ratio controls silhouette shape).
  const CUTOUT_CANVAS = {
    grass:  [1400, 320], hills: [1400, 520], pines: [900, 760],
    maple:  [900, 760],   sakura: [900, 760], stones: [1000, 300],
    wall:   [800, 520],   ruins: [800, 520], bush: [1000, 300], lantern: [520, 760]
  };

  // ------------------------------------------------------------------
  // State
  // ------------------------------------------------------------------
  const worldEl = document.getElementById('world');
  const fgEl = document.getElementById('foreground');
  const dotEl = document.getElementById('cursor-dot');
  const ringEl = document.getElementById('cursor-ring');
  const menuEl = document.getElementById('mobile-menu');
  const menuToggle = document.getElementById('menu-toggle');

  let sections = [];       // ordered section elements (0..6)
  let anchors = [];        // scrollY where each section is centred
  let activeIndex = 0;
  let prevActive = -1;
  let viewportH = window.innerHeight;
  let docHeight = 0;

  // Smoothed (applied) camera + env values.
  const cam = { pos: new V3(), look: new V3(), fov: 55 };
  let target = { pos: new V3(), look: new V3(), fov: 55, env: null };
  let currentEnv = cloneEnv(KEYFRAMES[0].env);
  let cutoutSets = [];     // arrays of <img> per chapter

  let cursor = { x: 0, y: 0, rx: 0, ry: 0 };
  let scrollAnimId = 0;

  function cloneEnv(e) {
    return {
      fog: e.fog, fogColor: e.fogColor.clone(),
      moonPos: { x: e.moonPos.x, y: e.moonPos.y, z: e.moonPos.z },
      moonScale: e.moonScale, moonGlow: e.moonGlow, moonLight: e.moonLight,
      ambient: e.ambient, lantern: e.lantern, shoji: e.shoji,
      rain: e.rain, leaves: e.leaves, embers: e.embers, grain: e.grain
    };
  }

  function lerpEnv(a, b, t) {
    a.fog = lerp(a.fog, b.fog, t);
    a.fogColor.lerp(b.fogColor, t);
    a.moonPos.x = lerp(a.moonPos.x, b.moonPos.x, t);
    a.moonPos.y = lerp(a.moonPos.y, b.moonPos.y, t);
    a.moonPos.z = lerp(a.moonPos.z, b.moonPos.z, t);
    a.moonScale = lerp(a.moonScale, b.moonScale, t);
    a.moonGlow = lerp(a.moonGlow, b.moonGlow, t);
    a.moonLight = lerp(a.moonLight, b.moonLight, t);
    a.ambient = lerp(a.ambient, b.ambient, t);
    a.lantern = lerp(a.lantern, b.lantern, t);
    a.shoji = lerp(a.shoji, b.shoji, t);
    a.rain = lerp(a.rain, b.rain, t);
    a.leaves = lerp(a.leaves, b.leaves, t);
    a.embers = lerp(a.embers, b.embers, t);
    a.grain = lerp(a.grain, b.grain, t);
    return a;
  }

  // ------------------------------------------------------------------
  // Measurement
  // ------------------------------------------------------------------
  function collectSections() {
    const ch = Array.prototype.slice.call(document.querySelectorAll('[data-chapter]'))
      .sort((a, b) => (+a.getAttribute('data-chapter')) - (+b.getAttribute('data-chapter')));
    const footer = document.getElementById('manifesto');
    if (footer) ch.push(footer);
    return ch;
  }

  function measure() {
    viewportH = window.innerHeight;
    docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    anchors = sections.map((s) => {
      const r = s.getBoundingClientRect();
      const top = r.top + window.scrollY;
      return top + r.height / 2 - viewportH / 2;
    });
  }

  // ------------------------------------------------------------------
  // Scroll → camera / env target
  // ------------------------------------------------------------------
  function computeTarget() {
    const sy = window.scrollY;
    const n = KEYFRAMES.length;

    // Active chapter = nearest section centre.
    let best = Infinity;
    for (let i = 0; i < anchors.length; i++) {
      const d = Math.abs(sy - anchors[i]);
      if (d < best) { best = d; activeIndex = i; }
    }
    if (activeIndex !== prevActive) {
      prevActive = activeIndex;
      updateNav();
    }

    if (sy <= anchors[0]) {
      setTargetPair(0, 0);
    } else if (sy >= anchors[n - 1]) {
      setTargetPair(n - 1, 1);
    } else {
      for (let i = 0; i < n - 1; i++) {
        if (sy >= anchors[i] && sy < anchors[i + 1]) {
          setTargetPair(i, smoothstep((sy - anchors[i]) / (anchors[i + 1] - anchors[i])));
          break;
        }
      }
    }
  }

  function setTargetPair(i, t) {
    const a = KEYFRAMES[i], b = KEYFRAMES[Math.min(i + 1, KEYFRAMES.length - 1)];
    target.pos.lerpVectors(a.pos, b.pos, t);
    target.look.lerpVectors(a.look, b.look, t);
    target.fov = lerp(a.fov, b.fov, t);
    target.env = cloneEnv(a.env);
    lerpEnv(target.env, b.env, t);
  }

  // ------------------------------------------------------------------
  // Apply loop
  // ------------------------------------------------------------------
  function updateCamera(dt) {
    const k = REDUCED ? 1 : 1 - Math.exp(-dt * 3.4);
    cam.pos.lerp(target.pos, k);
    cam.look.lerp(target.look, k);
    cam.fov = lerp(cam.fov, target.fov, k);

    const c = K.WORLD.camera();
    if (!c) return;
    c.position.copy(cam.pos);
    c.lookAt(cam.look);
    if (Math.abs(c.fov - cam.fov) > 0.001) {
      c.fov = cam.fov;
      c.updateProjectionMatrix();
    }
    lerpEnv(currentEnv, target.env, k);
    K.WORLD.setEnv(currentEnv);
  }

  function updateCursor(dt) {
    if (!FINE_POINTER || REDUCED) return;
    const k = 1 - Math.exp(-dt * 14);
    cursor.rx += (cursor.x - cursor.rx) * k;
    cursor.ry += (cursor.y - cursor.ry) * k;
    dotEl.style.transform = 'translate(' + cursor.x + 'px,' + cursor.y + 'px) translate(-50%,-50%)';
    ringEl.style.transform = 'translate(' + cursor.rx + 'px,' + cursor.ry + 'px) translate(-50%,-50%)';
  }

  function loop(now) {
    const dt = Math.min((now - loop._last) / 1000, 0.1);
    loop._last = now;

    computeTarget();
    updateCamera(dt);
    updateCursor(dt);
    updateForeground();

    K.WORLD.tick(REDUCED ? 0 : dt, now / 1000);
    K.WORLD.render();

    requestAnimationFrame(loop);
  }
  loop._last = performance.now();

  // ------------------------------------------------------------------
  // Foreground cutouts (pinned at the base of the viewport)
  // ------------------------------------------------------------------
  function buildCutouts() {
    Object.keys(CUTOUT_DEFS).forEach((ch) => {
      const defs = CUTOUT_DEFS[ch];
      const imgs = defs.map((d) => {
        const dims = CUTOUT_CANVAS[d.kind] || [1000, 400];
        const url = K.CUTOUTS.make(d.kind, dims[0], dims[1], d.seed);
        const img = document.createElement('img');
        img.className = 'fg-cutout';
        img.alt = '';
        img.src = url;
        img.style.width = d.width + 'vw';
        img.style.bottom = (d.bottom || 0) + 'vh';
        img.style.zIndex = String(10 + Number(ch));
        if (d.side === 'left') img.style.left = '-4vw';
        else { img.style.right = '-4vw'; img.style.setProperty('--flip', '-1'); }
        fgEl.appendChild(img);
        return img;
      });
      cutoutSets[Number(ch)] = imgs;
    });
  }

  function updateForeground() {
    for (let i = 0; i < cutoutSets.length; i++) {
      const on = i === activeIndex;
      cutoutSets[i].forEach((img) => img.classList.toggle('is-active', on));
    }
  }

  // ------------------------------------------------------------------
  // Word-by-word reveal + individual supporting elements
  // ------------------------------------------------------------------
  function splitWords(el) {
    const text = el.textContent;
    const words = text.split(/\s+/).filter(Boolean);
    const frag = document.createDocumentFragment();
    words.forEach((word, idx) => {
      const span = document.createElement('span');
      span.className = 'w';
      span.textContent = word;
      frag.appendChild(span);
      if (idx < words.length - 1) frag.appendChild(document.createTextNode(' '));
    });
    el.textContent = '';
    el.appendChild(frag);
  }

  function isInView(el) {
    const r = el.getBoundingClientRect();
    return r.top < viewportH * 0.9 && r.bottom > 0;
  }

  function initReveals() {
    document.querySelectorAll('.split').forEach(splitWords);
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((reveal) => {
      let i = 0;
      reveal.querySelectorAll('.w, .rv').forEach((el) => {
        el.style.setProperty('--i', String(i++));
      });
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });

    reveals.forEach((el) => {
      if (isInView(el)) el.classList.add('in');
      else io.observe(el);
    });
  }

  // ------------------------------------------------------------------
  // Cinematic stills (generated from the live scene, then graded)
  // ------------------------------------------------------------------
  function gradeStill(dataURL, w, h) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement('canvas');
        c.width = w; c.height = h;
        const g = c.getContext('2d');
        g.drawImage(img, 0, 0, w, h);
        // vignette
        const vg = g.createRadialGradient(w / 2, h / 2, h * 0.32, w / 2, h / 2, h * 1.02);
        vg.addColorStop(0, 'rgba(0,0,0,0)');
        vg.addColorStop(1, 'rgba(0,0,0,0.40)');
        g.fillStyle = vg;
        g.fillRect(0, 0, w, h);
        // fine film grain
        const gd = g.getImageData(0, 0, w, h);
        const d = gd.data;
        for (let i = 0; i < d.length; i += 4) {
          const n = (Math.random() - 0.5) * 11;
          d[i] += n; d[i + 1] += n; d[i + 2] += n;
        }
        g.putImageData(gd, 0, 0);
        resolve(c.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = () => resolve(dataURL);
      img.src = dataURL;
    });
  }

  function captureStills() {
    const W = 960, H = 640;
    const cards = document.querySelectorAll('.card[data-still]');
    cards.forEach((card) => {
      const key = card.getAttribute('data-still');
      const pose = STILLS[key];
      const img = card.querySelector('img');
      if (!pose || !img) return;
      // Match each still's mood to its chapter before rendering.
      K.WORLD.setEnv(KEYFRAMES[pose.chapter].env);
      const dataURL = K.WORLD.captureStill(pose, W, H);
      if (!dataURL) return;
      gradeStill(dataURL, W, H).then((graded) => {
        img.src = graded;
        img.classList.add('loaded');
      });
    });
    // Restore the live environment.
    K.WORLD.setEnv(currentEnv);
  }

  // ------------------------------------------------------------------
  // Navigation
  // ------------------------------------------------------------------
  function scrollToY(targetY) {
    scrollAnimId++; // cancel any in-flight animation
    const y = clamp(targetY, 0, docHeight - viewportH);
    if (REDUCED) { window.scrollTo(0, y); return; }
    const start = window.scrollY;
    const dist = y - start;
    if (Math.abs(dist) < 2) return;
    const dur = clamp(Math.abs(dist) * 0.55, 450, 1500);
    const id = scrollAnimId;
    const t0 = performance.now();
    function frame(now) {
      if (id !== scrollAnimId) return;
      const t = clamp((now - t0) / dur, 0, 1);
      window.scrollTo(0, start + dist * easeInOutCubic(t));
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function sectionTop(el) {
    const r = el.getBoundingClientRect();
    return r.top + window.scrollY;
  }

  function initNavigation() {
    // Take over smooth scrolling (CSS smooth is the no-JS fallback).
    document.documentElement.style.scrollBehavior = 'auto';

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        const id = link.getAttribute('href').slice(1);
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          scrollToY(sectionTop(el));
          if (window.history && window.history.pushState) {
            window.history.pushState(null, '', '#' + id);
          }
          if (el.hasAttribute('tabindex')) el.focus({ preventScroll: true });
          closeMenu();
        }
      }
      const play = e.target.closest('.play[data-goto]');
      if (play) {
        const id = play.getAttribute('data-goto').slice(1);
        const el = document.getElementById(id);
        if (el) scrollToY(sectionTop(el));
      }
    });

    // Cancel programmatic scroll when the user takes over.
    window.addEventListener('wheel', () => { scrollAnimId++; }, { passive: true });
    window.addEventListener('touchstart', () => { scrollAnimId++; }, { passive: true });

    // Menu
    menuToggle.addEventListener('click', () => {
      const open = menuEl.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('menu-open', open);
    });
    const closeBtn = menuEl.querySelector('[data-close]');
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  function closeMenu() {
    menuEl.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('menu-open');
  }

  // ------------------------------------------------------------------
  // Active-chapter UI (header nav, chapter rail, mobile menu)
  // ------------------------------------------------------------------
  function updateNav() {
    document.querySelectorAll('[data-nav]').forEach((a) => {
      a.classList.toggle('is-active', +a.getAttribute('data-nav') === activeIndex);
    });
    const rail = document.querySelectorAll('.chapter-rail a');
    rail.forEach((a) => {
      a.classList.toggle('is-active', +a.getAttribute('data-nav') === activeIndex);
    });
  }

  // ------------------------------------------------------------------
  // Custom cursor (fine pointers only)
  // ------------------------------------------------------------------
  function initCursor() {
    if (!FINE_POINTER) return;
    document.body.classList.add('has-cursor');
    window.addEventListener('mousemove', (e) => {
      cursor.x = e.clientX; cursor.y = e.clientY;
      dotEl.style.opacity = '1'; ringEl.style.opacity = '1';
    }, { passive: true });
    document.addEventListener('mouseover', (e) => {
      document.body.classList.toggle('cursor-hover', !!e.target.closest('a, button, .play, .card-frame'));
    });
    document.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  }

  // ------------------------------------------------------------------
  // Boot
  // ------------------------------------------------------------------
  function boot() {
    sections = collectSections();
    measure();
    buildCutouts();
    initReveals();
    initNavigation();
    initCursor();

    // Initial camera state.
    target.pos.copy(KEYFRAMES[0].pos);
    target.look.copy(KEYFRAMES[0].look);
    target.fov = KEYFRAMES[0].fov;
    target.env = cloneEnv(KEYFRAMES[0].env);
    cam.pos.copy(target.pos);
    cam.look.copy(target.look);
    cam.fov = target.fov;
    currentEnv = cloneEnv(target.env);

    K.WORLD.init(worldEl);
    K.WORLD.setEnv(currentEnv);

    // Recompute once layout / fonts settle.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => { measure(); updateNav(); });
    }
    window.addEventListener('resize', () => {
      measure();
      updateNav();
      K.WORLD.onResize(window.innerWidth, window.innerHeight);
    });

    requestAnimationFrame((now) => {
      loop._last = now;
      captureStills();
      // Reveal anything already in view after stills begin.
      document.querySelectorAll('.reveal').forEach((el) => {
        if (isInView(el)) el.classList.add('in');
      });
      requestAnimationFrame(loop);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
