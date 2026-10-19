<!--
File: CONTRIBUTING.md
Role: Contributor workflow and release guidance.
Use: Describes branch flow, local checks, and repository settings.
-->

# Contributing

## Branch model

- `main` is the production-ready branch. It is the current GitHub default.
- `develop` is the integration branch for reviewed work that is not yet
  released.
- Create short-lived task branches from `develop`:
  `feat/<description>`, `fix/<description>`, `docs/<description>`,
  `refactor/<description>`, `test/<description>`, or
  `chore/<description>`.
- Open pull requests from task branches to `develop`. Wait for CI and review
  before merging.
- Release from `develop` to `main` through a reviewed pull request. Use a
  `release/<version>` branch only when a separate stabilization period is
  needed.
- Create urgent `hotfix/<description>` branches from `main`; after review and
  release, back-merge the same fix into `develop`.

```text
develop -> feat/* -> pull request -> develop -> release pull request -> main
main -> hotfix/* -> pull request -> main -> back-merge -> develop
```

For this solo-owned repository, use CI and a careful self-review when another
reviewer is unavailable; do not configure a fake approval requirement.

## Start and publish a task branch

```bash
git fetch origin
git switch develop
git pull --ff-only origin develop
git switch -c chore/short-description
```

After making the change, run the relevant checks and inspect `git status` and
`git diff`. Stage only the intended paths:

```bash
git add CONTRIBUTING.md README.md
git commit -m "docs: describe contribution workflow"
git push -u origin chore/short-description
```

Open a pull request to `develop`. Never use `git add .` where unrelated or
user-provided files may be present. Do not commit `.env.local`, secrets,
`node_modules`, `.next`, build output, or generated type files.

## Local verification

Install exactly from the npm lockfile and run:

```bash
npm ci
npm run lint
npm run typecheck
npm run build
```

There is no test framework yet. Add focused tests when real application
behavior is introduced and update CI to run them. Do not report unconfigured
tests as passing.

## Pull requests and CI

Every pull request to `develop` or `main` runs the CI workflow: `npm ci`,
lint, TypeScript checking, and a production build. The workflow requires only
read access to repository contents and uses no deployment secrets.

Prefer squash merging for short-lived task branches if enabled in repository
settings. Verify the preview and all required checks before merging. The Vercel
deployment path is documented in
[docs/vercel-deployment.md](./docs/vercel-deployment.md). GitHub Actions
deploys production only from `main`; Vercel Git integration is intended for
preview deployments. Complete the environment and project setup before
releasing the workflow to `main`.

## GitHub ruleset status and deployment setup

The repository owner has imported
[github-main-develop-ruleset.json](./github-main-develop-ruleset.json) in
**Settings → Rules → Rulesets**. It targets both `main` and `develop` and
enforces:

- Pull requests before updating either protected branch.
- The **Lint, type-check, and build** status check, with branches required to
  be up to date before merging.
- Resolved review conversations.
- No branch deletion or force pushes.
- No required approving review count, so a solo owner is not blocked.

If the ruleset is changed in GitHub, update and re-import the JSON so the
tracked configuration remains an accurate reference. The GitHub default
branch remains `main`; changing it affects repository links and open pull
requests and should only be done intentionally in **Settings → General →
Default branch**.

### Vercel production environment

Vercel is selected and
[the production workflow](./.github/workflows/deploy-vercel.yml) is prepared.
Before merging it to `main`, create the GitHub `production` environment,
restrict it to the `main` branch, connect the Vercel project, and add the
required environment secrets. Follow [the setup guide](./docs/vercel-deployment.md)
for the exact steps. Never expose production credentials to pull requests or
`develop`. Keep the real custom domain and DNS changes deferred until the
portfolio is complete.

## Foundation scope

Keep changes aligned with [AGENTS.md](./AGENTS.md) and the staged project plan
in [README.md](./README.md). The starter page is intentionally not yet a
portfolio. Do not introduce 3D, a contact API/form, a CMS, a database,
authentication, analytics, or self-hosted infrastructure without a concrete
approved requirement.
