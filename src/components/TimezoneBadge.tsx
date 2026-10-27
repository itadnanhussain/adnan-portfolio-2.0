"use client";
import { useEffect, useState } from "react";
export default function TimezoneBadge() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      try {
        setTime(
          new Intl.DateTimeFormat("en-US", {
            timeZone: "Asia/Dhaka",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          }).format(new Date()),
        );
      } catch {
        setTime(new Date().toLocaleTimeString());
      }
    };
    const initialTick = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(initialTick);
      window.clearInterval(id);
    };
  }, []);
  if (!time)
    return (
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs"
        style={{
          borderColor: "var(--border-color)",
          background: "color-mix(in srgb,var(--bg-card) 80%,transparent)",
          color: "var(--text-secondary)",
        }}
      >
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ background: "var(--accent-primary)" }}
        />
        <span>📍 Sylhet, BD (GMT+6)</span>
      </div>
    );
  return (
    <div
      className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full border text-xs transition-all duration-300"
      style={{
        borderColor: "var(--border-color)",
        background: "color-mix(in srgb,var(--bg-card) 80%,transparent)",
        color: "var(--text-secondary)",
      }}
    >
      <span className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2 shrink-0">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ background: "#43d6a0" }}
          />
          <span
            className="relative inline-flex rounded-full h-2 w-2"
            style={{ background: "#43d6a0" }}
          />
        </span>
        <span className="font-medium" style={{ color: "#43d6a0" }}>
          Available for Hire
        </span>
      </span>
      <span style={{ color: "var(--text-muted)" }}>•</span>
      <span className="flex items-center gap-1 font-mono text-[11px] sm:text-xs">
        <span>📍 Sylhet, BD (GMT+6)</span>
        <span style={{ color: "var(--text-muted)" }}>•</span>
        <span
          className="font-semibold flex items-center gap-1"
          style={{ color: "var(--text-primary)" }}
        >
          <span>⏰</span>
          <span>{time}</span>
        </span>
      </span>
    </div>
  );
}
