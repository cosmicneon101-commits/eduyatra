import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "EduYatra Nepal — Your Journey to Global Success",
  description: "Modern education consultancy and test preparation in New Baneshwor, Kathmandu.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
