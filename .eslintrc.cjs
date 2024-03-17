// @ts-check

/** @type import('eslint').Linter.BaseConfig */
module.exports = {
  root: true,
  extends: ['@hatena/hatena-stable', '@hatena/hatena-stable/+typescript', '@hatena/hatena-stable/+prettier'],
  env: {
    node: true,
  },
  rules: {
    'import/no-default-export': 0,
    '@typescript-eslint/naming-convention': 0,
  },
};
