module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: '\n          @import "@/assets/styles/main.scss";\n        '
      }
    },
    modules: true
  },

  baseUrl: undefined,
  outputDir: 'docs',
  assetsDir: 'assets',
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  lintOnSave: undefined
};