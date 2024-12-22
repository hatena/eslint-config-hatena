'use strict';

const nextPlugin = require('@next/eslint-plugin-next');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
const tsEslint = require('typescript-eslint');
const rules = require('../rules/index.js');
const reactConfig = require('./react.js');

/**
 * @typedef ConfigOptions
 * @property {boolean | undefined} [strict]
 * true の場合, Core Web Vitals に関するルールを追加で有効にする.
 * デフォルト: false
 */

/**
 * Next.js を使用するプロジェクト向けの設定. React 向けの設定も内包している.
 * @param {ConfigOptions} [options] オプション
 * @returns {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray} 設定の配列
 */
function config(options) {
  const strict = options?.strict ?? false;

  const files = ['**/*.{js,jsx,cjs,mjs}', '**/*.{ts,tsx,cts,mts}'];

  return tsEslint.config(
    {
      name: '@hatena/eslint-config-hatena/next/react',
      files,
      extends: reactConfig(),
    },
    {
      name: '@hatena/eslint-config-hatena/next/plugins',
      files,
      plugins: {
        '@next/next': nextPlugin,
        'jsx-a11y': jsxA11yPlugin,
      },
    },
    {
      name: '@hatena/eslint-config-hatena/next/rules',
      files,
      extends: [
        {
          rules: {
            ...nextPlugin.configs.recommended.rules,
            ...(strict ? nextPlugin.configs['core-web-vitals'].rules : {}),
          },
        },
      ],
      rules: rules.next,
    },
  );
}

module.exports = config;
