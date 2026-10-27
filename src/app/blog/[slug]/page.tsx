import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPostBySlug } from "../data";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) return { title: "Article Not Found" };

  return {
    title: `${post.title} | Md. Adnan Hussain`,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="min-h-screen px-4 pb-24 pt-28 text-[var(--text-primary)] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <nav
          aria-label="Breadcrumb"
          className="mb-10 flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]"
        >
          <Link
            href="/"
            className="transition-colors hover:text-[var(--text-primary)]"
          >
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href="/blog"
            className="transition-colors hover:text-[var(--text-primary)]"
          >
            Journal
          </Link>
          <span aria-hidden="true">/</span>
          <span className="truncate text-[var(--accent-primary)]">
            {post.slug}
          </span>
        </nav>

        <header className="mb-12 max-w-4xl border-b border-[var(--border-color)] pb-8">
          <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
            <span>{post.publishedAt}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="text-3xl font-black leading-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            {post.excerpt}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="border border-[var(--border-color)] px-2.5 py-1 font-mono text-[10px] text-[var(--text-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_15rem]">
          <article className="max-w-3xl space-y-12">
            {post.sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 space-y-4"
              >
                <h2 className="text-2xl font-bold sm:text-3xl">
                  {String(index + 1).padStart(2, "0")}. {section.title}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-sm leading-7 text-[var(--text-secondary)] sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.points && (
                  <ul className="space-y-2 border-l border-[var(--border-color)] pl-5 text-sm text-[var(--text-secondary)]">
                    {section.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <footer className="border-t border-[var(--border-color)] pt-6">
              <Link
                href="/#projects"
                className="text-sm font-medium text-[var(--accent-primary)]"
              >
                Explore the projects <span aria-hidden="true">→</span>
              </Link>
            </footer>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-28 border-l border-[var(--border-color)] pl-5">
              <p className="mb-4 font-mono text-[10px] uppercase text-[var(--text-muted)]">
                In this article
              </p>
              <nav aria-label="Article sections" className="space-y-3">
                {post.sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-primary)]"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
