import { Moon, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const ThemeToggleButton = () => {
    const [darkMode, setDarkMode] = useState(() => {
        const theme = localStorage.getItem('theme');
        return theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });

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

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    return (
        <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors duration-200 border-2 dark:border-white border-zinc-400"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {darkMode ? (
                <Sun className="w-5 h-5 text-zinc-200" />
            ) : (
                <Moon className="w-5 h-5 text-zinc-400" />
            )}
        </button>
    );
};

export default ThemeToggleButton;