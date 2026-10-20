<!--
File: README.md
Role: Project setup, architecture, status, and delivery overview.
Use: Entry point for users and contributors to this portfolio foundation.
-->

# Praveen Yadav Portfolio

This repository is the **foundation** for a personal portfolio site. It is
not a completed portfolio: its routes are blank scaffolds, and no portfolio
claims, project examples, 3D scenes, contact form, or backend features have
been added.

## Technology

- Next.js App Router 16.4.2 and React 19
- TypeScript with strict checking
- Tailwind CSS 4
- ESLint 9 and npm lockfile

The existing `app/` directory is retained as the App Router root. Public
routes are grouped under `app/(portfolio)/`; the group name does not appear in
URLs. Supporting source folders are under `src/`. Route files currently
contain only minimal build-valid placeholders; portfolio content and behavior
remain unimplemented.

## Getting started

Use a Node.js version supported by the installed Next.js release (20.9 or
newer; Node.js 22 LTS is recommended), then run:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Next.js development server. |
| `npm run lint` | Run ESLint. |
| `npm run typecheck` | Generate route types and run TypeScript without emitting files. |
| `npm run build` | Create a production build. |
| `npm run start` | Serve the production build locally. |

There is not yet a test framework or test command. Add tests alongside the
first implemented behavior rather than introducing unused tooling.

## Environment

Copy `.env.example` to `.env.local` for local configuration. `NEXT_PUBLIC_SITE_URL`
is a public canonical-origin setting, not a secret. Set it to the real public
site origin when the final domain is ready. Never put credentials in variables
prefixed with `NEXT_PUBLIC_`.

## Deployment

Vercel is the selected host. The Next.js project is connected to this GitHub
repository, configured for production branch `main` and Node.js 22, and
production deployments run through GitHub Actions. The GitHub `production`
environment is restricted to `main`, and its required Vercel secrets are
configured. The production deployment is live at
[praveenyadavdev.vercel.app](https://praveenyadavdev.vercel.app), and both the
production deploy workflow and CI passed for the current `main` revision. See
the [Vercel deployment setup](./docs/vercel-deployment.md). The real custom
domain is intentionally deferred until the portfolio is complete.

## Next implementation step

**Status:** the repository, CI, deployment, and delivery workflow foundations
are in place. The requested route and source-folder skeleton now exists, but
portfolio-specific content and behavior have not been implemented. Robots
blocks indexing and the sitemap is empty until approved content is ready. The
next step is to complete the
[portfolio content brief](./docs/portfolio-content-brief-template.md) with
approved profile details, project facts, publication permissions, audience,
and contact preferences. Then implementation can begin without inventing
biography, client work, testimonials, or outcome metrics.

## Foundation layout

```text
app/
  favicon.ico
  globals.css
  layout.tsx
  not-found.tsx
  robots.ts
  sitemap.ts
  (portfolio)/                Shared route group; omitted from public URLs
    layout.tsx
    page.tsx                   Home route placeholder
    about/page.tsx
    contact/page.tsx
    projects/page.tsx
    projects/[slug]/page.tsx
src/
  components/
    experience/
      ExperienceCanvas.tsx    Reserved optional 3D canvas
      ExperienceShell.tsx     Reserved optional experience wrapper
    layout/
      SiteFooter.tsx
      SiteHeader.tsx
    projects/ProjectCard.tsx
  content/                    Reserved approved, typed portfolio content
  lib/site.ts                 Reserved shared site constants/helpers
  types/project.ts            Reserved project content types
public/
  images/{profile,projects,social}/
  models/                     Optional optimized 3D assets
tests/{unit,components,e2e}/   Reserved tests for implemented behavior
.github/
  ISSUE_TEMPLATE/            Bug and feature issue forms
  workflows/                 CI checks
```

Requested future component/content modules contain only file-purpose headers;
they are not imported or implemented. No contact API, R3F dependency, CMS,
database, or other optional feature has been added. Next.js route files include
only the minimum exports needed to keep the app buildable. Robots blocks
crawling and the sitemap is empty while these routes contain no content.
JSON files, binary assets, and generated files cannot carry source comment
headers; their purpose is documented here instead.
Generated files and vendored dependencies are not edited.

## Delivery and branches

- `main` is the production branch and the current GitHub default branch.
- `develop` is the integration branch.
- Start a focused `feat/`, `fix/`, `docs/`, `refactor/`, `test/`, or `chore/`
  branch from `develop`; open a reviewed pull request back to `develop`.
- Release reviewed changes from `develop` to `main` through a pull request.
- Create urgent `hotfix/` branches from `main`, then back-merge the fix to
  `develop`.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for commands, CI expectations, and
the imported GitHub ruleset and remaining deployment setup.
See the [GitHub Actions runbook](./docs/github-actions-runbook.md) for workflow
commands, triggers, the weekly CI schedule, and routine deployment checks.
See the [Git and GitHub CLI command guide](./docs/git-github-command-guide.md)
for ordered branch, add, commit, push, PR, merge, and cleanup commands.

## Foundation checklist

- [x] App Router, strict TypeScript, ESLint, Tailwind, and npm lockfile.
- [x] Lint, type-check, and production-build CI workflow.
- [x] Repository guidance, contribution flow, issue forms, and license.
- [x] GitHub ruleset imported for `main` and `develop`.
- [x] Vercel project connected to GitHub, production branch set to `main`,
      Node.js 22 configured, and GitHub Actions production deployment workflow
      added with duplicate Git deployments disabled for `main` and `develop`.
- [x] GitHub `production` environment restricted to `main` with all required
      Vercel secrets configured.
- [x] Production deployment verified on the generated Vercel URL; rollback
      instructions documented. The custom domain remains deferred.
- [x] Git/GitHub command sequence documented; GitHub ruleset and hosting setup
      are in place.
- [x] Add the requested App Router route and `src/` source structure without
      implementing portfolio features or adding optional dependencies.
- [ ] Approved portfolio content and real route pages.
- [ ] Route metadata, sitemap, robots, social images, and accessibility review.
- [ ] Tests for real portfolio journeys.
- [ ] Optional 3D, contact, CMS, analytics, or backend features only if needed.

See [AGENTS.md](./AGENTS.md) for the detailed implementation checklist and
project-specific agent guidance. See [LICENSE](./LICENSE) for the MIT license.
The imported branch-ruleset configuration is tracked in
[github-main-develop-ruleset.json](./github-main-develop-ruleset.json).
