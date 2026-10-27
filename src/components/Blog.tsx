import Link from "next/link";
import { BLOG_POSTS } from "../app/blog/data";

export default function Blog() {
  const [featured, ...articles] = BLOG_POSTS;
  const projectNotes = [
    { label: "Data layer", value: "Supabase · PostgreSQL" },
    { label: "Access model", value: "Approved accounts · RLS" },
    { label: "Core workflow", value: "Company & shop ledgers" },
    { label: "Reporting", value: "Monthly PDF statements" },
  ];

  return (
    <section
      id="blog"
      className="mx-auto w-full max-w-6xl scroll-mt-32 px-4 py-20 sm:px-6 sm:py-24"
    >
      <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] sm:text-xs">
          📝 Technical writing &amp; project notes
        </p>
        <h2 className="title mt-2 text-3xl font-black leading-tight text-[var(--text-primary)] sm:text-5xl">
          Engineering Blog
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
          Deep dives into business systems, data workflows, and the engineering
          decisions behind real projects.
        </p>
      </header>

      {featured && (
        <article className="blog-card group grid gap-6 overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 transition-all duration-300 hover:border-[var(--accent-primary)]/50 sm:gap-8 sm:p-8 lg:grid-cols-[minmax(0,1.8fr)_minmax(15rem,0.82fr)] lg:p-9">
          <div className="flex min-w-0 flex-col">
            <div className="mb-5 flex flex-wrap items-center gap-2 font-mono text-[10px] text-[var(--text-muted)]">
              <span className="rounded-full border border-[var(--accent-primary)]/30 bg-[var(--accent-primary)]/10 px-2.5 py-1 text-[var(--accent-primary)]">
                Featured deep dive
              </span>
              <span>{featured.publishedAt}</span>
              <span aria-hidden="true">·</span>
              <span>{featured.readingTime}</span>
            </div>
            <h3 className="max-w-3xl text-2xl font-bold leading-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-primary)] sm:text-3xl">
              {featured.title}
            </h3>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              {featured.excerpt}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {featured.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--border-color)] px-2.5 py-1 font-mono text-[10px] text-[var(--text-muted)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-color)] pt-5">
              <span className="inline-flex items-center gap-2 font-mono text-[10px] text-[#43d6a0] sm:text-xs">
                <span className="h-2 w-2 rounded-full bg-[#43d6a0]" />
                Production business workflows
              </span>
              <Link
                href={`/blog/${featured.slug}`}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-mono text-xs font-semibold text-[var(--bg-primary)] transition-transform hover:-translate-y-0.5"
                style={{ background: "var(--accent-primary)" }}
              >
                Read full article <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <aside
            className="flex min-w-0 flex-col justify-center rounded-2xl border border-[var(--border-color)] p-4 sm:p-5"
            style={{ background: "var(--bg-secondary)" }}
            aria-label="Featured project technical snapshot"
          >
            <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--accent-primary)]">
              ⚡ Project snapshot
            </p>
            <dl className="space-y-2">
              {projectNotes.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-1 rounded-xl border border-[var(--border-color)] px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
                  style={{ background: "var(--bg-card)" }}
                >
                  <dt className="font-mono text-[10px] text-[var(--text-muted)]">
                    {item.label}
                  </dt>
                  <dd className="text-xs font-semibold text-[var(--text-primary)] sm:text-right">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </article>
      )}

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {articles.map((post, index) => (
          <article
            key={post.slug}
            className="blog-card group flex min-h-60 flex-col justify-between rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/60 hover:shadow-xl sm:p-7"
          >
            <div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] text-[var(--text-muted)]">
                <span>
                  {post.publishedAt} <span aria-hidden="true">·</span>{" "}
                  {post.readingTime}
                </span>
                <span>
                  {String(index + 2).padStart(2, "0")} /{" "}
                  {String(BLOG_POSTS.length).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-lg font-bold leading-snug text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-primary)] sm:text-xl">
                {post.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                {post.excerpt}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--border-color)] px-2.5 py-1 font-mono text-[10px] text-[var(--text-muted)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[var(--accent-primary)]"
            >
              Read the story <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] px-5 py-3 font-mono text-xs text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--text-primary)]"
        >
          Browse all {BLOG_POSTS.length} articles &amp; project notes{" "}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
