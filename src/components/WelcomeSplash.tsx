"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Logo3D from "./Logo3D";
import { useSplash } from "@/store/useSplash";

export default function WelcomeSplash() {
  const { status, startSplash, exitSplash, completeSplash } = useSplash();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Play splash intro on every hard load
    startSplash();

    // 1. Let the center 3D rotate normally for 1.5 seconds
    const exitTimer = setTimeout(() => {
      exitSplash();
    }, 1500);

    // 2. Complete splash 2.0 seconds later (3.5 seconds total)
    const completeTimer = setTimeout(() => {
      completeSplash();
    }, 3500);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [startSplash, exitSplash, completeSplash]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {status !== "completed" && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: status === "exiting" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#120E0B] select-none pointer-events-none overflow-hidden"
        >
          {/* Main Centered Container */}
          <div className="max-w-7xl mx-auto px-6 w-full h-full relative flex flex-col items-center justify-center">
            
            {/* 3D Logo Canvas (Fullscreen, so it zooms past the screen boundaries without clipping) */}
            <div className="absolute inset-0 w-full h-full z-10">
              <Canvas camera={{ fov: 45, position: [0, 0, 1.8] }}>
                <ambientLight intensity={1.5} />
                <directionalLight position={[3, 4, 5]} intensity={3.5} />
                <directionalLight position={[-4, 5, -2]} intensity={2.0} color="#F5E3A9" />
                <pointLight position={[0, -2.5, 1.5]} intensity={2.5} color="#FFD700" />
                <Suspense fallback={null}>
                  <Logo3D />
                </Suspense>
              </Canvas>
            </div>

            {/* Brand Reveal Text (Fades out and blurs as logo zooms in) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                status === "exiting"
                  ? { opacity: 0, y: -45, filter: "blur(10px)" }
                  : { opacity: 1, y: 0 }
              }
              transition={{ duration: 0.8, delay: 0.1, ease: "easeInOut" }}
              className="absolute top-[65%] flex flex-col items-center text-center"
            >
              <h1 className="font-serif text-3xl md:text-5xl font-black text-[#FDFBF7] tracking-[0.3em] uppercase leading-none mb-4">
                Woodpecker
              </h1>
              <p className="font-sans text-[10px] md:text-xs text-warm-cedar tracking-[0.4em] uppercase font-bold">
                Bespoke Handmade Wood Wall Art
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
