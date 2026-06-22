"use client";

import { useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WoodArtMesh from "./WoodArtMesh";

gsap.registerPlugin(ScrollTrigger);

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<{ z: number }>({ z: 1.5 }); // Initial camera distance (macro view of wood grain)

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current || !cardRef.current) return;

    const mm = gsap.matchMedia();
    const container = containerRef.current;
    const canvasWrapper = canvasRef.current;
    const card = cardRef.current;

    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=120%", // Pins for 120% scroll height
          pin: canvasWrapper, // Pin the outer wrapper
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Camera zooms in to the wood art mesh texture
      tl.to(cameraRef.current, {
        z: 0.12,
        ease: "power2.inOut",
      }, 0);

      // Expand card to full viewport
      tl.to(card, {
        scale: 1.0,
        borderRadius: "0px",
        borderWidth: "0px",
        ease: "none",
      }, 0);

      // Reduce wrapper padding to 0px
      tl.to(canvasWrapper, {
        padding: "0px",
        ease: "none",
      }, 0);

      // Fade out header text and scroll indicators
      tl.to(".hero-text", {
        opacity: 0,
        y: -60,
        filter: "blur(10px)",
        ease: "power1.out",
      }, 0);

      tl.to(".scroll-indicator", {
        opacity: 0,
        y: 40,
        ease: "power1.out",
      }, 0);
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[220vh] bg-[#FDFBF7] overflow-hidden">
      {/* Outer Padding Wrapper for Scroll Pinning */}
      <div 
        ref={canvasRef} 
        className="w-full h-screen relative flex items-center justify-center overflow-hidden z-10 p-0 lg:p-10"
      >
        
        {/* Giant Background Lettering (overlapping design aspect) */}
        <div className="absolute inset-0 flex items-center justify-between pointer-events-none select-none px-4 md:px-16 hero-text z-0">
          <span className="font-sans text-[12vw] font-black text-[#EBE6DC] leading-none uppercase">
            wood
          </span>
          <span className="font-sans text-[12vw] font-black text-[#EBE6DC] leading-none uppercase">
            art
          </span>
        </div>

        {/* Elevated 3D Showcase Container Frame (Expands to Full-Screen on Scroll) */}
        <div 
          ref={cardRef}
          className="showcase-container relative w-full h-full bg-white border-solid border-0 lg:border-[16px] border-[#EBE6DC] rounded-none lg:rounded-[40px] scale-100 lg:scale-[0.90] flex flex-col justify-between overflow-hidden shadow-2xl z-20 origin-center"
        >
          {/* Three.js Canvas */}
          <div className="absolute inset-0 z-10">
            <Canvas
              camera={{ fov: 60, position: [0, 0, 1.5] }}
              onCreated={({ camera }) => {
                const animate = () => {
                  camera.position.z = cameraRef.current.z;
                  requestAnimationFrame(animate);
                };
                animate();
              }}
            >
              <ambientLight intensity={1.8} />
              <directionalLight position={[3, 4, 5]} intensity={4.0} />
              <Suspense fallback={null}>
                <WoodArtMesh cameraZ={cameraRef.current.z} />
              </Suspense>
            </Canvas>
          </div>

          {/* Floating UI Info Badges (within the scaling card frame) */}
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-white/95 backdrop-blur border border-black/5 p-4 rounded-2xl shadow-lg max-w-[240px] pointer-events-none hidden sm:block z-30">
            <p className="font-sans text-[9px] uppercase tracking-widest text-[#C47A46] font-bold mb-1">Authentic Craft</p>
            <p className="font-serif text-sm text-[#261B14] font-bold">100% Sri Lankan Teak</p>
            <p className="font-sans text-[10px] text-black/50 mt-1">Carved by hand in limited collections.</p>
          </div>

          <div className="absolute top-6 right-6 md:top-10 md:right-10 bg-white/95 backdrop-blur border border-black/5 p-4 rounded-2xl shadow-lg max-w-[200px] pointer-events-none hidden sm:block z-30">
            <p className="font-sans text-[9px] uppercase tracking-widest text-[#C47A46] font-bold mb-1">Global Shipping</p>
            <p className="font-serif text-sm text-[#261B14] font-bold">White-Glove Delivery</p>
          </div>

          {/* Central text overlay inside the frame */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none text-center hero-text">
            <p className="text-warm-cedar font-sans tracking-[0.25em] text-[10px] uppercase mb-2 font-bold">
              woodpecker.lk
            </p>
            <h1 className="text-3xl md:text-6xl font-serif font-extrabold text-[#261B14] tracking-tight leading-none">
              Chiseled by Hand.
            </h1>
            <p className="text-xs md:text-sm font-sans text-black/60 tracking-wider mt-2 font-medium">
              Defined by centuries of organic growth
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center text-[#261B14]/60 tracking-wider text-[10px] uppercase font-sans scroll-indicator pointer-events-none">
            <span>Scroll to Explore Gallery</span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-warm-cedar to-transparent mt-2 animate-pulse" />
          </div>

        </div>

      </div>
    </div>
  );
}
