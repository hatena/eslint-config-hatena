'use strict';

/** @type {import('eslint').Linter.RulesRecord} */
const rules = {
  // # react
  // コーディングスタイル統一のため、`<Component />` の形式で記述できる場合はそのように記述する
  'react/self-closing-comp': 2,
  // props の型検査には TypeScript を使う
  'react/prop-types': 0,
};

module.exports = rules;
