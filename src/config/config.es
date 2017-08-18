//应用配置文件
import path from 'path';
import _ from 'lodash';
let config = {
  //端口号配置
  "port": 3000,
  //模板所在的目录
  "viewDir": path.join(__dirname, '..', 'web/views'),
  //log所在的目录
  "logDir": path.join(__dirname, '..', 'logs'),
  //静态文件所在的目录
  "staticDir": path.join(__dirname, '..', 'web/assets'),
};

//本地调试环境
if (process.env.NODE_ENV === 'dev') {
  config = _.extend(config, {
    "webpackConf": path.join(__dirname, "../..", "config/dev.js"),
  });
} else {
  config = _.extend(config, {
    "webpackConf": path.join(__dirname, "../..", "config/prod.js"),
  });
}
export default config;