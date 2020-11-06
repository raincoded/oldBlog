const webpack = require('webpack');
const path = require('path')
module.exports = {
  outputDir:path.resolve(__dirname,'../server/public'),
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5008', //API服务器的地址
        ws: true, //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        // pathRewrite: { //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
        //   '/api': ''
        // },
      },
      '/json': {
        target: 'http://localhost:5008', //API服务器的地址
        ws: true, //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        // pathRewrite: { //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
        //   '/api': ''
        // },
      },
      '/upload': {
        target: 'http://localhost:5008', //API服务器的地址
        ws: true, //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        // pathRewrite: { //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
        //   '/api': ''
        // },
      }
    }
  }
}