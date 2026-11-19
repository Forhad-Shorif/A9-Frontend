<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# PROJECT PROGRESS

## 1. Overview & Status

- **Project:** MentorLagbe — tuition marketplace (students / tutors / admin).
- **Stack:** Next.js 16.4.6 (App Router), React 19, Tailwind CSS v4, shadcn preset `base-maia` (base-ui primitives), BetterAuth 1.7 + MongoDB driver, hugeicons.
- **Status:** Early stage. Auth (email/password + Google/GitHub) is wired and **role-based sign up works** (`students` / `teachers` / `admin`). Home navbar + footer are done. Dashboard sidebar is done (neon dark design, role-based menu). Dashboard pages are still placeholders.
- **Build:** `npm run build` passes (was failing on `/sign-in` prerender). `tsc --noEmit` and `eslint` are clean for the files touched.
- **Backend:** No separate Express server yet; BetterAuth runs inside Next.js at `/api/auth/[...all]`.

## 2. Completed Tasks

1. Project inspected and current state reviewed (no code changes).
2. **Home navbar built** (design from reference image), now rendered from the `(home)` layout.
3. **Dashboard sidebar redesigned** (neon dark design from reference image) with role-based menu groups (MAIN MENU / PREFERENCES).
4. **Role-based sign up fixed:** client now knows `role`/`coverImage` fields, UI sends `student` / `teacher`, and sign up redirects to the matching dashboard.
5. **Login/logout errors fixed:** `SocialSign` `loading` crash, `/sign-in` prerender failure (missing `Suspense`), and sign-out error handling (`{ error }` instead of `try/catch`).
6. **Navbar moved to the `(home)` route group** so dashboard/auth pages don't show it; fixed the nested `<html>`/`<body>` hydration error in `(home)/layout.tsx`.
7. **Navbar link icons + Dashboard shortcut:** every navbar link has an icon; logged-in users get a role-based Dashboard button (desktop + mobile sheet). Sidebar menus changed to a flat array per role and all role/dashboard mapping moved to `src/lib/roles.ts`.
8. **Footer built** from the reference image (dark theme, teal neon): CTA banner, brand card, STUDENTS / TUTORS link columns, GET IN TOUCH card with socials, bottom bar. Branding is **MentorLagbe** (not SikkhaLagbe).
9. **Home sections built:** `Banner` hero (headline + search + trust badges + `public/image.png`), `OurSuccess`, `Features`. Layouts follow the references, but the palette is the site teal and the copy/layout was re-written for a tuition marketplace, so it is not a copied design.
10. **Day/night theme pass:** every home section (hero, `OurSuccess`, features, footer) and the dashboard (sidebar + topbar + content) now has light styles plus `dark:` variants. `OurSuccess` now flips with the theme instead of staying dark. Added a pre-paint theme script in the root layout and a shared `ThemeToggle` (navbar + dashboard), so direct loads of dashboard/auth pages keep the saved theme.
11. **Dashboard sidebar matched to dark theme:** `.dark { --sidebar }` is now `#060b12` (was shadcn neutral gray), so the sidebar no longer clashes with the navy topbar/content.
12. **Success section split into Online / Offline:** `OurSuccess.tsx` now shows two story cards (class-from-anywhere + face-to-face classroom) with the user's 2 images, numbers and CTAs, plus an overall stat strip. Hero image switched to `public/image.png`; `public/banner.png` was renamed to `public/Online.png` by the user.
13. **Features heading fixed for the marketplace:** `Features.tsx` no longer says "Online Education Platform for Everyone". New heading **"Find your course. Find your mentor"** and copy explain the two sides: students search tuitions by subject / class / area / budget, tutors post tuition requests and receive applications. Each card carries a small **For students / For tutors / For everyone** tag, and the section ends with **Browse tuitions** + **Post a tuition** CTAs.

## 3. Files Created / Modified

| File | Status | Note |
| --- | --- | --- |
| `src/components/SheareHome/Navbar.tsx` | created (was empty) | Sticky floating navbar: logo, icon nav links, **Dashboard button** (logged-in, role-based), theme toggle, `ProfileNav`, mobile sheet menu. |
| `src/lib/roles.ts` | created | Single source for `UserRole`, `DASHBOARD_BY_ROLE`, `ROLE_LABEL`, `getRole`, `getDashboardHref`. |
| `src/components/SheareHome/Footer.tsx` | created (was empty) | Footer matching reference: CTA banner, brand card, Students/Tutors links, contact card + socials, bottom bar. Light mode = light teal cards, dark mode = original dark neon. |
| `src/components/SheareHome/Banner.tsx` | created as `Hero.tsx`, user renamed | Home hero (`HeroBanner`): headline with underline accents, search form (GET `/tuitions?q=`), trust badges, 3 mini stats, teal blob + `public/image.png`, floating notes. |
| `src/components/SheareHome/OurSuccess.tsx` | created (user renamed from `SuccessStats.tsx`) | "Our success story" band: two story cards — **Online** (`/Online.png` cutout on a teal gradient) and **Offline** (`/Offline.png` classroom photo) — each with quote, matched-tuition numbers and CTA, plus a 4-number overall strip. Light + dark variants. Default export `OurSuccessStats`. |
| `src/components/SheareHome/Features.tsx` | created | Two-sided marketplace feature grid. Heading **"Find your course. Find your mentor"** (students search by subject/class/area/budget, tutors post tuitions). 6 cards with a "For students / For tutors / For everyone" tag each, plus **Browse tuitions** (`/tuitions`) and **Post a tuition** (`/sign-up`) CTAs. |
| `src/components/SheareHome/ThemeToggle.tsx` | created | Shared day/night toggle (extracted from `Navbar`), used in navbar, mobile sheet and dashboard topbar. Writes `dark` class + `localStorage` + `color-scheme`. |
| `src/components/SheareHome/ProfileNav.tsx` | created (was empty) | Avatar (initials) + name + role; dropdown menu with name, email, Profile, Dashboard, Sign Out. |
| `src/components/ui/dropdown-menu.tsx` | created (shadcn CLI) | shadcn dropdown built on `@base-ui/react/menu`. |
| `src/app/layout.tsx` | modified | Root layout only (`<html>`/`<body>` + fonts). Contains an inline script that applies the saved theme **before paint**, so dashboard/auth pages (no navbar) also load with the right theme. |
| `src/app/(home)/layout.tsx` | modified | Home route-group layout renders `<Navbar />` + children + `<Footer />`. No `<html>`/`<body>` here (that caused a nested-html hydration error). |
| `src/app/globals.css` | modified | `@custom-variant dark` class strategy; dark theme `--sidebar` changed from neutral gray to `#060b12` so the sidebar matches the navy topbar/background. |
| `src/app/dashboard/layout.tsx` | modified | Content area gets explicit `bg-slate-50 text-neutral-900` + dark variants instead of inheriting theme tokens. |
| `src/app/components/DashboardToggleBar.tsx` | modified | Topbar now has full light-mode styles + `dark:` variants (search, icon buttons, user name/role) and hosts the theme toggle. |
| `src/app/components/DashboardSideBar.tsx` | modified | Neon sidebar that follows the theme: light teal surface in day, dark neon in night. Role menu is a **flat array per role**, logout with error handling. |
| `src/components/AuthSheare/Sign-Up.tsx` | modified | Role options save `students` / `teachers`; redirects to role dashboard after sign up. |
| `src/components/AuthSheare/SocialSign.tsx` | modified | Fixed undefined `loading` crash; added per-provider loading state + toasts. |
| `src/lib/auth-client.ts` | modified | `inferAdditionalFields<typeof auth>()` plugin (typed `role`), `baseURL` now from `NEXT_PUBLIC_APP_URL`. |
| `src/lib/auth.ts` | modified | `role` field type fixed from array to `"string"` (default `students`). |
| `src/app/(auth)/sign-in/page.tsx` | modified | Wrapped `<SignInPage />` in `<Suspense>` so build no longer fails on `useSearchParams`. |
| `AGENTS.md` | modified | Progress record added. |

## 4. Decisions & Reasons

- **Dropdown menu instead of a centered dialog:** profile info is small and contextual; a menu opens right under the avatar (as requested: image/avatar click → menu).
- **No new npm dependency for theme:** small toggle adds/removes the `dark` class on `<html>` and saves the choice in `localStorage`. Icon switches via CSS (`dark:hidden`), so there is no hydration mismatch.
- **Role values:** `students` (UI: Student) / `teachers` (UI: Teacher) / `admin`. `seeker`/`recruiter` are gone. Mapping lives only in `src/lib/roles.ts`.

- **Navbar icons + Dashboard shortcut:** each nav link carries its own `icon` in the `navLinks` array; logged-in users see a role-based Dashboard button in the navbar and mobile sheet.
- **Client typed via `inferAdditionalFields<typeof auth>()`:** this is the BetterAuth way to make `signUp.email({ role })` and `session.user.role` type-safe without duplicating the field list. Uses `import type`, so server code is not bundled into the client.
- **Unknown/missing role falls back to `students`** (previously `admin`, which was a security risk).
- **Navbar and sidebar use Tailwind classes only** (teal/cyan neon), no theme token changes.
- **`/sign-in` needs `<Suspense>`** because `SignInPage` uses `useSearchParams()`; Next 16 fails the static build without it.
- **Avatar shows initials, not photo:** user images come from remote URLs (Google/GitHub) and would need `next.config.ts` image domains.
- **Navbar only on home pages:** it lives in the `(home)` route group layout, so dashboard/auth pages stay clean. Rule: only the root layout may render `<html>`/`<body>`; a nested layout that renders them causes a hydration error.
- **Role mapping:** `students → Student (/dashboard/students)`, `teachers → Teacher (/dashboard/teachers)`, `admin → Admin (/dashboard/admin)`.
- **Footer is a client component** (`"use client"`) only because hugeicons icons use `forwardRef`; it has no state, so there is no behavior cost. Branding/copy is MentorLagbe with `hello@mentorlagbe.com`; social links are `#` placeholders until real profiles exist.
- **Nav links are future routes:** `/tuitions`, `/pricing`, `/about`, `/privacy`, `/terms` do not exist yet (404 until built).

## 5. Dependencies Added

- None. `@base-ui/react`, `@hugeicons/*`, `shadcn` (CLI) were already installed.

## 6. API / DB Notes

- BetterAuth user model has `additionalFields`: `role` (`students` | `teachers` | `admin`, default `students`) and `coverImage`.
- MongoDB database name: `assignment-projects` (see `src/lib/auth.ts`). Secrets stay in `.env` only.

## 7. Known Bugs / Pending Issues

- `src/app/components/DashboardSideBar.tsx`: `img` lint warning (user avatar) — harmless, `next/image` needs remote domains configured first.
- Old test accounts may still have `student` / `teacher` / `seeker` / `recruiter` in MongoDB `user.role`. Update them to `students` / `teachers` (MongoDB Compass); unknown values fall back to `students`.
- `/tuitions`, `/pricing`, `/about`, `/privacy`, `/terms` pages do not exist yet (footer + navbar links 404).
- Sidebar links to `/dashboard/students/applications` (plural) but the created folder is `dashboard/students/application` (singular) → 404 until renamed or the link changed.
- Placeholder pages (minimal export, build pass korar jonno) — replace with real UI: `dashboard/students/application`, `dashboard/students/saved`, `dashboard/students/profile`, `dashboard/teachers/profile`, `dashboard/teachers/tuitions`, `dashboard/teachers/post`, `dashboard/teachers/applicants`, `dashboard/admin/profile`, `dashboard/admin/tuitions`, `dashboard/admin/users`, `dashboard/admin/payments`.
- Auth screens (`sign-in`, `sign-up`, `profile`) are still hardcoded dark (`#07090e` + indigo/purple glow) and do not flip with the theme; the rest of the app does.
- Footer social links are `#` placeholders — replace with the real Facebook/LinkedIn/Instagram/X URLs when available.
- Hero search form posts to `/tuitions?q=`; that page does not exist yet, so submitting currently lands on 404.
- Home page content after `Features` is still missing (testimonials / featured tutors / CTA are not built yet).

## 8. Next Recommended Task

- Build `/tuitions` (listing + search results) so the hero search and "Browse Tuitions" actually work. After that: the sidebar sub-pages (`/dashboard/students/applications`, `/dashboard/students/saved`, `/dashboard/teachers/tuitions`, `/dashboard/teachers/post`, `/dashboard/teachers/applicants`) and `/pricing`, `/about`, `/privacy`, `/terms`.
