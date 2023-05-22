const Controller = require("egg").Controller;

class ResumeController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  async index() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    const res = await service.web.resume.index(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // async details() {
  //   const { ctx, service } = this;
  //   const data = ctx.request.query;
  //   const res = await service.web.resume.details(data);
  //   ctx.helper.success({
  //     ctx,
  //     res,
  //   });
  // }
}

module.exports = ResumeController;
