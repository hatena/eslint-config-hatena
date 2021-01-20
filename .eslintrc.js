// @ts-check

/** @type import('eslint').Linter.BaseConfig */
module.exports = {
  root: true,
  extends: [
    // basic
    './index.js',
    './+prettier.js',
  ],
  env: {
    node: true,
  },
};
