import { launchConfetti } from './confetti';
import { setupGuideSheet } from './guide-sheet';

const all = <T extends HTMLElement>(root: HTMLElement, selector: string): T[] =>
  Array.from(root.querySelectorAll<T>(selector));

export const setupGuideDemo = (root: HTMLElement): void => {
  const steps = all(root, '[data-step]');
  const links = all(root, '[data-step-link]');
  const fills = all(root, '[data-progress-fill]');
  const counts = all(root, '[data-progress-count]');
  const hint = root.querySelector<HTMLElement>('[data-hint]');
  const next = root.querySelector<HTMLButtonElement>('[data-next]');
  const back = root.querySelector<HTMLButtonElement>('[data-back]');
  const scroller = root.querySelector<HTMLElement>('[data-steps-scroll]');
  if (!hint || !next || !back) return;
  const labels = root.dataset;
  const sheet = setupGuideSheet(root);
  const done = new Set<number>();
  const total = steps.length;
  let current = 0;

  const render = (): void => {
    const isLast = current === total - 1;
    const isDone = done.has(current);
    const allDone = done.size === total;
    steps.forEach((step, index) => {
      step.hidden = index !== current;
    });
    links.forEach((link) => {
      const index = Number(link.dataset.stepLink);
      link.dataset.state =
        (index === current && 'current') || (done.has(index) && 'done') || 'todo';
    });
    fills.forEach((fill) => {
      fill.style.width = `${(done.size / total) * 100}%`;
    });
    counts.forEach((count) => {
      count.textContent = `${done.size} / ${total}`;
    });
    hint.textContent = (allDone && labels.labelComplete) || (isDone ? '' : labels.labelHint) || '';
    hint.dataset.win = String(allDone);
    const doneLabel = isLast ? labels.labelDone : labels.labelContinue;
    const todoLabel = isLast ? labels.labelFinish : labels.labelNext;
    next.textContent = (isDone ? doneLabel : todoLabel) ?? '';
    next.disabled = isDone && isLast;
    back.hidden = current === 0;
  };

  const goTo = (index: number): void => {
    current = Math.max(0, Math.min(total - 1, index));
    sheet.close();
    render();
    scroller?.scrollTo({ top: 0 });
  };

  next.addEventListener('click', () => {
    if (done.has(current)) {
      goTo(current + 1);
      return;
    }
    done.add(current);
    if (done.size === total) {
      render();
      launchConfetti(root);
      return;
    }
    goTo(current + 1);
  });
  back.addEventListener('click', () => goTo(current - 1));
  links.forEach((link) =>
    link.addEventListener('click', () => goTo(Number(link.dataset.stepLink))),
  );
  render();
};
