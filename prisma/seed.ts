import { PrismaClient, AdminRole, ContentStatus, ModerationStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding EduYatra Nepal Database...");

  const defaultPassword = await bcrypt.hash("EduYatra@2026", 10);
  const admins = [
    { email: "eduyatra.np@gmail.com", name: "EduYatra Official Admin" },
    { email: "Cosmicneon101@gmail.com", name: "Cosmic Neon Superadmin" },
  ];

  for (const admin of admins) {
    await prisma.adminUser.upsert({
      where: { email: admin.email },
      update: {},
      create: {
        email: admin.email,
        name: admin.name,
        passwordHash: defaultPassword,
        role: AdminRole.ADMIN,
      },
    });
  }

  const testimonials = [
    {
      name: "Sony",
      testType: "PTE",
      score: "70",
      reading: 57,
      listening: 65,
      writing: 69,
      speaking: 76,
      photo: "/images/testimonials/sony-pte-70.jpg",
      content: "Joining EduYatra's online PTE sessions from 9:00 PM gave me the exact speaking and writing templates I needed. The daily scoring feedback pushed my speaking to 76 and secured my overall 70!",
      isPublished: true,
      isFeatured: true,
      sortOrder: 1,
    },
    {
      name: "Shreejesh",
      testType: "PTE",
      score: "67",
      reading: 63,
      listening: 67,
      writing: 69,
      speaking: 67,
      photo: "/images/testimonials/shreejesh-pte-67.jpg",
      content: "Affordable fee of Rs. 1,000 with high-quality teaching. The online night classes fit right into my schedule. Balanced scores across all 4 communicative sections.",
      isPublished: true,
      isFeatured: true,
      sortOrder: 2,
    },
    {
      name: "Krisha Thapa",
      testType: "PTE",
      score: "61",
      reading: 59,
      listening: 63,
      writing: 64,
      speaking: 63,
      photo: "/images/testimonials/krisha-pte-61.jpg",
      content: "EduYatra's mock reviews and time management techniques helped me crack PTE Academic on my first attempt with an overall 61 score.",
      isPublished: true,
      isFeatured: true,
      sortOrder: 3,
    },
  ];

  for (const item of testimonials) {
    await prisma.testimonial.create({ data: item });
  }

  const faqs = [
    { category: "General Information", question: "What is EduYatra Nepal?", answer: "EduYatra Nepal is an education consultancy and language preparation platform dedicated to helping students achieve their study-abroad goals through quality language classes, test preparation, and personalized guidance." },
    { category: "General Information", question: "Where is EduYatra Nepal located?", answer: "EduYatra Nepal is located in New Baneshwor, Kathmandu, Nepal." },
    { category: "General Information", question: "How can I contact EduYatra Nepal?", answer: "You can contact us through our official social media platforms or reach out to us directly via WhatsApp (+9779811802843) or email (eduyatra.np@gmail.com) for course inquiries, registration, and counseling." },
    { category: "General Information", question: "Does EduYatra Nepal offer online classes?", answer: "Yes! We offer online language preparation classes, allowing students to learn from the comfort of their homes across Nepal." },
    { category: "PTE Preparation", question: "What is PTE Academic?", answer: "PTE Academic is a computer-based English language proficiency test that assesses your speaking, writing, reading, and listening skills. It is accepted by many universities and institutions worldwide." },
    { category: "PTE Preparation", question: "Who should join PTE classes at EduYatra Nepal?", answer: "Our PTE classes are suitable for students planning to study abroad who need to demonstrate their English proficiency through the PTE Academic examination." },
    { category: "PTE Preparation", question: "How much does the PTE course cost?", answer: "Our PTE preparation course is available for Rs. 1,000. Course fees and promotional offers may change. Please contact us for the latest details." },
    { category: "PTE Preparation", question: "What time are PTE classes conducted?", answer: "Our online PTE classes are conducted from 9:00 PM to 10:00 PM." },
    { category: "PTE Preparation", question: "Do I need prior English knowledge to join PTE classes?", answer: "A basic understanding of English is helpful, but you don't need to be an expert. Our classes are designed to help students develop their skills progressively." },
    { category: "PTE Preparation", question: "How long does it take to prepare for PTE?", answer: "Preparation time depends on your current English proficiency, target score, and daily practice routine. Many students benefit from several weeks of focused preparation." },
    { category: "Duolingo Preparation", question: "What is the Duolingo English Test?", answer: "The Duolingo English Test (DET) is an online English proficiency test that students can take from home, subject to the test's requirements." },
    { category: "Duolingo Preparation", question: "Who should take the Duolingo English Test?", answer: "Students planning to study abroad may consider the DET if their chosen university or institution accepts it. Always verify the English test requirements of your target university before registering." },
    { category: "Duolingo Preparation", question: "How much does the Duolingo preparation course cost?", answer: "Our Duolingo preparation course is available for Rs. 750." },
    { category: "Duolingo Preparation", question: "What time are Duolingo classes conducted?", answer: "Our online Duolingo classes are conducted from 8:00 PM to 9:00 PM." },
    { category: "Duolingo Preparation", question: "Is Duolingo easier than IELTS or PTE?", answer: "Each test has a different format and scoring system. The best option depends on your English skills, preferred test format, and the requirements of your target institution." },
    { category: "IELTS Preparation", question: "Does EduYatra Nepal offer IELTS preparation classes?", answer: "We are preparing to introduce IELTS preparation classes to help students improve their English proficiency and prepare for their study-abroad journey." },
    { category: "IELTS Preparation", question: "When will IELTS classes begin?", answer: "IELTS classes are planned for launch soon. Contact EduYatra Nepal for the latest updates on enrollment and class schedules." },
    { category: "IELTS Preparation", question: "What does IELTS preparation include?", answer: "IELTS preparation generally covers four skills: Listening, Reading, Writing, and Speaking. The course may also include practice tests, feedback, and exam strategies." },
    { category: "Enrollment & Classes", question: "How can I enroll in a course at EduYatra Nepal?", answer: "You can contact us through our official social media channels, fill out our online Google enrollment form, or message us on WhatsApp (+9779811802843)." },
    { category: "Enrollment & Classes", question: "Are trial classes available?", answer: "Trial class availability may depend on the course and current schedule. Contact our team to find out whether a trial session is available." },
    { category: "Enrollment & Classes", question: "Do you provide practice tests and mock exams?", answer: "We are developing practice resources and mock-test opportunities to help students become familiar with English proficiency test formats." },
    { category: "Enrollment & Classes", question: "Can I join classes if I am a complete beginner?", answer: "Yes. We can help you understand the requirements of your chosen test and identify a suitable starting point based on your current English level." },
    { category: "Study Abroad", question: "Can EduYatra Nepal help me choose the right English proficiency test?", answer: "Yes. We can help you understand the differences between PTE, IELTS, and Duolingo and guide you toward a test that aligns with your study plans. However, your target university's official requirements should always be the deciding factor." },
    { category: "Study Abroad", question: "Do I need to decide my destination before joining English classes?", answer: "Not necessarily. You can begin improving your English while exploring your study-abroad options." },
    { category: "Study Abroad", question: "Does EduYatra Nepal guarantee a specific test score or visa approval?", answer: "No. Test scores depend on your preparation and performance, while visa decisions are made by the relevant authorities. We do not guarantee specific results." },
    { category: "Community & Support", question: "Can I ask questions on the EduYatra Nepal website?", answer: "Yes! Our website features an active community discussion forum where students can ask questions and participate in educational discussions." },
    { category: "Community & Support", question: "Can I receive updates about new courses and classes?", answer: "Yes. Follow EduYatra Nepal on our official social media platforms (Instagram, TikTok, Facebook) for announcements, course updates, and educational content." },
    { category: "Community & Support", question: "Can I speak directly with an EduYatra counselor?", answer: "Yes. Contact our team directly via phone or WhatsApp at +9779811802843 during our office hours (Weekdays, 6 am to 10 pm) to arrange a conversation." },
    { category: "Community & Support", question: "Why should I start my English preparation early?", answer: "Starting early gives you more time to improve your language skills, identify weaknesses, practice consistently, and prepare for your target examination." },
    { category: "Community & Support", question: "How do I get started with EduYatra Nepal?", answer: "Your study-abroad journey begins with a conversation. Reach out to EduYatra Nepal today to explore your options, choose the right preparation course, and take your next step toward your academic goals." }
  ];

  for (let i = 0; i < faqs.length; i++) {
    await prisma.fAQ.create({
      data: {
        category: faqs[i].category,
        question: faqs[i].question,
        answer: faqs[i].answer,
        sortOrder: i + 1,
        isPublished: true,
      },
    });
  }

  const blogs = [
    {
      title: "How to Score 70+ in PTE Academic: Essential Tips for Nepali Students",
      slug: "how-to-score-70-in-pte-academic",
      category: "PTE",
      excerpt: "Master AI scoring algorithms, speaking fluency, and Write From Dictation with proven classroom strategies.",
      coverImage: "/brand/logo.png",
      content: "Scoring 70+ in PTE Academic is within reach with the right daily framework. Focus on the core four areas: Repeat Sentence, Read Aloud, Write From Dictation, and Fill in the Blanks. EduYatra's online classes run from 9:00 PM to 10:00 PM, giving you live interactive feedback on every module.",
      status: ContentStatus.PUBLISHED,
      featured: true,
    },
    {
      title: "Duolingo English Test (DET) 2026: Fees, Timing, and University Acceptance",
      slug: "duolingo-english-test-guide-nepal",
      category: "Duolingo",
      excerpt: "A complete guide to the convenient 1-hour computer-adaptive test priced at Rs. 750 for EduYatra preparation.",
      coverImage: "/brand/logo.png",
      content: "The Duolingo English Test is an efficient alternative for students seeking global admissions from home. At Rs. 750 for EduYatra's preparation course from 8:00 PM to 9:00 PM, you will master interactive listening, speaking sample tasks, and production scoring.",
      status: ContentStatus.PUBLISHED,
      featured: true,
    },
    {
      title: "PTE vs IELTS vs Duolingo: Choosing the Best Exam for Your Study Abroad Journey",
      slug: "pte-vs-ielts-vs-duolingo-nepal",
      category: "Global Insights & Visa Guides",
      excerpt: "Compare test formats, scoring criteria, exam fees in Nepal, and university acceptance to pick the right path.",
      coverImage: "/brand/logo.png",
      content: "Every student has unique strengths. If you perform well with computer-based AI tests and rapid results, PTE is unmatched. If you want convenience at home, DET is ideal. For traditional conversational testing, IELTS remains standard. Consult our counselors in New Baneshwor to choose.",
      status: ContentStatus.PUBLISHED,
      featured: true,
    },
  ];

  for (const b of blogs) {
    await prisma.blog.upsert({
      where: { slug: b.slug },
      update: {},
      create: b,
    });
  }

  console.log("Database seeded successfully!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
