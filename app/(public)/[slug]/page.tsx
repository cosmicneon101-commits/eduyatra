import { notFound } from "next/navigation";
import type { Metadata } from "next";

import prisma from "@/lib/db";
export const dynamic="force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = await prisma.page.findFirst({ where: { slug: params.slug, status: "PUBLISHED" }, select: { title: true, seoTitle: true, seoDescription: true, heroSubtitle: true } });
  if (!page) return {};
  return { title: page.seoTitle || page.title, description: page.seoDescription || page.heroSubtitle || undefined };
}
export default async function GenericPage({params}:{params:{slug:string}}){const page=await prisma.page.findFirst({where:{slug:params.slug,status:"PUBLISHED"}});if(!page)return notFound();return <div><section className="bg-gradient-to-br from-slate-50 to-blue-50"><div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8"><p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-orange">EduYatra Nepal</p><h1 className="mt-3 text-5xl font-black text-brand-navy">{page.heroTitle||page.title}</h1>{page.heroImage&&<img src={page.heroImage} alt="" className="mt-8 max-h-80 w-full rounded-2xl object-cover" />}{page.heroSubtitle&&<p className="mt-5 text-lg leading-8 text-slate-600">{page.heroSubtitle}</p>}</div></section><section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8"><div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm leading-8 text-slate-600 [&_a]:text-brand-blue [&_a]:underline [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-brand-navy [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-black [&_li]:ml-5 [&_li]:list-disc [&_p]:my-4" dangerouslySetInnerHTML={{__html:page.content}}/></section></div>}
