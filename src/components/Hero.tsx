"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import TimezoneBadge from "./TimezoneBadge";
import TextScramble from "./TextScramble";
import MagneticButton, { Magnetic } from "./MagneticButton";
import { useTheme } from "./ThemeProvider";
import {
  CopyIcon,
  LinkedinIcon,
  GithubIcon,
  MailIcon,
  BotIcon,
  ChatGPTIcon,
} from "./Icons";

const ROLES = [
  "⚡ Full-Stack Web Developer",
  "🌐 Next.js & React Architect",
  "🚀 Scalable Cloud & API Engineer",
  "🛡️ Supabase & PostgreSQL Expert",
];
const TERMINAL_SUGGESTIONS = ["help", "about", "projects", "stack", "contact"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const { showToast, playClick } = useTheme();

  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((p) => (p + 1) % ROLES.length),
      3200,
    );
    return () => clearInterval(id);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("itadnanhussain@gmail.com");
      showToast("Copied itadnanhussain@gmail.com to clipboard!");
    } catch {
      showToast("Could not copy the email address. Please copy it manually.");
    }
  };

  const btnClass =
    "soft-button mx-auto w-full px-4 py-2.5 shadow-md";

  return (
    <section
      id="profile"
      className="hero-wrapper flex flex-col justify-center items-center min-h-[90vh] sm:min-h-screen pt-24 sm:pt-28 pb-12 sm:pb-16 scroll-mt-32 w-full"
    >
      {/* Timezone badge */}
      <div className="mb-6 sm:mb-8 w-full flex justify-center animate-in fade-in slide-in-from-top-4 duration-500">
        <TimezoneBadge />
      </div>

      {/* Main hero */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 sm:gap-10 lg:gap-16 w-full max-w-5xl">
        {/* Profile picture container */}
        <div className="w-44 h-44 sm:w-60 sm:h-60 lg:w-80 lg:h-80 relative flex-shrink-0 section__pic-container">
          {/* Ambient glow ring */}
          <div
            className="absolute inset-0 rounded-full blur-2xl opacity-40 -z-10 animate-pulse"
            style={{ background: "var(--accent-glow)" }}
          />
          {/* Profile card with initials (replace src with real photo) */}
          <div
            className="w-full h-full relative rounded-full p-1.5 border-2 bg-white/5 backdrop-blur-md shadow-2xl profile-in-co"
            style={{ borderColor: "var(--border-color)" }}
          >
            <Image
              src="/images/adnan-hussain.png"
                      alt="Md. Adnan Hussain"
                      width={768}
                      height={797}
                      loading="eager"
                      sizes="(max-width: 640px) 176px, (max-width: 1024px) 240px, 320px"
                      className="h-full w-full rounded-full object-cover"
                    />
          </div>
        </div>

        {/* Text */}
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start max-w-xl w-full px-2 sm:px-0">
          <p
            className="hero-p1 mb-1 font-mono text-sm font-semibold sm:text-lg"
            style={{ color: "var(--text-muted)" }}
          >
            Hello, I&apos;m
          </p>

          <h1
            className="hero-title mb-3 w-full break-words text-4xl font-black leading-[1.05] tracking-[-0.06em] sm:text-5xl lg:text-6xl"
            style={{ color: "var(--text-primary)" }}
          >
            <span className="block">
              <TextScramble text="Md. Adnan" />
            </span>
            <span
              className="block"
              style={{ color: "var(--accent-primary)" }}
            >
              <TextScramble text="Hussain" />
            </span>
          </h1>

          <div className="mb-4 flex min-h-8 w-full items-center justify-center sm:mb-6 lg:justify-start">
            <p
              className="text-center font-mono text-sm font-semibold transition-all duration-300 sm:text-xl lg:text-left"
              style={{ color: "var(--accent-primary)" }}
            >
              {ROLES[roleIndex]}
            </p>
          </div>

          <p
            className="text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-lg hero-p2"
            style={{ color: "var(--text-secondary)" }}
          >
            Building modern, high-performance web applications with{" "}
            <span
              className="font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Next.js, React & TypeScript
            </span>
            . Focused on scalable full-stack platforms, Supabase architectures,
            and production-grade systems. Creator of{" "}
            <span
              className="font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              M/S Adnan Enterprise
            </span>{" "}
            — a live dealer accounting platform.
          </p>

          {/* CTA buttons */}
          <div className="hero-btns grid w-full max-w-[26rem] grid-cols-1 justify-items-center gap-2.5 sm:grid-cols-2 sm:gap-3">
            <MagneticButton
              containerClassName="flex w-full justify-center"
              className={`${btnClass} max-w-[16rem] bg-transparent hover:opacity-90`}
              style={{ color: "var(--text-primary)" }}
              onClick={() =>
                window.open(
                  "https://adnan-enterprise.vercel.app/",
                  "_blank",
                  "noopener,noreferrer",
                )
              }
            >
              Live Project 🚀
            </MagneticButton>
            <MagneticButton
              containerClassName="flex w-full justify-center"
              className={`${btnClass} max-w-[16rem] border-transparent`}
              style={{ background: "var(--accent-primary)", color: "#fff" }}
              onClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Contact Info 📬
            </MagneticButton>
            <a
              href="/resume.pdf"
              download="Md_Adnan_Hussain_Resume.pdf"
              className="col-span-1 mx-auto inline-flex w-full max-w-[16rem] items-center justify-center gap-2 rounded-full border border-[var(--border-color)] px-4 py-2.5 text-center text-sm font-semibold text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--text-primary)] sm:col-span-2 sm:w-auto sm:min-w-[12rem]"
              onClick={playClick}
            >
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
                <path d="M5 17v3h14v-3" />
              </svg>
              Download Resume
            </a>
          </div>

          {/* AI pills */}
          <div
            className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 pt-3 border-t w-full"
            style={{ borderColor: "var(--border-color)" }}
          >
            <Magnetic strength={0.25}>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-mono transition-all cursor-pointer"
                style={{
                  border: "1px solid var(--border-color)",
                  background:
                    "color-mix(in srgb,var(--text-primary) 5%,transparent)",
                  color: "var(--text-secondary)",
                }}
              >
                <CopyIcon className="w-3.5 h-3.5" />
                <span>Copy Email</span>
              </button>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href={`https://chatgpt.com/?q=Tell+me+about+Md.+Adnan+Hussain,+full-stack+developer+from+Sylhet+Bangladesh`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-mono transition-all cursor-pointer"
                style={{
                  border: "1px solid var(--border-color)",
                  background:
                    "color-mix(in srgb,var(--text-primary) 5%,transparent)",
                  color: "var(--text-secondary)",
                }}
              >
                <ChatGPTIcon
                  className="w-3.5 h-3.5"
                  style={{ color: "#10a37f" }}
                />
                <span>Ask in ChatGPT</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href={`https://claude.ai/new?q=Review+Md.+Adnan+Hussain,+full-stack+developer+from+Sylhet+Bangladesh`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-mono transition-all cursor-pointer"
                style={{
                  border: "1px solid var(--border-color)",
                  background:
                    "color-mix(in srgb,var(--text-primary) 5%,transparent)",
                  color: "var(--text-secondary)",
                }}
              >
                <BotIcon
                  className="w-3.5 h-3.5"
                  style={{ color: "var(--accent-secondary)" }}
                />
                <span>Ask in Claude</span>
              </a>
            </Magnetic>
          </div>

          {/* Socials */}
          <div
            id="socials-container"
            className="mx-auto mt-5 flex w-full max-w-[25rem] flex-nowrap items-center justify-center gap-2 sm:mt-6 sm:gap-3 lg:mx-0 lg:justify-start"
          >
            <Magnetic className="shrink-0" strength={0.3}>
              <a
                href="https://www.linkedin.com/in/itadnanhussain/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="icon flex h-10 w-10 items-center justify-center rounded-xl p-2.5 transition-transform hover:scale-110 sm:h-11 sm:w-11"
                style={{
                  background:
                    "color-mix(in srgb,var(--text-primary) 10%,transparent)",
                  color: "#0a66c2",
                }}
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </Magnetic>
            <Magnetic className="shrink-0" strength={0.3}>
              <a
                href="https://github.com/itadnanhussain"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="icon flex h-10 w-10 items-center justify-center rounded-xl p-2.5 transition-transform hover:scale-110 sm:h-11 sm:w-11"
                style={{
                  background:
                    "color-mix(in srgb,var(--text-primary) 10%,transparent)",
                  color: "var(--text-primary)",
                }}
              >
                <GithubIcon className="w-5 h-5" />
              </a>
            </Magnetic>
            <Magnetic className="min-w-0 flex-1" strength={0.25}>
              <button
                onClick={copyEmail}
                className="icon inline-flex min-h-10 max-w-full items-center justify-center gap-1.5 overflow-hidden rounded-full border px-2.5 py-2 font-mono text-[9px] transition-colors sm:min-h-11 sm:px-3 sm:text-[11px]"
                style={{
                  borderColor: "var(--border-color)",
                  background:
                    "color-mix(in srgb,var(--text-primary) 5%,transparent)",
                  color: "var(--text-secondary)",
                }}
              >
                <MailIcon
                  className="w-3.5 h-3.5"
                  style={{ color: "var(--accent-primary)" }}
                />
                <span className="truncate">itadnanhussain@gmail.com</span>
              </button>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Terminal showcase */}
      <div className="w-full mt-10 sm:mt-16 animate-in fade-in duration-700">
        <EnterpriseTerminal />
      </div>
    </section>
  );
}

/* ── Mini terminal preview for Adnan Enterprise ── */
function EnterpriseTerminal() {
  const { playClick } = useTheme();
  const [input, setInput] = useState("");
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [history, setHistory] = useState<
    { command: string; output: string[] }[]
  >([
    {
      command: "help",
      output: [
        "Available commands: about, projects, stack, skills, contact, clear",
        "Type a command or tap a quick suggestion below.",
      ],
    },
  ]);
  const outputRef = useRef<HTMLDivElement>(null);
  const commands: Record<string, string[]> = {
    help: [
      "Available commands: about, projects, stack, skills, contact, clear",
      "Type a command or tap a quick suggestion below.",
    ],
    about: [
      "Md. Adnan Hussain",
      "Full-stack developer based in Sylhet, Bangladesh.",
    ],
    projects: [
      "M/S Adnan Enterprise — dealer accounting platform",
      "Taqdeer Fashion — e-commerce and inventory",
    ],
    stack: [
      "Next.js · React · TypeScript",
      "Supabase · PostgreSQL · Tailwind CSS",
    ],
    skills: [
      "Frontend: React · Next.js · TypeScript · Tailwind CSS",
      "Backend: Supabase · PostgreSQL · REST APIs",
      "Delivery: Vercel · Git · PWA",
    ],
    contact: [
      "itadnanhussain@gmail.com",
      "Use the Contact section for direct links.",
    ],
  };
  const runCommand = (value: string) => {
    const command = value.trim();
    if (!command) return;
    playClick();
    if (command.toLowerCase() === "clear") {
      setHistory([]);
    } else {
      setHistory((current) =>
        [
          ...current,
          {
            command,
            output: commands[command.toLowerCase()] ?? [
              `Command not found: ${command}. Type help for available commands.`,
            ],
          },
        ].slice(-8),
      );
    }
    setInput("");
  };
  useEffect(() => {
    if (outputRef.current)
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [history]);
  useEffect(() => {
    const timer = window.setInterval(() => {
      setSuggestionIndex((index) => (index + 1) % TERMINAL_SUGGESTIONS.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border shadow-2xl"
      style={{ background: "#090b10", borderColor: "var(--border-color)" }}
    >
    <div
      className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3 sm:px-5"
      style={{ background: "#171922", borderColor: "var(--border-color)" }}
    >
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
        <span
          className="ml-2 font-mono text-[10px] sm:ml-3 sm:text-xs"
          style={{ color: "var(--text-secondary)" }}
        >
          adnan.dev — interactive terminal preview
        </span>
      </div>
      <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 font-mono text-[9px] text-emerald-300">
        portfolio shell
      </span>
    </div>
    <div
      ref={outputRef}
      aria-live="polite"
      className="min-h-36 max-h-64 space-y-3 overflow-y-auto bg-[#0d1016] p-4 font-mono text-[11px] sm:min-h-40 sm:p-5 sm:text-xs"
      style={{ scrollbarWidth: "none" }}
    >
        {history.map((entry, index) => (
          <div key={`${entry.command}-${index}`}>
            <p className="break-all">
              <span className="font-semibold text-emerald-400">adnan@portfolio ~</span>{" "}
              <span className="text-[var(--text-primary)]">
                $ {entry.command}
              </span>
            </p>
            {entry.output.map((line) => (
              <p
                key={line}
                className="mt-1 break-words text-[var(--text-muted)]"
              >
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t border-[var(--border-color)] px-4 py-3 sm:px-5">
        <span className="mr-1 font-mono text-[10px] text-[var(--text-muted)]">
          Quick tap:
        </span>
        {["help", "projects", "skills", "contact", "clear"].map((command) => (
          <button
            key={command}
            type="button"
            onClick={() => runCommand(command)}
            className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 font-mono text-[10px] text-[var(--text-secondary)] transition-colors hover:border-emerald-400/40 hover:text-emerald-400"
          >
            {command}
          </button>
        ))}
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          runCommand(input);
        }}
        className="flex items-center gap-2 border-t border-[var(--border-color)] bg-black/20 px-4 py-3 sm:px-5"
      >
        <span aria-hidden="true" className="font-mono text-xs text-emerald-400">
          ➜
        </span>
        <input
          aria-label="Terminal command"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={`Type a command (e.g. ${TERMINAL_SUGGESTIONS[suggestionIndex]})...`}
          className="min-w-0 flex-1 bg-transparent font-mono text-xs text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] sm:text-sm"
        />
        <button
          type="submit"
          className="font-mono text-xs text-[var(--accent-primary)]"
        >
          Run
        </button>
      </form>
    </div>
  );
}
