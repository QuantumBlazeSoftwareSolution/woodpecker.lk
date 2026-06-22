"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useCart } from "@/store/useCart";
import { ArrowLeft, Plus, Check } from "lucide-react";

interface ProductDetail {
  id: string;
  name: string;
  price: number;
  basePrice: number;
  woodTypes: string[];
  sizes: string[];
  description: string;
  origin: string;
  hours: number;
  image: string;
}

const productDetailData: Record<string, ProductDetail> = {
  "kintsugi-relic": {
    id: "kintsugi-relic",
    name: "The Kintsugi Relic",
    basePrice: 3200,
    price: 3200,
    woodTypes: ["Charred Oak & Gold Leaf"],
    sizes: ["36\" x 36\"", "48\" x 48\"", "60\" x 60\""],
    description: "An abstract relief sculpture representing celestial alignment and resilience. Hand-carved and carbonized, with cracks filled in gorgeous gold leaf.",
    origin: "Reclaimed plantation timber, Knuckles Forest Reserve foothills.",
    hours: 140,
    image: "/images/product_luxury.png",
  },
  "teak-mandala": {
    id: "teak-mandala",
    name: "Teak Mandala Relic",
    basePrice: 4500,
    price: 4500,
    woodTypes: ["Natural Teak Wood"],
    sizes: ["48\" x 32\"", "60\" x 40\"", "72\" x 48\""],
    description: "A gorgeous concentric design highlighting geometric harmony. The detailed circular patterns are carved using continuous chisel strokes.",
    origin: "Naturally fallen Jackwood logs, Nuwara Eliya estates.",
    hours: 210,
    image: "/images/product_brown.png",
  },
  "bleached-ripple": {
    id: "bleached-ripple",
    name: "Bleached Ripple Board",
    basePrice: 2800,
    price: 2800,
    woodTypes: ["Bleached White Oak"],
    sizes: ["36\" x 36\"", "48\" x 48\"", "60\" x 60\""],
    description: "A clean and modern minimal relief carving, reflecting ocean waves. Carved from light white oak with natural wax seals.",
    origin: "Sustainably harvested White Oak.",
    hours: 90,
    image: "/images/product_white.png",
  },
  "rack-interlocking-teak": {
    id: "rack-interlocking-teak",
    name: "Teak Interlocking Square Shelf",
    basePrice: 350,
    price: 350,
    woodTypes: ["Polished Mahogany Teak", "Natural Walnut"],
    sizes: ["30\" x 30\"", "36\" x 36\"", "42\" x 42\""],
    description: "A gorgeous modern interlocking square wall rack designed for clean geometric storage. Hand-built using sturdy dowel joints.",
    origin: "Polished plantation Mahogany Teak, Galle estates.",
    hours: 18,
    image: "/images/rack_brown.png",
  },
  "rack-honeycomb-white": {
    id: "rack-honeycomb-white",
    name: "White Honeycomb Hexagon Shelf",
    basePrice: 280,
    price: 280,
    woodTypes: ["Bleached Modern Pine", "Satin White Lacquer"],
    sizes: ["24\" x 24\"", "32\" x 32\"", "40\" x 40\""],
    description: "A clean modern hexagonal honeycomb shelf layout, perfect for minimalist styling and showcasing books or plant pots.",
    origin: "Sourced modern Nordic Pinewood.",
    hours: 12,
    image: "/images/rack_white.png",
  },
};

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  
  const product = productDetailData[productId] || {
    id: productId,
    name: "Bespoke Custom Carving",
    basePrice: 2500,
    price: 2500,
    woodTypes: ["Teak Wood", "Charred Oak", "Bleached Oak"],
    sizes: ["36\" x 36\"", "48\" x 48\"", "60\" x 40\""],
    description: "A custom bespoke art piece to be handcarved on demand. Designed and structured to fit the dimensions and lighting of your designated room.",
    origin: "Sustainably sourced Sri Lankan Teak.",
    hours: 120,
    image: "/images/product_brown.png",
  };

  const { addToCart } = useCart();
  const [selectedWood, setSelectedWood] = useState(product.woodTypes[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [activeTab, setActiveTab] = useState<"details" | "artisan">("details");

  // Calculate pricing variations based on sizing
  const getPrice = () => {
    let multiplier = 1;
    if (selectedSize.includes("48\"") || selectedSize.includes("60\"")) multiplier = 1.25;
    if (selectedSize.includes("72\"") || selectedSize.includes("60\" x 60\"")) multiplier = 1.5;
    return Math.round(product.basePrice * multiplier);
  };

  const currentPrice = getPrice();

  const handleAcquire = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: currentPrice,
      woodType: selectedWood,
      size: selectedSize,
      image: "",
    });
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <Link
        href="/gallery"
        className="inline-flex items-center gap-2 text-black/40 hover:text-warm-cedar transition-colors text-xs uppercase tracking-widest font-sans mb-12 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Gallery
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 text-[#261B14]">
        {/* Sticky Visual Showcase */}
        <div className="lg:col-span-7 lg:sticky lg:top-32 h-fit space-y-6">
          <div className="bg-burnt-walnut/5 border border-black/5 aspect-[4/3] relative overflow-hidden rounded-[2rem] shadow-xl">
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none" />
          </div>
          <p className="text-center text-[10px] text-black/40 tracking-wider font-sans uppercase">
            Interactive physical simulation of {selectedWood} finish.
          </p>
        </div>

        {/* Configuration Column */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#261B14] tracking-wide">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mt-4">
              <span className="font-serif text-2xl text-warm-cedar font-bold">${currentPrice.toLocaleString()}</span>
              <span className="text-[10px] font-sans uppercase tracking-widest px-2 py-0.5 bg-black/5 text-black/60 rounded">
                Collectible Art
              </span>
            </div>
          </div>

          <p className="font-sans text-sm text-black/65 leading-relaxed">
            {product.description}
          </p>

          {/* Configuration Selection */}
          <div className="space-y-6 border-t border-black/5 pt-6">
            {/* Wood type select */}
            <div>
              <span className="font-sans text-[10px] uppercase tracking-widest text-black/40 block mb-3">
                Wood Selection
              </span>
              <div className="flex flex-wrap gap-3">
                {product.woodTypes.map((wood) => (
                  <button
                    key={wood}
                    onClick={() => setSelectedWood(wood)}
                    className={`px-4 py-2 font-sans text-xs tracking-wider border transition-all cursor-pointer rounded ${
                      selectedWood === wood
                        ? "border-warm-cedar text-warm-cedar bg-warm-cedar/5"
                        : "border-black/10 text-black/60 hover:border-black/30"
                    }`}
                  >
                    {selectedWood === wood && <Check className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />}
                    {wood}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizing select */}
            <div>
              <span className="font-sans text-[10px] uppercase tracking-widest text-black/40 block mb-3">
                Dimensions Configuration
              </span>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 font-sans text-xs tracking-wider border transition-all cursor-pointer rounded ${
                      selectedSize === size
                        ? "border-warm-cedar text-warm-cedar bg-warm-cedar/5"
                        : "border-black/10 text-black/60 hover:border-black/30"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Narrative Tabs (Artisan's Log & Provenance) */}
          <div className="border-t border-black/5 pt-6">
            <div className="flex gap-6 border-b border-black/5 pb-2 font-sans text-xs tracking-widest uppercase">
              <button
                onClick={() => setActiveTab("details")}
                className={`cursor-pointer pb-2 transition-colors ${
                  activeTab === "details" ? "text-warm-cedar border-b border-warm-cedar font-bold" : "text-black/40"
                }`}
              >
                Provenance
              </button>
              <button
                onClick={() => setActiveTab("artisan")}
                className={`cursor-pointer pb-2 transition-colors ${
                  activeTab === "artisan" ? "text-warm-cedar border-b border-warm-cedar font-bold" : "text-black/40"
                }`}
              >
                Artisan's Log
              </button>
            </div>

            <div className="pt-4 font-sans text-xs text-black/60 leading-relaxed space-y-2">
              {activeTab === "details" ? (
                <>
                  <p><strong>Timber Source:</strong> {product.origin}</p>
                  <p>Acoustics: Dampens mid-frequency resonance, perfect for open spaces.</p>
                </>
              ) : (
                <>
                  <p><strong>Carving Duration:</strong> Approx. {product.hours} hours of continuous chisel work.</p>
                  <p><strong>Treatment:</strong> Cured at low humidity, treated with pure orange-oil terpene and wax.</p>
                </>
              )}
            </div>
          </div>

          {/* Action Trigger */}
          <button
            onClick={handleAcquire}
            className="w-full bg-warm-cedar text-white font-sans text-xs font-bold tracking-widest uppercase py-4 hover:bg-burnt-walnut transition-colors cursor-pointer rounded-xl shadow"
          >
            Acquire Bespoke Carving
          </button>
        </div>
      </div>
    </div>
  );
}
