import { PermissionKey } from "@/lib/admin";

export const PERMISSION_GROUPS: Array<{ group: string; items: Array<{ key: PermissionKey; label: string; description?: string }> }> = [
  { group: "Dashboard", items: [{ key: "DASHBOARD_VIEW", label: "View dashboard" }] },
  { group: "Leads", items: [{ key: "LEADS_VIEW", label: "View leads" }, { key: "LEADS_EDIT", label: "Edit leads" }] },
  { group: "Blogs", items: ["BLOG_VIEW", "BLOG_CREATE", "BLOG_EDIT", "BLOG_DELETE", "BLOG_PUBLISH"].map(key => ({ key: key as PermissionKey, label: key.replace("BLOG_", "").toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) })) },
  { group: "FAQs", items: ["FAQ_VIEW", "FAQ_CREATE", "FAQ_EDIT", "FAQ_DELETE"].map(key => ({ key: key as PermissionKey, label: key.replace("FAQ_", "").toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) })) },
  { group: "Testimonials", items: ["TESTIMONIAL_VIEW", "TESTIMONIAL_CREATE", "TESTIMONIAL_EDIT", "TESTIMONIAL_DELETE"].map(key => ({ key: key as PermissionKey, label: key.replace("TESTIMONIAL_", "").toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) })) },
  { group: "Community", items: [{ key: "COMMUNITY_VIEW", label: "View community" }, { key: "COMMUNITY_MODERATE", label: "Moderate questions and answers" }, { key: "COMMUNITY_ANSWER", label: "Answer as EduYatra" }] },
  { group: "Courses", items: ["COURSE_VIEW", "COURSE_CREATE", "COURSE_EDIT", "COURSE_DELETE"].map(key => ({ key: key as PermissionKey, label: key.replace("COURSE_", "").toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) })) },
  { group: "Test booking", items: ["TEST_BOOKING_VIEW", "TEST_BOOKING_CREATE", "TEST_BOOKING_EDIT", "TEST_BOOKING_DELETE"].map(key => ({ key: key as PermissionKey, label: key.replace("TEST_BOOKING_", "").toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) })) },
  { group: "Countries", items: ["COUNTRY_VIEW", "COUNTRY_CREATE", "COUNTRY_EDIT", "COUNTRY_DELETE"].map(key => ({ key: key as PermissionKey, label: key.replace("COUNTRY_", "").toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) })) },
  { group: "Pages", items: [{ key: "PAGE_VIEW", label: "View pages" }, { key: "PAGE_EDIT", label: "Edit pages" }] },
  { group: "Media", items: [{ key: "MEDIA_VIEW", label: "View media" }, { key: "MEDIA_UPLOAD", label: "Upload media" }, { key: "MEDIA_DELETE", label: "Delete media" }] },
  { group: "Announcements", items: [{ key: "ANNOUNCEMENTS_VIEW", label: "View subscribers" }, { key: "ANNOUNCEMENTS_MANAGE", label: "Manage subscribers" }] },
  { group: "Administration", items: [{ key: "ADMIN_VIEW", label: "View admins" }, { key: "ADMIN_CREATE", label: "Create admins" }, { key: "ADMIN_EDIT", label: "Edit admins" }, { key: "ADMIN_DEACTIVATE", label: "Activate/deactivate admins" }, { key: "ADMIN_PERMISSIONS", label: "Manage admin permissions" }] },
  { group: "Settings", items: [{ key: "SETTINGS_VIEW", label: "View settings" }, { key: "SETTINGS_EDIT", label: "Edit settings" }] },
  { group: "Audit log", items: [{ key: "AUDIT_VIEW", label: "View audit log" }] },
];

export const ALL_PERMISSION_KEYS = PERMISSION_GROUPS.flatMap(group => group.items.map(item => item.key));
