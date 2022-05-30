/* eslint-disable no-console */
const StyleDictionaryPackage = require('style-dictionary');
const { createArray } = require('./utils');

StyleDictionaryPackage.registerFormat({
  name: 'css/variables',
  formatter(dictionary) {
    const getValue = (prop) => prop.value;

    return `${this.selector} {\n${dictionary.allProperties
      .map((prop) => `  --${prop.name}: ${getValue(prop)};`)
      .join('\n')}\n}`;
  },
});

StyleDictionaryPackage.registerFormat({
  name: 'scss/variables',
  formatter(dictionary) {
    const getValue = (prop) => prop.value;

    return `\n${dictionary.allProperties
      .map((prop) => `  $${prop.name}: ${getValue(prop)};`)
      .join('\n')}\n`;
  },
});

StyleDictionaryPackage.registerTransform({
  name: 'sizes/px',
  type: 'value',
  matcher(prop) {
    // You can be more specific here if you only want 'em' units for font sizes
    return [
      'fontSizes',
      'spacing',
      'borderRadius',
      'borderWidth',
      'sizing',
    ].includes(prop.attributes.category);
  },
  transformer(prop) {
    // You can also modify the value here if you want to convert pixels to ems
    return `${parseFloat(prop.original.value)}px`;
  },
});

const baseTransforms = ['attribute/cti', 'size/px'];
const jsTransforms = baseTransforms.concat(['name/cti/camel']);
const scssTransforms = baseTransforms.concat(['name/cti/kebab']);

function getStyleDictionaryConfig(theme) {
  return {
    source: [`input/${theme}.json`],
    format: {
      createArray,
    },
    platforms: {
      css: {
        transforms: scssTransforms,
        buildPath: 'dist/css/',
        files: [
          {
            destination: `${theme}.css`,
            format: 'css/variables',
            selector: `.${theme}-theme`,
          },
        ],
      },
      json: {
        transforms: scssTransforms,
        buildPath: 'dist/json/',
        files: [
          {
            destination: `${theme}.json`,
            format: 'createArray',
          },
        ],
      },
      scss: {
        transforms: scssTransforms,
        buildPath: 'dist/scss/',
        files: [
          {
            destination: `${theme}.scss`,
            format: 'scss/variables',
          },
        ],
      },
      js: {
        transforms: jsTransforms,
        buildPath: 'dist/js/',
        files: [
          {
            destination: `${theme}.js`,
            format: 'javascript/es6',
          },
        ],
      },
    },
  };
}
console.log('Build started...');

['global', 'mw-theme', 'mw-theme_dark'].forEach((theme) => {
  console.log('\n==============================================');
  console.log(`\nProcessing: [${theme}]`);

  const StyleDictionary = StyleDictionaryPackage.extend(
    getStyleDictionaryConfig(theme),
  );
  StyleDictionary.buildPlatform('js');
  StyleDictionary.buildPlatform('json');
  StyleDictionary.buildPlatform('css');
  StyleDictionary.buildPlatform('scss');

  console.log('\nEnd processing');
});

console.log('\n==============================================');
console.log('\nBuild completed!');
