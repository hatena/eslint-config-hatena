import type { Linter } from 'eslint';

const rules: Linter.RulesRecord = {
  // # react
  // コーディングスタイル統一のため、`<Component />` の形式で記述できる場合はそのように記述する
  'react/self-closing-comp': 2,
};

const typescript: Linter.RulesRecord = {
  // # react
  // TypeScript では propTypes は使わず TypeScript の型注釈を使えば良いので off にする
  'react/prop-types': 0,
};

export default rules;
export { typescript };
