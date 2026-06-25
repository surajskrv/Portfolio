import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Creates a GSAP context that auto-cleans on unmount.
 * Returns a ref to attach to the scoping container.
 */
export function useGsapContext(callback, deps = []) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      callback(containerRef.current);
    }, containerRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
}

/**
 * Scroll-triggered reveal animation.
 * Attach returned ref to the element you want to animate.
 * 
 * @param {Object} from - GSAP `from` properties (e.g. { opacity: 0, y: 30 })
 * @param {Object} config - Additional config: { trigger, start, delay, duration, ease, stagger }
 */
export function useScrollReveal(from = {}, config = {}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const {
      trigger,
      start = 'top 85%',
      delay = 0,
      duration = 0.7,
      ease = 'power3.out',
      stagger = 0,
      markers = false,
    } = config;

    const targets = stagger
      ? ref.current.children
      : ref.current;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        ...from,
        delay,
        duration,
        ease,
        stagger,
        scrollTrigger: {
          trigger: trigger || ref.current,
          start,
          once: true,
          markers,
        },
      });
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

/**
 * Smooth cursor-follow using gsap.quickTo.
 * Returns { containerRef, xTo, yTo, onMouseMove, onMouseLeave }
 */
export function useQuickTo(property = { x: '--mx', y: '--my' }, config = {}) {
  const containerRef = useRef(null);
  const xToRef = useRef(null);
  const yToRef = useRef(null);

  const { duration = 0.6, ease = 'power3.out' } = config;

  useEffect(() => {
    if (!containerRef.current) return;
    xToRef.current = gsap.quickTo(containerRef.current, property.x, { duration, ease });
    yToRef.current = gsap.quickTo(containerRef.current, property.y, { duration, ease });
  }, [property.x, property.y, duration, ease]);

  const onMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    xToRef.current?.(x);
    yToRef.current?.(y);
  }, []);

  const onMouseLeave = useCallback(() => {
    // Reset to center
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    xToRef.current?.(rect.width / 2);
    yToRef.current?.(rect.height / 2);
  }, []);

  return { containerRef, onMouseMove, onMouseLeave };
}

export { gsap, ScrollTrigger };
