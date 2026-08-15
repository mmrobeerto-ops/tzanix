import React, { useEffect, useRef } from 'react';

const MathBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const equations = [
      'ΔxΔp ≥ ℏ/2', 'iℏ(∂Ψ/∂t) = HΨ', 'E = mc²', 
      '∇·D = ρ', '∇×E = -∂B/∂t', 'S = k log W',
      'e^(iπ) + 1 = 0', 'F = G(m1m2)/r²', 'λ = h/p'
    ];

    const particles = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        text: equations[Math.floor(Math.random() * equations.length)],
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = '16px "JetBrains Mono", monospace';
      
      particles.forEach(p => {
        ctx.fillStyle = `rgba(0, 240, 255, ${p.opacity})`;
        ctx.fillText(p.text, p.x, p.y);
        
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;
      });
      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full z-0 opacity-40 mix-blend-screen pointer-events-none"
    />
  );
};

export default MathBackground;
