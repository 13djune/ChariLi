import { useRef, useEffect } from 'react';

import { ASSETS } from '../constants/assets';

export default function PaintRevealHero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const offscreenCanvasRef = useRef(null); // Para guardar el progreso del spray

  const getCurrentBackgroundColor = () => {
    const root = document.documentElement;
    const computed = getComputedStyle(root);
    return computed.getPropertyValue('--bg-color').trim() || '#ffffff';
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    
    // Crear el offscreen canvas una sola vez
    if (!offscreenCanvasRef.current) {
        offscreenCanvasRef.current = document.createElement('canvas');
    }

    const paintCanvasBackground = () => {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      const offscreenCanvas = offscreenCanvasRef.current;
      const offscreenCtx = offscreenCanvas.getContext('2d');
      
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;

      // Si el tamaño ha cambiado o es la primera vez, redibujamos la base
      if (canvas.width !== width || canvas.height !== height) {
        // Guardar la imagen actual (la máscara de spray) si ya existía
        let existingData = null;
        if (canvas.width > 0 && canvas.height > 0) {
            existingData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        }

        canvas.width = width;
        canvas.height = height;
        offscreenCanvas.width = width;
        offscreenCanvas.height = height;

        // Pintar el fondo base
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = getCurrentBackgroundColor();
        ctx.fillRect(0, 0, width, height);
        
        offscreenCtx.fillStyle = getCurrentBackgroundColor();
        offscreenCtx.fillRect(0, 0, width, height);

        // Restaurar la máscara anterior (escalada de forma burda o centrada, pero evitamos perderlo todo)
        if (existingData) {
            // Esto restauraría la imagen cortada si se agranda, lo cual es aceptable para un efecto de spray
            offscreenCtx.putImageData(existingData, 0, 0);
            ctx.drawImage(offscreenCanvas, 0, 0);
        }
      } else {
        // Solo cambiamos el color de fondo pero mantenemos los huecos (spray)
        // Guardamos el estado actual (la máscara alfa)
        const currentData = ctx.getImageData(0, 0, width, height);
        
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = getCurrentBackgroundColor();
        ctx.fillRect(0, 0, width, height);

        // Restauramos el canal alfa del spray
        const newData = ctx.getImageData(0, 0, width, height);
        for (let i = 3; i < newData.data.length; i += 4) {
            newData.data[i] = currentData.data[i];
        }
        ctx.putImageData(newData, 0, 0);
      }
    };

    paintCanvasBackground();

    window.addEventListener('resize', paintCanvasBackground);

    const observer = new MutationObserver((mutations) => {
        // Evitar bucles infinitos por clases de framer-motion u otras cosas, 
        // comprobar si cambió 'dark' class en root
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'class') {
                paintCanvasBackground();
            }
        });
    });
    
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
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const rect = canvas.getBoundingClientRect();
    
    // Extract client coordinates whether it's a mouse event or a touch event
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    drawSprayAt(ctx, x, y, 70);
  };

  const drawSprayAt = (ctx, x, y, radius = 70) => {
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

  useEffect(() => {
    // Auto-spray animation for mobile
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    let animationFrameId;
    let progress = 0;
    
    // Delay slightly to ensure canvas is drawn
    const timeoutId = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      
      const width = canvas.width;
      const height = canvas.height;
      
      const animateSpray = () => {
        progress += 0.008; // speed of the spray
        if (progress > 1) {
          cancelAnimationFrame(animationFrameId);
          return;
        }
        
        // Zig-zag pattern
        // Sinusoidal X movement
        const x = width * 0.5 + Math.sin(progress * Math.PI * 6) * (width * 0.35);
        // Linear Y movement from top to bottom
        const y = height * 0.1 + (height * 0.8 * progress);
        
        drawSprayAt(ctx, x, y, 60);
        // Thicken the spray a bit for mobile
        drawSprayAt(ctx, x + 15, y, 50);
        drawSprayAt(ctx, x - 15, y, 50);

        animationFrameId = requestAnimationFrame(animateSpray);
      };
      
      animateSpray();
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);


  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100dvh] overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      style={{ cursor: `url(${ASSETS.Graffiti_cursor}) 10 10, auto` }}
      >
      {/* Imagen de fondo */}
      <img
        src={ASSETS.HERO}
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
