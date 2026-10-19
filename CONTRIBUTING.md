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

### Next: deployment environment

No deployment provider or workflow is configured yet. After choosing a
Next.js-compatible host:

1. Create a GitHub environment named `production` in **Settings → Environments**.
2. Restrict deployment branches to `main`; add required reviewers only if an
   independent approver is available.
3. Add only the secrets and variables required by that provider to the
   appropriate GitHub environment or hosting project. Never expose production
   secrets to pull requests or `develop`.
4. Add and test a provider-specific deployment workflow that targets the
   `production` environment only on `main`. Use preview deployments for pull
   requests only when the provider supports safe, isolated previews.
5. Document how to verify a release and redeploy the last known-good version.

Until a host and its required configuration are selected, do not add deploy
credentials, provider-specific actions, or a placeholder deployment workflow.

## Foundation scope

Keep changes aligned with [AGENTS.md](./AGENTS.md) and the staged project plan
in [README.md](./README.md). The starter page is intentionally not yet a
portfolio. Do not introduce 3D, a contact API/form, a CMS, a database,
authentication, analytics, or self-hosted infrastructure without a concrete
approved requirement.
