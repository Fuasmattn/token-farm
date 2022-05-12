// eslint-disable-next-line import/extensions
const mwuiTailwindCSSConfig = require('./dist/tailwind/tailwind.config.js');
const mwuiCSSVariables = require('./dist/tokens.css');
const mwuiSCSSVariables = require('./dist/tokens.scss');
const mwuiJSONVariables = require('./dist/tokens.json');
const mwuiJSVariables = require('./dist/tokens');

module.exports = {
  mwuiTailwindCSSConfig,
  mwuiCSSVariables,
  mwuiSCSSVariables,
  mwuiJSONVariables,
  mwuiJSVariables,
};
