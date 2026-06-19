"use client";

import { useEffect } from "react";
import PageTransition from "@/components/animations/PageTransition";
import Cursor from "@/components/animations/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import InvestmentSolutions from "@/components/InvestmentSolutions";
import WhyMaitra from "@/components/WhyMaitra";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  // Lock scroll during preloader loading phase
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const unlockScroll = () => {
      document.body.style.overflow = "unset";
    };

    window.addEventListener("site-loaded", unlockScroll);
    return () => window.removeEventListener("site-loaded", unlockScroll);
  }, []);

  // Initialize Lenis smooth scroll client-side
  useEffect(() => {
    let lenisInst: any;
    
    import("lenis").then(({ default: Lenis }) => {
      lenisInst = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
      });

      function raf(time: number) {
        if (lenisInst) {
          lenisInst.raf(time);
          requestAnimationFrame(raf);
        }
      }

      requestAnimationFrame(raf);
    });

    return () => {
      if (lenisInst) {
        lenisInst.destroy();
      }
    };
  }, []);

  return (
    <>
      {/* Grainy premium overlay and grid background mesh */}
      <div className="noise-overlay" />
      <div className="fixed inset-0 grid-overlay opacity-[0.015] pointer-events-none z-0" />

      {/* Loading Sequence Preloader */}
      <PageTransition />

      {/* Floating Elements */}
      <Cursor />
      <Navbar />

      {/* Redesigned sections compost */}
      <main className="relative z-10 w-full overflow-hidden">
        <Hero />
        <About />
        <Services />
        <InvestmentSolutions />
        <WhyMaitra />
        <Process />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

