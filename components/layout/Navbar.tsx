"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { EDUYATRA_CONFIG } from "@/lib/constants";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { 
  Phone, Mail, MapPin, Search, ChevronDown, 
  Menu, X, ArrowRight, MessageCircle 
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm font-sans">
      {/* 1. Top Utility Header Bar */}
      <div className="bg-[#0b1f3a] text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-brand-orange" />
              {EDUYATRA_CONFIG.address}
            </span>
            <a href={tel:${EDUYATRA_CONFIG.phone}} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-brand-orange" />
              {EDUYATRA_CONFIG.phoneDisplay}
            </a>
            <a href={mailto:${EDUYATRA_CONFIG.email}} className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-brand-orange" />
              {EDUYATRA_CONFIG.email}
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 text-slate-400">
              <a href={EDUYATRA_CONFIG.socials.facebook} target="_blank" rel="noreferrer" className="hover:text-white">FB</a>
              <a href={EDUYATRA_CONFIG.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-white">IG</a>
              <a href={EDUYATRA_CONFIG.socials.tiktok} target="_blank" rel="noreferrer" className="hover:text-white">TK</a>
              <a href={EDUYATRA_CONFIG.socials.whatsapp} target="_blank" rel="noreferrer" className="hover:text-emerald-400">WA</a>
            </div>
            <div className="h-3 w-px bg-slate-700 mx-1"></div>
            <button className="text-slate-300 hover:text-white p-1" aria-label="Search">
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/brand/horizontal-logo.png"
              alt="EduYatra Nepal"
              width={210}
              height={55}
              priority
              className="object-contain h-12 w-auto"
            />
          </Link>

          {/* Navigation Links with Mega-Flyouts */}
          <nav className="hidden xl:flex items-center space-x-7 text-[13px] font-semibold text-slate-700">
            <Link href="/" className="text-brand-orange hover:text-brand-orange transition-colors">Home</Link>
            <Link href="/about" className="hover:text-brand-orange transition-colors">About Us</Link>

            {/* Test Preparation Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 py-6 hover:text-brand-orange transition-colors">
                <span>Test Preparation</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-orange transition-transform duration-150" />
              </button>
              <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 hidden group-hover:block animate-in fade-in-50 duration-150">
<Link href="/test-preparation/ielts" className="flex items-center justify-between px-5 py-2.5 hover:bg-slate-50">
                  <span className="font-semibold text-slate-800">IELTS</span>
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">Soon</span>
                </Link>
                <Link href="/test-preparation/pte" className="flex items-center justify-between px-5 py-2.5 hover:bg-slate-50">
                  <span className="font-semibold text-brand-navy">PTE Academic</span>
                  <span className="text-[10px] bg-orange-100 text-brand-orange px-2 py-0.5 rounded-full font-bold">Rs. 1,000</span>
                </Link>
                <Link href="/test-preparation/duolingo" className="flex items-center justify-between px-5 py-2.5 hover:bg-slate-50">
                  <span className="font-semibold text-brand-navy">Duolingo DET</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">Rs. 750</span>
                </Link>
              </div>
            </div>

            {/* Study Abroad Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 py-6 hover:text-brand-orange transition-colors">
                <span>Study Abroad</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-orange transition-transform duration-150" />
              </button>
              <div className="absolute top-full left-0 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 hidden group-hover:block animate-in fade-in-50 duration-150">
                <Link href="/study-abroad/australia" className="block px-5 py-2.5 hover:bg-slate-50 text-slate-800 font-medium">Study in Australia</Link>
                <Link href="/study-abroad/canada" className="block px-5 py-2.5 hover:bg-slate-50 text-slate-800 font-medium">Study in Canada</Link>
                <Link href="/study-abroad/uk" className="block px-5 py-2.5 hover:bg-slate-50 text-slate-800 font-medium">Study in UK</Link>
                <Link href="/study-abroad/usa" className="block px-5 py-2.5 hover:bg-slate-50 text-slate-800 font-medium">Study in USA</Link>
                <Link href="/study-abroad/new-zealand" className="block px-5 py-2.5 hover:bg-slate-50 text-slate-800 font-medium">Study in New Zealand</Link>
              </div>
            </div>

            <Link href="/blogs" className="hover:text-brand-orange transition-colors">Blogs</Link>
            <Link href="/community" className="hover:text-brand-orange transition-colors">Community</Link>
            <Link href="/faq" className="hover:text-brand-orange transition-colors">FAQ</Link>
            <Link href="/contact" className="hover:text-brand-orange transition-colors">Contact</Link>
          </nav>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center">
            <a
              href={getWhatsAppLink("Hello EduYatra Nepal, I would like to book a free consultation session.")}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-brand-orange hover:bg-[#d85312] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all"
            >
              Get Free Consultation
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>
{/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-100 px-6 py-6 space-y-4">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block font-semibold text-slate-800">Home</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block font-semibold text-slate-800">About Us</Link>
          <div className="border-y border-slate-100 py-3 space-y-2">
            <p className="text-[11px] font-black uppercase text-slate-400">Test Preparation</p>
            <Link href="/test-preparation/pte" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-brand-navy">PTE Academic (Rs. 1,000)</Link>
            <Link href="/test-preparation/duolingo" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-brand-navy">Duolingo DET (Rs. 750)</Link>
            <Link href="/test-preparation/ielts" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-brand-navy">IELTS (Coming Soon)</Link>
          </div>
          <Link href="/blogs" onClick={() => setMobileMenuOpen(false)} className="block font-semibold text-slate-800">Blogs</Link>
          <Link href="/community" onClick={() => setMobileMenuOpen(false)} className="block font-semibold text-slate-800">Community Forum</Link>
          <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="block font-semibold text-slate-800">FAQs</Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block font-semibold text-slate-800">Contact</Link>
          <div className="pt-2">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="w-full block text-center py-3 rounded-xl bg-brand-orange text-white font-bold text-xs shadow"
            >
              Get Free Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}