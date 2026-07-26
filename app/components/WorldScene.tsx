"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type NetworkInformation = {
  saveData?: boolean;
};

const CYAN = new THREE.Color("#73f7ff");
const GREEN = new THREE.Color("#a8ff78");
const CORAL = new THREE.Color("#ff6f61");
const SAND = new THREE.Color("#ffd7a3");
const INK = new THREE.Color("#05070d");

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const x = clamp((value - edge0) / (edge1 - edge0));
  return x * x * (3 - 2 * x);
}

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function pointOnSphere(index: number, radius: number, jitter = 0) {
  const u = seededRandom(index * 2.17);
  const v = seededRandom(index * 7.91);
  const theta = Math.PI * 2 * u;
  const phi = Math.acos(2 * v - 1);
  const r = radius + (seededRandom(index * 4.37) - 0.5) * jitter;
  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

function makeArc(start: THREE.Vector3, end: THREE.Vector3, lift: number) {
  const middle = start
    .clone()
    .add(end)
    .multiplyScalar(0.5)
    .normalize()
    .multiplyScalar(2.25 + lift);
  const curve = new THREE.QuadraticBezierCurve3(start, middle, end);
  return new THREE.BufferGeometry().setFromPoints(curve.getPoints(48));
}

export function WorldScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const connection = (
      navigator as Navigator & { connection?: NetworkInformation }
    ).connection;
    const prefersReduced = motionQuery.matches;
    const lightweight = mobileQuery.matches || connection?.saveData === true;
    const modeFrame = window.requestAnimationFrame(() => {
      setReduced(prefersReduced);
    });

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: !lightweight,
        powerPreference: "high-performance",
      });
    } catch {
      const fallbackFrame = window.requestAnimationFrame(() => {
        setFallback(true);
      });
      return () => {
        window.cancelAnimationFrame(modeFrame);
        window.cancelAnimationFrame(fallbackFrame);
      };
    }

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, lightweight ? 1 : 1.5),
    );
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(INK, 0.055);

    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      80,
    );
    camera.position.set(0, 0.15, 7);

    const world = new THREE.Group();
    world.rotation.set(-0.12, -0.6, 0.02);
    scene.add(world);

    const coreMaterial = new THREE.MeshStandardMaterial({
      color: "#07111c",
      emissive: "#0c3e50",
      emissiveIntensity: 0.4,
      metalness: 0.65,
      roughness: 0.5,
      transparent: true,
      opacity: 0.88,
    });
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.82, lightweight ? 3 : 5),
      coreMaterial,
    );
    world.add(core);

    const wireMaterial = new THREE.MeshBasicMaterial({
      color: CYAN,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
    });
    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.91, lightweight ? 2 : 4),
      wireMaterial,
    );
    world.add(wire);

    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: CYAN,
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(2.15, 48, 48),
      atmosphereMaterial,
    );
    world.add(atmosphere);

    const particleCount = lightweight ? 640 : 1800;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      const position = pointOnSphere(index + 1, 2.02, 0.14);
      particlePositions[index * 3] = position.x;
      particlePositions[index * 3 + 1] = position.y;
      particlePositions[index * 3 + 2] = position.z;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );
    const particleMaterial = new THREE.PointsMaterial({
      color: CYAN,
      size: lightweight ? 0.026 : 0.018,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    world.add(particles);

    const arcs = new THREE.Group();
    const arcMaterials: THREE.LineBasicMaterial[] = [];
    for (let index = 0; index < (lightweight ? 8 : 18); index += 1) {
      const start = pointOnSphere(index * 9 + 20, 1.94);
      const end = pointOnSphere(index * 13 + 90, 1.94);
      const material = new THREE.LineBasicMaterial({
        color: index % 3 === 0 ? GREEN : CYAN,
        transparent: true,
        opacity: 0.2 + seededRandom(index) * 0.35,
        blending: THREE.AdditiveBlending,
      });
      const line = new THREE.Line(
        makeArc(start, end, 0.45 + seededRandom(index * 3) * 0.7),
        material,
      );
      arcMaterials.push(material);
      arcs.add(line);
    }
    world.add(arcs);

    const orbitalGroup = new THREE.Group();
    const ringMaterials: THREE.MeshBasicMaterial[] = [];
    for (let index = 0; index < 4; index += 1) {
      const material = new THREE.MeshBasicMaterial({
        color: index === 3 ? CORAL : CYAN,
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.38 + index * 0.26, 0.007, 6, 128),
        material,
      );
      ring.rotation.set(
        Math.PI * (0.14 + index * 0.19),
        Math.PI * (0.08 + index * 0.11),
        Math.PI * index * 0.13,
      );
      ringMaterials.push(material);
      orbitalGroup.add(ring);
    }
    world.add(orbitalGroup);

    const reservoirs = new THREE.Group();
    const reservoirMaterials: THREE.MeshBasicMaterial[] = [];
    [GREEN, CYAN, SAND].forEach((color, index) => {
      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const reservoir = new THREE.Mesh(
        new THREE.SphereGeometry(0.18 + index * 0.04, 24, 24),
        material,
      );
      reservoir.position.set(-1.05 + index * 1.05, -0.3 + index * 0.34, 2.05);
      reservoirMaterials.push(material);
      reservoirs.add(reservoir);
    });
    world.add(reservoirs);

    const humanMaterial = new THREE.MeshBasicMaterial({
      color: SAND,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const humanGeometry = new THREE.TetrahedronGeometry(0.034, 0);
    const humanNodes = new THREE.InstancedMesh(
      humanGeometry,
      humanMaterial,
      lightweight ? 72 : 180,
    );
    const dummy = new THREE.Object3D();
    for (let index = 0; index < humanNodes.count; index += 1) {
      const angle = (index / humanNodes.count) * Math.PI * 2;
      const lane = index % 6;
      const radius = 2.6 + lane * 0.08;
      dummy.position.set(
        Math.cos(angle) * radius,
        (seededRandom(index * 5) - 0.5) * 1.6,
        Math.sin(angle) * radius,
      );
      dummy.rotation.set(angle, angle * 0.3, 0);
      dummy.updateMatrix();
      humanNodes.setMatrixAt(index, dummy.matrix);
    }
    humanNodes.instanceMatrix.needsUpdate = true;
    world.add(humanNodes);

    const gridMaterial = new THREE.LineBasicMaterial({
      color: "#2fb8c6",
      transparent: true,
      opacity: 0.04,
      blending: THREE.AdditiveBlending,
    });
    const grid = new THREE.GridHelper(22, 44, "#2fb8c6", "#153342");
    const gridMaterials = Array.isArray(grid.material)
      ? grid.material
      : [grid.material];
    gridMaterials.forEach((material) => {
      material.transparent = true;
      material.opacity = 0.045;
      material.blending = THREE.AdditiveBlending;
    });
    grid.position.y = -3.2;
    scene.add(grid);
    gridMaterial.dispose();

    const ambient = new THREE.AmbientLight("#80c8d8", 0.55);
    const key = new THREE.PointLight("#71f7ff", 22, 18);
    key.position.set(3.5, 3.2, 4);
    const rim = new THREE.PointLight("#ff765f", 15, 16);
    rim.position.set(-4, -2, 2);
    scene.add(ambient, key, rim);

    let targetProgress = 0;
    let progress = 0;
    let pointerX = 0;
    let pointerY = 0;
    let active = true;
    let visible = !document.hidden;
    let animationFrame = 0;
    let readyFrame = 0;
    let readyScheduled = false;
    const timer = new THREE.Timer();
    timer.connect(document);

    const updateProgress = () => {
      const maximum = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      targetProgress = clamp(window.scrollY / maximum);
    };

    const updatePointer = (event: PointerEvent) => {
      if (prefersReduced || lightweight) return;
      pointerX = event.clientX / window.innerWidth - 0.5;
      pointerY = event.clientY / window.innerHeight - 0.5;
    };

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, width < 768 ? 1 : 1.5),
      );
      renderer.setSize(width, height, false);
    };

    const handleVisibility = () => {
      visible = !document.hidden;
      if (visible && active) {
        timer.reset();
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const narrative = document.querySelector(".home-narrative");
    const observer =
      narrative &&
      new IntersectionObserver(
        ([entry]) => {
          active = entry.isIntersecting;
          if (active && visible) {
            timer.reset();
            animationFrame = window.requestAnimationFrame(render);
          }
        },
        { rootMargin: "20% 0px 20% 0px" },
      );
    if (narrative && observer) observer.observe(narrative);

    function render(timestamp?: number) {
      if (!active || !visible) return;
      timer.update(timestamp);
      const delta = Math.min(timer.getDelta(), 0.05);
      const elapsed = timer.getElapsed();
      progress += (targetProgress - progress) * (prefersReduced ? 1 : 0.055);

      const people = smoothstep(0.18, 0.38, progress);
      const resources = smoothstep(0.34, 0.58, progress);
      const pressure = smoothstep(0.5, 0.73, progress);
      const human = smoothstep(0.69, 0.9, progress);
      const overview = smoothstep(0.88, 1, progress);

      const signalColor = CYAN.clone()
        .lerp(GREEN, resources * (1 - pressure))
        .lerp(CORAL, pressure * (1 - human))
        .lerp(SAND, human * (1 - overview))
        .lerp(CYAN, overview);

      if (!prefersReduced) {
        world.rotation.y += delta * (0.075 + progress * 0.08);
        particles.rotation.y -= delta * 0.035;
        orbitalGroup.rotation.z += delta * (0.02 + resources * 0.04);
        reservoirs.rotation.y -= delta * 0.12;
      }
      world.rotation.x = -0.12 + Math.sin(progress * Math.PI * 2) * 0.08;
      world.position.x =
        Math.sin(progress * Math.PI * 5) * 0.34 + pointerX * 0.18;
      world.position.y =
        Math.cos(progress * Math.PI * 3) * 0.16 - pointerY * 0.12;

      wireMaterial.color.copy(signalColor);
      atmosphereMaterial.color.copy(signalColor);
      particleMaterial.color.copy(signalColor);
      coreMaterial.emissive.copy(signalColor).multiplyScalar(0.18);
      key.color.copy(signalColor);
      rim.intensity = 8 + pressure * 24;

      wireMaterial.opacity = 0.18 + people * 0.24 + overview * 0.1;
      atmosphereMaterial.opacity = 0.055 + resources * 0.07 + pressure * 0.04;
      particleMaterial.opacity = 0.42 + people * 0.5;
      arcMaterials.forEach((material, index) => {
        material.opacity =
          0.08 +
          people * 0.26 +
          resources * (index % 3 === 0 ? 0.34 : 0.16) -
          human * 0.08;
      });
      ringMaterials.forEach((material, index) => {
        material.opacity =
          0.06 + resources * 0.15 + pressure * (index === 3 ? 0.32 : 0.04);
      });
      reservoirMaterials.forEach((material, index) => {
        material.opacity =
          resources * (0.38 + index * 0.1) * (1 - pressure * 0.55);
      });
      humanMaterial.opacity = human * 0.62;
      gridMaterials.forEach((material) => {
        material.opacity = 0.025 + resources * 0.055 + pressure * 0.04;
      });

      const pulse = 1 + Math.sin(elapsed * 1.8) * 0.018;
      atmosphere.scale.setScalar(pulse + pressure * 0.07);
      reservoirs.children.forEach((child, index) => {
        const reservoirPulse =
          1 + Math.sin(elapsed * (1.4 + index * 0.2) + index) * 0.18;
        child.scale.setScalar(reservoirPulse);
      });

      const zoomIn = smoothstep(0.58, 0.84, progress);
      const pullBack = smoothstep(0.88, 1, progress);
      camera.position.z = 7 - zoomIn * 2.15 + pullBack * 2.65;
      camera.position.x =
        Math.sin(progress * Math.PI * 2.3) * 0.72 + pointerX * 0.24;
      camera.position.y =
        0.15 + Math.cos(progress * Math.PI * 1.7) * 0.42 - pointerY * 0.18;
      camera.lookAt(world.position.x * 0.2, world.position.y * 0.15, 0);

      renderer.render(scene, camera);
      if (!readyScheduled) {
        readyScheduled = true;
        readyFrame = window.requestAnimationFrame(() => {
          setReady(true);
        });
      }
      animationFrame = window.requestAnimationFrame(render);
    }

    updateProgress();
    render();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.cancelAnimationFrame(modeFrame);
      window.cancelAnimationFrame(animationFrame);
      window.cancelAnimationFrame(readyFrame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      observer?.disconnect();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
          object.geometry?.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      particleGeometry.dispose();
      particleMaterial.dispose();
      humanGeometry.dispose();
      humanMaterial.dispose();
      timer.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className={`world-scene${fallback ? " is-fallback" : ready ? " is-ready" : " is-loading"}${reduced ? " is-reduced" : ""}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
      <div className="css-world">
        <i />
        <i />
        <i />
        <span />
      </div>
      <div className="scene-vignette" />
      <div className="scene-grid" />
      <div className="scene-readout">
        <span>SYSTEM / EARTH</span>
        <span>
          {fallback ? "HTML FALLBACK" : reduced ? "STABLE MODE" : "REALTIME 3D"}
        </span>
      </div>
    </div>
  );
}
