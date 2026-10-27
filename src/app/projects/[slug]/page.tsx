import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS } from "../data";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Project Case Study`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
    },
  };
}

export default function ProjectCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen px-4 pt-28 text-sm text-[var(--text-muted)]">
          Loading case study…
        </main>
      }
    >
      {params.then(({ slug }) => (
        <ProjectCaseStudyContent slug={slug} />
      ))}
    </Suspense>
  );
}

function ProjectCaseStudyContent({ slug }: { slug: string }) {
  const project = PROJECTS.find((item) => item.slug === slug);

  if (!project) notFound();

  return (
    <main className="min-h-screen px-4 pb-20 pt-28 text-[var(--text-primary)] sm:px-8">
      <article className="mx-auto max-w-4xl">
        <Link
          href="/#projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
        >
          <span aria-hidden="true">←</span> Back to projects
        </Link>

        <header className="border-b border-[var(--border-color)] pb-8">
          <p className="mb-3 font-mono text-xs uppercase text-[var(--accent-primary)]">
            {project.badge ?? "Project Case Study"}
          </p>
          <h1 className="max-w-3xl text-3xl font-black sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-2 text-lg text-[var(--text-secondary)]">
            {project.subtitle}
          </p>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
            {project.longDescription}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-[var(--border-color)] px-2.5 py-1 font-mono text-xs text-[var(--text-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[var(--accent-primary)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-85"
            >
              Open live project <span aria-hidden="true">↗</span>
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[var(--border-color)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent-primary)]"
            >
              View source <span aria-hidden="true">↗</span>
            </a>
          </div>
        </header>

        {project.highlight && (
          <p className="my-8 border-l-2 border-emerald-400 pl-4 font-mono text-sm text-emerald-400">
            {project.highlight}
          </p>
        )}

        <div className="relative my-8 aspect-video overflow-hidden rounded-2xl border border-[var(--border-color)]">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        <div className="grid gap-12 py-8 sm:grid-cols-2">
          <section>
            <h2 className="mb-5 text-xl font-bold">Core features</h2>
            <ul className="space-y-3">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-3 text-sm leading-6 text-[var(--text-secondary)]"
                >
                  <span
                    className="text-[var(--accent-primary)]"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="mb-5 text-xl font-bold">Engineering challenges</h2>
            <ul className="space-y-3">
              {project.challenges.map((challenge) => (
                <li
                  key={challenge}
                  className="flex gap-3 text-sm leading-6 text-[var(--text-secondary)]"
                >
                  <span
                    className="text-[var(--accent-secondary)]"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                  {challenge}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </main>
  );
}
