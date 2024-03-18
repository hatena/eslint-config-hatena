import type { ESLint } from 'eslint';
import rules from '../rules';

const config: ESLint.ConfigData = {
  plugins: ['react', 'react-hooks'],
  extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
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
  rules: rules.react,
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: rules.typescriptReact,
    },
  ],
};

export default config;
