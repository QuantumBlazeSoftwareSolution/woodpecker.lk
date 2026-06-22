"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  product: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: "elena-rostova",
    quote: "The Teak Mandala Relic completely transformed our foyer. The way the circular hand-chiselled grain catches the afternoon sun creates a living painting. Truly master-class craftsmanship.",
    author: "Elena Rostova",
    location: "Private Resident, Geneva",
    product: "Teak Mandala Relic",
    rating: 5,
  },
  {
    id: "marcus-vance",
    quote: "Acoustically and visually perfect. We placed the Shou Sugi Ban panel in our music room, and the resonance dampening combined with the charred textures is breathtaking.",
    author: "Marcus Vance",
    location: "Director, Soundscape Studios, NY",
    product: "The Kintsugi Relic",
    rating: 5,
  },
  {
    id: "sanjay-wickramasinghe",
    quote: "Bespoke service at its finest. The team worked with us to source reclaimed timber from Galle to match our custom library shelves. The result is a family heirloom.",
    author: "Sanjay Wickramasinghe",
    location: "Architect, Colombo",
    product: "Custom Live-Edge Installation",
    rating: 5,
  },
  {
    id: "kiko-tanaka",
    quote: "Clean, minimal, yet full of character. The bleached white oak relief board brings a calming organic flow to our corporate boardroom. Absolute recommendation.",
    author: "Kiko Tanaka",
    location: "Tanaka Associates, Tokyo",
    product: "Bleached Ripple Board",
    rating: 5,
  },
];

export default function CustomerFeedback() {
  const [current, setCurrent] = useState(0);

  const active = testimonials[current];

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-[#FDFBF7] border-t border-black/5 w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Heading & Statistics */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <div>
            <span className="font-sans text-[10px] text-[#C47A46] uppercase tracking-[0.25em] font-bold block mb-2">
              Collector Voices
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#261B14] leading-tight">
              What Our Collectors Say
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="font-sans text-3xl font-extrabold text-[#261B14]">4.9</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5.5 h-5.5 fill-[#C47A46] text-[#C47A46]" />
                ))}
              </div>
            </div>
            <p className="font-sans text-xs text-black/60 leading-relaxed max-w-sm">
              Based on 320+ bespoke commissions and exhibition acquisitions worldwide. Certified provenance is supplied with every original piece.
            </p>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-[#261B14] hover:text-white transition-all cursor-pointer text-[#261B14]"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-sans text-xs text-black/40 font-semibold tracking-wider">
              {current + 1} / {testimonials.length}
            </span>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-[#261B14] hover:text-white transition-all cursor-pointer text-[#261B14]"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Column: Sliding Testimonial Card */}
        <div className="lg:col-span-7 relative bg-[#F5F2EB] rounded-[2rem] border border-black/5 p-8 md:p-12 shadow-sm min-h-[340px] md:min-h-[280px] lg:min-h-[300px] flex flex-col justify-between overflow-hidden">
          
          {/* Subtle Decorative Quote Icon */}
          <Quote className="text-black/[0.03] absolute -top-4 -left-4 w-32 h-32 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-between h-full flex-1 relative z-10 space-y-6"
            >
              <p className="font-serif italic text-lg md:text-xl text-[#261B14] leading-relaxed">
                &ldquo;{active.quote}&rdquo;
              </p>

              <div className="flex justify-between items-end border-t border-black/5 pt-4">
                <div>
                  <h4 className="font-sans font-bold text-xs text-[#261B14]">
                    {active.author}
                  </h4>
                  <p className="font-sans text-[10px] text-black/50 uppercase tracking-wider mt-1">
                    {active.location} &bull; {active.product}
                  </p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(active.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C47A46] text-[#C47A46]" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
