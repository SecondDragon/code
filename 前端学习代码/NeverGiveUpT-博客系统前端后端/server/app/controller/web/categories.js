const Controller = require("egg").Controller;

class CategoriesController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  async index() {
    const { ctx, service } = this;
    const res = await service.web.categories.index();
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async details() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    const res = await service.web.categories.details(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = CategoriesController;
