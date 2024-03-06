// @ts-check

/** @type import('eslint').Linter.BaseConfig */
module.exports = {
  root: true,
  extends: [
    // basic
    '@hatena/hatena',
    '@hatena/hatena/+prettier',
  ],
  env: {
    node: true,
  },
  rules: {
    'import/no-default-export': 0,
  },
};
