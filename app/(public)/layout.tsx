import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/public/FloatingWhatsApp";
import { getPublicSiteConfig } from "@/lib/site-config";
import prisma from "@/lib/db";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const [site, courses] = await Promise.all([
    getPublicSiteConfig(),
    prisma.course.findMany({ where: { isPublished: true }, select: { name: true, slug: true, shortName: true }, orderBy: { sortOrder: "asc" } }),
  ]);
  return <><Navbar site={site} courses={courses} /><main className="flex-1">{children}</main><Footer site={site} /><FloatingWhatsApp /></>;
}
