'use strict';

const rules = require('../rules/index.js');

/** @type {import('eslint').ESLint.ConfigData} */
const config = {
  overrides: [
    {
      // *.js などではこれらのルールが適用されないようにする
      files: ['*.ts', '*.tsx'],
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended-type-checked', 'plugin:import/typescript'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        // lint 対象のファイルに最も近い tsconfig.json を利用する。tsserver の挙動と同じなのでトラブルも少ないはず。
        // ref: https://typescript-eslint.io/architecture/parser#project
        project: true,
      },
      rules: rules.typescript,
    },
  ],
};

module.exports = config;
