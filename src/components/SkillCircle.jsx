import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import gsap from 'gsap';

export default function SkillCircle({
  icon,
  percent = 75,
  size = 120,
  color = '#FFCC00',
  label = 'Habilidad'
}) {
  const circleRef = useRef(null);
  const containerRef = useRef(null);
  const [triggered, setTriggered] = useState(false);

  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true); // evita repetir la animación
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [triggered]);

  useEffect(() => {
    if (triggered && circleRef.current) {
      gsap.fromTo(
        circleRef.current,
        { strokeDashoffset: circumference },
        {
          strokeDashoffset: circumference * (1 - percent / 100),
          duration: 1.2,
          ease: 'power2.out',
        }
      );
    }
  }, [triggered, circumference, percent]);

  return (
    <div ref={containerRef} className="flex flex-col items-center m-4">
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            ref={circleRef}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
          />
        </svg>
        <Icon
          icon={icon}
          width={size * 0.4}
          height={size * 0.4}
          className="absolute text-text"
        />
      </div>
      <span className="mt-2 text-sm text-text text-center font-bodySemiBold">{label}</span>
    </div>
  );
}
