import { ParserOptions } from '@typescript-eslint/parser';
import { TSESLint } from '@typescript-eslint/utils';
import { ConfigWithExtends } from 'typescript-eslint';

type ConfigOptions = Readonly<
  Partial<{
    /**
     * TypeScript の設定ファイル (https://typescript-eslint.io/packages/parser#project).
     * デフォルト: true (lint 対象のファイルに最も近い tsconfig.json を利用する)
     */
    tsProject: ParserOptions['project'];
    /**
     * TypeScript のプロジェクトの設定 (https://typescript-eslint.io/packages/parser#projectservice).
     * デフォルト: false (無効)
     */
    tsProjectService: ParserOptions['projectService'];
    /**
     * tsconfig.json の探索先のルートディレクトリ (https://typescript-eslint.io/packages/parser#tsconfigrootdir).
     * デフォルト: undefined
     */
    tsconfigRootDir: ParserOptions['tsconfigRootDir'];
    /**
     * React を使用するか. true の場合, React に関連する設定を有効にする.
     * デフォルト: false
     */
    react: boolean | undefined;
    /**
     * true の場合, React に関する設定と eslint-config-next 相当の設定を有効にする.
     * `'strict'` を指定した場合, Core Web Vitals に関するルールを追加で有効にする.
     * デフォルト: false
     */
    next: boolean | 'strict' | undefined;
    /**
     * Prettier を使用するか. true の場合, eslint-config-prettier を使ってフォーマットに関するルールを無効化する.
     * デフォルト: true
     */
    prettier: boolean | undefined;
  }>
>;

type NextConfigOptions = Readonly<
  Partial<{
    /**
     * true の場合, Core Web Vitals に関するルールを追加で有効にする.
     * デフォルト: false
     */
    strict: boolean | undefined;
  }>
>;

declare const config: {
  /**
   * ESLint の設定を作る
   * @param options オプション
   * @param configs カスタム設定の配列
   * @returns 設定の配列
   */
  (options?: ConfigOptions, configs?: readonly ConfigWithExtends[]): TSESLint.FlatConfig.ConfigArray;
  /**
   * React を使用するプロジェクト向けの設定
   * @returns 設定の配列
   */
  react: () => TSESLint.FlatConfig.ConfigArray;
  /**
   * Next.js を使用するプロジェクト向けの設定. React 向けの設定も内包している.
   * @returns 設定の配列
   */
  next: (options?: NextConfigOptions) => TSESLint.FlatConfig.ConfigArray;
};

export { type ConfigOptions, type NextConfigOptions, config };
export default config;
