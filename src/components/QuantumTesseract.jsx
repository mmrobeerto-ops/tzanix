import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ProceduralSnake = () => {
  const pointsRef = useRef();
  
  // 5000 Partículas para emular una densa nube de puntos (Point Cloud)
  const count = 5000;
  
  const { originalPositions, positions, phases } = useMemo(() => {
    const orig = new Float32Array(count * 3);
    const pos = new Float32Array(count * 3);
    const ph = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Parámetro 't' para distribuir puntos a lo largo de un espiral/nudo (-3PI a 3PI)
      const t = (i / count) * Math.PI * 6 - Math.PI * 3;
      
      // Grosor del cuerpo de la serpiente (grueso en el centro, afilado en las puntas)
      const bodyThickness = Math.sin((i / count) * Math.PI) * 0.4;
      
      // Posición aleatoria cilíndrica dentro del tubo para dar volumen a la serpiente
      const theta = Math.random() * Math.PI * 2;
      const r = Math.random() * bodyThickness;
      
      // Ecuación de la curva base (Serpiente enroscada)
      const x = Math.sin(t) * 2.5 + Math.cos(theta) * r;
      const z = Math.sin(t * 0.8) * 1.5 + Math.sin(theta) * r;
      const y = Math.cos(t * 1.2) * 1.5 + (Math.random() - 0.5) * 0.1;
      
      orig[i*3] = x;
      orig[i*3+1] = y;
      orig[i*3+2] = z;
      
      pos[i*3] = x;
      pos[i*3+1] = y;
      pos[i*3+2] = z;
      
      ph[i] = x; // Usaremos el eje X original como fase para la onda
    }
    return { originalPositions: orig, positions: pos, phases: ph };
  }, []);

  const { pointer } = useThree();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const positionsArray = pointsRef.current.geometry.attributes.position.array;
    
    // matemática de Ondulación Viva (Sine Wave en el eje Y)
    for (let i = 0; i < count; i++) {
      const baseY = originalPositions[i*3+1];
      const phase = phases[i];
      
      // y = y + sin(t * frecuencia + x * fase) * amplitud
      const undulation = Math.sin(time * 3.0 + phase * 2.0) * 0.2;
      
      positionsArray[i*3+1] = baseY + undulation;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotación suave continua ligada al tiempo
    pointsRef.current.rotation.y = time * 0.15;
    
    // Interactividad: El modelo reacciona sutilmente a la posición del mouse
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, (pointer.y * Math.PI) / 8, 0.05);
    pointsRef.current.rotation.z = THREE.MathUtils.lerp(pointsRef.current.rotation.z, (pointer.x * Math.PI) / 8, 0.05);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      {/* Shader Turquesa Neón con mezcla Holográfica (AdditiveBlending) */}
      <pointsMaterial
        size={0.035}
        color="#00f3ff"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default function QuantumTesseract() {
  return (
    <div className="w-full h-full absolute inset-0 z-10 pointer-events-auto cursor-crosshair">
      {/* La cámara apunta directo a la serpiente paramétrica */}
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ProceduralSnake />
      </Canvas>
    </div>
  );
}
