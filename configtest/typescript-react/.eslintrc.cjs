'use strict';

module.exports = {
  root: true,
  extends: [
    '../../config/index.cjs',
    '../../config/+typescript.cjs',
    '../../config/+react.cjs',
    '../../config/+prettier.cjs',
  ],
  env: {
    node: true,
  },
};
