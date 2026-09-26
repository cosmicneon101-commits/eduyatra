"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqAccordion({ groupedFaqs }: { groupedFaqs: any[] }) {
  const [activeTab, setActiveTab] = useState(groupedFaqs[0]?.name || "");
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const current = groupedFaqs.find((g) => g.name === activeTab) || groupedFaqs[0];

  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {groupedFaqs.map((g) => (
          <button
            key={g.name}
            onClick={() => setActiveTab(g.name)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === g.name ? "bg-brand-navy text-white shadow" : "bg-white text-slate-600 border"
            }`}
          >
            {g.name}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {current?.faqs.map((faq: any) => {
          const isOpen = openFaq === faq.id;
          return (
            <div key={faq.id} className="bg-white rounded-2xl border p-5 shadow-sm">
              <button onClick={() => setOpenFaq(isOpen ? null : faq.id)} className="w-full text-left font-bold flex justify-between">
                <span>{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-brand-orange transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && <p className="mt-3 text-sm text-slate-600 leading-relaxed border-t pt-3">{faq.answer}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
