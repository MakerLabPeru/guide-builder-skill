# Blocks

`content.html` is made only of these blocks. `scripts/build.py` puts it inside `assets/template.html`, which already brings the sidebar, progress bar, theme switch, copy buttons, the **Done, next step** button at the end of every numbered step, one-step-at-a-time navigation with a **Back** button, and the confetti when the last step is done. Everything before the first `<section>` (cover, legend, level picker, rescue prompt) only shows together with the first step.

Write every visible label in the guide's language. Fixed labels:

| Block | es | en |
|---|---|---|
| where | Dónde estás | Where you are |
| prompt | Prompt | Prompt |
| command (typed in a terminal) | Comando | Command |
| code (pasted into a file) | Código | Code |
| agent output | Lo que te va a decir el agente | What your agent will say |
| see | ✓ Debes ver | ✓ You should see |
| fix | Si falla | If it fails |
| quiz | Comprueba · opcional | Check · optional |
| rescue | Si te trabas | If you get stuck |

## Cover and legend (once, at the top)

```html
<div class="wrap hero">
  <div class="eyebrow">[Community · Session]</div>
  <h1>[Short name]</h1>
  <p class="lede">[What they will achieve, in one sentence.]</p>
  <div class="chips"><span class="chip">~2 h</span><span class="chip">8 pasos</span><span class="chip on">[Free / What they need]</span></div>
</div>
<div class="wrap flow">
  <div class="notice">
    <p><span class="ttl">Cada paso tiene la misma forma.</span> Léelo entero antes de empezar.</p>
    <div class="legend">
      <div><b>Dónde estás</b><span>En qué ventana o lugar pasa.</span></div>
      <div><b>Haz esto</b><span>Una acción por línea, con foto.</span></div>
      <div><b>Prompt</b><span>Se copia con el botón.</span></div>
      <div><b>Debes ver</b><span>Cómo sabes que funcionó.</span></div>
      <div><b>Si falla</b><span>Lo primero que revisas.</span></div>
    </div>
  </div>
  <!-- only when the reader uses an AI agent; guides without an agent have no rescue block -->
  <div class="rescue">
    <p class="ttl">Si te trabas, pega esto en tu agente:</p>
    <div class="cmd"><div class="k">Prompt</div><pre>Estoy siguiendo una guía y me trabé en el paso [número]. Esto es lo que veo: [lo que ves]. Ayúdame a resolverlo sin saltarte pasos.</pre></div>
  </div>
</div>
```

Leave out the legend cell for **Prompt** when the guide has no prompts, and name it **Comando** when it only has commands.

## A step

One `<section>` per step. `data-num` is the number shown in the menu; only sections with a numeric `data-num` count for progress and get the **Done** button.

```html
<section class="part" id="p3" data-num="3" data-toc="[Short title]">
  <div class="wrap flow">
    <div class="part-hd"><span class="pnum">Paso 3</span><span class="ptime">10 min</span></div>
    <h2>[Verb + object]</h2>
    <div class="where"><b>Dónde estás</b><span>[localhost:3000]</span><span>[Tu agente]</span></div>
    <p class="intro">[One sentence: what happens and why.]</p>
    <ol class="steps">
      <li>
        <span class="stitle">[Verb + object]</span>
        <p>[One line. Exact button names in <strong>bold</strong>.]</p>
        <figure><img src="{{img:03a-short-name}}" alt="[what the screenshot shows]"><figcaption><b>[where]</b> · [what to look at]</figcaption></figure>
      </li>
      <li>
        <span class="stitle">Pega este prompt</span>
        <div class="cmd"><div class="k">Prompt</div><pre>[Exact text. [brackets] are what the reader fills in.]</pre></div>
        <div class="out"><div class="lbl">Lo que te va a decir el agente</div><pre>[Expected output, <b>the important part in bold</b>]</pre></div>
      </li>
    </ol>
    <div class="see"><div class="ck">✓ Debes ver</div><p>[What is on the screen, in one sentence.]</p></div>
    <details class="fix"><summary>Si falla</summary><div class="body">
      <p><strong>[Symptom]</strong> → [what to do, one line].</p>
    </div></details>
  </div>
</section>
```

- One `.see` per step, informative only: it says what the reader should see; the template adds the **Done** button at the end of the step.
- Order inside a step: actions (`ol.steps`) → `.see` → optional check question → `details.fix`.
- One prompt or command per `.cmd`; a command uses `<div class="k">Comando</div>`.
- Physical steps use the same block; the photo comes from the author.

## Optional pieces

**Step 0 · Before the session** (when readers need accounts, programs or materials ready beforehand). It is a normal numbered step and counts for progress:

```html
<section class="part" id="p0" data-num="0" data-toc="Antes del taller">
  <div class="wrap flow">
    <div class="part-hd"><span class="pnum">Paso 0</span><span class="ptime">en casa</span></div>
    <h2>Antes del taller</h2>
    <ol class="steps"><li><span class="stitle">[Create your account / Install …]</span><p>[One line.]</p></li></ol>
    <div class="see"><div class="ck">✓ Debes ver</div><p>[What is ready.]</p></div>
  </div>
</section>
```

**Check question** (at most one per step, only where something must be understood; never blocks; after `.see`). Single choice:

```html
<div class="quiz" data-answer="b">
  <div class="k">Comprueba · opcional</div>
  <p class="q">[Question?]</p>
  <div class="opts">
    <button type="button" class="opt" data-opt="a">[Option]</button>
    <button type="button" class="opt" data-opt="b">[Right option]</button>
    <button type="button" class="opt" data-opt="c">[Option]</button>
  </div>
  <p class="why">[Why it is right, one sentence.]</p>
</div><!--/quiz-->
```

Multiple choice: add `data-multi` and list every right option, `data-answer="a,c"`. The `<!--/quiz-->` marker is required.

**Levels** (only when the audience is mixed; build with `--levels "Name 1,Name 2,Name 3"` and optionally `--levels-label "Tu experiencia"`). The reader picks their level once, at the start of the guide: put `<!--levels-->` at the end of the cover, where the build places the picker (without the marker it goes right before the first step). Wrap every variant of the same thing in a level set; each set must have one block per level:

```html
<div class="lvset"><div class="lv" data-lv="1">[For level 1]</div><div class="lv" data-lv="2">[For level 2]</div><div class="lv" data-lv="3">[For level 3]</div></div><!--/lvset-->
```

Only explanations change by level; the actions that build the result are the same for everyone.

**Link to another step or guide:**

```html
<p class="tip">¿Primera vez con Vercel? Crea tu cuenta como en <a href="[guide URL]#p0" target="_blank" rel="noopener">[Guide] · Paso 0</a>.</p>
```

Internal links (`href="#p5"`) must point to an existing id; the build checks it.

**Why it is done this way** (next to a step that handles a secret): `<p class="tip"><strong>Por qué así.</strong> [One line.]</p>`

**Two screenshots side by side:** `<div class="pair"><figure>…</figure><figure>…</figure></div>`

**Challenges** (only when part of the workshop stays for home):

```html
<section class="part" id="retos" data-num="★" data-toc="Retos">
  <div class="wrap flow">
    <h2>Retos para casa</h2>
    <div class="cols two">
      <div class="card"><div class="k">Reto A</div><h3>[Goal]</h3><p>[One sentence.]</p>
        <!-- a .cmd with the starting prompt only when the reader uses an AI agent -->
        <div class="cmd"><div class="k">Prompt</div><pre>[Starting prompt]</pre></div>
        <div class="see"><div class="ck">✓ Debes ver</div><p>[Concrete result.]</p></div></div>
    </div>
  </div>
</section>
```

**Closing:**

```html
<section class="part" id="cierre" data-num="🏁" data-toc="Cierre">
  <div class="exit"><div class="wrap"><div class="flag">🏁</div><div><h3>[What they achieved]</h3><p>[One sentence.]</p></div></div></div>
</section>
```

**Unnumbered section** (warnings, notes): `data-num="!"`.

## Writing rules

- Every visible item (a paragraph, a list item, a caption) is a single sentence; if it needs more, split it into another item.
- Describe the audience by what they want to achieve, kindly.
- `[brackets]` mark what the reader fills in.
- No long paragraphs; the build warns about any paragraph over 400 characters.
