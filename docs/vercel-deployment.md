<!--
File: docs/vercel-deployment.md
Role: Documents Vercel project setup and the protected production deployment path.
Use: Complete the provider and GitHub settings before merging a release to main.
-->

# Vercel deployment setup

Vercel is the selected hosting provider. Vercel Git integration provides
preview deployments for feature branches and pull requests. Production
deployment is owned by the GitHub Actions workflow
[`deploy-vercel.yml`](../.github/workflows/deploy-vercel.yml), which deploys
only after a push to `main` and obtains credentials from GitHub's `production`
environment.

[`vercel.json`](../vercel.json) prevents the Vercel Git integration from also
deploying pushes to `main` or `develop`, avoiding duplicate production
deployments. Keep preview deployments enabled in Vercel.

## Vercel project status

The project has been created and configured with the installed Vercel CLI:

- Project: `praveenyadav.dev`, using the Next.js framework preset and the
  repository root.
- Git repository: `pyapril15/praveenyadav.dev`.
- Production branch: `main`.
- Node.js runtime: `22.x`, matching the repository's CI runtime.
- Git-triggered deployments are disabled for `main` and `develop` by
  [`vercel.json`](../vercel.json); GitHub Actions owns production deployment.

The local CLI link is stored in the ignored `.vercel/` directory. To link
another checkout and inspect its non-secret project identifiers:

```bash
npx --yes vercel@64.5.0 login
npx --yes vercel@64.5.0 link
```

Select the existing `praveenyadav.dev` project. Read `orgId` and `projectId`
from the ignored local `.vercel/project.json`; do not commit `.vercel/` or
copy its contents into the repository.

## GitHub production environment status

The GitHub `production` environment is configured with deployment branches
restricted to `main`. All three Vercel credentials are present as environment
secrets:

| Secret | Purpose |
| --- | --- |
| `VERCEL_TOKEN` | Authenticates the Vercel CLI. |
| `VERCEL_ORG_ID` | Selects the Vercel account/team. |
| `VERCEL_PROJECT_ID` | Selects the linked Vercel project. |

Never put secret values in source files, workflow YAML, or `.env.example`.

## Verify the first production deployment

The production deployment is verified:

- The [Deploy to Vercel workflow](https://github.com/pyapril15/praveenyadav.dev/actions/runs/39369494769)
  completed successfully for `main` revision `db2f0be`.
- The [CI workflow](https://github.com/pyapril15/praveenyadav.dev/actions/runs/39369494676)
  also completed successfully for that revision.
- The generated production URL
  [praveenyadavdev.vercel.app](https://praveenyadavdev.vercel.app) responds
  successfully. It serves the foundation starter page until approved
  portfolio content is implemented.

The [first deployment attempt](https://github.com/pyapril15/praveenyadav.dev/actions/runs/39253017610)
failed because the environment secrets had not yet been added. The subsequent
production run succeeded; no rerun is needed.

For each future release, inspect the **Deploy to Vercel** and **CI** workflow
runs after merging to `main`, and check the live Vercel URL. If a deployment
introduces a problem, use the Vercel project's **Deployments** page to promote
the last known-good production deployment, then fix the source and release
through the normal `develop` → `main` pull-request flow.

## Custom domain and rollback

Do not attach the real custom domain or change its DNS during this foundation
phase. Add and verify the domain only after the portfolio content, metadata,
accessibility, and release checks are complete. The generated Vercel URL can
be used to validate the foundation in the meantime.

## References

- [Vercel CLI deployment guide](https://vercel.com/docs/projects/deploy-from-cli)
- [Vercel Git configuration](https://vercel.com/docs/project-configuration/git-configuration)
- [GitHub deployment environments](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments)
