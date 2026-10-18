import { enSteps } from './en-steps';
import type { Copy } from './types';

export const en: Copy = {
  meta: {
    title: 'guide-builder · A step-by-step guide to support your workshop',
    description:
      'An AI agent skill that helps you prepare and test a step-by-step guide for your workshop.',
    imageAlt: 'guide-builder: a step-by-step guide to support your workshop.',
  },
  nav: { how: 'How to use it', language: 'Language' },
  hero: {
    pill: 'MakerLab Peru',
    title: 'A step-by-step\nguide to\n',
    titleAccent: 'support\nyour workshop.',
    lede: 'Your agent helps you prepare it and test it before you share it.',
    installLabel: 'Install it in your terminal',
    cta: 'See how a guide comes together ↓',
  },
  agentDemo: {
    folder: '~/my-workshop',
    ask: 'a guide to publish a website',
    round: 'Let’s define the scope · round 1',
    q1: 'Who reads it?',
    a1: 'beginners, at home',
    q2: 'Can I use a browser to capture what we build?',
    a2: 'yes',
    planApproved: 'Plan approved · 5 steps',
    ranIt: 'Ran it · 9 screenshots',
    link: 'my-guide.vercel.app',
  },
  demo: {
    eyebrow: 'How to use it',
    title: 'How you prepare your workshop guide',
    subtitle: 'This very guide was made with the skill.',
    guideName: 'Using guide-builder',
    close: 'Close',
    progress: 'Your progress',
    stepWord: 'Step',
    where: 'Where you are',
    see: 'You should see',
    fail: 'If it fails',
    next: 'Done, next step →',
    finish: 'Finish ✓',
    done: '✓ Done',
    continue: 'Continue →',
    hint: 'Do you see it on your screen?',
    complete: '🎉 You finished the guide!',
    back: 'Back',
    steps: enSteps,
  },
  tips: {
    eyebrow: 'Get more out of it',
    title: 'Tips for a better guide',
    items: [
      {
        title: 'Ask your group first',
        text: 'Share a short, anonymous survey with your agent about what your group knows and wants to achieve.',
      },
      {
        title: 'Give it your material',
        text: 'With your slides or notes, the guide follows your order and your words.',
      },
      {
        title: 'Test it with someone',
        text: 'Ask someone to follow it alone before the workshop and clarify wherever they get stuck.',
      },
      {
        title: 'Improve it afterwards',
        text: 'Tell the agent your group’s questions and it will update the guide at the same link.',
      },
      {
        title: 'Let your agent use a browser',
        text: 'Ask it and it will install what it needs to take the screenshots itself.',
      },
      {
        title: 'Use your colors',
        text: 'Tell your agent your palette or logo and the guide will use them instead of red and black.',
      },
    ],
  },
  copy: { idle: 'Copy', done: 'Copied' },
  footer: { inspired: 'Inspired by', license: 'MIT license' },
};
