import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const airbnbStyle = {
  'arrow-body-style': ['error', 'as-needed'],
  'consistent-return': 'error',
  curly: ['error', 'multi-line'],
  'default-case': 'error',
  eqeqeq: ['error', 'always'],
  'no-else-return': 'error',
  'no-nested-ternary': 'error',
  'no-param-reassign': ['error', { props: false }],
  'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
  'no-shadow': 'off',
  '@typescript-eslint/no-shadow': 'error',
  'no-var': 'error',
  'object-shorthand': 'error',
  'prefer-arrow-callback': 'error',
  'prefer-const': 'error',
  'prefer-destructuring': ['error', { object: true, array: false }],
  'prefer-template': 'error',
  'max-lines': ['error', { max: 100, skipBlankLines: true, skipComments: true }],
};

export default [
  { ignores: ['dist/', '.astro/', 'node_modules/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    languageOptions: { globals: { ...globals.browser } },
    rules: airbnbStyle,
  },
];
