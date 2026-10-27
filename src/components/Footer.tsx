"use client";

import MagneticButton from "./MagneticButton";
import { ArrowUpIcon, GithubIcon, MailIcon } from "./Icons";
import { useTheme } from "./ThemeProvider";

const NAV_LINKS = [
  { label: "Home", href: "#profile" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Journal", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const { playClick } = useTheme();

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    playClick();
  };

  return (
    <footer className="mt-12 w-full border-t border-[var(--border-color)] px-4 pb-8 pt-10 sm:px-8 sm:pt-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-7">
        <div
          className="flex flex-col gap-4 rounded-3xl border border-[var(--border-color)] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7"
          style={{
            background:
              "linear-gradient(120deg, color-mix(in srgb, var(--accent-primary) 12%, var(--bg-card)), var(--bg-card) 64%)",
          }}
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-primary)]">
              Have a project in mind?
            </p>
            <h2 className="mt-1 text-lg font-bold text-[var(--text-primary)] sm:text-xl">
              Let&apos;s build something useful.
            </h2>
          </div>
          <a
            href="mailto:itadnanhussain@gmail.com"
            onClick={playClick}
            className="inline-flex w-fit items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--accent-primary)" }}
          >
            Start a conversation <span aria-hidden="true">↗</span>
          </a>
        </div>

        {/* Logo + Back to top */}
        <div className="flex w-full flex-wrap items-center justify-between gap-4">
          <a
            href="#profile"
            onClick={playClick}
            className="text-2xl font-bold tracking-[-0.06em] transition-opacity hover:opacity-80"
            style={{
              color: "var(--text-primary)",
              fontFamily: "var(--font-poppins, sans-serif)",
            }}
          >
            adnan<span style={{ color: "var(--accent-primary)" }}>.</span>
            <span className="ml-1 font-mono text-[9px] font-medium tracking-[0.18em] text-[var(--text-muted)]">
              DEV
            </span>
          </a>

          <MagneticButton
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-color)] text-xs font-mono font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all cursor-pointer"
            style={{ background: "var(--bg-card)" }}
          >
            Back to top
            <ArrowUpIcon className="w-3.5 h-3.5" />
          </MagneticButton>
        </div>

        {/* Nav links */}
        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap gap-1.5 sm:gap-2"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={playClick}
              className="text-xs font-mono px-3 py-1.5 rounded-full border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all"
              style={{ background: "var(--bg-card)" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Divider */}
        <div className="h-px w-full bg-[var(--border-color)]" />

        {/* Bottom row */}
        <div className="grid w-full grid-cols-1 items-center gap-4 text-center font-mono text-[10px] text-[var(--text-muted)] sm:grid-cols-[1fr_auto_1fr] sm:text-left sm:text-xs">
          <p className="leading-relaxed">
            Built with{" "}
            <span className="text-[var(--accent-primary)]">Next.js 16</span>,{" "}
            <span className="text-[var(--accent-primary)]">TypeScript</span>,{" "}
            <span className="text-[var(--accent-primary)]">
              Tailwind CSS v4
            </span>{" "}
            &amp; <span className="text-[var(--accent-primary)]">GSAP</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:justify-center">
            <a
              href="mailto:itadnanhussain@gmail.com"
              onClick={playClick}
              className="inline-flex items-center gap-2 whitespace-nowrap transition-colors hover:text-[var(--text-primary)]"
            >
              <MailIcon className="h-3.5 w-3.5 shrink-0" />
              <span>itadnanhussain@gmail.com</span>
            </a>
            <a
              href="https://github.com/itadnanhussain"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              className="inline-flex items-center gap-2 whitespace-nowrap transition-colors hover:text-[var(--text-primary)]"
            >
              <GithubIcon className="h-3.5 w-3.5 shrink-0" />
              <span>GitHub</span>
            </a>
          </div>
          <p className="leading-relaxed">
            © 2026{" "}
            <span className="text-[var(--text-secondary)] font-semibold">
              Md. Adnan Hussain
            </span>
            . Crafted with 💖 in Sylhet.
          </p>
        </div>
      </div>
    </footer>
  );
}
