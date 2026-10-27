"use client";

import { AnimatePresence, motion } from "framer-motion";

interface PreloaderProps {
  isLoading: boolean;
  isInstant?: boolean;
}

export default function Preloader({
  isLoading,
  isInstant = false,
}: PreloaderProps) {
  if (isInstant) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-auto"
          style={{
            background: "var(--bg-primary)",
            color: "var(--text-primary)",
          }}
          exit={{
            opacity: 0,
            y: "-100%",
            transition: {
              y: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
              },
              opacity: { duration: 0.4, delay: 0.4 },
            },
          }}
        >
          {/* Logo text */}
          <p
            className="mb-12 font-black tracking-tighter select-none"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              color: "var(--text-primary)",
              letterSpacing: "-4px",
            }}
          >
            adnan<span style={{ color: "var(--accent-primary)" }}>.</span>
          </p>

          <motion.div className="flex gap-1">
            {["L", "O", "A", "D", "I", "N", "G", ".", ".", "."].map((l, i) => (
              <motion.span
                key={i}
                className="font-bold text-lg tracking-[2px]"
                style={{ color: "var(--text-secondary)" }}
                initial={{ y: 0 }}
                animate={{ y: [-10, 0, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
              >
                {l}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
