import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function WorkLink({ children, href, className = '', onClick }) {
  const isInteractive = Boolean(href || onClick);

  return (
    <a
      href={href && href !== '#' ? href : undefined}
      onClick={onClick}
      target={href && href.startsWith('http') ? "_blank" : undefined}
      rel={href && href.startsWith('http') ? "noopener noreferrer" : undefined}
      role={isInteractive && !href ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      className={`work-link ${className}`}
    >
      <span className="work-link-text">
        {children}
      </span>
      <span
        className="work-link-underline"
      />
    </a>
  );
}
