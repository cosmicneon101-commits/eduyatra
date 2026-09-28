import { PrismaClient, AdminRole, ContentStatus, ModerationStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding EduYatra Nepal Database...");

  const seedAdminPassword = process.env.SEED_ADMIN_PASSWORD;
  const seedSuperAdminEmail = process.env.SEED_SUPERADMIN_EMAIL;
  const seedSuperAdminName = process.env.SEED_SUPERADMIN_NAME || "EduYatra Superadmin";

  if (!seedAdminPassword || !seedSuperAdminEmail) {
    throw new Error(
      "SEED_ADMIN_PASSWORD and SEED_SUPERADMIN_EMAIL must be set before running the database seed.",
    );
  }

  const courseSeeds = [
    { name: "PTE Academic", slug: "pte-academic", shortName: "PTE", description: "Online PTE Academic preparation with multiple batches, small classes, one-on-one consultation and Nepali-friendly guidance.", features: ["One-on-one consultation", "Small batches", "Nepali-friendly classes"], packages: [["Basic",1000,"Classes only"],["Advanced",2500,"Classes + PTE practice software"],["Premium",3500,"Classes + PTE practice software + class recordings"]] },
    { name: "Duolingo English Test", slug: "duolingo", shortName: "DET", description: "Online Duolingo English Test preparation covering the full syllabus and all sections.", features: ["Full syllabus coverage", "One-on-one consultation", "Small batches", "Nepali-friendly classes"], packages: [["Standard",750,"Full Duolingo syllabus and all sections"]] },
    { name: "IELTS", slug: "ielts", shortName: "IELTS", description: "Online IELTS preparation with multiple batches, small classes, one-on-one consultation and Nepali-friendly guidance.", features: ["One-on-one consultation", "Small batches", "Nepali-friendly classes"], packages: [["Basic",1500,"Classes only"],["Advanced",2500,"Classes + IELTS practice software"],["Premium",3500,"Classes + IELTS practice software + class recordings"]] },
  ] as const;
  for (let i=0;i<courseSeeds.length;i++) { const c=courseSeeds[i]; const course=await prisma.course.upsert({where:{slug:c.slug},update:{name:c.name,description:c.description,mode:"Online Classes",availability:"Multiple batches available",isPublished:true,sortOrder:i},create:{name:c.name,slug:c.slug,shortName:c.shortName,description:c.description,mode:"Online Classes",availability:"Multiple batches available",sortOrder:i}}); await prisma.courseFeature.deleteMany({where:{courseId:course.id}}); await prisma.courseFeature.createMany({data:c.features.map((label,j)=>({courseId:course.id,label,sortOrder:j}))}); for(let j=0;j<c.packages.length;j++){const [name,price,description]=c.packages[j]; const existing=await prisma.coursePackage.findFirst({where:{courseId:course.id,name}}); if(existing) await prisma.coursePackage.update({where:{id:existing.id},data:{price,description,sortOrder:j,isPublished:true}}); else await prisma.coursePackage.create({data:{courseId:course.id,name,price,description,sortOrder:j}});} }

  const bookingSeeds = [
    ["PTE","pte","Hello EduYatra, I would like to book a PTE test."],["Duolingo","duolingo","Hello EduYatra, I would like to book a Duolingo test."],["IELTS","ielts","Hello EduYatra, I would like to book an IELTS test."],["GRE","gre","Hello EduYatra, I would like to book a GRE test."],["SAT","sat","Hello EduYatra, I would like to book an SAT test."],["TOEFL","toefl","Hello EduYatra, I would like to book a TOEFL test."],
  ] as const;
  for(let i=0;i<bookingSeeds.length;i++){const [name,slug,message]=bookingSeeds[i]; await prisma.testBookingService.upsert({where:{slug},update:{name,whatsappMessage:message,isPublished:true,sortOrder:i},create:{name,slug,whatsappMessage:message,sortOrder:i}});}

  const destinations=["Australia","United Kingdom","United States","New Zealand","South Korea","Japan","Europe","India","Bangladesh"];
  for(let i=0;i<destinations.length;i++){const name=destinations[i]; const slug=name.toLowerCase().replace(/[^a-z0-9]+/g,"-"); await prisma.country.upsert({where:{slug},update:{name,isPublished:true,sortOrder:i},create:{name,slug,intro:`EduYatra country template for ${name}. Add verified destination guidance, study options, requirements, costs and student-life information from the admin portal.`,sortOrder:i}});}

  const pageSeeds = [
    ["About EduYatra", "about", "About EduYatra", "Learn about EduYatra Nepal", "<p>Template content: introduce EduYatra, its mission, approach and student support philosophy.</p>"],
    ["Study Abroad", "study-abroad", "Study Abroad with EduYatra", "Explore destinations and plan your journey", "<p>Template landing page for EduYatra study-abroad guidance.</p>"],
    ["Contact", "contact", "Contact EduYatra Nepal", "Start a conversation with our team", "<p>Use WhatsApp, email or the website contact form to reach EduYatra.</p>"],
    ["Privacy Policy", "privacy-policy", "Privacy Policy", "", "<p>Template privacy policy. Replace with EduYatra-approved legal text before production.</p>"],
    ["Terms & Conditions", "terms-and-conditions", "Terms & Conditions", "", "<p>Template terms. Replace with EduYatra-approved legal text before production.</p>"],
    ["Disclaimer", "disclaimer", "EduYatra Disclaimer", "", "<p>Template disclaimer. Replace with EduYatra-approved legal text before production.</p>"],
  ] as const;
  for(const [title,slug,heroTitle,heroSubtitle,content] of pageSeeds) await prisma.page.upsert({where:{slug},update:{title,heroTitle,heroSubtitle,content,status:ContentStatus.PUBLISHED},create:{title,slug,heroTitle,heroSubtitle,content,status:ContentStatus.PUBLISHED}});

  const settingSeeds={site_name:"EduYatra Nepal",tagline:"Your Journey to Global Success",phone:"+9779811802843",email:"eduyatra.np@gmail.com",address:"New Baneshwor, Kathmandu, Nepal",office_hours:"Weekdays: 6:00 AM – 10:00 PM",whatsapp_number:"9779811802843",instagram:"https://www.instagram.com/eduyatranepal",facebook:"https://www.facebook.com/share/1bWhdJba7p/",tiktok:"https://www.tiktok.com/@eduyatra.nepal"};
  for(const [key,value] of Object.entries(settingSeeds)) await prisma.siteSetting.upsert({where:{key},update:{value},create:{key,value}});

  const passwordHash = await bcrypt.hash(seedAdminPassword, 12);

  const permissionGroups = [
    ["DASHBOARD_VIEW", "View dashboard", "Dashboard"],
    ["LEADS_VIEW", "View leads", "Leads"], ["LEADS_EDIT", "Edit leads", "Leads"],
    ["BLOG_VIEW", "View blogs", "Blogs"], ["BLOG_CREATE", "Create blogs", "Blogs"], ["BLOG_EDIT", "Edit blogs", "Blogs"], ["BLOG_DELETE", "Delete blogs", "Blogs"], ["BLOG_PUBLISH", "Publish blogs", "Blogs"],
    ["FAQ_VIEW", "View FAQs", "FAQs"], ["FAQ_CREATE", "Create FAQs", "FAQs"], ["FAQ_EDIT", "Edit FAQs", "FAQs"], ["FAQ_DELETE", "Delete FAQs", "FAQs"],
    ["TESTIMONIAL_VIEW", "View testimonials", "Testimonials"], ["TESTIMONIAL_CREATE", "Create testimonials", "Testimonials"], ["TESTIMONIAL_EDIT", "Edit testimonials", "Testimonials"], ["TESTIMONIAL_DELETE", "Delete testimonials", "Testimonials"],
    ["COMMUNITY_VIEW", "View community", "Community"], ["COMMUNITY_MODERATE", "Moderate community", "Community"], ["COMMUNITY_ANSWER", "Answer as EduYatra", "Community"],
    ["COURSE_VIEW", "View courses", "Courses"], ["COURSE_CREATE", "Create courses", "Courses"], ["COURSE_EDIT", "Edit courses", "Courses"], ["COURSE_DELETE", "Delete courses", "Courses"],
    ["TEST_BOOKING_VIEW", "View test booking services", "Test booking"], ["TEST_BOOKING_CREATE", "Create test booking services", "Test booking"], ["TEST_BOOKING_EDIT", "Edit test booking services", "Test booking"], ["TEST_BOOKING_DELETE", "Delete test booking services", "Test booking"],
    ["COUNTRY_VIEW", "View countries", "Countries"], ["COUNTRY_CREATE", "Create countries", "Countries"], ["COUNTRY_EDIT", "Edit countries", "Countries"], ["COUNTRY_DELETE", "Delete countries", "Countries"],
    ["PAGE_VIEW", "View pages", "Pages"], ["PAGE_EDIT", "Edit pages", "Pages"],
    ["MEDIA_VIEW", "View media", "Media"], ["MEDIA_UPLOAD", "Upload media", "Media"], ["MEDIA_DELETE", "Delete media", "Media"],
    ["ANNOUNCEMENTS_VIEW", "View subscribers", "Announcements"], ["ANNOUNCEMENTS_MANAGE", "Manage subscribers", "Announcements"],
    ["ADMIN_VIEW", "View admins", "Administration"], ["ADMIN_CREATE", "Create admins", "Administration"], ["ADMIN_EDIT", "Edit admins", "Administration"], ["ADMIN_DEACTIVATE", "Activate/deactivate admins", "Administration"], ["ADMIN_PERMISSIONS", "Manage admin permissions", "Administration"],
    ["SETTINGS_VIEW", "View settings", "Settings"], ["SETTINGS_EDIT", "Edit settings", "Settings"],
    ["AUDIT_VIEW", "View audit log", "Audit log"],
  ];
  for (const [key, label, group] of permissionGroups) await prisma.permission.upsert({ where: { key }, update: { label, group }, create: { key, label, group } });

  await prisma.adminUser.upsert({
    where: { email: seedSuperAdminEmail },
    update: { name: seedSuperAdminName, passwordHash, role: AdminRole.SUPER_ADMIN, isActive: true },
    create: {
      email: seedSuperAdminEmail,
      name: seedSuperAdminName,
      passwordHash,
      role: AdminRole.SUPER_ADMIN,
      isActive: true,
    },
  });

  const superAdmin = await prisma.adminUser.findUnique({ where: { email: seedSuperAdminEmail } });
  if (!superAdmin) throw new Error("Unable to create seed superadmin");
  await prisma.adminPermission.deleteMany({ where: { adminUserId: superAdmin.id } });
  const allPermissions = await prisma.permission.findMany();
  if (allPermissions.length) await prisma.adminPermission.createMany({ data: allPermissions.map(permission => ({ adminUserId: superAdmin.id, permissionId: permission.id })) });

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
      content: "Joining EduYatra's online PTE sessions gave me the exact speaking and writing templates I needed. The daily scoring feedback pushed my speaking to 76 and secured my overall 70!",
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
      content: "Affordable fee of Rs. 1,000 with high-quality teaching. The online classes fit right into my schedule. Balanced scores across all 4 communicative sections.",
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
    { category: "PTE Preparation", question: "When can I join PTE classes?", answer: "Multiple online batches are available. Contact EduYatra to find a suitable batch and get current availability." },
    { category: "PTE Preparation", question: "Do I need prior English knowledge to join PTE classes?", answer: "A basic understanding of English is helpful, but you don't need to be an expert. Our classes are designed to help students develop their skills progressively." },
    { category: "PTE Preparation", question: "How long does it take to prepare for PTE?", answer: "Preparation time depends on your current English proficiency, target score, and daily practice routine. Many students benefit from several weeks of focused preparation." },
    { category: "Duolingo Preparation", question: "What is the Duolingo English Test?", answer: "The Duolingo English Test (DET) is an online English proficiency test that students can take from home, subject to the test's requirements." },
    { category: "Duolingo Preparation", question: "Who should take the Duolingo English Test?", answer: "Students planning to study abroad may consider the DET if their chosen university or institution accepts it. Always verify the English test requirements of your target university before registering." },
    { category: "Duolingo Preparation", question: "How much does the Duolingo preparation course cost?", answer: "Our Duolingo preparation course is available for Rs. 750." },
    { category: "Duolingo Preparation", question: "When can I join Duolingo classes?", answer: "Multiple online batches are available. Contact EduYatra to find a suitable batch and get current availability." },
    { category: "Duolingo Preparation", question: "Is Duolingo easier than IELTS or PTE?", answer: "Each test has a different format and scoring system. The best option depends on your English skills, preferred test format, and the requirements of your target institution." },
    { category: "IELTS Preparation", question: "Does EduYatra Nepal offer IELTS preparation classes?", answer: "Yes. EduYatra offers IELTS preparation through online classes with multiple batches available." },
    { category: "IELTS Preparation", question: "When can I join IELTS classes?", answer: "Multiple online batches are available. Contact EduYatra to confirm current batch availability." },
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
      content: "Scoring 70+ in PTE Academic is within reach with the right daily framework. Focus on the core four areas: Repeat Sentence, Read Aloud, Write From Dictation, and Fill in the Blanks. EduYatra's online classes give you live interactive feedback across the exam modules.",
      status: ContentStatus.PUBLISHED,
      featured: true,
    },
    {
      title: "Duolingo English Test (DET) 2026: Fees, Timing, and University Acceptance",
      slug: "duolingo-english-test-guide-nepal",
      category: "Duolingo",
      excerpt: "A practical guide to preparing for the Duolingo English Test with EduYatra.",
      coverImage: "/brand/logo.png",
      content: "The Duolingo English Test is an efficient alternative for students seeking global admissions from home. EduYatra's online preparation covers the full syllabus and all major test sections.",
      status: ContentStatus.PUBLISHED,
      featured: true,
    },
    {
      title: "PTE vs IELTS vs Duolingo: Choosing the Best Exam for Your Study Abroad Journey",
      slug: "pte-vs-ielts-vs-duolingo-nepal",
      category: "Global Insights & Visa Guides",
      excerpt: "Compare test formats, scoring criteria, exam fees in Nepal, and university acceptance to pick the right path.",
      coverImage: "/brand/logo.png",
      content: "Every student has unique strengths. Each test has a different format and acceptance profile. Compare the requirements of your target institutions and speak with EduYatra for guidance before choosing.",
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
