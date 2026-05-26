import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type ThemeValue = 'light' | 'dark' | 'auto';
type EffectiveTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeValue;
  effectiveTheme: EffectiveTheme;
  setTheme: (theme: ThemeValue) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'theme';
const DATA_THEME_ATTRIBUTE = 'data-theme';

const getSystemPreference = (): EffectiveTheme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const getEffectiveTheme = (
  theme: ThemeValue,
  systemPreference: EffectiveTheme
): EffectiveTheme => {
  if (theme === 'auto') {
    return systemPreference;
  }
  return theme;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeValue>('auto');
  const [systemPreference, setSystemPreference] =
    useState<EffectiveTheme>('light');
  const [mounted, setMounted] = useState(false);

  // Read from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeValue | null;
    const initialTheme = savedTheme || 'auto';
    setThemeState(initialTheme);

    const initialSystemPreference = getSystemPreference();
    setSystemPreference(initialSystemPreference);

    setMounted(true);
  }, []);

  // Listen to system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setSystemPreference(e.matches ? 'dark' : 'light');
    };

    // Modern browsers support addEventListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }

    // Fallback for older browsers
    mediaQuery.addListener(handleChange);
    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, []);

  // Apply theme to HTML element and save to localStorage
  useEffect(() => {
    if (!mounted) return;

    const effectiveTheme = getEffectiveTheme(theme, systemPreference);

    document.documentElement.setAttribute(DATA_THEME_ATTRIBUTE, effectiveTheme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme, systemPreference, mounted]);

  const handleSetTheme = (newTheme: ThemeValue) => {
    setThemeState(newTheme);
  };

  const effectiveTheme = getEffectiveTheme(theme, systemPreference);

  const value: ThemeContextType = {
    theme,
    effectiveTheme,
    setTheme: handleSetTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
