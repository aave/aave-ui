const { ESLINT_MODES } = require('@craco/craco');
const BabelRcPlugin = require('@jackwilsdon/craco-use-babelrc');

module.exports = {
  reactScriptsVersion: 'react-scripts',
  eslint: {
    mode: ESLINT_MODES.file,
  },
  webpack: {},
  plugins: [{ plugin: BabelRcPlugin }],
};
