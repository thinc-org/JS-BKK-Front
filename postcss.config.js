/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./**/*.tsx'],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

const cssnano = require('cssnano')({
  preset: 'default'
});

module.exports = {
  plugins: [
    require('tailwindcss')('./tailwind.config.js'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss, cssnano] : [])
  ]
};
