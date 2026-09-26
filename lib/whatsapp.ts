import { EDUYATRA_CONFIG } from "./constants";
export function getWhatsAppLink(customMessage?: string): string {
  const text = customMessage || "Hello EduYatra Nepal, I would like to inquire about language classes.";
  return `https://wa.me/${EDUYATRA_CONFIG.phoneRaw}?text=${encodeURIComponent(text)}`;
}
