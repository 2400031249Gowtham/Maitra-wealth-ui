"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Cursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;

    if (!dot || !ring) return;

    // Set initial positions
    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e: MouseEvent) => {
      // Instantly position the dot
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      // Smooth lag effect on the ring
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if target is interactive (link, button, input, textarea, select, or custom interactives)
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive") ||
        target.closest(".interactive");

      if (isInteractive) {
        gsap.to(ring, {
          scale: 2.2,
          borderColor: "#00d2c4",
          backgroundColor: "rgba(0, 210, 196, 0.05)",
          duration: 0.3,
        });
        gsap.to(dot, {
          scale: 0.5,
          backgroundColor: "#00d2c4",
          duration: 0.3,
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive") ||
        target.closest(".interactive");

      if (isInteractive) {
        gsap.to(ring, {
          scale: 1,
          borderColor: "rgba(255, 255, 255, 0.4)",
          backgroundColor: "transparent",
          duration: 0.3,
        });
        gsap.to(dot, {
          scale: 1,
          backgroundColor: "white",
          duration: 0.3,
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[99999] mix-blend-difference hidden md:block"
      />
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-9 h-9 border border-white/40 rounded-full pointer-events-none z-[99998] hidden md:block"
      />
    </>
  );
}
