module.exports = {
  root: true,
  extends: ['universe/native'],
  plugins: ['prettier'],
  rules: {
    'import/order': 'off',
    'prettier/prettier': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
