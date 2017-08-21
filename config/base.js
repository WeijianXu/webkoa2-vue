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
};

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
const widgetPages = fs.readdirSync(widgetPath).reduce(function(o, filename) {
  if (!/\./.test(filename)) {
    const _fd = widgetPath + '/' + filename;
    fs.readdirSync(_fd).map(function(ifilename) {
      if (new RegExp(fmt.widgetPage + '$').test(ifilename)) {
        o[ifilename.replace(fmt.widgetPage, '')] = path.join(widgetPath, filename, ifilename);
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
        'plugins': ['transform-runtime'],
        'cacheDirectory': true
      },
      include: [
        // 只去解析运行目录下的 web 文件夹
        path.join(process.cwd(), './web')
      ],
      /*exclude: function(path) {
        // 路径中含有 node_modules 的就不去解析。
        var isNpmModule = !!path.match('node_modules/');
        return isNpmModule;
      }*/
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
    modules: ['node_modules'],
    extensions: ['.js', '.es', '.vue', 'jsx', '.less'],
    alias: {
      // vue: 'vue/dist/vue.js'
      React: 'react',
      ReactDOM: 'react-dom'
    }
  };

let _devLoaders = _.clone(_module.rules);
let _prodLoaders = _.clone(_module.rules);
// 处理图片、字体等文件
_devLoaders.push({
  test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf)$/,
  loader: 'file-loader',
  options: {
    name: 'images/[name].[ext]',
    publicPath: '/'
  }
});
_prodLoaders.push({
  test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf)$/,
  loader: 'file-loader',
  options: {
    name: 'images/[name].[hash:5].[ext]',
    publicPath: '/'
  }
});
const webpackConfig = {
  dev: {
    entry: _entries,
    module: {
      rules: _devLoaders
    },
    resolve: _resolve,
    devtool: 'cheap-source-map'
  },
  prod: {
    entry: _entries,
    module: {
      rules: _prodLoaders
    },
    resolve: _resolve
  },
  widgets: widgetPages,
  basePlugins: [
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, '..'), // 需要跟之前保持一致，这个用来指导 Webpack 匹配 manifest 中库的路径；
      manifest: require('../manifest.json')
    }),
    new webpack.ProvidePlugin({
      // Vue: 'vue'
      React: 'React',
      ReactDOM: 'ReactDOM'
    }),
  ]
};

module.exports = webpackConfig;
module.exports.fmt = fmt;
module.exports.dir = {
  sourcePath: path.join(__dirname, '../web'),
  publicPath: path.join(__dirname, '../build/web/assets')
};