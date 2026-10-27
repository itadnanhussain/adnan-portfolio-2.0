"use client";

import { useEffect, useRef } from "react";

export default function AmbientSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (event: PointerEvent) => {
      spotlightRef.current?.style.setProperty(
        "background",
        `radial-gradient(750px circle at ${event.clientX}px ${event.clientY}px, var(--accent-glow), transparent 70%)`,
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={spotlightRef}
        className="absolute inset-0 will-change-transform"
        style={{
          background:
            "radial-gradient(350px circle at 50% 0%, var(--accent-glow), transparent 70%)",
        }}
      />
    </div>
  );
}
