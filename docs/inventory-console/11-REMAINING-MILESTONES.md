# Remaining milestone verification

This report records observed results, not assumptions. PR descriptions and reviews use short English. The product scope remains R01–R08.

## M1 product loading

T04–T08 implemented on feat/m1-product-loading.

- Real GET returned 50 products with the required fields; first product id 1.
- API tests cover HTTP errors, malformed JSON/data, a 10-second timeout, caller cancellation and cleanup.
- Page tests cover loading, actual loaded count, failed load/retry, unmount/late-result isolation, products, and a distinct empty state.
- Table test checks headings, three fixture rows, stock boundary labels, price without assumed currency, and edit callback.
- Red/Green evidence is in evidence/T04-*, T06-* and T07-*. Cancellation/cleanup cases already supported by safe request handling are labelled confirmation, not fabricated Red.
- Refactor: extracted requestJson for timeout/cancellation/HTTP cleanup. Derived data stays out of duplicated state.
- Browser layout and CORS are reserved for T25; CLI GET is not browser evidence.

M1 gate: 19 tests pass across three files; npm run build passes (18 modules); git diff --check passes. PR is created from the M1 branch after this gate; GitHub PR history records review, required CI, assignee, and merge outcome.

PR #2 runtime finding: required test-and-build passed, but the assignment workflow from main failed with HTTP 403. DevvMa is already assigned manually. Add pull-requests:write for the PR metadata operation; [GitHub API docs](https://docs.github.com/en/rest/issues/assignees#add-assignees-to-an-issue) list write permissions for this endpoint. Because pull_request_target uses the base workflow, the fix takes effect after merge and must be checked on the next PR. Do not claim the historical assignment run passed. Merge still requires the protected test-and-build check; no admin bypass.

## M2 search and editor

T09–T13 complete. Search/filter uses loaded data only; empty/reset and 0/9/10 boundaries verified. Selected editor survives filtering; switching resets draft; cancel does not mutate stock. Invalid input is rejected before save; zero and unchanged integers accepted. Saving is temporarily disabled on the page until M3 connects PATCH.

 Test Files  6 passed (6)
      Tests  39 passed (39)
   Duration  9.91s (environment 72%, setup 15%, tests 8%, import 4%, transform 1%)

Build passes (21 modules); git diff --check passes. Source and evidence are reviewed through the M2 PR.

## M3 saving stock

T14–T19 complete. Validated PATCH, pending controls, duplicate-save guard, failure/retry, filtered row removal, immutable update and unmount cancellation verified. Real PATCH id 1 changed returned stock 99→101; subsequent GET stayed 99, confirming simulated storage in this observation (evidence/T19-real-patch.json).

 Test Files  6 passed (6)
      Tests  54 passed (54)
   Duration  12.60s (environment 71%, setup 14%, tests 10%, import 4%, transform 1%)

Build passes; no blocking findings in agent self-review. M2 PR #3 confirmed automatic assignment job PASS after the permission fix; required test-and-build also PASS. Browser checks still require a working permitted browser tool.

## M4 quality and verification

T20–T24 complete. Responsive CSS implemented; focus, busy state, live result count, recovery and keyboard flow verified in jsdom. Three fresh-review findings fixed and rechecked as resolved in code. Static color-pair checks pass (M4-static-contrast.json); UI detector reported [] before the review fixes (no later style changes).

 Test Files  6 passed (6)
      Tests  63 passed (63)
   Duration  11.87s (environment 70%, setup 14%, tests 12%, import 3%)

Build passes (22 modules); HTTP app 200, real API origin header permits the local origin. T25 remains WAITING: internal-browser control failed twice at tool startup; alternative-browser consent pending. No browser/screenshot/screen-reader success claimed. See 13-BROWSER-CHECK.md. Demo/learning guide prepared for T28/T29.

## M5 handoff

T26 requirement audit complete in report 14. T27 setup/context docs and project rules updated. T28 three-minute guide prepared in report 12. T29 WAITING for owner answers and the small-change exercise; no mastery claim. T30 reports the actual incomplete external checks. T25 remains WAITING for a working permitted browser. All code PRs #2–#5 are merged; the final documentation PR follows the same assignment/CI/review/merge workflow.
