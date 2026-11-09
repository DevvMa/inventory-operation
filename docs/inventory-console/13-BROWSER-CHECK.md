# Browser check status

Status: **WAITING**, T25 is not complete.

## Verified facts

- The user allowed control of the internal browser for this project.
- Two attempts to create an internal-browser tab failed before page control became available. Tool error: windows sandbox failed: helper_unknown_error: setup refresh had errors. Resetting the browser-control session did not fix it.
- No screenshot, browser interaction, visual layout, actual screen-reader, or real browser keyboard check has been observed.
- Local Vite HTTP returns 200. The real API returns 200 and Access-Control-Allow-Origin for http://127.0.0.1:5173. Those checks do not prove browser execution.
- Permission to use a separate test browser was requested and remains pending. No access to the user's personal browser was attempted.

## Checks to run when a permitted browser works

1. Load real products at desktop width. Check console/network, loading and error recovery.
2. Search, filter, reset; confirm counts and distinction between empty API vs empty search.
3. Open editor, verify focus, invalid input, cancel and focus return.
4. Save a valid value, verify table change and success announcement; verify controls lock while pending.
5. Simulate a failed request and recover without losing draft/data.
6. Reload and confirm simulated changes reset to API data.
7. Check desktop and 360px layout together; no page-wide overflow, table scroll usable, editor above table on small screens, focus ring visible.
8. Capture evidence and inspect contrast/long names. Record actual results, not expectations.

Automated DOM tests cover the interaction logic and keyboard focus; static CSS contrast checks pass. Neither substitutes for the browser checks above. Update this file and T25 only after actual browser evidence exists.
