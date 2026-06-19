"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "@/lib/gsap";

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number; // Adjust speed. Positive moves up, negative moves down
  className?: string;
}

export default function ParallaxSection({
  children,
  speed = 0.2,
  className = "",
}: ParallaxSectionProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = elementRef.current;
      if (!el) return;

      const yVal = speed * 100;

      gsap.fromTo(
        el,
        {
          y: -yVal,
        },
        {
          y: yVal,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: elementRef }
  );

  return (
    <div ref={elementRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
