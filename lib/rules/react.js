'use strict';

/** @type {import('eslint').Linter.RulesRecord} */
const javascript = {
  // # react
  // コーディングスタイル統一のため、`<Component />` の形式で記述できる場合はそのように記述する
  'react/self-closing-comp': 2,
};

/** @type {import('eslint').Linter.RulesRecord} */
const typescript = {
  // # react
  // TypeScript では propTypes は使わず TypeScript の型注釈を使えば良いので off にする
  'react/prop-types': 0,
};

module.exports = {
  javascript,
  typescript,
};
