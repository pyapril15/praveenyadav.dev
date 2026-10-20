<!--
File: docs/git-github-command-guide.md
Role: Documents the Git and GitHub CLI commands used in this repository.
Use: Follow the sequence when starting, publishing, reviewing, and cleaning up work.
-->

# Git and GitHub CLI command guide

This repository uses **Git** to manage local changes and branches, and the
optional **GitHub CLI** (`gh`) to work with GitHub pull requests. They are
different tools: `git add` stages local files; `gh pr create` opens a pull
request on GitHub.

Normal work follows:

```text
origin/develop -> local develop -> task branch -> commit -> push
    -> pull request to develop -> CI/review -> merge -> delete task branch
```

Do not edit `main` or `develop` directly. Production changes reach `main`
through a reviewed pull request from `develop`.

## 1. Install and authenticate GitHub CLI (once)

Git works without `gh`; install GitHub CLI if you want to create and manage
pull requests from a terminal. In PowerShell:

```powershell
winget install --id GitHub.cli
gh auth login
gh auth status
```

`winget install` installs the CLI. `gh auth login` opens GitHub authentication;
choose GitHub.com and HTTPS unless your setup requires SSH. `gh auth status`
confirms which account is authenticated. Never paste access tokens into source
files or share them in chat.

Check repository access:

```powershell
gh repo view pyapril15/praveenyadav.dev
gh repo view pyapril15/praveenyadav.dev --web
```

The first command shows repository details; `--web` opens the repository in a
browser. You can omit this section if using GitHub's web interface for PRs.

## 2. Before changing code: inspect and sync

Run these commands from the repository root **before editing**:

```powershell
git status --short --branch
git branch --show-current
git branch --list
git remote -v
git fetch origin
```

| Command | Meaning |
| --- | --- |
| `git status --short --branch` | Shows the current branch and changed/untracked files. |
| `git branch --show-current` | Prints the active branch. |
| `git branch --list` | Lists local branches. |
| `git remote -v` | Shows fetch/push remotes; confirm `origin` points to the intended repository. |
| `git fetch origin` | Downloads remote branch updates without changing your files or current branch. |

If the status shows user work, stop and preserve it. Do not overwrite, discard,
or stage unrelated files. `git fetch` is safe with local edits; switching or
pulling may not be. Once the worktree is safe to switch, sync `develop`:

```powershell
git switch develop
git pull --ff-only origin develop
git status --short --branch
```

`git switch develop` selects the integration branch. `git pull --ff-only
origin develop` updates it only when Git can fast-forward; it will stop instead
of creating an unexpected merge. The final status check confirms the branch is
`develop` and shows whether the worktree is clean. Do not proceed on `main`,
another task branch, or a worktree containing unrelated edits.
If `develop` does not exist locally, create it to track the remote once with
`git switch --track -c develop origin/develop`, then continue with the pull
and status checks above.

## 3. Create a task branch before editing

Use one short-lived branch for one focused change:

```powershell
git switch -c docs/describe-the-change
git status --short --branch
```

`git switch -c <branch-name>` creates and checks out a new branch from the
current branch. Use one of these prefixes:

| Prefix | Use |
| --- | --- |
| `feat/` | New feature or page. |
| `fix/` | Non-emergency bug fix. |
| `docs/` | Documentation-only work. |
| `refactor/` | Behavior-preserving code restructuring. |
| `test/` | Tests or test tooling. |
| `chore/` | Maintenance, dependencies, or configuration. |
| `hotfix/` | Urgent production fix; start from `main`, then PR to `main` and back-merge to `develop`. |

Replace `docs/describe-the-change` with a unique, lowercase, hyphenated name.
If the branch already exists, do not force-create it; inspect it with
`git branch --list` and decide whether to switch to it or choose another name.
Now make the approved code or documentation changes.

## 4. Inspect, verify, and stage only intended files

After editing:

```powershell
git status --short
git diff
```

`git status --short` lists changed and untracked files. `git diff` reviews
unstaged tracked-file changes. For this Next.js project, run the relevant
checks before committing:

```powershell
npm ci
npm run lint
npm run typecheck
npm run build
```

Stage specific files, not every file in the repository:

```powershell
git add README.md CONTRIBUTING.md docs/git-github-command-guide.md
git diff --cached
git diff --cached --check
git status --short
```

| Command | Meaning |
| --- | --- |
| `git add <file> [<file>...]` | Stages only the named paths for the next commit. |
| `git diff --cached` | Reviews exactly what is staged. |
| `git diff --cached --check` | Finds whitespace errors in staged changes. |
| `git status --short` | Confirms the staged/unstaged files before committing. |

Replace the example file paths with the paths you actually changed. Avoid
`git add .` and `git add -A`: they can accidentally include unrelated or
user-provided files. Never stage `.env.local`, `.vercel/`, secrets, `node_modules/`,
`.next/`, build output, or generated files.

## 5. Commit and push the task branch

```powershell
git commit -m "docs: describe the change"
git status --short --branch
git push -u origin docs/describe-the-change
```

| Command | Meaning |
| --- | --- |
| `git commit -m "<message>"` | Saves staged changes as a local commit. Use a concise message such as `docs: update setup guide` or `fix: correct navigation link`. |
| `git push -u origin <branch>` | Publishes the branch to GitHub and sets its upstream so later pushes can use `git push`. |

Use the actual task-branch name in the push command. If Git reports a conflict
or rejected push, stop and inspect the message; do not force-push or rewrite
shared history.

## 6. Open and review a pull request

Using GitHub CLI:

```powershell
gh pr create --base develop --head docs/describe-the-change --title "docs: describe the change" --body "Summary, verification, and impact."
gh pr view --web
gh pr checks
```

| Command | Meaning |
| --- | --- |
| `gh pr create --base <target> --head <branch> --title "<title>" --body "<body>"` | Opens a PR from the task branch to the target branch. Normal work targets `develop`; releases target `main`. |
| `gh pr view --web` | Opens the current branch's PR in a browser. |
| `gh pr checks` | Shows CI and other required checks for the PR. |

If the PR template is not filled automatically, include the change summary,
type, exact test commands and results, deployment/security impact, and
checklist from `.github/pull_request_template.md`. Review the diff and Vercel
preview where applicable. Merge only after checks pass and review is complete.
The repo's short-lived PR strategy prefers squash merging.

## 7. Merge and safely delete the branch

After the PR is approved and required checks pass, either merge through the
GitHub UI or run:

```powershell
gh pr merge --squash --delete-branch
```

`gh pr merge --squash` merges the PR as one commit. `--delete-branch` deletes
the remote task branch after a successful merge. Do not delete a branch that
has an open PR or unmerged work.

Then update local `develop` and remove the merged local task branch:

```powershell
git switch develop
git pull --ff-only origin develop
git branch -d docs/describe-the-change
git fetch --prune origin
git status --short --branch
```

| Command | Meaning |
| --- | --- |
| `git branch -d <branch>` | Safely deletes a local branch if Git recognizes it as merged. |
| `git fetch --prune origin` | Removes stale local remote-tracking references for remote branches already deleted; it does not delete actual remote branches. |

If you merged using the GitHub UI and deleted the remote branch there, the
`git fetch --prune origin` command cleans up the stale `origin/<branch>`
reference locally. Because this repository normally squash-merges task PRs,
Git may not recognize the local task branch as merged. In that case, verify
the PR is merged on GitHub and there is no uncommitted work on that branch
before removing just that local branch with `git branch -D <branch>`.

To delete a remote branch manually instead of using the PR merge option:

```powershell
git push origin --delete docs/describe-the-change
```

This deletes the named branch on GitHub. Only do this after confirming its PR
is merged and there is no work that needs to be kept.

## 8. Release `develop` to production `main`

When reviewed work in `develop` is ready for release:

```powershell
git fetch origin
git switch develop
git pull --ff-only origin develop
gh pr create --base main --head develop --title "release: sync develop to main" --body "Release reviewed develop changes to production."
gh pr checks
```

Review the PR, required checks, and Vercel preview; merge it through GitHub or
with `gh pr merge` and choose an allowed merge method. A successful merge to
`main` triggers the production deployment. Check both the CI and Deploy to
Vercel runs and verify the production URL. See the
[GitHub Actions runbook](./github-actions-runbook.md).

For an urgent fix, start a `hotfix/<description>` branch from `main`, open and
merge its PR to `main`, then open a follow-up PR to bring the same fix into
`develop`.

## Useful GitHub CLI help

```powershell
gh help
gh repo --help
gh pr --help
gh pr create --help
gh pr checks --help
gh pr merge --help
```

These commands display help and syntax without changing repository state.
