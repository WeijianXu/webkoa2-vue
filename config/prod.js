/**
 * 开发环境Webpack配置
 */
const baseConfig = require('./base');
const path = require('path');
const webpack = require('webpack');
// 额外处理所需组件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const options = {
  output: {
    path: baseConfig.dir.publicPath,
    publicPath: '/',
    filename: 'scripts/[name].[chunkhash:5].bundle.js' // 文件输出
  },
  plugins: [
    // 公共文件输出
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'scripts/[name].[chunkhash:5].bundle.js'
    }),
    new HtmlWebpackPlugin({
      template: path.join(baseConfig.dir.sourcePath, './views/common/pages/layout.html'),
      filename: '../views/common/pages/layout.html',
      inject: false,
      minify: {
        removeCommets: true,
        collapseWhitespace: true
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(baseConfig.dir.sourcePath, './views/error/pages/404.html'),
      filename: '../views/error/pages/404.html',
      minify: {
        removeCommets: true,
        collapseWhitespace: true
      },
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: path.join(baseConfig.dir.sourcePath, './views/error/pages/500.html'),
      filename: '../views/error/pages/500.html',
      minify: {
        removeCommets: true,
        collapseWhitespace: true
      },
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: path.join(baseConfig.dir.sourcePath, './views/index/pages/index.js'),
      filename: '../views/index/pages/index.html',
      minify: {
        removeCommets: true,
        collapseWhitespace: true
      },
      inject: false,
      chunks: ['vendor', 'common', 'index-index']
    }),
    // 混淆代码
    new webpack.optimize.UglifyJsPlugin({
      // 最紧凑的输出
      beautify: false,
      // 删除所有的注释
      comments: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告  
        warnings: false,
        // 删除所有的 `console` 语句
        // 还可以兼容ie浏览器
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true
      }
    }),
    new ExtractTextPlugin("styles/[name].[hash:5].css"),
  ]
};

const _options = Object.assign(options, baseConfig.prod);
// 处理组件模板文件
for (let i in baseConfig.widgets) {
  _options.plugins.push(
    new HtmlWebpackPlugin({
      template: baseConfig.widgets[i],
      filename: '../widget/' + i + '/' + i + baseConfig.fmt.widgetPage,
      minify: {
        removeCommets: true, // 去掉注释
        collapseWhitespace: true // 压缩代码
      },
      inject: false
    })
  )
};
module.exports = _options;