import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/db";
export const dynamic="force-dynamic";
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const blog = await prisma.blog.findFirst({ where: { slug: params.slug, status: "PUBLISHED" }, select: { title: true, excerpt: true, seoTitle: true, seoDescription: true } });
  if (!blog) return {};
  return { title: blog.seoTitle || blog.title, description: blog.seoDescription || blog.excerpt };
}

export default async function BlogPostPage({params}:{params:{slug:string}}){const blog=await prisma.blog.findFirst({where:{slug:params.slug,status:"PUBLISHED"}});if(!blog)return notFound();return <article><header className="bg-gradient-to-br from-slate-50 to-orange-50"><div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8"><Link href="/blogs" className="text-xs font-extrabold text-brand-orange">← Back to insights</Link><p className="mt-8 text-xs font-extrabold uppercase tracking-[0.22em] text-brand-orange">{blog.category}</p><h1 className="mt-3 text-4xl font-black leading-tight text-brand-navy sm:text-6xl">{blog.title}</h1><p className="mt-5 text-lg leading-8 text-slate-600">{blog.excerpt}</p><p className="mt-6 text-xs font-bold text-slate-400">By {blog.author}</p>{blog.coverImage && <div className="mt-8 overflow-hidden rounded-2xl"><Image src={blog.coverImage} alt={blog.title} width={1200} height={630} className="h-auto w-full object-cover" /></div>}</div></header><div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8"><div className="leading-8 text-slate-700 [&_a]:text-brand-blue [&_a]:underline [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-brand-orange [&_blockquote]:pl-5 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-brand-navy [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-black [&_li]:ml-5 [&_li]:list-disc [&_ol]:my-4 [&_p]:my-4 [&_ul]:my-4" dangerouslySetInnerHTML={{__html:blog.content}}/><div className="mt-12 rounded-2xl bg-brand-navy p-7 text-white"><h2 className="text-2xl font-black">Need help with your next step?</h2><p className="mt-2 text-sm leading-6 text-white/70">Talk to EduYatra about test preparation or your study-abroad plan.</p><Link href="/contact" className="mt-5 inline-flex rounded-full bg-brand-orange px-5 py-3 text-sm font-extrabold">Contact EduYatra</Link></div></div></article>}
