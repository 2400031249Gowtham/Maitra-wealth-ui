"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "@/lib/gsap";
import TextReveal from "./animations/TextReveal";
import { UserPlus, Fingerprint, FileText, CheckCircle, Rocket } from "lucide-react";

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const line = lineRef.current;
      const steps = containerRef.current?.querySelectorAll(".step-node");
      if (!line || !steps) return;

      // Draw the connection line as scroll scrub
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 40%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );

      // Fade steps in as their marker is passed
      steps.forEach((step) => {
        const marker = step.querySelector(".step-marker");
        const details = step.querySelector(".step-details");

        gsap.fromTo(
          [marker, details],
          { opacity: 0.1, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            scrollTrigger: {
              trigger: step,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  const steps = [
    {
      icon: UserPlus,
      num: "01",
      title: "Fill Contact Information",
      desc: "Provide basic identity credentials (name, email, active phone number) on our e-KYC signup page to begin the secure registration tunnel.",
    },
    {
      icon: Fingerprint,
      num: "02",
      title: "Secure KYC Verification",
      desc: "Authenticate your credentials using digital PAN checks. Provide secure identity confirmations using web IPV (in-person-verification) camera loops.",
    },
    {
      icon: FileText,
      num: "03",
      title: "Upload Supporting Documents",
      desc: "Quickly upload standard proofs (scanned signature, bank statement or cancelled cheque, and address verification documents) onto our portal.",
    },
    {
      icon: CheckCircle,
      num: "04",
      title: "Aadhaar e-Sign Validation",
      desc: "Validate and complete your applications using Indian Aadhaar OTP integration via the official NSDL secure gateway. Completely digital, paperless signatures.",
    },
    {
      icon: Rocket,
      num: "05",
      title: "Activation & Immediate Trading",
      desc: "Receive trading logins, download Smart Trader app or open Maitra Web, instantly add funds via UPI/Netbanking, and commence active market operations.",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="process"
      className="relative w-full py-24 md:py-36 px-4 md:px-8 bg-brand-dark-200 border-t border-white/5"
    >
      {/* Background glowing rings */}
      <div className="absolute top-[20%] right-[10%] w-[35%] h-[35%] rounded-full radial-glow-gold pointer-events-none opacity-15 blur-[120px]" />

      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 md:mb-28">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] text-white/50 tracking-widest uppercase mb-6">
            DIGITAL ONBOARDING
          </span>
          <TextReveal
            tag="h2"
            text="OPEN AN ACCOUNT IN 5 MINUTES"
            className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white uppercase justify-center leading-none mb-6"
          />
          <p className="text-white/40 font-light text-sm sm:text-base">
            No paperwork. No courier delays. Completely digital onboarding system designed to get you trading immediately.
          </p>
        </div>

        {/* Steps container */}
        <div className="relative pl-6 sm:pl-0 sm:grid sm:grid-cols-12 gap-8 items-stretch">
          
          {/* Vertical connecting line */}
          <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-[2px] bg-white/10 -translate-x-1/2 z-0">
            <div
              ref={lineRef}
              className="w-full h-full bg-gradient-to-b from-brand-teal via-brand-teal to-brand-gold origin-top transform scale-y-0"
            />
          </div>

          {/* Render individual step rows */}
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={idx}
                className="step-node relative sm:col-span-12 grid sm:grid-cols-12 items-center gap-8 mb-16 last:mb-0"
              >
                {/* Node details */}
                <div
                  className={`step-details flex flex-col items-start col-span-5 ${
                    isEven ? "sm:text-right sm:items-end sm:col-start-1" : "sm:col-start-8"
                  }`}
                >
                  <span className="text-brand-teal font-mono text-xs uppercase tracking-wider mb-2">
                    Step {step.num}
                  </span>
                  <h3 className="text-xl font-display font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm font-light text-white/40 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Central glowing icon node */}
                <div className="step-marker absolute left-0 sm:left-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-full bg-brand-dark-300 border-2 border-white/20 text-white flex items-center justify-center col-span-2 group-hover:border-brand-teal transition-all duration-300">
                  <Icon className="w-5 h-5 text-brand-teal text-glow-teal" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
