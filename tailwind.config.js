const { filterTokensByType } = require('./scripts/utils');
const tokens = require('./dist/light.json');

const colors = filterTokensByType('color', tokens);

module.exports = {
  darkMode: 'class',
  content: ['*.{html,js,jsx,ts,tsx,vue}'],
  theme: {
    colors,
  },
  variants: {},
  plugins: [],
};
