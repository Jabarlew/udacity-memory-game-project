'use strict';

module.exports = {
  extends: 'airbnb-base',
  plugins: ['import'],
  parserOptions: {
    sourceType: 'script',
  },
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    strict: ['error', 'function'],
  },
};
