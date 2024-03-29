'use strict';

const rules = require('../rules/index.js');

/** @type {import('eslint').ESLint.ConfigData} */
const config = {
  plugins: ['import'],
  extends: ['eslint:recommended', 'plugin:import/recommended'],
  parserOptions: {
    // 現代では type="script" な環境で JS を書くことはまずないので、
    // デフォルトで type="module" なJSであるとして lint する
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  rules: rules.javascript,
  overrides: [
    {
      files: ['*.cjs'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
};

module.exports = config;
