# Publish

The built guide is one self-contained HTML file: screenshots are embedded, nothing else to upload. Ask the author before publishing anything.

## Claude, when the Artifact tool is available

Publish `<name>.artifact.html` with the Artifact tool. If you are Claude but have no Artifact tool, use Vercel below. Tell the author the artifact is private until they share it from **Share**. To update, publish again to the same artifact so the link stays the same.

## Any other agent (Codex, OpenCode, …): Vercel

```sh
mkdir -p .publish/<name> && cp guides/<name>/<name>.html .publish/<name>/index.html
npx vercel deploy .publish/<name> --prod --yes
```

- The first time, `npx vercel` asks the author to sign in: tell them what will open and wait.
- The address it prints (`https://<name>.vercel.app` or similar) is the link to share. Open it and confirm it loads before telling the author.
- To update, run the same command from the same folder: the address stays the same.
- If the author prefers GitHub Pages and already uses git, the same `index.html` works there.

## After publishing

Tell the author, briefly:

- the link, and whether it is private or public;
- what changed from the approved plan;
- what was created in their accounts;
- what you left on their machine (signed-in CLIs, running servers, temporary folders);
- the pending screenshots, one sentence each, if any.
