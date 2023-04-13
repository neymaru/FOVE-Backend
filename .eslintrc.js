module.exports = {
  extends: ['airbnb-base'],
  rules: {
    'linebreak-style': 0,
    'no-console': 'off',
    'operator-linebreak': 'off',
    'consistent-return': 'off',
    'nonblock-statement-body-position': 'off',
    'import/no-extraneous-dependencies': 'off',
    curly: 'off',
    'max-len': ['error', { code: 140 }],
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  env: {
    es6: false,
  },
};
