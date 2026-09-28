import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";
export default function FloatingWhatsApp(){return <a aria-label="Chat with EduYatra on WhatsApp" href={getWhatsAppLink()} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange text-white shadow-2xl shadow-brand-orange/30 ring-4 ring-white transition hover:scale-105"><MessageCircle className="h-6 w-6" /></a>}
