'use strict';
import Koa from 'koa';
import serve from 'koa-static'; // 操作模板目录
import router from 'koa-simple-router';
import path from 'path';
import co from 'co';
import log4js from 'koa-log4';
// 配置信息
import config from './config/config';
import logger from './config/logger';
import errorHandler from './libs/pageHandler';
import Controllers from './Controllers/ControllerInit';

const app = new Koa();

app.use(serve(config.staticDir)); // 静态资源文件
logger(app);  // 配置logger
// 定制上下文render
app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    varControls: ['[[', ']]'],
    writeBody: false
}));

// 在渲染页面之前，先设置页面的错误处理句柄
pageHandler.error(app);
//初始化所有路由controllers
Controllers.getAllrouters(app, router);

//监听端口🐂😊
app.listen(config.port);
console.log('webkoa2 listening on port %s', config.port);
process.env.NODE_ENV = "dev"; // prod
