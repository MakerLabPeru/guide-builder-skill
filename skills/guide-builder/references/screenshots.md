# Screenshots

Every screenshot comes from actually running the step. Never draw a fake one.

## Choosing the tool (only after the author said yes to using a browser)

Try in this order and use the first that works:

1. **A browser the agent already controls** — for example the Claude in Chrome extension, or any browser tool your agent already has. It sees the author's real sessions, so it can capture dashboards where they are signed in.
2. **Playwright** — install the official browser connector for agents (`@playwright/mcp`) or the library in a temporary folder. Before installing, tell the author in one line what will be downloaded (a browser of about 150 MB) and wait for an OK. `scripts/shot.js` takes screenshots of pages that need no sign-in:

   ```sh
   URL=http://localhost:3000 node scripts/shot.js shots/03a-home.jpg '[{"click":"text=Start"},{"wait":500}]'
   ```

   It accepts `WIDTH`, `HEIGHT`, `FULL=1`, `DARK=1`, `STORAGE='{"key":"value"}'` and `CHROMIUM=/path` when the downloaded browser does not match the library version.
3. **The author** — when nothing above works, or the screen needs a sign-in, a captcha, a password, a 2FA code or a physical action. Stop at that point, tell the author exactly which screen they have in front of them and what to click, and continue when they say it is done.

If the author said no to using a browser, every screenshot goes to the pending list.

## Rules

- Name each file by step: `06d-neon-connect.jpg`. JPEG, quality about 82, 1280 px wide; aim for 30–90 KB.
- When a step has a typical failure (a deploy without variables, a captcha), cause it on purpose and capture it: that is the content of *If it fails*.
- Never show a secret in a screenshot. Capture screens where the service already hides it, and show secrets in the guide as `••••••••`.
- While you run the steps, mask secrets in your own output too: `sed -E 's#://([^:]+):[^@]+@#://\1:***@#'`.

## Pending screenshots

When a screenshot cannot be taken, keep `{{img:name}}` in `content.html` with an `alt` that says what it should show. `build.py` replaces it with a dashed «Screenshot pending» box and writes `pending-shots.md`. At the end, list them for the author: file name and one sentence of what to capture. When the author saves them in `shots/`, build again.
