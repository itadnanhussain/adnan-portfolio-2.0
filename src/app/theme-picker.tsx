"use client";

import { themes, useTheme } from "./theme-provider";

export default function ThemePicker() {
  const { theme, setTheme } = useTheme();

  return (
    <label className="theme-picker">
      <span className="theme-picker-dot" aria-hidden="true" />
      <span className="visually-hidden">Color theme</span>
      <select
        aria-label="Color theme"
        value={theme}
        onChange={(event) => {
          const selectedTheme = themes.find(
            (item) => item.id === event.target.value,
          );
          if (selectedTheme) setTheme(selectedTheme.id);
        }}
      >
        {themes.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}
