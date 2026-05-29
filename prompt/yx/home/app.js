(() => {

    // =========================================
    // 常量
    // =========================================
  
    const SIZE = 8;
    const CELL_SIZE = 1;
  
    const STORAGE_PREFIX = 'mini-world-save-';
  
    const COLORS = {
      grass: 0x7dbb5f,
      soil: 0xa87852,
      water: 0x5aa9e6,
      road: 0xc59b6d,
      stone: 0x9aa1a6,
    };
  
    const TOOLS = [
      { key: 'grass', label: '草地', emoji: '🌱' },
      { key: 'soil', label: '土壤', emoji: '🟫' },
      { key: 'water', label: '水', emoji: '💧' },
      { key: 'stone', label: '石地', emoji: '🪨' },
      { key: 'tree', label: '树', emoji: '🌲' },
      { key: 'house', label: '房子', emoji: '🏠' },
      { key: 'erase', label: '擦除', emoji: '🧽' },
    ];
  
    let currentTool = 'tree';
  
    // =========================================
    // DOM
    // =========================================
  
    const canvas = document.getElementById('webgl');
  
    const toolbar = document.getElementById('toolbar');
  
    const slotSelect = document.getElementById('slotSelect');
  
    const resetBtn = document.getElementById('resetBtn');
  
    const clearBtn = document.getElementById('clearBtn');
  
    const minimapCanvas = document.getElementById('minimap');
  
    const minimapCtx = minimapCanvas.getContext('2d');
  
    // =========================================
    // Three
    // =========================================
  
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
  
    renderer.setPixelRatio(window.devicePixelRatio);
  
    renderer.setSize(window.innerWidth, window.innerHeight);
  
    renderer.outputEncoding = THREE.sRGBEncoding;
  
    renderer.shadowMap.enabled = true;
  
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
    const scene = new THREE.Scene();
  
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
  
    // =========================================
    // 光照
    // =========================================
  
    scene.add(
      new THREE.AmbientLight(0xfff2dd, 0.9)
    );
  
    const sun = new THREE.DirectionalLight(0xfff0c2, 1.2);
  
    sun.position.set(6, 10, 5);
  
    sun.castShadow = true;
  
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
  
    sun.shadow.radius = 6;
  
    scene.add(sun);
  
    // =========================================
    // 世界数据
    // =========================================
  
    let world = [];
  
    let cellGroups = [];
  
    function createEmptyWorld() {
  
      world = [];
      cellGroups = [];
  
      for (let x = 0; x < SIZE; x++) {
  
        world[x] = [];
        cellGroups[x] = [];
  
        for (let z = 0; z < SIZE; z++) {
  
          world[x][z] = {
            terrain: 'grass',
            kind: null,
          };
  
        }
  
      }
  
    }
  
    // =========================================
    // Group
    // =========================================
  
    const worldGroup = new THREE.Group();
  
    scene.add(worldGroup);
  
    // =========================================
    // 材质
    // =========================================
  
    function createMaterial(color) {
  
      return new THREE.MeshStandardMaterial({
        color,
        roughness: 1,
        metalness: 0,
      });
  
    }
  
    // =========================================
    // Mesh Factory
    // =========================================
  
    function createTerrainMesh(type) {
  
      const geo = new THREE.BoxGeometry(
        1,
        0.2,
        1
      );
  
      const mesh = new THREE.Mesh(
        geo,
        createMaterial(COLORS[type])
      );
  
      mesh.receiveShadow = true;
  
      if (type === 'water') {
        mesh.position.y = -0.08;
      }
  
      return mesh;
  
    }
  
    function createTree() {
  
      const group = new THREE.Group();
  
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 0.4),
        createMaterial(0x7a5230)
      );
  
      trunk.position.y = 0.3;
  
      const leaf = new THREE.Mesh(
        new THREE.ConeGeometry(0.3, 0.7, 6),
        createMaterial(0x3f7d3b)
      );
  
      leaf.position.y = 0.8;
  
      group.add(trunk);
      group.add(leaf);
  
      group.traverse(m => {
        if (m.isMesh) {
          m.castShadow = true;
        }
      });
  
      return group;
  
    }
  
    function createHouse() {
  
      const group = new THREE.Group();
  
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 0.5, 0.7),
        createMaterial(0xf2e2c4)
      );
  
      body.position.y = 0.35;
  
      const roof = new THREE.Mesh(
        new THREE.ConeGeometry(0.55, 0.4, 4),
        createMaterial(0xd96b5f)
      );
  
      roof.rotation.y = Math.PI / 4;
  
      roof.position.y = 0.8;
  
      group.add(body);
      group.add(roof);
  
      group.traverse(m => {
        if (m.isMesh) {
          m.castShadow = true;
        }
      });
  
      return group;
  
    }
  
    function createRock() {
  
      const rock = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.25, 0),
        createMaterial(0x7f878d)
      );
  
      rock.scale.set(1, 0.7, 1.2);
  
      rock.position.y = 0.2;
  
      rock.castShadow = true;
  
      return rock;
  
    }
  
    // =========================================
    // Cell
    // =========================================
  
    function rebuildCell(x, z) {
  
      const old = cellGroups[x][z];
  
      if (old) {
        worldGroup.remove(old);
      }
  
      const data = world[x][z];
  
      const group = new THREE.Group();
  
      const terrain = createTerrainMesh(data.terrain);
  
      terrain.userData = { x, z };
  
      group.add(terrain);
  
      let object = null;
  
      if (data.kind === 'tree') {
        object = createTree();
      }
  
      if (data.kind === 'house') {
        object = createHouse();
      }
  
      if (data.kind === 'rock') {
        object = createRock();
      }
  
      if (object) {
        group.add(object);
      }
  
      group.position.set(
        x - SIZE / 2 + 0.5,
        0,
        z - SIZE / 2 + 0.5
      );
  
      worldGroup.add(group);
  
      cellGroups[x][z] = group;
  
    }
  
    function rebuildAll() {
  
      for (let x = 0; x < SIZE; x++) {
        for (let z = 0; z < SIZE; z++) {
          rebuildCell(x, z);
        }
      }
  
      drawMinimap();
  
    }
  
    // =========================================
    // setCell
    // =========================================
  
    function setCell(x, z, data) {
  
      world[x][z] = {
        ...world[x][z],
        ...data,
      };
  
      rebuildCell(x, z);
  
      saveWorld();
  
      drawMinimap();
  
    }
  
    // =========================================
    // Tool
    // =========================================
  
    function applyTool(x, z) {
  
      if (currentTool === 'grass') {
        setCell(x, z, {
          terrain: 'grass',
          kind: null,
        });
      }
  
      if (currentTool === 'soil') {
        setCell(x, z, {
          terrain: 'soil',
        });
      }
  
      if (currentTool === 'water') {
        setCell(x, z, {
          terrain: 'water',
          kind: null,
        });
      }
  
      if (currentTool === 'stone') {
        setCell(x, z, {
          terrain: 'stone',
          kind: 'rock',
        });
      }
  
      if (currentTool === 'tree') {
        setCell(x, z, {
          terrain: 'grass',
          kind: 'tree',
        });
      }
  
      if (currentTool === 'house') {
        setCell(x, z, {
          terrain: 'road',
          kind: 'house',
        });
      }
  
      if (currentTool === 'erase') {
        setCell(x, z, {
          terrain: 'grass',
          kind: null,
        });
      }
  
    }
  
    // =========================================
    // Toolbar
    // =========================================
  
    function initToolbar() {
  
      TOOLS.forEach(tool => {
  
        const div = document.createElement('div');
  
        div.className = 'tool';
  
        if (tool.key === currentTool) {
          div.classList.add('active');
        }
  
        div.innerHTML = `
          <div class="tool-emoji">${tool.emoji}</div>
          <div class="tool-label">${tool.label}</div>
        `;
  
        div.onclick = () => {
  
          currentTool = tool.key;
  
          document
            .querySelectorAll('.tool')
            .forEach(el => el.classList.remove('active'));
  
          div.classList.add('active');
  
        };
  
        toolbar.appendChild(div);
  
      });
  
    }
  
    // =========================================
    // Hover
    // =========================================
  
    const hover = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide,
      })
    );
  
    hover.rotation.x = -Math.PI / 2;
  
    hover.position.y = 0.11;
  
    scene.add(hover);
  
    // =========================================
    // Raycaster
    // =========================================
  
    const raycaster = new THREE.Raycaster();
  
    const mouse = new THREE.Vector2();
  
    let hovered = null;
  
    function updateRaycast(e) {
  
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  
      raycaster.setFromCamera(mouse, camera);
  
      const targets = [];
  
      worldGroup.children.forEach(group => {
        targets.push(group.children[0]);
      });
  
      const hits = raycaster.intersectObjects(targets);
  
      if (hits.length) {
  
        const hit = hits[0];
  
        hovered = hit.object.userData;
  
        hover.visible = true;
  
        hover.position.x = hit.object.parent.position.x;
  
        hover.position.z = hit.object.parent.position.z;
  
      } else {
  
        hovered = null;
  
        hover.visible = false;
  
      }
  
    }
  
    window.addEventListener('mousemove', updateRaycast);
  
    window.addEventListener('click', () => {
  
      if (!hovered) return;
  
      applyTool(
        hovered.x,
        hovered.z
      );
  
    });
  
    // =========================================
    // Camera
    // =========================================
  
    let rotX = 0.8;
  
    let rotY = 0.7;
  
    let distance = 10;
  
    let dragging = false;
  
    let lastX = 0;
  
    let lastY = 0;
  
    canvas.addEventListener('mousedown', e => {
  
      dragging = true;
  
      lastX = e.clientX;
      lastY = e.clientY;
  
    });
  
    window.addEventListener('mouseup', () => {
      dragging = false;
    });
  
    window.addEventListener('mousemove', e => {
  
      if (!dragging) return;
  
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
  
      rotY -= dx * 0.01;
  
      rotX -= dy * 0.01;
  
      rotX = Math.max(
        0.3,
        Math.min(1.3, rotX)
      );
  
      lastX = e.clientX;
      lastY = e.clientY;
  
    });
  
    window.addEventListener('wheel', e => {
  
      distance += e.deltaY * 0.01;
  
      distance = Math.max(
        5,
        Math.min(18, distance)
      );
  
    });
  
    function updateCamera() {
  
      camera.position.x =
        Math.sin(rotY) * Math.cos(rotX) * distance;
  
      camera.position.y =
        Math.sin(rotX) * distance;
  
      camera.position.z =
        Math.cos(rotY) * Math.cos(rotX) * distance;
  
      camera.lookAt(0, 0, 0);
  
    }
  
    // =========================================
    // Save
    // =========================================
  
    function saveWorld() {
  
      const key =
        STORAGE_PREFIX + slotSelect.value;
  
      localStorage.setItem(
        key,
        JSON.stringify(world)
      );
  
    }
  
    function loadWorld() {
  
      const key =
        STORAGE_PREFIX + slotSelect.value;
  
      const saved =
        localStorage.getItem(key);
  
      if (saved) {
  
        world = JSON.parse(saved);
  
      } else {
  
        createEmptyWorld();
  
        generateVillage();
  
      }
  
      rebuildAll();
  
    }
  
    slotSelect.addEventListener(
      'change',
      loadWorld
    );
  
    // =========================================
    // Random
    // =========================================
  
    function rand(min, max) {
  
      return Math.floor(
        Math.random() * (max - min + 1)
      ) + min;
  
    }
  
    function generateVillage() {
  
      createEmptyWorld();
  
      // 水塘
      for (let i = 0; i < 10; i++) {
  
        const x = rand(1, 3);
        const z = rand(1, 3);
  
        setCell(x, z, {
          terrain: 'water',
        });
  
      }
  
      // 石堆
      for (let i = 0; i < 6; i++) {
  
        const x = rand(0, 7);
        const z = rand(0, 7);
  
        setCell(x, z, {
          terrain: 'stone',
          kind: 'rock',
        });
  
      }
  
      const houses = [];
  
      // 房子
      for (let i = 0; i < 3; i++) {
  
        const x = rand(2, 6);
        const z = rand(2, 6);
  
        houses.push({ x, z });
  
        setCell(x, z, {
          terrain: 'road',
          kind: 'house',
        });
  
      }
  
      // 路
      for (let i = 0; i < houses.length - 1; i++) {
  
        const a = houses[i];
        const b = houses[i + 1];
  
        let x = a.x;
        let z = a.z;
  
        while (x !== b.x) {
  
          x += x < b.x ? 1 : -1;
  
          setCell(x, z, {
            terrain: 'road',
          });
  
        }
  
        while (z !== b.z) {
  
          z += z < b.z ? 1 : -1;
  
          setCell(x, z, {
            terrain: 'road',
          });
  
        }
  
      }
  
      // 树
      for (let i = 0; i < 12; i++) {
  
        const x = rand(0, 7);
        const z = rand(0, 7);
  
        if (!world[x][z].kind) {
  
          setCell(x, z, {
            kind: 'tree',
          });
  
        }
  
      }
  
      rebuildAll();
  
    }
  
    resetBtn.onclick = () => {
  
      generateVillage();
  
      saveWorld();
  
    };
  
    clearBtn.onclick = () => {
  
      createEmptyWorld();
  
      rebuildAll();
  
      saveWorld();
  
    };
  
    // =========================================
    // Minimap
    // =========================================
  
    function drawMinimap() {
  
      const size =
        minimapCanvas.width / SIZE;
  
      minimapCtx.clearRect(
        0,
        0,
        minimapCanvas.width,
        minimapCanvas.height
      );
  
      for (let x = 0; x < SIZE; x++) {
  
        for (let z = 0; z < SIZE; z++) {
  
          const cell = world[x][z];
  
          const map = {
            grass: '#7dbb5f',
            soil: '#a87852',
            water: '#5aa9e6',
            road: '#c59b6d',
            stone: '#9aa1a6',
          };
  
          minimapCtx.fillStyle =
            map[cell.terrain];
  
          minimapCtx.fillRect(
            x * size,
            z * size,
            size,
            size
          );
  
          if (cell.kind === 'tree') {
  
            minimapCtx.fillStyle = '#214d1f';
  
            minimapCtx.beginPath();
  
            minimapCtx.arc(
              x * size + size / 2,
              z * size + size / 2,
              4,
              0,
              Math.PI * 2
            );
  
            minimapCtx.fill();
  
          }
  
          if (cell.kind === 'house') {
  
            minimapCtx.fillStyle = '#7b3f34';
  
            minimapCtx.fillRect(
              x * size + 4,
              z * size + 4,
              size - 8,
              size - 8
            );
  
          }
  
        }
  
      }
  
    }
  
    // =========================================
    // Resize
    // =========================================
  
    window.addEventListener('resize', () => {
  
      camera.aspect =
        window.innerWidth / window.innerHeight;
  
      camera.updateProjectionMatrix();
  
      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );
  
    });
  
    // =========================================
    // Hint
    // =========================================
  
    setTimeout(() => {
  
      document
        .getElementById('hint')
        .classList.add('hide');
  
    }, 4000);
  
    // =========================================
    // Loop
    // =========================================
  
    function animate() {
  
      requestAnimationFrame(animate);
  
      updateCamera();
  
      renderer.render(scene, camera);
  
    }
  
    // =========================================
    // Start
    // =========================================
  
    initToolbar();
  
    loadWorld();
  
    animate();
  
  })();