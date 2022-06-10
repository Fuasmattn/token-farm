const { filterTokensByType } = require('../../src/scripts/utils');
const global = require('../json/global.json');

const colors = { ...filterTokensByType('color', global) };

module.exports = {
  darkMode: 'class',
  content: ['*.{html,js,jsx,ts,tsx,vue}'],
  theme: {
    colors,
  },
  variants: {},
  plugins: [],
};
