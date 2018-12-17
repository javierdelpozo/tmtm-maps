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
  outputDir: 'dist',
  assetsDir: 'assets',
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  lintOnSave: undefined
};