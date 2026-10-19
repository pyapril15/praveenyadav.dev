<!--
File: AGENTS.md
Role: Repository-specific guidance and delivery checklist.
Use: Read before making changes to this portfolio foundation.
-->

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Portfolio foundation checklist

This repository is a foundation, not a completed portfolio. Keep the starter
application runnable and implement future features only when their phase is
approved. Do not invent biography, projects, testimonials, metrics, or
credentials.

### Foundation

- [x] Next.js App Router, React, TypeScript strict mode, Tailwind CSS, ESLint,
      and a committed npm lockfile are present.
- [x] Keep the root layout and route content server-rendered by default.
- [x] Add file-purpose headers to project-owned source and supported text
      configuration files; never add comments to JSON or generated files.
- [x] Add project setup, contribution, branch, CI, license, and future-work
      documentation.
- [x] Add lint, type-check, and production-build CI checks.
- [x] Import the repository branch ruleset protecting `main` and `develop`:
      pull requests, required `Lint, type-check, and build` check, resolved
      review threads, no deletion, and no force pushes.
- [x] Select Vercel, create the Next.js project, connect the GitHub repository,
      set its production branch to `main` and Node runtime to `22.x`, and add a
      GitHub Actions production workflow. Disable duplicate Vercel Git
      deployments for `main` and `develop`.
- [ ] Create the GitHub `production` environment restricted to `main`, add
      Vercel secrets, and verify a production deployment. Keep the real custom
      domain deferred until the portfolio is complete.
- [ ] Replace the starter home screen only after portfolio content is approved.

### Portfolio content and SEO

- [ ] Confirm audience, approved profile content, routes, browser support,
      accessibility goals, and canonical public URL.
- [ ] Add semantic home, about, projects, project-detail, and contact routes.
- [ ] Add validated local project content and responsive, licensed imagery.
- [ ] Add route metadata, canonical URLs, Open Graph assets, sitemap, robots,
      and not-found handling for implemented public routes.
- [ ] Verify keyboard navigation, focus, contrast, reduced motion, zoom, and
      mobile/touch layouts.

### Optional experience and server features

- [ ] Add React Three Fiber only after an experience is designed; lazy-load it
      behind an accessible HTML fallback and reduced-motion path.
- [ ] Add contact forms, APIs, CMS, databases, authentication, or analytics
      only for an approved requirement, with validation, privacy, and tests.
- [ ] Do not add Redis, Kubernetes, a load balancer, or other operations
      infrastructure without measured need.

### Release readiness

- [ ] Add unit, component, and end-to-end tests for implemented journeys.
- [ ] Verify production metadata, accessibility, performance, and deployment.
- [ ] Document the selected host, environment variables, monitoring, rollback,
      data retention, and operational owner before production release.

## Working conventions

- Follow the current installed Next.js documentation under
  `node_modules/next/dist/docs/` before using framework APIs.
- Keep optional infrastructure and dependencies out until a requirement
  justifies them.
- Run `npm run lint`, `npm run typecheck`, and `npm run build` for code/config
  changes. Add tests when behavior is introduced.
- Work from `develop` on a focused short-lived branch and submit a pull request
  to `develop`; release to `main` only through reviewed changes.
- Do not commit secrets, generated output, or unrelated working-tree changes.
