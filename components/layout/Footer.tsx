import Link from "next/link";
import { EDUYATRA_CONFIG } from "@/lib/constants";
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t text-xs">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold text-white text-base mb-2">EduYatra Nepal</h4>
          <p className="text-slate-400">{EDUYATRA_CONFIG.tagline}</p>
          <p className="mt-2 text-slate-400">{EDUYATRA_CONFIG.address}</p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-2">Language Classes</h4>
          <p>PTE Academic (9 PM - 10 PM)</p>
          <p>Duolingo DET (8 PM - 9 PM)</p>
          <p>IELTS Academic & General</p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-2">Community</h4>
          <Link className="block hover:text-white" href="/community">Discussion Forum</Link>
          <Link className="block hover:text-white" href="/faq">30 Common FAQs</Link>
          <Link className="block hover:text-white" href="/blogs">Blogs & Guides</Link>
        </div>
        <div>
          <h4 className="font-bold text-white mb-2">Connect</h4>
          <p>{EDUYATRA_CONFIG.phoneDisplay}</p>
          <p>{EDUYATRA_CONFIG.email}</p>
          <p>{EDUYATRA_CONFIG.officeHours}</p>
        </div>
      </div>
      <p className="text-center text-slate-500 mt-8">© 2026 EduYatra Nepal. All rights reserved.</p>
    </footer>
  );
}
