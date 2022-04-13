/* eslint-disable import/extensions */
import { readFile, writeFile } from 'fs/promises';
import tailwindConfig from '../dist/tailwind/tailwind.config.plain.js';

const tokens = JSON.parse(
  await readFile(new URL('../tokens/tokens.json', import.meta.url)),
);

const transformColors = () => Object.entries(tokens.colors).reduce((colors, [key, value]) => {
  const getColor = (v) => {
    const color = typeof v === 'object' ? v.value : v;
    if (!color) {
      return 'failed';
    }

    if (color.substr(0, 1) === '$') {
      const identifiers = color.split('.');
      identifiers.shift();
      return colors[identifiers[0]][identifiers[1]];
    }
    return color;
  };
  const colorValues = Object.entries(value).reduce((values, [k, v]) => {
    if (k === 'type') {
      return values;
    }
    const colorKey = k === 'value' ? 'DEFAULT' : k;

    return { ...values, [colorKey]: getColor(v) };
  }, {});

  return { ...colors, [key]: colorValues };
}, {});

const updatedTailwindConfig = {
  ...tailwindConfig,
  theme: {
    ...tailwindConfig.theme,
    extend: { ...tailwindConfig.theme.extend, colors: transformColors() },
  },
};

await writeFile(
  'dist/tailwind/tailwind.config.js',
  `module.exports=${JSON.stringify(updatedTailwindConfig, null, 2)}`,
  'utf-8',
);
