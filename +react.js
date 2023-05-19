// @ts-check

/** @type import('eslint').Linter.BaseConfig */
module.exports = {
  extends: [
    // react
    'plugin:react/recommended',
    'plugin:react/jsx-runtime', // React 17 で追加された新しい JSX Transform を利用するための設定
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
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
