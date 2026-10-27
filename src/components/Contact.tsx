"use client";

import {
  MailIcon,
  LinkedinIcon,
  PhoneIcon,
  GithubIcon,
  CopyIcon,
  ExternalLinkIcon,
} from "./Icons";
import { useTheme } from "./ThemeProvider";

const CONTACT_LIST = [
  {
    id: 1,
    label: "Email Address",
    value: "itadnanhussain@gmail.com",
    displayValue: "itadnanhussain@gmail.com",
    icon: <MailIcon className="w-5 h-5" />,
    badge: "Fastest Response",
    badgeColor: "var(--accent-primary)",
    href: "mailto:itadnanhussain@gmail.com",
    actionType: "email" as const,
    iconColor: "#43d6a0",
  },
  {
    id: 2,
    label: "LinkedIn Profile",
    value: "https://www.linkedin.com/in/itadnanhussain/",
    displayValue: "in/itadnanhussain",
    icon: <LinkedinIcon className="w-5 h-5" />,
    badge: "Professional Network",
    badgeColor: "var(--accent-secondary)",
    href: "https://www.linkedin.com/in/itadnanhussain/",
    actionType: "link" as const,
    iconColor: "#0a66c2",
  },
  {
    id: 3,
    label: "Phone & WhatsApp",
    value: "+8801624640886",
    displayValue: "+880 1624-640886",
    icon: <PhoneIcon className="w-5 h-5" />,
    badge: "Direct Line",
    badgeColor: "var(--accent-primary)",
    href: "tel:+8801624640886",
    actionType: "phone" as const,
    iconColor: "var(--accent-secondary)",
  },
  {
    id: 4,
    label: "GitHub Profile",
    value: "https://github.com/itadnanhussain",
    displayValue: "github.com/itadnanhussain",
    icon: <GithubIcon className="w-5 h-5" />,
    badge: "Open Source",
    badgeColor: "var(--text-muted)",
    href: "https://github.com/itadnanhussain",
    actionType: "link" as const,
    iconColor: "var(--text-primary)",
  },
];

export default function Contact() {
  const { showToast, playClick } = useTheme();

  const handleCopy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      showToast(`${label} copied to clipboard.`);
      playClick();
    } catch (error) {
      console.error(`Could not copy ${label.toLowerCase()}.`, error);
      showToast(`Could not copy ${label.toLowerCase()}. Please copy it manually.`);
    }
  };

  return (
    <section id="contact" className="mx-auto w-full max-w-5xl scroll-mt-32 px-4 pt-24 pb-16 sm:px-6">
      <p className="section-label text-center">
        📬 Have Something In Mind?
      </p>
      <h2 className="section-title mb-4 text-center title">
        Get In Touch
      </h2>
      <p className="section-copy max-w-xl mb-12 text-center">
        Open for full-time engineering roles, consulting, and select freelance
        projects. Based in Sylhet, Bangladesh — available remotely worldwide.
      </p>

      {/* Contact cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto mb-8">
        {CONTACT_LIST.map((item) => (
          <div
            key={item.id}
            className="surface-card flex flex-col justify-between p-6 group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{
                    background:
                      "color-mix(in srgb, var(--accent-primary) 10%, transparent)",
                    color: item.iconColor,
                  }}
                >
                  {item.icon}
                </div>
                <span
                  className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border"
                  style={{
                    color: item.badgeColor,
                    background:
                      "color-mix(in srgb, var(--accent-primary) 8%, transparent)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  {item.badge}
                </span>
              </div>
              <p className="text-[11px] font-mono mb-1 text-[var(--text-muted)]">
                {item.label}
              </p>
              <p className="text-sm font-bold break-all text-[var(--text-primary)]">
                {item.displayValue}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-[var(--border-color)]">
              <button
                onClick={() => handleCopy(item.label, item.value)}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium cursor-pointer border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all"
                style={{ background: "var(--bg-secondary)" }}
              >
                <CopyIcon className="w-3.5 h-3.5" />
                Copy
              </button>
              <a
                href={item.href}
                target={item.actionType === "link" ? "_blank" : undefined}
                rel={
                  item.actionType === "link" ? "noopener noreferrer" : undefined
                }
                onClick={playClick}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium text-white transition-all hover:opacity-90"
                style={{ background: "var(--accent-primary)" }}
              >
                {item.actionType === "link" ? "Visit" : "Open"}
                <ExternalLinkIcon className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Availability status banner */}
      <div
        className="surface-card max-w-3xl mx-auto px-5 py-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center text-xs font-mono">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-[var(--text-primary)]">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: "#43d6a0" }}
              />
              <span
                className="relative inline-flex rounded-full h-2.5 w-2.5"
                style={{ background: "#43d6a0" }}
              />
            </span>
            <span>Active &amp; Available for new projects</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-[var(--text-muted)]">
            <span>📍</span>
            <span>Sylhet, BD (GMT+6)</span>
          </div>
          <div
            className="flex items-center justify-center sm:justify-end gap-1.5 font-semibold"
            style={{ color: "#43d6a0" }}
          >
            <span>⚡</span>
            <span>Response within 2–4 hours</span>
          </div>
        </div>
      </div>
    </section>
  );
}
