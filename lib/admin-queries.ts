import prisma from "@/lib/db";

export async function dashboardCounts() {
  const [leads, pendingQuestions, drafts, subscribers] = await Promise.all([
    prisma.contactSubmission.count({ where: { status: "NEW" } }),
    prisma.communityQuestion.count({ where: { status: "PENDING" } }),
    prisma.blog.count({ where: { status: "DRAFT" } }),
    prisma.announcementSubscriber.count({ where: { isActive: true } }),
  ]);
  return { leads, pendingQuestions, drafts, subscribers };
}
