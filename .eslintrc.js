// @ts-check

/** @type import('eslint').Linter.BaseConfig */
module.exports = {
  root: true,
  extends: [
    // basic
    './config/index.js',
    './config/+prettier.js',
  ],
  env: {
    node: true,
  },
};
