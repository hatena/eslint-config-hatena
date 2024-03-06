// @ts-check

/** @type import('eslint').Linter.BaseConfig */
module.exports = {
  root: true,
  extends: [
    // basic
    '@hatena/hatena-stable',
    '@hatena/hatena-stable/+prettier',
  ],
  env: {
    node: true,
  },
  rules: {
    'import/no-default-export': 0,
  },
};
