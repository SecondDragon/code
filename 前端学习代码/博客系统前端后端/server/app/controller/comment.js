"use strict";

const Controller = require("egg").Controller;

class CommentController extends Controller {
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
      articleTitle: {
        type: "string",
        required: false,
      },
      auditStatus: {
        type: "string",
        required: false,
        default: "0",
      },
    };
    this.updateAuditStatusRule = {
      auditStatus: {
        type: "number",
      },
    };
  }

  async index() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    ctx.validate(this.queryListParamsRules, data);
    const res = await service.comment.index(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // TODO 暂时的
  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const res = await service.comment.create(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 更新审核状态
  async update() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(this.updateAuditStatusRule, data);
    const res = await service.comment.update({
      id,
      auditStatus: data.auditStatus,
    });
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const res = await service.comment.destroy(id);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = CommentController;
