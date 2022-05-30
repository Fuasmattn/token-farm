const { filterTokensByType } = require('./scripts/utils');
const tokens = require('./dist/json/global.json');

const colors = filterTokensByType('color', tokens);

module.exports = {
  darkMode: 'class',
  content: ['*.{html,js,jsx,ts,tsx,vue}'],
  theme: {
    colors,
    container: {
      center: true,
    },
  },
  variants: {},
  plugins: [],
};
