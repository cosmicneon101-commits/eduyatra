import { getSiteSettings } from "@/lib/public-data";
import { EDUYATRA_CONFIG } from "@/lib/constants";

export type PublicSiteConfig = {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  phoneDisplay: string;
  phoneRaw: string;
  email: string;
  officeHours: string;
  socials: { instagram: string; facebook: string; tiktok: string; whatsapp: string };
};

export async function getPublicSiteConfig(): Promise<PublicSiteConfig> {
  const settings = await getSiteSettings();
  const phone = settings.phone || EDUYATRA_CONFIG.phone;
  const phoneRaw = (settings.whatsapp_number || phone).replace(/\D/g, "");
  return {
    name: settings.site_name || EDUYATRA_CONFIG.name,
    tagline: settings.tagline || EDUYATRA_CONFIG.tagline,
    address: settings.address || EDUYATRA_CONFIG.address,
    phone,
    phoneDisplay: phone || EDUYATRA_CONFIG.phoneDisplay,
    phoneRaw: phoneRaw || EDUYATRA_CONFIG.phoneRaw,
    email: settings.email || EDUYATRA_CONFIG.email,
    officeHours: settings.office_hours || EDUYATRA_CONFIG.officeHours,
    socials: {
      instagram: settings.instagram || EDUYATRA_CONFIG.socials.instagram,
      facebook: settings.facebook || EDUYATRA_CONFIG.socials.facebook,
      tiktok: settings.tiktok || EDUYATRA_CONFIG.socials.tiktok,
      whatsapp: `https://wa.me/${phoneRaw || EDUYATRA_CONFIG.phoneRaw}`,
    },
  };
}
