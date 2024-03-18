'use strict';

const javascript = require('./javascript.js');
const { javascript: react, typescript: typescriptReact } = require('./react.js');
const typescript = require('./typescript.js');

const rules = {
  javascript,
  react,
  typescript,
  typescriptReact,
};

module.exports = rules;
