// ThemeToggle.js
import { useEffect, useState } from 'react';
import { SunMedium, Moon } from 'lucide-react'

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
      className="p-2 rounded border-2 border-[var(--tri)]"
      onClick={() => setDarkMode(prev => !prev)}
      aria-label="Toggle Theme"
    >
      {darkMode ? <SunMedium className="w-5 h-5" color='white' /> : <Moon className="w-5 h-5"  /> }
    </button>

  );
}

