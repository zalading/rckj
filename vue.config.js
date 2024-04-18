// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   lintOnSave:false
// })

// const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin"); //本地图片压缩
// 熟悉proxy 代理的用法
module.exports = {
  devServer: {
    proxy: 'http://192.168.1.116:8080'
    // proxy:'http://www.ranchenkj.com'
  },
  chainWebpack:config=>{
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        mozjpeg: {
          progressive: true,
          quality: 65
        },
        optipng: {
          enabled: false
        },
        pngquant: {
          quality: [0.65, 0.9],
          speed: 4
        },
        gifsicle: {
          interlaced: false
        },
        webp: {
          quality: 75
        }
      })
      .end()
  }
  // configureWebpack: (config) => {
  //   let optimization={//放置压缩的操作
  //     minimizer: [
  //       //1. css代码压缩（原生格式压缩为一行，注意：默认生产模式已经开启了html压缩、js压缩，不需要配置）
  //       // new CssMinimizerPlugin(), 
   
  //       // //2. js压缩
  //       // new TerserWebpackPlugin({
  //       //   parallel: threads, //开启多进程和设置进程数量
  //       // }),
   
  //       //3. 压缩图片
  //       new ImageMinimizerPlugin({
  //         minimizer: {
  //           implementation: ImageMinimizerPlugin.imageminGenerate,
  //           options: {
  //             plugins: [
  //               ["gifsicle", { interlaced: true }],
  //               ["jpegtran", { progressive: true }],
  //               ["optipng", { optimizationLevel: 5 }],
  //               [
  //                 "svgo",
  //                 {
  //                   plugins: [
  //                     "preset-default",
  //                     "prefixIds",
  //                     {
  //                       name: "sortAttrs",
  //                       params: {
  //                         xmlnsOrder: "alphabetical",
  //                       },
  //                     },
  //                   ],
  //                 },
  //               ],
  //             ],
  //           },
  //         },
  //       }),
  //     ],
  //   }
  //   Object.assign(config, {
  //     optimization
  //   })
  //  }
}

// 'use strict'
// const path = require('path')
// const defaultSettings = require('./src/settings.js')

// function resolve(dir) {
//   return path.join(__dirname, dir)
// }

// const name = defaultSettings.title || 'vue Admin Template' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
//const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
//module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  // publicPath: '/',
  // outputDir: 'dist',
  // assetsDir: 'static',
  // lintOnSave: process.env.NODE_ENV === 'development',
  // productionSourceMap: false,
  // devServer: {
  //   port: port,
  //   proxy: {
  //     '/api': {
  //       target: 'http://192.168.1.87:8080',  //我们要代理的地址
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': '',  //重写路径，去除URL中的/api
  //       },
  //     },
  //     open: true,
  //     overlay: {
  //       warnings: false,
  //       errors: true
  //     },
      // before: require('./mock/mock-server.js')
    // },
    // configureWebpack: {
      // provide the app's title in webpack's name field, so that
      // it can be accessed in index.html to inject the correct title.
      // name: name,
      // resolve: {
        // alias: {
          // '@': resolve('src')
        // }
      // }
    // }
    // chainWebpack(config) {
      // it can improve the speed of the first screen, it is recommended to turn on preload
      // config.plugin('preload').tap(() => [
      //   {
      //     rel: 'preload',
      //     // to ignore runtime.js
      //     // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
      //     fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
      //     include: 'initial'
      //   }
      // ])

      // when there are many pages, it will cause too many meaningless requests
      // config.plugins.delete('prefetch')

      // set svg-sprite-loader
      // config.module
      //   .rule('svg')
      //   .exclude.add(resolve('src/icons'))
      //   .end()
      // config.module
      //   .rule('icons')
      //   .test(/\.svg$/)
      //   .include.add(resolve('src/icons'))
      //   .end()
      //   .use('svg-sprite-loader')
      //   .loader('svg-sprite-loader')
      //   .options({
      //     symbolId: 'icon-[name]'
      //   })
      //   .end()

      // config
        // .when(process.env.NODE_ENV !== 'development',
        //   config => {
        //     config
        //       .plugin('ScriptExtHtmlWebpackPlugin')
        //       .after('html')
        //       .use('script-ext-html-webpack-plugin', [{
        //         // `runtime` must same as runtimeChunk name. default is `runtime`
        //         inline: /runtime\..*\.js$/
        //       }])
        //       .end()
        //     config
        //       // .optimization.splitChunks({
        //       //   chunks: 'all',
        //       //   cacheGroups: {
        //       //     libs: {
        //       //       name: 'chunk-libs',
        //       //       test: /[\\/]node_modules[\\/]/,
        //       //       priority: 10,
        //       //       chunks: 'initial' // only package third parties that are initially dependent
        //       //     },
        //       //     elementUI: {
        //       //       name: 'chunk-elementUI', // split elementUI into a single package
        //       //       priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
        //       //       test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
        //       //     },
        //       //     commons: {
        //       //       name: 'chunk-commons',
        //       //       test: resolve('src/components'), // can customize your rules
        //       //       minChunks: 3, //  minimum common number
        //       //       priority: 5,
        //       //       reuseExistingChunk: true
        //       //     }
        //       //   }
        //       // })
        //     // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
        //     config.optimization.runtimeChunk('single')
        //   }
        // )
    // }
  // }
// }