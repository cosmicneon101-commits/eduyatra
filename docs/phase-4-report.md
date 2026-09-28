# EduYatra Nepal — Phase 4 Report

## Phase
**Phase 4 — Connect Everything / Production Hardening**

## Source used
This phase was built directly from the Phase 3 source ZIP (`eduyatra-nepal-phase3.zip`). The Phase 2 admin/CMS foundation and Phase 3 public website remain in the same source tree.

## What Phase 4 completed

### 1. CMS → public website connection
- Public navigation now reads published courses from PostgreSQL instead of maintaining a separate hardcoded course menu.
- Public header/footer contact details, social links, office hours and WhatsApp number can now come from `SiteSetting` values managed by the admin portal, with the original constants retained as safe fallbacks.
- Admin mutations already write audit records; audit writes now also invalidate the public route tree so CMS changes become visible without requiring a manual application restart.
- Course, country, blog and generic page metadata can now reflect CMS-managed content.

### 2. Public form hardening
Added lightweight protections to public endpoints:
- Contact submissions: origin check, per-IP in-memory rate limiting, honeypot field, existing Zod validation.
- Newsletter subscriptions: origin check, rate limiting, honeypot field, email validation.
- Community questions: origin check, rate limiting, honeypot field, profanity validation and server-side Zod validation.

These protections are intentionally lightweight. The rate limiter is process-local and is not a replacement for a distributed rate-limit service/WAF in a multi-instance production deployment.

### 3. Admin login hardening
- Added process-local login throttling by email key.
- Added a constant-format fallback bcrypt hash comparison so unknown admin emails do not skip password-hash work entirely.
- Existing secure hashed session-token design remains in place.

### 4. SEO and discoverability
Added:
- Dynamic `/sitemap.xml` from published CMS content.
- Dynamic `/robots.txt` that explicitly blocks `/admin/` and points crawlers to the sitemap.
- Improved root metadata, Open Graph/Twitter metadata and metadata base URL.
- Dynamic metadata for:
  - country pages
  - course pages
  - blog posts
  - CMS generic pages
- Published CMS records are reflected in the sitemap automatically.

### 5. Public media connection
- Country hero images are rendered when a CMS country has one.
- Blog cover images are rendered on blog detail pages.
- Generic CMS page hero images are rendered when configured.
- Existing media library uploads continue to use the `/public/uploads` path.

### 6. Reliability / operational visibility
Added:
- `/api/health` database health endpoint.
- Public route-level error boundary with retry/home actions.
- Root 404 page.

The health endpoint returns only a simple status and does not expose database credentials or internal error details.

## Important production limitation
The current Media Library stores uploaded files on the application filesystem (`public/uploads`). This is fine for a traditional persistent server, but many modern serverless/container deployments use ephemeral filesystems. Before deploying to such infrastructure, move media storage to durable object storage and keep only the public URL/metadata in PostgreSQL.

Likewise, the Phase 4 rate limiter is process-local. For multiple application instances, use an external/shared rate-limit store or a reverse-proxy/WAF layer.

## Validation performed

### TypeScript / TSX parsing
- **71 TypeScript/TSX files parsed**
- **0 syntax errors**
- JSX syntax was included in the parser pass.

### Package metadata
- `package.json` parsed successfully as JSON.

### Build limitation
A full dependency installation was attempted with `npm install --no-audit --no-fund`, but the sandbox timed out before dependencies could be installed. Therefore:
- `next build` was **not** executed successfully in this environment.
- `prisma generate` was **not** executed successfully in this environment.
- `prisma validate` was **not** executed successfully in this environment.

This is an environment limitation, not a claim that the production build has been verified.

## Required final verification on a machine with normal npm/PostgreSQL access

```bash
npm install
npm run prisma:generate
npm run prisma:validate
npm run prisma:push
npm run prisma:seed
npm run build
npm start
```

Then verify at minimum:
1. Admin login/logout.
2. Admin permission restrictions.
3. Lead creation from `/contact` and lead visibility in Admin → Leads.
4. Newsletter subscription in Admin → Subscribers.
5. Community question moderation and official answer flow.
6. Course/package changes appearing publicly.
7. Country/section changes appearing publicly.
8. Blog publish/edit changes appearing publicly.
9. Site Settings changes appearing in public header/footer/WhatsApp links.
10. Media uploads and public image rendering.
11. `/sitemap.xml`, `/robots.txt`, `/api/health`.
12. Production filesystem/media strategy.

## Phase 4 outcome
The project now has a coherent CMS → PostgreSQL → public website flow rather than two largely separate interfaces. Admin-managed content is connected to public presentation, public lead/subscriber/community entry points are connected to the database, and basic SEO/security/operational layers are in place.

The remaining work after this phase is deployment-specific QA, real PostgreSQL verification, real-browser testing, and any business features intentionally deferred to a later product version (including payment integration and the future visa consultancy workflow).
