import Link from "next/link";
import Image from "next/image";
import { EDUYATRA_CONFIG } from "@/lib/constants";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { 
  ArrowRight, CheckCircle2, Clock, Star, MessageCircle, 
  GraduationCap, Plane, Users, FileCheck, Award, BookOpen, Quote 
} from "lucide-react";
import prisma from "@/lib/db";

export default async function HomePage() {
  const [testimonials, latestBlogs] = await Promise.all([
    prisma.testimonial.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
      take: 3,
    }),
    prisma.blog.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 4,
    }),
  ]);

  return (
    <div className="bg-white min-h-screen text-slate-900">
      
      {/* 1. HERO BANNER */}
      <section className="relative bg-[#022b69] text-white pt-16 pb-28 sm:pb-36 overflow-hidden">
        {/* Mountain outline aesthetic gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#011d47] via-[#022b69] to-[#04439c] opacity-95"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-25"
          style={{ backgroundImage: url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop') }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block text-xs font-black tracking-widest text-[#50b2ff] uppercase">
                Education Consultancy in Nepal
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12]">
                Your Global Education <br />
                Journey <span className="text-brand-orange">Starts Here</span>
              </h1>

              <p className="text-slate-200 text-base sm:text-lg max-w-xl leading-relaxed">
                We help you achieve your dreams of studying abroad with expert guidance, test preparation, and personalized support.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href={getWhatsAppLink("Hello EduYatra Nepal, I want to get a free consultation.")}
                  target="_blank"
                  rel="noreferrer"
                  className="px-7 py-3.5 rounded-xl bg-brand-orange hover:bg-[#d85312] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <span>Get Free Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/test-preparation"
                  className="px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-sm transition-all"
                >
                  Explore Programs
                </Link>
              </div>
            </div>

            {/* Hero Student Graphic with chalkboard doodle styling */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                  <Image
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop"
                    alt="Student Global Journey"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
{/* Floating Chalk Doodle Badge */}
                  <div className="absolute top-6 right-6 bg-white/15 backdrop-blur-md border border-white/30 px-4 py-2 rounded-2xl text-center transform rotate-3">
                    <p className="font-serif italic text-xs text-white">Dream. Learn. Achieve</p>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl text-slate-900 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-400">Head Office</p>
                        <p className="text-xs font-bold text-brand-navy">New Baneshwor, Kathmandu</p>
                      </div>
                      <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                        Open 6am - 10pm
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FLOATING 5-FEATURE HIGHLIGHT STRIP (Matches Mockup) */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-8 -mt-16 sm:-mt-20 z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-slate-800">Test Preparation</h4>
            <p className="text-[11px] text-slate-500 leading-tight">IELTS, PTE, Duolingo, SAT</p>
          </div>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center mx-auto">
              <Plane className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-slate-800">Study Abroad</h4>
            <p className="text-[11px] text-slate-500 leading-tight">Australia, Canada, UK, USA, NZ</p>
          </div>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-slate-800">Expert Guidance</h4>
            <p className="text-[11px] text-slate-500 leading-tight">Personalized counseling</p>
          </div>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <FileCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-slate-800">Visa Support</h4>
            <p className="text-[11px] text-slate-500 leading-tight">End-to-end application aid</p>
          </div>

          <div className="text-center space-y-2 col-span-2 md:col-span-1">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-slate-800">Success Stories</h4>
            <p className="text-[11px] text-slate-500 leading-tight">Real students, real scores</p>
          </div>

        </div>
      </section>

      {/* 3. POPULAR PROGRAMS / TEST PREPARATION GRID (Matches Mockup) */}
<section className="py-24 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Section Description Left */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[11px] font-black uppercase tracking-widest text-brand-blue">
              Popular Programs
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy leading-tight">
              Test Preparation
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Achieve your target scores with our expert-led preparation programs. We provide the right guidance, practice materials, and support to help you succeed.
            </p>
            <div className="pt-2">
              <Link
                href="/test-preparation"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs shadow transition-all"
              >
                <span>View All Test Preparation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 4 Cards Grid Right */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* IELTS */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-center">
              <div>
                <div className="w-12 h-12 rounded-full bg-red-500 text-white font-black text-xs flex items-center justify-center mx-auto mb-4 shadow">
                  IELTS
                </div>
                <h4 className="font-bold text-base text-slate-800">IELTS</h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Achieve your target band score with expert guidance.
                </p>
              </div>
              <Link href="/test-preparation/ielts" className="mt-6 text-xs font-bold text-brand-blue hover:underline">
                Learn More →
              </Link>
            </div>

            {/* PTE */}
            <div className="bg-white rounded-2xl p-6 border-2 border-brand-blue/30 shadow-md hover:shadow-lg transition-all flex flex-col justify-between text-center">
              <div>
                <div className="w-12 h-12 rounded-full bg-brand-blue text-white font-black text-xs flex items-center justify-center mx-auto mb-4 shadow">
                  PTE
                </div>
                <h4 className="font-bold text-base text-brand-navy">PTE</h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Computer-based test for your global future. Rs. 1,000.
                </p>
              </div>
              <Link href="/test-preparation/pte" className="mt-6 text-xs font-bold text-brand-orange hover:underline">
                Learn More →
              </Link>
            </div>

            {/* Duolingo */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-center">
              <div>
                <div className="w-12 h-12 rounded-full bg-lime-500 text-white font-black text-xs flex items-center justify-center mx-auto mb-4 shadow">
                  DET
                </div>
                <h4 className="font-bold text-base text-slate-800">Duolingo</h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Build your English skills with fast flexible tests. Rs. 750.
                </p>
              </div>
              <Link href="/test-preparation/duolingo" className="mt-6 text-xs font-bold text-brand-blue hover:underline">
                Learn More →
              </Link>
            </div>
{/* SAT */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-center">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#0a1e3b] text-white font-black text-xs flex items-center justify-center mx-auto mb-4 shadow">
                  SAT
                </div>
                <h4 className="font-bold text-base text-slate-800">SAT</h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Comprehensive prep for global university admissions.
                </p>
              </div>
              <Link href="/contact" className="mt-6 text-xs font-bold text-brand-blue hover:underline">
                Learn More →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE EDUYATRA / TRUSTED BY THOUSANDS (Matches Mockup) */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left description */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[11px] font-black uppercase tracking-widest text-brand-blue">
                Why Choose EduYatra Nepal
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-brand-navy leading-tight">
                Trusted by Thousands <br />of Students
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                We have helped 5,000+ students achieve their dreams of studying abroad. Our commitment to excellence and personalized support sets us apart.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs shadow transition-all"
                >
                  <span>About Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Middle Stats Counter 2x2 */}
            <div className="lg:col-span-3 grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
                <p className="text-3xl font-black text-brand-blue">5,000+</p>
                <p className="text-[11px] font-bold text-slate-500 mt-1">Students Guided</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
                <p className="text-3xl font-black text-brand-orange">98%</p>
                <p className="text-[11px] font-bold text-slate-500 mt-1">Success Rate</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
                <p className="text-3xl font-black text-brand-navy">25+</p>
                <p className="text-[11px] font-bold text-slate-500 mt-1">Partner Colleges</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
                <p className="text-3xl font-black text-emerald-600">10+</p>
                <p className="text-[11px] font-bold text-slate-500 mt-1">Years Experience</p>
              </div>
            </div>

            {/* Right Student Landmark Image */}
            <div className="lg:col-span-4">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white">

<Image
                  src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1000&auto=format&fit=crop"
                  alt="Global Education"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow text-center">
                  <p className="text-[10px] font-serif italic text-brand-navy font-bold">Global Education. Brighter Future</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. WHAT OUR STUDENTS SAY (TESTIMONIALS - Matches Mockup) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-black uppercase tracking-widest text-brand-orange">
            Student Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy mt-1">
            What Our Students Say
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Real stories from real students who achieved their dreams with EduYatra Nepal.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <Quote className="w-8 h-8 text-slate-300 mb-4" />
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-brand-navy text-white font-bold flex items-center justify-center text-xs">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-800">{t.name}</h5>
                    <p className="text-[10px] text-slate-400">{t.testType} Candidate</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-brand-orange text-white font-extrabold text-[11px]">
                  {t.score} Score
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. LATEST BLOGS & UPDATES (Matches Mockup) */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-brand-blue">
                Latest Blogs
              </span>
              <h2 className="text-3xl font-black text-brand-navy mt-1">
                Tips, News & Updates
              </h2>
            </div>
            <Link href="/blogs" className="mt-4 sm:mt-0 text-xs font-bold text-brand-navy hover:text-brand-orange transition-colors">
              View All Blogs →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestBlogs.map((b) => (
              <Link
                key={b.id}
                href={/blogs/${b.slug}}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[16/10] bg-slate-200 overflow-hidden">
                    <Image
                      src={b.coverImage || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"}
                      alt={b.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-extrabold text-brand-orange uppercase">
                      {b.category}
                    </span>
                    <h4 className="font-bold text-xs text-slate-800 mt-2 line-clamp-2 group-hover:text-brand-navy transition-colors">
                      {b.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-2 line-clamp-2">
                      {b.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 text-[10px] font-bold text-slate-400">
                  {new Date(b.publishedAt).toLocaleDateString()}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}