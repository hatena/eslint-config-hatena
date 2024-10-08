'use strict';

const globals = require('globals');
const { config } = require('@hatena/eslint-config-hatena/flat');

module.exports = config({}, [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'import/no-default-export': 0,
    },
  },
]);
