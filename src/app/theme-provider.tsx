"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

export const themes = [
  { id: "tokyo-night", label: "Tokyo Night" },
  { id: "catppuccin", label: "Catppuccin" },
  { id: "dracula", label: "Dracula" },
  { id: "matrix", label: "Matrix" },
  { id: "nord", label: "Nord" },
  { id: "clean-light", label: "Clean Light" },
] as const;

export type Theme = (typeof themes)[number]["id"];

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "preferred-theme";
let currentTheme: Theme = "tokyo-night";
const listeners = new Set<() => void>();

function isTheme(value: string | null): value is Theme {
  return themes.some((theme) => theme.id === value);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return currentTheme;
}

function getServerSnapshot(): Theme {
  return "tokyo-night";
}

function applyTheme(theme: Theme) {
  currentTheme = theme;
  document.documentElement.dataset.theme = theme;
  listeners.forEach((listener) => listener());
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    try {
      const savedTheme = window.localStorage.getItem(STORAGE_KEY);
      if (isTheme(savedTheme)) applyTheme(savedTheme);
    } catch (error) {
      console.warn("Could not read the saved color theme.", error);
    }
  }, []);
  const setTheme = useCallback((nextTheme: Theme) => {
    applyTheme(nextTheme);

    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch (error) {
      console.warn("Could not save the selected color theme.", error);
    }
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider.");
  return context;
}
