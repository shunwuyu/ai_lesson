/* ============================================================
   KAGE — procedural alpha-preserving foreground cutouts
   Each species draws a near-black silhouette on a transparent
   canvas and returns an alpha-preserving data URL (WebP when
   supported, PNG otherwise). No image files on disk, no 404s.
   ============================================================ */
(function () {
  'use strict';
  const K = window.KAGE = window.KAGE || {};

  // Seeded PRNG so silhouettes are stable across reloads.
  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const INK       = '#05070b';
  const INK_BLUE  = '#070b13';
  const INK_SOFT  = '#0a0f18';

  function makeCanvas(w, h) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    return [c, c.getContext('2d')];
  }

  function toURL(c) {
    let url = null;
    try { url = c.toDataURL('image/webp'); } catch (e) { url = null; }
    if (!url || url.indexOf('image/webp') === -1) url = c.toDataURL('image/png');
    return url;
  }

  // ----- shape helpers ---------------------------------------------------

  function blob(ctx, cx, cy, r, rnd, squash) {
    const pts = 7 + Math.floor(rnd() * 4);
    const sy = squash == null ? 0.72 : squash;
    ctx.beginPath();
    for (let k = 0; k < pts; k++) {
      const a = (k / pts) * Math.PI * 2;
      const rr = r * (0.68 + rnd() * 0.5);
      const px = cx + Math.cos(a) * rr;
      const py = cy + Math.sin(a) * rr * sy;
      if (k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
  }

  // A lobed canopy made of overlapping arcs (maple / broadleaf).
  function lobeCluster(ctx, cx, cy, r, rnd) {
    const lobes = 5 + Math.floor(rnd() * 3);
    for (let k = 0; k < lobes; k++) {
      const a = (k / lobes) * Math.PI * 2 + rnd() * 0.4;
      const lr = r * (0.45 + rnd() * 0.3);
      const lx = cx + Math.cos(a) * r * 0.55;
      const ly = cy + Math.sin(a) * r * 0.5;
      ctx.beginPath();
      ctx.arc(lx, ly, lr, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }

  // ----- species ---------------------------------------------------------

  const SPECIES = {};

  SPECIES.grass = function (ctx, w, h, rnd) {
    ctx.strokeStyle = INK;
    ctx.lineCap = 'round';
    const blades = Math.floor(w / 7);
    for (let i = 0; i < blades; i++) {
      const x = (i / blades) * w + rnd() * (w / blades);
      const hgt = h * (0.22 + rnd() * 0.62);
      const lean = (rnd() - 0.5) * h * 0.28;
      ctx.lineWidth = 1 + rnd() * 2.4;
      ctx.beginPath();
      ctx.moveTo(x, h);
      ctx.quadraticCurveTo(x + lean * 0.35, h - hgt * 0.55, x + lean, h - hgt);
      ctx.stroke();
    }
  };

  SPECIES.hills = function (ctx, w, h, rnd) {
    ctx.fillStyle = INK_BLUE;
    ctx.beginPath();
    ctx.moveTo(0, h);
    const px = w * (0.3 + rnd() * 0.4);
    const py = h * (0.28 + rnd() * 0.28);
    ctx.quadraticCurveTo(w * 0.12, h * 0.62, px, py);
    ctx.quadraticCurveTo(w * 0.66, h * 0.5, w, h * 0.78);
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = INK_SOFT;
    ctx.beginPath();
    ctx.moveTo(0, h);
    const px2 = w * (0.6 + rnd() * 0.3);
    const py2 = h * (0.42 + rnd() * 0.22);
    ctx.quadraticCurveTo(w * 0.4, h * 0.72, px2, py2);
    ctx.quadraticCurveTo(w * 0.85, h * 0.6, w, h * 0.88);
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();
  };

  function pineTier(ctx, x, yTop, yBottom, r, rnd) {
    const segs = 5;
    ctx.beginPath();
    ctx.moveTo(x, yTop);
    ctx.lineTo(x - r, yBottom);
    for (let s = 1; s <= segs; s++) {
      const jx = x - r + (2 * r) * (s / segs);
      const jy = yBottom + (rnd() - 0.5) * (yBottom - yTop) * 0.18;
      ctx.lineTo(jx, jy);
    }
    ctx.lineTo(x + r, yBottom);
    ctx.closePath();
    ctx.fill();
  }

  function pine(ctx, x, baseY, r, H, rnd) {
    ctx.fillStyle = INK;
    ctx.fillRect(x - r * 0.05, baseY - H * 0.28, r * 0.1, H * 0.28);
    let y = baseY - H * 0.3;
    let rr = r;
    for (let t = 0; t < 4; t++) {
      pineTier(ctx, x, y - H * 0.2, y + H * 0.06, rr, rnd);
      y -= H * 0.23;
      rr *= 0.76;
    }
  }

  SPECIES.pines = function (ctx, w, h, rnd) {
    const n = 2 + Math.floor(rnd() * 2);
    for (let i = 0; i < n; i++) {
      const t = n === 1 ? 0.5 : i / (n - 1);
      const tx = w * (0.16 + 0.68 * t) + (rnd() - 0.5) * w * 0.12;
      const s = 0.7 + rnd() * 0.7;
      pine(ctx, tx, h, w * 0.15 * s, h * (0.72 * s), rnd);
    }
  };

  SPECIES.maple = function (ctx, w, h, rnd) {
    ctx.strokeStyle = INK;
    ctx.lineCap = 'round';
    ctx.lineWidth = Math.max(2, w * 0.013);
    ctx.beginPath();
    ctx.moveTo(-w * 0.02, h);
    ctx.quadraticCurveTo(w * 0.28, h * 0.72, w * 0.68, h * 0.58);
    ctx.stroke();

    ctx.lineWidth = Math.max(1.4, w * 0.008);
    ctx.beginPath();
    ctx.moveTo(w * 0.4, h * 0.66);
    ctx.quadraticCurveTo(w * 0.55, h * 0.42, w * 0.86, h * 0.34);
    ctx.stroke();

    ctx.fillStyle = INK;
    lobeCluster(ctx, w * 0.72, h * 0.5, w * 0.2, rnd);
    lobeCluster(ctx, w * 0.9, h * 0.3, w * 0.14, rnd);
    lobeCluster(ctx, w * 0.52, h * 0.56, w * 0.15, rnd);
    lobeCluster(ctx, w * 0.3, h * 0.66, w * 0.12, rnd);
  };

  SPECIES.sakura = function (ctx, w, h, rnd) {
    ctx.strokeStyle = INK;
    ctx.lineCap = 'round';
    ctx.lineWidth = Math.max(2, w * 0.011);
    ctx.beginPath();
    ctx.moveTo(w, h);
    ctx.quadraticCurveTo(w * 0.72, h * 0.66, w * 0.34, h * 0.52);
    ctx.stroke();

    ctx.lineWidth = Math.max(1.3, w * 0.007);
    for (let k = 0; k < 4; k++) {
      const sx = w * (0.3 + rnd() * 0.6);
      const sy = h * (0.5 + rnd() * 0.2);
      const ex = w * (0.1 + rnd() * 0.7);
      const ey = h * (0.1 + rnd() * 0.4);
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.quadraticCurveTo((sx + ex) / 2, (sy + ey) / 2 - h * 0.1, ex, ey);
      ctx.stroke();
    }

    ctx.fillStyle = INK;
    const bl = Math.floor(w / 22);
    for (let k = 0; k < bl; k++) {
      const bx = w * (0.08 + 0.9 * rnd());
      const by = h * (0.1 + 0.62 * rnd());
      const br = Math.max(1, w * 0.006 + rnd() * w * 0.006);
      ctx.beginPath();
      ctx.arc(bx, by, br, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  SPECIES.stones = function (ctx, w, h, rnd) {
    ctx.fillStyle = INK;
    const n = 4 + Math.floor(rnd() * 3);
    for (let i = 0; i < n; i++) {
      const cx = w * (0.08 + 0.84 * rnd());
      const r = h * (0.1 + rnd() * 0.2);
      const by = h - r * 0.22;
      blob(ctx, cx, by, r, rnd, 0.68);
    }
    ctx.fillStyle = INK_SOFT;
    for (let i = 0; i < n; i++) {
      const cx = w * (0.06 + 0.88 * rnd());
      const r = h * (0.05 + rnd() * 0.09);
      blob(ctx, cx, h - r * 0.1, r, rnd, 0.6);
    }
  };

  SPECIES.wall = function (ctx, w, h, rnd) {
    ctx.fillStyle = INK;
    let y = h;
    while (y > h * 0.12) {
      const blockH = h * (0.1 + rnd() * 0.07);
      let x = -w * 0.1;
      while (x < w * 1.1) {
        const bw = w * (0.09 + rnd() * 0.13);
        const top = y - blockH + (rnd() - 0.5) * blockH * 0.4;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + rnd() * bw * 0.35, top);
        ctx.lineTo(x + bw, top + (rnd() - 0.5) * blockH * 0.25);
        ctx.lineTo(x + bw * 0.82, y);
        ctx.closePath();
        ctx.fill();
        x += bw;
      }
      y -= blockH;
    }
  };

  SPECIES.ruins = function (ctx, w, h, rnd) {
    ctx.fillStyle = INK;
    // fallen pillar
    ctx.save();
    ctx.translate(w * 0.62, h * 0.62);
    ctx.rotate(-0.24);
    ctx.fillRect(-w * 0.3, -h * 0.025, w * 0.6, h * 0.05);
    ctx.restore();

    // broken standing column
    const cx = w * 0.32;
    const cw = w * 0.06;
    const ch = h * 0.52;
    ctx.fillRect(cx - cw / 2, h - ch, cw, ch);
    ctx.fillRect(cx - cw, h - ch, cw * 2, h * 0.05);
    ctx.beginPath();
    ctx.moveTo(cx - cw, h - ch);
    ctx.lineTo(cx, h - ch - h * 0.06);
    ctx.lineTo(cx + cw, h - ch);
    ctx.closePath();
    ctx.fill();

    // scattered blocks
    for (let k = 0; k < 5; k++) {
      const bx = w * (0.05 + 0.9 * rnd());
      const by = h * (0.72 + 0.28 * rnd());
      const bw = w * (0.04 + rnd() * 0.08);
      const bh = h * (0.03 + rnd() * 0.05);
      ctx.save();
      ctx.translate(bx, by);
      ctx.rotate((rnd() - 0.5) * 0.6);
      ctx.fillRect(-bw / 2, -bh / 2, bw, bh);
      ctx.restore();
    }
  };

  SPECIES.bush = function (ctx, w, h, rnd) {
    ctx.fillStyle = INK;
    const n = 5 + Math.floor(rnd() * 3);
    for (let i = 0; i < n; i++) {
      const t = n === 1 ? 0.5 : i / (n - 1);
      const cx = w * (0.1 + 0.8 * t) + (rnd() - 0.5) * w * 0.06;
      const r = h * (0.14 + rnd() * 0.18);
      ctx.beginPath();
      ctx.arc(cx, h, r, Math.PI, 0);
      ctx.closePath();
      ctx.fill();
    }
    ctx.fillStyle = INK_SOFT;
    for (let i = 0; i < n; i++) {
      const cx = w * (0.08 + 0.84 * rnd());
      const r = h * (0.08 + rnd() * 0.1);
      ctx.beginPath();
      ctx.arc(cx, h, r, Math.PI, 0);
      ctx.closePath();
      ctx.fill();
    }
  };

  SPECIES.lantern = function (ctx, w, h, rnd) {
    ctx.fillStyle = INK;
    const cx = w / 2;
    const s = Math.min(w * 0.42, h * 0.7);
    // base
    ctx.fillRect(cx - s * 0.34, h - s * 0.1, s * 0.68, s * 0.1);
    // pedestal
    ctx.beginPath();
    ctx.moveTo(cx - s * 0.2, h - s * 0.1);
    ctx.lineTo(cx - s * 0.11, h - s * 0.52);
    ctx.lineTo(cx + s * 0.11, h - s * 0.52);
    ctx.lineTo(cx + s * 0.2, h - s * 0.1);
    ctx.closePath();
    ctx.fill();
    // light house
    ctx.fillRect(cx - s * 0.21, h - s * 0.8, s * 0.42, s * 0.28);
    // cap
    ctx.beginPath();
    ctx.moveTo(cx - s * 0.38, h - s * 0.8);
    ctx.lineTo(cx, h - s * 1.16);
    ctx.lineTo(cx + s * 0.38, h - s * 0.8);
    ctx.closePath();
    ctx.fill();
    // finial
    ctx.beginPath();
    ctx.arc(cx, h - s * 1.22, s * 0.07, 0, Math.PI * 2);
    ctx.fill();
  };

  K.CUTOUTS = {
    kinds: Object.keys(SPECIES),
    make: function (kind, w, h, seed) {
      const [c, ctx] = makeCanvas(w, h);
      const fn = SPECIES[kind];
      if (!fn) return null;
      const rnd = mulberry32(seed == null ? (Math.random() * 0xffffff) | 0 : seed);
      fn(ctx, w, h, rnd);
      return toURL(c);
    }
  };
})();
