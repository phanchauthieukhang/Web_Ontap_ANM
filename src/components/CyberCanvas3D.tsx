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
}

export const CyberCanvas3D: React.FC<CyberCanvas3DProps> = ({
  className = '',
  paused = false,
  topology = 'cryptography',
  feedbackState = 'idle',
  isMiniOrb = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const pointsMeshRef = useRef<THREE.Points | null>(null);
  const linesMeshRef = useRef<THREE.LineSegments | null>(null);
  const ringGroupRef = useRef<THREE.Group | null>(null);
  const coreMeshRef = useRef<THREE.Mesh | null>(null);

  // Store coordinate targets for morphing
  const NODE_COUNT = 140;
  const currentPositions = useRef<Float32Array>(new Float32Array(NODE_COUNT * 3));
  const targetPositions = useRef<Float32Array>(new Float32Array(NODE_COUNT * 3));

  // Generate topologies coordinates
  const generateTopologyCoordinates = (type: TopologyType) => {
    const coords = new Float32Array(NODE_COUNT * 3);

    if (type === 'governance') {
      // 3 concentric rings (Defense in Depth / Layered Security)
      const rings = [3.2, 5.2, 7.2];
      for (let i = 0; i < NODE_COUNT; i++) {
        const ringIdx = i % 3;
        const radius = rings[ringIdx];
        const theta = (Math.floor(i / 3) / (NODE_COUNT / 3)) * Math.PI * 2;
        // slight tilt on different rings
        const tilt = ringIdx * 0.4;
        coords[i * 3] = radius * Math.cos(theta);
        coords[i * 3 + 1] = radius * Math.sin(theta) * Math.cos(tilt);
        coords[i * 3 + 2] = radius * Math.sin(theta) * Math.sin(tilt);
      }
    } else if (type === 'cryptography') {
      // Icosahedron crystal lattice
      const phi = (1 + Math.sqrt(5)) / 2;
      const baseVertices: number[][] = [
        [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
        [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
        [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
      ];
      for (let i = 0; i < NODE_COUNT; i++) {
        const baseV = baseVertices[i % baseVertices.length];
        const scale = 3.6 + (Math.sin(i * 1.5) * 0.8);
        coords[i * 3] = baseV[0] * scale * 0.9;
        coords[i * 3 + 1] = baseV[1] * scale * 0.9;
        coords[i * 3 + 2] = baseV[2] * scale * 0.9;
      }
    } else {
      // threats: Radar Scanner dome & Distributed Mesh
      for (let i = 0; i < NODE_COUNT; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = 5.5 + Math.sin(i * 0.2) * 1.2;
        coords[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        coords[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6; // flattened dome
        coords[i * 3 + 2] = r * Math.cos(phi);
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
      isMiniOrb ? 45 : 60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = isMiniOrb ? 10 : 16;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const masterGroup = new THREE.Group();
    groupRef.current = masterGroup;
    scene.add(masterGroup);

    // Initial positions
    const initialCoords = generateTopologyCoordinates(topology);
    for (let i = 0; i < initialCoords.length; i++) {
      currentPositions.current[i] = initialCoords[i];
      targetPositions.current[i] = initialCoords[i];
    }

    // 2. Points Geometry
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(currentPositions.current, 3));

    const pointsMat = new THREE.PointsMaterial({
      color: 0x10b981,
      size: isMiniOrb ? 0.35 : 0.45,
      transparent: true,
      opacity: 0.85,
    });
    const pointsMesh = new THREE.Points(pointsGeo, pointsMat);
    pointsMeshRef.current = pointsMesh;
    masterGroup.add(pointsMesh);

    // 3. Connective Wireframe Lines
    const lineIndices: number[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      // Connect to next 2 adjacent nodes
      lineIndices.push(i, (i + 1) % NODE_COUNT);
      if (i % 2 === 0) {
        lineIndices.push(i, (i + 3) % NODE_COUNT);
      }
    }
    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute('position', new THREE.BufferAttribute(currentPositions.current, 3));
    linesGeo.setIndex(lineIndices);

    const linesMat = new THREE.LineBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.22,
    });
    const linesMesh = new THREE.LineSegments(linesGeo, linesMat);
    linesMeshRef.current = linesMesh;
    masterGroup.add(linesMesh);

    // 4. Glowing Internal Core
    const coreGeo = new THREE.SphereGeometry(isMiniOrb ? 0.8 : 1.4, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMeshRef.current = coreMesh;
    masterGroup.add(coreMesh);

    // 5. Parallax Mouse Tracker
    let mouseX = 0;
    let mouseY = 0;
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    if (!isMiniOrb) {
      window.addEventListener('pointermove', handlePointerMove);
    }

    // 6. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!paused && !prefersReducedMotion) {
        const delta = clock.getDelta();

        // Base continuous rotation
        masterGroup.rotation.y += delta * 0.25;
        masterGroup.rotation.x += delta * 0.12;

        // Mouse Parallax easing
        if (!isMiniOrb) {
          camera.position.x += (mouseX * 2.5 - camera.position.x) * 0.05;
          camera.position.y += (mouseY * 2.5 - camera.position.y) * 0.05;
          camera.lookAt(scene.position);
        }

        // Core pulse
        if (coreMeshRef.current) {
          const s = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.08;
          coreMeshRef.current.scale.set(s, s, s);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
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
      renderer.dispose();
    };
  }, [isMiniOrb]);

  // Morph topology when topology prop changes
  useEffect(() => {
    const newCoords = generateTopologyCoordinates(topology);
    const posAttr = pointsMeshRef.current?.geometry.getAttribute('position') as THREE.BufferAttribute;
    const linesAttr = linesMeshRef.current?.geometry.getAttribute('position') as THREE.BufferAttribute;

    if (!posAttr || !linesAttr) return;

    // Animate vertices interpolation using GSAP
    const morphTimeline = gsap.timeline();
    const progress = { value: 0 };

    const startPositions = new Float32Array(posAttr.array);

    morphTimeline.to(progress, {
      value: 1,
      duration: 0.85,
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

    // Color morphing
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

  // Reactive Pulse on Feedback State (Correct / Incorrect)
  useEffect(() => {
    if (!groupRef.current || feedbackState === 'idle') return;

    if (feedbackState === 'correct') {
      // Emerald expansion burst & speedup
      gsap.fromTo(
        groupRef.current.scale,
        { x: 1, y: 1, z: 1 },
        {
          x: 1.25,
          y: 1.25,
          z: 1.25,
          duration: 0.35,
          yoyo: true,
          repeat: 1,
          ease: 'power2.out',
        }
      );
      if (coreMeshRef.current) {
        (coreMeshRef.current.material as THREE.MeshBasicMaterial).color.setHex(0x10b981);
      }
    } else if (feedbackState === 'incorrect') {
      // Alert glitch shake
      gsap.to(groupRef.current.position, {
        x: '+=0.4',
        duration: 0.06,
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
