const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  devServer: {
      port:8000,
      proxy: {
          '/api': {
              target: 'https://photo.sina.cn/aj/index',// 这里填写项目真实的后台接口地址
              changeOrigin: true,// 允许跨域，在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
              ws: false,// 开启webSocket
              pathRewrite: {
                '^/api': '',// 替换成target中的地址
              }
          }
      }
  }
}