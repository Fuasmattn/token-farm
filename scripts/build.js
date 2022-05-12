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

StyleDictionaryPackage.registerFormat({
  name: 'es6/variables',
  formatter(dictionary) {
    const tokens = dictionary.allTokens.map((token) => {
      let value = JSON.stringify(token.value);
      const getValue = (v) => (isReference(v)
        ? getReferenceValue(dictionary.allProperties, v)
        : v);

      value = getValue(value);
      // the `dictionary` object now has `usesReference()` and
      // `getReferences()` methods. `usesReference()` will return true if
      // the value has a reference in it. `getReferences()` will return
      // an array of references to the whole tokens so that you can access their
      // names or any other attributes.
      if (dictionary.usesReference(token.original.value)) {
        // Note: make sure to use `token.original.value` because
        // `token.value` is already resolved at this point.
        const refs = dictionary.getReferences(token.original.value);
        refs.forEach((ref) => {
          value = value.replace(ref.value, () => `${ref.name}`);
        });
      }
      value = value.replaceAll('"', '\'');
      return `  '${token.name}': ${value},`;
    }).join('\n');

    return `export default {\n${tokens}\n};`;
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
        },
        {
          destination: `${theme}.js`,
          format: 'es6/variables',
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
