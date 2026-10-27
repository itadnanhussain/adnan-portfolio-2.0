"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ExternalLinkIcon, GithubIcon, SearchIcon } from "./Icons";
import {
  PROJECTS,
  type Project,
  type ProjectCategory,
} from "../app/projects/data";
import ArchitectureSlider from "./ArchitectureSlider";

type ProjectFilter = "all" | ProjectCategory;

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProjectFilter>("all");
  const filteredProjects = useMemo(
    () =>
      activeCategory === "all"
        ? PROJECTS
        : PROJECTS.filter((project) => project.category === activeCategory),
    [activeCategory],
  );
  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.__lenis?.start();
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedProject]);
  const filters: { id: ProjectFilter; label: string; count: number }[] = [
    { id: "all", label: "All Projects", count: PROJECTS.length },
    {
      id: "business",
      label: "Business Systems",
      count: PROJECTS.filter((project) => project.category === "business")
        .length,
    },
    {
      id: "commerce",
      label: "E-Commerce",
      count: PROJECTS.filter((project) => project.category === "commerce")
        .length,
    },
  ];

  return (
    <>
      <section id="projects" className="mx-auto w-full max-w-5xl scroll-mt-32 px-4 pt-24 pb-16 sm:px-6">
        <p className="section-label text-center">
          🚀 Selected Work
        </p>
        <h2 className="section-title mb-4 text-center title">
          Featured Projects
        </h2>
        <p className="section-copy mb-12 text-center">
          Production-grade web applications spanning dealer accounting
          platforms, fashion e-commerce, and more — shipped with care and
          precision.
        </p>

        <div
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
          role="group"
          aria-label="Filter projects"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              aria-pressed={activeCategory === filter.id}
              onClick={() => setActiveCategory(filter.id)}
              className={`soft-button ${activeCategory === filter.id ? "bg-[var(--accent-primary)] text-white border-[var(--accent-primary)]" : ""}`}
            >
              <span>{filter.label}</span>
              <span className="font-mono opacity-75">{filter.count}</span>
            </button>
          ))}
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="project-card surface-card p-6 sm:p-7 group"
            >
              <div className="relative mb-5 aspect-video overflow-hidden rounded-2xl border border-[var(--border-color)]">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              {/* Card header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono font-bold text-[var(--text-muted)]">
                  {String(project.id).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-2">
                  {project.badge && (
                    <span
                      className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full"
                      style={{
                        color: project.badgeColor,
                        background: `color-mix(in srgb, ${project.badgeColor} 12%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${project.badgeColor} 30%, transparent)`,
                      }}
                    >
                      {project.badge}
                    </span>
                  )}
                  <span className="text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] transition-colors text-lg">
                    ↗
                  </span>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold mb-2 text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)]"
                    style={{ background: "var(--bg-secondary)" }}
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span
                    className="text-[10px] font-mono px-2.5 py-1 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)]"
                    style={{ background: "var(--bg-secondary)" }}
                  >
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-[var(--border-color)]">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border-color)] py-2.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <SearchIcon className="w-3.5 h-3.5" />
                  Inspect
                </button>
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent-primary)] py-2.5 text-xs font-semibold text-white hover:opacity-90 transition-opacity"
                >
                  Case Study <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <ArchitectureSlider />
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(12px)",
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProject.title} project details`}
            data-lenis-prevent="true"
            onKeyDown={(event) => {
              if (event.key === "Escape") setSelectedProject(null);
            }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border-color)",
              scrollbarWidth: "none",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              autoFocus
              aria-label="Close project details"
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              style={{ background: "var(--bg-secondary)" }}
            >
              ✕
            </button>

            {/* Badge + Title */}
            <p
              className="text-[10px] font-mono uppercase tracking-widest mb-1"
              style={{ color: "var(--accent-primary)" }}
            >
              Project Deep-Dive
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold mb-1 text-[var(--text-primary)]">
              {selectedProject.title}
            </h3>
            <p className="text-sm mb-4 text-[var(--text-muted)]">
              {selectedProject.subtitle}
            </p>

            <div className="relative mb-5 aspect-video overflow-hidden rounded-2xl border border-[var(--border-color)]">
              <Image
                src={selectedProject.image}
                alt={selectedProject.imageAlt}
                fill
                sizes="(max-width: 672px) 100vw, 640px"
                className="object-cover"
              />
            </div>

            {/* Long description */}
            <p
              className="text-sm leading-relaxed mb-5 text-[var(--text-secondary)]"
              style={{ lineHeight: 1.8 }}
            >
              {selectedProject.longDescription}
            </p>

            {/* Highlight banner */}
            {selectedProject.highlight && (
              <div
                className="mb-5 px-4 py-3 rounded-2xl flex items-center gap-2 text-xs font-mono font-semibold"
                style={{
                  background: `color-mix(in srgb, ${selectedProject.badgeColor} 12%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${selectedProject.badgeColor} 25%, transparent)`,
                  color: selectedProject.badgeColor,
                }}
              >
                <span>✓</span>
                <span>{selectedProject.highlight}</span>
              </div>
            )}

            {/* Tech Stack */}
            <div className="mb-5">
              <h4 className="text-sm font-semibold mb-2 text-[var(--text-primary)]">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)]"
                    style={{ background: "var(--bg-secondary)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mb-5">
              <h4 className="text-sm font-semibold mb-2 text-[var(--text-primary)]">
                Core Features
              </h4>
              <ul className="space-y-1.5">
                {selectedProject.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-xs text-[var(--text-secondary)]"
                  >
                    <span style={{ color: "var(--accent-primary)" }}>•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenges */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-2 text-[var(--text-primary)]">
                Engineering Challenges
              </h4>
              <ul className="space-y-1.5">
                {selectedProject.challenges.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-2 text-xs text-[var(--text-secondary)]"
                  >
                    <span style={{ color: "var(--accent-secondary)" }}>⚡</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-[var(--border-color)]">
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 flex-1 py-3 px-6 rounded-2xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: "var(--accent-primary)" }}
              >
                <span>Live Demo</span>
                <ExternalLinkIcon className="w-4 h-4" />
              </a>
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 flex-1 py-3 px-6 rounded-2xl text-sm font-semibold border border-[var(--border-color)] text-[var(--text-primary)] transition-all hover:border-[var(--accent-primary)]"
                style={{ background: "var(--bg-secondary)" }}
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repo</span>
              </a>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-xs font-mono cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors self-center"
              >
                Close ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
