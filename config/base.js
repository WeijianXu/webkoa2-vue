/**
 * webpack中module、plugins等核心配置
 * @created by wjxu on 2017-07-09
 */
const webpack = require('webpack');
const _ = require('lodash');
const path = require('path');
const fs = require('fs');
// 处理样式的组件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 使用Postcss处理样式
const cssnext = require('postcss-cssnext');
const cssvariables = require('postcss-css-variables');
const precss = require('precss');
// 文件位置变量
const entryPath = path.join(__dirname, '../web/views');
const widgetPath = path.join(__dirname, '../web/widget');
// 文件格式变量
const fmt = {
  jsEntry: '.entry.es',
  widgetPage: '.html'
}

// 遍历得到所有入口文件
const jsEntries = fs.readdirSync(entryPath).reduce(function(o, filename) {
  if (!/\./.test(filename)) {
    var _fd = entryPath + '/' + filename;
    fs.readdirSync(_fd).map(function(ifilename) {
      console.log(ifilename);
      if (new RegExp(fmt.jsEntry + '$').test(ifilename)) {
        o[ifilename.replace(fmt.jsEntry, '')] = path.join(entryPath, filename, ifilename);
      }
    });
  }
  return o;
}, {});
// 遍历所有组件widget
const widgetPage = fs.readdirSync(widgetPath).reduce(function(o, filename) {
  if (!/\./.test(filename)) {
    const _fd = widgetPath + '/' + filename;
    fs.readdirSync(_fd).map(function(ifilename) {
      if (new RegExp(fmt.widgetPath + '$').test(ifilename)) {
        o[ifilename.replace(fmt.widgetPath, '')] = path.join(widgetPath, filename, ifilename);
      }
    });
  }
  return o;
}, {});

// webpack核心配置
const _entries = Object.assign(jsEntries),
  _module = {
    rules: [{
      //设置对应的资源后缀.
      test: /\.(css)$/,
      //设置后缀对应的加载器.
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: function() {
              return [
                precss({
                  browsers: 'last 3 versions'
                }),
                cssnext({ /* ...options */ }),
                cssvariables({})
              ];
            }
          }
        }]
      })
    }, {
      test: /\.(es|jsx)$/,
      loader: 'babel-loader',
      options: {
        'presets': ['react', 'es2015', 'stage-0'],
        'plugins': ['transform-runtime']
      },
      exclude: path.resolve(__dirname, '../node_modules')
    }, {
      // loader: 'style!css?sourceMap!sass?sourceMap!import-glob'
      test: /\.less$/i,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'less-loader'
        }]
      })
    }]
  },
  _resolve = {
    extensions: ['.js', '.es', '.vue', 'jsx', '.less'],
    alias: {
      // vue: 'vue/dist/vue.js'
    }
  };

let _devLoaders = _.clone(_module.rules);
let _prodLoaders = _.clone(_module.rules);
// 处理图片、字体等文件
_devLoaders.push({
    test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf)$/,
    loader: 'file-loader?name=assets/images/[name].[ext]'
});
_prodLoaders.push({
    test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf)$/,
    loader: 'file-loader?name=assets/images/[name].[hash:5].[ext]'
});
const webpackConfig = {
    dev: {
        entry: _entries,
        module: {
            rules: _devLoaders
        },
        resolve: _resolve,
    },
    prod: {
        entry: _entries,
        module: {
            rules: _prodLoaders
        },
        resolve: _resolve
    },
    widgets: widgetPage
};

module.exports = webpackConfig;
module.exports.fmt = fmt;
module.exports.dir = {
  rootPath: path.join(__dirname, '..'),
  buildPath: path.join(__dirname, '../build/')
}