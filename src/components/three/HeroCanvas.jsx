import { useEffect, useRef } from 'react';

const supportsWebGL = () => {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
};

/** Lazy-loads three.js so the hero text paints first. Falls back to the CSS glow. */
const HeroCanvas = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !supportsWebGL()) return undefined;
    let cleanup = () => {};
    let cancelled = false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    import('./heroScene').then(({ mountHeroScene }) => {
      if (cancelled || !ref.current) return;
      cleanup = mountHeroScene(ref.current, { reducedMotion });
      ref.current.classList.add('is-ready');
    });
    return () => { cancelled = true; cleanup(); };
  }, []);

  return <div className="hero-canvas" ref={ref} aria-hidden="true" />;
};

export default HeroCanvas;
