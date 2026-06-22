"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useCart } from "@/store/useCart";
import { useSplash } from "@/store/useSplash";
import { ShoppingBag, Heart, User, Search } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import Logo3D from "./Logo3D";

export default function Header() {
  const { cartItems, toggleCart } = useCart();
  const { status } = useSplash();
  const [mounted, setMounted] = useState(false);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine if splash is actively showing (playing intro or exiting)
  const isSplashPlaying = status === "idle" || status === "playing" || status === "exiting";

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 bg-[#FDFBF7] border-b border-black/5 shadow-sm transition-opacity duration-700 ease-out ${
        isSplashPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Top Row: Brand, Search, User Utility */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        
        {/* Left: Brand Mark */}
        <Link href="/" className="flex items-center gap-3 text-2xl font-serif font-extrabold text-[#261B14] tracking-widest hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 relative flex-shrink-0">
            {mounted && (
              <Canvas camera={{ fov: 45, position: [0, 0, 1.8] }}>
                {/* Premium lighting setup for small golden navbar logo */}
                <ambientLight intensity={1.5} />
                <directionalLight position={[3, 4, 5]} intensity={3.5} />
                <directionalLight position={[-4, 5, -2]} intensity={2.0} color="#F5E3A9" />
                <pointLight position={[0, -2.5, 1.5]} intensity={2.5} color="#FFD700" />
                <Suspense fallback={null}>
                  <Logo3D />
                </Suspense>
              </Canvas>
            )}
          </div>
          <span className="leading-none mt-1">WOODPECKER</span>
        </Link>

        {/* Center: Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="Search bespoke art collections..."
            className="w-full bg-[#F5F2EB] text-[#261B14] placeholder-black/30 border border-black/5 rounded-full px-5 py-2 text-xs focus:outline-none focus:border-warm-cedar/50 transition-all font-sans"
          />
          <Search className="w-4 h-4 text-black/30 absolute right-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* Right: User Utility Icons & Cart */}
        <div className="flex items-center gap-6 text-[#261B14]">
          <button className="hover:text-warm-cedar transition-colors cursor-pointer hidden sm:block">
            <User className="w-5 h-5" />
          </button>
          
          <button className="hover:text-warm-cedar transition-colors cursor-pointer hidden sm:block relative">
            <Heart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-[#C47A46] w-1.5 h-1.5 rounded-full" />
          </button>

          <button
            onClick={() => toggleCart(true)}
            className="relative flex items-center gap-2 hover:text-warm-cedar transition-colors cursor-pointer group"
          >
            <ShoppingBag className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-warm-cedar text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-sans">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Row: Navigation Links */}
      <div className="border-t border-black/5 bg-[#FDFBF7]">
        <nav className="max-w-7xl mx-auto px-6 py-2.5 flex justify-center gap-10 text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-black/60">
          <Link href="/" className="hover:text-warm-cedar transition-colors">Home</Link>
          <Link href="/gallery" className="hover:text-warm-cedar transition-colors">Gallery</Link>
          <Link href="#" className="hover:text-warm-cedar transition-colors">Exhibitions</Link>
          <Link href="#" className="hover:text-warm-cedar transition-colors">Provenance</Link>
          <Link href="#" className="hover:text-warm-cedar transition-colors">Artisans</Link>
        </nav>
      </div>
    </header>
  );
}
