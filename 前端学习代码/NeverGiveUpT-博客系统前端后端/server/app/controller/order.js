const Controller = require("egg").Controller;

class OrderController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.queryListParamsRules = {
      page: {
        type: "string",
        required: false,
        allowEmpty: true,
        default: 1,
      },
      pageSize: {
        type: "string",
        required: false,
        allowEmpty: true,
        default: 10,
      },
    };
  }

  // 订单列表
  async index() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    ctx.validate(this.queryListParamsRules, data);
    const res = await service.order.index(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 添加
  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const res = await service.order.create(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 删除
  async destroy() {
    const { ctx, service } = this;
    const data = ctx.params;
    const res = await service.order.destroy(data.id);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 修改
  async update() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    const res = await service.order.update({
      id,
      ...data,
    });
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = OrderController;
