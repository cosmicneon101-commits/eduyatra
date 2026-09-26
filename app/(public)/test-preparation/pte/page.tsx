import { EDUYATRA_CONFIG } from "@/lib/constants";
import { getWhatsAppLink } from "@/lib/whatsapp";

export default function PtePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-6">
      <h1 className="text-3xl font-black text-brand-navy">PTE Academic Preparation (Rs. 1,000)</h1>
      <p className="text-sm text-slate-600">Daily interactive online coaching from 9:00 PM to 10:00 PM.</p>
      <div className="flex gap-4">
        <a href={getWhatsAppLink(EDUYATRA_CONFIG.courses.pte.waMessage)} target="_blank" rel="noreferrer" className="px-6 py-3 bg-brand-orange text-white text-xs font-bold rounded-xl">
          Book Now (WhatsApp)
        </a>
        <a href={EDUYATRA_CONFIG.googleFormEnrollment} target="_blank" rel="noreferrer" className="px-6 py-3 bg-slate-200 text-slate-800 text-xs font-bold rounded-xl">
          Fill the Form
        </a>
      </div>
    </div>
  );
}
