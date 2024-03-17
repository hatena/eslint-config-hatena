import type { ESLint, Linter } from 'eslint';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reacHookstPlugin from 'eslint-plugin-react-hooks';
import tsEslint from 'typescript-eslint';

export type ConfigOptions = Readonly<
  Partial<{
    /**
     * 拡張子 .js のファイル種別 (languageOptions.sourceType)
     * デフォルト: module
     */
    jsSourceType: 'script' | 'module' | 'commonjs' | undefined;
    /**
     * TypeScript の設定ファイル (languageOptions.parserOptions.project)
     * デフォルト: true (自動で tsconfig.json を読む)
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
  const tsProject = options?.tsProject ?? true;
  const prettier = options?.prettier ?? true;

  return [
    // プラグインを有効化
    {
      plugins: {
        '@typescript-eslint': tsEslint.plugin as ESLint.Plugin,
        'import': importPlugin,
        'react': reactPlugin,
        'react-hooks': reacHookstPlugin,
      },
    },
    // 言語設定
    {
      files: ['**/*.js'],
      languageOptions: {
        sourceType: jsSourceType,
      },
    },
    {
      files: ['**/*.cjs'],
      languageOptions: {
        sourceType: 'commonjs',
      },
    },
    {
      files: ['**/*.mjs', '**/*.{ts,tsx,cts,ctsx,mts,mtsx}'],
      languageOptions: {
        sourceType: 'module',
      },
    },
    {
      files: ['**/*.{ts,tsx,cts,ctsx,mts,mtsx}'],
      languageOptions: {
        parser: tsEslint.parser as Linter.FlatConfigParserModule,
        parserOptions: {
          ...(tsProject ? { project: tsProject } : {}),
        },
      },
    },
    // TODO: configs here
    // カスタム設定
    ...(configs ?? []),
    // フォーマットに関するルールを無効化
    ...(prettier ? [{ rules: prettierConfig.rules }] : []),
  ];
}
