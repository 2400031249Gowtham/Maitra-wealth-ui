"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import MagneticButton from "./animations/MagneticButton";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // Auto-hide/show navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const navbar = navbarRef.current;

      if (!navbar) return;

      if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
        // Scroll Down - Hide
        gsap.to(navbar, { y: -100, opacity: 0, duration: 0.3, ease: "power2.inOut" });
      } else {
        // Scroll Up - Show
        gsap.to(navbar, { y: 0, opacity: 1, duration: 0.3, ease: "power2.inOut" });
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animating mobile/hamburger menu reveal
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (isOpen) {
      gsap.to(menu, {
        clipPath: "circle(150% at 90% 10%)",
        duration: 0.8,
        ease: "power4.inOut",
      });

      // Stagger menu items
      gsap.fromTo(
        menu.querySelectorAll(".menu-item"),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out", delay: 0.3 }
      );
    } else {
      gsap.to(menu, {
        clipPath: "circle(0% at 90% 10%)",
        duration: 0.8,
        ease: "power4.inOut",
      });
    }
  }, [isOpen]);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Products & Services", href: "#services" },
    { name: "Solutions", href: "#solutions" },
    { name: "Why Maitra", href: "#why-maitra" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Floating Navbar wrapper */}
      <div
        ref={navbarRef}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 md:px-8 pointer-events-none"
      >
        <nav className="w-full max-w-6xl h-16 flex items-center justify-between px-6 rounded-full glass-panel pointer-events-auto shadow-2xl relative">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 text-xl font-display font-black tracking-tight text-white interactive"
          >
            <span className="text-brand-teal text-glow-teal font-light">M</span>
            <span>MAITRA</span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8 text-sm font-light text-white/70">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-brand-teal transition-colors duration-300 relative group py-2 interactive"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-teal transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA & Mobile Trigger */}
          <div className="flex items-center gap-4">
            <MagneticButton className="hidden sm:block">
              <a
                href="https://maitrawealth.com/open-demat-account/"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-background bg-white hover:bg-brand-teal hover:text-background transition-all duration-300 flex items-center gap-1.5 interactive border border-white"
              >
                Open Demat <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </MagneticButton>

            {/* Menu Trigger Icon */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:border-brand-teal/40 transition-colors duration-300 text-white bg-white/5 interactive"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Fullscreen Mobile/Overlay Navigation Menu */}
      <div
        ref={menuRef}
        style={{ clipPath: "circle(0% at 90% 10%)" }}
        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl flex flex-col justify-between p-8 md:p-16 pointer-events-auto"
      >
        <div className="flex justify-between items-center text-xs tracking-[0.2em] text-white/40 uppercase">
          <div>NAVIGATION</div>
          <div>MAITRA WEALTH</div>
        </div>

        {/* Menu link lists */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mt-20">
          <div className="flex flex-col gap-6 text-4xl md:text-6xl font-display font-light">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="menu-item text-white hover:text-brand-teal transition-all duration-300 flex items-baseline gap-4 group interactive"
              >
                <span className="text-xs font-mono text-brand-teal/50">0{navLinks.indexOf(link) + 1}.</span>
                <span className="group-hover:translate-x-3 transition-transform duration-300">
                  {link.name}
                </span>
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-8 text-sm font-light text-white/50 w-full md:w-1/3">
            <div className="menu-item">
              <h4 className="text-xs uppercase tracking-widest text-brand-teal font-medium mb-2">Office Address</h4>
              <p className="leading-relaxed">
                Maitra Commodities, No.1, First Floor,<br />
                Muniappa Road, Kilpauk,<br />
                Chennai - 600010, Tamil Nadu, India.
              </p>
            </div>
            <div className="menu-item">
              <h4 className="text-xs uppercase tracking-widest text-brand-teal font-medium mb-2">General Inquiries</h4>
              <p>Email: support@maitracommodities.com</p>
              <p>Phone: +91 44 4006 8282</p>
            </div>
          </div>
        </div>

        {/* Bottom credits */}
        <div className="flex justify-between items-center text-xs tracking-wider text-white/30 border-t border-white/5 pt-8">
          <div>© 2026 Maitra Commodities. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </>
  );
}
