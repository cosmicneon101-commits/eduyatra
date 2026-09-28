import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Users, FileText, HelpCircle, Star, MessageSquare, BookOpen, ClipboardCheck, Globe2, PanelsTopLeft, Image as ImageIcon, Mail, UserCog, Settings, ScrollText, LogOut } from "lucide-react";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { hasPermission } from "@/lib/admin";
import { logoutAction } from "@/app/admin/actions";

const groups = [
  { title: "Overview", items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard, permission: "DASHBOARD_VIEW" }] },
  { title: "Content", items: [
    { href: "/admin/courses", label: "Courses", icon: BookOpen, permission: "COURSE_VIEW" },
    { href: "/admin/test-booking", label: "Test Booking", icon: ClipboardCheck, permission: "TEST_BOOKING_VIEW" },
    { href: "/admin/countries", label: "Countries", icon: Globe2, permission: "COUNTRY_VIEW" },
    { href: "/admin/pages", label: "Pages", icon: PanelsTopLeft, permission: "PAGE_VIEW" },
    { href: "/admin/blogs", label: "Blogs", icon: FileText, permission: "BLOG_VIEW" },
    { href: "/admin/faqs", label: "FAQs", icon: HelpCircle, permission: "FAQ_VIEW" },
    { href: "/admin/testimonials", label: "Testimonials", icon: Star, permission: "TESTIMONIAL_VIEW" },
    { href: "/admin/media", label: "Media", icon: ImageIcon, permission: "MEDIA_VIEW" },
  ] },
  { title: "Community & Leads", items: [
    { href: "/admin/community", label: "Community", icon: MessageSquare, permission: "COMMUNITY_VIEW" },
    { href: "/admin/leads", label: "Leads", icon: Users, permission: "LEADS_VIEW" },
    { href: "/admin/subscribers", label: "Subscribers", icon: Mail, permission: "ANNOUNCEMENTS_VIEW" },
  ] },
  { title: "Administration", items: [
    { href: "/admin/admins", label: "Admins & Permissions", icon: UserCog, permission: "ADMIN_VIEW" },
    { href: "/admin/settings", label: "Site Settings", icon: Settings, permission: "SETTINGS_VIEW" },
    { href: "/admin/audit", label: "Audit Log", icon: ScrollText, permission: "AUDIT_VIEW" },
  ] },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) redirect("/admin/login");
  const visibleGroups = await Promise.all(groups.map(async group => ({ ...group, items: await Promise.all(group.items.map(async item => ({ ...item, visible: admin.role === "SUPER_ADMIN" || await hasPermission(admin.id, item.permission as any) }))) }))).then(gs => gs.map(g => ({ ...g, items: g.items.filter(i => i.visible) })).filter(g => g.items.length));
  return <div className="min-h-screen bg-slate-50 text-slate-900">
    <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="flex h-20 items-center border-b px-6"><Image src="/brand/horizontal-logo.png" width={180} height={50} alt="EduYatra Nepal" className="h-10 w-auto" /></div>
      <div className="px-6 py-4 border-b"><p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Admin Portal</p><p className="mt-1 font-semibold text-brand-navy">{admin.name}</p><p className="text-xs text-slate-500">{admin.role === "SUPER_ADMIN" ? "Superadmin" : "Administrator"}</p></div>
      <nav className="flex-1 overflow-y-auto p-4 space-y-5">{visibleGroups.map(group => <div key={group.title}><p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">{group.title}</p><div className="space-y-1">{group.items.map(item => { const Icon = item.icon; return <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-brand-navy"><Icon className="h-4 w-4" />{item.label}</Link>; })}</div></div>)}</nav>
      <form action={logoutAction} className="border-t p-4"><button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600"><LogOut className="h-4 w-4" />Sign out</button></form>
    </aside>
    <main className="lg:pl-72"><div className="mx-auto max-w-7xl p-5 sm:p-8">{children}</div></main>
  </div>;
}
