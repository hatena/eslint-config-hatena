'use strict';

const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  extends: [
    // basic
    '@hatena/hatena-stable',
    '@hatena/hatena-stable/+prettier',
  ],
  env: {
    node: true,
  },
  rules: {
    'import/no-default-export': 0,
  },
  overrides: [
    {
      files: ['*.cjs'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
});
