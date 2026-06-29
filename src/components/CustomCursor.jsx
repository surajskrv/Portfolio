import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if device supports hover/pointer (disable cursor on touch devices)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    let mouseX = 0;
    let mouseY = 0;
    let outerX = 0;
    let outerY = 0;
    let isMoving = false;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      setVisible(true);

      // Update inner dot immediately for zero latency
      if (innerRef.current) {
        innerRef.current.style.left = `${mouseX}px`;
        innerRef.current.style.top = `${mouseY}px`;
      }
      isMoving = true;
    };

    // Interpolate outer ring for smooth lagging follow effect
    const render = () => {
      if (isMoving && outerRef.current) {
        const ease = 0.15; // interpolation factor
        outerX += (mouseX - outerX) * ease;
        outerY += (mouseY - outerY) * ease;

        outerRef.current.style.left = `${outerX}px`;
        outerRef.current.style.top = `${outerY}px`;
      }
      requestAnimationFrame(render);
    };

    const onMouseOver = (e) => {
      // Find closest interactive element
      const target = e.target;
      const isInteractive = 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('input') || 
        target.closest('textarea') || 
        target.closest('select') || 
        target.closest('[role="button"]') ||
        target.closest('.interactive');

      if (isInteractive) {
        setHovered(true);
      }
    };

    const onMouseOut = (e) => {
      const target = e.target;
      const related = e.relatedTarget;
      
      // If we are leaving an interactive element and not entering another one
      const wasInteractive = 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('input') || 
        target.closest('textarea') || 
        target.closest('select') || 
        target.closest('[role="button"]') ||
        target.closest('.interactive');

      if (wasInteractive) {
        if (!related || !related.closest('a, button, input, textarea, select, [role="button"], .interactive')) {
          setHovered(false);
        }
      }
    };

    const onMouseLeaveWindow = () => {
      setVisible(false);
    };

    const onMouseEnterWindow = () => {
      setVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });
    document.addEventListener('mouseleave', onMouseLeaveWindow);
    document.addEventListener('mouseenter', onMouseEnterWindow);

    const animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
      document.removeEventListener('mouseenter', onMouseEnterWindow);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <div
        ref={outerRef}
        className={`custom-cursor ${hovered ? 'cursor-hovered' : ''} ${!visible ? 'cursor-hidden' : ''}`}
      />
      <div
        ref={innerRef}
        className={`custom-cursor-dot ${hovered ? 'cursor-hovered-dot' : ''} ${!visible ? 'cursor-hidden' : ''}`}
      />
    </>
  );
}
