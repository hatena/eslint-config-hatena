'use strict';

const jsPlugin = require('@eslint/js');
const prettierConfig = require('eslint-config-prettier');
const importPlugin = require('eslint-plugin-import');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const globals = require('globals');
const tsEslint = require('typescript-eslint');
const rules = require('../rules/index.js');

/**
 * @typedef ConfigOptions
 * @property {boolean | string | string[] | undefined} [tsProject]
 * TypeScript の設定ファイル (languageOptions.parserOptions.project)
 * デフォルト: true (lint 対象のファイルに最も近い tsconfig.json を利用する)
 * @property {boolean | undefined} [react]
 * React を使用するか. true の場合, React に関連する設定を有効にする
 * デフォルト: false
 * @property {boolean | undefined} [prettier]
 * Prettier を使用するか. true の場合, eslint-config-prettier を使ってフォーマットに関するルールを無効化する
 * デフォルト: true
 */

/**
 * ESLint の設定を作る
 * @param {ConfigOptions} [options] オプション
 * @param {readonly import('eslint').Linter.FlatConfig[]} [configs] カスタム設定の配列
 * @returns {import('eslint').Linter.FlatConfig[]} 設定の配列
 */
function config(options, configs) {
  const tsProject = options?.tsProject ?? true;
  const react = options?.react ?? false;
  const prettier = options?.prettier ?? true;

  return [
    // # Linter 自体の設定
    {
      plugins: {
        '@typescript-eslint': /** @type {import('eslint').ESLint.Plugin} */ (tsEslint.plugin),
        'import': importPlugin,
        'react': reactPlugin,
        'react-hooks': reactHooksPlugin,
      },
    },
    // # 言語ごとの構文や実行環境などの設定
    {
      files: ['**/*.{js,jsx,cjs,mjs}', '**/*.{ts,tsx,cts,mts}'],
      languageOptions: {
        // ES2020 の構文がパースできるように。
        // NOTE: アプリケーションによってサポートされている ECMAScript のバージョンは違うので、
        // 本来であればアプリケーションで利用している Node.js のバージョンやサポートブラウザの
        // バージョンに合わせて上書きするべきするべき設定だが、いちいち上書きするのも面倒なので、
        // ひとまず一番最新のバージョンが利用可能であるとしておき、必要に応じてアプリケーションサイドで
        // 上書きしてもらう、という運用にする
        ecmaVersion: 2020,
        parserOptions: react ? { ecmaFeatures: { jsx: true } } : {},
        globals: {
          // `ecmaVersion` に揃えておく
          ...globals.es2020,
          ...(react ? globals.browser : {}),
        },
      },
      settings: {
        react: { version: 'detect' },
      },
    },
    {
      files: ['**/*.{js,jsx,mjs}'],
      languageOptions: {
        // 現代では type="script" な環境で JS を書くことはまずないので、
        // デフォルトで type="module" なJSであるとして lint する
        sourceType: 'module',
      },
    },
    {
      files: ['**/*.cjs'],
      languageOptions: {
        sourceType: 'commonjs',
      },
    },
    {
      files: ['**/*.{ts,tsx,cts,mts}'],
      languageOptions: {
        sourceType: 'module',
        parser: /** @type {import('eslint').Linter.FlatConfigParserModule} */ (tsEslint.parser),
        parserOptions: tsProject ? { project: tsProject } : {},
      },
      settings: {
        ...importPlugin.configs.typescript.settings,
      },
    },
    // # ルール設定
    ...map({ files: ['**/*.{js,jsx,cjs,mjs}', '**/*.{ts,tsx,cts,mts}'] }, [
      { rules: jsPlugin.configs.recommended.rules },
      { rules: importPlugin.configs.recommended.rules },
      { rules: rules.javascript },
      ...(react
        ? [
            { rules: reactPlugin.configs.recommended.rules },
            { rules: reactHooksPlugin.configs.recommended.rules },
            { rules: rules.react },
          ]
        : []),
    ]),
    ...map({ files: ['**/*.{ts,tsx,cts,mts}'] }, [
      // languageOptions なども含まれるが上で設定しているものと重複するので, ここでは rules のみに絞る
      ...tsEslint.configs.recommendedTypeChecked.flatMap((config) =>
        config.rules ? [{ rules: /** @type {import('eslint').Linter.RulesRecord} */ (config.rules) }] : [],
      ),
      { rules: importPlugin.configs.typescript.rules },
      { rules: rules.typescript },
      ...(react ? [{ rules: rules.typescriptReact }] : []),
    ]),
    // # カスタム設定
    ...(configs ?? []),
    // # フォーマットに関するルールを無効化
    ...(prettier ? [{ rules: prettierConfig.rules }] : []),
  ];
}

/**
 * @param {import('eslint').Linter.FlatConfig} base
 * @param {readonly import('eslint').Linter.FlatConfig[]} configs
 * @returns {import('eslint').Linter.FlatConfig[]}
 */
function map(base, configs) {
  return configs.map((config) => ({ ...base, ...config }));
}

module.exports = config;
