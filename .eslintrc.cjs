// @ts-check

'use strict';

/** @type import('eslint').ESLint.ConfigData */
module.exports = {
  root: true,
  extends: ['@hatena/hatena-stable', '@hatena/hatena-stable/+typescript', '@hatena/hatena-stable/+prettier'],
  env: {
    node: true,
  },
  rules: {
    'import/no-default-export': 0,
    'import/no-named-as-default-member': 0,
    '@typescript-eslint/naming-convention': 0,
  },
  overrides: [
    {
      files: ['*.cjs'],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: ['*.ts'],
      settings: {
        'import/resolver': {
          typescript: {},
        },
      },
    },
  ],
};
