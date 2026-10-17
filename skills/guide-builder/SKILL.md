---
name: guide-builder
description: Prepare a step-by-step guide that supports a workshop — define the scope with the author, run every step for real, take the screenshots, and publish a self-paced page with copy buttons, progress and a "Done, next step" button. Also updates a guide after a session. Use when someone wants to create, prepare or update a workshop guide, tutorial or step-by-step walkthrough, for tech or non-tech topics.
license: MIT
metadata:
  version: "0.1.0"
  opencode/slash: "true"
---

# Guide builder

You help an author (a teacher, a mentor, a volunteer) prepare a guide that people follow **on their own, at their own pace**, in class or at home. The guide supports the author's workshop; it never replaces it. Talk to the author in their language, and write the guide in that same language.

Two rules define every guide:

1. **Done for real before it is written.** You run every digital step; every screenshot comes from that run. A step nobody ran does not go in the guide. Physical steps are done by the author, with their photos.
2. **No paragraphs.** Every step has the same anatomy: *Where you are · Do this · Prompt or command · You should see · If it fails*, and every visible sentence fits in one sentence.

## Files

Keep everything for a guide in `guides/<name>/` inside the folder where you were called:

```
guides/<name>/
├── PLAN.md            decisions, steps, screenshots, final state
├── content.html       the guide body, built only from references/blocks.md
├── shots/             screenshots and photos
├── <name>.html        the built guide
└── pending-shots.md   screenshots still missing (written by the build)
```

Do the practice run (installing, creating the example project) in a temporary folder outside the author's project, and delete nothing of the author's.

If `guides/<name>/PLAN.md` already exists, follow `references/update.md` instead of the steps below.

## 1. Define the scope

Follow `references/scope-questions.md`: questions in rounds, each with your recommendation, skipping what the author already told you. End with a summary the author confirms.

## 2. Plan, and get approval

Write `guides/<name>/PLAN.md`:

- **Decisions** from the scope.
- **Accounts and sign-ins**: per service, whether an account is needed, when it is created (before the session), where the sign-in happens and in which step.
- **Secrets**: per service, who writes each secret and where (see the rule below).
- **Steps** with their anatomy, marking every screenshot and every prompt or command.
- **Screenshots**: numbered list of file name, what it shows, where it comes from.
- **What could change when running**: anything you are assuming.

Then show the author **a short summary in the chat**: one line per step, plus the screenshots and accounts it needs. Do not run anything until the author approves; `PLAN.md` stays as the detail for whoever wants it.

**Prompts:** if a platform publishes its own install prompt or command (a *Copy prompt* button, `npx tool init`), use that one. Write prompts only for the reader's own part.

**Secrets:** no key, password or connection string ever goes through an agent chat, because what is pasted there travels to the AI provider. Each secret goes *from the service to a file* (the reader pastes it into `.env.local`, which the agent prepares and opens) and *from the file to the dashboard* (the reader uploads it, for example with *Import .env*). Prompts that touch configuration say «without reading or showing `.env.local`». If an official CLI writes the keys by itself, prefer it. Next to the step that handles a secret, add a one-line *Why it is done this way*.

## 3. Run every step

Run the steps in the guide's order, in the temporary folder. What turns out different from the plan **changes the guide**, not the other way around. Take the screenshots as you go, following `references/screenshots.md`. Captchas, passwords, 2FA codes, account sign-ups and physical actions are the author's: stop, say exactly which screen they have in front of them and what to click, and continue when they say it is done.

Done when the final result works end to end and every planned screenshot exists or is on the pending list.

## 4. Write `content.html`

Only with the blocks in `references/blocks.md`:

- **Where you are**: the exact windows or places.
- **Do this**: one `<li>` per action, title = verb + object, exact button names in bold, the screenshot below with a caption that says what to look at.
- **Prompt or command**: the exact text in a `.cmd`; `[brackets]` are what the reader fills in. If the agent answers something the reader must read, show it in `.out`.
- **You should see**: one `.see` per step, describing what is on the screen. It is informative; the template adds the **Done, next step** button.
- **If it fails**: symptom → action, one line each, only failures you saw or the platform documents.
- **Check questions**, **levels** and **challenges** only as decided in the scope.
- In guides where the reader uses an AI agent, include the rescue prompt block at the top.

## 5. Build, review, publish

```sh
python3 <skill>/scripts/build.py guides/<name>/content.html guides/<name>/shots guides/<name>/<name>.html \
  --title "Name" --eyebrow "Community · Session" --lang es
```

The guide shows one step at a time: **Done, next step** fades the next one in and lights it up in the menu; the cover only shows with the first step. Add `--scroll` for one long page instead, `--accent "#hex" --accent-dark "#hex"` for the author's color, and `--levels "A,B,C"` for a mixed audience. Exit code 1 means review errors; 2 means only pending screenshots.

Review following `references/review.md` (the build check plus reading it as the reader), then publish following `references/publish.md`: a Claude Artifact when you are Claude, Vercel otherwise. Ask before publishing.

## 6. Close

Add a «Final state» section to `PLAN.md` with what changed while running. Tell the author: the link, what was different from the plan, what was created in their accounts, what you left on their machine, and the pending screenshots with one sentence each of what to capture.
