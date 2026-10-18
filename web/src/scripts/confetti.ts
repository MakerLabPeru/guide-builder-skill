const COLORS = ['#2fa866', '#e1121b', '#f5b83d', '#3c8dde', '#ff7a80', '#1a1618'];
const PIECES = 40;
const LIFETIME_MS = 4000;

const createPiece = (index: number): HTMLElement => {
  const piece = document.createElement('i');
  const width = 6 + (index % 3) * 3;
  piece.className = 'absolute -top-4 block rounded-[2px]';
  piece.style.cssText = [
    `left: ${(index * 37) % 100}%`,
    `width: ${width}px`,
    `height: ${width * 1.6}px`,
    `background: ${COLORS[index % COLORS.length]}`,
    `--x: ${((index * 41) % 120) - 60}px`,
    `--r: ${360 + (index % 4) * 180}deg`,
    `animation: confetti-fall ${2.2 + ((index * 29) % 10) / 10}s ${((index * 53) % 90) / 100}s cubic-bezier(.2,.6,.4,1) forwards`,
  ].join(';');
  return piece;
};

export const launchConfetti = (container: HTMLElement): void => {
  const layer = document.createElement('div');
  layer.className = 'pointer-events-none absolute inset-0 z-10 overflow-hidden';
  layer.setAttribute('aria-hidden', 'true');
  for (let index = 0; index < PIECES; index += 1) layer.append(createPiece(index));
  container.append(layer);
  window.setTimeout(() => layer.remove(), LIFETIME_MS);
};
