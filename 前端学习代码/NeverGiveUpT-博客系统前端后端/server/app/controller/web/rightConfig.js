const Controller = require("egg").Controller;

class RightConfigController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  async index() {
    const { ctx, service } = this;
    const res = await service.web.rightConfig.index();
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = RightConfigController;
