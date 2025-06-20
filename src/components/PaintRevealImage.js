import { useRef, useEffect } from 'react';
import Hero_0 from '../assets/img/HERO.jpg';
import cursorGraffiti from '../assets/img/Graffiti_cursor.png';

export default function PaintRevealHero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const getCurrentBackgroundColor = () => {
    const root = document.documentElement;
    const computed = getComputedStyle(root);
    return computed.getPropertyValue('--bg-color').trim() || '#ffffff';
  };

  useEffect(() => {
    const paintCanvasBackground = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;

      canvas.width = width;
      canvas.height = height;

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = getCurrentBackgroundColor();
      ctx.fillRect(0, 0, width, height);
    };

    paintCanvasBackground();

    window.addEventListener('resize', paintCanvasBackground);

    const observer = new MutationObserver(paintCanvasBackground);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      window.removeEventListener('resize', paintCanvasBackground);
      observer.disconnect();
    };
  }, []);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const radius = 70;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, 'rgba(0,0,0,1)');
    gradient.addColorStop(0.4, 'rgba(0,0,0,0.4)');
    gradient.addColorStop(0.7, 'rgba(0,0,0,0.1)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
      style={{ cursor: `url(${cursorGraffiti}), auto` }}
      >
      {/* Imagen de fondo */}
      <img
        src={Hero_0}
        alt="Hero background"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Capa semitransparente para contraste */}
      <div className="absolute top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.4)] dark:bg-[rgba(0,0,0,0.4)] z-[1] pointer-events-none" />

      {/* Canvas encima */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-[2]"
      />
    </div>
  );
}
