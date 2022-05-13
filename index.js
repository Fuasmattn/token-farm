/* eslint-disable camelcase */
// eslint-disable-next-line import/extensions
const mwuiTailwindCSSConfig = require('./dist/tailwind/tailwind.config.js');

// global
const css_global = require('./dist/global.css');
const scss_global = require('./dist/global.scss');
const json_global = require('./dist/global.json');

// mw-theme (light)
const css_light = require('./dist/mw-theme.css');
const scss_light = require('./dist/mw-theme.scss');
const json_light = require('./dist/mw-theme.json');

// mw-theme_dark
const css_dark = require('./dist/mw-theme_dark.css');
const scss_dark = require('./dist/mw-theme_dark.scss');
const json_dark = require('./dist/mw-theme_dark.json');

module.exports = {
  mwuiTailwindCSSConfig,
  global: {
    css: css_global,
    scss: scss_global,
    json: json_global,
  },
  light: {
    css: css_light,
    scss: scss_light,
    json: json_light,
  },
  dark: {
    css: css_dark,
    scss: scss_dark,
    json: json_dark,
  },
};
