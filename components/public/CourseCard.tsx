import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

export default function CourseCard({ course }: { course: any }) {
  const first = course.packages?.[0];
  return <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
    <div className="bg-gradient-to-br from-brand-navy to-brand-blue p-6 text-white">
      <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-white/70">{course.shortName || course.name}</p><h3 className="mt-1 text-2xl font-black">{course.name}</h3></div><Sparkles className="h-6 w-6 text-orange-300" /></div>
      <p className="mt-3 text-sm leading-6 text-white/80">{course.description}</p>
    </div>
    <div className="flex flex-1 flex-col p-6">
      <div className="mb-5 grid grid-cols-2 gap-2 text-xs font-bold text-slate-600"><span className="rounded-lg bg-slate-50 px-3 py-2">{course.mode}</span><span className="rounded-lg bg-slate-50 px-3 py-2">{course.availability}</span></div>
      <ul className="space-y-2 text-sm text-slate-700">{course.features?.map((f: any) => <li key={f.id} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />{f.label}</li>)}</ul>
      {first && <div className="mt-6 rounded-2xl bg-orange-50 p-4"><p className="text-xs font-bold uppercase tracking-wide text-brand-orange">Starting from</p><p className="mt-1 text-2xl font-black text-brand-navy">Rs. {first.price.toLocaleString()}</p></div>}
      <div className="mt-6 flex flex-wrap gap-2"><Link href={`/test-preparation/${course.slug}`} className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-4 py-2.5 text-xs font-extrabold text-white">View course <ArrowRight className="h-3.5 w-3.5" /></Link><WhatsAppButton label="Enquire" message={`Hello EduYatra, I would like to inquire about ${course.name} online classes.`} className="px-4 py-2.5 text-xs" /></div>
    </div>
  </article>;
}
