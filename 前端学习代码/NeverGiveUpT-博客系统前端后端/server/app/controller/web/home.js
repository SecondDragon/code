const Controller = require("egg").Controller;

class HomeController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  async index() {
    const { ctx, service } = this;
    const res = await service.web.home.index();
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = HomeController;
