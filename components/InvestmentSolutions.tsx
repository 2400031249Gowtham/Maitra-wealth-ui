"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "@/lib/gsap";
import { TrendingUp, Award, Zap, HeartHandshake, ArrowRight } from "lucide-react";

export default function InvestmentSolutions() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const panels = containerRef.current?.querySelectorAll(".scroll-panel");
      if (!panels || panels.length === 0) return;

      const totalPanels = panels.length;
      
      // Horizontal Scroll Timeline
      gsap.to(containerRef.current, {
        x: () => -(containerRef.current!.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${containerRef.current!.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // Stagger entrance of inner contents during horizontal pass
      panels.forEach((panel) => {
        gsap.fromTo(
          panel.querySelector(".panel-content"),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: gsap.getById("horizontalTimeline"), // Wait, standard hook is safe
              start: "left 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  const solutions = [
    {
      icon: Zap,
      num: "01",
      title: "Intraday & F&O Execution",
      subtitle: "Microsecond Advantage",
      desc: "Get ultra-low latency executions on stocks, indices, and commodities. With sub-millisecond execution times and robust order books, maximize your short-term trade opportunities.",
      features: ["Advanced bracket orders", "Direct chart trading", "Custom hotkeys"],
    },
    {
      icon: TrendingUp,
      num: "02",
      title: "Long-Term Mutual Advisory",
      subtitle: "Wealth Multiplication",
      desc: "Build highly diversified portfolios across top index funds, active equity funds, and gold ETFs. Take control of your long-term life plans using smart, tax-saving SIP plans.",
      features: ["Auto-balancing models", "Zero-commission plans", "Consolidated reporting"],
    },
    {
      icon: Award,
      num: "03",
      title: "High-Performance APIs",
      subtitle: "Algorithmic Automations",
      desc: "Integrate python, node, or binary systems with our lightning-fast Express APIs. Get zero-latency WebSocket tick-by-tick market feeds and automate your trading systems completely free.",
      features: ["SDK support in python/JS", "99.99% WebSocket uptime", "Free sandboxing credentials"],
    },
    {
      icon: HeartHandshake,
      num: "04",
      title: "Dedicated Human Assistance",
      subtitle: "Relationship Advisory",
      desc: "Skip long chatbot delays and automated email loops. Access dedicated relationship managers who handle queries on margins, KYC, updates, and trade executions instantly.",
      features: ["Zero chatbot loops", "Fast phone connectivity", "Direct desk execution"],
    },
  ];

  return (
    <div ref={sectionRef} id="solutions" className="relative bg-brand-dark-200 overflow-hidden">
      {/* Absolute title banner that stays fixed */}
      <div className="absolute top-16 left-6 md:left-12 z-20">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] text-white/50 tracking-widest uppercase mb-4">
          INVESTMENT SOLUTIONS
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white uppercase">
          ENGINEERED FOR WEALTH CREATION
        </h2>
      </div>

      {/* Horizontal Scroll Panels Container */}
      <div
        ref={containerRef}
        className="flex h-screen items-center"
        style={{ width: `${solutions.length * 100}vw` }}
      >
        {solutions.map((sol, index) => {
          const Icon = sol.icon;
          return (
            <div
              key={index}
              className="scroll-panel w-screen h-full flex items-center justify-center px-6 md:px-20 pt-20"
            >
              <div className="panel-content w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                {/* Visual Number on Left */}
                <div className="md:col-span-4 flex flex-col justify-center select-none relative">
                  <div className="text-[12rem] sm:text-[16rem] font-display font-black text-white/5 leading-none tracking-tighter">
                    {sol.num}
                  </div>
                  <div className="absolute top-1/2 left-4 -translate-y-1/2 p-6 rounded-3xl bg-brand-teal/5 border border-brand-teal/10 text-brand-teal">
                    <Icon className="w-12 h-12" />
                  </div>
                </div>

                {/* Narrative details on Right */}
                <div className="md:col-span-8 flex flex-col items-start">
                  <span className="text-brand-teal uppercase tracking-widest font-mono text-sm mb-2">
                    {sol.subtitle}
                  </span>
                  <h3 className="text-3xl sm:text-5xl font-display font-bold text-white mb-6">
                    {sol.title}
                  </h3>
                  <p className="text-white/60 font-light leading-relaxed mb-8 text-base sm:text-lg">
                    {sol.desc}
                  </p>

                  {/* Bullet points */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                    {sol.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white/80 font-medium tracking-wide flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
                        {feat}
                      </div>
                    ))}
                  </div>

                  <a
                    href="https://maitrawealth.com/our-products/"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-teal hover:underline interactive"
                  >
                    Get solution details <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
