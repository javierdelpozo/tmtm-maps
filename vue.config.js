module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/styles/main.scss";`
      }
    },
    modules: true
  },

  baseUrl: './',
  outputDir: 'docs/',
  assetsDir: 'assets',
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  lintOnSave: undefined
};