import React, { useState, useEffect } from "react";

export type ThemeValue = "light" | "dark" | "auto";
const classList = ["theme-light", "theme-dark", "theme-auto"];
const THEME_KEY = "theme";

interface UseThemeResult {
    theme: ThemeValue;
    toggleTheme: () => void;
    setTheme: React.Dispatch<React.SetStateAction<ThemeValue>>;
}

export const useTheme = (): UseThemeResult => {
    // Initialize state from localStorage or default to 'auto'
    const getSystemPreference = (): ThemeValue => {
        if (typeof window === 'undefined') return 'light';
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
    };

    const [theme, setTheme] = useState<ThemeValue>(() => {
        const storedTheme = localStorage.getItem(THEME_KEY) as ThemeValue | null;

        if (storedTheme) return storedTheme;

        // Check system preference (auto)
        return getSystemPreference();
    });

    useEffect(() => {
        const root = window.document.documentElement;

        // Function to apply the correct class based on theme selection
        const applyTheme = (currentTheme: ThemeValue) => {
            let resolvedTheme = currentTheme;

            // If 'auto', check system preference
            if (currentTheme === 'auto') {
                resolvedTheme = getSystemPreference();
            }

            root.classList.remove(...classList);
            root.classList.add(`theme-${resolvedTheme}`);
        };

        applyTheme(theme);
        localStorage.setItem(THEME_KEY, theme);

        // Listen for system preference changes if in 'auto' mode
        if (theme === 'auto') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = () => applyTheme('auto');

            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, [theme])

    const toggleTheme = () => {
        setTheme((prevTheme) => prevTheme === "light" ? "dark" : "light");
    }

    return { theme, toggleTheme, setTheme };
};