'use strict';

const rules = require('../rules/index.js');

/** @type {import('eslint').ESLint.ConfigData} */
const config = {
  plugins: ['react', 'react-hooks'],
  extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
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
};

module.exports = config;
