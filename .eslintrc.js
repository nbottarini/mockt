module.exports = {
  root: true,
  extends: ['eslint:recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: {
    es6: true,
    jest: true,
  },
  globals: {
    module: false,
    require: false,
    console: true
  },
  rules: {
    'semi': ['error', 'never'],
    'curly': ['error', 'multi-line'],
    'object-curly-spacing': [ 'error', 'always' ],
    'dot-notation': 'off',
    'no-unused-vars': [
      'warn', {
        'vars': 'all',
        'args': 'none',
        'ignoreRestSiblings': false,
      }],
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/no-unused-vars': [
      'warn', {
        'vars': 'all',
        'args': 'none',
        'ignoreRestSiblings': false,
      }],
  },
}
