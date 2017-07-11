/**
 * 控制类基类
 */
class BaseController {
  constructor(app, router) {
    this.setRouter(app, router);
  }
  setRouter(app, router) {
    throw new Error('不能调用抽象方法，由子类继承');
  }
}
export default BaseController;