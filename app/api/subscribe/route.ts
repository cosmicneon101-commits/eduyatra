import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getRequestKey, hasAllowedOrigin, rateLimit } from "@/lib/rate-limit";
import { z } from "zod";
const schema = z.object({ email: z.string().trim().email().max(160), website: z.string().trim().max(200).optional() });
export async function POST(req: Request) {
  try {
    if (!hasAllowedOrigin(req)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
    if (!rateLimit(getRequestKey(req, "subscribe"), 5).allowed) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    if (parsed.data.website) return NextResponse.json({ ok: true }, { status: 201 });
    await prisma.announcementSubscriber.upsert({ where: { email: parsed.data.email }, update: { isActive: true }, create: { email: parsed.data.email } });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to subscribe right now." }, { status: 500 });
  }
}
