/**
 * 初始路由控制
 */
import IndexController from './IndexController';

export default {
  getAllrouters(app, router) {
    new IndexController(app, router);
  }
}