import { useEffect, useRef } from 'react';

// Cloudflare's published always-pass test key, used only in local development.
const TEST_SITE_KEY = '1x00000000000000000000AA';
export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || (import.meta.env.DEV ? TEST_SITE_KEY : '');

let scriptPromise;
const loadScript = () => {
  if (window.turnstile) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      s.async = true;
      s.defer = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('Turnstile failed to load'));
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
};

/** Invisible-by-default spam check. Calls onToken with a token, or '' when it expires. */
const Turnstile = ({ onToken, resetKey }) => {
  const box = useRef(null);
  const widget = useRef(null);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return undefined;
    let cancelled = false;
    loadScript().then(() => {
      if (cancelled || !box.current) return;
      widget.current = window.turnstile.render(box.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: 'dark',
        appearance: 'interaction-only',
        callback: (t) => onToken(t),
        'expired-callback': () => onToken(''),
        'error-callback': () => onToken('')
      });
    }).catch(() => onToken(''));
    return () => {
      cancelled = true;
      if (widget.current && window.turnstile) window.turnstile.remove(widget.current);
      widget.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  return <div ref={box} className="f13-turnstile" />;
};

export default Turnstile;
