## What and why

Describe the behavior change and link the task/requirement. Keep one reviewable scope.

## How to review

List the core files first and identify generated files such as package-lock.json.

## Verification

- [ ] Relevant tests pass; include commands and actual results
- [ ] Production build passes
- [ ] TDD evidence links to observed Red, Green, and refactor decisions (or explain bootstrap/docs-only scope)
- [ ] Existing documentation preserved and progress updated
- [ ] Manual UI checks completed, or explicitly marked pending

## Limitations and deployment

Describe unverified behavior, external API limitations, configuration changes, and rollback. No deployment is implied by merging.

## Review and merge

Resolve blocking findings, obtain review, and wait for CI before squash-merging into main. Do not treat author self-review as independent approval.
