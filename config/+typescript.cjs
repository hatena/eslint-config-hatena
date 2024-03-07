'use strict';

const { defineConfig } = require('eslint-define-config');
const importPlugin = require('eslint-plugin-import');
const { __internal__rules: rules } = require('../lib/index.cjs');

module.exports = defineConfig({
  overrides: [
    {
      // *.js などではこれらのルールが適用されないようにする
      files: ['*.ts', '*.tsx'],
      plugins: ['@typescript-eslint'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        // tsconfig.json の場所はプロジェクトによって異なるため、本来はプロジェクトに合わせて
        // 上書きするべきするべき設定だが、いちいち上書きするのも面倒なので、ひとまず
        // プロジェクトルートにある tsconfig.json を `parserOptions.project` にセットしてある。
        // プロジェクトに応じて適時上書きしてもらうことを想定している。
        project: './tsconfig.json',
      },
      settings: importPlugin.settings,
      rules: rules.typescript,
    },
  ],
});
