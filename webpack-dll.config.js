const webpack = require('webpack');
const path = require('path');

const vendors = [
  'vue',
  // ...其它库
];

module.exports = {
  output: {
    path: path.join(__dirname, './build/web/assets'), // 配置lib.js的位置
    filename: '[name].dll.js',
    library: '[name]',
  },
  entry: {
    'lib': vendors,
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'manifest.json', // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
      name: '[name]',
      context: __dirname,
    }),
    new webpack.ProvidePlugin({
      Vue: 'vue'  // 将插件中的 vue 指向 Vue 
      // React: 'React',
      // ReactDOM: 'ReactDOM'
    }),
  ],
};