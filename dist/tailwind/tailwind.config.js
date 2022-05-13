const { filterTokensByType } = require('../../scripts/utils');
const global = require('../global.json');
const light = require('../mw-theme.json');
const dark = require('../mw-theme_dark.json');

const colors = { ...filterTokensByType('color', global), ...filterTokensByType('color', light), ...filterTokensByType('color', dark) };

module.exports = {
  darkMode: 'class',
  content: ['*.{html,js,jsx,ts,tsx,vue}'],
  theme: {
    colors,
  },
  variants: {},
  plugins: [],
};
