import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const state = useRef({
    mouseX: 0,
    mouseY: 0,
    outerX: 0,
    outerY: 0,
    chasing: false,
    hovered: false,
    visible: false,
  });

  useEffect(() => {
    // Check if device supports hover/pointer (disable cursor on touch devices)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const s = state.current;
    let rafId = null;

    const setVisibility = (v) => {
      if (s.visible === v) return;
      s.visible = v;
      const cls = v ? 'remove' : 'add';
      outerRef.current?.classList[cls]('cursor-hidden');
      innerRef.current?.classList[cls]('cursor-hidden');
    };

    const setHoveredStyle = (h) => {
      if (s.hovered === h) return;
      s.hovered = h;
      if (h) {
        outerRef.current?.classList.add('cursor-hovered');
        innerRef.current?.classList.add('cursor-hovered-dot');
      } else {
        outerRef.current?.classList.remove('cursor-hovered');
        innerRef.current?.classList.remove('cursor-hovered-dot');
      }
    };

    // Chase loop — only runs when outer ring hasn't converged
    const chase = () => {
      const ease = 0.15;
      s.outerX += (s.mouseX - s.outerX) * ease;
      s.outerY += (s.mouseY - s.outerY) * ease;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${s.outerX - 12}px, ${s.outerY - 12}px, 0)`;
      }

      // Stop chasing once converged (< 0.5px difference)
      const dx = s.mouseX - s.outerX;
      const dy = s.mouseY - s.outerY;
      if (dx * dx + dy * dy > 0.25) {
        rafId = requestAnimationFrame(chase);
      } else {
        s.chasing = false;
        rafId = null;
      }
    };

    const startChase = () => {
      if (!s.chasing) {
        s.chasing = true;
        rafId = requestAnimationFrame(chase);
      }
    };

    const onMouseMove = (e) => {
      s.mouseX = e.clientX;
      s.mouseY = e.clientY;

      setVisibility(true);

      // Update inner dot immediately via GPU transform — zero latency
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${s.mouseX - 3}px, ${s.mouseY - 3}px, 0)`;
      }

      // Start outer ring chase if not already running
      startChase();
    };

    const onMouseOver = (e) => {
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
        setHoveredStyle(true);
      }
    };

    const onMouseOut = (e) => {
      const target = e.target;
      const related = e.relatedTarget;

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
          setHoveredStyle(false);
        }
      }
    };

    const onMouseLeaveWindow = () => setVisibility(false);
    const onMouseEnterWindow = () => setVisibility(true);
    const onWindowBlur = () => setVisibility(false);
    const onWindowFocus = () => setVisibility(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });
    document.addEventListener('mouseleave', onMouseLeaveWindow);
    document.addEventListener('mouseenter', onMouseEnterWindow);
    window.addEventListener('blur', onWindowBlur);
    window.addEventListener('focus', onWindowFocus);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
      document.removeEventListener('mouseenter', onMouseEnterWindow);
      window.removeEventListener('blur', onWindowBlur);
      window.removeEventListener('focus', onWindowFocus);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={outerRef}
        className="custom-cursor cursor-hidden"
      />
      <div
        ref={innerRef}
        className="custom-cursor-dot cursor-hidden"
      />
    </>
  );
}
