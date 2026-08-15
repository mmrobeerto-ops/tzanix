import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HologramBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const canvas = mountRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // We pass the canvas to renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 1. Malla Ondulante Holográfica (Representación Espectral de la Imagen)
    const planeGeometry = new THREE.PlaneGeometry(35, 35, 50, 50);
    const planeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    const terrain = new THREE.Mesh(planeGeometry, planeMaterial);
    terrain.rotation.x = -Math.PI / 2.3;
    terrain.position.y = -5;
    scene.add(terrain);

    // 2. Nube de Partículas de Señal Flotantes
    const particleCount = 700;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 40;
        positions[i + 1] = (Math.random() - 0.5) * 20;
        positions[i + 2] = (Math.random() - 0.5) * 30;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
        color: 0x00ffff,
        size: 0.08,
        transparent: true,
        opacity: 0.6
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    camera.position.z = 12;

    // Interacción con el Mouse
    let mouseX = 0, mouseY = 0;
    const handleMouseMove = (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    document.addEventListener('mousemove', handleMouseMove);

    // Bucle de Animación Cuántica
    let clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        // Ondulación Senoidal de la Malla (FFT Simulation)
        const pos = terrain.geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            const u = pos.getX(i);
            const v = pos.getY(i);
            const z = Math.sin(u * 0.4 + t * 1.5) * Math.cos(v * 0.4 + t * 1.5) * 1.2;
            pos.setZ(i, z);
        }
        terrain.geometry.attributes.position.needsUpdate = true;

        // Rotación suave con inercia del cursor
        camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 5 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        particles.rotation.y = t * 0.03;

        renderer.render(scene, camera);
    };

    animate();

    // Responsive Resize
    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animationFrameId);
        
        // Clean up WebGL contexts and geometries
        renderer.dispose();
        planeGeometry.dispose();
        planeMaterial.dispose();
        particleGeo.dispose();
        particleMat.dispose();
    };
  }, []);

  return (
    <canvas 
      ref={mountRef} 
      className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none"
    />
  );
};

export default HologramBackground;
