"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  range?: number; // Distance in px to trigger magnetic effect
}

export default function MagneticButton({
  children,
  className = "",
  range = 40,
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      // Distance between mouse and button center
      const distance = Math.hypot(x, y);

      if (distance < range) {
        // Pull towards mouse
        gsap.to(container, {
          x: x * 0.45,
          y: y * 0.45,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        // Snap back to origin
        gsap.to(container, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1.2, 0.4)",
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to(container, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1.2, 0.4)",
      });
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [range]);

  return (
    <div ref={containerRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
