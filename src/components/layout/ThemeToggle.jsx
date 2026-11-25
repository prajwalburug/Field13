import { useState, useEffect } from 'react';

const readSaved = () => {
  try { return localStorage.getItem('f13-theme'); } catch { return null; }
};

const ThemeToggle = () => {
  // Brand is dark-first; light is an opt-in the visitor can keep.
  const [theme, setTheme] = useState(() => readSaved() || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('f13-theme', theme); } catch { /* storage blocked */ }
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
      {theme === 'dark' ? '☾' : '☀'}
    </button>
  );
};

export default ThemeToggle;
