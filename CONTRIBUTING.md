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
settings. Verify the preview and all required checks before merging. Production
deployment is not configured by this repository; when a host is selected,
configure production deployment from `main` only and preview deployment for
pull requests or `develop` using separate environments.

## GitHub settings still to configure

Repository settings cannot be established by workflow or documentation files.
In **Settings → Rules → Rulesets**, create a ruleset targeting `main`:

1. Prevent branch deletion and force pushes.
2. Require a pull request before merging.
3. Require the CI check named **Lint, type-check, and build** after it has run
   once and appears in GitHub's status-check selector.
4. Require resolved conversations if review conversations are used.
5. Require an approval only when an independent reviewer is available; do not
   block a solo owner with an impossible approval rule.
6. Restrict direct pushes if that matches the owner's release policy. Do not
   require signed commits unless signing is configured.

Add a lighter ruleset for `develop` with pull requests and the same CI check if
the owner wants integration changes gated. The GitHub default is currently
`main`; keep it for a production-facing landing page, or change it to
`develop` only if the owner prefers integration work as the landing branch.
Changing the default branch affects repository links and open pull requests
and must be done by an owner in **Settings → General → Default branch**.

When deployment hosting is chosen, configure a protected production
environment requiring `main`; keep production secrets out of pull requests
and feature branches. Add preview/staging variables only to the matching
environment. This project currently has no provider, deployment workflow, or
deployment secrets. For rollback, redeploy the provider's last known-good
deployment; document and test the provider-specific steps before launch.

## Foundation scope

Keep changes aligned with [AGENTS.md](./AGENTS.md) and the staged project plan
in [README.md](./README.md). The starter page is intentionally not yet a
portfolio. Do not introduce 3D, a contact API/form, a CMS, a database,
authentication, analytics, or self-hosted infrastructure without a concrete
approved requirement.
