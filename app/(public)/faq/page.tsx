import prisma from "@/lib/db";
import FaqAccordion from "@/components/faq/FaqAccordion";

export default async function FaqPage() {
  const faqs = await prisma.fAQ.findMany({ where: { isPublished: true }, orderBy: { sortOrder: "asc" } });
  const categories = Array.from(new Set(faqs.map(f => f.category)));
  const grouped = categories.map(cat => ({ name: cat, faqs: faqs.filter(f => f.category === cat) }));

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-extrabold text-brand-navy text-center mb-10">Frequently Asked Questions</h1>
      <FaqAccordion groupedFaqs={grouped}/>
    </div>
  );
}
