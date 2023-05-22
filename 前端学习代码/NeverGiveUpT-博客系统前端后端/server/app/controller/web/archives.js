const Controller = require("egg").Controller;

class ArchivesController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  async index() {
    const { ctx, service } = this;
    const res = await service.web.archives.index();
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = ArchivesController;
