const Controller = require("egg").Controller;

class HeaderController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  async index() {
    const { ctx, service } = this;
    const res = await service.web.header.index();
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = HeaderController;
