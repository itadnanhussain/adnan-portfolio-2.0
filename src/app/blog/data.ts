export interface BlogSection {
  id: string;
  title: string;
  paragraphs: string[];
  points?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime: string;
  tags: string[];
  sections: BlogSection[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "building-a-dealer-accounting-platform",
    title: "Building a Dealer Accounting Platform Around Real Workflows",
    excerpt:
      "A look at the ledgers, shop-level records, sales statements, and access controls behind M/S Adnan Enterprise.",
    publishedAt: "October 2026",
    readingTime: "4 min read",
    tags: ["Next.js", "Supabase", "Accounting"],
    sections: [
      {
        id: "workflow-first",
        title: "Start with the workflow",
        paragraphs: [
          "Accounting tools are useful when their records follow the way a business already works. M/S Adnan Enterprise brings company transactions, deposits, shop memos, and sales statements into one connected application.",
          "The dashboard summarizes recent activity, while the individual ledgers keep the underlying entries available for review.",
        ],
      },
      {
        id: "access-and-auditability",
        title: "Keep access and records deliberate",
        paragraphs: [
          "Dealer-code sign-in and approved-account checks control who can enter the application. Supabase row-level security adds data isolation at the database boundary rather than relying only on client-side visibility.",
          "An audit trail and synchronized records make it easier to trace how a summary relates to its source transactions.",
        ],
      },
      {
        id: "useful-outputs",
        title: "Make the records useful outside the dashboard",
        paragraphs: [
          "Monthly sales statements combine the ledger into a reviewable summary and support PDF export. Daily profit records stay synchronized with the statement workflow, so the same business activity can be checked in more than one view.",
        ],
        points: [
          "Monthly statements with PDF export",
          "Shop-level memo and deposit tracking",
          "Daily profit records linked to sales statements",
        ],
      },
    ],
  },
  {
    slug: "designing-exportable-sales-statements",
    title: "Designing Sales Statements That Are Ready to Share",
    excerpt:
      "Turning monthly transaction data into clear statements and dependable PDF exports for day-to-day business use.",
    publishedAt: "October 2026",
    readingTime: "3 min read",
    tags: ["Reporting", "PDF export", "Business software"],
    sections: [
      {
        id: "one-source-of-truth",
        title: "Build the statement from the ledger",
        paragraphs: [
          "A useful statement should reflect the same transactions used by the rest of the application. In M/S Adnan Enterprise, monthly sales statements sit alongside company and shop ledgers rather than becoming a disconnected copy of the data.",
          "That relationship gives the business a consistent place to review activity and its summarized result.",
        ],
      },
      {
        id: "readable-pdfs",
        title: "Treat the exported document as a product surface",
        paragraphs: [
          "The PDF export is intended to make a monthly summary portable. Tables need clear labels and predictable pagination so the document remains useful when it leaves the application.",
          "The project uses jsPDF for statement generation and includes dynamic pagination for longer tables.",
        ],
      },
      {
        id: "connected-profit-records",
        title: "Keep follow-on records synchronized",
        paragraphs: [
          "Daily profit records are synchronized from the sales statement ledger. Keeping that relationship explicit reduces the risk of treating a summary as an independent source of truth.",
        ],
      },
    ],
  },
  {
    slug: "database-level-access-for-dealer-data",
    title: "Why Dealer Data Access Belongs at the Database Layer",
    excerpt:
      "How approved accounts, dealer sign-in, and Supabase row-level security work together to protect a multi-user business platform.",
    publishedAt: "October 2026",
    readingTime: "4 min read",
    tags: ["Supabase", "PostgreSQL", "Access control"],
    sections: [
      {
        id: "multiple-layers",
        title: "Use more than one access check",
        paragraphs: [
          "A business application can make sign-in feel simple without treating a successful login as the only security boundary. M/S Adnan Enterprise combines dealer-code sign-in with approved-account checks before a user reaches the accounting workflows.",
          "That application-level gate is paired with Supabase row-level security, so access to records is also constrained where the data is stored.",
        ],
      },
      {
        id: "database-boundary",
        title: "Keep data isolation close to the data",
        paragraphs: [
          "Row-level security policies let PostgreSQL enforce which rows a signed-in user can read or change. This reduces reliance on interface-only checks and helps keep dealer records isolated across application views.",
          "The same policy boundary applies whether a request comes from a page, a report, or another client using the application’s credentials.",
        ],
      },
      {
        id: "traceable-workflows",
        title: "Make the access model fit the workflow",
        paragraphs: [
          "Company transactions, shop records, and monthly statements need to remain useful to approved users without leaking into another dealer’s account. Designing policies alongside the ledger workflow makes those boundaries easier to reason about and review.",
        ],
        points: [
          "Approved-account checks before entering the platform",
          "Database-enforced per-user data isolation",
          "Ledger and statement workflows within the same access model",
        ],
      },
    ],
  },
  {
    slug: "structuring-a-retail-catalog-and-inventory",
    title: "Connecting a Retail Catalog to Inventory and Orders",
    excerpt:
      "A product catalogue is only the start: filters, stock variants, admin tools, and order tracking have to work as one retail flow.",
    publishedAt: "October 2026",
    readingTime: "3 min read",
    tags: ["E-commerce", "PostgreSQL", "Product design"],
    sections: [
      {
        id: "catalog-discovery",
        title: "Help shoppers find the right product",
        paragraphs: [
          "Taqdeer Fashion’s catalogue is designed around the way shoppers browse clothing: by category, size, and price. Keeping those filters connected to typed product data makes discovery clearer as a catalogue grows.",
          "Product variants also need to represent the available sizes and stock, not just the appearance of a product card.",
        ],
      },
      {
        id: "inventory-and-orders",
        title: "Keep inventory connected to the order flow",
        paragraphs: [
          "Inventory management and order tracking are related parts of one retail workflow. The admin experience supports product changes and stock management, while order status gives the business a place to follow a customer’s purchase.",
        ],
      },
      {
        id: "typed-foundation",
        title: "Build a foundation that stays maintainable",
        paragraphs: [
          "The project uses PostgreSQL with Prisma for typed database access. That gives the catalogue, inventory tools, and order workflows a shared data model while leaving room to iterate on the storefront experience.",
        ],
        points: [
          "Category, size, and price filtering",
          "Product variants and stock management",
          "Order status tracking and protected administration",
        ],
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
