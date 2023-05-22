const Controller = require("egg").Controller;

class LikeController extends Controller {
  constructor(ctx) {
    super(ctx);
  }

  async submit() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const res = await service.web.like.submit(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async collect() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const res = await service.web.like.collect(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }
  async cancelCollect() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const res = await service.web.like.cancelCollect(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }
  async collectList() {
    const { ctx, service } = this;
    const params = ctx.request.query;
    const res = await service.web.like.collectList(params);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = LikeController;
