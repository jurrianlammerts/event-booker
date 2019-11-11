module.exports = {
  extends: ['eslint:recommended', 'prettier', 'prettier/react'],
  plugins: ['prettier', 'flowtype'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all'
      }
    ],
    eqeqeq: ['error', 'always']
  }
};
