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
        "vee-validate": path.resolve("./node_modules/vee-validate"),
        "@vee-validate/i18n": path.resolve("./node_modules/@vee-validate/i18n"),
        "@vee-validate/rules": path.resolve(
          "./node_modules/@vee-validate/rules"
        ),
      },
    },
  },
};
