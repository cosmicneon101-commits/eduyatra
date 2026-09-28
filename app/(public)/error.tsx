"use client";
import Link from "next/link";
export default function PublicError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className="mx-auto flex min-h-[55vh] max-w-xl flex-col items-center justify-center px-4 text-center"><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-orange">Something went wrong</p><h1 className="mt-3 text-4xl font-black text-brand-navy">We could not load this page.</h1><p className="mt-3 text-slate-600">Please try again. If the problem continues, contact EduYatra through WhatsApp.</p><div className="mt-6 flex gap-3"><button onClick={() => reset()} className="rounded-full bg-brand-navy px-5 py-3 text-sm font-extrabold text-white">Try again</button><Link href="/" className="rounded-full border border-slate-200 px-5 py-3 text-sm font-extrabold text-brand-navy">Go home</Link></div></div>;
}
