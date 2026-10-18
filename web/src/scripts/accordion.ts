const setOpen = (item: HTMLElement, open: boolean): void => {
  item.dataset.open = String(open);
  item.querySelector('button')?.setAttribute('aria-expanded', String(open));
};

export const setupAccordion = (root: HTMLElement): void => {
  const items = Array.from(root.querySelectorAll<HTMLElement>('[data-accordion-item]'));
  items.forEach((item) => {
    item.querySelector('button')?.addEventListener('click', () => {
      const willOpen = item.dataset.open !== 'true';
      items.forEach((other) => setOpen(other, false));
      setOpen(item, willOpen);
    });
  });
};
