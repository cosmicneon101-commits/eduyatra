import crypto from "crypto";
import { cookies } from "next/headers";
import prisma from "@/lib/db";

const SESSION_COOKIE = "eduyatra_admin_session";

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function createAdminSession(adminUserId: string): Promise<string> {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await prisma.adminSession.create({
    data: { tokenHash, adminUserId, expiresAt },
  });

  cookies().set(SESSION_COOKIE, rawToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return rawToken;
}

export async function getAuthenticatedAdmin() {
  const rawToken = cookies().get(SESSION_COOKIE)?.value;
  if (!rawToken) return null;
  const tokenHash = hashToken(rawToken);
  const session = await prisma.adminSession.findUnique({
    where: { tokenHash },
    include: { adminUser: true },
  });
  if (!session || session.expiresAt < new Date() || !session.adminUser.isActive) return null;
  return session.adminUser;
}

export async function clearAdminSession() {
  const rawToken = cookies().get(SESSION_COOKIE)?.value;
  if (rawToken) {
    await prisma.adminSession.deleteMany({ where: { tokenHash: hashToken(rawToken) } });
  }
  cookies().delete(SESSION_COOKIE);
}
