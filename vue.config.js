module.exports = {
  publicPath : process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir : 'dist',
  css: {
    extract: true,
    modules: false,
    loaderOptions: {
      sass: {
        prependData: `
          
        `
      }
    }
  },
  devServer: {
    port : 3000,
    https : false,
    disableHostCheck: true
  }
}