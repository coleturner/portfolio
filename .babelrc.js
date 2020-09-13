module.exports = {
  env: {
    development: {
      presets: [
        'next/babel',
        [
          require.resolve('@emotion/babel-preset-css-prop'),
          {
            sourceMap: true,
            autoLabel: true,
          },
        ],
      ],
    },
    production: {
      presets: [
        'next/babel',
        [require.resolve('@emotion/babel-preset-css-prop')],
      ],
    },
  },
};
