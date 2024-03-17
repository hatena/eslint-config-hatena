import jsPlugin from '@eslint/js';
import type { ESLint, Linter } from 'eslint';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reacHookstPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tsEslint from 'typescript-eslint';
import rules from '../rules';

export type ConfigOptions = Readonly<
  Partial<{
    /**
     * 拡張子 .js のファイル種別 (languageOptions.sourceType)
     * デフォルト: module
     */
    jsSourceType: 'script' | 'module' | 'commonjs' | undefined;
    /**
     * TypeScript の設定ファイル (languageOptions.parserOptions.project)
     * デフォルト: ./tsconfig.json
     */
    tsProject: boolean | string | string[] | undefined;
    /**
     * Prettier を使用するか. true の場合, eslint-config-prettier を使ってフォーマットに関するルールを無効化する
     * デフォルト: true
     */
    prettier: boolean | undefined;
  }>
>;

/**
 * ESLint の設定を作る
 * @param options オプション
 * @param configs カスタム設定の配列
 * @returns 設定の配列
 */
export function config(options: ConfigOptions, configs?: readonly Linter.FlatConfig[]): Linter.FlatConfig[] {
  const jsSourceType = options?.jsSourceType ?? 'module';
  const tsProject = options?.tsProject ?? './tsconfig.json';
  const prettier = options?.prettier ?? true;

  return [
    // # Linter 自体の設定
    {
      plugins: {
        '@typescript-eslint': tsEslint.plugin as ESLint.Plugin,
        'import': importPlugin,
        'react': reactPlugin,
        'react-hooks': reacHookstPlugin,
      },
    },
    // # 言語ごとの構文や実行環境などの設定
    {
      files: ['**/*.js'],
      languageOptions: {
        sourceType: jsSourceType,
      },
    },
    {
      files: ['**/*.jsx'],
      languageOptions: {
        sourceType: 'module',
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
    },
    {
      files: ['**/*.cjs'],
      languageOptions: {
        sourceType: 'commonjs',
      },
    },
    {
      files: ['**/*.mjs'],
      languageOptions: {
        sourceType: 'module',
      },
    },
    {
      files: ['**/*.{ts,tsx,cts,mts}'],
      languageOptions: {
        sourceType: 'module',
        parser: tsEslint.parser as Linter.FlatConfigParserModule,
        parserOptions: tsProject ? { project: tsProject } : {},
      },
      settings: {
        ...importPlugin.configs.typescript.settings,
      },
    },
    {
      files: ['**/*.{js,jsx,cjs,mjs}', '**/*.{ts,tsx,cts,mts}'],
      languageOptions: {
        ecmaVersion: 2020,
        globals: {
          ...globals.es2020,
        },
      },
    },
    // # ルール設定
    ...map({ files: ['**/*.{js,jsx,cjs,mjs}', '**/*.{ts,tsx,cts,mts}'] }, [
      { rules: jsPlugin.configs.recommended.rules },
      { rules: importPlugin.configs.recommended.rules },
      { rules: rules.javascript },
    ]),
    ...map({ files: ['**/*.{ts,tsx,cts,mts}'] }, [
      // languageOptions なども含まれるが上で設定しているものと重複するので, ここでは rules のみに絞る
      ...tsEslint.configs.recommendedTypeChecked.flatMap((config) =>
        config.rules ? [{ rules: config.rules as Linter.RulesRecord }] : [],
      ),
      { rules: importPlugin.configs.typescript.rules },
      { rules: rules.typescript },
    ]),
    // # カスタム設定
    ...(configs ?? []),
    // # フォーマットに関するルールを無効化
    ...(prettier ? [{ rules: prettierConfig.rules }] : []),
  ];
}

function map(base: Linter.FlatConfig, configs: readonly Linter.FlatConfig[]): Linter.FlatConfig[] {
  return configs.map((config) => ({ ...base, ...config }));
}
