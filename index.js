/* eslint-disable camelcase */
// eslint-disable-next-line import/extensions
const tailwindConfig = require('./dist/tailwind/tailwind.config.js');

const scss = require('./dist/scss/global.scss');

const tokens = require('./dist/js/global');

module.exports = {
  tailwindConfig,
  tokens,
  scss,
};
