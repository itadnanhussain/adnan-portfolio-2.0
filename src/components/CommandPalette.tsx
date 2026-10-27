"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useTheme, AVAILABLE_THEMES, ThemeId } from "./ThemeProvider";
import { Magnetic } from "./MagneticButton";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Actions" | "Themes" | "Social";
  icon: string;
  action: () => void;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: Props) {
  const [search, setSearch] = useState("");
  const [sel, setSel] = useState(0);
  const { setTheme, showToast, playClick, soundEnabled, toggleSound } =
    useTheme();
  const close = useCallback(() => {
    setSearch("");
    setSel(0);
    onClose();
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) close();
        else playClick();
      }
      if (e.key === "Escape" && isOpen) close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, playClick]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    return () => {
      document.body.style.overflow = "";
      window.__lenis?.start();
    };
  }, [isOpen]);

  const commands = useMemo((): CommandItem[] => {
    const jump = (id: string) => {
      close();
      playClick();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };
    const copy = async (text: string, msg: string) => {
      try {
        await navigator.clipboard.writeText(text);
        showToast(msg);
      } catch (error) {
        console.error("Could not copy command palette content.", error);
        showToast("Could not copy to clipboard. Please copy it manually.");
      }
      close();
      playClick();
    };
    return [
      {
        id: "nav-home",
        title: "Go to Home",
        category: "Navigation",
        icon: "🏠",
        action: () => jump("profile"),
      },
      {
        id: "nav-about",
        title: "Go to About Me",
        category: "Navigation",
        icon: "👤",
        action: () => jump("about"),
      },
      {
        id: "nav-exp",
        title: "Go to Experience & Skills",
        category: "Navigation",
        icon: "⚡",
        action: () => jump("experience"),
      },
      {
        id: "nav-proj",
        title: "Go to Projects",
        category: "Navigation",
        icon: "🚀",
        action: () => jump("projects"),
      },
      {
        id: "nav-blog",
        title: "Go to Engineering Journal",
        category: "Navigation",
        icon: "📝",
        action: () => jump("blog"),
      },
      {
        id: "nav-contact",
        title: "Go to Contact",
        category: "Navigation",
        icon: "📬",
        action: () => jump("contact"),
      },
      {
        id: "act-email",
        title: "Copy Email (itadnanhussain@gmail.com)",
        category: "Actions",
        icon: "📧",
        action: () =>
          copy("itadnanhussain@gmail.com", "Copied email to clipboard!"),
      },
      {
        id: "act-phone",
        title: "Copy Phone (+8801624640886)",
        category: "Actions",
        icon: "📞",
        action: () => copy("+8801624640886", "Copied phone number!"),
      },
      {
        id: "act-sound",
        title: soundEnabled ? "Disable Click Audio" : "Enable Click Audio",
        category: "Actions",
        icon: soundEnabled ? "🔊" : "🔇",
        action: () => {
          toggleSound();
          showToast(soundEnabled ? "Audio off" : "Audio on!");
          close();
        },
      },
      ...AVAILABLE_THEMES.map((t) => ({
        id: `theme-${t.id}`,
        title: `Switch Theme to ${t.name}`,
        category: "Themes" as const,
        icon: "🎨",
        action: () => {
          setTheme(t.id as ThemeId);
          showToast(`Theme: ${t.name}`);
          close();
          playClick();
        },
      })),
      {
        id: "soc-github",
        title: "Open GitHub Profile",
        category: "Social",
        icon: "🐙",
        action: () => {
          window.open(
            "https://github.com/itadnanhussain",
            "_blank",
            "noopener,noreferrer",
          );
          close();
        },
      },
      {
        id: "soc-linkedin",
        title: "Open LinkedIn Profile",
        category: "Social",
        icon: "💼",
        action: () => {
          window.open(
            "https://www.linkedin.com/in/itadnanhussain/",
            "_blank",
            "noopener,noreferrer",
          );
          close();
        },
      },
      {
        id: "soc-ent",
        title: "Open Adnan Enterprise",
        category: "Social",
        icon: "🏢",
        action: () => {
          window.open(
            "https://adnan-enterprise.vercel.app/",
            "_blank",
            "noopener,noreferrer",
          );
          close();
        },
      },
    ];
  }, [close, playClick, showToast, soundEnabled, toggleSound, setTheme]);

  const filtered = useMemo(() => {
    if (!search.trim()) return commands;
    const q = search.toLowerCase();
    return commands.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q),
    );
  }, [commands, search]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSel((p) => (p + 1) % filtered.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSel((p) => (p - 1 + filtered.length) % filtered.length);
      }
      if (e.key === "Enter" && filtered[sel]) {
        e.preventDefault();
        filtered[sel].action();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, filtered, sel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex justify-center items-start pt-16 sm:pt-28 p-3 sm:p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)" }}
      onClick={close}
    >
      <div
        className="w-full max-w-xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        style={{
          background: "var(--bg-card)",
          borderColor: "var(--border-color)",
          color: "var(--text-primary)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 border-b"
          style={{ borderColor: "var(--border-color)" }}
        >
          <span className="text-lg">🔍</span>
          <input
            type="text"
            autoFocus
            placeholder="Type a command or search…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSel(0);
            }}
            className="w-full bg-transparent outline-none text-sm sm:text-base font-medium"
            style={{ color: "var(--text-primary)" }}
          />
          <Magnetic strength={0.3}>
            <button
              onClick={close}
              className="px-2 py-1 rounded-lg text-xs font-mono cursor-pointer"
              style={{
                background:
                  "color-mix(in srgb,var(--text-primary) 10%,transparent)",
                color: "var(--text-muted)",
              }}
            >
              ESC
            </button>
          </Magnetic>
        </div>

        <div
          className="overflow-y-auto p-2 space-y-1"
          style={{ scrollbarWidth: "none" }}
        >
          {filtered.length === 0 ? (
            <div
              className="p-8 text-center text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              No matching commands found.
            </div>
          ) : (
            filtered.map((cmd, i) => (
              <div
                key={cmd.id}
                onClick={cmd.action}
                onMouseEnter={() => setSel(i)}
                className="flex items-center justify-between px-3 sm:px-4 py-2.5 rounded-2xl cursor-pointer text-sm transition-all gap-2"
                style={{
                  background:
                    i === sel
                      ? "color-mix(in srgb,var(--accent-primary) 10%,transparent)"
                      : "transparent",
                  color:
                    i === sel ? "var(--text-primary)" : "var(--text-secondary)",
                }}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-base shrink-0">{cmd.icon}</span>
                  <span className="truncate text-xs sm:text-sm">
                    {cmd.title}
                  </span>
                </div>
                <span
                  className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full shrink-0"
                  style={{
                    background:
                      "color-mix(in srgb,var(--text-primary) 5%,transparent)",
                    color: "var(--text-muted)",
                  }}
                >
                  {cmd.category}
                </span>
              </div>
            ))
          )}
        </div>

        <div
          className="px-4 sm:px-5 py-2.5 border-t flex items-center justify-between text-[10px] sm:text-[11px] font-mono"
          style={{
            borderColor: "var(--border-color)",
            color: "var(--text-muted)",
            background: "color-mix(in srgb,var(--text-primary) 2%,transparent)",
          }}
        >
          <span className="hidden sm:inline">
            Use ↑ ↓ to navigate, ↵ to select
          </span>
          <span className="sm:hidden">Tap any command to run</span>
          <span className="hidden sm:inline">⌘K to toggle</span>
          <button
            onClick={close}
            className="sm:hidden text-xs cursor-pointer"
            style={{ color: "var(--text-muted)" }}
          >
            Close ✕
          </button>
        </div>
      </div>
    </div>
  );
}
