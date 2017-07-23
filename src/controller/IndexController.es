'use strict';
import BaseController from './BaseController';

class IndexController extends BaseController {
  
  setRouter(app, router) {
    app.use(router(_ => {
      _.get('/', this.index());
      _.get('/index', this.index());
      _.get('/index.html', this.indexHtml());
      _.get('/index/index', this.index());
    }));
  }
  
  index() {
    return async(ctx, next) => {
      ctx.body = await ctx.render('index/pages/index.html', {
        title: "webkoa2"
      });
    }
  }

  indexHtml() {
    return async(ctx, next) => {
      ctx.body = await ctx.render('index.html', {
        title: "welcome webkoa2"
      });
    }
  }
}

export default IndexController;