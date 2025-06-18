import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(Draggable, InertiaPlugin);

export default function MrPotato({ image, container }) {
  const ballRef = useRef(null);
  const propsRef = useRef(null);
  const trackerRef = useRef(null);
  const radiusRef = useRef(0);
  const friction = -0.5;

  useEffect(() => {
    const ball = ballRef.current;
    const boundsEl = container.current;
    if (!ball || !boundsEl) return;

    radiusRef.current = ball.getBoundingClientRect().width / 2;
    propsRef.current = gsap.getProperty(ball);
    trackerRef.current = InertiaPlugin.track(ball, 'x,y')[0];

    // Posicionar inicialmente en el centro del contenedor
    const rect = boundsEl.getBoundingClientRect();
    gsap.set(ball, {
      xPercent: -50,
      yPercent: -50,
      x: rect.width / 2,
      y: rect.height / 2,
    });

    const draggable = Draggable.create(ball, {
      bounds: boundsEl,
      inertia: true,
      onPress() {
        gsap.killTweensOf(ball);
        this.update();
      },
      onDragEnd: () => animateBounce(),
    })[0];

    function animateBounce(x = '+=0', y = '+=0', vx = 'auto', vy = 'auto') {
      gsap.fromTo(
        ball,
        { x, y },
        {
          inertia: { x: vx, y: vy },
          onUpdate: checkBounds,
          overwrite: true,
        }
      );
    }

    function checkBounds() {
      const get = propsRef.current;
      const tracker = trackerRef.current;
      const ball = ballRef.current;
      const bounds = container.current.getBoundingClientRect();
      const ballRect = ball.getBoundingClientRect();

      let x = get('x');
      let y = get('y');
      let vx = tracker.get('x');
      let vy = tracker.get('y');
      let newX = x;
      let newY = y;
      let hit = false;

      if (ballRect.right > bounds.right) {
        newX -= ballRect.right - bounds.right;
        vx *= friction;
        hit = true;
      }
      if (ballRect.left < bounds.left) {
        newX += bounds.left - ballRect.left;
        vx *= friction;
        hit = true;
      }
      if (ballRect.bottom > bounds.bottom) {
        newY -= ballRect.bottom - bounds.bottom;
        vy *= friction;
        hit = true;
      }
      if (ballRect.top < bounds.top) {
        newY += bounds.top - ballRect.top;
        vy *= friction;
        hit = true;
      }

      if (hit) {
        animateBounce(newX, newY, vx, vy);
      }
    }

    return () => draggable.kill();
  }, [container]);

  return (
    <img
      ref={ballRef}
      src={image}
      alt=""
      className="w-[125px] h-[125px] absolute top-0 left-0 cursor-move z-10"
      style={{ pointerEvents: 'auto' }}
    />
  );
}
