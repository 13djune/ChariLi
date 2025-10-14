import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function WorkLink({ children, href = '#', className = '' }) {
  const linkRef = useRef(null);
  const underlineRef = useRef(null);

  useEffect(() => {
    const link = linkRef.current;
    const underline = underlineRef.current;

    if (!link || !underline) return;

    const tl = gsap.timeline({ paused: true });

    tl.fromTo(
      underline,
      { width: '0%', left: '0%' },
      { width: '100%', duration: 0.6, ease: 'power2.out' }
    );

    tl.add('midway');

    tl.fromTo(
      underline,
      { width: '100%', left: '0%' },
      { width: '0%', left: '100%', duration: 0.6, ease: 'power2.in' }
    );

    const handleEnter = () => {
      tl.pause(0);
      tl.tweenTo('midway');
    };

    const handleLeave = () => {
      tl.play();
    };

    link.addEventListener('mouseenter', handleEnter);
    link.addEventListener('mouseleave', handleLeave);

    return () => {
      link.removeEventListener('mouseenter', handleEnter);
      link.removeEventListener('mouseleave', handleLeave);
      tl.kill();
    };
  }, []);

  return (
    <a
      ref={linkRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`cursor-pointer relative inline-block font-heading font-bold text-[16px] transition-colors duration-300 ${className}`}
    >
      <span className="relative z-10 transition-colors duration-300">{children}</span>
      <span
        ref={underlineRef}
        className="absolute bottom-0 left-0 h-[0.2em] w-0 bg-current transition-all duration-300"
      />
    </a>
  );
}
