"use strict";

const Controller = require("egg").Controller;

class TagsController extends Controller {
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
        default: 20,
      },
      name: {
        type: "string",
        required: false,
        min: 2,
        max: 20,
        allowEmpty: true,
        format: /^[\u4e00-\u9fa5A-Za-z0-9_]{2,20}$/,
      },
    };
    this.createRule = {
      name: {
        type: "string",
        min: 2,
        max: 20,
        format: /^[\u4e00-\u9fa5A-Za-z0-9_]{2,20}$/,
      },
    };
  }

  async index() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    ctx.validate(this.queryListParamsRules, data);
    const res = await service.tags.index(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    ctx.validate(this.createRule, data);
    const res = await service.tags.create(data);
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
    const res = await service.tags.update({
      id,
      name: data.name,
    });
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const res = await service.tags.destroy(id);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async updateStatus() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    const res = await service.tags.updateStatus({
      id,
      status: data.status,
    });
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = TagsController;
