// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   lintOnSave:false
// })
// 熟悉proxy 代理的用法
module.exports = {
  devServer: {
    proxy: {
    //   '/api': {
    //     target: 'www.baidu.com', // 我们要代理的地址
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': '', // 重写路径，去除URL中的/api
    //     },
    //  }
    }
  }
}

