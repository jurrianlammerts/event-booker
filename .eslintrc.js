module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'prettier/react'
  ],
  plugins: ['prettier', 'flowtype'],
  parserOptions: {
    ecmaVersion: 2017
  },
  env: {
    es6: true,
    node: true,
    browser: true
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true
      }
    ],
    'no-useless-catch': 0,
    eqeqeq: ['error', 'always']
  }
};
