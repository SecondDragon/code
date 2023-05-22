"use strict";

const Controller = require("egg").Controller;

class RightRecommendController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.createRule = {
      project: {
        type: "string",
      },
      showPosition: {
        type: "array",
        itemType: "string",
        min: 1,
        max: 10,
      },
      name: {
        type: "string",
        min: 1,
        max: 50,
      },
      cover: {
        type: "url",
      },
      link: {
        type: "url",
      },
      platform: {
        type: "string",
        min: 1,
        max: 20,
      },
      isVip: {
        type: "boolean",
        default: false,
      },
    };
    this.queryRule = {
      project: {
        type: "string",
        required: false,
      },
    };
  }

  async index() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    ctx.validate(this.queryRule, data);
    const res = await service.config.right.recommend.index(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    ctx.validate(this.createRule, data);
    const res = await service.config.right.recommend.create(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async update() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(this.createRule, data);
    const res = await service.config.right.recommend.update({
      id,
      ...data,
    });
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const res = await service.config.right.recommend.destroy(id);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = RightRecommendController;
