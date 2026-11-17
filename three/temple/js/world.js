/* ============================================================
   KAGE — procedural WebGL world
   A fictional Kyoto mountain temple built from primitives:
   torii, stairs, hall, dry garden, pines, stone lanterns, a
   vermilion moon, ridges, fog, rain, leaves, embers.
   Post-processing: restrained bloom + film grain + vignette.
   ============================================================ */
(function () {
  'use strict';
  const K = window.KAGE = window.KAGE || {};

  // ----- deterministic noise --------------------------------------------
  function hash2(x, y) {
    const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
    return s - Math.floor(s);
  }
  function smooth(t) { return t * t * (3 - 2 * t); }
  function valueNoise(x, y) {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = x - xi, yf = y - yi;
    const u = smooth(xf), v = smooth(yf);
    const a = hash2(xi, yi), b = hash2(xi + 1, yi);
    const c = hash2(xi, yi + 1), d = hash2(xi + 1, yi + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }
  function fbm(x, y, oct) {
    let amp = 1, freq = 1, sum = 0, norm = 0;
    for (let i = 0; i < oct; i++) {
      sum += valueNoise(x * freq, y * freq) * amp;
      norm += amp; amp *= 0.5; freq *= 2.02;
    }
    return sum / norm;
  }
  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // ----- palette ---------------------------------------------------------
  const C = {
    clear: 0x05070c,
    fog: 0x0a0f18,
    groundLow: new THREE.Color(0x06090f),
    groundHigh: new THREE.Color(0x101826),
    path: new THREE.Color(0x1a2330),
    wood: 0x19110b,
    roof: 0x0b0e14,
    shoji: 0xffd6a0,
    stone: 0x151c28,
    stoneDark: 0x0f141d,
    torii: 0xb5291b,
    pine: 0x0d1a15,
    pineDark: 0x09130f,
    moon: 0xc8442b,
    moonCore: 0xe26a3f,
    moonLight: 0x7fa3cd,
    lanternLight: 0xffa24d,
    rain: 0x93a9c4,
    leafAmber: 0xe2a45c,
    leafVerm: 0xc23520,
    leafBone: 0xe7dfce,
    ember: 0xff9a45
  };

  const WORLD = {};
  K.WORLD = WORLD;

  let renderer, scene, camera, composer;
  let bloomPass, filmPass, vignettePass;

  // mutable handles
  let moonGroup, moonMesh, moonGlow, moonLight;
  let ambientLight, hemiLight;
  let shojiMats = [];
  let lanternLights = [];
  let rain, leaves, embers;

  const leafColors = [C.leafAmber, C.leafVerm, C.leafBone];

  // ----- texture helpers -------------------------------------------------
  function radialTexture(inner, outer, size) {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, inner);
    grad.addColorStop(1, outer);
    g.fillStyle = grad;
    g.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
  }

  function skyTexture() {
    const c = document.createElement('canvas');
    c.width = 16; c.height = 256;
    const g = c.getContext('2d');
    const grad = g.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0.0, '#03040a');
    grad.addColorStop(0.45, '#070b15');
    grad.addColorStop(0.72, '#0c1424');
    grad.addColorStop(0.88, '#141d2e');
    grad.addColorStop(1.0, '#182233');
    g.fillStyle = grad;
    g.fillRect(0, 0, 16, 256);
    return new THREE.CanvasTexture(c);
  }

  function moonTexture() {
    const s = 256;
    const c = document.createElement('canvas');
    c.width = c.height = s;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(s * 0.42, s * 0.42, s * 0.05, s * 0.5, s * 0.5, s * 0.5);
    grad.addColorStop(0, '#e8734a');
    grad.addColorStop(0.55, '#cf4a2a');
    grad.addColorStop(0.82, '#b02a19');
    grad.addColorStop(1, '#8f1f12');
    g.fillStyle = grad;
    g.fillRect(0, 0, s, s);
    // faint craters
    g.globalAlpha = 0.12;
    g.fillStyle = '#7a160c';
    const r = mulberry32(7);
    for (let i = 0; i < 14; i++) {
      const x = s * (0.18 + r() * 0.64);
      const y = s * (0.18 + r() * 0.64);
      const rad = s * (0.03 + r() * 0.08);
      g.beginPath();
      g.arc(x, y, rad, 0, Math.PI * 2);
      g.fill();
    }
    g.globalAlpha = 1;
    return new THREE.CanvasTexture(c);
  }

  function gravelTexture() {
    const s = 512;
    const c = document.createElement('canvas');
    c.width = c.height = s;
    const g = c.getContext('2d');
    g.fillStyle = '#151c26';
    g.fillRect(0, 0, s, s);
    g.strokeStyle = '#1c2531';
    const r = mulberry32(11);
    for (let i = 0; i < 900; i++) {
      g.globalAlpha = 0.25 + r() * 0.4;
      g.lineWidth = 0.5 + r() * 1.2;
      const x = r() * s, y = r() * s;
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(x + (r() - 0.5) * 6, y + (r() - 0.5) * 6);
      g.stroke();
    }
    // concentric rake arcs
    g.globalAlpha = 0.5;
    g.strokeStyle = '#222c3a';
    g.lineWidth = 1.4;
    const cx = s * 0.5, cy = s * 0.55;
    for (let rr = 30; rr < 260; rr += 22) {
      g.beginPath();
      g.arc(cx, cy, rr, Math.PI * 0.9, Math.PI * 1.95);
      g.stroke();
    }
    g.globalAlpha = 1;
    return new THREE.CanvasTexture(c);
  }

  // ----- builders --------------------------------------------------------
  function addTorii(x, y, z, w, h, thick) {
    const grp = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: C.torii, roughness: 0.45, metalness: 0.12 });
    const pillar = new THREE.BoxGeometry(thick, h, thick);
    const p1 = new THREE.Mesh(pillar, mat);
    p1.position.set(-w / 2 + thick / 2, h / 2, 0);
    const p2 = new THREE.Mesh(pillar, mat);
    p2.position.set(w / 2 - thick / 2, h / 2, 0);
    grp.add(p1, p2);
    // top kasagi beam
    const kasagi = new THREE.BoxGeometry(w + thick * 2.6, thick * 0.72, thick * 1.4);
    const k = new THREE.Mesh(kasagi, mat);
    k.position.set(0, h + thick * 0.4, 0);
    grp.add(k);
    // secondary nuki beam
    const nuki = new THREE.BoxGeometry(w - thick * 0.4, thick * 0.62, thick * 1.1);
    const n = new THREE.Mesh(nuki, mat);
    n.position.set(0, h * 0.72, 0);
    grp.add(n);
    grp.position.set(x, y, z);
    return grp;
  }

  function addStairs(x, y, z0, z1, w, rise) {
    const grp = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: C.stone, roughness: 0.9, metalness: 0.05 });
    const steps = Math.round(Math.abs(z1 - z0) / 1.05);
    const dz = (z1 - z0) / steps;
    for (let i = 0; i < steps; i++) {
      const z = z0 + dz * i;
      const yHere = y + rise * (i / steps);
      const box = new THREE.BoxGeometry(w, 0.3, Math.abs(dz) + 0.12);
      const m = new THREE.Mesh(box, mat);
      m.position.set(x, yHere, z);
      grp.add(m);
    }
    return grp;
  }

  function addPine(x, z, scale) {
    const grp = new THREE.Group();
    const trunkMat = new THREE.MeshStandardMaterial({ color: C.wood, roughness: 0.9 });
    const pineMat = new THREE.MeshStandardMaterial({ color: C.pine, roughness: 1, flatShading: true });
    const pineMatD = new THREE.MeshStandardMaterial({ color: C.pineDark, roughness: 1, flatShading: true });
    const trunk = new THREE.CylinderGeometry(0.06, 0.14, 1, 6);
    const tr = new THREE.Mesh(trunk, trunkMat);
    tr.position.y = 0.5;
    grp.add(tr);
    const tiers = 4;
    let y = 0.72, r = 0.55;
    for (let t = 0; t < tiers; t++) {
      const cone = new THREE.ConeGeometry(r, 0.62, 7);
      const m = new THREE.Mesh(cone, t % 2 === 0 ? pineMat : pineMatD);
      m.position.y = y;
      grp.add(m);
      y += 0.42; r *= 0.74;
    }
    grp.position.set(x, 0, z);
    grp.scale.setScalar(scale);
    return grp;
  }

  function addRock(x, z, scale) {
    const geo = new THREE.IcosahedronGeometry(1, 1);
    const pos = geo.attributes.position;
    const r = mulberry32(Math.floor(x * 13 + z * 7 + scale * 31));
    for (let i = 0; i < pos.count; i++) {
      const n = 0.75 + r() * 0.5;
      pos.setXYZ(i, pos.getX(i) * n, pos.getY(i) * (0.55 + r() * 0.55), pos.getZ(i) * n);
    }
    geo.computeVertexNormals();
    const mat = new THREE.MeshStandardMaterial({ color: C.stone, roughness: 0.92, metalness: 0.04, flatShading: true });
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, scale * 0.2, z);
    m.scale.setScalar(scale);
    m.rotation.y = r() * Math.PI;
    return m;
  }

  function addLantern(x, y, z, scale) {
    const grp = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: C.stone, roughness: 0.85, metalness: 0.06 });
    const s = scale;
    const base = new THREE.Mesh(new THREE.BoxGeometry(s * 0.7, s * 0.14, s * 0.7), mat);
    base.position.y = s * 0.07; grp.add(base);
    const post = new THREE.Mesh(new THREE.CylinderGeometry(s * 0.1, s * 0.16, s * 0.6, 6), mat);
    post.position.y = s * 0.14 + s * 0.3; grp.add(post);
    const house = new THREE.Mesh(new THREE.BoxGeometry(s * 0.46, s * 0.3, s * 0.46), mat);
    house.position.y = s * 0.14 + s * 0.6 + s * 0.15; grp.add(house);
    const cap = new THREE.Mesh(new THREE.ConeGeometry(s * 0.42, s * 0.34, 4), mat);
    cap.position.y = s * 0.14 + s * 0.6 + s * 0.3 + s * 0.17; grp.add(cap);
    const fin = new THREE.Mesh(new THREE.SphereGeometry(s * 0.06, 8, 8), mat);
    fin.position.y = s * 0.14 + s * 0.6 + s * 0.3 + s * 0.34 + s * 0.05; grp.add(fin);
    // warm light window
    const windowMat = new THREE.MeshBasicMaterial({ color: C.lanternLight });
    const win = new THREE.Mesh(new THREE.BoxGeometry(s * 0.28, s * 0.18, s * 0.28), windowMat);
    win.position.y = s * 0.14 + s * 0.6 + s * 0.15; grp.add(win);
    // point light
    const pl = new THREE.PointLight(C.lanternLight, 0.0, s * 7, 2);
    pl.position.y = s * 0.14 + s * 0.6 + s * 0.15;
    grp.add(pl);
    lanternLights.push({ light: pl, windowMat: windowMat });
    grp.position.set(x, y, z);
    return grp;
  }

  function addTemple(x, y, z) {
    const grp = new THREE.Group();
    const wood = new THREE.MeshStandardMaterial({ color: C.wood, roughness: 0.85, metalness: 0.05 });
    const roof = new THREE.MeshStandardMaterial({ color: C.roof, roughness: 0.6, metalness: 0.2, flatShading: true });

    const W = 9, D = 6, H = 3.2;
    // platform
    const plat = new THREE.Mesh(new THREE.BoxGeometry(W + 1.4, 0.5, D + 1.4), wood);
    plat.position.y = 0.25; grp.add(plat);

    // floor / veranda
    const floor = new THREE.Mesh(new THREE.BoxGeometry(W + 0.6, 0.16, D + 0.4), wood);
    floor.position.y = 0.5 + 0.08; grp.add(floor);

    // back wall with shoji (warm, emissive)
    const shojiMat = new THREE.MeshStandardMaterial({
      color: C.shoji, emissive: C.lanternLight, emissiveIntensity: 0.55,
      roughness: 0.8
    });
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x0d0a06, roughness: 0.9 });
    const wall = new THREE.Mesh(new THREE.BoxGeometry(W, H, 0.14), wallMat);
    wall.position.set(0, 0.58 + H / 2, -D / 2); grp.add(wall);
    shojiMats.push(shojiMat);
    const panels = 3;
    for (let i = 0; i < panels; i++) {
      const px = (i - (panels - 1) / 2) * (W * 0.28);
      const shoji = new THREE.Mesh(new THREE.BoxGeometry(W * 0.24, H * 0.66, 0.16), shojiMat);
      shoji.position.set(px, 0.58 + H * 0.55, -D / 2 + 0.1); grp.add(shoji);
    }

    // front posts
    for (let i = 0; i < 4; i++) {
      const px = (i - 1.5) * (W * 0.28);
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, H, 8), wood);
      post.position.set(px, 0.58 + H / 2, D / 2 - 0.1); grp.add(post);
    }

    // hip roof (square pyramid scaled rectangular)
    const roofGeo = new THREE.ConeGeometry(1, 1, 4);
    const roofMesh = new THREE.Mesh(roofGeo, roof);
    roofMesh.scale.set(W * 0.78, H * 0.92, D * 0.62);
    roofMesh.rotation.y = Math.PI / 4;
    roofMesh.position.y = 0.58 + H + H * 0.42;
    grp.add(roofMesh);
    // ridge beam
    const ridge = new THREE.Mesh(new THREE.BoxGeometry(W * 1.15, 0.14, 0.16), roof);
    ridge.position.y = 0.58 + H + H * 0.9; grp.add(ridge);

    // interior warm light
    const inner = new THREE.PointLight(C.lanternLight, 0.0, 12, 2);
    inner.position.set(0, 0.58 + H * 0.55, -D / 2 + 0.6);
    grp.add(inner);
    lanternLights.push({ light: inner, windowMat: shojiMat });

    grp.position.set(x, y, z);
    return grp;
  }

  function addShrine(x, y, z) {
    const grp = new THREE.Group();
    const wood = new THREE.MeshStandardMaterial({ color: C.wood, roughness: 0.85 });
    const roof = new THREE.MeshStandardMaterial({ color: C.roof, roughness: 0.6, flatShading: true });
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.4, 1.4), wood);
    body.position.y = 0.7; grp.add(body);
    const roofGeo = new THREE.ConeGeometry(1.5, 1.1, 4);
    const r = new THREE.Mesh(roofGeo, roof);
    r.scale.set(1, 1, 0.72);
    r.rotation.y = Math.PI / 4;
    r.position.y = 1.4 + 0.5; grp.add(r);
    grp.position.set(x, y, z);
    return grp;
  }

  function addRidge(x, y, z, w, h, color) {
    const seg = 40;
    const geo = new THREE.PlaneGeometry(w, h, seg, 1);
    const pos = geo.attributes.position;
    for (let i = 0; i <= seg; i++) {
      const xi = (i / seg) - 0.5;
      const peak = fbm(xi * 2.4 + x * 0.01, z * 0.13, 4);
      pos.setY(i * 2 + 1, peak * h);
      pos.setY(i * 2, peak * h);
    }
    geo.computeVertexNormals();
    const mat = new THREE.MeshBasicMaterial({ color: color });
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.scale.y = 1.2;
    return m;
  }

  function addFogSprite(x, y, z, scale, opacity) {
    const tex = radialTexture('rgba(120,140,170,0.9)', 'rgba(120,140,170,0)', 128);
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: opacity, depthWrite: false });
    const s = new THREE.Sprite(mat);
    s.scale.set(scale, scale * 0.34, 1);
    s.position.set(x, y, z);
    return s;
  }

  // ----- particles -------------------------------------------------------
  function buildRain() {
    const N = 640;
    const pos = new Float32Array(N * 6);
    const speeds = new Float32Array(N);
    const xs = new Float32Array(N);
    const zs = new Float32Array(N);
    const r = mulberry32(3);
    for (let i = 0; i < N; i++) {
      xs[i] = (r() - 0.5) * 70;
      zs[i] = (r() - 0.5) * 90;
      speeds[i] = 16 + r() * 14;
      pos[i * 6 + 0] = xs[i];
      pos[i * 6 + 1] = 4 + r() * 22;
      pos[i * 6 + 2] = zs[i];
      pos[i * 6 + 3] = xs[i];
      pos[i * 6 + 4] = pos[i * 6 + 1] - 0.9;
      pos[i * 6 + 5] = zs[i];
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.LineBasicMaterial({ color: C.rain, transparent: true, opacity: 0, depthWrite: false });
    const lines = new THREE.LineSegments(geo, mat);
    lines.frustumCulled = false;
    return { obj: lines, pos: pos, speeds: speeds, xs: xs, zs: zs };
  }

  function buildLeaves() {
    const N = 150;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const data = [];
    const r = mulberry32(5);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (r() - 0.5) * 46;
      pos[i * 3 + 1] = 3 + r() * 22;
      pos[i * 3 + 2] = (r() - 0.5) * 60;
      const c = new THREE.Color(leafColors[i % 3]);
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
      data.push({ phase: r() * Math.PI * 2, speed: 0.5 + r() * 0.8, sway: 0.6 + r() * 0.9, baseX: pos[i * 3], baseZ: pos[i * 3 + 2] });
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.2, map: radialTexture('#ffffff', 'rgba(255,255,255,0)', 64),
      vertexColors: true, transparent: true, opacity: 0, depthWrite: false
    });
    const pts = new THREE.Points(geo, mat);
    pts.frustumCulled = false;
    return { obj: pts, pos: pos, data: data };
  }

  function buildEmbers() {
    const N = 90;
    const pos = new Float32Array(N * 3);
    const data = [];
    const r = mulberry32(9);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (r() - 0.5) * 24;
      pos[i * 3 + 1] = 0.4 + r() * 6;
      pos[i * 3 + 2] = -30 + r() * 40;
      data.push({ phase: r() * Math.PI * 2, speed: 0.5 + r() * 1.1, sway: 0.4 + r() * 0.7 });
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.14, color: C.ember, map: radialTexture('#ffc27a', 'rgba(255,120,40,0)', 64),
      transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending
    });
    const pts = new THREE.Points(geo, mat);
    pts.frustumCulled = false;
    return { obj: pts, pos: pos, data: data };
  }

  // ----- init ------------------------------------------------------------
  WORLD.init = function (container) {
    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(C.clear, 1);
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(C.fog, 0.012);

    camera = new THREE.PerspectiveCamera(55, 1, 0.1, 500);
    camera.position.set(0, 4, 36);

    // lighting
    ambientLight = new THREE.AmbientLight(0x1a2333, 0.55);
    scene.add(ambientLight);
    hemiLight = new THREE.HemisphereLight(0x2a3550, 0x080a10, 0.5);
    scene.add(hemiLight);
    moonLight = new THREE.DirectionalLight(C.moonLight, 0.5);
    moonLight.position.set(3, 24, -100);
    scene.add(moonLight);

    // sky dome
    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(240, 32, 16),
      new THREE.MeshBasicMaterial({ map: skyTexture(), side: THREE.BackSide, fog: false, depthWrite: false })
    );
    sky.position.y = 20;
    scene.add(sky);

    // moon
    moonGroup = new THREE.Group();
    moonGroup.position.set(3, 26, -100);
    moonMesh = new THREE.Mesh(
      new THREE.SphereGeometry(9, 40, 24),
      new THREE.MeshBasicMaterial({ map: moonTexture(), fog: false, toneMapped: false })
    );
    moonGroup.add(moonMesh);
    const glowTex = radialTexture('rgba(210,72,40,0.85)', 'rgba(210,72,40,0)', 256);
    moonGlow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTex, transparent: true, opacity: 0.5, depthWrite: false, fog: false, blending: THREE.AdditiveBlending
    }));
    moonGlow.scale.set(44, 44, 1);
    moonGroup.add(moonGlow);
    scene.add(moonGroup);

    // terrain
    const tgeo = new THREE.PlaneGeometry(360, 360, 150, 150);
    tgeo.rotateX(-Math.PI / 2);
    const tpos = tgeo.attributes.position;
    const tcol = new Float32Array(tpos.count * 3);
    const cLow = C.groundLow, cHigh = C.groundHigh, cPath = C.path;
    for (let i = 0; i < tpos.count; i++) {
      const x = tpos.getX(i), z = tpos.getZ(i);
      const pathMask = Math.max(0, 1 - Math.abs(x) / 2.4);
      let disp = fbm(x * 0.045 + 3, z * 0.045 - 7, 4);
      disp = (disp - 0.5) * 2;
      disp *= Math.min(1, Math.abs(x) * 0.55 + 0.25);
      const y = disp * 4.2;
      tpos.setY(i, y);
      const h = (disp + 1) * 0.5;
      const c = new THREE.Color().copy(cLow).lerp(cHigh, h);
      if (pathMask > 0) c.lerp(cPath, pathMask * 0.8);
      tcol[i * 3] = c.r; tcol[i * 3 + 1] = c.g; tcol[i * 3 + 2] = c.b;
    }
    tgeo.setAttribute('color', new THREE.BufferAttribute(tcol, 3));
    tgeo.computeVertexNormals();
    const tmat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, metalness: 0 });
    const terrain = new THREE.Mesh(tgeo, tmat);
    terrain.position.y = -0.4;
    scene.add(terrain);

    // ridges (background mountains, fogged for depth haze)
    scene.add(addRidge(0, 6, -70, 260, 30, 0x0a1220));
    scene.add(addRidge(-10, 8, -82, 300, 40, 0x0d1626));
    scene.add(addRidge(6, 10, -96, 340, 52, 0x101b2c));

    // architecture
    scene.add(addTorii(0, 0, 6, 8, 9, 0.55));
    scene.add(addTorii(0, 0, -6, 5.6, 6, 0.4));
    scene.add(addStairs(0, 0, -10, -20, 5, 3.5));
    scene.add(addTemple(0, 3.5, -26));
    scene.add(addShrine(0, 0, -52));

    // dry garden
    const gravel = new THREE.Mesh(
      new THREE.CircleGeometry(6, 40),
      new THREE.MeshStandardMaterial({ map: gravelTexture(), roughness: 1, color: 0x8a93a0 })
    );
    gravel.rotation.x = -Math.PI / 2;
    gravel.position.set(14, 0.02, -26);
    scene.add(gravel);
    const rockDefs = [[12, -24, 1.4], [16, -26, 2.0], [13.4, -29, 1.0], [15.5, -23, 0.8], [17.2, -28, 1.2]];
    for (const [rx, rz, rs] of rockDefs) scene.add(addRock(rx, rz, rs));

    // pines
    const pineDefs = [
      [-8, -30, 1.6], [7, -32, 1.3], [-5, -36, 2.0], [10, -38, 1.5], [-11, -40, 1.8],
      [4, -42, 1.2], [-6, -45, 2.2], [8, -47, 1.6], [-2, -48, 1.4], [11, -50, 1.1],
      [-13, -34, 1.4], [13, -30, 1.0], [-9, -52, 1.3], [5, -54, 1.5]
    ];
    for (const [px, pz, ps] of pineDefs) scene.add(addPine(px, pz, ps));

    // stone lanterns
    scene.add(addLantern(5.5, 0, -8, 1.0));
    scene.add(addLantern(-5.5, 0, -16, 0.9));
    scene.add(addLantern(6, 0, -30, 0.8));
    scene.add(addLantern(-6.5, 0, -38, 1.0));
    scene.add(addLantern(3.6, 0, -48, 1.0));
    scene.add(addLantern(-3.6, 0, -48, 1.0));

    // scattered rocks along path
    for (let i = 0; i < 14; i++) {
      const r = mulberry32(100 + i);
      scene.add(addRock((r() - 0.5) * 30, -2 - r() * 52, 0.3 + r() * 0.7));
    }

    // fog sprites
    for (let i = 0; i < 9; i++) {
      const r = mulberry32(200 + i);
      scene.add(addFogSprite((r() - 0.5) * 40, 1.1 + r() * 1.6, -4 - r() * 54, 16 + r() * 22, 0.05 + r() * 0.05));
    }

    // particles
    rain = buildRain(); scene.add(rain.obj);
    leaves = buildLeaves(); scene.add(leaves.obj);
    embers = buildEmbers(); scene.add(embers.obj);

    // post-processing
    composer = new THREE.EffectComposer(renderer);
    composer.addPass(new THREE.RenderPass(scene, camera));
    bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(1024, 1024), 0.55, 0.62, 0.78);
    composer.addPass(bloomPass);
    filmPass = new THREE.ShaderPass(THREE.FilmShader);
    filmPass.uniforms.nIntensity.value = 0.32;
    filmPass.uniforms.sIntensity.value = 0.06;
    filmPass.uniforms.grayscale.value = 0;
    composer.addPass(filmPass);
    vignettePass = new THREE.ShaderPass(THREE.VignetteShader);
    vignettePass.uniforms.offset.value = 1.05;
    vignettePass.uniforms.darkness.value = 1.35;
    composer.addPass(vignettePass);

    WORLD.onResize(container.clientWidth || window.innerWidth, container.clientHeight || window.innerHeight);
    WORLD.ready = true;
  };

  WORLD.onResize = function (w, h) {
    if (!renderer) return;
    renderer.setSize(w, h, false);
    if (composer) composer.setSize(w, h);
    if (bloomPass) bloomPass.resolution.set(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };

  WORLD.setEnv = function (env) {
    if (!scene) return;
    scene.fog.density = env.fog;
    scene.fog.color.set(env.fogColor);
    moonGroup.position.set(env.moonPos.x, env.moonPos.y, env.moonPos.z);
    moonGroup.scale.setScalar(env.moonScale);
    moonGlow.material.opacity = env.moonGlow;
    moonLight.intensity = env.moonLight;
    moonLight.position.copy(moonGroup.position);
    ambientLight.intensity = env.ambient;
    for (const l of lanternLights) l.light.intensity = env.lantern * 1.6;
    for (const m of shojiMats) m.emissiveIntensity = env.shoji * 1.2;
    if (rain) rain.obj.material.opacity = env.rain * 0.32;
    if (leaves) leaves.obj.material.opacity = env.leaves * 0.9;
    if (embers) embers.obj.material.opacity = env.embers * 0.95;
    if (filmPass) filmPass.uniforms.nIntensity.value = 0.28 + env.grain * 0.16;
  };

  WORLD.tick = function (dt, time) {
    if (!scene) return;
    dt = Math.min(dt, 0.1);

    // rain
    if (rain && rain.obj.material.opacity > 0.01) {
      const p = rain.pos;
      for (let i = 0; i < p.length / 6; i++) {
        let y = p[i * 6 + 1] - rain.speeds[i] * dt;
        if (y < -0.5) y = 20 + (hash2(i, 1) * 4);
        p[i * 6 + 1] = y;
        p[i * 6 + 4] = y - 0.9;
        p[i * 6 + 0] += Math.sin(time * 0.7 + i) * dt * 1.2;
        p[i * 6 + 3] = p[i * 6 + 0];
      }
      rain.obj.geometry.attributes.position.needsUpdate = true;
    }

    // leaves
    if (leaves && leaves.obj.material.opacity > 0.01) {
      const p = leaves.pos;
      for (let i = 0; i < leaves.data.length; i++) {
        const d = leaves.data[i];
        let y = p[i * 3 + 1] - d.speed * dt;
        if (y < -0.2) y = 16 + (hash2(i, 2) * 8);
        p[i * 3 + 1] = y;
        p[i * 3] = d.baseX + Math.sin(time * d.sway + d.phase) * 1.4;
        p[i * 3 + 2] = d.baseZ + Math.cos(time * d.sway * 0.8 + d.phase) * 1.4;
      }
      leaves.obj.geometry.attributes.position.needsUpdate = true;
    }

    // embers
    if (embers && embers.obj.material.opacity > 0.01) {
      const p = embers.pos;
      for (let i = 0; i < embers.data.length; i++) {
        const d = embers.data[i];
        let y = p[i * 3 + 1] + d.speed * dt;
        if (y > 9) y = 0.4 + (hash2(i, 3) * 1.5);
        p[i * 3 + 1] = y;
        p[i * 3] += Math.sin(time * d.sway + d.phase) * dt * 0.5;
        p[i * 3 + 2] += Math.cos(time * d.sway * 0.7 + d.phase) * dt * 0.5;
      }
      embers.obj.geometry.attributes.position.needsUpdate = true;
    }

    // subtle moon rotation
    if (moonMesh) moonMesh.rotation.y += dt * 0.008;
  };

  WORLD.render = function () {
    if (composer) composer.render();
  };

  // ----- still capture ---------------------------------------------------
  // Renders an alternate camera pose into an offscreen target using the
  // existing context, then reads it back into a 2D canvas. Avoids a second
  // WebGL context and does not need preserveDrawingBuffer on the main one.
  let capTarget = null, capCamera = null, capCanvas = null;
  WORLD.captureStill = function (pose, w, h) {
    if (!renderer) return null;
    if (!capTarget || capTarget.width !== w || capTarget.height !== h) {
      if (capTarget) capTarget.dispose();
      capTarget = new THREE.WebGLRenderTarget(w, h, {
        minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat
      });
      capCanvas = document.createElement('canvas');
      capCanvas.width = w; capCanvas.height = h;
    }
    if (!capCamera) capCamera = new THREE.PerspectiveCamera(55, w / h, 0.1, 500);
    capCamera.aspect = w / h;
    capCamera.fov = pose.fov || 55;
    capCamera.updateProjectionMatrix();
    capCamera.position.copy(pose.pos);
    capCamera.lookAt(pose.look);

    const prevTarget = renderer.getRenderTarget();
    renderer.setRenderTarget(capTarget);
    renderer.clear();
    renderer.render(scene, capCamera);
    renderer.setRenderTarget(prevTarget);

    const buf = new Uint8Array(w * h * 4);
    renderer.readRenderTargetPixels(capTarget, 0, 0, w, h, buf);

    const ctx = capCanvas.getContext('2d');
    const img = ctx.createImageData(w, h);
    // flip vertically: GL origin is bottom-left, canvas is top-left
    for (let y = 0; y < h; y++) {
      const src = (h - 1 - y) * w * 4;
      const dst = y * w * 4;
      for (let x = 0; x < w * 4; x++) img.data[dst + x] = buf[src + x];
    }
    ctx.putImageData(img, 0, 0);
    return capCanvas.toDataURL('image/jpeg', 0.86);
  };
  WORLD.disposeCapture = function () {
    if (capTarget) { capTarget.dispose(); capTarget = null; }
    capCamera = null; capCanvas = null;
  };

  WORLD.camera = function () { return camera; };
  WORLD.scene = function () { return scene; };
})();
