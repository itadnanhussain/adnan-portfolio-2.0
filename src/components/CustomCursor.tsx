"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasFine =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    if (!hasFine) return;

    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    if (isTouch && !window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.classList.add("has-custom-cursor");

    let mouseX = -100,
      mouseY = -100,
      ringX = -100,
      ringY = -100;
    let isHovered = false,
      isClicked = false,
      isHidden = true,
      isInput = false,
      rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (isHidden) {
        isHidden = false;
        if (cursorRef.current) cursorRef.current.style.opacity = "1";
      }
      const el = e.target as HTMLElement | null;
      if (el) {
        isHovered = !!el.closest(
          "a,button,[role='button'],input,textarea,select,.cursor-pointer,[data-cursor-hover],.project-card,.nav-links li",
        );
        isInput = !!el.closest("input,textarea,[contenteditable='true']");
      }
    };
    const onDown = () => {
      isClicked = true;
    };
    const onUp = () => {
      isClicked = false;
    };
    const onLeave = () => {
      isHidden = true;
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
    };
    const onEnter = () => {
      isHidden = false;
      if (cursorRef.current) cursorRef.current.style.opacity = "1";
    };
    const onTouch = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
      document.documentElement.classList.remove("has-custom-cursor");
    };

    const render = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (dot && ring) {
        const ds = isClicked ? 0.75 : isHovered ? (isInput ? 0.4 : 1.4) : 1;
        dot.style.transform = `translate3d(${mouseX}px,${mouseY}px,0) translate(-50%,-50%) scale(${ds})`;
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        const rs = isInput ? 0.5 : isClicked ? 0.8 : isHovered ? 1.55 : 1;
        ring.style.transform = `translate3d(${ringX}px,${ringY}px,0) translate(-50%,-50%) scale(${rs})`;
        if (isHovered && !isInput) {
          ring.style.backgroundColor = "var(--accent-glow)";
          ring.style.borderColor = "var(--accent-primary)";
          ring.style.backdropFilter = "blur(2px)";
        } else {
          ring.style.backgroundColor = "transparent";
          ring.style.borderColor = "var(--accent-primary)";
          ring.style.backdropFilter = "none";
        }
        ring.style.opacity = isInput ? "0.3" : "1";
        dot.style.opacity = isInput ? "0.4" : "1";
      }
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("touchstart", onTouch, {
      passive: true,
      once: true,
    });
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("touchstart", onTouch);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed inset-0 pointer-events-none z-[9999999] transition-opacity duration-300"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-[var(--accent-primary)] pointer-events-none will-change-transform transition-[background-color,border-color,opacity,backdrop-filter] duration-200"
        style={{ boxShadow: "0 0 16px var(--accent-glow)" }}
      />
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--accent-primary)] pointer-events-none will-change-transform transition-transform duration-100"
        style={{ boxShadow: "0 0 10px var(--accent-primary)" }}
      />
    </div>
  );
}
