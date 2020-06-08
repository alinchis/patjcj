const backendApi = process.env.API_URL
  ? `http://${process.env.API_URL}`
  : "http://localhost:8081";

const photosApi = process.env.API_URL
  ? `http://${process.env.API_URL}`
  : "https://patjcj-staging.prforge.com";

module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  transpileDependencies: [
    'quasar'
  ],
  devServer: {
    proxy: {
      "^/api": {
        target: backendApi,
        ws: true,
        changeOrigin: true
      },
      '^/images': {
        target: photosApi,
        changeOrigin: true
      },
    },
  }
}
