import prisma from "@/lib/db";
import CommunityFeed from "@/components/community/CommunityFeed";
import SectionHeading from "@/components/public/SectionHeading";
export const dynamic="force-dynamic";
export default async function CommunityPage(){const questions=await prisma.communityQuestion.findMany({where:{status:"APPROVED"},include:{answers:{where:{status:"APPROVED"}}},orderBy:{createdAt:"desc"}});return <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8"><SectionHeading eyebrow="Student community" title="Ask, learn and share" description="Browse approved student questions or submit your own. New questions are reviewed before they appear publicly."/><div className="mt-10"><CommunityFeed initialQuestions={questions}/></div></div>}
