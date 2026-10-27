"use client";

import { memo, useState, useEffect } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useTheme, AVAILABLE_THEMES, ThemeId } from "./ThemeProvider";
import { Magnetic } from "./MagneticButton";
import { SearchIcon, VolumeIcon, VolumeMuteIcon } from "./Icons";
import CommandPalette from "./CommandPalette";

interface NavbarProps {
  menuOpen: boolean;
  toggleMenu: () => void;
}

const NAV_ITEMS = [
  {
    id: "profile",
    name: "Home",
    num: "01",
    desc: "Intro & Terminal",
    icon: "🏠",
  },
  {
    id: "about",
    name: "About",
    num: "02",
    desc: "Story & Background",
    icon: "👤",
  },
  {
    id: "experience",
    name: "Experience",
    num: "03",
    desc: "Skills & Tech Stack",
    icon: "⚡",
  },
  {
    id: "projects",
    name: "Projects",
    num: "04",
    desc: "Enterprise & Fashion App",
    icon: "🚀",
  },
  {
    id: "blog",
    name: "Journal",
    num: "05",
    desc: "Project Notes & Articles",
    icon: "📝",
  },
  {
    id: "contact",
    name: "Contact",
    num: "06",
    desc: "Availability & Connect",
    icon: "📬",
  },
];

const menuVars: Variants = {
  closed: { opacity: 0, scale: 0.95, y: -12, transition: { duration: 0.2 } },
  open: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 360,
      damping: 26,
      staggerChildren: 0.045,
      delayChildren: 0.05,
    },
  },
};
const itemVars: Variants = {
  closed: { opacity: 0, x: -14, filter: "blur(4px)" },
  open: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
      filter: { type: "tween", duration: 0.18 },
    },
  },
};

const Navbar = memo(function Navbar({ menuOpen, toggleMenu }: NavbarProps) {
  const { theme, setTheme, soundEnabled, toggleSound, playClick } = useTheme();
  const [themeOpen, setThemeOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined")
      setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent || ""));
  }, []);

  const cur =
    AVAILABLE_THEMES.find((t) => t.id === theme) || AVAILABLE_THEMES[0];

  return (
    <>
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />

      <header className="fixed top-3 sm:top-4 left-0 right-0 w-full z-[1000] px-4">
        <div
          className="max-w-6xl mx-auto backdrop-blur-xl border rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-300"
          style={{
            background: "color-mix(in srgb, var(--bg-card) 85%, transparent)",
            borderColor: "var(--border-color)",
          }}
        >
          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex justify-between items-center">
            <a
              href="#profile"
              onClick={playClick}
              className="logo-in inline-flex items-baseline gap-1 font-bold tracking-[-0.06em] text-[1.35rem] transition-transform hover:scale-[1.03]"
              style={{ color: "var(--text-primary)" }}
            >
              <span>adnan</span>
              <span
                className="text-xl"
                style={{ color: "var(--accent-primary)" }}
              >
                .
              </span>
              <span className="ml-1 font-mono text-[9px] font-medium tracking-[0.18em] text-[var(--text-muted)]">
                DEV
              </span>
            </a>

            <ul
              className="flex items-center gap-1 list-none p-1 rounded-full"
              style={{
                background:
                  "color-mix(in srgb, var(--text-primary) 5%, transparent)",
                border:
                  "1px solid color-mix(in srgb, var(--border-color) 50%, transparent)",
              }}
            >
              {NAV_ITEMS.map((item) => (
                <li key={item.id} className="nav-links">
                  <Magnetic strength={0.2}>
                    <a
                      href={`#${item.id}`}
                      onClick={playClick}
                      className="group relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span>{item.name}</span>
                      <span
                        className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: "var(--accent-primary)" }}
                      />
                    </a>
                  </Magnetic>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2.5">
              {/* Search / Command Palette */}
              <Magnetic strength={0.25}>
                <button
                  onClick={() => {
                    playClick();
                    setCmdOpen(true);
                  }}
                  className="group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono cursor-pointer transition-all"
                  style={{
                    border: "1px solid var(--border-color)",
                    background:
                      "color-mix(in srgb, var(--text-primary) 5%, transparent)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <SearchIcon className="w-3.5 h-3.5" />
                  <span className="hidden xl:inline font-sans font-medium">
                    Search
                  </span>
                  <kbd
                    className="inline-flex items-center gap-0.5 text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded-md"
                    style={{
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-muted)",
                    }}
                  >
                    <span>{isMac ? "⌘" : "Ctrl"}</span>
                    <span>K</span>
                  </kbd>
                </button>
              </Magnetic>

              {/* Theme Dropdown */}
              <div className="relative">
                <Magnetic strength={0.25}>
                  <button
                    onClick={() => {
                      playClick();
                      setThemeOpen((p) => !p);
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs cursor-pointer transition-all"
                    style={{
                      border: "1px solid var(--border-color)",
                      background:
                        "color-mix(in srgb, var(--text-primary) 5%, transparent)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full ring-2 ring-black/10 shrink-0"
                      style={{ background: cur.color }}
                    />
                    <span className="max-w-[85px] truncate font-sans font-medium">
                      {cur.name}
                    </span>
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${themeOpen ? "rotate-180" : ""}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                </Magnetic>
                {themeOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-48 rounded-2xl shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-color)",
                    }}
                    onClick={() => setThemeOpen(false)}
                  >
                    <div
                      className="text-[10px] font-mono uppercase tracking-wider px-3 py-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Select Theme
                    </div>
                    {AVAILABLE_THEMES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setTheme(t.id as ThemeId);
                          playClick();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left cursor-pointer"
                        style={{
                          background:
                            theme === t.id
                              ? "color-mix(in srgb, var(--accent-primary) 15%, transparent)"
                              : "transparent",
                          color:
                            theme === t.id
                              ? "var(--text-primary)"
                              : "var(--text-secondary)",
                        }}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ background: t.color }}
                        />
                        <span className="truncate">{t.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sound */}
              <Magnetic strength={0.3}>
                <button
                  onClick={() => {
                    toggleSound();
                    playClick();
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all"
                  style={{
                    border: "1px solid var(--border-color)",
                    background:
                      "color-mix(in srgb, var(--text-primary) 5%, transparent)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {soundEnabled ? (
                    <VolumeIcon
                      className="w-3.5 h-3.5"
                      style={{ color: "var(--accent-primary)" }}
                    />
                  ) : (
                    <VolumeMuteIcon className="w-3.5 h-3.5" />
                  )}
                </button>
              </Magnetic>
            </div>
          </nav>

          {/* ── Mobile Nav ── */}
          <nav className="relative flex items-center justify-between lg:hidden">
            <a
              href="#profile"
              onClick={playClick}
              className="inline-flex items-baseline gap-1 font-bold tracking-[-0.06em] text-xl"
              style={{ color: "var(--text-primary)" }}
            >
              <span>adnan</span>
              <span style={{ color: "var(--accent-primary)" }}>.</span>
            </a>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <Magnetic strength={0.25}>
                <button
                  onClick={() => {
                    playClick();
                    setCmdOpen(true);
                  }}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center cursor-pointer"
                  style={{
                    background:
                      "color-mix(in srgb, var(--text-primary) 10%, transparent)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <SearchIcon className="w-3.5 h-3.5" />
                </button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <button
                  onClick={() => {
                    const ci = AVAILABLE_THEMES.findIndex(
                      (t) => t.id === theme,
                    );
                    setTheme(
                      AVAILABLE_THEMES[(ci + 1) % AVAILABLE_THEMES.length].id,
                    );
                    playClick();
                  }}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center cursor-pointer"
                  style={{ border: "1px solid var(--border-color)" }}
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ background: cur.color }}
                  />
                </button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <button
                  onClick={() => {
                    toggleSound();
                    playClick();
                  }}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center cursor-pointer"
                  style={{
                    background:
                      "color-mix(in srgb, var(--text-primary) 10%, transparent)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {soundEnabled ? (
                    <VolumeIcon className="w-3 h-3" />
                  ) : (
                    <VolumeMuteIcon className="w-3 h-3" />
                  )}
                </button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <button
                  type="button"
                  aria-label="Toggle menu"
                  aria-expanded={menuOpen}
                  className="relative z-20 ml-0.5 flex h-5 w-6 cursor-pointer flex-col justify-between border-none bg-transparent p-0"
                  onClick={() => {
                    playClick();
                    toggleMenu();
                  }}
                >
                  <span
                    className={`w-full h-0.5 rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[9px]" : ""}`}
                    style={{ background: "var(--text-primary)" }}
                  />
                  <span
                    className={`w-full h-0.5 rounded-full transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
                    style={{ background: "var(--text-primary)" }}
                  />
                  <span
                    className={`w-full h-0.5 rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[9px]" : ""}`}
                    style={{ background: "var(--text-primary)" }}
                  />
                </button>
              </Magnetic>
            </div>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-10 lg:hidden"
                  style={{
                    background: "rgba(5, 7, 14, 0.62)",
                    backdropFilter: "blur(12px) saturate(125%)",
                    WebkitBackdropFilter: "blur(12px) saturate(125%)",
                  }}
                  onClick={toggleMenu}
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={menuVars}
                  className="absolute left-0 right-0 top-[135%] z-20 flex max-h-[min(82vh,42rem)] flex-col gap-2 overflow-y-auto rounded-3xl p-3.5 sm:p-4"
                  style={{
                    background:
                      "color-mix(in srgb, var(--bg-card) 88%, transparent)",
                    border: "1px solid var(--border-color)",
                    backdropFilter: "blur(30px) saturate(145%)",
                    WebkitBackdropFilter: "blur(30px) saturate(145%)",
                    boxShadow: "0 24px 70px rgba(0,0,0,.42)",
                  }}
                >
                  <div className="flex flex-col gap-1.5 w-full">
                    {NAV_ITEMS.map((item) => (
                      <motion.a
                        key={item.id}
                        href={`#${item.id}`}
                        variants={itemVars}
                        onClick={() => {
                          playClick();
                          toggleMenu();
                        }}
                        className="group w-full flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border border-transparent transition-all duration-200"
                        style={{
                          background:
                            "color-mix(in srgb, var(--text-primary) 5%, transparent)",
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0"
                            style={{
                              background: "var(--bg-secondary)",
                              border: "1px solid var(--border-color)",
                            }}
                          >
                            {item.icon}
                          </span>
                          <div className="text-left">
                            <div className="flex items-center gap-2">
                              <span
                                className="text-[11px] font-mono font-bold"
                                style={{ color: "var(--accent-primary)" }}
                              >
                                {item.num}
                              </span>
                              <span
                                className="text-sm font-bold"
                                style={{ color: "var(--text-primary)" }}
                              >
                                {item.name}
                              </span>
                            </div>
                            <p
                              className="text-[10px] font-mono leading-tight"
                              style={{ color: "var(--text-muted)" }}
                            >
                              {item.desc}
                            </p>
                          </div>
                        </div>
                        <span
                          className="text-xs font-mono font-bold pr-1"
                          style={{ color: "var(--text-muted)" }}
                        >
                          →
                        </span>
                      </motion.a>
                    ))}
                  </div>

                  {/* Theme palette */}
                  <motion.div
                    variants={itemVars}
                    className="w-full pt-3 mt-1 border-t"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    <div className="flex items-center justify-between mb-2.5 px-1">
                      <span
                        className="text-[10px] font-mono uppercase tracking-wider font-semibold flex items-center gap-1.5"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <span>🎨</span>
                        <span>Theme Palette</span>
                      </span>
                      <span
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold"
                        style={{
                          color: "var(--accent-primary)",
                          background:
                            "color-mix(in srgb,var(--accent-primary) 10%,transparent)",
                          border:
                            "1px solid color-mix(in srgb,var(--accent-primary) 20%,transparent)",
                        }}
                      >
                        {cur.name}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {AVAILABLE_THEMES.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => {
                            setTheme(t.id as ThemeId);
                            playClick();
                          }}
                          className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer border"
                          style={{
                            background:
                              theme === t.id
                                ? "color-mix(in srgb,var(--accent-primary) 15%,transparent)"
                                : "color-mix(in srgb,var(--text-primary) 5%,transparent)",
                            borderColor:
                              theme === t.id
                                ? "var(--accent-primary)"
                                : "transparent",
                            color:
                              theme === t.id
                                ? "var(--text-primary)"
                                : "var(--text-secondary)",
                          }}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ background: t.color }}
                          />
                          <span className="text-[11px] font-mono truncate">
                            {t.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVars}
                    className="w-full grid grid-cols-2 gap-2 pt-2 border-t"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    <button
                      onClick={() => {
                        playClick();
                        toggleMenu();
                        setCmdOpen(true);
                      }}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-[11px] font-mono cursor-pointer transition-all"
                      style={{
                        border: "1px solid var(--border-color)",
                        background:
                          "color-mix(in srgb,var(--text-primary) 5%,transparent)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      <SearchIcon className="w-3 h-3" />
                      <span>Search (⌘K)</span>
                    </button>
                    <a
                      href="mailto:itadnanhussain@gmail.com"
                      onClick={() => {
                        playClick();
                        toggleMenu();
                      }}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-[11px] font-mono cursor-pointer transition-all"
                      style={{
                        border: "1px solid var(--border-color)",
                        background:
                          "color-mix(in srgb,var(--text-primary) 5%,transparent)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      <span>📧</span>
                      <span>Email Me</span>
                    </a>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </div>
      </header>
    </>
  );
});

export default Navbar;
