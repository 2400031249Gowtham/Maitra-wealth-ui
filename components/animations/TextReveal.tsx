"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "@/lib/gsap";

interface TextRevealProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
}

export default function TextReveal({
  text,
  className = "",
  tag: Tag = "h2",
  delay = 0,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const words = containerRef.current?.querySelectorAll(".word");
      if (!words || words.length === 0) return;

      gsap.fromTo(
        words,
        {
          yPercent: 100,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.02,
          delay: delay,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <Tag
      ref={containerRef as any}
      className={`overflow-hidden flex flex-wrap leading-tight ${className}`}
    >
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden mr-[0.25em] py-[0.1em] relative"
        >
          <span className="word inline-block transform">{word}</span>
        </span>
      ))}
    </Tag>
  );
}
