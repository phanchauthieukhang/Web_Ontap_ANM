import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export type TopologyType = 'governance' | 'cryptography' | 'threats';

interface CyberCanvas3DProps {
  className?: string;
  paused?: boolean;
  topology?: TopologyType;
  feedbackState?: 'idle' | 'correct' | 'incorrect';
  isMiniOrb?: boolean;
  isGlobalStage?: boolean;
  sceneMode?: 'home' | 'quiz' | 'result';
}

export const CyberCanvas3D: React.FC<CyberCanvas3DProps> = ({
  className = '',
  paused = false,
  topology = 'cryptography',
  feedbackState = 'idle',
  isMiniOrb = false,
  isGlobalStage = false,
  sceneMode = 'home',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const pointsMeshRef = useRef<THREE.Points | null>(null);
  const linesMeshRef = useRef<THREE.LineSegments | null>(null);
  const coreMeshRef = useRef<THREE.Mesh | null>(null);
  const shockwaveMeshRef = useRef<THREE.Mesh | null>(null);
  const gyroRing1Ref = useRef<THREE.Mesh | null>(null);
  const gyroRing2Ref = useRef<THREE.Mesh | null>(null);

  const NODE_COUNT = 156;
  const currentPositions = useRef<Float32Array>(new Float32Array(NODE_COUNT * 3));
  const targetPositions = useRef<Float32Array>(new Float32Array(NODE_COUNT * 3));

  // Generate 3 distinct 3D mathematical topologies
  const generateTopologyCoordinates = (type: TopologyType) => {
    const coords = new Float32Array(NODE_COUNT * 3);

    if (type === 'governance') {
      // 3 concentric Defense-in-Depth rings (Layered Security Model)
      const rings = [3.4, 5.4, 7.5];
      for (let i = 0; i < NODE_COUNT; i++) {
        const ringIdx = i % 3;
        const radius = rings[ringIdx];
        const theta = (Math.floor(i / 3) / (NODE_COUNT / 3)) * Math.PI * 2;
        const tilt = (ringIdx - 1) * 0.52;
        coords[i * 3] = radius * Math.cos(theta);
        coords[i * 3 + 1] = radius * Math.sin(theta) * Math.cos(tilt);
        coords[i * 3 + 2] = radius * Math.sin(theta) * Math.sin(tilt);
      }
    } else if (type === 'cryptography') {
      // Icosahedron multi-shell crystal lattice
      const phi = (1 + Math.sqrt(5)) / 2;
      const baseVertices: number[][] = [
        [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
        [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
        [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
      ];
      for (let i = 0; i < NODE_COUNT; i++) {
        const baseV = baseVertices[i % baseVertices.length];
        const shell = (i % 3) * 0.85 + 2.9;
        const jitter = Math.sin(i * 1.7) * 0.45;
        coords[i * 3] = baseV[0] * shell + jitter;
        coords[i * 3 + 1] = baseV[1] * shell - jitter;
        coords[i * 3 + 2] = baseV[2] * shell + Math.cos(i) * 0.35;
      }
    } else {
      // threats: Radar Scanner Dome & Distributed Vector Mesh
      for (let i = 0; i < NODE_COUNT; i++) {
        const frac = i / NODE_COUNT;
        const theta = i * 2.39996; // Golden angle spiral
        const r = Math.sqrt(frac) * 7.6;
        const yArch = Math.cos(frac * Math.PI) * 3.2;
        coords[i * 3] = r * Math.cos(theta);
        coords[i * 3 + 1] = yArch;
        coords[i * 3 + 2] = r * Math.sin(theta);
      }
    }
    return coords;
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      isMiniOrb ? 45 : 58,
      Math.max(1, container.clientWidth) / Math.max(1, container.clientHeight),
      0.1,
      120
    );
    camera.position.set(0, isGlobalStage ? 0.5 : 0, isMiniOrb ? 10 : isGlobalStage ? 15.5 : 15);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const masterGroup = new THREE.Group();
    groupRef.current = masterGroup;
    scene.add(masterGroup);

    // Initial coordinates
    const initialCoords = generateTopologyCoordinates(topology);
    for (let i = 0; i < initialCoords.length; i++) {
      currentPositions.current[i] = initialCoords[i];
      targetPositions.current[i] = initialCoords[i];
    }

    // 2. Primary Morphing Nodes
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(currentPositions.current, 3));

    const pointsMat = new THREE.PointsMaterial({
      color: 0x10b981,
      size: isMiniOrb ? 0.35 : 0.48,
      transparent: true,
      opacity: isGlobalStage ? 0.92 : 0.95,
    });
    const pointsMesh = new THREE.Points(pointsGeo, pointsMat);
    pointsMeshRef.current = pointsMesh;
    masterGroup.add(pointsMesh);

    // 3. Connective Neural / Crypto Lattice Lines
    const lineIndices: number[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      lineIndices.push(i, (i + 1) % NODE_COUNT);
      if (i % 2 === 0) lineIndices.push(i, (i + 3) % NODE_COUNT);
      if (i % 5 === 0) lineIndices.push(i, (i + 12) % NODE_COUNT);
    }
    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute('position', new THREE.BufferAttribute(currentPositions.current, 3));
    linesGeo.setIndex(lineIndices);

    const linesMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: isGlobalStage ? 0.28 : 0.32,
    });
    const linesMesh = new THREE.LineSegments(linesGeo, linesMat);
    linesMeshRef.current = linesMesh;
    masterGroup.add(linesMesh);

    // 4. Glowing Quantum Core
    const coreGeo = new THREE.IcosahedronGeometry(isMiniOrb ? 0.85 : 1.75, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: isGlobalStage ? 0.42 : 0.48,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMeshRef.current = coreMesh;
    masterGroup.add(coreMesh);

    // 5. Outer 3D Gyroscope Orbital Rings & Shockwave Ring (for full / global stage)
    let gyroGeo1: THREE.TorusGeometry | null = null;
    let gyroMat1: THREE.MeshBasicMaterial | null = null;
    let gyroGeo2: THREE.TorusGeometry | null = null;
    let gyroMat2: THREE.MeshBasicMaterial | null = null;
    let shockGeo: THREE.RingGeometry | null = null;
    let shockMat: THREE.MeshBasicMaterial | null = null;
    let ambientGeo: THREE.BufferGeometry | null = null;
    let ambientMat: THREE.PointsMaterial | null = null;
    let ambientPoints: THREE.Points | null = null;
    let floorGrid: THREE.GridHelper | null = null;

    if (!isMiniOrb) {
      gyroGeo1 = new THREE.TorusGeometry(6.8, 0.03, 8, 90);
      gyroMat1 = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: isGlobalStage ? 0.32 : 0.35,
      });
      const ring1 = new THREE.Mesh(gyroGeo1, gyroMat1);
      ring1.rotation.x = Math.PI / 2.6;
      gyroRing1Ref.current = ring1;
      masterGroup.add(ring1);

      gyroGeo2 = new THREE.TorusGeometry(8.4, 0.025, 8, 90);
      gyroMat2 = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: isGlobalStage ? 0.24 : 0.28,
      });
      const ring2 = new THREE.Mesh(gyroGeo2, gyroMat2);
      ring2.rotation.y = Math.PI / 3.2;
      gyroRing2Ref.current = ring2;
      masterGroup.add(ring2);

      // 3D Shockwave Ring for Answer Feedback
      shockGeo = new THREE.RingGeometry(1.8, 2.35, 64);
      shockMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0,
      });
      const shockMesh = new THREE.Mesh(shockGeo, shockMat);
      shockwaveMeshRef.current = shockMesh;
      scene.add(shockMesh);
    }

    // 6. Global Spatial Stage Extras: Perspective Grid Floor & Volumetric Z-Space Particles
    if (isGlobalStage) {
      floorGrid = new THREE.GridHelper(64, 42, 0x10b981, 0x0f172a);
      floorGrid.position.y = -7.2;
      if (Array.isArray(floorGrid.material)) {
        floorGrid.material.forEach((m) => {
          m.transparent = true;
          m.opacity = 0.26;
        });
      } else {
        floorGrid.material.transparent = true;
        floorGrid.material.opacity = 0.26;
      }
      scene.add(floorGrid);

      // Deep Z-Space Ambient Particles
      const PARTICLE_COUNT = 260;
      const pCoords = new Float32Array(PARTICLE_COUNT * 3);
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pCoords[i * 3] = (Math.random() - 0.5) * 46;
        pCoords[i * 3 + 1] = (Math.random() - 0.5) * 28;
        pCoords[i * 3 + 2] = (Math.random() - 0.5) * 26 - 3;
      }
      ambientGeo = new THREE.BufferGeometry();
      ambientGeo.setAttribute('position', new THREE.BufferAttribute(pCoords, 3));
      ambientMat = new THREE.PointsMaterial({
        color: 0x38bdf8,
        size: 0.2,
        transparent: true,
        opacity: 0.52,
      });
      ambientPoints = new THREE.Points(ambientGeo, ambientMat);
      scene.add(ambientPoints);
    }

    // 7. Full-Viewport Mouse Parallax Tracker
    let mouseX = 0;
    let mouseY = 0;
    const handlePointerMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    if (!isMiniOrb) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
    }

    // 8. Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!paused && !prefersReducedMotion) {
        const delta = clock.getDelta();
        const elapsed = clock.getElapsedTime();

        masterGroup.rotation.y += delta * 0.22;
        masterGroup.rotation.x += delta * 0.09;

        if (gyroRing1Ref.current) {
          gyroRing1Ref.current.rotation.z += delta * 0.35;
        }
        if (gyroRing2Ref.current) {
          gyroRing2Ref.current.rotation.x -= delta * 0.25;
        }

        if (ambientPoints) {
          ambientPoints.rotation.y = elapsed * 0.03 + mouseX * 0.12;
          ambientPoints.rotation.x = mouseY * 0.08;
        }

        if (!isMiniOrb) {
          const targetCamX = mouseX * (isGlobalStage ? 2.8 : 2.2);
          const targetCamY =
            (sceneMode === 'result' ? 2.2 : sceneMode === 'quiz' ? 0.1 : 0.5) +
            mouseY * (isGlobalStage ? 1.8 : 1.5);
          camera.position.x += (targetCamX - camera.position.x) * 0.04;
          camera.position.y += (targetCamY - camera.position.y) * 0.04;
          camera.lookAt(0, 0, 0);
        }

        if (coreMeshRef.current) {
          const s = 1 + Math.sin(elapsed * 2.2) * 0.09;
          coreMeshRef.current.scale.set(s, s, s);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = Math.max(1, container.clientWidth) / Math.max(1, container.clientHeight);
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (!isMiniOrb) {
        window.removeEventListener('pointermove', handlePointerMove);
      }
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      pointsGeo.dispose();
      pointsMat.dispose();
      linesGeo.dispose();
      linesMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      gyroGeo1?.dispose();
      gyroMat1?.dispose();
      gyroGeo2?.dispose();
      gyroMat2?.dispose();
      shockGeo?.dispose();
      shockMat?.dispose();
      ambientGeo?.dispose();
      ambientMat?.dispose();
      renderer.dispose();
    };
  }, [isMiniOrb, isGlobalStage]);

  // Camera Dolly Fly-Through when switching pages (Home <-> Quiz <-> Result)
  useEffect(() => {
    if (!cameraRef.current || isMiniOrb) return;
    const targetZ =
      sceneMode === 'quiz'
        ? isGlobalStage
          ? 11.2
          : 13
        : sceneMode === 'result'
        ? 13.5
        : isGlobalStage
        ? 15.5
        : 15;

    gsap.to(cameraRef.current.position, {
      z: targetZ,
      duration: 1.15,
      ease: 'power3.inOut',
    });
  }, [sceneMode, isMiniOrb, isGlobalStage]);

  // Morph topology when topology prop changes
  useEffect(() => {
    const newCoords = generateTopologyCoordinates(topology);
    const posAttr = pointsMeshRef.current?.geometry.getAttribute('position') as THREE.BufferAttribute;
    const linesAttr = linesMeshRef.current?.geometry.getAttribute('position') as THREE.BufferAttribute;

    if (!posAttr || !linesAttr) return;

    const progress = { value: 0 };
    const startPositions = new Float32Array(posAttr.array);

    gsap.to(progress, {
      value: 1,
      duration: 0.9,
      ease: 'power3.inOut',
      onUpdate: () => {
        const p = progress.value;
        const currentArr = posAttr.array as Float32Array;
        for (let i = 0; i < currentArr.length; i++) {
          currentArr[i] = startPositions[i] + (newCoords[i] - startPositions[i]) * p;
        }
        posAttr.needsUpdate = true;
        linesAttr.needsUpdate = true;
      },
    });

    const targetPointsColor =
      topology === 'governance' ? 0x10b981 : topology === 'cryptography' ? 0x0ea5e9 : 0xf59e0b;
    const targetLineColor =
      topology === 'governance' ? 0x059669 : topology === 'cryptography' ? 0x6366f1 : 0xd97706;

    if (pointsMeshRef.current) {
      gsap.to((pointsMeshRef.current.material as THREE.PointsMaterial).color, {
        r: ((targetPointsColor >> 16) & 255) / 255,
        g: ((targetPointsColor >> 8) & 255) / 255,
        b: (targetPointsColor & 255) / 255,
        duration: 0.85,
      });
    }

    if (linesMeshRef.current) {
      gsap.to((linesMeshRef.current.material as THREE.LineBasicMaterial).color, {
        r: ((targetLineColor >> 16) & 255) / 255,
        g: ((targetLineColor >> 8) & 255) / 255,
        b: (targetLineColor & 255) / 255,
        duration: 0.85,
      });
    }
  }, [topology]);

  // Reactive 3D Shockwave & Pulse on Feedback State (Correct / Incorrect)
  useEffect(() => {
    if (!groupRef.current || feedbackState === 'idle') return;

    if (feedbackState === 'correct') {
      gsap.fromTo(
        groupRef.current.scale,
        { x: 1, y: 1, z: 1 },
        {
          x: 1.24,
          y: 1.24,
          z: 1.24,
          duration: 0.35,
          yoyo: true,
          repeat: 1,
          ease: 'power2.out',
        }
      );
      if (coreMeshRef.current) {
        (coreMeshRef.current.material as THREE.MeshBasicMaterial).color.setHex(0x10b981);
      }
      if (shockwaveMeshRef.current) {
        const mat = shockwaveMeshRef.current.material as THREE.MeshBasicMaterial;
        mat.color.setHex(0x10b981);
        gsap.fromTo(
          shockwaveMeshRef.current.scale,
          { x: 0.4, y: 0.4, z: 0.4 },
          { x: 4.5, y: 4.5, z: 4.5, duration: 0.9, ease: 'power2.out' }
        );
        gsap.fromTo(mat, { opacity: 0.75 }, { opacity: 0, duration: 0.9, ease: 'power2.out' });
      }
    } else if (feedbackState === 'incorrect') {
      gsap.to(groupRef.current.position, {
        x: '+=0.45',
        duration: 0.055,
        repeat: 5,
        yoyo: true,
        ease: 'power1.inOut',
        onComplete: () => {
          groupRef.current?.position.set(0, 0, 0);
        },
      });
      if (coreMeshRef.current) {
        (coreMeshRef.current.material as THREE.MeshBasicMaterial).color.setHex(0xf43f5e);
      }
      if (shockwaveMeshRef.current) {
        const mat = shockwaveMeshRef.current.material as THREE.MeshBasicMaterial;
        mat.color.setHex(0xf43f5e);
        gsap.fromTo(
          shockwaveMeshRef.current.scale,
          { x: 0.6, y: 0.6, z: 0.6 },
          { x: 3.6, y: 3.6, z: 3.6, duration: 0.7, ease: 'power2.out' }
        );
        gsap.fromTo(mat, { opacity: 0.65 }, { opacity: 0, duration: 0.7, ease: 'power2.out' });
      }
    }
  }, [feedbackState]);

  return (
    <div
      ref={mountRef}
      className={`relative overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    />
  );
};
