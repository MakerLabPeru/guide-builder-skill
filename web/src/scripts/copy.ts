const COPIED_MS = 1500;

const writeClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    document.body.append(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }
};

const handleCopy = async (button: HTMLElement): Promise<void> => {
  const target = document.querySelector(button.dataset.copyTarget ?? '');
  if (!target) return;
  await writeClipboard(target.textContent?.trim() ?? '');
  button.dataset.copied = 'true';
  window.setTimeout(() => delete button.dataset.copied, COPIED_MS);
};

export const setupCopyButtons = (): void => {
  document.querySelectorAll<HTMLElement>('[data-copy-target]').forEach((button) => {
    if (button.dataset.copyReady) return;
    button.dataset.copyReady = 'true';
    button.addEventListener('click', () => handleCopy(button));
  });
};
