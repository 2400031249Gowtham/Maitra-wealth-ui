"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "@/lib/gsap";
import TextReveal from "./animations/TextReveal";
import MagneticButton from "./animations/MagneticButton";
import { Phone, Mail, MapPin, Send, ArrowUpRight } from "lucide-react";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      // Fade-in columns
      const cols = containerRef.current?.querySelectorAll(".contact-col");
      if (cols) {
        gsap.fromTo(
          cols,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate premium submit transition
    gsap.to(e.currentTarget, {
      opacity: 0.5,
      y: -5,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      },
    });
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative w-full py-24 md:py-36 px-4 md:px-8 bg-brand-dark-200 border-t border-white/5"
    >
      {/* Radial glow background details */}
      <div className="absolute top-[30%] left-[20%] w-[35%] h-[35%] rounded-full radial-glow-teal pointer-events-none opacity-20 blur-[100px]" />
      <div className="absolute bottom-[20%] right-[10%] w-[35%] h-[35%] rounded-full radial-glow-gold pointer-events-none opacity-15 blur-[100px]" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 relative">
        
        {/* Left Column (Details) */}
        <div className="contact-col md:col-span-5 flex flex-col justify-between">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] text-white/50 tracking-widest uppercase mb-6">
              GET IN TOUCH
            </span>
            <TextReveal
              tag="h2"
              text="CONNECT WITH OUR WEALTH ADVISORS"
              className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white uppercase leading-none mb-6"
            />
            <p className="text-white/40 font-light leading-relaxed mb-8">
              Have questions regarding account opening, brokerage structures, compliance, or APIs? Complete the form and our executives will coordinate directly.
            </p>
          </div>

          {/* Contact Details Stack */}
          <div className="space-y-6">
            <a
              href="tel:+914440068282"
              className="flex items-center gap-4 group interactive"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 text-brand-teal flex items-center justify-center group-hover:border-brand-teal/20 transition-all duration-300">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-white/30 uppercase tracking-wider block">Call Direct</span>
                <span className="text-white group-hover:text-brand-teal transition-colors">+91 44 4006 8282</span>
              </div>
            </a>

            <a
              href="mailto:support@maitracommodities.com"
              className="flex items-center gap-4 group interactive"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 text-brand-teal flex items-center justify-center group-hover:border-brand-teal/20 transition-all duration-300">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-white/30 uppercase tracking-wider block">Email Support</span>
                <span className="text-white group-hover:text-brand-teal transition-colors">support@maitracommodities.com</span>
              </div>
            </a>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 text-brand-teal flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-white/30 uppercase tracking-wider block">Headquarters</span>
                <span className="text-white text-sm font-light">No.1, First Floor, Muniappa Road, Kilpauk, Chennai - 600010.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Form) */}
        <div className="contact-col md:col-span-7">
          <div className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden shadow-2xl">
            {submitted ? (
              <div className="text-center py-12 flex flex-col items-center justify-center select-none">
                <div className="w-16 h-16 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-brand-teal flex items-center justify-center mb-6">
                  <ArrowUpRight className="w-8 h-8 rotate-45" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">Message Dispatched</h3>
                <p className="text-sm font-light text-white/40 max-w-sm mx-auto">
                  Our wealth coordinators have logged your query and will contact you via phone or email shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-xs font-semibold text-brand-teal uppercase tracking-widest hover:underline interactive"
                >
                  Submit Another Form
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs text-white/40 uppercase tracking-widest">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Verma"
                      className="px-5 py-4 rounded-xl bg-white/5 border border-white/5 text-white placeholder-white/20 focus:outline-none focus:border-brand-teal/40 focus:bg-white/10 transition-all duration-300 interactive text-sm"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-xs text-white/40 uppercase tracking-widest">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="px-5 py-4 rounded-xl bg-white/5 border border-white/5 text-white placeholder-white/20 focus:outline-none focus:border-brand-teal/40 focus:bg-white/10 transition-all duration-300 interactive text-sm"
                    />
                  </div>
                </div>

                {/* Email field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs text-white/40 uppercase tracking-widest">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. rahul@example.com"
                    className="px-5 py-4 rounded-xl bg-white/5 border border-white/5 text-white placeholder-white/20 focus:outline-none focus:border-brand-teal/40 focus:bg-white/10 transition-all duration-300 interactive text-sm w-full"
                  />
                </div>

                {/* Subject field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-xs text-white/40 uppercase tracking-widest">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Algorithmic API Access / Account Opening"
                    className="px-5 py-4 rounded-xl bg-white/5 border border-white/5 text-white placeholder-white/20 focus:outline-none focus:border-brand-teal/40 focus:bg-white/10 transition-all duration-300 interactive text-sm w-full"
                  />
                </div>

                {/* Message field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs text-white/40 uppercase tracking-widest">Your Message</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Type details of your inquiry here..."
                    className="px-5 py-4 rounded-xl bg-white/5 border border-white/5 text-white placeholder-white/20 focus:outline-none focus:border-brand-teal/40 focus:bg-white/10 transition-all duration-300 interactive text-sm w-full resize-none"
                  />
                </div>

                {/* Submit button */}
                <MagneticButton className="w-full">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-xs font-semibold uppercase tracking-widest text-background bg-white hover:bg-brand-teal hover:text-background transition-all duration-300 flex items-center justify-center gap-2 interactive"
                  >
                    Send Query <Send className="w-3.5 h-3.5" />
                  </button>
                </MagneticButton>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
