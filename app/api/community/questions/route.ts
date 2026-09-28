import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { containsProfanity } from "@/lib/profanity";
import { communityQuestionSchema } from "@/lib/validation";
import { getRequestKey, hasAllowedOrigin, rateLimit } from "@/lib/rate-limit";

function createSlug(title: string): string {
  const base = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").slice(0, 80);
  return `${base || "question"}-${Date.now()}`;
}

export async function POST(req: Request) {
  try {
    if (!hasAllowedOrigin(req)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
    if (!rateLimit(getRequestKey(req, "community"), 4).allowed) return NextResponse.json({ error: "Too many posts. Please try again later." }, { status: 429 });
    const parsed = communityQuestionSchema.safeParse(await req.json());
    if (!parsed.success) return NextResponse.json({ error: "Please complete all required fields correctly." }, { status: 400 });
    if (parsed.data.website) return NextResponse.json({ ok: true }, { status: 201 });
    if (containsProfanity(parsed.data.title) || containsProfanity(parsed.data.content)) return NextResponse.json({ error: "Inappropriate language is prohibited." }, { status: 400 });
    const question = await prisma.communityQuestion.create({ data: { ...parsed.data, slug: createSlug(parsed.data.title), status: "PENDING" } });
    return NextResponse.json({ id: question.id, status: question.status }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to post your question right now." }, { status: 500 });
  }
}
