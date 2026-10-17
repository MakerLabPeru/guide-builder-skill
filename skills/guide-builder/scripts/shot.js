// Usage: URL=http://localhost:3000 node shot.js out.jpg '[{"fill":["input","text"]},{"click":"button"},{"wait":500}]'
// Env: WIDTH/HEIGHT (default 1280x800), FULL=1 for the whole page, DARK=1 for dark mode,
//      STORAGE='{"key":"value"}' to seed localStorage once before the first load,
//      CHROMIUM=/path/to/chrome when the installed Playwright browser does not match the library.
const { chromium } = require('playwright');

(async () => {
  const [, , out, actionsJson] = process.argv;
  const actions = actionsJson ? JSON.parse(actionsJson) : [];
  const browser = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
  const context = await browser.newContext({
    viewport: { width: +(process.env.WIDTH || 1280), height: +(process.env.HEIGHT || 800) },
    colorScheme: process.env.DARK ? 'dark' : 'light',
    reducedMotion: 'reduce',
  });
  if (process.env.STORAGE) {
    await context.addInitScript((seed) => {
      if (sessionStorage.getItem('__seeded')) return;
      for (const [k, v] of Object.entries(JSON.parse(seed))) localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v));
      sessionStorage.setItem('__seeded', '1');
    }, process.env.STORAGE);
  }
  const page = await context.newPage();
  await page.goto(process.env.URL || 'http://localhost:3000', { waitUntil: 'networkidle' });
  for (const a of actions) {
    if (a.goto) await page.goto(a.goto, { waitUntil: 'networkidle' });
    if (a.fill) await page.fill(a.fill[0], a.fill[1]);
    if (a.click) await page.click(a.click);
    if (a.press) await page.keyboard.press(a.press);
    if (a.wait) await page.waitForTimeout(a.wait);
    if (a.reload) await page.reload({ waitUntil: 'networkidle' });
  }
  const jpeg = /\.jpe?g$/i.test(out);
  await page.screenshot({ path: out, fullPage: !!process.env.FULL, ...(jpeg ? { type: 'jpeg', quality: 82 } : {}) });
  await browser.close();
})();
