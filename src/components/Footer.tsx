"use client";

import Link from "next/link";
import { Mail, Phone, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#FDFBF7] text-[#261B14] border-t border-black/5 pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Grid: Links and Brand Summary */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-black/5">
          
          {/* Brand Info (4 Columns) */}
          <div className="md:col-span-4 flex flex-col items-start gap-4">
            <span className="font-serif text-2xl font-black tracking-widest text-[#261B14]">
              WOODPECKER
            </span>
            <p className="font-sans text-xs text-[#261B14]/60 leading-relaxed max-w-sm">
              Bespoke, hand-chiselled wood wall art masterpieces sourced from sustainably reclaimed timbers. Designed to bring organic energy, acoustic dampening, and sculptural beauty to modern walls.
            </p>
          </div>

          {/* Quick Links (2 Columns) */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#261B14]/40">
              Collections
            </span>
            <nav className="flex flex-col gap-2.5 text-xs font-semibold text-[#261B14]/75">
              <Link href="/" className="hover:text-warm-cedar transition-colors">Home</Link>
              <Link href="/gallery" className="hover:text-warm-cedar transition-colors">Gallery</Link>
              <Link href="#" className="hover:text-warm-cedar transition-colors">Exhibitions</Link>
              <Link href="#" className="hover:text-warm-cedar transition-colors">Provenance</Link>
            </nav>
          </div>

          {/* Support Info (3 Columns) */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#261B14]/40">
              Collector Support
            </span>
            <nav className="flex flex-col gap-2.5 text-xs font-semibold text-[#261B14]/75">
              <Link href="#" className="hover:text-warm-cedar transition-colors">Art Care Guide</Link>
              <Link href="#" className="hover:text-warm-cedar transition-colors">Shipping & Returns</Link>
              <Link href="#" className="hover:text-warm-cedar transition-colors">Collector FAQs</Link>
              <Link href="https://wa.me/94788056838" target="_blank" rel="noopener noreferrer" className="hover:text-warm-cedar transition-colors inline-flex items-center gap-1">
                WhatsApp Hotline <ExternalLink className="w-3 h-3 text-[#261B14]/40" />
              </Link>
            </nav>
          </div>

          {/* Socials (3 Columns) */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#261B14]/40">
              Stay Connected
            </span>
            <nav className="flex flex-col gap-2.5 text-xs font-semibold text-[#261B14]/75">
              <Link href="#" className="hover:text-warm-cedar transition-colors">Instagram</Link>
              <Link href="#" className="hover:text-warm-cedar transition-colors">Pinterest</Link>
              <Link href="#" className="hover:text-warm-cedar transition-colors">YouTube</Link>
            </nav>
          </div>

        </div>

        {/* Bottom Row: Copyright, Developer Credit & Contact Info */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] text-[#261B14]/60 font-sans font-medium">
          
          {/* Copyright Statement */}
          <div>
            &copy; {new Date().getFullYear()} woodpecker.lk. All rights reserved.
          </div>

          {/* Developed By & Contact Details (Aligned right/center) */}
          <div className="flex flex-col items-center md:items-end gap-1.5 text-center md:text-right">
            <div>
              Developed By{" "}
              <a 
                href="https://www.quantumblaze.lk" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-warm-cedar font-bold hover:underline transition-all inline-flex items-center gap-0.5"
              >
                Quantum Blaze <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            <div className="text-[10px] opacity-80 flex flex-wrap justify-center md:justify-end items-center gap-3">
              <a href="mailto:contact@quantumblaze.lk" className="hover:text-warm-cedar transition-colors inline-flex items-center gap-1">
                <Mail className="w-3 h-3" /> contact@quantumblaze.lk
              </a>
              <span className="hidden sm:inline opacity-30">|</span>
              <a href="tel:+94788056838" className="hover:text-warm-cedar transition-colors inline-flex items-center gap-1">
                <Phone className="w-3 h-3" /> +94 78 805 6838
              </a>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
