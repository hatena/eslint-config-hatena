'use strict';

const { defineConfig } = require('@eslint/config-helpers');
const jsPlugin = require('@eslint/js');
const prettierConfig = require('eslint-config-prettier');
const importPlugin = require('eslint-plugin-import');
const tsEslint = require('typescript-eslint');
const rules = require('../rules/index.js');
const nextConfig = require('./next.js');
const reactConfig = require('./react.js');

/**
 * @typedef ConfigOptions
 * @property {import('@typescript-eslint/parser').ParserOptions['project']} [tsProject]
 * TypeScript の設定ファイル (https://typescript-eslint.io/packages/parser#project).
 * デフォルト: true (lint 対象のファイルに最も近い tsconfig.json を利用する)
 * @property {import('@typescript-eslint/parser').ParserOptions['projectService']} [tsProjectService]
 * TypeScript のプロジェクトの設定 (https://typescript-eslint.io/packages/parser#projectservice).
 * デフォルト: false (無効)
 * @property {import('@typescript-eslint/parser').ParserOptions['tsconfigRootDir']} [tsconfigRootDir]
 * tsconfig.json の探索先のルートディレクトリ (https://typescript-eslint.io/packages/parser#tsconfigrootdir).
 * デフォルト: undefined
 * @property {boolean | undefined} [react]
 * true の場合, React に関連する設定を有効にする.
 * デフォルト: false
 * @property {boolean | 'strict' | undefined} [next]
 * true の場合, React に関する設定と eslint-config-next 相当の設定を有効にする.
 * `'strict'` を指定した場合, Core Web Vitals に関するルールを追加で有効にする.
 * デフォルト: false
 * @property {boolean | undefined} [prettier]
 * Prettier を使用するか. true の場合, eslint-config-prettier を使ってフォーマットに関するルールを無効化する.
 * デフォルト: true
 */

/**
 * ESLint の設定を作る
 * @param {ConfigOptions} [options] オプション
 * @param {import('@eslint/config-helpers').ConfigWithExtendsArray} configs カスタム設定の配列
 * @returns {import('eslint').Linter.Config[]} 設定の配列
 */
function config(options, ...configs) {
  const tsProject = options?.tsProject ?? true;
  const tsProjectService = options?.tsProjectService ?? false;
  const tsconfigRootDir = options?.tsconfigRootDir ?? undefined;
  const react = options?.react ?? false;
  const next = options?.next ?? false;
  const prettier = options?.prettier ?? true;

  return defineConfig(
    // # Linter やプラグインの設定
    {
      name: '@hatena/eslint-config-hatena/plugins',
      plugins: {
        'import': importPlugin,
        '@typescript-eslint': /** @type {import('eslint').ESLint.Plugin} */ (tsEslint.plugin),
      },
    },
    {
      name: '@hatena/eslint-config-hatena/settings',
      settings: {
        // 参考: https://github.com/import-js/eslint-plugin-import/blob/main/config/typescript.js
        'import/extensions': ['.js', '.jsx', '.cjs', '.mjs', '.ts', '.tsx', '.cts', '.mts'],
        'import/external-module-folders': ['node_modules', 'node_modules/@types'],
        'import/parsers': {
          [require.resolve('@typescript-eslint/parser')]: ['.ts', '.tsx', '.cts', '.mts'],
        },
        'import/resolver': {
          [require.resolve('eslint-import-resolver-node')]: {
            extensions: ['.js', '.jsx', '.cjs', '.mjs', '.ts', '.tsx', '.cts', '.mts'],
          },
          [require.resolve('eslint-import-resolver-typescript')]: {
            alwaysTryTypes: true,
          },
        },
      },
    },
    // # 言語ごとの構文や実行環境などの設定
    {
      name: '@hatena/eslint-config-hatena/language-options/all',
      files: ['**/*.{js,jsx,cjs,mjs}', '**/*.{ts,tsx,cts,mts}'],
      languageOptions: {
        ecmaVersion: 'latest',
      },
    },
    {
      name: '@hatena/eslint-config-hatena/language-options/js',
      files: ['**/*.{js,jsx,mjs}'],
      languageOptions: {
        // 現代では type="script" な環境で JS を書くことはまずないので、
        // デフォルトで type="module" なJSであるとして lint する
        sourceType: 'module',
      },
    },
    {
      name: '@hatena/eslint-config-hatena/language-options/cjs',
      files: ['**/*.cjs'],
      languageOptions: {
        sourceType: 'commonjs',
      },
    },
    {
      name: '@hatena/eslint-config-hatena/language-options/ts',
      files: ['**/*.{ts,tsx,cts,mts}'],
      languageOptions: {
        sourceType: 'module',
        parser: /** @type {import('eslint').Linter.Parser} */ (tsEslint.parser),
        parserOptions: {
          ...(tsProjectService ? { projectService: tsProjectService } : tsProject ? { project: tsProject } : {}),
          tsconfigRootDir,
        },
      },
    },
    {
      name: '@hatena/eslint-config-hatena/language-options/jsx',
      files: ['**/*.jsx', '**/*.tsx'],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: { jsx: true },
        },
      },
    },
    // # ルール設定
    {
      name: '@hatena/eslint-config-hatena/rules/all',
      files: ['**/*.{js,jsx,cjs,mjs}', '**/*.{ts,tsx,cts,mts}'],
      extends: [{ rules: jsPlugin.configs.recommended.rules }, { rules: importPlugin.configs.recommended.rules }],
      rules: rules.javascript,
    },
    {
      name: '@hatena/eslint-config-hatena/rules/ts',
      files: ['**/*.{ts,tsx,cts,mts}'],
      extends: [
        // recommendedTypeChecked には languageOptions なども含まれるが, 上で設定しているものと重複するのでここでは rules のみに絞る
        tsEslint.configs.recommendedTypeChecked.flatMap((config) => (config.rules ? [{ rules: config.rules }] : [])),
        { rules: importPlugin.configs.typescript.rules },
      ],
      rules: rules.typescript,
    },
    // # ライブラリ・フレームワーク向けの設定
    next ? nextConfig({ strict: next === 'strict' }) : react ? reactConfig() : [],
    // # カスタム設定
    configs,
    // # フォーマットに関するルールを無効化
    prettier
      ? [
          {
            name: '@hatena/eslint-config-hatena/rules/prettier',
            rules: prettierConfig.rules,
          },
        ]
      : [],
  );
}

config.react = reactConfig;
config.next = nextConfig;

module.exports = config;
