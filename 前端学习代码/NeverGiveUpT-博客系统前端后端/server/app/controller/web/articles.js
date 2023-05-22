const Controller = require("egg").Controller;

class ArticlesController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  async index() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    const res = await service.web.articles.index(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }
  async details() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    const res = await service.web.articles.details(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async keyword() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const res = await service.web.articles.keyword(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = ArticlesController;
