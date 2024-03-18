import { ESLint, Linter } from 'eslint';

declare const classicConfig: {
  javascript: ESLint.ConfigData;
  prettier: ESLint.ConfigData;
  react: ESLint.ConfigData;
  typescript: ESLint.ConfigData;
};

type ConfigOptions = Readonly<
  Partial<{
    /**
     * TypeScript の設定ファイル (languageOptions.parserOptions.project)
     * デフォルト: ./tsconfig.json
     */
    tsProject: boolean | string | string[] | undefined;
    /**
     * React を使用するか. true の場合, React に関連する設定を有効にする
     * デフォルト: false
     */
    react: boolean | undefined;
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
declare function config(options?: ConfigOptions, configs?: readonly Linter.FlatConfig[]): Linter.FlatConfig[];

export { type ConfigOptions, classicConfig as __internal_classicConfig, config, config as default };
