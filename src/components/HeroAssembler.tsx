"use client";

import { useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo3D from "./Logo3D";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroAssembler() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  
  // Hook State elements (Desktop only)
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLDivElement>(null);
  const leftBadgeRef = useRef<HTMLDivElement>(null);
  const rightBadgeRef = useRef<HTMLDivElement>(null);

  // Assemble State elements
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const heroLabelRef = useRef<HTMLSpanElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroDescRef = useRef<HTMLParagraphElement>(null);
  const heroBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !stickyRef.current || !bgImageRef.current) return;

    const mm = gsap.matchMedia();
    const container = containerRef.current;
    const sticky = stickyRef.current;

    // Run scroll-pinned animations only on desktop screens
    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=120%", // Pins for 120% scroll height
          pin: sticky, // Pin the inner sticky wrapper
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // --- PHASE 1: DISASSEMBLE HOOK STATE (Scroll 0% -> 45%) ---
      
      // Center logo and canvas fade out, shrink, and slide up
      tl.to(logoContainerRef.current, {
        scale: 0.75,
        opacity: 0,
        y: -50,
        filter: "blur(8px)",
        ease: "power2.inOut",
      }, 0);

      // Slide and fade out left hook card
      tl.to(leftBadgeRef.current, {
        x: -250,
        opacity: 0,
        filter: "blur(6px)",
        ease: "power2.inOut",
      }, 0);

      // Slide and fade out right hook card
      tl.to(rightBadgeRef.current, {
        x: 250,
        opacity: 0,
        filter: "blur(6px)",
        ease: "power2.inOut",
      }, 0);

      // Room background scale resolves from zoom (1.15) to normal (1.0)
      tl.to(bgImageRef.current, {
        scale: 1.0,
        opacity: 1.0,
        ease: "none",
      }, 0);

      // Room background blur resolves from 16px to 0px
      tl.to(bgImageRef.current, {
        filter: "blur(0px)",
        ease: "power1.out",
      }, 0);

      // --- PHASE 2: ASSEMBLE LANDING HERO (Scroll 45% -> 120%) ---
      
      // Main copy text box slides in and fades in
      tl.to(heroContainerRef.current, {
        opacity: 1,
        x: 0,
        ease: "power2.out",
      }, 0.45);

      // TIMELESS ELEGANCE label fades and rises
      tl.fromTo(heroLabelRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out" },
        0.55
      );

      // Classic Wood Wall Art heading fades and rises
      tl.fromTo(heroTitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out" },
        0.65
      );

      // Description text paragraph fades and rises
      tl.fromTo(heroDescRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out" },
        0.78
      );

      // Discover Collections CTA button scales and slides in
      tl.fromTo(heroBtnRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1.0, opacity: 1, ease: "back.out(1.7)" },
        0.92
      );
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-auto lg:h-[220vh] bg-[#FDFBF7] overflow-hidden">
      {/* Sticky Inner Viewport Frame (stretches to fill screen on desktop, relative container on mobile) */}
      <div 
        ref={stickyRef} 
        className="w-full min-h-[500px] lg:h-screen relative flex items-center justify-center overflow-hidden z-10 py-12 lg:py-0"
      >
        {/* Background Room Layer (unblurred on mobile, blurred initially on desktop) */}
        <div className="absolute inset-0 z-0 bg-[#120E0B]">
          <img
            ref={bgImageRef}
            src="/images/hero_interior.png"
            alt="Bespoke luxury wood art on wall"
            className="w-full h-full object-cover scale-100 lg:scale-[1.15] filter blur-none lg:blur-[16px] opacity-100 lg:opacity-75 transition-all duration-300"
          />
          <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        </div>

        {/* ==========================================
            SCENE 1: HOOK STATE (Initial Viewport - Desktop Only)
            ========================================== */}
        
        {/* Center Canvas & Logo */}
        <div 
          ref={logoContainerRef} 
          className="absolute inset-0 w-full h-full z-20 flex-col items-center justify-center pointer-events-none select-none hidden lg:flex"
        >
          <div className="w-[260px] h-[260px] md:w-[380px] md:h-[380px]">
            <Canvas camera={{ fov: 45, position: [0, 0, 1.8] }}>
              <ambientLight intensity={1.5} />
              <directionalLight position={[3, 4, 5]} intensity={3.5} />
              <directionalLight position={[-4, 5, -2]} intensity={2.0} color="#F5E3A9" />
              <pointLight position={[0, -2.5, 1.5]} intensity={2.5} color="#FFD700" />
              <Suspense fallback={null}>
                <Logo3D color="#D4A373" metalness={0.1} roughness={0.35} texturePath="/textures/satinwood_wave.png" />
              </Suspense>
            </Canvas>
          </div>
          <div ref={logoTextRef} className="text-center mt-2 px-6">
            <h2 className="font-serif text-3xl md:text-5xl font-black text-[#FDFBF7] tracking-[0.3em] uppercase leading-none mb-3">
              Woodpecker
            </h2>
            <p className="font-sans text-[9px] md:text-xs text-warm-cedar tracking-[0.4em] uppercase font-bold">
              Bespoke Handmade Wood Wall Art
            </p>
          </div>
        </div>

        {/* Left Hook Card - Timber Provenance */}
        <div 
          ref={leftBadgeRef}
          className="absolute left-6 md:left-12 lg:left-24 top-1/2 -translate-y-1/2 z-20 max-w-[280px] bg-[#120e0b]/60 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] text-white shadow-2xl pointer-events-none hidden lg:block"
        >
          <span className="text-[9px] text-[#C47A46] uppercase tracking-widest font-bold block mb-1">PROVENANCE</span>
          <h4 className="font-serif text-lg font-bold mb-2 text-white">100% Sri Lankan Teak</h4>
          <p className="text-xs text-white/70 leading-relaxed font-medium">
            Each masterpiece is hand-chiselled from reclaimed timber, carrying raw organic energy and centuries of growth.
          </p>
        </div>

        {/* Right Hook Card - Acoustic Harmony */}
        <div 
          ref={rightBadgeRef}
          className="absolute right-6 md:right-12 lg:right-24 top-1/2 -translate-y-1/2 z-20 max-w-[280px] bg-[#120e0b]/60 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] text-white shadow-2xl pointer-events-none hidden lg:block"
        >
          <span className="text-[9px] text-[#C47A46] uppercase tracking-widest font-bold block mb-1">ACOUSTICS</span>
          <h4 className="font-serif text-lg font-bold mb-2 text-white">Sculptural Harmony</h4>
          <p className="text-xs text-white/70 leading-relaxed font-medium">
            Designed with bespoke geometric deflection contours that serve as natural acoustic sound diffusers.
          </p>
        </div>


        {/* ==========================================
            SCENE 2: ASSEMBLE STATE (Final Viewport - Responsive layout)
            ========================================== */}
        
        {/* Main Copy Card */}
        <div 
          ref={heroContainerRef}
          className="absolute z-30 w-full max-w-7xl mx-auto px-6 md:px-12 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-start opacity-100 lg:opacity-0 lg:translate-x-[-100px] pointer-events-none"
        >
          <div className="w-full max-w-2xl bg-white/95 backdrop-blur p-6 sm:p-8 md:p-12 rounded-[2rem] shadow-2xl border border-black/5 pointer-events-auto">
            <span 
              ref={heroLabelRef} 
              className="font-sans text-[10px] text-warm-cedar uppercase tracking-[0.25em] font-bold block mb-3 lg:opacity-0"
            >
              TIMELESS ELEGANCE
            </span>
            <h1 
              ref={heroTitleRef} 
              className="font-serif text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight text-[#261B14] mb-4 lg:opacity-0"
            >
              Classic Wood Wall Art Crafted for Premium Spaces
            </h1>
            <p 
              ref={heroDescRef} 
              className="font-sans text-xs sm:text-sm text-black/60 leading-relaxed mb-6 lg:opacity-0"
            >
              Hand-chiselled masterpieces sourced from sustainably reclaimed Sri Lankan timbers. Designed to bring organic energy, acoustic dampening, and sculptural beauty to modern walls.
            </p>
            <div ref={heroBtnRef} className="lg:opacity-0">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 bg-[#C47A46] text-white px-8 py-3.5 rounded-full font-sans text-xs font-bold tracking-widest uppercase hover:bg-black transition-all shadow-lg"
              >
                Discover Collections <ArrowRight className="w-4.5 h-4.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
