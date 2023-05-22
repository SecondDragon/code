const Controller = require("egg").Controller;

class CommentController extends Controller {
  constructor(ctx) {
    super(ctx);
  }

  async submit() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const res = await service.web.comment.submit(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async list() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    const res = await service.web.comment.list(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = CommentController;
