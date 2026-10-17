# Changelog

## 0.1.0 — 2026-10-17

First version.

- Scope questions in rounds, each with a recommendation, before planning.
- Plan approved from a short summary in the chat; every step is run for real before it is written.
- Screenshots with a browser the agent controls or Playwright; missing ones become a pending list.
- Guide template: one step at a time with transitions, **Done, next step** button, green progress bar, confetti at the end, optional check questions and levels, Spanish and English labels, custom accent color.
- `build.py` reviews the guide for dead ends before publishing.
- Publishes as a Claude Artifact, or on Vercel from any other agent.
- Update mode for an existing guide.

Known gap: the mobile layout of the guide is still being designed.
