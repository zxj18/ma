module.exports = {
  css: {
    loaderOptions: {
      css: {
        // options here will be passed to css-loader
      },
      postcss: {
        // options here will be passed to postcss-loader
        plugins: [require('postcss-px2rem')({
          remUnit: 75,
        })],
      },
    },
  },
  configureWebpack: (config) => {
    config.module.rules.push({
      test: /\.(js|vue)$/,
      loader: 'language-tw-loader',
    });
  },
};
