# EduYatra Nepal — Phase 2 Report

## Phase
**Phase 2 — Build the CMS/Admin**

## Date
27 September 2026

## Objective
Turn the Phase 1 EduYatra codebase into a maintainable content-management/admin platform where authorized EduYatra staff can manage the website without editing source code.

## Baseline
This phase continues directly from `eduyatra-nepal-phase1.zip`. No unrelated rewrite was introduced.

## Major changes

### 1. Admin authentication foundation
- Added `/admin/login`.
- Added branded admin login screen.
- Reused the existing secure hashed-token session model.
- Added login/logout audit entries.
- Inactive administrators cannot authenticate.
- Expired sessions are removed from the database.
- Admin session cookies remain HttpOnly and use Secure in production.
- Prevented administrators from deactivating their own account.

### 2. Granular permission system
Added database-backed permissions instead of relying only on `ADMIN` / `SUPER_ADMIN` roles.

Permission groups cover:
- Dashboard
- Leads
- Blogs
- FAQs
- Testimonials
- Community
- Courses
- Test booking
- Countries
- Pages
- Media
- Announcements
- Administration
- Settings
- Audit log

Superadmin bypasses permission checks. Normal admins receive only explicitly assigned permissions.

### 3. Superadmin admin management
Added an Admins & Permissions section where Superadmin can:
- Create administrators
- Edit administrator details
- Change passwords
- Activate/deactivate administrators
- Assign granular permissions

Superadmin accounts cannot be deactivated through the normal admin toggle.

### 4. Audit logging
Added `AuditLog` and recorded important operations such as:
- Login/logout
- Create/update/delete
- Publish/status changes
- Admin activation/deactivation
- Permission changes

This provides accountability for future multi-admin operation.

### 5. Leads management
The existing PostgreSQL contact-submission model is now surfaced as `/admin/leads`.
Admins can:
- View inquiries
- See service/source/contact details
- Update lead status
- Add internal notes

Statuses remain:
`NEW`, `CONTACTED`, `CONVERTED`, `CLOSED`.

### 6. Blog CMS
Added `/admin/blogs` with:
- Create/edit
- Draft/publish state
- Featured state
- Category
- Author
- Cover image URL
- Excerpt
- SEO title/description
- Rich-text content
- Delete

Rich text is handled with a dependency-free browser editor and sanitized on the server before storage.

### 7. FAQ CMS
Added `/admin/faqs` with:
- Create/edit/delete
- Categories
- Sort order
- Publish/hide state
- Rich-text answers

### 8. Testimonials / student scores CMS
Added `/admin/testimonials` with all agreed fields:
- Student name
- Photo
- Test type
- Overall score
- Reading/listening/writing/speaking
- Destination
- University
- Course
- Student story
- Published/featured
- Display order

### 9. Community moderation
Added `/admin/community`.

Admins can:
- Review pending questions
- Approve/reject questions
- Review answers
- Approve/reject answers
- Respond as EduYatra Team

The Phase 1 `PENDING` moderation behavior is now supported by an actual admin workflow.

### 10. Course CMS
Added database models and admin management for:
- PTE Academic
- Duolingo English Test
- IELTS

Courses support:
- Online class mode
- Multiple-batch availability
- Description
- Published state
- Sort order
- Packages

Course packages support:
- Package name
- Price as integer data
- Description
- Published state
- Sort order

Seed data reflects the current EduYatra pricing agreed for V1.

### 11. Test booking CMS
Added `/admin/test-booking` for:
- PTE
- Duolingo
- IELTS
- GRE
- SAT
- TOEFL

Each booking service stores its WhatsApp predefined message, making booking CTAs editable without source-code changes.

### 12. Country template CMS
Added country and country-section models and `/admin/countries`.

Seed templates exist for:
- Australia
- United Kingdom
- United States
- New Zealand
- South Korea
- Japan
- Europe
- India
- Bangladesh

The content intentionally starts as editable templates rather than invented consultancy claims.

### 13. Generic page CMS
Added `/admin/pages` for reusable pages such as:
- About
- Study Abroad
- Contact
- Privacy Policy
- Terms & Conditions
- Disclaimer

Legal pages are explicitly seeded as templates requiring EduYatra approval before production use.

### 14. Media library
Added `/admin/media`.

Admins with permission can:
- Upload image files up to 5 MB
- Store alt text
- Browse uploaded images
- Delete media

The database stores metadata while files are written to `public/uploads` in this phase. The implementation is intentionally simple and can later be switched to object storage without changing the CMS data model.

### 15. Announcement subscribers
Added `/admin/subscribers` for PostgreSQL-backed announcement subscriber management.

Admins can view subscribers and deactivate them.

Actual email campaign delivery remains outside V1.

### 16. Site settings
Added `/admin/settings` for centralized editable values such as:
- Site name
- Tagline
- Phone
- Email
- Address
- Office hours
- WhatsApp number
- Social links

This reduces hardcoded business details across the frontend.

### 17. Admin dashboard
Added a restrained EduYatra-branded dashboard with:
- New lead count
- Pending question count
- Draft blog count
- Active subscriber count
- Recent leads
- Recent administrator activity

The dashboard is deliberately operational rather than a decorative analytics screen.

### 18. Admin UI direction
The admin portal uses:
- EduYatra navy/orange accents
- White and soft-gray workspace
- Clean tables/cards
- Restrained branding
- Responsive layouts
- Simple forms
- Clear empty states and statuses

### 19. Security/architecture improvements
- Server-side permission enforcement is used for admin mutations.
- Public/admin content fields are validated/sanitized where relevant.
- Rich-text content removes scripts, iframes, embeds, inline event handlers and JavaScript URLs before persistence.
- Admin password creation/reset uses bcrypt hashing.
- Seed credentials remain environment-controlled.
- Self-deactivation is prevented.

## Database additions
Phase 2 expanded Prisma with models for:
- Permission
- AdminPermission
- AuditLog
- Course
- CoursePackage
- CourseFeature
- TestBookingService
- Country
- CountrySection
- Page
- MediaAsset
- SiteSetting

Existing models for AdminUser, AdminSession, Blog, FAQ, Testimonial, ContactSubmission, AnnouncementSubscriber and Community remain part of the system.

## Seed data additions
The seed now initializes:
- All defined permissions
- Superadmin permission assignments
- Current PTE/DET/IELTS course/package data
- Current test-booking services and WhatsApp messages
- All agreed destination templates
- Initial site settings
- Editable page/legal templates

## Validation performed
- Parsed **45 TS/TSX files** using the installed TypeScript parser: **0 syntax errors**.
- `package.json` JSON parsing passed.
- Counted 21 Prisma models and 28 exported admin server actions.
- Reviewed the route/component structure after changes.

## Validation limitation
The sandbox did not have the project's npm dependencies installed. Attempts to install dependencies timed out, so a real `prisma generate`, `prisma validate`, and `next build` could not be executed in this environment.

This means the report does **not** claim a successful production build. Before deployment, run:

```bash
npm install
npm run prisma:generate
npm run prisma:validate
npm run prisma:push
npm run build
```

Then seed a development database with:

```bash
npm run prisma:seed
```

using real `DATABASE_URL`, `SEED_ADMIN_PASSWORD`, and `SEED_SUPERADMIN_EMAIL` environment variables.

## Intentional non-goals
Phase 2 does not implement:
- Student accounts
- Payments
- Online learning dashboard
- Practice-test engine
- Visa application workflow
- University application workflow
- Student document management
- Automated email campaign delivery
- Full CRM automation

These remain future platform work.

## Next phase
**Phase 3 — Build the Public Website**

The next phase will use this CMS foundation to build/refine the premium public-facing EduYatra experience: homepage, course pages, test-booking CTAs, study-abroad country templates, blogs, FAQs, community, contact/lead capture, announcement subscription and responsive navigation.
