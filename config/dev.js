/**
 * 开发环境Webpack配置
 */
const baseConfig = require('./base');
const path = require('path');
const webpack = require('webpack');
// 额外处理所需组件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const LiveReloadPlugin = require('webpack-livereload-plugin');

const options = {
  output: {
    path: baseConfig.dir.buildPath,
    publicPath: '/',
    filename: 'assets/scripts/[name].bundle.js' // 文件输出
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {}
    }),
    // 公共文件输出
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'assets/scripts/[name].bundle.js'
    }),
    new LiveReloadPlugin({
      appendScriptTag: true
    }),
    // 样式文件输出
    new ExtractTextPlugin("assets/styles/[name].css")
  ]
};

const _options = Object.assign(options, baseConfig.dev);
// 处理组件模板文件
for (let i in baseConfig.widgets) {
  _options.plugins.push(
    new HtmlWebpackPlugin({
      template: baseConfig.widgets[i],
      filename: './widget/' + i + '/' + i + baseConfig.fmt.widgetPage,
      inject: false
    })
  )
};
module.exports = _options;