const Controller = require("egg").Controller;

class TagsController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  async index() {
    const { ctx, service } = this;
    const res = await service.web.tags.index();
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async details() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    const res = await service.web.tags.details(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = TagsController;
