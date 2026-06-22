"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/store/useCart";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  woodType: string;
  size: string;
  inStock: boolean;
  category: string;
  image: string;
}

const productsData: Product[] = [
  {
    id: "kintsugi-relic",
    name: "The Kintsugi Relic",
    price: 3200,
    woodType: "Charred Oak & Gold Leaf",
    size: "48\" x 48\"",
    inStock: true,
    category: "organic",
    image: "/images/product_luxury.png",
  },
  {
    id: "teak-mandala",
    name: "Teak Mandala Relic",
    price: 4500,
    woodType: "Natural Teak Wood Brown",
    size: "60\" x 40\"",
    inStock: true,
    category: "geometric",
    image: "/images/product_brown.png",
  },
  {
    id: "bleached-ripple",
    name: "Bleached Ripple Board",
    price: 2800,
    woodType: "Bleached White Oak",
    size: "36\" x 36\"",
    inStock: true,
    category: "organic",
    image: "/images/product_white.png",
  },
  {
    id: "rack-interlocking-teak",
    name: "Teak Interlocking Square Shelf",
    price: 350,
    woodType: "Mahogany Polished Teak",
    size: "36\" x 36\"",
    inStock: true,
    category: "geometric",
    image: "/images/rack_brown.png",
  },
  {
    id: "rack-honeycomb-white",
    name: "White Honeycomb Hexagon Shelf",
    price: 280,
    woodType: "Bleached Modern Pine",
    size: "32\" x 32\"",
    inStock: true,
    category: "organic",
    image: "/images/rack_white.png",
  },
  {
    id: "charred-horizon",
    name: "Charred Horizon Split",
    price: 2400,
    woodType: "Charred Oak & Gold",
    size: "24\" x 60\"",
    inStock: false, // Display stamp
    category: "geometric",
    image: "/images/product_luxury.png",
  },
];

export default function GalleryPage() {
  const { addToCart } = useCart();
  const [filter, setFilter] = useState("all");

  const filteredProducts = productsData.filter(
    (p) => filter === "all" || p.category === filter
  );

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full text-[#261B14]">
      {/* Title & Filter Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-black/5">
        <div>
          <span className="font-sans text-[10px] text-warm-cedar uppercase tracking-[0.25em] font-semibold">
            Digital Exhibition
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#261B14] mt-2">
            The Art Gallery
          </h1>
        </div>

        {/* Dynamic Category Filters */}
        <div className="flex gap-6 font-sans text-xs tracking-wider uppercase text-black/50">
          {["all", "geometric", "organic"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`hover:text-warm-cedar transition-colors cursor-pointer ${
                filter === cat ? "text-warm-cedar border-b border-warm-cedar pb-1 font-semibold" : ""
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetric Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-10 items-start">
        {filteredProducts.map((product, idx) => {
          // Uniform square height for clean, consistent grid layout
          const cardHeight = "aspect-square";

          return (
            <div
              key={product.id}
              className={`group flex flex-col justify-between border border-black/5 bg-white p-4 rounded-3xl hover:border-warm-cedar/40 hover:shadow-xl transition-all duration-300 relative shadow-sm`}
            >
              {/* Product Artwork Container */}
              <Link href={`/gallery/${product.id}`} className="cursor-pointer block relative w-full overflow-hidden rounded-2xl">
                <div className={`${cardHeight} bg-[#F5F2EB] w-full relative overflow-hidden`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  
                  {/* Sold Out Red Stamp Overlay */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-20">
                      <div className="border-[3px] border-red-500/85 rounded-full w-32 h-32 flex flex-col items-center justify-center text-red-500 font-serif text-[11px] font-bold uppercase tracking-widest rotate-12 bg-white/80 px-2 text-center select-none shadow-md">
                        <span>Sold Out at</span>
                        <span className="text-[9px] mt-0.5 border-t border-red-500/40 pt-0.5">Exhibition</span>
                      </div>
                    </div>
                  )}
                </div>
              </Link>

              {/* Product Metadata & Actions */}
              <div className="mt-6 flex justify-between items-start px-1">
                <div>
                  <Link href={`/gallery/${product.id}`} className="cursor-pointer">
                    <h3 className="font-serif text-lg text-[#261B14] font-bold hover:text-warm-cedar transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="font-sans text-[10px] text-black/50 tracking-widest uppercase mt-1">
                    {product.woodType} / {product.size}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-serif text-base text-warm-cedar font-bold block">
                    ${product.price.toLocaleString()}
                  </span>
                  
                  {product.inStock ? (
                    <button
                      onClick={() =>
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          woodType: product.woodType.split("&")[0].trim(),
                          size: product.size,
                          image: product.image,
                        })
                      }
                      className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-warm-cedar hover:text-black transition-colors mt-2 cursor-pointer font-bold"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Acquire
                    </button>
                  ) : (
                    <span className="text-[9px] uppercase tracking-wider text-black/30 block mt-2 select-none font-medium">
                      Acquired
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
