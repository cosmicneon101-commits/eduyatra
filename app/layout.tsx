import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: { default: "EduYatra Nepal — Your Journey to Global Success", template: "%s | EduYatra Nepal" },
  description: "Online PTE, Duolingo and IELTS preparation, test booking and study-abroad guidance from Nepal.",
  applicationName: "EduYatra Nepal",
  keywords: ["EduYatra Nepal", "PTE classes Nepal", "IELTS classes Nepal", "Duolingo English Test Nepal", "study abroad Nepal"],
  openGraph: { type: "website", siteName: "EduYatra Nepal", title: "EduYatra Nepal — Your Journey to Global Success", description: "Online test preparation, test booking and study-abroad guidance." },
  twitter: { card: "summary_large_image", title: "EduYatra Nepal", description: "Online test preparation and study-abroad guidance." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="flex min-h-screen flex-col">{children}</body></html>;
}
