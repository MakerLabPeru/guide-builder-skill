export interface Agent {
  id: string;
  label: string;
  bin: string;
  call: string;
}

export const AGENTS: Agent[] = [
  { id: 'claude', label: 'Claude Code', bin: 'claude', call: '/guide-builder' },
  { id: 'codex', label: 'Codex', bin: 'codex', call: '$guide-builder' },
  { id: 'opencode', label: 'OpenCode', bin: 'opencode', call: '/guide-builder' },
];

export const INSTALL_COMMAND = 'npx skills add MakerLabPeru/guide-builder-skill';
export const REPO_URL = 'https://github.com/MakerLabPeru/guide-builder-skill';
export const MAKERLAB_URL = 'https://www.makerlabperu.org/';
export const GRILL_ME_URL =
  'https://github.com/mattpocock/skills/tree/main/skills/productivity/grill-me';
