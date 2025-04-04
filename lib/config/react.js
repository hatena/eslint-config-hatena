'use strict';

const { defineConfig } = require('@eslint/config-helpers');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const rules = require('../rules/index.js');

/**
 * React を使用するプロジェクト向けの設定
 * @returns {import('eslint').Linter.Config[]} 設定の配列
 */
function config() {
  const files = ['**/*.{js,jsx,cjs,mjs}', '**/*.{ts,tsx,cts,mts}'];

  return defineConfig(
    {
      name: '@hatena/eslint-config-hatena/react/plugins',
      files,
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
      files,
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
