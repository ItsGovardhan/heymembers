# Vena Build Checklist

## Phase 1 — Foundation
- [x] Inspect the workspace and confirm the application architecture and folder structure
- [x] Set up the Next.js App Router, TypeScript, Tailwind CSS, and shared design system
- [x] Add the single-source brand configuration and responsive animated public layout
- [x] Create Prisma models, SQLite configuration, seed script, and environment template
- [x] Run the app and verify the foundation

## Phase 2 — Public Experience
- [x] Build live stock home page, stock history chart, and live connection status
- [x] Build searchable/filterable Store with working product redirect tracking
- [x] Build searchable, animated FAQ and editable public support/status surfaces
- [x] Add responsive states, accessibility, and public page error/empty states
- [x] Run the app and verify public pages

## Phase 3 — Security and Live Data
- [x] Implement validated APIs, rate limits, secure sessions, and admin route protection
- [x] Implement persistent stock updates, history/activity logs, and SSE with polling fallback
- [x] Implement analytics tracking and secure settings/upload handling
- [x] Run the app and verify security and live data flows

## Phase 4 — Admin Dashboard
- [x] Build admin login, logout, password change, and lockout behavior
- [x] Build stock, product, FAQ, site settings, analytics, and activity management
- [x] Verify stock, product redirect/click tracking, and FAQ persistence

## Phase 5 — Quality and Local Hosting
- [x] Add a Playwright smoke test, Vercel PostgreSQL build path, and deployment README
- [x] Verify SQLite and PostgreSQL Prisma client generation and the production build
- [x] Run Playwright public-page and mobile navigation smoke tests
- [x] Verify admin auth, stock updates, FAQ persistence, product creation, and redirect workflow
- [x] Add Vena branding and responsive public/admin mobile navigation
- [x] Add Discord/Open Graph link-preview image and metadata
- [x] Add seeded Discord online/offline and artificial-member policy FAQs
- [x] Support instructions-only products as well as optional external checkout links
- [x] Prepare GitHub/Vercel setup guide and clean source ZIP
- [ ] Deploy to Vercel after connecting a Git repository, PostgreSQL database, and Vercel account
