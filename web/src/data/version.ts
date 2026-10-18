import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SKILL_FILE = resolve(process.cwd(), '../skills/guide-builder/SKILL.md');

const readSkillVersion = (): string => {
  const match = readFileSync(SKILL_FILE, 'utf8').match(/^\s*version:\s*"?([\d.]+)"?/m);
  if (!match) throw new Error(`No version found in ${SKILL_FILE}`);
  return match[1];
};

export const SKILL_VERSION = readSkillVersion();
