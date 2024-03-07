import type { Rules } from 'eslint-define-config';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export const rules: Partial<Rules> = {
  ...reactPlugin.configs.recommended.rules,
  ...reactHooksPlugin.configs.recommended.rules,

  // react
  // ========
  // コーディングスタイル統一のため、`<Component />` の形式で記述できる場合はそのように記述する
  'react/self-closing-comp': 2,
};
