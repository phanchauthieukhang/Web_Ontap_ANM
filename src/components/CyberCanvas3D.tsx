import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CyberCanvas3DProps {
  className?: string;
  paused?: boolean;
}

export const CyberCanvas3D: React.FC<CyberCanvas3DProps> = ({ className = '', paused = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Setup Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Cryptographic Lattice Geometry: Icosahedron with Points and Lines
    const group = new THREE.Group();

    // 1. Central Wireframe Polyhedron
    const icoGeo = new THREE.IcosahedronGeometry(7, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x16a34a,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const icoMesh = new THREE.Mesh(icoGeo, wireMat);
    group.add(icoMesh);

    // 2. Nodes / Particles
    const posAttribute = icoGeo.getAttribute('position');
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = posAttribute.count;
    particleGeo.setAttribute('position', posAttribute);

    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.35,
      transparent: true,
      opacity: 0.8,
    });
    const pointsMesh = new THREE.Points(particleGeo, particleMat);
    group.add(pointsMesh);

    scene.add(group);

    // Animation Loop with Three.Timer logic
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!paused && !prefersReducedMotion) {
        const delta = clock.getDelta();
        group.rotation.x += delta * 0.15;
        group.rotation.y += delta * 0.22;
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
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      icoGeo.dispose();
      wireMat.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [paused]);

  return (
    <div 
      ref={mountRef} 
      className={`relative overflow-hidden pointer-events-none ${className}`} 
      aria-hidden="true"
    />
  );
};
