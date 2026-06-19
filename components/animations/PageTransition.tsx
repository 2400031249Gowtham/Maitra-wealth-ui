"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function PageTransition() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 2;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 100) return;

    const container = containerRef.current;
    const logo = logoRef.current;
    const text = textRef.current;

    if (!container || !logo || !text) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setLoading(false);
        // Dispatch event to start other animations once loading completes
        window.dispatchEvent(new Event("site-loaded"));
      },
    });

    tl.to(text, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.inOut",
    })
      .to(
        logo,
        {
          scale: 1.1,
          opacity: 0,
          y: -30,
          duration: 0.6,
          ease: "power3.in",
        },
        "-=0.2"
      )
      .to(container, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.8,
        ease: "power4.inOut",
      });
  }, [progress]);

  if (!loading) return null;

  return (
    <div
      ref={containerRef}
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
      className="fixed inset-0 bg-background z-[99999] flex flex-col justify-between p-8 md:p-16 pointer-events-auto"
    >
      {/* Top section */}
      <div className="flex justify-between items-center text-xs tracking-[0.2em] text-white/40 uppercase">
        <div>MAITRA WEALTH</div>
        <div>REDESIGN 2026</div>
      </div>

      {/* Middle section: Animated Logo */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <div ref={logoRef} className="text-center relative">
          <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-white flex items-center justify-center gap-3">
            <span className="text-brand-teal text-glow-teal font-light">M</span>
            <span>MAITRA</span>
          </h1>
          <p className="text-xs uppercase tracking-[0.4em] text-brand-teal mt-2">
            Wealth Management
          </p>
        </div>
      </div>

      {/* Bottom section: Progress indicator */}
      <div ref={textRef} className="flex justify-between items-end">
        <div className="text-xs tracking-wider text-white/50 w-2/3 md:w-1/3">
          Preparing premium wealth environment. Activating high-performance
          engines.
        </div>
        <div className="text-6xl md:text-8xl font-display font-light text-brand-teal tracking-tighter tabular-nums select-none">
          {Math.min(progress, 100)}%
        </div>
      </div>
    </div>
  );
}
