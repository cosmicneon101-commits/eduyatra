"use client";
import Link from "next/link";
import Image from "next/image";
import { EDUYATRA_CONFIG } from "@/lib/constants";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { Phone, MessageCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link className="flex items-center space-x-2" href="/">
            <Image alt="EduYatra Nepal" className="h-10 w-auto object-contain" height={50} src="/brand/horizontal-logo.png" width={180}/>
          </Link>
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-slate-700">
            <Link className="hover:text-brand-orange" href="/">Home</Link>
            <Link className="hover:text-brand-orange" href="/about">About</Link>
            <Link className="hover:text-brand-orange" href="/test-preparation/pte">PTE (Rs. 1000)</Link>
            <Link className="hover:text-brand-orange" href="/test-preparation/duolingo">Duolingo (Rs. 750)</Link>
            <Link className="hover:text-brand-orange" href="/test-preparation/ielts">IELTS</Link>
            <Link className="hover:text-brand-orange" href="/study-abroad">Study Abroad</Link>
            <Link className="hover:text-brand-orange" href="/blogs">Blogs</Link>
            <Link className="hover:text-brand-orange" href="/community">Discussion Forum</Link>
            <Link className="hover:text-brand-orange" href="/faq">FAQs</Link>
            <Link className="hover:text-brand-orange" href="/contact">Contact</Link>
          </nav>
          <div className="flex items-center space-x-3">
            <a href={`tel:${EDUYATRA_CONFIG.phone}`} className="hidden sm:flex items-center space-x-1.5 text-xs font-semibold bg-slate-100 px-3.5 py-2 rounded-full text-brand-navy">
              <Phone className="w-3.5 h-3.5 text-brand-orange"/>
              <span>{EDUYATRA_CONFIG.phoneDisplay}</span>
            </a>
            <a href={getWhatsAppLink()} target="_blank" rel="noreferrer" className="flex items-center space-x-2 text-xs font-bold text-white bg-brand-orange px-4 py-2.5 rounded-full shadow">
              <MessageCircle className="w-4 h-4 fill-white"/>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
