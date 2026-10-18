# Changelog

## 0.2.0 — 2026-10-17

- Phone layout: a top bar with the guide name and progress opens a sheet with the steps, progress, reset and theme; **Done, next step** and **Back** stay fixed at the bottom; the legend folds into «How to read each step».
- Tap a screenshot to see it full screen.
- Fix: the Claude Artifact version showed stray `TYPE html>` text at the top.
- Skill instructions, after a full test run by an agent: steps done in windows (editor, save dialog), a *Code* label for text pasted into a file, Windows / Mac variants, a step 0 template, where the check question goes, how to review the guide without a browser, and Vercel when Claude has no Artifact tool.

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
