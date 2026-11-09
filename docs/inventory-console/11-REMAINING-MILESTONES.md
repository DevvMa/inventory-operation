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
