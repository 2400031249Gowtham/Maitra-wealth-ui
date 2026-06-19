"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "@/lib/gsap";
import TextReveal from "./animations/TextReveal";
import { Smartphone, Monitor, Code, TrendingUp, HeartHandshake, ShieldCheck, ArrowRight } from "lucide-react";

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = containerRef.current?.querySelectorAll(".service-card");
      if (!cards) return;

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const products = [
    {
      icon: Monitor,
      title: "Maitra Web Portal",
      tagline: "High-Performance Web Trading",
      desc: "Instant HTML5 order placement, multi-screen charting, advanced indicator library, and real-time streaming quotes. Trade directly from your desktop web browser with zero lag.",
      link: "https://maitrawealth.com/our-products/",
    },
    {
      icon: Smartphone,
      title: "Smart Trader Mobile",
      tagline: "Mobile App for iOS & Android",
      desc: "Clean, intuitive UI, one-click watchlists, instant biometric login, multi-asset class trading (equity, derivatives, commodities, currency), and push alert notifications.",
      link: "https://maitrawealth.com/our-products/",
    },
    {
      icon: Code,
      title: "Maitra Express API",
      tagline: "Developer-First Algorithmic Suite",
      desc: "Robust REST APIs for automated trading, lightning-fast WebSocket data streams, full SDK support, and pre-built code templates. Deploy your custom algorithms effortlessly.",
      link: "https://maitrawealth.com/our-products/",
    },
    {
      icon: TrendingUp,
      title: "Mutual Funds & SIPs",
      tagline: "Automated Digital Investments",
      desc: "Invest in direct mutual funds, create automated Monthly Systematic Investment Plans (SIPs), track consolidated gains, and benefit from personalized portfolio recommendations.",
      link: "https://maitrawealth.com/our-products/",
    },
    {
      icon: ShieldCheck,
      title: "Maitra Wealth Insurance",
      tagline: "Complete Family & Asset Safety",
      desc: "Comprehensive Life, Health, and General Insurance policies tailored to secure your family's future, shield business operations, and preserve capital.",
      link: "https://maitrawealth.com/our-products/",
    },
    {
      icon: HeartHandshake,
      title: "Sub-Broker Partnerships",
      tagline: "Collaborative Fintech Network",
      desc: "Empower your local client base with our technical infrastructure, direct client onboarding tools, real-time revenue sharing dashboards, and complete back-office assistance.",
      link: "https://maitrawealth.com/our-products/",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative w-full py-24 md:py-36 px-4 md:px-8 bg-background border-t border-white/5"
    >
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-[5%] w-[45%] h-[45%] rounded-full radial-glow-teal pointer-events-none opacity-20 blur-[120px]" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] text-white/50 tracking-widest uppercase mb-6">
              PRODUCTS & SERVICES
            </div>
            <TextReveal
              tag="h2"
              text="A COMPLETE STACK OF TRADING & WEALTH SOLUTIONS"
              className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white uppercase leading-none"
            />
          </div>
          <p className="text-white/40 font-light text-sm md:text-base max-w-sm md:text-right">
            Harness advanced technologies and client-centric asset solutions tailored for the modern Indian market.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="service-card glass-panel glass-panel-hover p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden group flex flex-col justify-between min-h-[350px]"
              >
                {/* Accent glow corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-teal/5 rounded-full blur-2xl group-hover:bg-brand-teal/15 transition-all duration-500" />

                <div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-brand-teal inline-block mb-6 group-hover:border-brand-teal/20 transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-display font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-brand-teal font-medium mb-4">
                    {item.tagline}
                  </p>
                  <p className="text-sm font-light text-white/50 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-white/50 group-hover:text-brand-teal font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-300 interactive"
                  >
                    View Details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
