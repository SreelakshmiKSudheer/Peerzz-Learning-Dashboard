// ThemeToggle.js
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <button
      className="px-4 py-2 bg-[var(--quad)] text-[var(--tri)] rounded"
      onClick={() => setDarkMode(prev => !prev)}
    >
      Toggle Theme
    </button>
  );
}

// [var(--color-quaternary)]