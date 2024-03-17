import type { ESLint } from 'eslint';

const config: ESLint.ConfigData = {
  plugins: ['react', 'react-hooks'],
  extends: [
    // react
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // react
    // コーディングスタイル統一のため、`<Component />` の形式で記述できる場合はそのように記述する
    'react/self-closing-comp': 2,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // TypeScript では propTypes は使わず TypeScript の型注釈を使えば良いので off にする
        'react/prop-types': 0,
      },
    },
  ],
};

export default config;
