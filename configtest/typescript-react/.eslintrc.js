'use strict';

module.exports = {
  root: true,
  extends: [
    '../../config/index.js',
    '../../config/+typescript.js',
    '../../config/+react.js',
    '../../config/+prettier.js',
  ],
  env: {
    node: true,
  },
};
