<!--
File: docs/github-actions-runbook.md
Role: Explains GitHub Actions workflows, commands, triggers, and routine checks.
Use: Follow this runbook when reviewing changes and maintaining deployments.
-->

# GitHub Actions runbook

This project has two workflows: **CI** validates changes and
**Deploy to Vercel** publishes production from `main`. CI never receives
deployment credentials. Production secrets are only available to the
`production` GitHub environment, which is restricted to `main`.

## Workflows and commands

### CI — lint, type-check, and build

Workflow file: [`.github/workflows/ci.yml`](../.github/workflows/ci.yml)

CI runs on:

- Every pull request targeting `develop` or `main`.
- Every push to `develop` or `main`, including merges.
- Every Monday at **04:23 UTC** on the default branch (`main`).
- A manual run from GitHub Actions using **CI → Run workflow**; select the
  branch to check.

The job uses Node.js 22 and runs these commands in order:

```bash
npm ci
npm run lint
npm run typecheck
npm run build
```

`npm ci` installs exactly from the committed lockfile. Lint checks code style
and common errors; type-check generates the Next.js route types and checks
TypeScript; build verifies the production bundle can be generated.

### Deploy to Vercel — production

Workflow file:
[`.github/workflows/deploy-vercel.yml`](../.github/workflows/deploy-vercel.yml)

This workflow runs only on a push to `main`. GitHub's `production` environment
also restricts deployment to `main` and supplies `VERCEL_TOKEN`,
`VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` to the job as secrets. It runs:

```bash
npm ci
npm install --global vercel@64.5.0
vercel pull --yes --environment=production --token="$VERCEL_TOKEN"
vercel build --prod --token="$VERCEL_TOKEN"
vercel deploy --prebuilt --prod --token="$VERCEL_TOKEN"
```

The first command installs the project dependencies. The Vercel CLI install is
pinned; `vercel pull` retrieves production project configuration and
environment, `vercel build --prod` creates Vercel build output, and
`vercel deploy --prebuilt --prod` publishes that output to production.

Do not add a preview deployment workflow that exposes production secrets.
Vercel Git integration handles preview deployments; repository configuration
disables its duplicate Git deployments for `main` and `develop`.

## Routine operating cadence

| When | Task |
| --- | --- |
| Every pull request | Check the required **Lint, type-check, and build** status before merging. Review Vercel preview deployments when applicable. |
| Every push/merge to `develop` | Check the CI run; fix failures before releasing the branch to `main`. |
| Every push/merge to `main` | Check both CI and **Deploy to Vercel**. Open the production URL and verify the expected page loads. |
| Weekly, Monday 04:23 UTC | The scheduled CI run checks `main` even when no code has changed. Review its result in **Actions → CI** and investigate failures. This is a quality check, not a deployment. |
| Monthly | Review failed or cancelled workflow runs, confirm the `production` environment still allows only `main`, and check the Vercel token's expiry and project access. Renew an expiring token in Vercel and replace `VERCEL_TOKEN` in GitHub before it expires. |
| After changing deployment settings | Confirm the Vercel production branch is `main`, Node.js is 22.x, preview behavior is as intended, and the generated production URL is healthy. |

Never print or commit secret values. GitHub does not reveal a saved secret's
value; if one is incorrect, create a replacement and update it directly in
**Settings → Environments → production**.

## Running and troubleshooting workflows

To run CI on demand, open the repository's **Actions** tab, select **CI**,
click **Run workflow**, choose a branch, and start the run. The scheduled run
can also be re-run from its run page.

To retry a production deployment, first ensure the intended commit is on
`main`, then open **Actions → Deploy to Vercel** and use **Re-run jobs** on
that production run. A manual workflow trigger is intentionally not provided.

If a step fails:

1. Open the failed job and identify the failed step in its logs.
2. For CI failures, reproduce the corresponding `npm` command locally.
3. For Vercel authentication failures, verify the three secret names and
   replace their values directly in the GitHub environment if necessary.
4. For a failed deployment or bad release, use Vercel **Deployments** to
   promote the last known-good production deployment; then fix the source and
   release through the reviewed `develop` → `main` flow.

The real custom domain remains deferred until the portfolio is complete.
