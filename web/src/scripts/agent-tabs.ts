import { AGENTS } from '../data/agents';

const selectAgent = (agentId: string): void => {
  const agent = AGENTS.find(({ id }) => id === agentId);
  if (!agent) return;
  document.querySelectorAll<HTMLElement>('[data-agent-tab]').forEach((tab) => {
    tab.setAttribute('aria-selected', String(tab.dataset.agentTab === agentId));
  });
  document.querySelectorAll('[data-agent-label]').forEach((el) => {
    el.textContent = agent.label;
  });
  document.querySelectorAll('[data-agent-bin]').forEach((el) => {
    el.textContent = agent.bin;
  });
  document.querySelectorAll('[data-agent-call]').forEach((el) => {
    el.textContent = agent.call;
  });
};

export const setupAgentTabs = (): void => {
  document.querySelectorAll<HTMLElement>('[data-agent-tab]').forEach((tab) => {
    tab.addEventListener('click', () => selectAgent(tab.dataset.agentTab ?? ''));
  });
};
