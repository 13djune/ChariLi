import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function WorkLink({ children, href = '#' }) {
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

    link.addEventListener('mouseenter', () => {
      tl.pause(0);
      tl.tweenTo('midway');
    });

    link.addEventListener('mouseleave', () => {
      tl.play();
    });

    return () => {
      link.removeEventListener('mouseenter', () => {});
      link.removeEventListener('mouseleave', () => {});
      tl.kill();
    };
  }, []);

  return (
    <a
      ref={linkRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-text font-heading relative inline-block font-bold text-[16px]"
    >
      <span className="text-text relative z-10">{children}</span>
      <span
        ref={underlineRef}
        className="text-text absolute bottom-0 left-0 h-[0.2em] w-0 bg-current"
      />
    </a>
  );
}
