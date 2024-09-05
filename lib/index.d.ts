import { ParserOptions } from '@typescript-eslint/parser';
import { Config, ConfigWithExtends } from 'typescript-eslint';

type ConfigOptions = Readonly<
  Partial<{
    /**
     * TypeScript の設定ファイル (https://typescript-eslint.io/packages/parser#project)
     * デフォルト: true (lint 対象のファイルに最も近い tsconfig.json を利用する)
     */
    tsProject: ParserOptions['project'];
    /**
     * TypeScript のプロジェクトの設定 (https://typescript-eslint.io/packages/parser#projectservice)
     * デフォルト: false (無効)
     */
    tsProjectService: ParserOptions['projectService'];
    /**
     * tsconfig.json の探索先のルートディレクトリ (https://typescript-eslint.io/packages/parser#tsconfigrootdir)
     * デフォルト: undefined
     */
    tsconfigRootDir: ParserOptions['tsconfigRootDir'];
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
declare function config(options?: ConfigOptions, configs?: readonly ConfigWithExtends[]): Config[];

export { type ConfigOptions, config };
export default config;
