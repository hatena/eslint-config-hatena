// @ts-check

/** @type import('eslint').Linter.BaseConfig */
module.exports = {
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
};
