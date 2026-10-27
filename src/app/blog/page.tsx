import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "./data";

export const metadata: Metadata = {
  title: "Engineering Journal | Md. Adnan Hussain",
  description:
    "Project notes on building business software, accounting workflows, and dependable reporting.",
};

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen px-4 pb-20 pt-28 text-[var(--text-primary)] sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/#blog"
          className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
        >
          <span aria-hidden="true">←</span> Back to portfolio
        </Link>
        <header className="mb-12 mt-8 max-w-3xl">
          <p className="font-mono text-xs uppercase text-[var(--accent-primary)]">
            Project notes
          </p>
          <h1 className="mt-2 text-4xl font-black sm:text-5xl">
            Engineering Journal
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
            Short articles about the business workflows, system boundaries, and
            reporting details behind shipped work.
          </p>
        </header>

        <div className="divide-y divide-[var(--border-color)] border-y border-[var(--border-color)]">
          {BLOG_POSTS.map((post, index) => (
            <article
              key={post.slug}
              className="grid gap-4 py-7 sm:grid-cols-[7rem_1fr] sm:gap-8"
            >
              <p className="font-mono text-xs text-[var(--text-muted)]">
                {String(index + 1).padStart(2, "0")} / {post.readingTime}
              </p>
              <div>
                <p className="font-mono text-[11px] text-[var(--text-muted)]">
                  {post.publishedAt}
                </p>
                <h2 className="mt-2 text-xl font-bold sm:text-2xl">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition-colors hover:text-[var(--accent-primary)]"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] text-[var(--text-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
