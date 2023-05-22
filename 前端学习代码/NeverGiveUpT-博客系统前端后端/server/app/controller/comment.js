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
        default: 10,
      },
      nickName: {
        type: "string",
        required: false,
      },
      articleTitle: {
        type: "string",
        required: false,
      },
      auditStatus: {
        type: "string", // 0=全部 1=通过 2=驳回 3=未审核
        required: false,
        default: "0",
      },
    };
    this.updateAuditStatusRules = {
      auditStatus: {
        type: "number", // 1=通过 2=驳回 3=未审核
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

  async destroy() {
    const { ctx, service } = this;
    const data = ctx.params;
    const res = await service.comment.destroy(data.id);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 修改审核状态
  async update() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(this.updateAuditStatusRules, data);
    const res = await service.comment.update({
      id,
      auditStatus: data.auditStatus,
    });
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const res = await service.comment.create(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = CommentController;
