import { useTheme, ThemeValue } from "../../hooks/useTheme";
import "./ThemeToggle.scss";

const THEME_ICONS: Record<ThemeValue, string> = {
  light: "🌞",
  dark: "🌙",
  auto: "⚙️",
};

const THEME_LABELS: Record<ThemeValue, string> = {
  light: "Light",
  dark: "Dark",
  auto: "Auto",
};

const THEMES: ThemeValue[] = ["light", "dark", "auto"];

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="theme-toggle" role="group" aria-label="Theme switcher">
      {THEMES.map((themeOption) => (
        <button
          key={themeOption}
          type="button"
          className={`theme-toggle__button ${theme === themeOption ? "theme-toggle__button_is-active" : ""}`}
          onClick={() => setTheme(themeOption)}
          aria-pressed={theme === themeOption}
          aria-label={`Switch to ${THEME_LABELS[themeOption]} theme`}
          title={THEME_LABELS[themeOption]}
          disabled={theme === themeOption}
        >
          {THEME_ICONS[themeOption]}
        </button>
      ))}
    </div>
  );
};
