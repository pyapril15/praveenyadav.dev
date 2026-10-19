<!--
File: README.md
Role: Project setup, architecture, status, and delivery overview.
Use: Entry point for users and contributors to this portfolio foundation.
-->

# Praveen Yadav Portfolio

This repository is the **foundation** for a personal portfolio site. It is
not a completed portfolio: the home screen is still the Create Next App
starter, and no portfolio claims, project examples, 3D scenes, contact form,
or backend features have been added.

## Technology

- Next.js App Router 16.4.2 and React 19
- TypeScript with strict checking
- Tailwind CSS 4
- ESLint 9 and npm lockfile

The existing `app/` directory is retained instead of moving starter files
under `src/`. The planned folder layout below is represented with
documentation-only placeholders until each feature is implemented.

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
production deployments are prepared to run through GitHub Actions. The GitHub
`production` environment and its Vercel secrets still need to be configured by
the repository owner. See the [Vercel deployment setup](./docs/vercel-deployment.md).
The real custom domain is intentionally deferred until the portfolio is
complete.

## Next implementation step

Before adding real portfolio pages, complete the
[portfolio content brief](./docs/portfolio-content-brief-template.md) with
approved profile details, project facts, publication permissions, and contact
preferences. Do not invent biography, client work, testimonials, or outcome
metrics.

## Foundation layout

```text
app/                         Existing Next.js App Router entry points
  about/                     Reserved for the future About route
  contact/                   Reserved for the future Contact route
  projects/                  Reserved for the future project index/details
components/
  contact/                   Future contact UI
  experience/scenes/         Optional, future 3D experience
  layout/                    Future shared site layout
  navigation/                Future accessible navigation
  projects/                  Future project presentation
  ui/                        Future reusable UI
content/                     Future approved, typed local portfolio content
lib/
  content/                   Future server-only content access
  seo/                       Future shared SEO helpers
  validation/                Future input/content validation
public/
  images/{profile,projects,social}/
  models/                    Optional optimized 3D assets
tests/{unit,components,e2e}/  Future tests for implemented behavior
.github/
  ISSUE_TEMPLATE/            Bug and feature issue forms
  workflows/                 CI checks
```

Folders without implemented behavior contain only a `.gitkeep` placeholder.
Do not add empty APIs, data layers, or feature abstractions. Next.js special
files, JSON files, binary assets, and the standard license text cannot carry
the source comment header; their purpose is documented here instead.
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

## Foundation checklist

- [x] App Router, strict TypeScript, ESLint, Tailwind, and npm lockfile.
- [x] Lint, type-check, and production-build CI workflow.
- [x] Repository guidance, contribution flow, issue forms, and license.
- [x] GitHub ruleset imported for `main` and `develop`.
- [x] Vercel project connected to GitHub, production branch set to `main`,
      Node.js 22 configured, and GitHub Actions production deployment workflow
      added with duplicate Git deployments disabled for `main` and `develop`.
- [ ] Create the GitHub `production` environment restricted to `main`, connect
      the Vercel project, configure secrets, and verify deployment, monitoring,
      and rollback. Attach the real domain only after portfolio completion.
- [ ] Approved portfolio content and real route pages.
- [ ] Route metadata, sitemap, robots, social images, and accessibility review.
- [ ] Tests for real portfolio journeys.
- [ ] Optional 3D, contact, CMS, analytics, or backend features only if needed.

See [AGENTS.md](./AGENTS.md) for the detailed implementation checklist and
project-specific agent guidance. See [LICENSE](./LICENSE) for the MIT license.
The imported branch-ruleset configuration is tracked in
[github-main-develop-ruleset.json](./github-main-develop-ruleset.json).
