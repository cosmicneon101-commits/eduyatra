import prisma from "@/lib/db";
import CommunityFeed from "@/components/community/CommunityFeed";

export default async function CommunityPage() {
  const questions = await prisma.communityQuestion.findMany({
    where: { status: "APPROVED" },
    include: { answers: { where: { status: "APPROVED" } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <CommunityFeed initialQuestions={questions}/>
    </div>
  );
}
