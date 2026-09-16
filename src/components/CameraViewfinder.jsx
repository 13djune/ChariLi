import React, { useEffect, useRef, useState } from 'react';

export default function CameraViewfinder() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
        if (!isActive) setIsActive(true);
      }
    };

    const handleMouseLeave = () => {
      setIsActive(false);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isActive]);

  const iso = Math.floor((mousePos.x / (typeof window !== 'undefined' ? window.innerWidth : 1000)) * 3200 + 100);
  const shutter = Math.floor((mousePos.y / (typeof window !== 'undefined' ? window.innerHeight : 1000)) * 1000 + 30);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-auto"
      style={{ cursor: 'crosshair' }}
    >
      {/* Vignette */}
      <div className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-300" style={{ opacity: isActive ? 0.2 : 0 }} />
      
      {/* Corner guides */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-primary opacity-50 pointer-events-none" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-primary opacity-50 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-primary opacity-50 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-primary opacity-50 pointer-events-none" />

      {/* Crosshair following mouse */}
      <div 
        className="absolute pointer-events-none transition-opacity duration-200"
        style={{ 
          left: mousePos.x, 
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
          opacity: isActive ? 1 : 0
        }}
      >
        <div className="w-12 h-12 border border-primary rounded-sm opacity-70 relative flex items-center justify-center">
          <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
          <div className="absolute top-1/2 -left-2 w-1.5 h-[1px] bg-primary" />
          <div className="absolute top-1/2 -right-2 w-1.5 h-[1px] bg-primary" />
          <div className="absolute -top-2 left-1/2 w-[1px] h-1.5 bg-primary" />
          <div className="absolute -bottom-2 left-1/2 w-[1px] h-1.5 bg-primary" />
        </div>
      </div>

      {/* Dynamic Camera Data */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-6 font-mono text-xs md:text-sm text-primary opacity-70 pointer-events-none transition-opacity duration-300"
        style={{ opacity: isActive ? 0.7 : 0 }}
      >
        <span>ISO {iso}</span>
        <span>1/{shutter}</span>
        <span>F2.8</span>
        <span>REC</span>
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none flex opacity-10">
        <div className="w-1/3 h-full border-r border-primary" />
        <div className="w-1/3 h-full border-r border-primary" />
      </div>
      <div className="absolute inset-0 pointer-events-none flex flex-col opacity-10">
        <div className="h-1/3 w-full border-b border-primary" />
        <div className="h-1/3 w-full border-b border-primary" />
      </div>
    </div>
  );
}
