import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const submission = await prisma.contactSubmission.create({ data });
    return NextResponse.json(submission, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
