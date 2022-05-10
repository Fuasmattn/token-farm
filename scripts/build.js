/* eslint-disable no-console */
const StyleDictionaryPackage = require('style-dictionary');
const { createArray, isReference, getReferenceValue } = require('./utils');

StyleDictionaryPackage.registerFormat({
  name: 'css/variables',
  formatter(dictionary) {
    // resolve references for css variables
    const getValue = (prop) => (isReference(prop.value)
      ? getReferenceValue(dictionary.allProperties, prop.value)
      : prop.value);

    return `${this.selector} {\n${dictionary.allProperties.map((prop) => `  --${prop.name}: ${getValue(prop)};`).join('\n')}\n}`;
  },
});

StyleDictionaryPackage.registerFormat({
  name: 'scss/variables',
  formatter(dictionary) {
    // resolve references for scss variables
    const getValue = (prop) => (isReference(prop.value)
      ? getReferenceValue(dictionary.allProperties, prop.value)
      : prop.value);

    return `\n${dictionary.allProperties.map((prop) => `  $${prop.name}: ${getValue(prop)};`).join('\n')}\n`;
  },
});

StyleDictionaryPackage.registerTransform({
  name: 'sizes/px',
  type: 'value',
  matcher(prop) {
    // You can be more specific here if you only want 'em' units for font sizes
    return ['fontSizes', 'spacing', 'borderRadius', 'borderWidth', 'sizing'].includes(prop.attributes.category);
  },
  transformer(prop) {
    // You can also modify the value here if you want to convert pixels to ems
    return `${parseFloat(prop.original.value)}px`;
  },
});

function getStyleDictionaryConfig(theme) {
  return {
    source: [
      `input/${theme}.json`,
    ],
    format: {
      createArray,
    },
    platforms: {
      web: {
        transforms: ['attribute/cti', 'name/cti/kebab', 'sizes/px'],
        buildPath: 'dist/',
        files: [{
          destination: `${theme}.json`,
          format: 'createArray',
        }, {
          destination: `${theme}.css`,
          format: 'css/variables',
          selector: `.${theme}-theme`,
        },
        {
          destination: `${theme}.scss`,
          format: 'scss/variables',
        }],

      },
    },
  };
}
console.log('Build started...');

// currently only one build is provided, for one target platform (web)
['tokens'].forEach((theme) => {
  console.log('\n==============================================');
  console.log(`\nProcessing: [${theme}]`);

  const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(theme));
  StyleDictionary.buildPlatform('web');

  console.log('\nEnd processing');
});

console.log('\n==============================================');
console.log('\nBuild completed!');
