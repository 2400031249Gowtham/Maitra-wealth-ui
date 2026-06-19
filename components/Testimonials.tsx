"use client";

import { useState, useRef } from "react";
import { gsap } from "@/lib/gsap";
import TextReveal from "./animations/TextReveal";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const reviews = [
    {
      name: "Rohan Sharma",
      role: "Fintech Partner & Sub-Broker",
      avatar: "RS",
      text: "Maitra API infrastructure has revolutionized our sub-broker operations. The WebSocket feed is incredibly stable, and their flat Rs. 20 brokerage pricing model offers massive margins for our active client base.",
    },
    {
      name: "Sneha Patel",
      role: "Intraday Derivatives Trader",
      avatar: "SP",
      text: "I spent years trading with major traditional brokers, but the slippage was cutting into my profits. With Maitra Web and their collocated execution servers, my trades fill instantly. Highly recommended for intraday scalpers.",
    },
    {
      name: "Dr. Aravind Swamy",
      role: "Long-Term Mutual Fund Investor",
      avatar: "AS",
      text: "Unlike other platforms that leave you to talk to AI chatbots, Maitra provides direct phone access to wealth managers who actually understand market portfolios. The direct Mutual Funds portal is clean and commission-free.",
    },
    {
      name: "Priya Nair",
      role: "F&O Intraday Trader",
      avatar: "PN",
      text: "The e-KYC onboarding was fully completed in 5 minutes via Aadhaar NSDL e-Sign. Add margin fundings via UPI, select options directly from charts, and buy instantly. The workflow is incredibly premium.",
    },
  ];

  const handleSlideChange = (nextIdx: number) => {
    if (nextIdx < 0 || nextIdx >= reviews.length) return;

    const slider = sliderRef.current;
    if (!slider) return;

    // Slide transition animation
    gsap.fromTo(
      slider.querySelectorAll(".slide-content"),
      { opacity: 1, x: 0 },
      {
        opacity: 0,
        x: nextIdx > activeIdx ? -100 : 100,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          setActiveIdx(nextIdx);
          gsap.fromTo(
            slider.querySelectorAll(".slide-content"),
            { opacity: 0, x: nextIdx > activeIdx ? 100 : -100 },
            { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
          );
        },
      }
    );
  };

  return (
    <section
      id="testimonials"
      className="relative w-full py-24 md:py-36 px-4 md:px-8 bg-background border-t border-white/5"
    >
      {/* Background radial glows */}
      <div className="absolute top-[40%] left-[10%] w-[40%] h-[40%] rounded-full radial-glow-teal pointer-events-none opacity-20 blur-[100px]" />

      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] text-white/50 tracking-widest uppercase mb-6">
            CLIENT TRUST
          </span>
          <TextReveal
            tag="h2"
            text="ENDORSED BY ACTIVE TRADERS & SUB-BROKERS"
            className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white uppercase justify-center leading-none mb-6"
          />
        </div>

        {/* Carousel Panel */}
        <div
          ref={sliderRef}
          className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-2xl"
        >
          {/* Quote watermark */}
          <div className="absolute top-8 right-8 text-brand-teal/5 pointer-events-none select-none">
            <Quote className="w-24 h-24 stroke-[1px]" />
          </div>

          <div className="slide-content flex flex-col items-start min-h-[220px]">
            {/* Stars rating */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
              ))}
            </div>

            {/* Testimonial Quote text */}
            <p className="text-lg md:text-xl font-light text-white/80 leading-relaxed mb-8 select-none">
              "{reviews[activeIdx].text}"
            </p>

            {/* Author info */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-brand-teal font-display font-bold text-sm flex items-center justify-center">
                {reviews[activeIdx].avatar}
              </div>
              <div>
                <h4 className="text-base font-bold text-white leading-none">
                  {reviews[activeIdx].name}
                </h4>
                <span className="text-xs text-white/40 mt-1.5 block">
                  {reviews[activeIdx].role}
                </span>
              </div>
            </div>
          </div>

          {/* Nav Controls */}
          <div className="flex justify-between items-center mt-10 pt-8 border-t border-white/5">
            {/* Slide fraction count */}
            <div className="text-xs tracking-widest font-mono text-white/30">
              <span className="text-white font-bold">0{activeIdx + 1}</span> / 0{reviews.length}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => handleSlideChange(activeIdx - 1)}
                disabled={activeIdx === 0}
                className="w-10 h-10 rounded-full border border-white/10 hover:border-brand-teal/40 disabled:opacity-20 disabled:hover:border-white/10 transition-colors duration-300 text-white flex items-center justify-center bg-white/5 interactive"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleSlideChange(activeIdx + 1)}
                disabled={activeIdx === reviews.length - 1}
                className="w-10 h-10 rounded-full border border-white/10 hover:border-brand-teal/40 disabled:opacity-20 disabled:hover:border-white/10 transition-colors duration-300 text-white flex items-center justify-center bg-white/5 interactive"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
