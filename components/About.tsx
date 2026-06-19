"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import TextReveal from "./animations/TextReveal";
import { ShieldCheck, Cpu, Eye, Scale, Sparkles } from "lucide-react";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Statistics counters animation
  useGSAP(
    () => {
      const stats = statsRef.current?.querySelectorAll(".stat-num");
      if (!stats) return;

      stats.forEach((stat) => {
        const val = parseInt(stat.getAttribute("data-value") || "0", 10);
        const suffix = stat.getAttribute("data-suffix") || "";

        gsap.fromTo(
          stat,
          { textContent: "0" },
          {
            textContent: val,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            modifiers: {
              textContent: (value) => {
                return Math.floor(value) + suffix;
              },
            },
          }
        );
      });

      // Pin left container on desktop scroll trigger
      const leftCol = containerRef.current?.querySelector(".sticky-col");
      if (leftCol && window.innerWidth >= 768) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 12%",
          end: "bottom 95%",
          pin: leftCol,
          pinSpacing: false,
        });
      }
    },
    { scope: containerRef }
  );

  const values = [
    {
      icon: Eye,
      title: "Uncompromising Transparency",
      desc: "Zero hidden charges, direct brokerage reporting, and immediate transaction ledger visibility.",
    },
    {
      icon: Cpu,
      title: "Technology First",
      desc: "Proprietary REST APIs, sub-millisecond execution, and high-performance Web/Mobile platforms.",
    },
    {
      icon: ShieldCheck,
      title: "Reliability & Trust",
      desc: "Over a decade of compliant wealth services backed by SEBI registration and strict safety checks.",
    },
    {
      icon: Scale,
      title: "Ethical Trading",
      desc: "Committed to investor education, transparent margin parameters, and fair-liquidation policies.",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full py-24 md:py-36 px-4 md:px-8 bg-background border-t border-white/5"
    >
      {/* Background radial glows */}
      <div className="absolute top-[30%] left-[5%] w-[45%] h-[45%] rounded-full radial-glow-gold pointer-events-none opacity-20 blur-[120px]" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 relative">
        {/* Left Sticky Column */}
        <div className="sticky-col h-fit flex flex-col items-start justify-start">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] text-white/50 tracking-widest uppercase mb-6">
            <Sparkles className="w-3 h-3 text-brand-teal" /> ABOUT MAITRA WEALTH
          </div>

          <TextReveal
            tag="h2"
            text="EMPOWERING INVESTORS WITH HIGH-SPEED TECHNOLOGY & DECADES OF TRUST"
            className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white mb-6 uppercase leading-tight"
          />

          <p className="text-white/60 font-light leading-relaxed mb-8 text-base">
            Maitra Commodities is one of India's premier brokerage houses, focused on
            delivering a direct, digitized, and highly robust investment environment. Whether
            you are an active algorithmic intraday trader or a long-term wealth investor, we
            give you the exact microsecond advantages, platforms, and transparency needed to conquer
            the stock markets.
          </p>

          <a
            href="https://maitrawealth.com/about-us/"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white border border-brand-teal/30 hover:bg-brand-teal hover:text-background transition-all duration-300 interactive"
          >
            Read Our Legacy
          </a>
        </div>

        {/* Right Scrolling Column */}
        <div className="flex flex-col gap-16">
          {/* Counters Grid */}
          <div
            ref={statsRef}
            className="grid grid-cols-3 gap-6 border-b border-white/5 pb-12 text-center"
          >
            <div className="flex flex-col">
              <span
                className="stat-num text-3xl sm:text-5xl font-display font-bold text-brand-teal tracking-tighter"
                data-value="10"
                data-suffix="+"
              >
                0
              </span>
              <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest mt-2">
                Years of Trust
              </span>
            </div>
            <div className="flex flex-col">
              <span
                className="stat-num text-3xl sm:text-5xl font-display font-bold text-brand-teal tracking-tighter"
                data-value="50"
                data-suffix="K"
              >
                0
              </span>
              <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest mt-2">
                Active Traders
              </span>
            </div>
            <div className="flex flex-col">
              <span
                className="stat-num text-3xl sm:text-5xl font-display font-bold text-brand-teal tracking-tighter"
                data-value="100"
                data-suffix="K"
              >
                0
              </span>
              <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest mt-2">
                Downloads
              </span>
            </div>
          </div>

          {/* Value Cards list */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xs uppercase tracking-[0.25em] text-brand-teal font-medium mb-2">
              Our Founding Principles
            </h3>

            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel glass-panel-hover p-6 rounded-2xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-[2px] h-0 bg-brand-teal group-hover:h-full transition-all duration-500" />
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-brand-teal group-hover:border-brand-teal/20 transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-display font-medium text-white mb-2">
                        {val.title}
                      </h4>
                      <p className="text-sm font-light text-white/50 leading-relaxed">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
