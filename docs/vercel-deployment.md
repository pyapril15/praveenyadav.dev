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

## One-time setup

Complete these steps before the workflow is merged to `main`:

1. Sign in to Vercel, connect the GitHub account, and import
   `pyapril15/praveenyadav.dev` as a project. Keep the project root at `.`,
   use the detected Next.js framework settings, and do not override the
   install or build commands.
2. In Vercel **Project Settings → Git**, set the production branch to `main`.
   Keep branch/PR preview deployments enabled. The repository's Vercel config
   disables Git-triggered deployments for `main` and `develop`; GitHub Actions
   is the only production deployer.
3. Link the local checkout to the imported project to retrieve its identifiers:

   ```bash
   npx --yes vercel@64.5.0 login
   npx --yes vercel@64.5.0 link
   ```

   Select the same Vercel team and project used in step 1. Read `orgId` and
   `projectId` from the ignored local `.vercel/project.json`; do not commit
   `.vercel/` or copy its contents into the repository.
4. In GitHub, open **Settings → Environments**, create an environment named
   `production`, and set **Deployment branches and tags** to **Selected
   branches and tags** with only `main` selected. Configure this restriction
   before adding credentials. Required reviewers are optional; do not add a
   self-review requirement for the solo maintainer.
5. Add these as **environment secrets** on the `production` environment:

   | Secret | Value |
   | --- | --- |
   | `VERCEL_TOKEN` | A Vercel access token with access to the selected project/team. |
   | `VERCEL_ORG_ID` | The `orgId` from `.vercel/project.json`. |
   | `VERCEL_PROJECT_ID` | The `projectId` from `.vercel/project.json`. |

   Do not put these values in source files, workflow YAML, or `.env.example`.
6. Merge the reviewed deployment changes to `main`. The workflow runs
   `vercel pull`, `vercel build --prod`, and `vercel deploy --prebuilt --prod`.
   Confirm the GitHub Actions run succeeds and inspect the deployment in
   Vercel. Because this is a foundation, the generated Vercel URL will serve
   the existing starter page until approved portfolio content is implemented.

## Custom domain and rollback

Do not attach the real custom domain or change its DNS during this foundation
phase. Add and verify the domain only after the portfolio content, metadata,
accessibility, and release checks are complete. The generated Vercel URL can
be used to validate the foundation in the meantime.

To roll back a bad release, use the Vercel project's **Deployments** page to
promote the last known-good production deployment, then fix the source and
release through the normal `develop` → `main` pull-request flow.

## References

- [Vercel CLI deployment guide](https://vercel.com/docs/projects/deploy-from-cli)
- [Vercel Git configuration](https://vercel.com/docs/project-configuration/git-configuration)
- [GitHub deployment environments](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments)
