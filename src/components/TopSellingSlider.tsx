"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/store/useCart";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, ShoppingCart, Award } from "lucide-react";

interface ProductSlide {
  id: string;
  name: string;
  price: number;
  woodType: string;
  size: string;
  description: string;
  rating: number;
  image: string;
  specs: { label: string; value: string }[];
}

const slideData: ProductSlide[] = [
  {
    id: "contemporary-white-shelf",
    name: "Modern Contemporary Wall Shelf",
    price: 180,
    woodType: "Teak & White Lacquer",
    size: "24\" x 8\" x 6\"",
    description: "Sleek floating shelf unit crafted from solid teak, finished in pure gallery-white lacquer. Perfect for minimalist styling.",
    rating: 5,
    image: "/top-selling-items/322-3220659_afydecor-contemporary-wall-shelf-in-white-shelf.png",
    specs: [
      { label: "Timber Origin", value: "Sustainably grown teak" },
      { label: "Joint Strength", value: "Concealed wall anchors" },
      { label: "Finishing Seal", value: "Semi-gloss Polyurethane" },
      { label: "Load Capacity", value: "Up to 12kg" },
    ],
  },
  {
    id: "scandinavian-floating-shelves",
    name: "Scandinavian Floating Shelves",
    price: 220,
    woodType: "Nordic Pine",
    size: "30\" x 24\" x 7\"",
    description: "Clean Nordic design featuring interlocking light pine shelves. Built for plant styling and books with invisible mounts.",
    rating: 5,
    image: "/top-selling-items/ai-generated-wall-mounted-floating-shelves-scandinavian-modern-minimalist-style-transparent-background-isolated-image-png.webp",
    specs: [
      { label: "Timber Origin", value: "Sustainable Nordic Pine" },
      { label: "Structure", value: "Scandinavian Interlocking" },
      { label: "Mounting Style", value: "Keyhole brackets" },
      { label: "Finishing Seal", value: "Natural Beeswax Seal" },
    ],
  },
  {
    id: "minimalist-solid-teak-shelf",
    name: "Minimalist Solid Teak Shelf",
    price: 160,
    woodType: "Reclaimed Teak",
    size: "36\" x 9\" x 2.5\"",
    description: "A single piece of sustainably sourced teak slab, hand-planed to expose the deep grain. Modern functional simplicity.",
    rating: 5,
    image: "/top-selling-items/wooden-wall-shelf-offering-functionality-and-minimalist-style-with-transparent-space-png.webp",
    specs: [
      { label: "Timber Origin", value: "Reclaimed Galle Estates" },
      { label: "Carving Style", value: "Live-edge Minimalist" },
      { label: "Finishing Seal", value: "Linseed Oil & Shellac" },
      { label: "Surface Texture", value: "Smooth hand-sanded" },
    ],
  },
  {
    id: "hexagonal-honeycomb-shelves",
    name: "Hexagonal Honeycomb Shelves",
    price: 310,
    woodType: "Premium Mahogany",
    size: "42\" x 36\" x 5.5\"",
    description: "A modular cluster of hexagonal shelves crafted from premium mahogany. Creates a beautiful geometric pattern on empty walls.",
    rating: 5,
    image: "/top-selling-items/decorative-wooden-hexagonal-shelves-arranged-creatively-on-a-white-background-png.webp",
    specs: [
      { label: "Timber Origin", value: "Sri Lankan Mahogany" },
      { label: "Configuration", value: "3-Hexagon Cluster" },
      { label: "Finishing Seal", value: "Dark Walnut Satin" },
      { label: "Design Pattern", value: "Geometric Honeycomb" },
    ],
  },
  {
    id: "artisan-sculptural-armchair",
    name: "Artisan Sculptural Armchair",
    price: 1450,
    woodType: "Hand-Shaped Ashwood",
    size: "32\" x 34\" x 30\"",
    description: "Organic luxury accent chair featuring hand-shaped ashwood frame and textured bouclé upholstery. A statement of woodcraft design.",
    rating: 5,
    image: "/top-selling-items/ai-generated-armchair-furniture-isolated-on-transparent-background-free-png (1).webp",
    specs: [
      { label: "Timber Origin", value: "Grade-A Ashwood" },
      { label: "Upholstery", value: "Natural Wool Bouclé" },
      { label: "Sculpting Style", value: "Fluid organic curves" },
      { label: "Cushion Core", value: "High-density memory foam" },
    ],
  },
];

export default function TopSellingSlider() {
  const { addToCart } = useCart();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const active = slideData[current];

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slideData.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slideData.length) % slideData.length);
  };

  // Image slide variants matching left-to-center and right-to-center transitions
  // We offset it by "80vw" (entering/exiting) which is the exact boundary of the mask container.
  // This ensures the image stays completely transparent/clipped outside of the 80vw bounds.
  const imageVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "80vw" : "-80vw",
      opacity: 0,
      scale: 0.85,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 100, damping: 20 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-80vw" : "80vw",
      opacity: 0,
      scale: 0.85,
      transition: {
        x: { duration: 0.5, ease: "easeInOut" },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    }),
  };

  return (
    <section className="relative w-full min-h-screen bg-[radial-gradient(circle_at_center,_#20150F_0%,_#0B0B0B_100%)] text-white overflow-hidden flex flex-col justify-between p-6 md:p-12 z-10">
      
      {/* Radial overlay glow block */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(0,0,0,0.5)_100%)] pointer-events-none" />

      {/* Header Row */}
      <div className="relative z-10 w-full flex justify-between items-center pb-4 border-b border-white/5">
        <div>
          <span className="font-sans text-[9px] text-[#C47A46] uppercase tracking-[0.25em] font-bold">
            Curated Exhibition
          </span>
          <h2 className="font-serif text-lg font-bold tracking-widest text-[#FDFBF7] uppercase">
            Top Selling Products
          </h2>
        </div>
        <div className="flex items-center gap-2 text-white/50 text-[10px] uppercase tracking-widest font-semibold font-sans">
          <span>0{current + 1}</span>
          <div className="w-10 h-[1px] bg-white/20" />
          <span>0{slideData.length}</span>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full my-auto py-12 lg:py-0">
        
        <div className="relative w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0">
          
          {/* Left Column: Product Details (Fades only on transition) */}
          <div className="w-full lg:w-[24%] lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 z-20 text-left space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <h3 className="font-serif text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-none">
                  {active.name}
                </h3>
                
                <div className="flex items-center gap-2">
                  <span className="font-sans text-2xl font-bold text-[#C47A46]">5.0</span>
                  <div className="flex gap-0.5">
                    {[...Array(active.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C47A46] text-[#C47A46]" />
                    ))}
                  </div>
                </div>

                <p className="font-sans text-xs md:text-sm text-white/60 leading-relaxed">
                  {active.description}
                </p>

                <div className="pt-2">
                  <span className="font-sans text-[9px] uppercase tracking-wider text-white/40 block">Investment Value</span>
                  <span className="font-serif text-3xl font-extrabold text-[#C47A46]">${active.price.toLocaleString()}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Center Column: Sliding Product Image (Clips/masks outside 80vw) */}
          <div className="relative w-[80vw] h-[40vh] md:h-[48vh] lg:h-[58vh] mx-auto overflow-hidden flex items-center justify-center z-10">
            {/* Spotlight Radial Background Glow behind image */}
            <div className="absolute w-72 h-72 rounded-full bg-[#C47A46]/10 blur-[80px] pointer-events-none" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active.id}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full flex items-center justify-center select-none absolute inset-0"
              >
                <img
                  src={active.image}
                  alt={active.name}
                  className="max-w-[70%] max-h-[85%] md:max-h-[90%] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] filter contrast-[1.03]"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Specifications (Fades only on transition) */}
          <div className="w-full lg:w-[24%] lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 z-20 text-left space-y-4 lg:space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-4 lg:space-y-6"
              >
                <div className="border-b border-white/10 pb-2">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-[#C47A46] font-bold">
                    Technical Specs
                  </span>
                </div>
                
                <ul className="space-y-3 font-sans text-xs">
                  {active.specs.map((spec, i) => (
                    <li key={i} className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-white/40">{spec.label}</span>
                      <span className="text-white/80 font-medium">{spec.value}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => addToCart({
                    id: active.id,
                    name: active.name,
                    price: active.price,
                    woodType: active.woodType.split("&")[0].trim(),
                    size: active.size,
                    image: active.image,
                  })}
                  className="w-full bg-[#C47A46] text-white flex items-center justify-center gap-3 font-sans text-xs font-bold tracking-widest uppercase py-3.5 rounded-xl hover:bg-white hover:text-black transition-all cursor-pointer shadow-lg"
                >
                  <ShoppingCart className="w-4 h-4" /> Acquire Relic
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Footer Navigation Row */}
      <div className="relative z-10 w-full flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-white/5 gap-4">
        
        {/* Left Footer Content */}
        <div className="flex items-center gap-2 text-white/40 text-[10px] font-sans">
          <Award className="w-4 h-4 text-[#C47A46]" />
          <span>Handcrafted Certificate & Artisan Signature Included</span>
        </div>

        {/* Center: Slide Selector Arrow and Thumbnail Dots */}
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrev}
            className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="flex gap-2.5">
            {slideData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > current ? 1 : -1);
                  setCurrent(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  current === idx ? "bg-[#C47A46] w-6" : "bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer text-white"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Footer Social Links */}
        <div className="flex gap-6 text-white/45 text-[10px] font-sans tracking-wider uppercase font-bold">
          <Link href="#" className="hover:text-[#C47A46] transition-colors">Facebook</Link>
          <Link href="#" className="hover:text-[#C47A46] transition-colors">Instagram</Link>
          <Link href="#" className="hover:text-[#C47A46] transition-colors">Pinterest</Link>
        </div>

      </div>

    </section>
  );
}
