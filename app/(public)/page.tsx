import Link from "next/link";
import Image from "next/image";
import { EDUYATRA_CONFIG } from "@/lib/constants";
import { getWhatsAppLink } from "@/lib/whatsapp";
import prisma from "@/lib/db";

export default async function HomePage() {
  const testimonials = await prisma.testimonial.findMany({ where: { isPublished: true }, take: 3 });

  return (
    <div>
      <section className="py-20 text-center bg-gradient-to-b from-white to-slate-100 px-4">
        <h1 className="text-4xl sm:text-6xl font-black text-brand-navy">
          Your Journey to <br/><span className="text-brand-orange">Global Success</span>
        </h1>
        <p className="mt-4 text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
          Affordable online PTE (Rs. 1000), Duolingo (Rs. 750), and IELTS classes in New Baneshwor, Kathmandu.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a href={getWhatsAppLink()} target="_blank" rel="noreferrer" className="px-8 py-3.5 rounded-full bg-brand-orange text-white font-bold text-sm shadow">
            WhatsApp Consultation
          </a>
          <Link className="px-8 py-3.5 rounded-full bg-brand-navy text-white font-bold text-sm shadow" href="/test-preparation/pte">
            Explore Courses
          </Link>
        </div>
      </section>

      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-brand-navy text-center mb-8">Verified Student Scores</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.id} className="bg-white p-5 rounded-2xl border shadow-sm">
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-slate-100">
                {t.photo && <Image alt={t.name} className="object-cover" fill src={t.photo}/>}
              </div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-slate-800">{t.name}</h3>
                <span className="px-3 py-1 bg-brand-orange text-white font-black text-xs rounded-full">PTE {t.score}</span>
              </div>
              <p className="text-xs text-slate-600 italic">"{t.content}"</p>
              <div className="mt-4 pt-3 border-t grid grid-cols-4 gap-1 text-center text-[10px] font-bold">
                <span className="bg-slate-50 p-1 border rounded">R: {t.reading}</span>
                <span className="bg-slate-50 p-1 border rounded">L: {t.listening}</span>
                <span className="bg-slate-50 p-1 border rounded">W: {t.writing}</span>
                <span className="bg-slate-50 p-1 border rounded">S: {t.speaking}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
