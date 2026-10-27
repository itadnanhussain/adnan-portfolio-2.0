"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

// Component Imports
import About from "../components/About";
import AmbientSpotlight from "../components/AmbientSpotlight";
import Background from "../components/Background";
import Blog from "../components/Blog";
import Contact from "../components/Contact";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Preloader from "../components/Preloader";
import MotionEffects from "./motion-effects";
import Projects from "../components/Projects";
import Toast from "../components/Toast";

declare global {
  interface Window {
    __lenis?: Lenis;
    webkitAudioContext?: typeof AudioContext;
  }
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInstant, setIsInstant] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let hasVisited = false;
    try {
      hasVisited = Boolean(sessionStorage.getItem("portfolio_has_visited"));
    } catch (error) {
      console.warn("Could not read the portfolio visit preference.", error);
    }

    // 1. Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    window.__lenis = lenis;
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    if (!window.location.hash) {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    }

    // 2. Connect ScrollTrigger to Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // 3. Single Animation Loop (optimized)
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // 4. Handle transition and cleanup
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (hasVisited) {
      timer = setTimeout(() => {
        setIsInstant(true);
        setIsLoading(false);
        lenis.start();
        if (!window.location.hash) lenis.scrollTo(0, { immediate: true });
      }, 0);
    } else {
      lenis.stop(); // Disable scroll during initial loading
      timer = setTimeout(() => {
        setIsLoading(false);
        try {
          sessionStorage.setItem("portfolio_has_visited", "true");
        } catch {
          // In case storage is restricted
        }
        lenis.start(); // Re-enable scroll
        if (!window.location.hash) {
          lenis.scrollTo(0, { immediate: true });
        }
      }, 1800);
    }

    return () => {
      if (timer) clearTimeout(timer);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (typeof window !== "undefined") {
        delete window.__lenis;
      }
    };
  }, []);

  useGSAP(
    () => {
      if (
        isLoading ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;

      // Advanced Initial Hero Choreography
      const tl = gsap.timeline();

      tl.from(".logo-in, header a[href='#profile']", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
      })
        .from(
          ".nav-links, li.nav-links",
          {
            y: -30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "back.out(1.7)",
          },
          "-=0.8",
        )
        .from(
          ".profile-in-co",
          {
            scale: 0.8,
            opacity: 0,
            rotation: 5,
            duration: 1.5,
            ease: "elastic.out(1, 0.3)",
          },
          "-=0.4",
        )
        .from(
          ".hero-p1",
          { x: -50, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=1",
        )
        .from(
          ".hero-title",
          {
            y: 50,
            opacity: 0,
            rotationX: -90,
            transformOrigin: "0% 50% -50",
            duration: 1,
            ease: "back.out(1.5)",
          },
          "-=0.8",
        )
        .from(
          ".hero-p2",
          { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        )
        .from(
          ".hero-btns",
          { y: 20, opacity: 0, duration: 0.8, ease: "back.out(1.5)" },
          "-=0.4",
        )
        .from(
          "#socials-container .icon",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.5)",
          },
          "-=0.3",
        );
    },
    { scope: container, dependencies: [isLoading] },
  );

  return (
    <div ref={container}>
      <AmbientSpotlight />
      <Background />
      <Preloader isLoading={isLoading} isInstant={isInstant} />
      <Toast />
      <MotionEffects isReady={!isLoading} />

      <Navbar menuOpen={menuOpen} toggleMenu={() => setMenuOpen((v) => !v)} />

      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Blog />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
