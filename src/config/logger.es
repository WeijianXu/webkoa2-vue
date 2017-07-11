/**
 * 设置log
 */
import log4js from 'koa-log4';
import path from 'path';
import fs from 'fs';

export default function(app) {
  const logDir = path.join(__dirname, '..', 'logs') //配置目标路径 logs
  const logger = log4js.getLogger('app');
  log4js.configure(path.join(__dirname, 'log4js.json'), {
    cwd: logDir
  });
  app.use(log4js.koaLogger(log4js.getLogger('http'), {
    level: 'auto'
  }));
  /*生成logs目录*/
  try {
    fs.mkdirSync(logDir);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      console.error('Could not set up log directory, error was: ', err);
      process.exit(1)
    }
  }
}