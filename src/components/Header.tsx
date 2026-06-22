"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useCart } from "@/store/useCart";
import { useSplash } from "@/store/useSplash";
import { ShoppingBag, Heart, User, Search, Menu, X } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import Logo3D from "./Logo3D";

export default function Header() {
  const { cartItems, toggleCart } = useCart();
  const { status } = useSplash();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu on screen resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine if splash is actively showing (playing intro or exiting)
  const isSplashPlaying = status === "idle" || status === "playing" || status === "exiting";

  return (
    <>
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

          {/* Right: User Utility Icons, Cart & Mobile Menu Toggle */}
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden hover:text-warm-cedar transition-colors cursor-pointer p-1"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Bottom Row: Navigation Links (Desktop only) */}
        <div className="hidden md:block border-t border-black/5 bg-[#FDFBF7]">
          <nav className="max-w-7xl mx-auto px-6 py-2.5 flex justify-center gap-10 text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-black/60">
            <Link href="/" className="hover:text-warm-cedar transition-colors">Home</Link>
            <Link href="/gallery" className="hover:text-warm-cedar transition-colors">Gallery</Link>
            <Link href="#" className="hover:text-warm-cedar transition-colors">Exhibitions</Link>
            <Link href="#" className="hover:text-warm-cedar transition-colors">Provenance</Link>
            <Link href="#" className="hover:text-warm-cedar transition-colors">Artisans</Link>
          </nav>
        </div>
      </header>

      {/* Mobile Full-Screen Slide-Down Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9999] bg-[#FDFBF7] flex flex-col justify-between p-8 md:hidden"
          >
            {/* Top Row: Close Button & Brand Name */}
            <div className="flex items-center justify-between">
              <span className="font-serif text-2xl font-black tracking-widest text-[#261B14]">WOODPECKER</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:text-[#C47A46] transition-colors cursor-pointer text-[#261B14]"
                aria-label="Close navigation menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Links with Staggered Slide In */}
            <nav className="flex flex-col gap-6 my-auto text-left">
              {[
                { label: "Home", href: "/" },
                { label: "Gallery", href: "/gallery" },
                { label: "Exhibitions", href: "#" },
                { label: "Provenance", href: "#" },
                { label: "Artisans", href: "#" },
              ].map((link, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.1, duration: 0.4, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-serif text-4xl font-extrabold text-[#261B14] hover:text-[#C47A46] tracking-wide transition-colors block py-1"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile Footer Info */}
            <div className="border-t border-black/5 pt-6 space-y-2">
              <p className="font-sans text-[9px] tracking-widest uppercase text-black/40 font-bold">Collector Support</p>
              <p className="font-serif text-base font-bold text-[#261B14]">woodpecker.lk</p>
              <p className="font-sans text-xs text-black/50">info@woodpecker.lk | +94 78 805 6838</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
