'use strict';

const { config } = require('@hatena/eslint-config-hatena-stable/flat');
const globals = require('globals');

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
