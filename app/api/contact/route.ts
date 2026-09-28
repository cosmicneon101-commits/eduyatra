import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { contactSubmissionSchema } from "@/lib/validation";
import { getRequestKey, hasAllowedOrigin, rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    if (!hasAllowedOrigin(req)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
    const limit = rateLimit(getRequestKey(req, "contact"), 6);
    if (!limit.allowed) return NextResponse.json({ error: "Too many inquiries. Please try again later." }, { status: 429 });
    const parsed = contactSubmissionSchema.safeParse(await req.json());
    if (!parsed.success) return NextResponse.json({ error: "Please provide valid contact details and a message." }, { status: 400 });
    if (parsed.data.website) return NextResponse.json({ ok: true }, { status: 201 });
    const { website: _website, ...data } = parsed.data;
    const submission = await prisma.contactSubmission.create({ data: { ...data, source: data.source || "Website Form" } });
    return NextResponse.json({ id: submission.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to submit your inquiry right now." }, { status: 500 });
  }
}
