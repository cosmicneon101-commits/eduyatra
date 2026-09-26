import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { containsProfanity } from "@/lib/profanity";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (containsProfanity(body.title) || containsProfanity(body.content)) {
      return NextResponse.json({ error: "Profanity detected" }, { status: 400 });
    }
    const slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();
    const question = await prisma.communityQuestion.create({
      data: { ...body, slug, status: "APPROVED" },
      include: { answers: true }
    });
    return NextResponse.json(question, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
