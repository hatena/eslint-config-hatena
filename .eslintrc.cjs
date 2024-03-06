// @ts-check

/** @type import('eslint').Linter.BaseConfig */
module.exports = {
  root: true,
  extends: [
    // basic
    './config/index.cjs',
    './config/+prettier.cjs',
  ],
  env: {
    node: true,
  },
  rules: {
    'import/no-default-export': 0,
  },
};
