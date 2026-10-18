import { en } from './en';
import { es } from './es';
import type { Copy, Lang } from './types';

const COPIES: Record<Lang, Copy> = { es, en };

export const getCopy = (lang: Lang): Copy => COPIES[lang];

export const AGENT_LABEL_TOKEN = '@agent';
export const AGENT_CALL_TOKEN = '@call';
