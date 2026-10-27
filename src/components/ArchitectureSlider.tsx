"use client";

import { useState } from "react";
import { useTheme } from "./ThemeProvider";

const COMPARISONS = {
  enterprise: {
    title: "M/S Adnan Enterprise",
    subtitle: "Dealer accounting & management",
    category: "BUSINESS SYSTEM",
    color: "#ff5575",
    stack: ["Next.js 16", "Supabase", "PostgreSQL", "jsPDF"],
    workflows: [
      "Company and shop ledgers",
      "Dealer-code sign-in with Supabase RLS",
      "Monthly statements and PDF export",
      "Sales-linked daily profit records",
      "Real-time updates and audit history",
      "Installable PWA with offline navigation",
    ],
  },
  commerce: {
    title: "Taqdeer Fashion",
    subtitle: "Fashion retail & inventory",
    category: "RETAIL / COMMERCE",
    color: "#00d6a0",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    workflows: [
      "Product catalogue and category filters",
      "Inventory and product variants",
      "Order lifecycle and customer updates",
      "Role-protected administration",
      "Responsive product discovery and filtering",
      "Typed PostgreSQL data with Prisma",
    ],
  },
} as const;

type ProjectKey = keyof typeof COMPARISONS;

function ProjectPanel({
  project,
}: {
  project: (typeof COMPARISONS)[ProjectKey];
}) {
  return (
    <div
      className="relative flex h-full min-w-0 flex-col overflow-hidden p-5 sm:p-7"
      style={{
        background: `linear-gradient(145deg, color-mix(in srgb, ${project.color} 9%, var(--bg-card)), var(--bg-card) 58%)`,
      }}
    >
      <div className="absolute inset-x-0 top-0 h-0.5" style={{ background: project.color }} />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span
          className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9px] font-bold"
          style={{
            color: project.color,
            borderColor: `color-mix(in srgb, ${project.color} 35%, transparent)`,
            background: `color-mix(in srgb, ${project.color} 10%, transparent)`,
          }}
        >
          <span aria-hidden="true">{project.category === "BUSINESS SYSTEM" ? "▰" : "✳"}</span>
          {project.category}
        </span>
        <span className="font-mono text-[9px] text-[var(--text-muted)]">
          {project.workflows.length} CORE FEATURES
        </span>
      </div>
      <h4 className="mt-4 text-xl font-bold leading-tight text-[var(--text-primary)] sm:text-2xl">
        {project.title}
      </h4>
      <p className="mt-1 text-xs text-[var(--text-secondary)]">
        {project.subtitle}
      </p>
      <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
        Technology stack
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {project.stack.map((technology) => (
          <span
            key={technology}
            className="rounded-lg border px-2 py-1 font-mono text-[10px] text-[var(--text-secondary)]"
            style={{
              background: "color-mix(in srgb, var(--bg-secondary) 82%, transparent)",
              borderColor: "var(--border-color)",
            }}
          >
            {technology}
          </span>
        ))}
      </div>
      <p className="mb-2 mt-5 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
        What&apos;s inside
      </p>
      <ul className="grid flex-1 content-start gap-2 sm:grid-cols-2 sm:gap-2.5">
        {project.workflows.map((workflow) => (
          <li
            key={workflow}
            className="flex min-w-0 items-start gap-2 rounded-xl border p-2.5 text-[11px] leading-relaxed text-[var(--text-secondary)] sm:text-xs"
            style={{
              background: `color-mix(in srgb, ${project.color} 5%, var(--bg-primary))`,
              borderColor: `color-mix(in srgb, ${project.color} 20%, transparent)`,
            }}
          >
            <span
              className="mt-px shrink-0 font-bold"
              style={{ color: project.color }}
              aria-hidden="true"
            >
              ✓
            </span>
            {workflow}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex items-center gap-2 border-t border-[var(--border-color)] pt-3 font-mono text-[9px] text-[var(--text-muted)]">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: project.color }} />
        Built around real product workflows
      </div>
    </div>
  );
}

export default function ArchitectureSlider() {
  const [position, setPosition] = useState(50);
  const [mobileProject, setMobileProject] = useState<ProjectKey>("enterprise");
  const { playClick } = useTheme();

  return (
    <section className="mx-auto mt-16 max-w-5xl rounded-3xl border border-[var(--border-color)] p-4 py-8 sm:p-7 sm:py-10">
      <header className="mb-7 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] sm:text-xs">
          Two builds · two different worlds
        </p>
        <h3 className="mt-2 text-2xl font-bold leading-tight text-[var(--text-primary)] sm:text-3xl">
          What&apos;s inside each project?
        </h3>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)]">
          Compare the features, technology, and day-to-day problems each
          product is designed to solve.
        </p>
      </header>

      <div
        className="mb-4 grid grid-cols-2 gap-2 md:hidden"
        role="tablist"
        aria-label="Choose a project"
      >
        {(Object.keys(COMPARISONS) as ProjectKey[]).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={mobileProject === key}
            onClick={() => {
              setMobileProject(key);
              playClick();
            }}
            className="rounded-xl border px-2.5 py-2.5 text-[11px] font-medium transition-colors sm:px-3 sm:text-xs"
            style={{
              borderColor:
                mobileProject === key
                  ? COMPARISONS[key].color
                  : "var(--border-color)",
              color:
                mobileProject === key
                  ? "var(--text-primary)"
                  : "var(--text-muted)",
              background:
                mobileProject === key
                  ? `color-mix(in srgb, ${COMPARISONS[key].color} 12%, transparent)`
                  : "transparent",
            }}
          >
            {COMPARISONS[key].title}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]">
        <div
          className="md:hidden"
          role="tabpanel"
          aria-label={COMPARISONS[mobileProject].title}
        >
          <ProjectPanel project={COMPARISONS[mobileProject]} />
        </div>
        <div className="hidden md:block">
          <div
            className="grid min-h-[320px] transition-[grid-template-columns] duration-200"
            style={{ gridTemplateColumns: `${position}% ${100 - position}%` }}
          >
            <div className="min-w-0 border-r border-[var(--border-color)]">
              <ProjectPanel project={COMPARISONS.enterprise} />
            </div>
            <div className="min-w-0">
              <ProjectPanel project={COMPARISONS.commerce} />
            </div>
          </div>
          <div className="flex items-center gap-4 border-t border-[var(--border-color)] bg-[var(--bg-secondary)] px-5 py-3">
            <span className="shrink-0 font-mono text-[10px] text-[var(--text-muted)]">
              Accounting
            </span>
            <input
              aria-label="Adjust project comparison balance"
              className="w-full accent-[var(--accent-primary)]"
              max={65}
              min={35}
              onChange={(event) => setPosition(Number(event.target.value))}
              type="range"
              value={position}
            />
            <span className="shrink-0 font-mono text-[10px] text-[var(--text-muted)]">
              Commerce
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
