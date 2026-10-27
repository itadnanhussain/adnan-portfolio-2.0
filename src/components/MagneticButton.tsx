"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { useRef } from "react";
import { useTheme } from "./ThemeProvider";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function Magnetic({
  children,
  className = "",
  strength = 0.35,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const bounds = useRef<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.1 });

  const onEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (
      e.pointerType === "touch" ||
      !window.matchMedia("(pointer: fine) and (hover: hover)").matches ||
      !ref.current
    )
      return;
    const rect = ref.current.getBoundingClientRect();
    bounds.current = {
      left: rect.left - x.get(),
      top: rect.top - y.get(),
      width: rect.width,
      height: rect.height,
    };
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = bounds.current;
    if (!rect || e.pointerType === "touch") return;
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const onLeave = () => {
    bounds.current = null;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      data-magnetic-wrapper
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
  containerClassName?: string;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  containerClassName = "",
  onClick,
  ...props
}: MagneticButtonProps) {
  const { playClick } = useTheme();
  const handle = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClick();
    if (onClick) onClick(e);
  };
  return (
    <Magnetic className={containerClassName} strength={strength}>
      <button className={className} onClick={handle} {...props}>
        {children}
      </button>
    </Magnetic>
  );
}
