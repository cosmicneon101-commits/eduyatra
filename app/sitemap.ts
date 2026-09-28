import type { MetadataRoute } from "next";
import prisma from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(/\/$/, "");
  const [pages, blogs, countries, courses] = await Promise.all([
    prisma.page.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
    prisma.blog.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
    prisma.country.findMany({ where: { isPublished: true }, select: { slug: true, updatedAt: true } }),
    prisma.course.findMany({ where: { isPublished: true }, select: { slug: true, updatedAt: true } }),
  ]);
  const fixed = ["/", "/about", "/study-abroad", "/blogs", "/community", "/faq", "/contact", "/test-booking"].map(path => ({ url: `${base}${path}`, changeFrequency: "weekly" as const, priority: path === "/" ? 1 : 0.7 }));
  return [
    ...fixed,
    ...courses.map(x => ({ url: `${base}/test-preparation/${x.slug}`, lastModified: x.updatedAt, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...countries.map(x => ({ url: `${base}/study-abroad/${x.slug}`, lastModified: x.updatedAt, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...blogs.map(x => ({ url: `${base}/blogs/${x.slug}`, lastModified: x.updatedAt, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...pages.filter(x => !["about", "contact", "privacy", "terms", "disclaimer"].includes(x.slug)).map(x => ({ url: `${base}/${x.slug}`, lastModified: x.updatedAt, changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
