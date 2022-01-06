const webpack = require('webpack');
const { ESLINT_MODES } = require('@craco/craco');
const BabelRcPlugin = require('@jackwilsdon/craco-use-babelrc');

module.exports = {
  reactScriptsVersion: 'react-scripts',
  eslint: {
    enable: false,
    mode: ESLINT_MODES.file,
  },
  webpack: {
    configure: {
      resolve: {
        fallback: {
          crypto: require.resolve('crypto-browserify'),
          process: require.resolve('process/browser'),
          stream: require.resolve('stream-browserify'),
          path: require.resolve('path-browserify'),
          os: require.resolve('os-browserify/browser'),
          http: require.resolve('stream-http'),
          https: require.resolve('https-browserify'),
          assert: require.resolve('assert'),
        },
      },
      plugins: [
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
        }),
      ],
    },
  },
  plugins: [{ plugin: BabelRcPlugin }],
};
