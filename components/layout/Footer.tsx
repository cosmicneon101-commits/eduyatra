import Link from "next/link";
import Image from "next/image";
import { EDUYATRA_CONFIG } from "@/lib/constants";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0b1f3a] text-slate-300 pt-16 pb-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-2.5 rounded-xl w-fit">
              <Image
                src="/brand/horizontal-logo.png"
                alt="EduYatra Nepal"
                width={170}
                height={45}
                className="object-contain h-8 w-auto"
              />
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              EduYatra Nepal is your trusted partner for language test preparation and overseas academic guidance in New Baneshwor, Kathmandu.
            </p>
            <div className="flex space-x-3 pt-1 text-slate-400">
              <a href={EDUYATRA_CONFIG.socials.facebook} target="_blank" rel="noreferrer" className="hover:text-white">Facebook</a>
              <a href={EDUYATRA_CONFIG.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-white">Instagram</a>
              <a href={EDUYATRA_CONFIG.socials.tiktok} target="_blank" rel="noreferrer" className="hover:text-white">TikTok</a>
              <a href={EDUYATRA_CONFIG.socials.whatsapp} target="_blank" rel="noreferrer" className="hover:text-emerald-400">WhatsApp</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/blogs" className="hover:text-white">Blogs & Articles</Link></li>
              <li><Link href="/community" className="hover:text-white">Community Forum</Link></li>
              <li><Link href="/faq" className="hover:text-white">Frequently Asked Questions</Link></li>
            </ul>
          </div>

          {/* Test Preparation */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider">Test Preparation</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/test-preparation/pte" className="hover:text-white">PTE Academic (Rs. 1,000)</Link></li>
              <li><Link href="/test-preparation/duolingo" className="hover:text-white">Duolingo English Test (Rs. 750)</Link></li>
              <li><Link href="/test-preparation/ielts" className="hover:text-white">IELTS Coaching</Link></li>
              <li><Link href="/contact" className="hover:text-white">Diagnostic Practice Tests</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <span>{EDUYATRA_CONFIG.address}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <span>{EDUYATRA_CONFIG.phoneDisplay}</span>
</li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                <span>{EDUYATRA_CONFIG.email}</span>
              </li>
              <li className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <span>{EDUYATRA_CONFIG.officeHours}</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-slate-500">
          <p>© {new Date().getFullYear()} EduYatra Nepal. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/privacy-policy" className="hover:text-slate-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300">Terms & Conditions</Link>
            <Link href="/admin/login" className="hover:text-brand-orange">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}