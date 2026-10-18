export type Lang = 'es' | 'en';

export interface ScopeExample {
  question: string;
  body: string;
  recommendation: string;
}

export interface GuideStep {
  title: string;
  label: string;
  time: string;
  where: string[];
  kind: string;
  text: string;
  see: string;
  failSymptom: string;
  failAction: string;
  scope?: ScopeExample;
}

export interface Tip {
  title: string;
  text: string;
}

export interface Copy {
  meta: { title: string; description: string; imageAlt: string };
  nav: { how: string; language: string };
  hero: {
    pill: string;
    title: string;
    titleAccent: string;
    lede: string;
    installLabel: string;
    cta: string;
  };
  agentDemo: {
    folder: string;
    ask: string;
    round: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    planApproved: string;
    ranIt: string;
    link: string;
  };
  demo: {
    eyebrow: string;
    title: string;
    subtitle: string;
    guideName: string;
    close: string;
    progress: string;
    stepWord: string;
    where: string;
    see: string;
    fail: string;
    next: string;
    finish: string;
    done: string;
    continue: string;
    hint: string;
    complete: string;
    back: string;
    steps: GuideStep[];
  };
  tips: { eyebrow: string; title: string; items: Tip[] };
  copy: { idle: string; done: string };
  footer: { inspired: string; license: string };
}
