module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['flowtype'],
  parserOptions: {
    ecmaVersion: 2017,
  },
  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  rules: {
    'no-useless-catch': 0,
    eqeqeq: ['error', 'always'],
  },
};
