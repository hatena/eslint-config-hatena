import rules from '../rules/index.js';

/** @type {import('eslint').ESLint.ConfigData} */
const config = {
  overrides: [
    {
      // *.js などではこれらのルールが適用されないようにする
      files: ['*.ts', '*.tsx'],
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended-type-checked', 'plugin:import/typescript'],
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
