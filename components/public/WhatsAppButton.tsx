import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";
export default function WhatsAppButton({ message, label = "Chat on WhatsApp", className = "" }: { message?: string; label?: string; className?: string }) {
  return <a href={getWhatsAppLink(message)} target="_blank" rel="noreferrer" className={`inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-brand-orange/20 transition hover:-translate-y-0.5 hover:bg-orange-600 ${className}`}><MessageCircle className="h-4 w-4" />{label}</a>;
}
