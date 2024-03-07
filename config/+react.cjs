'use strict';

const { defineConfig } = require('eslint-define-config');
const { __internal__rules: rules } = require('../lib/index.cjs');

module.exports = defineConfig({
  plugins: ['react', 'react-hooks'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: rules.react,
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: rules.typescriptReact,
    },
  ],
});
