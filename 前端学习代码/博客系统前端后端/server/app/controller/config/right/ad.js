"use strict";

const Controller = require("egg").Controller;

class RightAdController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.createRule = {
      imgs: {
        type: "array",
        itemType: "object",
        rule: {
          imgUrl: {
            type: "string",
          },
          link: {
            type: "string",
          },
        },
        min: 1,
        max: 3,
      },
      showPosition: {
        type: "array",
        itemType: "string",
        min: 1,
        max: 10,
      },
    };
  }

  async index() {
    const { ctx, service } = this;
    const res = await service.config.right.ad.index();
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    ctx.validate(this.createRule, data);
    const res = await service.config.right.ad.create(data);
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
    const res = await service.config.right.ad.update({
      id,
      ...data,
    });
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = RightAdController;
