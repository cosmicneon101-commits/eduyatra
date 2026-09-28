import crypto from "crypto";
import { cookies } from "next/headers";
import prisma from "@/lib/db";

export const SESSION_COOKIE = "eduyatra_admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function createAdminSession(adminUserId: string): Promise<string> {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

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

  if (!session) return null;

  if (session.expiresAt < new Date() || !session.adminUser.isActive) {
    await prisma.adminSession.delete({ where: { id: session.id } }).catch(() => undefined);
    return null;
  }

  await prisma.adminSession.update({
    where: { id: session.id },
    data: { lastUsedAt: new Date() },
  });

  return session.adminUser;
}

export async function clearAdminSession() {
  const rawToken = cookies().get(SESSION_COOKIE)?.value;
  if (rawToken) {
    await prisma.adminSession.deleteMany({ where: { tokenHash: hashToken(rawToken) } });
  }
  cookies().delete(SESSION_COOKIE);
}
