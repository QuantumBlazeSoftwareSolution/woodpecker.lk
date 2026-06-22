"use client";

import Link from "next/link";
import { useCart } from "@/store/useCart";
import { ArrowRight, ShoppingCart, Heart, Star, Shield, HelpCircle, Sparkles } from "lucide-react";
import TopSellingSlider from "@/components/TopSellingSlider";

export default function Home() {
  const { addToCart } = useCart();

  const mockProducts = [
    {
      id: "kintsugi-relic",
      name: "The Kintsugi Relic",
      price: 3200,
      woodType: "Charred Oak & Gold Leaf",
      size: "48\" x 48\"",
      rating: 5,
      image: "/images/product_luxury.png",
    },
    {
      id: "teak-mandala",
      name: "Teak Mandala Relic",
      price: 4500,
      woodType: "Natural Teak Wood Brown",
      size: "60\" x 40\"",
      rating: 5,
      image: "/images/product_brown.png",
    },
    {
      id: "bleached-ripple",
      name: "Bleached Ripple Board",
      price: 2800,
      woodType: "Bleached White Oak",
      size: "36\" x 36\"",
      rating: 5,
      image: "/images/product_white.png",
    },
    {
      id: "rack-interlocking-teak",
      name: "Teak Interlocking Square Shelf",
      price: 350,
      woodType: "Mahogany Polished Teak",
      size: "36\" x 36\"",
      rating: 5,
      image: "/images/rack_brown.png",
    },
  ];

  return (
    <div className="bg-[#FDFBF7] overflow-hidden w-full text-[#261B14] pt-28">
      
      {/* 1. Immersive Hero Slider / Banner (Matching Naturya Layout) */}
      <section className="relative w-full aspect-[21/9] md:h-[75vh] flex items-center justify-start overflow-hidden bg-[#F5F2EB]">
        {/* Background Image: High-End Living Room with Art Panel */}
        <img
          src="/images/hero_interior.png"
          alt="Bespoke luxury wood art on wall"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />

        {/* Content Box Overlaid */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="max-w-2xl bg-white/95 backdrop-blur p-8 md:p-12 rounded-[2rem] shadow-2xl border border-black/5">
            <span className="font-sans text-[10px] text-warm-cedar uppercase tracking-[0.25em] font-bold block mb-3">
              TIMELESS ELEGANCE
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-extrabold leading-tight text-[#261B14] mb-4">
              Classic Wood Wall Art Crafted for Premium Spaces
            </h1>
            <p className="font-sans text-xs md:text-sm text-black/60 leading-relaxed mb-6">
              Hand-chiselled masterpieces sourced from sustainably reclaimed Sri Lankan timbers. Designed to bring organic energy, acoustic dampening, and sculptural beauty to modern walls.
            </p>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 bg-[#C47A46] text-white px-8 py-3.5 rounded-full font-sans text-xs font-bold tracking-widest uppercase hover:bg-black transition-all shadow-lg"
            >
              Discover Collections <ArrowRight className="w-4.5 h-4.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Explore Collections Range (Circular Roundels Section) */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-b border-black/5">
        <h2 className="text-center font-serif text-2xl md:text-3xl font-extrabold text-[#261B14] mb-10">
          Explore Our Art Categories
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {[
            { name: "New Creations", image: "/images/product_luxury.png" },
            { name: "Teak Panels", image: "/images/product_brown.png" },
            { name: "Bleached Oak", image: "/images/product_white.png" },
            { name: "Wall Racks", image: "/images/rack_brown.png" },
            { name: "Honeycomb Shelves", image: "/images/rack_white.png" },
          ].map((cat, idx) => (
            <Link key={idx} href="/gallery" className="group flex flex-col items-center gap-3 text-center cursor-pointer">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white border border-black/5 overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-500">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <span className="font-sans text-xs font-bold text-[#261B14] tracking-wide group-hover:text-warm-cedar transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Promo Banner Grid (Asymmetrical Layout matching image 2) */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Two horizontal banners */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          {/* Card 1 */}
          <div className="relative bg-[#F5F2EB] rounded-[2rem] overflow-hidden border border-black/5 aspect-[16/7] p-8 flex flex-col justify-center items-start shadow-sm">
            <img src="/images/product_luxury.png" alt="Shou sugi ban" className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-90 hidden sm:block" />
            <div className="relative z-10 max-w-sm">
              <span className="text-[10px] text-warm-cedar uppercase tracking-wider font-bold">KINTSUGI RELIC SERIES</span>
              <h3 className="font-serif text-2xl font-bold text-[#261B14] mt-2 mb-4">Charred Carbon & Gold Infusions</h3>
              <Link href="/gallery" className="bg-[#261B14] text-white px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-warm-cedar transition-colors inline-block">
                Shop Collection
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative bg-[#F5F2EB] rounded-[2rem] overflow-hidden border border-black/5 aspect-[16/7] p-8 flex flex-col justify-center items-start shadow-sm">
            <img src="/images/product_white.png" alt="Bleached board" className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-90 hidden sm:block" />
            <div className="relative z-10 max-w-sm">
              <span className="text-[10px] text-warm-cedar uppercase tracking-wider font-bold">MINIMAL OAK</span>
              <h3 className="font-serif text-2xl font-bold text-[#261B14] mt-2 mb-4">Bleached White Relief Waves</h3>
              <Link href="/gallery" className="bg-[#261B14] text-white px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-warm-cedar transition-colors inline-block">
                Shop Collection
              </Link>
            </div>
          </div>

        </div>

        {/* Right Column: Tall vertical banner */}
        <div className="lg:col-span-5 relative bg-[#F5F2EB] rounded-[2rem] overflow-hidden border border-black/5 p-8 flex flex-col justify-end items-start shadow-sm aspect-[4/5] lg:aspect-auto">
          <img src="/images/product_brown.png" alt="Natural teak" className="absolute inset-0 w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10 max-w-sm text-white">
            <span className="text-[10px] text-warm-cedar uppercase tracking-wider font-bold">TIMELSS HARMONY</span>
            <h3 className="font-serif text-3xl font-bold mt-2 mb-4 text-white">Handcrafted Geometrics</h3>
            <Link href="/gallery" className="bg-[#C47A46] text-white px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all inline-block shadow-md">
              Discover Now
            </Link>
          </div>
        </div>

      </section>

      {/* Featured / Top Selling Products Section */}
      <TopSellingSlider />

      {/* 4. New Arrivals Product Slider/Row */}
      <section className="py-20 bg-burnt-walnut/[0.02] border-t border-b border-black/5 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center font-serif text-3xl font-extrabold text-[#261B14] mb-12">
            New Exhibition Additions
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockProducts.map((product) => (
              <div key={product.id} className="group bg-white border border-black/5 rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between">
                
                {/* Image Showcase */}
                <div className="aspect-square w-full rounded-2xl bg-[#F5F2EB] overflow-hidden relative mb-4">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <button className="absolute top-4 right-4 bg-white/90 p-2.5 rounded-full shadow hover:text-warm-cedar cursor-pointer">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                {/* Info & Rating */}
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    {[...Array(product.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-warm-cedar text-warm-cedar" />
                    ))}
                  </div>

                  <Link href={`/gallery/${product.id}`} className="cursor-pointer">
                    <h3 className="font-serif text-lg font-bold hover:text-warm-cedar transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="font-sans text-[10px] text-black/50 tracking-wider mt-1 uppercase">
                    {product.woodType} / {product.size}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between border-t border-black/5 mt-4 pt-4">
                  <span className="font-serif text-xl font-extrabold text-warm-cedar">${product.price.toLocaleString()}</span>
                  <button
                    onClick={() => addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      woodType: product.woodType.split("&")[0].trim(),
                      size: product.size,
                      image: product.image,
                    })}
                    className="inline-flex items-center gap-2 bg-[#261B14] hover:bg-[#C47A46] text-white px-4 py-2.5 rounded-xl font-sans text-[10px] font-bold tracking-widest uppercase transition-colors cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" /> Acquire
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Triple Side-by-Side Collection Banners */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Natural Teak Burl", quote: "Organic silhouettes & rich curves.", bg: "bg-[#F4EFEB]" },
          { title: "Ancient Bog Oak", quote: "Dark, moody fossils from waterbeds.", bg: "bg-[#EAECE6]" },
          { title: "Satinwood Wave", quote: "Highly reflective chatoyant lines.", bg: "bg-[#F3EFE0]" },
        ].map((banner, idx) => (
          <div key={idx} className={`p-8 rounded-[2rem] border border-black/5 shadow-sm flex flex-col justify-between items-start aspect-[4/3] ${banner.bg}`}>
            <div>
              <Sparkles className="w-6 h-6 text-warm-cedar mb-4" />
              <h4 className="font-serif text-xl font-bold text-[#261B14]">{banner.title}</h4>
              <p className="font-sans text-xs text-black/60 mt-2 leading-relaxed">{banner.quote}</p>
            </div>
            <Link href="/gallery" className="text-xs font-bold text-warm-cedar uppercase tracking-wider inline-flex items-center gap-2 hover:text-[#261B14] transition-colors mt-6">
              View Catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
