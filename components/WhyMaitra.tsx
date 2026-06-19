"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import TextReveal from "./animations/TextReveal";
import { CirclePercent, ShieldCheck, Flame, Users } from "lucide-react";

export default function WhyMaitra() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Pin Left Column on Desktop
      if (leftColRef.current && window.innerWidth >= 768) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 15%",
          end: "bottom 90%",
          pin: leftColRef.current,
          pinSpacing: false,
        });
      }

      // Stagger right items trigger
      const cards = containerRef.current?.querySelectorAll(".value-prop-card");
      if (cards) {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, x: 50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }
    },
    { scope: containerRef }
  );

  const propositions = [
    {
      icon: CirclePercent,
      title: "Micro Brokerage Structure",
      desc: "Save up to 90% on transaction margins compared to traditional stockbrokers. Get flat Rs. 20 per trade pricing across Equity Intraday, Futures, Options, and Commodities segments.",
    },
    {
      icon: ShieldCheck,
      title: "Ironclad Security Infrastructure",
      desc: "Your trades and investments are safeguarded by advanced encryption, dual-factor authentication, and direct CDSL vault integrations. Certified by SEBI compliance audit protocols.",
    },
    {
      icon: Flame,
      title: "Sub-Millisecond Engine Speed",
      desc: "Execute trades at lightning fast speeds. Our server nodes are colocated near leading exchange engines (NSE, BSE, MCX) to minimize tick slip and lock optimal execution entries.",
    },
    {
      icon: Users,
      title: "Decade of Trading Trust",
      desc: "Over 10 years of consistent, transparent wealth services. Join our community of over 50,000 active Indian traders who count on Maitra for uncompromised market access.",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="why-maitra"
      className="relative w-full py-24 md:py-36 px-4 md:px-8 bg-background border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 relative">
        
        {/* Left column (sticky showcase) */}
        <div ref={leftColRef} className="h-fit flex flex-col justify-start items-start">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] text-white/50 tracking-widest uppercase mb-6">
            WHY MAITRA WEALTH
          </span>
          <TextReveal
            tag="h2"
            text="THE ADVANTAGES OF A DIGITALLY SUPERIOR SYSTEM"
            className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white uppercase leading-none mb-8"
          />

          {/* Interactive glassmorphic visual representation of live data feeds */}
          <div className="w-full aspect-video rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 relative overflow-hidden group select-none">
            {/* Background glowing rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-brand-teal/20 radial-glow-teal animate-pulse-slow" />
            
            {/* Layout simulation data grid */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="text-[10px] text-white/30 tracking-widest uppercase">
                LATENCY MONITOR
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/50">Maitra Express API</span>
                <span className="text-brand-teal font-mono">0.8ms (Stable)</span>
              </div>
              <div className="w-full bg-white/5 h-[3px] rounded-full overflow-hidden">
                <div className="w-[85%] bg-brand-teal h-full" />
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-white/50">Order Execution Speed</span>
                <span className="text-brand-teal font-mono">1.2ms (Ultra Fast)</span>
              </div>
              <div className="w-full bg-white/5 h-[3px] rounded-full overflow-hidden">
                <div className="w-[90%] bg-brand-teal h-full" />
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-white/50">Data Stream Delay</span>
                <span className="text-brand-teal font-mono">0.0ms (Real-Time)</span>
              </div>
              <div className="w-full bg-white/5 h-[3px] rounded-full overflow-hidden">
                <div className="w-full bg-brand-teal h-full animate-pulse" />
              </div>
            </div>

            {/* Glowing brand watermark */}
            <div className="absolute bottom-6 right-6 text-[10px] font-bold text-white/10 tracking-[0.2em] uppercase">
              MAITRA ENGINE
            </div>
          </div>
        </div>

        {/* Right column (narrative scroll list) */}
        <div className="flex flex-col gap-8">
          {propositions.map((prop, idx) => {
            const Icon = prop.icon;
            return (
              <div
                key={idx}
                className="value-prop-card glass-panel glass-panel-hover p-8 rounded-3xl relative overflow-hidden group transition-all duration-500"
              >
                {/* Micro accent top line */}
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-brand-teal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex items-start gap-5">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-brand-teal group-hover:border-brand-teal/30 transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-brand-teal transition-colors">
                      {prop.title}
                    </h3>
                    <p className="text-sm font-light text-white/50 leading-relaxed">
                      {prop.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
