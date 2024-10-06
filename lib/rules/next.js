'use strict';

// 参考: https://github.com/vercel/next.js/tree/canary/packages/eslint-config-next

/** @type {import('eslint').Linter.RulesRecord} */
const rules = {
  'import/no-anonymous-default-export': 'warn',
  'react/jsx-no-target-blank': 'off',
  'react/no-unknown-property': 'off',
  'react/prop-types': 'off',
  'react/react-in-jsx-scope': 'off',
  'jsx-a11y/alt-text': [
    'warn',
    {
      elements: ['img'],
      img: ['Image'],
    },
  ],
  'jsx-a11y/aria-props': 'warn',
  'jsx-a11y/aria-proptypes': 'warn',
  'jsx-a11y/aria-unsupported-elements': 'warn',
  'jsx-a11y/role-has-required-aria-props': 'warn',
  'jsx-a11y/role-supports-aria-props': 'warn',
};

module.exports = rules;
