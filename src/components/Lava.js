import React from 'react';

export default function Lava() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0c0414]">
      {/* SVG filter for the gooey effect */}
      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -12" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
          </filter>
        </defs>
      </svg>
      <div 
        className="w-full h-full absolute top-0 left-0"
        style={{ filter: 'url(#goo)' }}
      >
        <div className="lava-blob lava-blob-1 absolute bg-primary rounded-full mix-blend-screen w-[400px] h-[400px] blur-xl opacity-80" />
        <div className="lava-blob lava-blob-2 absolute bg-accent rounded-full mix-blend-screen w-[350px] h-[350px] blur-xl opacity-80" />
        <div className="lava-blob lava-blob-3 absolute bg-secondary rounded-full mix-blend-screen w-[450px] h-[450px] blur-xl opacity-80" />
        <div className="lava-blob lava-blob-4 absolute bg-primary rounded-full mix-blend-screen w-[300px] h-[300px] blur-xl opacity-70" />
      </div>
    </div>
  );
}
