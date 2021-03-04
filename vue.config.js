/**
 * Created by jiangx36
 */

'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

const name = defaultSettings.title || 'unisk-vue-mobile' // page title
const port = defaultSettings.port || 8080 // dev port

// // 导入compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')

// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css']

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  // 基本路径
  publicPath: '.',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development', // eslint-loader 是否在保存的时候检查
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  // css相关配置
  css: {
    // css sourceMap
    sourceMap: false,
    // 是否使用css分离插件 ExtractTextPlugin
    extract: false,
    loaderOptions: {
      // postcss: { // rem布局通过，对标设计稿尺寸将px转化为rem,需要不进行转换的px单位设置为大写PX
      //   plugins: [
      //     require('postcss-px2rem-exclude')({
      //       remUnit: 75, // 二倍图使用75 一倍图使用37.5
      //       exclude: /node_modules/
      //     })
      //   ]
      // },
      sass: { // 导入sass变量及mixin，全局调用
        prependData: `
          @import "@/assets/loader/_variables.scss";
          @import "@/assets/loader/_mixin.scss";
        `
      }
    }
  },
  // webpack-dev-server 相关配置
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // 配置代理用于本地跨域
    proxy: {
      // change xxx-api/login => mock/login
      // 相关细节配置参照文档: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        // target: `http://localhost:${port}/mock`,
        target: 'http://111.202.245.140:9180',
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: '/'
        }
      }
    }
    // 使用mock数据，无需使用需要注掉
    // after: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    devtool: 'source-map',
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  }
}
