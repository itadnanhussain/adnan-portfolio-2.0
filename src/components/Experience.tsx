"use client";

import { useState } from "react";
import { CheckIcon } from "./Icons";

/* ── Skill data ── */
const FRONTEND = [
  { name: "React 19 & Next.js 15/16", level: "Experienced" },
  { name: "TypeScript / JS (ESNext)", level: "Experienced" },
  { name: "Tailwind CSS v4", level: "Experienced" },
  { name: "GSAP & Lenis Scroll", level: "Intermediate" },
  { name: "Framer Motion", level: "Intermediate" },
  { name: "Responsive UI & Accessibility", level: "Experienced" },
];

const BACKEND = [
  { name: "Node.js & Express", level: "Experienced" },
  { name: "Supabase (Auth + RLS + DB)", level: "Experienced" },
  { name: "PostgreSQL & SQL Migrations", level: "Experienced" },
  { name: "REST APIs & Webhooks", level: "Experienced" },
  { name: "JWT & Session Management", level: "Experienced" },
  { name: "jsPDF & File Generation", level: "Intermediate" },
];

const DEVOPS = [
  { name: "Vercel Deployment", level: "Experienced" },
  { name: "Git & GitHub Workflows", level: "Experienced" },
  { name: "Environment Config & Secrets", level: "Experienced" },
  { name: "Service Workers & PWA", level: "Intermediate" },
  { name: "Docker (Basic)", level: "Beginner" },
  { name: "Linux Shell", level: "Intermediate" },
];

const PILLARS = [
  {
    id: "frontend",
    emoji: "◎",
    label: "CLIENT-SIDE",
    title: "Frontend Mastery",
    accent: "#3987ff",
    focus: "Focus: Next.js & responsive UI",
    proof: "Production ready",
    skills: FRONTEND,
  },
  {
    id: "backend",
    emoji: "ϟ",
    label: "SERVER & DATA",
    title: "Backend Architecture",
    accent: "#bf55ff",
    focus: "Focus: APIs, auth & databases",
    proof: "Reliable data workflows",
    skills: BACKEND,
  },
  {
    id: "devops",
    emoji: "✳",
    label: "TOOLING & DELIVERY",
    title: "Systems & Delivery",
    accent: "#ffab24",
    focus: "Focus: deployment & reliability",
    proof: "Shipped to production",
    skills: DEVOPS,
  },
] as const;

type SkillFilter = "all" | (typeof PILLARS)[number]["id"];

const BUILD_RHYTHM = Array.from({ length: 52 }, (_, week) =>
  Array.from({ length: 7 }, (_, day) => {
    const activity = (week * 7 + day * 11 + week * day) % 13;
    return activity < 3 ? 0 : activity < 6 ? 1 : activity < 9 ? 2 : activity < 11 ? 3 : 4;
  }),
);

function activityColor(level: number) {
  return [
    "rgba(255,255,255,0.05)",
    "rgba(67,214,160,0.18)",
    "rgba(67,214,160,0.4)",
    "rgba(67,214,160,0.7)",
    "#43d6a0",
  ][level];
}

/* ── Skill pillar card ── */
function PillarCard({
  emoji,
  label,
  title,
  accent,
  focus,
  proof,
  skills,
}: {
  emoji: string;
  label: string;
  title: string;
  accent: string;
  focus: string;
  proof: string;
  skills: { name: string; level: string }[];
}) {
  return (
    <article
      className="experience-details-container surface-card group relative flex h-full flex-col overflow-hidden p-5 sm:p-6"
      style={{
        background: `linear-gradient(145deg, color-mix(in srgb, ${accent} 8%, var(--bg-card)), var(--bg-card) 58%)`,
      }}
    >
      <div className="mb-5 h-0.5 w-full rounded-full opacity-90" style={{ background: accent }} />
      <div className="flex min-h-[3.75rem] items-start justify-between gap-3 border-b border-[var(--border-color)] pb-4">
        <div className="min-w-0">
          <p
            className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] sm:text-[10px]"
            style={{ color: accent }}
          >
            {label}
          </p>
          <h3 className="mt-1 text-base font-bold leading-tight text-[var(--text-primary)] sm:text-lg">
            {title}
          </h3>
        </div>
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border text-xl font-bold"
          style={{
            color: accent,
            borderColor: `color-mix(in srgb, ${accent} 24%, transparent)`,
            background: `color-mix(in srgb, ${accent} 12%, transparent)`,
          }}
          aria-hidden="true"
        >
          {emoji}
        </span>
      </div>
      <div className="grid flex-1 grid-cols-2 content-start gap-x-3 gap-y-5 py-5 sm:gap-x-4">
        {skills.map((s) => (
          <div key={s.name} className="experience-item flex min-w-0 items-start gap-2">
            <CheckIcon
              className="mt-0.5 h-4 w-4 shrink-0"
              style={{ color: "#00d6a0" }}
            />
            <div className="min-w-0">
              <p className="break-words text-xs font-semibold leading-snug text-[var(--text-primary)] sm:text-[13px]">
                {s.name}
              </p>
              <p className="mt-1 font-mono text-[9px] text-[var(--text-muted)] sm:text-[10px]">
                {s.level}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto border-t border-[var(--border-color)] pt-3">
        <p className="font-mono text-[10px] text-[var(--text-muted)]">{focus}</p>
        <p className="mt-1.5 flex items-center gap-1.5 font-mono text-[10px] font-semibold text-[#00d6a0]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00d6a0]" />
          {proof}
        </p>
      </div>
    </article>
  );
}

export default function Experience() {
  const [activeFilter, setActiveFilter] = useState<SkillFilter>("all");
  const visiblePillars =
    activeFilter === "all"
      ? PILLARS
      : PILLARS.filter((pillar) => pillar.id === activeFilter);

  return (
    <section id="experience" className="mx-auto w-full max-w-5xl scroll-mt-32 px-4 pt-24 pb-16 sm:px-6">
      <p className="section-label text-center">
        ⚡ Engineered For Performance
      </p>
      <h2 className="section-title mb-4 text-center title">
        Skills &amp; Experience
      </h2>
      <p className="section-copy mb-10 sm:mb-12 text-center">
        From polished, type-safe interfaces to secure backend systems — applying
        engineering fundamentals to real product workflows.
      </p>
      <div
        className="flex flex-wrap justify-center gap-2 mb-8"
        role="group"
        aria-label="Filter skill categories"
      >
        {(
          [
            { id: "all", label: "All Skills" },
            { id: "frontend", label: "Frontend" },
            { id: "backend", label: "Backend" },
            { id: "devops", label: "DevOps" },
          ] as const
        ).map((filter) => (
          <button
            key={filter.id}
            type="button"
            aria-pressed={activeFilter === filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`soft-button px-3.5 py-2 ${activeFilter === filter.id ? "bg-[var(--accent-primary)] border-[var(--accent-primary)] text-white" : ""}`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* 3 Pillar Grid */}
      <div
        className={`mb-10 grid grid-cols-1 gap-5 ${visiblePillars.length === 1 ? "mx-auto w-full max-w-2xl md:grid-cols-1" : "md:grid-cols-3"}`}
      >
        {visiblePillars.map((pillar) => (
          <PillarCard
            key={pillar.id}
            emoji={pillar.emoji}
            label={pillar.label}
            title={pillar.title}
            accent={pillar.accent}
            focus={pillar.focus}
            proof={pillar.proof}
            skills={pillar.skills}
          />
        ))}
      </div>

      {/* Engineering velocity */}
      <div
        className="relative overflow-hidden rounded-3xl border border-[var(--border-color)] p-5 sm:p-7"
        style={{ background: "var(--bg-card)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-28 h-64 w-64 rounded-full opacity-15 blur-3xl"
          style={{ background: "#00d6a0" }}
        />
        <div className="relative mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)] sm:text-base">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-color)] text-lg"
                style={{ background: "var(--bg-secondary)" }}
                aria-hidden="true"
              >
                🌿
              </span>
              Engineering Velocity &amp; Build Rhythm
            </p>
            <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)] sm:text-sm">
              Consistent work across business software, e-commerce, and
              full-stack systems.
            </p>
          </div>
          <a
            href="https://github.com/itadnanhussain"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[var(--border-color)] px-3.5 py-2 font-mono text-[11px] text-[var(--text-secondary)] transition-colors hover:border-[#00d6a0] hover:text-[var(--text-primary)]"
            style={{ background: "var(--bg-secondary)" }}
          >
            @itadnanhussain ↗
          </a>
        </div>

        <div
          className="relative mb-5 grid grid-cols-2 gap-3 rounded-2xl border border-[var(--border-color)] p-4 sm:grid-cols-4 sm:gap-4 sm:p-5"
          style={{ background: "var(--bg-secondary)" }}
        >
          {[
            { value: "3+ yrs", label: "Full-stack building" },
            { value: "2", label: "Product domains" },
            { value: "1 live", label: "Business platform" },
            { value: "3 layers", label: "UI · server · data" },
          ].map((metric) => (
            <div
              key={metric.label}
              className="flex min-h-20 min-w-0 flex-col justify-center rounded-xl border border-[var(--border-color)] p-3 sm:min-h-24 sm:p-4"
              style={{ background: "var(--bg-card)" }}
            >
              <p
                className="truncate font-mono text-lg font-bold sm:text-xl"
                style={{
                  color:
                    metric.value === "3+ yrs"
                      ? "#00d6a0"
                      : metric.value === "2"
                        ? "#ffae42"
                        : metric.value === "1 live"
                          ? "#7aa2f7"
                          : "#bb7aff",
                }}
              >
                {metric.value}
              </p>
              <p className="mt-1 text-[10px] leading-relaxed text-[var(--text-muted)] sm:text-xs">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div
          aria-label="Illustrative 52-week build rhythm preview"
          className="relative overflow-x-auto pb-2"
          style={{ scrollbarWidth: "thin" }}
        >
          <div className="flex w-max gap-[3px]" aria-hidden="true">
            {BUILD_RHYTHM.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {week.map((level, dayIndex) => (
                  <span
                    key={dayIndex}
                    className="h-[10px] w-[10px] rounded-[2px]"
                    style={{
                      background: activityColor(level),
                      border:
                        level > 0
                          ? "1px solid rgba(67,214,160,0.15)"
                          : "1px solid transparent",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 font-mono text-[9px] text-[var(--text-muted)] sm:text-[10px]">
          <span>52-week build rhythm · illustrative preview</span>
          <span className="flex items-center gap-1.5" aria-label="Activity legend">
            Less
            {[0, 1, 2, 3, 4].map((level) => (
              <span
                key={level}
                className="h-[10px] w-[10px] rounded-[2px]"
                style={{ background: activityColor(level) }}
              />
            ))}
            More
          </span>
        </div>
      </div>
    </section>
  );
}
