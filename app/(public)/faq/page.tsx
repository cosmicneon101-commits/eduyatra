import prisma from "@/lib/db";
import FaqAccordion from "@/components/faq/FaqAccordion";
import SectionHeading from "@/components/public/SectionHeading";
export const dynamic="force-dynamic";
export default async function FaqPage(){const faqs=await prisma.fAQ.findMany({where:{isPublished:true},orderBy:{sortOrder:"asc"}});const categories=Array.from(new Set(faqs.map(f=>f.category)));const grouped=categories.map(cat=>({name:cat,faqs:faqs.filter(f=>f.category===cat)}));return <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8"><SectionHeading eyebrow="Help centre" title="Frequently asked questions" description="Find quick answers about courses, tests, study abroad and how to get started with EduYatra."/><div className="mt-10"><FaqAccordion groupedFaqs={grouped}/></div></div>}
