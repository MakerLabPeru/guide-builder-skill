# Review: no dead ends

A dead end is a point where someone following the guide alone cannot continue. Review in two passes before publishing.

## 1. The build check

`scripts/build.py` fails (exit 1) when:

- a numbered step has no *You should see* block;
- an internal link (`#p5`) points to nothing;
- a check question has no answer, or its answer is not one of its options;
- `.lv` blocks are used without `--levels`, or a level set misses a level;
- a `{{placeholder}}` was left unfilled.

It warns about paragraphs over 400 characters and steps with more than one check question. Fix every error; fix warnings unless there is a reason.

## 2. Read it as the reader

Open the built page and walk it top to bottom as someone who only has what the previous steps gave them. For every step ask:

- **Does it need something no earlier step delivered?** An account, a file, an address, a program, a value. If so, add it to an earlier step or to step 0.
- **Is the window clear?** *Where you are* names the exact place.
- **Does every *If it fails* end in a concrete action?** «Check your configuration» is not an action; «Open `.env.local` and confirm the line `DATABASE_URL=` exists» is.
- **Can the reader tell it worked?** *You should see* describes what is on the screen, not «it works».
- **Is anything only in your head?** Terms, folder names or choices you made while running the steps that the guide never says.

Then look at the built guide once at 1400 px, at 1400 px in dark mode and at 400 px wide: nothing scrolls sideways, and copy buttons and the **Done** button are reachable. Use any browser tool you have (this is checking your own file, not taking screenshots of the author's accounts). If you have none, ask the author to open `<name>.html` on their computer and on their phone and tell you what looks wrong.

Write down what you changed in the «Final state» section of `PLAN.md`.
