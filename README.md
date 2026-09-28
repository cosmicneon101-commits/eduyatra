# EduYatra Nepal — Phase 3

EduYatra Nepal is a Next.js + PostgreSQL education consultancy platform for online test preparation, test booking, study-abroad guidance, community, content publishing and lead management.

## Current phase

**Phase 3 — Public Website: completed**

Phase 3 builds the public-facing experience on top of the Phase 2 CMS/admin foundation.

### Public routes
- `/`
- `/about`
- `/contact`
- `/test-preparation/[slug]`
- `/test-booking`
- `/study-abroad`
- `/study-abroad/[slug]`
- `/blogs`
- `/blogs/[slug]`
- `/community`
- `/faq`
- `/privacy-policy`
- `/terms-and-conditions`
- `/disclaimer`

### Public integrations
- Course data from PostgreSQL/CMS
- Test booking services from PostgreSQL/CMS
- Country templates from PostgreSQL/CMS
- Published blogs from PostgreSQL/CMS
- Published testimonials/scores from PostgreSQL/CMS
- Published FAQs and community questions
- Contact form -> PostgreSQL Leads
- Newsletter -> PostgreSQL AnnouncementSubscriber
- WhatsApp conversion CTAs

## Setup

```bash
npm install
npm run prisma:generate
npm run prisma:validate
npm run prisma:push
npm run prisma:seed
npm run dev
```

Before seeding, set the required environment variables from `.env.example` / `.env.local.example`:

```env
DATABASE_URL=...
SEED_ADMIN_PASSWORD=...
SEED_SUPERADMIN_EMAIL=...
SEED_SUPERADMIN_NAME=...
```

## Validation note

The sandbox used for this phase did not contain installed npm dependencies, so `next build` and live Prisma generation/database validation were not executed here. TypeScript/TSX syntax parsing was completed successfully with 0 parse errors across the current source tree. See `docs/phase-3-report.md` for details.

## Phase 4

Phase 4 is the final integration pass: deeper CMS/public synchronization, production hardening, SEO/performance, live database verification and end-to-end QA.


## Phase 4
The public website now consumes CMS-managed site settings and course navigation, admin mutations trigger public-site revalidation, public forms have lightweight origin/rate-limit/honeypot protections, dynamic sitemap/robots/metadata are included, and a database health endpoint is available at `/api/health`. See `docs/phase-4-report.md` and `docs/phase-4-preview.html`.
