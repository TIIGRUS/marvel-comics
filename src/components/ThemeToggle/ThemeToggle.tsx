import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './ThemeToggle.scss';

type ThemeValue = 'light' | 'dark' | 'auto';

const THEME_CYCLE: ThemeValue[] = ['light', 'dark', 'auto'];

const THEME_ICONS: Record<ThemeValue, string> = {
  light: '🌞',
  dark: '🌙',
  auto: '⚙️',
};

const THEME_LABELS: Record<ThemeValue, string> = {
  light: 'Light',
  dark: 'Dark',
  auto: 'Auto',
};

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    const currentIndex = THEME_CYCLE.indexOf(theme as ThemeValue);
    const nextIndex = (currentIndex + 1) % THEME_CYCLE.length;
    setTheme(THEME_CYCLE[nextIndex]);
  };

  const title = `Current theme: ${THEME_LABELS[theme as ThemeValue]}. Click to cycle.`;

  return (
    <button
      className="theme-toggle"
      onClick={handleToggle}
      title={title}
      aria-label={`Switch theme. Current: ${THEME_LABELS[theme as ThemeValue]}`}
    >
      <span className="theme-toggle__icon">
        {THEME_ICONS[theme as ThemeValue]}
      </span>
    </button>
  );
};
