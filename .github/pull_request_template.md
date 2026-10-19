<!--
File: .github/pull_request_template.md
Role: Pull request review checklist.
Use: Prompts contributors to summarize changes and report verification.
-->

## Summary

<!-- What changed and why? Link an issue if applicable. -->

## Change type

- [ ] Feature
- [ ] Fix
- [ ] Documentation
- [ ] Refactor
- [ ] Test
- [ ] Maintenance

## Verification

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] Tests (if applicable): <!-- list commands/results -->

## Impact

- Accessibility, keyboard, or reduced-motion impact:
- Performance or visual impact (screenshots for UI changes):
- Security, privacy, cache, or deployment impact:
- Environment variables or migration required:

## Checklist

- [ ] No secrets, generated output, or unrelated changes included.
- [ ] Documentation and file-purpose headers are current where applicable.
- [ ] Changes follow the project's staged roadmap; optional infrastructure is
      justified by a requirement.
