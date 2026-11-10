# Browser check status

Status: **DONE**, T25 verified on 10 November 2026 with the owner's approved separate Chrome DevTools test browser. T29 is deferred to a separate learning session at the owner's request.

## Verified facts

- The user allowed control of the internal browser for this project.
- Two attempts to create an internal-browser tab failed before page control became available. Tool error: windows sandbox failed: helper_unknown_error: setup refresh had errors. Resetting the browser-control session did not fix it.
- The owner approved a separate test browser on 10 November 2026. Checks used an isolated inventory-t25 context and only the project tab. Unrelated tabs were not inspected or changed.
- Actual screenshots, DOM geometry, keyboard interaction, and real browser GET/PATCH were observed. This is additional evidence beyond the earlier HTTP/origin-header checks.
- Viewports: 1365×900 desktop and 360×800 mobile/touch emulation. This does not certify physical mobile devices, other browser engines, or actual screen-reader speech.

## Observed checks

| Check | Actual result |
| --- | --- |
| Real load/CORS | GET returned 200 and rendered 50 rows; no console errors/warnings on normal load. StrictMode also produced an expected cancelled initial GET. |
| Search/filter/reset | Query ` DOLCE ` plus low-stock filter produced one row, Dolce Shine Eau de, stock 4. Reset restored 50 rows, empty query, unchecked filter. |
| Empty vs failure | Browser-injected empty JSON showed the API-empty state. Browser-injected GET 503 showed a retry message; allowing the next real request restored 50 rows. Loading DOM state was observed by a MutationObserver. These injected responses are labelled synthetic, not real API failures. |
| Validation | Real keyboard clearing, -1 and 1.5 produced inline validation, retained input, and focused stock input. The fill helper did not reliably clear the number field; that attempt was discarded and repeated with keyboard events. |
| Pending/double-click | A held PATCH counted one request after double-click. Input, save, cancel and edit were disabled; search remained enabled, aria-busy=true, table stock stayed 4. Releasing the actual request saved 12. |
| Save consistency | Real PATCH for product 9 returned success; editor closed, focus returned to search, success text remained, and the low-stock filtered row disappeared with 0 results. |
| Failed save/retry | One synthetic PATCH 503 showed retry guidance, draft 12 and old stock 4. A retry using the real API succeeded and removed the filtered row. |
| Reload | Reload removed the success message and restored stock 4 from the real API after local stock had been 12. |
| Keyboard/cancel | Focus entered stock; Tab reached save, cancel, then the table region. Cancel closed editor, preserved stock 4 and returned focus to search. ArrowLeft scrolled the mobile table from 402px to 362px. |
| Responsive/long names | Mobile document width equalled client width (360px). Editor bottom 819.55px preceded table top 843.55px; table scroll width 720px vs client width 318px. Long title cells had scrollWidth=clientWidth=242px and wrapped over 79px height. Desktop document/client width also matched at 1365px in the filtered editor state. |

## Browser-found fix and review

The table region received keyboard focus but its outer 3px outline with 3px offset was clipped by the parent overflow:hidden. The before screenshot shows no visible ring. Set `.table-scroll:focus-visible { outline-offset: -4px; }`; desktop and mobile recaptures show a continuous inset blue ring. This is a visual regression fix, not a fabricated jsdom styling test.

Screenshots: [desktop](evidence/T25-desktop-final.png), [mobile](evidence/T25-mobile-final.png), [before fix](evidence/T25-focus-before.png), [initial desktop list](evidence/T25-desktop-list.png).

A fresh visual reviewer inspected all four images and CSS. Verdict: the focus-ring defect is resolved; ship at the operational-prototype scope, with no material visual issue identified in the supplied captures. Functional browser checks were performed by the main agent, not independently repeated by that reviewer.

After the CSS fix, 63 tests and production build pass. Normal browser console remains free of errors/warnings. Static palette contrast evidence remains in M4-static-contrast.json.

Limits: Chromium and mobile emulation only; no physical-device, Safari/Firefox, actual screen-reader speech, or full WCAG certification. No deployment or permanent backend storage. React learning is deferred; owner understanding is not claimed.
