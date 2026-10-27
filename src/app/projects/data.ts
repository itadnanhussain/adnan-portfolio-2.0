export type ProjectCategory = "business" | "commerce";

export interface Project {
  id: number;
  slug: string;
  category: ProjectCategory;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  imageAlt: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  badge?: string;
  badgeColor?: string;
  features: string[];
  challenges: string[];
  highlight?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    slug: "adnan-enterprise",
    category: "business",
    title: "M/S Adnan Enterprise",
    subtitle: "Dealer Accounting & Management Platform",
    description:
      "A full-featured dealer accounting web application for M/S Adnan Enterprise, managing company transactions, shop ledgers, sales statements, and daily profit records in a live production environment.",
    longDescription:
      "A production-grade business management system built for real-world dealer workflows. The platform handles authenticated dealer sign-ins, company transaction ledgers, shop-level memo and deposit tracking, monthly sales statements with PDF export, and synchronized daily profit records, secured with Supabase row-level security and deployed on Vercel.",
    image: "/images/adnan-enterprise-dashboard.png",
    imageAlt: "M/S Adnan Enterprise business dashboard",
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "jsPDF",
      "Vercel",
    ],
    liveUrl: "https://adnan-enterprise.vercel.app/",
    githubUrl: "https://github.com/itadnanhussain/adnan-enterprise",
    badge: "Live · Production",
    badgeColor: "#43d6a0",
    features: [
      "Dealer-code sign-in with approved-account checks and password recovery",
      "Dashboard with live summaries and recent activity overview",
      "Company transaction and deposit ledgers with full audit trail",
      "Sales statements with monthly summaries, PDF export, and live sync",
      "Shop directory with per-shop transaction and memo workflows",
      "Daily profit records synchronized from the sales statement ledger",
      "Installable PWA with offline navigation notice",
      "Supabase RLS enforcing per-user data isolation",
    ],
    challenges: [
      "Designing Supabase row-level security policies for multi-dealer isolation without performance degradation",
      "Implementing real-time sales sync between statements and profit records using Supabase subscriptions",
      "Building a robust jsPDF pipeline for complex tabular statements with dynamic pagination",
      "Service worker strategy: network-only for accounting pages, offline shell for navigation",
      "Incremental SQL migrations applied safely across production and staging Supabase projects",
    ],
    highlight: "Deployed to Production · Real Business Users",
  },
  {
    id: 2,
    slug: "taqdeer-fashion",
    category: "commerce",
    title: "Taqdeer Fashion",
    subtitle: "Fashion E-Commerce & Inventory Platform",
    description:
      "A modern fashion e-commerce platform for Taqdeer Fashion, featuring a product catalogue, inventory management, and a seamless shopping experience built with Next.js and a fully typed backend.",
    longDescription:
      "Taqdeer Fashion is a full-stack fashion retail platform engineered for a boutique clothing brand. It features a dynamic product catalogue with category filtering, an admin inventory panel for stock management, order tracking, and a smooth checkout experience. Built with Next.js App Router for optimal SSR/ISR performance and a PostgreSQL-backed product database.",
    image: "/images/taqdeer-fashion.png",
    imageAlt: "Taqdeer Fashion e-commerce storefront homepage",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma",
      "Vercel",
    ],
    liveUrl: "https://github.com/itadnanhussain/Taqdeer-Fashion",
    githubUrl: "https://github.com/itadnanhussain/Taqdeer-Fashion",
    badge: "Full-Stack",
    badgeColor: "var(--accent-primary)",
    features: [
      "Dynamic product catalogue with category, size, and price filtering",
      "Admin inventory panel for adding, editing, and deleting products",
      "Order management with status tracking and customer notifications",
      "Responsive, mobile-first UI with smooth page transitions",
      "Optimized product images using Next.js Image with ISR caching",
      "Type-safe database access with Prisma ORM and PostgreSQL",
      "Secure admin authentication with role-based route protection",
    ],
    challenges: [
      "Implementing efficient ISR with on-demand revalidation for product pages without full rebuilds",
      "Designing a flexible product schema accommodating multiple categories, sizes, and stock variants",
      "Building an admin CMS-style panel entirely within the Next.js App Router architecture",
      "Handling image uploads and CDN delivery for high-quality product photography",
      "Achieving a Lighthouse performance score above 95 on mobile for a media-heavy catalogue",
    ],
    highlight: "Fashion Retail · E-Commerce · ISR",
  },
];
