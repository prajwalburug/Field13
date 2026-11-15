import * as THREE from 'three';

/**
 * Hero scene: a slowly turning field of points on a sphere, a few orbit rings,
 * and brighter "agent" nodes with signal pulses travelling to the core.
 * Returns a cleanup function.
 */
export function mountHeroScene(container, { reducedMotion = false } = {}) {
  const width = () => container.clientWidth || 1;
  const height = () => container.clientHeight || 1;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width(), height());
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, width() / height(), 0.1, 100);
  camera.position.set(0, 0, 9);

  const root = new THREE.Group();
  root.rotation.x = 0.35;
  root.position.set(0.4, 1.05, 0);
  scene.add(root);

  // --- Point sphere (fibonacci distribution) with shimmer shader
  const COUNT = 2600;
  const RADIUS = 2.6;
  const positions = new Float32Array(COUNT * 3);
  const seeds = new Float32Array(COUNT);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < COUNT; i++) {
    const y = 1 - (i / (COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    positions[i * 3] = Math.cos(theta) * r * RADIUS;
    positions[i * 3 + 1] = y * RADIUS;
    positions[i * 3 + 2] = Math.sin(theta) * r * RADIUS;
    seeds[i] = Math.random();
  }
  const sphereGeo = new THREE.BufferGeometry();
  sphereGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  sphereGeo.setAttribute('seed', new THREE.BufferAttribute(seeds, 1));

  const pointMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: renderer.getPixelRatio() },
      uColorA: { value: new THREE.Color('#F4F6FA') },
      uColorB: { value: new THREE.Color('#8FA8FF') }
    },
    vertexShader: /* glsl */ `
      attribute float seed;
      uniform float uTime;
      uniform float uPixelRatio;
      varying float vAlpha;
      varying float vMix;
      void main() {
        vec3 p = position;
        float wave = sin(p.y * 2.2 + uTime * 0.9 + seed * 6.2831) * 0.045;
        p += normalize(p) * wave;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        float facing = smoothstep(-11.8, -6.6, mv.z);
        float twinkle = 0.55 + 0.45 * sin(uTime * 1.6 + seed * 40.0);
        vAlpha = (0.28 + 0.72 * facing) * twinkle;
        vMix = seed;
        gl_PointSize = (2.6 + seed * 2.8) * uPixelRatio * (8.0 / -mv.z);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      varying float vAlpha;
      varying float vMix;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d);
        vec3 col = mix(uColorA, uColorB, vMix);
        gl_FragColor = vec4(col, a * vAlpha);
      }
    `
  });
  root.add(new THREE.Points(sphereGeo, pointMat));

  // --- Orbit rings
  const ringMat = new THREE.LineBasicMaterial({ color: 0xc9d5ff, transparent: true, opacity: 0.16 });
  const rings = [];
  [[3.25, 0.2, 0.0], [3.6, -0.5, 0.8], [3.0, 1.1, -0.4]].forEach(([r, rx, rz]) => {
    const pts = [];
    for (let i = 0; i <= 160; i++) {
      const a = (i / 160) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r));
    }
    const ring = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), ringMat);
    ring.rotation.set(rx, 0, rz);
    root.add(ring);
    rings.push(ring);
  });

  // --- Agent nodes + spokes to the core, with travelling pulses
  const NODES = 9;
  const nodeGroup = new THREE.Group();
  root.add(nodeGroup);
  const nodeMat = new THREE.MeshBasicMaterial({ color: 0xe6ecff });
  const haloMat = new THREE.SpriteMaterial({
    map: makeGlowTexture(), color: 0x9db4ff, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
  });
  const spokeMat = new THREE.LineBasicMaterial({ color: 0x9db4ff, transparent: true, opacity: 0.22 });
  const pulseMat = new THREE.SpriteMaterial({
    map: haloMat.map, color: 0xf4f6fa, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
  });
  const pulses = [];
  for (let i = 0; i < NODES; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / NODES);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = 3.2 + (i % 3) * 0.25;
    const pos = new THREE.Vector3(
      Math.cos(theta) * Math.sin(phi) * r,
      Math.cos(phi) * r,
      Math.sin(theta) * Math.sin(phi) * r
    );
    const node = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 16), nodeMat);
    node.position.copy(pos);
    const halo = new THREE.Sprite(haloMat);
    halo.scale.setScalar(0.55);
    halo.position.copy(pos);
    nodeGroup.add(node, halo);

    const spoke = new THREE.Line(new THREE.BufferGeometry().setFromPoints([pos, new THREE.Vector3()]), spokeMat);
    nodeGroup.add(spoke);

    const pulse = new THREE.Sprite(pulseMat);
    pulse.scale.setScalar(0.22);
    nodeGroup.add(pulse);
    pulses.push({ sprite: pulse, from: pos, offset: Math.random(), speed: 0.18 + Math.random() * 0.12 });
  }

  // --- Core glow
  const core = new THREE.Sprite(new THREE.SpriteMaterial({
    map: haloMat.map, color: 0x5b7cff, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending
  }));
  core.scale.setScalar(4.2);
  root.add(core);

  // --- Interaction and loop
  const target = { x: 0, y: 0 };
  const onPointer = (e) => {
    const rect = container.getBoundingClientRect();
    target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 0.5;
    target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.3;
  };
  window.addEventListener('pointermove', onPointer, { passive: true });

  const onResize = () => {
    camera.aspect = width() / height();
    camera.updateProjectionMatrix();
    renderer.setSize(width(), height());
  };
  const ro = new ResizeObserver(onResize);
  ro.observe(container);

  let visible = true;
  const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0 });
  io.observe(container);

  const clock = new THREE.Clock();
  let raf = 0;
  const tmp = new THREE.Vector3();
  const frame = () => {
    raf = requestAnimationFrame(frame);
    if (!visible || document.hidden) return;
    const t = clock.getElapsedTime();
    pointMat.uniforms.uTime.value = t;
    root.rotation.y = t * 0.06;
    rings.forEach((r, i) => { r.rotation.y = t * (0.04 + i * 0.015) * (i % 2 ? -1 : 1); });
    pulses.forEach((p) => {
      const k = (t * p.speed + p.offset) % 1;
      tmp.copy(p.from).multiplyScalar(1 - k);
      p.sprite.position.copy(tmp);
      p.sprite.material.opacity = Math.sin(k * Math.PI);
    });
    camera.position.x += (target.x * 2 - camera.position.x) * 0.03;
    camera.position.y += (-target.y * 2 - camera.position.y) * 0.03;
    camera.lookAt(0, 0.4, 0);
    renderer.render(scene, camera);
  };

  if (reducedMotion) {
    pointMat.uniforms.uTime.value = 1.5;
    renderer.render(scene, camera);
  } else {
    frame();
  }

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('pointermove', onPointer);
    ro.disconnect();
    io.disconnect();
    scene.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) {
        if (o.material.map) o.material.map.dispose();
        o.material.dispose();
      }
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}

function makeGlowTexture() {
  const size = 128;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.25, 'rgba(255,255,255,0.45)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
