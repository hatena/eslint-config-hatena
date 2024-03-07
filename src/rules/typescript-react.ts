import type { Rules } from 'eslint-define-config';

export const rules: Partial<Rules> = {
  // react
  // ========
  // TypeScript では propTypes は使わず TypeScript の型注釈を使えば良いので off にする
  'react/prop-types': 0,
};
