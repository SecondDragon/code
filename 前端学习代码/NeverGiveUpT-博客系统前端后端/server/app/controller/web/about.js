const Controller = require("egg").Controller;

class AboutController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  async index() {
    const { ctx, service } = this;
    const res = await service.web.about.index();
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = AboutController;
