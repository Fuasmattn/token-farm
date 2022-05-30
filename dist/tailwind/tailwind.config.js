const { filterTokensByType } = require('../../src/scripts/utils');
const global = require('../json/global.json');
const light = require('../json/mw-theme.json');
const dark = require('../json/mw-theme_dark.json');

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
