#!/usr/bin/env python3
"""Build a guide: template + content.html + screenshots -> one self-contained HTML page, then review it.

Usage: python3 build.py <content.html> <shots_dir> <out.html> --title T [--eyebrow E] [--brand B]
                        [--lang es|en] [--accent #E1121B --accent-dark #FF4A52] [--levels "A,B,C"] [--scroll]

Writes <out.html>, <out.artifact.html> (no <html>/<head>/<body>, for Claude Artifacts)
and, when screenshots are missing, <out_dir>/pending-shots.md.
Exit code: 0 ok, 1 review errors, 2 only missing screenshots.
"""
import argparse, base64, html, json, pathlib, re, sys

LABELS = {
    "es": {
        "theme": "Tema", "system": "Sistema", "light": "Claro", "dark": "Oscuro",
        "progress": "Tu avance", "count": "{n} / {total}",
        "copy": "Copiar", "copied": "✓ Copiado",
        "next": "Listo, siguiente paso →", "finish": "Terminar ✓", "done": "✓ Hecho",
        "next_hint": "¿Ya lo ves en tu pantalla?", "back": "← Anterior", "continue": "Continuar →", "complete": "🎉 ¡Terminaste la guía!", "reset": "Reiniciar avance", "steps": "Pasos", "close": "Cerrar", "howto": "¿Cómo leer cada paso?",
        "quiz_check": "Comprobar", "quiz_right": "¡Exacto!", "quiz_wrong": "Casi. Puedes seguir igual.",
        "level": "Tu nivel", "level_note": "Solo cambian las explicaciones; los pasos son los mismos para todos.", "made": "Hecha con", "pending": "Captura pendiente",
    },
    "en": {
        "theme": "Theme", "system": "System", "light": "Light", "dark": "Dark",
        "progress": "Your progress", "count": "{n} / {total}",
        "copy": "Copy", "copied": "✓ Copied",
        "next": "Done, next step →", "finish": "Finish ✓", "done": "✓ Done",
        "next_hint": "Do you see it on your screen?", "back": "← Back", "continue": "Continue →", "complete": "🎉 You finished the guide!", "reset": "Reset progress", "steps": "Steps", "close": "Close", "howto": "How to read each step",
        "quiz_check": "Check", "quiz_right": "Exactly!", "quiz_wrong": "Almost. You can keep going.",
        "level": "Your level", "level_note": "Only the explanations change; the steps are the same for everyone.", "made": "Made with", "pending": "Screenshot pending",
    },
}

ap = argparse.ArgumentParser()
ap.add_argument("content"); ap.add_argument("shots"); ap.add_argument("out")
ap.add_argument("--title", required=True)
ap.add_argument("--eyebrow", default=None)
ap.add_argument("--brand", default=None)
ap.add_argument("--lang", default="es", choices=sorted(LABELS))
ap.add_argument("--accent", default="#E1121B")
ap.add_argument("--accent-dark", default="#FF4A52")
ap.add_argument("--levels", default=None)
ap.add_argument("--levels-label", default=None)
ap.add_argument("--scroll", action="store_true", help="show every step on one long page instead of one step at a time")
a = ap.parse_args()

L = LABELS[a.lang]
here = pathlib.Path(__file__).resolve().parent
tpl = (here.parent / "assets" / "template.html").read_text()
content = pathlib.Path(a.content).read_text()
out = pathlib.Path(a.out)

missing = []
def embed(m):
    name = m.group(1)
    for ext, mime in (("jpg", "image/jpeg"), ("jpeg", "image/jpeg"), ("png", "image/png"), ("webp", "image/webp")):
        p = pathlib.Path(a.shots) / f"{name}.{ext}"
        if p.exists():
            return f"data:{mime};base64," + base64.b64encode(p.read_bytes()).decode()
    missing.append(name)
    return f"pending:{name}"
content = re.sub(r"\{\{img:([^}]+)\}\}", embed, content)

def pending_figure(m):
    fig = m.group(0)
    name = re.search(r'src="pending:([^"]+)"', fig).group(1)
    alt = re.search(r'alt="([^"]*)"', fig)
    return f'<figure class="pending"><span>{L["pending"]} · {html.escape(name)}<br>{alt.group(1) if alt else ""}</span></figure>'
content = re.sub(r"<figure>(?:(?!</figure>).)*?src=\"pending:[^\"]+\"(?:(?!</figure>).)*?</figure>", pending_figure, content, flags=re.S)

errors, warnings = [], []
sections = list(re.finditer(r'<section\b[^>]*class="[^"]*\bpart\b[^"]*"[^>]*>', content))
bodies = []
for i, m in enumerate(sections):
    end = sections[i + 1].start() if i + 1 < len(sections) else len(content)
    bodies.append((m.group(0), content[m.end():end]))

ids = set(re.findall(r'\bid="([^"]+)"', content))
toc = []
for tag, body in bodies:
    sid = re.search(r'\bid="([^"]+)"', tag)
    label = re.search(r'data-toc="([^"]+)"', tag)
    num = re.search(r'data-num="([^"]*)"', tag)
    if not sid:
        errors.append('a <section class="part"> has no id'); continue
    if label:
        toc.append(f'      <li><a href="#{sid.group(1)}"><span class="n">{num.group(1) if num else "·"}</span><span>{label.group(1)}</span></a></li>')
    if num and num.group(1).isdigit():
        if 'class="see"' not in body:
            errors.append(f"step #{sid.group(1)} has no «You should see» block (.see)")
        if body.count('class="quiz"') > 1:
            warnings.append(f"step #{sid.group(1)} has more than one check question")
        if re.search(r"<p>[^<]{400,}</p>", body):
            warnings.append(f"step #{sid.group(1)} has a paragraph over 400 characters")

for href in re.findall(r'href="#([^"]+)"', content):
    if href not in ids:
        errors.append(f"internal link #{href} points to nothing")

for qm in re.finditer(r'(<div class="quiz"[^>]*>)(.*?)<!--/quiz-->', content, re.S):
    ans = re.search(r'data-answer="([^"]+)"', qm.group(1))
    opts = set(re.findall(r'data-opt="([^"]+)"', qm.group(2)))
    if not ans:
        errors.append("a check question has no data-answer")
    elif not set(x.strip() for x in ans.group(1).split(",")) <= opts:
        errors.append(f"check question answer «{ans.group(1)}» is not one of its options")
if content.count('class="quiz"') != content.count("<!--/quiz-->"):
    errors.append("every check question must end with <!--/quiz-->")

levels = [x.strip() for x in a.levels.split(",")] if a.levels else []
lv_used = set(re.findall(r'class="lv"[^>]*data-lv="([^"]+)"', content))
if lv_used and not levels:
    errors.append("content uses .lv blocks but --levels was not given")
for lv in lv_used:
    if levels and lv not in [str(i + 1) for i in range(len(levels))]:
        errors.append(f'.lv data-lv="{lv}" is not a level (use 1..{len(levels)})')
for grp in re.finditer(r'<div class="lvset">(.*?)</div><!--/lvset-->', content, re.S):
    have = set(re.findall(r'data-lv="([^"]+)"', grp.group(1)))
    want = {str(i + 1) for i in range(len(levels))}
    if want - have:
        errors.append(f"a level set is missing level(s) {', '.join(sorted(want - have))}")

if levels:
    label = html.escape(a.levels_label or L["level"])
    btns = "".join(f'<button type="button" data-level-set="{i + 1}">{html.escape(n)}</button>' for i, n in enumerate(levels))
    picker = f'<div class="pick"><span class="lbl">{label}</span><div class="row" role="group" aria-label="{label}">{btns}</div><span class="note">{L["level_note"]}</span></div>'
    if "<!--levels-->" in content:
        content = content.replace("<!--levels-->", picker, 1)
    else:
        first = content.find('<section class="part"')
        content = content[:first] + f'<div class="wrap" style="padding-bottom:40px">{picker}</div>\n' + content[first:] if first >= 0 else picker + content

page = tpl
for k, v in L.items():
    page = page.replace("{{L." + k + "}}", v)
slug = re.sub(r"[^a-z0-9]+", "-", out.stem.lower()).strip("-")
page = (page.replace("{{lang}}", a.lang)
            .replace("{{title}}", html.escape(a.title))
            .replace("{{eyebrow}}", html.escape(a.eyebrow or ""))
            .replace("{{brand}}", html.escape(a.brand or a.title))
            .replace("{{accent}}", a.accent)
            .replace("{{accent_dark}}", a.accent_dark)
            .replace("{{mode}}", "scroll" if a.scroll else "paged")
            .replace("{{L_json}}", json.dumps(L, ensure_ascii=False))
            .replace("{{storage_key}}", slug + "-v1")
            .replace("{{toc}}", "\n".join(toc))
            .replace("{{content}}", content))
left = sorted(set(re.findall(r"\{\{[^}]+\}\}", page)))
if left:
    errors.append("unfilled placeholders: " + ", ".join(left))

out.write_text(page)
head = page[page.find("<head>") + 6: page.find("</head>")]
head = re.sub(r"<meta[^>]*>\s*", "", head)
body_open = re.search(r"<body[^>]*>", page)
body = page[body_open.end(): page.rfind("</body>")]
body_attrs = body_open.group(0)[5:-1].strip()
if body_attrs:
    body = f"<script>document.body.setAttribute('data-mode', {json.dumps(re.search(r'data-mode=\"([^\"]*)\"', body_attrs).group(1))});</script>\n" + body
artifact = out.with_suffix(".artifact.html")
artifact.write_text(head.strip() + "\n" + body.strip() + "\n")

pending = out.parent / "pending-shots.md"
if missing:
    alts = {}
    for name in missing:
        m = re.search(r'\{\{img:' + re.escape(name) + r'\}\}[^>]*alt="([^"]*)"|alt="([^"]*)"[^>]*\{\{img:' + re.escape(name) + r'\}\}', pathlib.Path(a.content).read_text())
        alts[name] = (m.group(1) or m.group(2)) if m else ""
    pending.write_text("# Pending screenshots\n\nSave each one in the shots folder with this exact name, then build again.\n\n"
                       + "\n".join(f"- `{n}.jpg` — {alts[n]}" for n in missing) + "\n")
elif pending.exists():
    pending.unlink()

print(f"{out}  {out.stat().st_size // 1024} KB")
print(f"{artifact}")
for w in warnings: print("warning:", w)
for e in errors: print("ERROR:", e)
if missing: print(f"pending screenshots ({len(missing)}): {pending}")
sys.exit(1 if errors else 2 if missing else 0)
