"use strict";

const Controller = require("egg").Controller;

class RightIntroductionController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.createRule = {
      nickName: {
        type: "string",
        min: 2,
        max: 20,
      },
      desc: {
        type: "string",
        min: 2,
        max: 100,
      },
      tags: {
        type: "array",
        itemType: "string",
        min: 1,
        max: 10,
      },
      friendLink: {
        type: "array",
        itemType: "object",
        rule: {
          link: {
            type: "string",
          },
          icon: {
            type: "string",
          },
        },
        min: 1,
        max: 4,
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
    const res = await service.config.right.introduction.index();
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    ctx.validate(this.createRule, data);
    const res = await service.config.right.introduction.create(data);
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
    const res = await service.config.right.introduction.update({
      id,
      ...data,
    });
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = RightIntroductionController;
