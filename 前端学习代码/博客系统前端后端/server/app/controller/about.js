"use strict";

const Controller = require("egg").Controller;

class AboutController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.createRule = {
      imgs: {
        type: "array",
        itemType: "object",
        min: 1,
        max: 3,
        rule: {
          imgUrl: "url",
          link: {
            type: "string",
            required: false,
          },
        },
      },
      desc: {
        type: "string",
        min: 1,
        max: 800,
      },
      tags: {
        type: "array",
        itemType: "string",
        min: 1,
        max: 20,
      },
      showResume: {
        type: "boolean",
        default: false,
      },
    };
  }

  async index() {
    const { ctx, service } = this;
    const res = await service.about.index();
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    ctx.validate(this.createRule, data);
    const res = await service.about.create(data);
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
    const res = await service.about.update({
      id,
      ...data,
    });
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = AboutController;
