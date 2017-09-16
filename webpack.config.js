/**
 * 分别设置开发模式和生产模式
 */
const DevWebpack = require('./config/dev');
const ProdWebpack = require('./config/prod');
switch (process.env.NODE_ENV) {
  case 'dev':
    module.exports = DevWebpack;
    break;
  case 'prod':
    module.exports = ProdWebpack;
    break;
  default:
    module.exports = DevWebpack;
}