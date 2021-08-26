const { useBabelRc, addBabelPlugin, override } = require('customize-cra');

module.exports = override(
  useBabelRc(),
  addBabelPlugin(['styled-jsx/babel', { plugins: ['styled-jsx-plugin-sass'] }])
);
