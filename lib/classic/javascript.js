import rules from '../rules/index.js';

/** @type {import('eslint').ESLint.ConfigData} */
const config = {
  plugins: ['import'],
  extends: ['eslint:recommended', 'plugin:import/recommended'],
  parserOptions: {
    // 現代では type="script" な環境で JS を書くことはまずないので、
    // デフォルトで type="module" なJSであるとして lint する
    sourceType: 'module',
    // ES2020 の構文がパースできるように。
    // NOTE: アプリケーションによってサポートされている ECMAScript のバージョンは違うので、
    // 本来であればアプリケーションで利用している Node.js のバージョンやサポートブラウザの
    // バージョンに合わせて上書きするべきするべき設定だが、いちいち上書きするのも面倒なので、
    // ひとまず一番最新のバージョンが利用可能であるとしておき、必要に応じてアプリケーションサイドで
    // 上書きしてもらう、という運用にする
    ecmaVersion: 2020,
  },
  env: {
    // `parserOptions.ecmaVersion` に揃えておく
    es2020: true,
  },
  rules: rules.javascript,
  overrides: [
    {
      files: ['*.cjs'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
};

export default config;
