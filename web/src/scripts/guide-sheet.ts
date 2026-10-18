const ANIMATION_MS = 300;

export interface GuideSheet {
  close: () => void;
}

export const setupGuideSheet = (root: HTMLElement): GuideSheet => {
  const sheet = root.querySelector<HTMLElement>('[data-sheet]');
  if (!sheet) return { close: () => undefined };

  const open = (): void => {
    sheet.hidden = false;
    requestAnimationFrame(() => {
      sheet.dataset.open = 'true';
    });
  };

  const close = (): void => {
    if (sheet.hidden) return;
    sheet.dataset.open = 'false';
    window.setTimeout(() => {
      sheet.hidden = true;
    }, ANIMATION_MS);
  };

  root.querySelector('[data-sheet-open]')?.addEventListener('click', open);
  sheet.querySelectorAll('[data-sheet-close]').forEach((el) => el.addEventListener('click', close));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });
  return { close };
};
