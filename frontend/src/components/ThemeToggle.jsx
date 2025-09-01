// ThemeToggle.js
import { useEffect, useState } from 'react';
<<<<<<< HEAD
import { SunMedium, Moon } from 'lucide-react'
=======
>>>>>>> e3def797fc9c3fde80c488c5233ca0597f5fbfa4

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
<<<<<<< HEAD
      className="p-2 rounded border-2 border-[var(--tri)]"
      onClick={() => setDarkMode(prev => !prev)}
      aria-label="Toggle Theme"
    >
      {darkMode ? <SunMedium className="w-5 h-5" color='white' /> : <Moon className="w-5 h-5"  /> }
    </button>

  );
}

=======
      className="px-4 py-2 bg-[var(--quad)] text-[var(--tri)] rounded"
      onClick={() => setDarkMode(prev => !prev)}
    >
      Toggle Theme
    </button>
  );
}

// [var(--color-quaternary)]
>>>>>>> e3def797fc9c3fde80c488c5233ca0597f5fbfa4
