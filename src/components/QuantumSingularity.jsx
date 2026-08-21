import React, { useEffect, useRef } from 'react';

const QuantumSingularity = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let animationFrameId;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Configuración de la Singularidad
    const numChaosNodes = 600;
    const chaosNodes = [];
    const particles = [];
    const numParticles = 250;

    // Generar Nube de Caos a la Izquierda (0 a 50% de la pantalla)
    for (let i = 0; i < numChaosNodes; i++) {
      const isDirty = Math.random() > 0.85; // 15% de los datos son "hackers" o "sucios"
      chaosNodes.push({
        x: Math.random() * (width * 0.5),
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2.5, // Más velocidad
        vy: (Math.random() - 0.5) * 2.5,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.8 + 0.1,
        isDirty: isDirty,
        color: isDirty ? '#ff003c' : '#00f0ff', // Rojo peligro para sucio, cian puro normal
        // Puntos de control base para la curva Bézier
        baseCp1yOffset: (Math.random() - 0.5) * height * 0.6,
        baseCp2yOffset: (Math.random() - 0.5) * height * 0.6,
        // Factor de vibración eléctrica
        jitter: isDirty ? 40 : 15
      });
    }

    // Generar Partículas viajeras a súper alta velocidad
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        progress: Math.random(),
        speed: Math.random() * 0.02 + 0.008, // Aún más rápido (eléctrico)
        nodeIndex: Math.floor(Math.random() * numChaosNodes),
        size: Math.random() * 2 + 1
      });
    }

    const drawSingularity = () => {
      // Limpiar con un rastro corto para efecto de motion blur
      ctx.fillStyle = 'rgba(4, 6, 10, 0.25)';
      ctx.fillRect(0, 0, width, height);

      // Posición del núcleo (centrado en la pantalla)
      const coreX = width * 0.5;
      const coreY = height * 0.5;

      // 1. Dibujar Filamentos Orgánicos y Eléctricos del Caos
      ctx.lineWidth = 0.4;
      for (let i = 0; i < chaosNodes.length; i++) {
        const node = chaosNodes[i];
        
        // Mover nodos (entropía extrema)
        node.x += node.vx;
        node.y += node.vy;
        
        // Rebote en el área del caos (solo lado izquierdo)
        if (node.x < 0 || node.x > width * 0.45) node.vx *= -1;
        if (node.y < -100 || node.y > height + 100) node.vy *= -1;

        // Vibración eléctrica (Jitter) para las curvas
        const electricalJitter1 = (Math.random() - 0.5) * node.jitter;
        const electricalJitter2 = (Math.random() - 0.5) * node.jitter;

        const cp1x = node.x + (coreX - node.x) * 0.3;
        const cp1y = node.y + node.baseCp1yOffset + electricalJitter1;
        const cp2x = node.x + (coreX - node.x) * 0.7;
        const cp2y = coreY + node.baseCp2yOffset + electricalJitter2;

        // Dibujar curvas eléctricas (más visibles para los sucios)
        if (i % 3 === 0 || node.isDirty) {
          ctx.strokeStyle = node.isDirty ? `rgba(255, 0, 60, ${node.alpha * 0.4})` : `rgba(0, 240, 255, ${node.alpha * 0.15})`;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, coreX, coreY);
          ctx.stroke();
        }

        // Dibujar el punto del nodo (nube de caos)
        ctx.fillStyle = node.isDirty ? `rgba(255, 0, 60, ${node.alpha * 0.9})` : `rgba(0, 240, 255, ${node.alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Dibujar el Flujo Laminar Puro (Línea central intensa purificada)
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 20;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.9)';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(coreX, coreY);
      ctx.lineTo(width, coreY);
      ctx.stroke();
      
      // Láser central sobreexpuesto
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
      ctx.beginPath();
      ctx.moveTo(coreX, coreY);
      ctx.lineTo(width, coreY);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 3. Dibujar Partículas Fluyendo a Velocidad Extrema
      for (let p of particles) {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;

        let px, py;
        const node = chaosNodes[p.nodeIndex];

        if (p.progress < 0.7) {
          // Fase 1: Del caos al núcleo (70% del viaje)
          const t = p.progress / 0.7;
          
          // Vibración en tiempo real para las Partículas eléctricas
          const jitter1 = (Math.random() - 0.5) * node.jitter;
          const jitter2 = (Math.random() - 0.5) * node.jitter;

          const cp1x = node.x + (coreX - node.x) * 0.3;
          const cp1y = node.y + node.baseCp1yOffset + jitter1;
          const cp2x = node.x + (coreX - node.x) * 0.7;
          const cp2y = coreY + node.baseCp2yOffset + jitter2;
          
          // Interpolación Bézier
          const mt = 1 - t;
          px = mt*mt*mt*node.x + 3*mt*mt*t*cp1x + 3*mt*t*t*cp2x + t*t*t*coreX;
          py = mt*mt*mt*node.y + 3*mt*mt*t*cp1y + 3*mt*t*t*cp2y + t*t*t*coreY;
        } else {
          // Fase 2: Disparo lineal hacia la derecha (Purificadas)
          const t = (p.progress - 0.7) / 0.3;
          px = coreX + (width - coreX) * t;
          // Un haz muy estrecho y enfocado
          const beamSpread = (Math.random() - 0.5) * 2;
          py = coreY + beamSpread;
        }

        // Si está en Fase 1, hereda el color del nodo (rojo sucio o cian). En Fase 2 TODAS son purificadas (blancas)
        const isCorrupting = p.progress < 0.7 && node.isDirty;
        
        ctx.fillStyle = p.progress >= 0.7 ? '#ffffff' : (isCorrupting ? '#ff003c' : '#00f0ff');
        ctx.shadowColor = p.progress >= 0.7 ? '#00f0ff' : (isCorrupting ? '#ff003c' : 'transparent');
        ctx.shadowBlur = p.progress >= 0.7 ? 12 : (isCorrupting ? 8 : 0);
        
        ctx.beginPath();
        // Efecto motion blur agresivo en el disparo
        if (p.progress >= 0.7) {
          ctx.ellipse(px, py, p.size * 8, p.size * 0.3, 0, 0, Math.PI * 2);
        } else {
          // Chispa errática para los datos sucios
          const finalSize = isCorrupting ? p.size * (Math.random() * 1.5 + 0.5) : p.size;
          ctx.arc(px, py, finalSize, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 4. Dibujar el Núcleo Brillante (Más suave, menos luminosidad)
      const pulse = Math.sin(Date.now() * 0.015) * 6; // Pulso menos agresivo
      
      // Halo exterior reducido y más oscuro
      const gradient = ctx.createRadialGradient(coreX, coreY, 2, coreX, coreY, 45 + pulse);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.7)'); // Menos blanco puro
      gradient.addColorStop(0.1, 'rgba(0, 240, 255, 0.8)');
      gradient.addColorStop(0.3, 'rgba(0, 240, 255, 0.3)');
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(coreX, coreY, 50 + pulse, 0, Math.PI * 2);
      ctx.fill();

      // Relámpagos ocasionales más sutiles
      if (Math.random() > 0.94) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(coreX, coreY, 55 + pulse * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Centro más pequeño y menos sobreexpuesto
      ctx.fillStyle = 'rgba(220, 250, 255, 0.9)';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(coreX, coreY, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(drawSingularity);
    };

    drawSingularity();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={props.className || "w-full h-full block"}
    />
  );
};

export default QuantumSingularity;
