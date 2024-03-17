import type { ESLint } from 'eslint';
import rules from '../rules';

const config: ESLint.ConfigData = {
  overrides: [
    {
      // *.js などではこれらのルールが適用されないようにする
      files: ['*.ts', '*.tsx'],
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/typescript',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        // tsconfig.json の場所はプロジェクトによって異なるため、本来はプロジェクトに合わせて
        // 上書きするべきするべき設定だが、いちいち上書きするのも面倒なので、ひとまず
        // プロジェクトルートにある tsconfig.json を `parserOptions.project` にセットしてある。
        // プロジェクトに応じて適時上書きしてもらうことを想定している。
        project: './tsconfig.json',
      },
      rules: rules.typescript,
    },
  ],
};

export default config;
