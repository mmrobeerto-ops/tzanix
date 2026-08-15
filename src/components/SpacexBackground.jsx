import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SpacexBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Partículas orbitales cinematográficas
    const count = 900;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 40;
      positions[i + 1] = (Math.random() - 0.5) * 30;
      positions[i + 2] = (Math.random() - 0.5) * 35;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.05,
      transparent: true,
      opacity: 0.6
    });

    const starField = new THREE.Points(geometry, material);
    scene.add(starField);

    camera.position.z = 15;

    let animationFrameId;
    let scrollY = window.scrollY;

    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      starField.rotation.y += 0.0005;
      starField.rotation.x = scrollY * 0.0003;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      currentMount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-[100vw] h-[100vh] z-0 opacity-40 bg-cover bg-center"
        style={{ backgroundImage: "url('/nebula-bg.jpg')" }}
      />
      <div 
        ref={mountRef} 
        className="fixed top-0 left-0 w-[100vw] h-[100vh] z-0 pointer-events-none opacity-65"
      />
    </>
  );
};

export default SpacexBackground;
