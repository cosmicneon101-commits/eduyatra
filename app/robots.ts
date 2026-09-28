import type { MetadataRoute } from "next";
import { getPublicSiteConfig } from "@/lib/site-config";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await getPublicSiteConfig();
  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return { rules: [{ userAgent: "*", allow: "/", disallow: "/admin/" }], sitemap: `${base.replace(/\/$/, "")}/sitemap.xml`, host: site.name ? base : undefined };
}
