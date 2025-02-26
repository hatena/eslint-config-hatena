'use strict';

const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const tsEslint = require('typescript-eslint');
const rules = require('../rules/index.js');

/**
 * React を使用するプロジェクト向けの設定
 * @returns {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray} 設定の配列
 */
function config() {
  // NOTE: files は extends によって一括で上書きされることもある
  const defaultFiles = ['**/*.{js,jsx,cjs,mjs}', '**/*.{ts,tsx,cts,mts}'];

  return tsEslint.config(
    {
      name: '@hatena/eslint-config-hatena/react/plugins',
      files: defaultFiles,
      plugins: {
        'react': reactPlugin,
        'react-hooks': reactHooksPlugin,
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
    {
      name: '@hatena/eslint-config-hatena/react/rules',
      files: defaultFiles,
      extends: [
        { rules: reactPlugin.configs.recommended.rules },
        { rules: reactPlugin.configs['jsx-runtime'].rules },
        { rules: reactHooksPlugin.configs.recommended.rules },
      ],
      rules: rules.react,
    },
  );
}

module.exports = config;
