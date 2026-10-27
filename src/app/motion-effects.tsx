"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function MotionEffects({ isReady }: { isReady: boolean }) {
  useEffect(() => {
    if (
      !isReady ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine) and (hover: hover)").matches
    )
      return;

    let activeElement: HTMLElement | null = null;
    let originalTranslate = "";
    let bounds: DOMRect | null = null;

    const reset = () => {
      if (!activeElement) return;
      activeElement.style.translate = originalTranslate;
      activeElement = null;
      bounds = null;
      originalTranslate = "";
    };

    const updateMagnet = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        reset();
        return;
      }

      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(
              "button:not(:disabled), a[href], [role='button']",
            )
          : null;

      if (!target || target.closest("[data-magnetic-wrapper]")) {
        reset();
        return;
      }

      if (target !== activeElement) {
        reset();
        activeElement = target;
        originalTranslate = target.style.translate;
        bounds = target.getBoundingClientRect();
        target.classList.add("magnetic-interaction");
      }

      if (!bounds) return;
      const x = Math.max(
        -8,
        Math.min(8, (event.clientX - bounds.left - bounds.width / 2) * 0.16),
      );
      const y = Math.max(
        -8,
        Math.min(8, (event.clientY - bounds.top - bounds.height / 2) * 0.16),
      );
      target.style.translate = `${x}px ${y}px`;
    };

    const resetOnPointerOut = (event: PointerEvent) => {
      if (!activeElement || !(event.target instanceof Node)) return;
      if (
        activeElement.contains(event.target) &&
        (!(event.relatedTarget instanceof Node) ||
          !activeElement.contains(event.relatedTarget))
      ) {
        reset();
      }
    };

    document.addEventListener("pointerover", updateMagnet);
    document.addEventListener("pointermove", updateMagnet);
    document.addEventListener("pointerout", resetOnPointerOut);
    window.addEventListener("blur", reset);

    return () => {
      document.removeEventListener("pointerover", updateMagnet);
      document.removeEventListener("pointermove", updateMagnet);
      document.removeEventListener("pointerout", resetOnPointerOut);
      window.removeEventListener("blur", reset);
      reset();
    };
  }, [isReady]);

  useGSAP(
    () => {
      if (
        !isReady ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      const responsiveMotion = gsap.matchMedia();

      gsap.utils.toArray<HTMLElement>(".title").forEach((element) => {
        gsap.from(element, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 85%", once: true },
        });
      });

      gsap.from(".about-image-co", {
        scale: 0.85,
        opacity: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: {
          trigger: ".about-image-co",
          start: "top 80%",
          once: true,
        },
      });

      responsiveMotion.add("(min-width: 1024px)", () => {
        gsap.to(".profile-in-co", {
          y: 80,
          scrollTrigger: {
            trigger: "#profile",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
      responsiveMotion.add("(max-width: 1023px)", () => {
        gsap.to(".profile-in-co", {
          y: 30,
          scrollTrigger: {
            trigger: "#profile",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      gsap.to(".about-image-co", {
        y: -30,
        scrollTrigger: {
          trigger: "#about",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.utils
        .toArray<HTMLElement>(".experience-details-container")
        .forEach((element, index) => {
          gsap.from(element, {
            x: index % 2 === 0 ? -40 : 40,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 85%", once: true },
          });
        });
      gsap.utils
        .toArray<HTMLElement>(".experience-details-container")
        .forEach((container) => {
          const items =
            container.querySelectorAll<HTMLElement>(".experience-item");
          if (!items.length) return;
          gsap.from(items, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: { trigger: container, start: "top 90%", once: true },
          });
        });

      gsap.utils
        .toArray<HTMLElement>(".project-card")
        .forEach((card, index) => {
          gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.7,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          });
        });

      const refreshTimer = window.setTimeout(
        () => ScrollTrigger.refresh(),
        1000,
      );
      return () => {
        window.clearTimeout(refreshTimer);
        responsiveMotion.revert();
      };

      gsap.utils.toArray<HTMLElement>(".blog-card").forEach((card, index) => {
        gsap.from(card, {
          y: 36,
          opacity: 0,
          duration: 0.65,
          delay: index * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        });
      });
    },
    { dependencies: [isReady], revertOnUpdate: true },
  );

  return null;
}
