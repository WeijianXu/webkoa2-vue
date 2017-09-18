/**
 * 设置log
 */
import log4js from 'koa-log4';
import path from 'path';
import fs from 'fs';

export default function(app) {
  const logDir = path.join(__dirname, '..', 'logs'); //配置目标路径 logs
  log4js.getLogger('app');
  log4js.configure(path.join(__dirname, 'log4js.json'), {
    cwd: logDir
  });
  /*生成logs目录*/
  try {
    fs.mkdirSync(logDir);
    fs.writeFile(path.join(logDir, 'http.log'), '', function(err) {
      if (err) {
        return console.log('Could not set up http.log, error was: ', err);
      }
      app.use(log4js.koaLogger(log4js.getLogger('http'), {
        level: 'auto'
      }));

      console.log('The file http.log was created!');
    });
    fs.writeFile(path.join(logDir, 'app.log'), '', function(err) {
      if (err) {
        return console.log('Could not set up app.log, error was: ', err);
      }
      console.log('The file app.log was created!');
    });
    fs.writeFile(path.join(logDir, 'errors.log'), '', function(err) {
      if (err) {
        return console.log('Could not set up errors.log, error was: ', err);
      }
      console.log('The file errors.log was created!');
    });
  } catch (err) {
    if (err.code !== 'EEXIST') {
      console.error('Could not set up log directory, error was: ', err);
      process.exit(1);
    }
  }
}