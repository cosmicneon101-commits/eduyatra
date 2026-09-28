import { EDUYATRA_CONFIG } from "./constants";

export function getWhatsAppLink(customMessage?: string, phoneRaw = EDUYATRA_CONFIG.phoneRaw): string {
  const text = customMessage || "Hello EduYatra, I would like to inquire about your online classes.";
  return `https://wa.me/${phoneRaw}?text=${encodeURIComponent(text)}`;
}
