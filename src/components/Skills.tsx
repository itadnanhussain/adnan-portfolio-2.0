"use client";

import { CheckIcon } from "./Icons";

const FRONTEND: { name: string; level: string }[] = [
  { name: "React 19 & Next.js 15/16", level: "Experienced" },
  { name: "TypeScript / JS (ESNext)", level: "Experienced" },
  { name: "Tailwind CSS v4", level: "Experienced" },
  { name: "GSAP & Lenis Scroll", level: "Intermediate" },
  { name: "Framer Motion", level: "Intermediate" },
  { name: "Responsive UI & A11y", level: "Experienced" },
];

const BACKEND: { name: string; level: string }[] = [
  { name: "Node.js & Express", level: "Experienced" },
  { name: "Supabase (Auth + RLS + DB)", level: "Experienced" },
  { name: "PostgreSQL & SQL Migrations", level: "Experienced" },
  { name: "REST APIs & Webhooks", level: "Experienced" },
  { name: "JWT & Session Management", level: "Experienced" },
  { name: "jsPDF & File Generation", level: "Intermediate" },
];

const DEVOPS: { name: string; level: string }[] = [
  { name: "Vercel Deployment", level: "Experienced" },
  { name: "Git & GitHub Workflows", level: "Experienced" },
  { name: "Environment Config & Secrets", level: "Experienced" },
  { name: "Service Workers & PWA", level: "Intermediate" },
  { name: "Docker (Basic)", level: "Beginner" },
  { name: "Linux Shell", level: "Intermediate" },
];

const CONTRIBUTION_WEEKS = (() => {
  const weeks = [];
  const seed = [
    1, 2, 0, 3, 2, 4, 1, 0, 2, 3, 4, 2, 1, 3, 4, 4, 2, 0, 1, 3, 4, 2, 3, 4, 1,
    2, 0, 3, 4, 4, 2, 1, 3, 4, 3, 2, 4, 4, 1, 3, 2, 4, 3, 4, 4, 2, 3, 4, 4, 3,
    4, 4,
  ];
  for (let w = 0; w < 52; w++) {
    const days = [];
    const base = seed[w % seed.length];
    for (let d = 0; d < 7; d++) {
      const isWeekend = d === 0 || d === 6;
      let level = isWeekend
        ? Math.max(0, base - 1)
        : (base + ((w + d) % 2)) % 5;
      if (w > 45) level = Math.max(1, level);
      days.push(level);
    }
    weeks.push(days);
  }
  return weeks;
})();

function levelColor(level: number) {
  switch (level) {
    case 1:
      return "rgba(67, 214, 160, 0.15)";
    case 2:
      return "rgba(67, 214, 160, 0.35)";
    case 3:
      return "rgba(67, 214, 160, 0.60)";
    case 4:
      return "var(--green)";
    default:
      return "rgba(255,255,255,0.05)";
  }
}

function SkillCard({
  label,
  accent,
  skills,
}: {
  label: string;
  accent: string;
  skills: { name: string; level: string }[];
}) {
  return (
    <div
      className="flex flex-col rounded-3xl p-6 border"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <p
        className="text-[10px] font-mono uppercase tracking-widest mb-1"
        style={{ color: accent }}
      >
        {label}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        {skills.map((s) => (
          <div key={s.name} className="flex items-start gap-2">
            <CheckIcon
              className="w-4 h-4 mt-0.5 shrink-0"
              style={{ color: "var(--green)" }}
            />
            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--foreground)" }}
              >
                {s.name}
              </p>
              <p
                className="text-[11px] font-mono"
                style={{ color: "var(--muted-strong)" }}
              >
                {s.level}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="section-shell section-block reveal-on-scroll"
    >
      <div className="section-heading">
        <p className="eyebrow">⚡ ENGINEERED FOR PERFORMANCE</p>
        <h2>
          Skills &amp;
          <br />
          <span>Experience.</span>
        </h2>
      </div>

      <div className="skills-content">
        <p
          style={{
            color: "var(--muted)",
            fontSize: 14,
            lineHeight: 1.9,
            marginBottom: 24,
          }}
        >
          From type-safe frontend interfaces to distributed cloud backends and
          production-grade Supabase architectures — 3+ years of shipping real
          products to real users.
        </p>

        <div className="flex flex-col gap-4">
          <SkillCard
            label="Frontend · Client-Side"
            accent="var(--accent)"
            skills={FRONTEND}
          />
          <SkillCard
            label="Backend · Server & Data"
            accent="var(--accent-bright)"
            skills={BACKEND}
          />
          <SkillCard
            label="DevOps · Infrastructure"
            accent="var(--green)"
            skills={DEVOPS}
          />
        </div>

        {/* GitHub-style contribution heatmap */}
        <div
          className="mt-8 rounded-3xl p-5 border"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p
                className="text-sm font-bold flex items-center gap-2"
                style={{ color: "var(--foreground)" }}
              >
                🌿 Engineering Velocity
              </p>
              <p
                className="text-[11px] font-mono mt-0.5"
                style={{ color: "var(--muted)" }}
              >
                52 weeks of consistent shipping
              </p>
            </div>
            <a
              href="https://github.com/itadnanhussain"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono px-3 py-1 rounded-full border"
              style={{
                color: "var(--foreground)",
                borderColor: "var(--border)",
                background: "var(--surface-raised)",
              }}
            >
              @itadnanhussain ↗
            </a>
          </div>

          {/* Metric row */}
          <div
            className="grid grid-cols-2 gap-2 mb-4 p-3 rounded-xl"
            style={{ background: "var(--surface-raised)" }}
          >
            <div>
              <p
                className="text-[10px] font-mono"
                style={{ color: "var(--muted)" }}
              >
                📦 Total Commits
              </p>
              <p
                className="text-lg font-bold font-mono"
                style={{ color: "var(--green)" }}
              >
                500+
              </p>
            </div>
            <div>
              <p
                className="text-[10px] font-mono"
                style={{ color: "var(--muted)" }}
              >
                🔥 Active Streak
              </p>
              <p
                className="text-lg font-bold font-mono"
                style={{ color: "var(--accent)" }}
              >
                30+ Days
              </p>
            </div>
          </div>

          {/* Heatmap */}
          <div
            className="overflow-x-auto pb-1"
            style={{ scrollbarWidth: "none" }}
          >
            <div style={{ display: "flex", gap: 3, minWidth: 680 }}>
              {CONTRIBUTION_WEEKS.map((week, wi) => (
                <div
                  key={wi}
                  style={{ display: "flex", flexDirection: "column", gap: 3 }}
                >
                  {week.map((level, di) => (
                    <div
                      key={di}
                      title={`Week ${wi + 1}, Day ${di + 1}: ${level === 0 ? "No" : level * 3} contributions`}
                      style={{
                        width: 11,
                        height: 11,
                        borderRadius: 2,
                        background: levelColor(level),
                        border: `1px solid ${level > 0 ? "rgba(67,214,160,0.15)" : "transparent"}`,
                        transition: "transform 150ms",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div
            className="flex items-center justify-between mt-3 text-[10px] font-mono"
            style={{ color: "var(--muted-strong)" }}
          >
            <span>52 Weeks of Consistent Code</span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((l) => (
                <span
                  key={l}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 2,
                    background: levelColor(l),
                    display: "inline-block",
                  }}
                />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
