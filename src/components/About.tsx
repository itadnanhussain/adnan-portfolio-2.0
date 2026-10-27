"use client";

import Image from "next/image";
import {
	AcademicCapIcon,
	BoltIcon,
	BriefcaseIcon,
} from "./Icons";

export default function About() {
	return (
		<section
			id="about"
			className="mx-auto w-full max-w-5xl scroll-mt-32 px-4 pt-24 pb-16 sm:px-6"
		>
			<p className="section-label text-center">
				👨‍💻 Get To Know More
			</p>
			<h2 className="section-title mb-12 text-center title">
				About Me
			</h2>

			<div className="flex flex-col gap-10">
				<div className="grid items-center justify-items-center gap-8 lg:grid-cols-[minmax(280px,0.9fr)_1.1fr] lg:gap-12">
					<div className="relative aspect-square w-full max-w-[360px] overflow-hidden rounded-3xl border border-[var(--border-color)] about-image-co fancy-shadow">
						<Image
							src="/images/adnan-hussain.png"
							alt="Md. Adnan Hussain in front of a university building"
							width={768}
							height={797}
							sizes="(max-width: 640px) 100vw, (max-width: 1024px) 360px, 400px"
							className="h-full w-full object-cover"
						/>
					</div>

					<div className="max-w-2xl space-y-4 break-words text-center text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg lg:text-left">
						<p>
							I&apos;m{" "}
							<strong className="text-[var(--text-primary)]">
								Md. Adnan Hussain
							</strong>
							, a passionate{" "}
							<strong className="text-[var(--text-primary)]">
								Full-Stack Web Developer
							</strong>{" "}
							from Sylhet, Bangladesh, dedicated to building scalable,
							production-ready web applications with{" "}
							<span className="text-[var(--accent-primary)] font-semibold">
								Next.js, React 19, TypeScript
							</span>
							, and cloud-native backend systems.
						</p>
						<p>
							I specialize in crafting pixel-perfect, accessible user
							interfaces paired with reliable backend architecture — including{" "}
							<span className="text-[var(--accent-primary)] font-semibold">
								REST APIs, Supabase &amp; PostgreSQL
							</span>
							, secure authentication, real-time data workflows, and PDF export
							pipelines — all with a relentless focus on performance and
							developer experience.
						</p>
						<p>
							My flagship project{" "}
							<strong className="text-[var(--text-primary)]">
								M/S Adnan Enterprise
							</strong>{" "}
							is a live dealer accounting platform serving real business
							workflows — from sales ledgers and shop management to daily profit
							tracking and PDF-exportable statements. Shipped to production on
							Vercel, backed by Supabase row-level security.
						</p>
					</div>
				</div>

				<div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<div className="group rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg sm:p-7">
						<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] transition-transform group-hover:scale-110">
							<BriefcaseIcon className="h-6 w-6" />
						</div>
						<h3 className="mb-1 text-lg font-bold text-[var(--text-primary)] sm:text-xl">
							Experience
						</h3>
						<p className="font-mono text-sm text-[var(--text-muted)]">
							3+ Years
						</p>
						<p className="mt-1 text-xs text-[var(--text-secondary)]">
							Full-Stack Web Dev
						</p>
					</div>

					<div className="group rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg sm:p-7">
						<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--accent-secondary)]/20 bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] transition-transform group-hover:scale-110">
							<AcademicCapIcon className="h-6 w-6" />
						</div>
						<h3 className="mb-1 text-lg font-bold text-[var(--text-primary)] sm:text-xl">
							Education Focus
						</h3>
						<p className="font-mono text-sm text-[var(--text-muted)]">
							BSc in Computer Science &amp; Engineering
						</p>
						<p className="mt-1 text-xs text-[var(--text-secondary)]">
							North South University · Expected 2031
						</p>
						<p className="mt-2 text-[10px] leading-relaxed text-[var(--text-muted)]">
							Data structures · Algorithms · Discrete mathematics
						</p>
					</div>

					<div className="group rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg sm:p-7 sm:col-span-2 lg:col-span-1">
						<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#ffab24]/20 bg-[#ffab24]/10 text-[#ffab24] transition-transform group-hover:scale-110">
							<BoltIcon className="h-6 w-6" />
						</div>
						<h3 className="mb-1 text-lg font-bold text-[var(--text-primary)] sm:text-xl">
							Engineering Edge
						</h3>
						<p className="font-mono text-sm text-[var(--text-muted)]">
							40% faster page loads
						</p>
						<p className="mt-1 text-xs text-[var(--text-secondary)]">
							15% engagement · 20% mobile conversion
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
