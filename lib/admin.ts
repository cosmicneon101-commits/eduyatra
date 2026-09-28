import { AdminRole } from "@prisma/client";
import prisma from "@/lib/db";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export type PermissionKey =
  | "DASHBOARD_VIEW"
  | "LEADS_VIEW" | "LEADS_EDIT"
  | "BLOG_VIEW" | "BLOG_CREATE" | "BLOG_EDIT" | "BLOG_DELETE" | "BLOG_PUBLISH"
  | "FAQ_VIEW" | "FAQ_CREATE" | "FAQ_EDIT" | "FAQ_DELETE"
  | "TESTIMONIAL_VIEW" | "TESTIMONIAL_CREATE" | "TESTIMONIAL_EDIT" | "TESTIMONIAL_DELETE"
  | "COMMUNITY_VIEW" | "COMMUNITY_MODERATE" | "COMMUNITY_ANSWER"
  | "COURSE_VIEW" | "COURSE_CREATE" | "COURSE_EDIT" | "COURSE_DELETE"
  | "TEST_BOOKING_VIEW" | "TEST_BOOKING_CREATE" | "TEST_BOOKING_EDIT" | "TEST_BOOKING_DELETE"
  | "COUNTRY_VIEW" | "COUNTRY_CREATE" | "COUNTRY_EDIT" | "COUNTRY_DELETE"
  | "PAGE_VIEW" | "PAGE_EDIT"
  | "MEDIA_VIEW" | "MEDIA_UPLOAD" | "MEDIA_DELETE"
  | "ANNOUNCEMENTS_VIEW" | "ANNOUNCEMENTS_MANAGE"
  | "ADMIN_VIEW" | "ADMIN_CREATE" | "ADMIN_EDIT" | "ADMIN_DEACTIVATE" | "ADMIN_PERMISSIONS"
  | "SETTINGS_VIEW" | "SETTINGS_EDIT"
  | "AUDIT_VIEW";

export async function requireAdmin() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) throw new Error("UNAUTHORIZED");
  return admin;
}

export async function hasPermission(adminId: string, permission: PermissionKey): Promise<boolean> {
  const admin = await prisma.adminUser.findUnique({ where: { id: adminId }, select: { role: true } });
  if (!admin) return false;
  if (admin.role === AdminRole.SUPER_ADMIN) return true;
  const assignment = await prisma.adminPermission.findFirst({
    where: { adminUserId: adminId, permission: { key: permission } },
    select: { id: true },
  });
  return Boolean(assignment);
}

export async function requirePermission(permission: PermissionKey) {
  const admin = await requireAdmin();
  if (admin.role !== AdminRole.SUPER_ADMIN && !(await hasPermission(admin.id, permission))) {
    throw new Error("FORBIDDEN");
  }
  return admin;
}

export async function writeAuditLog(input: {
  adminUserId?: string;
  action: "CREATE" | "UPDATE" | "DELETE" | "PUBLISH" | "UNPUBLISH" | "LOGIN" | "LOGOUT" | "ACTIVATE" | "DEACTIVATE" | "PERMISSION_CHANGE" | "STATUS_CHANGE";
  resource: string;
  resourceId?: string;
  summary: string;
  metadata?: unknown;
}) {
  const row = await prisma.auditLog.create({
    data: {
      adminUserId: input.adminUserId,
      action: input.action,
      resource: input.resource,
      resourceId: input.resourceId,
      summary: input.summary,
      metadata: input.metadata === undefined ? undefined : JSON.parse(JSON.stringify(input.metadata)),
    },
  });
  revalidatePath("/", "layout");
  return row;
}
