# EduYatra Nepal — Phase 1 Report
## Understand + Stabilize the Base

**Phase:** 1 of 4  
**Baseline:** `eduyatra-nepal-v1 (1).zip`  
**Project:** EduYatra Nepal  
**Completed:** 27 September 2026

---

## 1. Phase objective

Phase 1 was intentionally focused on making the supplied codebase a safer, cleaner and more reliable foundation for the CMS/admin and public-site work that follows.

This phase did **not** attempt to build the final public redesign or the admin dashboard. Those are Phase 2 and Phase 3 work.

---

## 2. Baseline audit

The supplied ZIP was reviewed as the source-of-truth codebase.

The baseline contains:

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
- Prisma/PostgreSQL
- Public homepage
- PTE page
- FAQ page
- Discussion forum
- Contact API
- Testimonial data model
- Blog data model
- Admin/session data model
- Brand assets and testimonial images

The baseline was intentionally small, which is useful for the upcoming rebuild because we can evolve the architecture without carrying a large legacy application.

---

## 3. Business information normalized

The codebase was updated to reflect the decisions made for the actual EduYatra business.

### Online preparation

- PTE Academic
- Duolingo English Test
- IELTS

Classes are **online only**.

The public messaging now uses **multiple batches available** rather than hardcoded class times.

### PTE

- Basic — Rs. 1,000 — classes only
- Advanced — Rs. 2,500 — classes + PTE practice software
- Premium — Rs. 3,500 — classes + PTE practice software + class recordings

Common features:

- One-on-one consultation
- Small batches
- Nepali-friendly classes
- Online classes
- Multiple batches

### Duolingo

- Rs. 750
- Full syllabus/all sections
- One-on-one consultation
- Small batches
- Nepali-friendly classes
- Online classes
- Multiple batches

### IELTS

- Basic — Rs. 1,500 — classes only
- Advanced — Rs. 2,500 — classes + IELTS practice software
- Premium — Rs. 3,500 — classes + IELTS practice software + class recordings

Common features:

- One-on-one consultation
- Small batches
- Nepali-friendly classes
- Online classes
- Multiple batches

### Test booking

The supported booking services are now represented as:

- PTE
- Duolingo
- IELTS
- GRE
- SAT
- TOEFL

V1 booking remains WhatsApp-based. The booking messages are separate from course/class inquiry messages.

### Study-abroad destinations

The configuration now contains:

- Australia
- United Kingdom
- United States
- New Zealand
- South Korea
- Japan
- Europe
- India
- Bangladesh

The visa workflow itself remains outside V1.

---

## 4. WhatsApp architecture corrected

The original project mixed course inquiries and test booking messages.

The configuration now has separate messages for each purpose.

Example test booking message:

> Hello EduYatra, I would like to book a PTE test.

Example course inquiry:

> Hello EduYatra, I would like to inquire about PTE online classes.

This distinction will be used by the public website in later phases.

---

## 5. Community moderation fixed

The original API immediately created public questions with `APPROVED` status.

This was changed to:

`PENDING → Admin review → APPROVED / REJECTED`

The public feed continues to display approved questions only.

The client-side forum now tells a student that their question has been submitted for review instead of pretending that it is already public.

---

## 6. Community/API validation added

A new `lib/validation.ts` module uses the existing Zod dependency to validate:

- Contact/lead submissions
- Community questions

This prevents arbitrary request bodies from being written directly into Prisma models.

The APIs now return controlled user-facing errors rather than leaking raw exception messages.

---

## 7. Profanity filter corrected

The original profanity filter constructed JavaScript regular expressions using an incorrectly escaped `\\b` boundary.

The implementation was corrected to:

- escape regex characters in terms
- use proper word boundaries
- keep the existing word list

A small runtime test was also performed against normal, offensive and partial-word examples.

---

## 8. Lead/contact foundation strengthened

The contact endpoint now validates:

- name
- email
- phone
- service
- message
- optional source

Successful submissions return the lead ID rather than the entire database record.

The existing `ContactSubmission` model remains the V1 lead store and is ready for the Phase 2 **Leads** admin section.

Indexes were added for common lead filtering:

- status + creation date
- service + status

---

## 9. Announcement subscriber foundation added

A new PostgreSQL model was added:

`AnnouncementSubscriber`

It currently stores:

- email
- active/inactive state
- created date
- updated date

Email delivery is intentionally not being added in Phase 1. A provider can be connected later without changing the basic subscriber model.

---

## 10. Database indexes added

Indexes were added to support the future CMS/public website without prematurely redesigning the schema.

Examples include:

- admin sessions by admin and expiry
- blogs by publication status/date and featured status/date
- FAQs by publication/order and category
- testimonials by publication/featured/order
- leads by status/date and service/status
- community questions by moderation status/date
- community answers by question/status/date
- announcement subscribers by active/date

---

## 11. Admin session handling improved

The existing session mechanism was retained, but stale/invalid sessions are now removed when encountered.

`lastUsedAt` is refreshed on successful authentication checks.

The session token remains stored as a SHA-256 hash in PostgreSQL rather than the raw token.

The admin seed no longer contains a hard-coded password.

---

## 12. Seed security fixed

The baseline contained a hard-coded default admin password.

That password has been removed from source code.

The development seed now requires:

```text
SEED_ADMIN_PASSWORD
SEED_SUPERADMIN_EMAIL
```

and optionally:

```text
SEED_SUPERADMIN_NAME
```

The seed also correctly creates the configured seed account as `SUPER_ADMIN`.

This is important before any real credentials are introduced.

---

## 13. Public pages made explicitly dynamic

The homepage, FAQ page and community page query PostgreSQL directly.

They are now explicitly marked as dynamic routes so the Next.js build does not accidentally treat database-driven content as static content.

This is important for the future CMS: when an admin changes content, the public site must be capable of reading current database state.

---

## 14. Stale public messaging removed

The baseline contained fixed PTE and Duolingo class times and an IELTS “Launching Soon” state.

Those assumptions were removed from the Phase 1 business configuration and seed content.

The current direction is:

> Multiple online batches available.

The New Baneshwor address remains a contact/office location and is not presented as a physical classroom.

---

## 15. Basic HTTP hardening added

The Next.js configuration now disables the framework-powered `X-Powered-By` header and adds baseline response headers:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: SAMEORIGIN`
- restrictive `Permissions-Policy`

This is basic hardening, not a complete production security review.

---

## 16. Environment documentation improved

`.env.example` now documents the application secret placeholder.

`.env.local.example` was added for local development, including seed variables.

Real environment values must never be committed.

---

## 17. Developer documentation improved

The project README now documents:

- technology stack
- current business scope
- online-only class model
- test booking model
- destination list
- phase roadmap
- database setup
- seed requirements
- Phase 1 scope

Additional scripts were added for:

```bash
npm run prisma:validate
npm run prisma:format
npm run prisma:migrate:dev
```

---

## 18. Validation performed

Because the supplied environment did not contain the project's npm dependencies, a normal `npm install` was attempted but could not complete within the available execution environment. Therefore a full `next build` / Prisma runtime test could not honestly be claimed.

The following source-level checks were completed instead:

### TypeScript/TSX syntax

All 21 TypeScript/TSX source files were parsed using the installed TypeScript compiler API.

Result:

`0 syntax errors`

### JSON

`package.json` and `tsconfig.json` were parsed successfully.

### Profanity logic

Runtime checks confirmed expected behavior for ordinary text, explicit forbidden terms and partial-word matching.

### Stale business text scan

The main source tree was scanned for the old fixed class times and old booking phrases.

No stale matches remained in the checked source tree.

### Full dependency/build validation

**Not completed in this environment.**

On a development machine with network/package access, run:

```bash
npm install
npm run prisma:generate
npm run prisma:validate
npm run build
```

Then configure PostgreSQL and run:

```bash
npm run prisma:push
npm run prisma:seed
```

---

## 19. Deliberately deferred to later phases

The following are **not Phase 1 work**:

- Full admin dashboard
- Admin login UI
- Permission-management UI
- Blog CMS UI
- FAQ CMS UI
- Testimonial CMS UI
- Media manager
- Lead-management UI
- Country-page CMS
- Full PTE/IELTS/Duolingo public pages
- Test-booking public section
- Premium public redesign
- Newsletter delivery provider
- Payment integration
- Student accounts
- Visa-management workflow
- University application workflow

These remain aligned with the four-phase roadmap.

---

## 20. Phase 1 result

The supplied ZIP remains the project foundation.

The codebase is now better aligned with the actual EduYatra business, safer around public API input and seed credentials, more suitable for database-driven content, and prepared for the Phase 2 CMS/admin build.

**Next phase:** Build the CMS/Admin portal with Superadmin + permission-based Admin access.
