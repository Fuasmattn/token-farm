/* eslint-disable camelcase */
// eslint-disable-next-line import/extensions
const tailwindConfig = require('./tailwind/tailwind.config.js');
const scss = require('./scss/global.scss');
const tokens = require('./js/global');

module.exports = {
  tailwindConfig,
  tokens,
  scss,
};
