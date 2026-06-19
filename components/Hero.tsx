"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@/hooks/useGSAP";
import * as THREE from "three";
import MagneticButton from "./animations/MagneticButton";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Native Three.js WebGL Interactive Background (Stable under React 19)
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 250;
    camera.position.y = 80;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Wave Grid
    const numParticles = 1800;
    const positions = new Float32Array(numParticles * 3);
    const colors = new Float32Array(numParticles * 3);

    // Golden / Teal hybrid gradient colors
    const colorTeal = new THREE.Color("#00d2c4");
    const colorGold = new THREE.Color("#d4af37");

    const rows = 30;
    const cols = 60;
    const spacing = 12;

    for (let i = 0; i < numParticles; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;

      // Position centered grid
      const x = (col - cols / 2) * spacing;
      const z = (row - rows / 2) * spacing;
      const y = 0;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Blending colors across grid
      const ratio = col / cols;
      const mixedColor = new THREE.Color().copy(colorTeal).lerp(colorGold, ratio);

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle Material
    // Create canvas texture for smooth round particles instead of square blocks
    const createCircleTexture = () => {
      const pCanvas = document.createElement("canvas");
      pCanvas.width = 16;
      pCanvas.height = 16;
      const ctx = pCanvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        grad.addColorStop(0, "rgba(255,255,255,1)");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 16, 16);
      }
      return new THREE.CanvasTexture(pCanvas);
    };

    const material = new THREE.PointsMaterial({
      size: 4,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      map: createCircleTexture(),
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Dynamic wave animation parameters
    let time = 0;
    let mouseX = 0;
    let mouseY = 0;

    const animate = () => {
      requestAnimationFrame(animate);

      time += 0.015;
      const posArr = geometry.attributes.position.array as Float32Array;

      // Morph grid nodes into sin/cos waves
      for (let i = 0; i < numParticles; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;

        const index = i * 3 + 1; // Y Coordinate index
        const x = posArr[i * 3];
        const z = posArr[i * 3 + 2];

        // Complex multi-layered wave function
        posArr[index] =
          Math.sin(x * 0.015 + time) * 25 +
          Math.cos(z * 0.02 + time) * 15 +
          Math.sin((x + z) * 0.005 + time) * 10;
      }

      geometry.attributes.position.needsUpdate = true;

      // Slight rotation drift
      particles.rotation.y = time * 0.03 + mouseX * 0.0002;
      particles.rotation.x = 0.1 + mouseY * 0.0001;

      renderer.render(scene, camera);
    };

    animate();

    // Mouse movement integration
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX - window.innerWidth / 2;
      mouseY = e.clientY - window.innerHeight / 2;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Resize handling
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // GSAP Text Entry Animations
  useGSAP(
    () => {
      const headingText = headingRef.current?.querySelectorAll(".word");
      const subHeading = containerRef.current?.querySelector(".subheading");
      const ctas = ctaRef.current?.querySelectorAll(".cta-item");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: false,
        },
      });

      // Perspective scale scroll effect
      tl.to(headingRef.current, {
        y: -100,
        opacity: 0.1,
        scale: 0.95,
        ease: "none",
      }).to(
        canvasContainerRef.current,
        {
          y: -50,
          scale: 1.15,
          opacity: 0.2,
          ease: "none",
        },
        0
      );

      // Entrance timelines on mount (wait for preloader)
      const playEntrance = () => {
        const entry = gsap.timeline();
        if (headingText && headingText.length > 0) {
          entry.fromTo(
            headingText,
            { yPercent: 100, rotate: 2 },
            { yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.06, ease: "power4.out" }
          );
        }
        if (subHeading) {
          entry.fromTo(
            subHeading,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
            "-=0.6"
          );
        }
        if (ctas && ctas.length > 0) {
          entry.fromTo(
            ctas,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
            "-=0.6"
          );
        }
      };

      // Listen to site loaded event
      window.addEventListener("site-loaded", playEntrance);
      // Fallback in case loading is already done
      if (document.readyState === "complete") {
        setTimeout(playEntrance, 1000);
      }

      return () => {
        window.removeEventListener("site-loaded", playEntrance);
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-center items-center px-4 md:px-8 overflow-hidden bg-background"
    >
      {/* Mesh Grid overlay background */}
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

      {/* WebGL Particle Wave Environment */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 z-0 radial-glow-teal opacity-60"
      />

      {/* Floating Radial glow highlights */}
      <div className="absolute -top-[10%] left-[10%] w-[40%] h-[40%] rounded-full radial-glow-teal pointer-events-none opacity-40 blur-[100px]" />
      <div className="absolute -bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full radial-glow-gold pointer-events-none opacity-30 blur-[100px]" />

      {/* Main Content Area */}
      <div className="z-10 text-center max-w-5xl mt-16 px-4">
        {/* Subtitle tag */}
        <div className="subheading opacity-0 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-teal/20 bg-brand-teal/5 text-xs text-brand-teal tracking-[0.25em] uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
          Ultra-Premium Wealth Management
        </div>

        {/* Huge typography */}
        <h1
          ref={headingRef}
          className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tight text-white uppercase select-none leading-[0.9] flex flex-col mb-8"
        >
          <span className="overflow-hidden block py-1">
            <span className="word inline-block transform translate-y-[100%]">
              REDEFINE
            </span>
          </span>
          <span className="overflow-hidden block py-1 text-transparent bg-clip-text bg-gradient-to-r from-brand-teal via-white to-brand-gold">
            <span className="word inline-block transform translate-y-[100%]">
              YOUR WEALTH
            </span>
          </span>
        </h1>

        {/* Short value statement */}
        <p className="subheading opacity-0 max-w-2xl mx-auto text-base sm:text-xl font-light text-white/50 leading-relaxed mb-12">
          Experience Next-Generation Stock Trading & Portfolio Management. Low Brokerage,
          Advanced APIs, and State-Of-The-Art Tools backed by a decade of trust.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <MagneticButton className="cta-item opacity-0">
            <a
              href="https://maitrawealth.com/open-demat-account/"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider text-background bg-brand-teal shadow-[0_0_30px_rgba(0,210,196,0.3)] hover:scale-105 transition-all duration-300 flex items-center gap-2 interactive"
            >
              Get Started Now <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
          </MagneticButton>

          <MagneticButton className="cta-item opacity-0">
            <a
              href="#services"
              className="px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider text-white border border-white/10 hover:border-brand-teal/30 hover:bg-white/5 transition-all duration-300 flex items-center gap-2 interactive"
            >
              Explore Solutions
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Bottom scroll hint indicator */}
      <div className="absolute bottom-10 z-10 flex flex-col items-center text-[10px] uppercase tracking-[0.3em] text-white/30 gap-3">
        <span>Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-brand-teal animate-scroll-hint" style={{ animation: 'scrollHint 2s infinite ease-in-out' }} />
        </div>
      </div>

      <style jsx global>{`
        @keyframes scrollHint {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
      `}</style>
    </section>
  );
}
