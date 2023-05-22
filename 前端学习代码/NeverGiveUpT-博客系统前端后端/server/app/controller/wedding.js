const Controller = require("egg").Controller;

class WeddingController extends Controller {
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
      type: {
        type: "number",
        required: false,
        default: 0,
      },
      name: {
        type: "string",
        required: false,
      },
    };
    this.createRule = {
      name: {
        type: "string",
        required: true,
      },
      phone: {
        type: "string",
        required: true,
        max: 11,
      },
      message: {
        type: "string",
        required: true,
        max: 5000,
      },
      type: {
        type: "number",
        required: true,
        default: 0,
      },
    };
  }
  async index() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    if (data.type) {
      data.type *= 1;
    }
    ctx.validate(this.queryListParamsRules, data);
    const res = await service.wedding.index(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    ctx.validate(this.createRule, data);
    const res = await service.wedding.create(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = WeddingController;
