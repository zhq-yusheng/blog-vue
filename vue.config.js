module.exports = {
  lintOnSave: false,//关闭语法检测
  devServer: {
    port: 80,
    /* proxy: {
      '/api': {
        target: 'http://112.74.54.192:8080',
        ws: true, // 默认为true 支持websocket
        changeOrigin: true, // 默认为true 是否已真实地址个端口访问 true为欺骗服务器为通网段 ip 
        pathRewrite: {
          "^/api": ""
        } // 进行路径重写
      },

    } */
  }
}