module.exports = {
  publicPath: '/',
  devServer: {
    proxy: {
      '/api' : {
        target: 'https://vue-study.skillbox.ru',
        changeOrigin: true,
        pathRewrite: {'^/api': '/api'},
      },
    }
  }
};