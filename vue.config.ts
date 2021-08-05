const path = require("path");

module.exports = {
  pluginOptions: {
    i18n: {
      locale: "nl",
      fallbackLocale: "en",
      localeDir: "locales",
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true,
    },
  },
  configureWebpack: {
    resolve: {
      symlinks: false,
      alias: {
        vue: path.resolve("./node_modules/vue"),
      },
    },
  },
};
