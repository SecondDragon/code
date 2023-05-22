const Controller = require("egg").Controller;

class ArticlesController extends Controller {
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
      title: {
        type: "string",
        required: false,
        min: 2,
        max: 200,
        allowEmpty: true,
      },
      categories: {
        type: "string",
        required: false,
        default: "",
      },
      tags: {
        // vue,react,
        type: "string",
        required: false,
        default: "",
      },
      status: {
        type: "string",
        required: false,
        default: "0",
      },
      publishStatus: {
        type: "string",
        required: false,
        default: "0",
      },
      createStartTime: {
        type: "string",
        required: false,
        default: 0,
      },
      createEndTime: {
        type: "string",
        required: false,
        default: 0,
      },
      updateStartTime: {
        type: "string",
        required: false,
        default: 0,
      },
      updateEndTime: {
        type: "string",
        required: false,
        default: 0,
      },
    };

    this.createRule = {
      title: {
        type: "string",
        min: 2,
        max: 200,
      },
      cover: {
        type: "url",
      },
      introduction: {
        type: "string",
        min: 10,
        max: 500,
      },
      categories: {
        type: "string",
        min: 2,
        max: 20,
        format: /^[\u4E00-\u9FA5A-Za-z0-9_.]{2,20}$/,
      },
      tags: {
        type: "array",
        itemType: "string",
      },
      content: {
        type: "string",
      },
      views: {
        type: "number",
        default: 1,
      },
      like: {
        type: "number",
        default: 1,
      },
      collect: {
        type: "number",
        default: 1,
      },
      isComment: {
        type: "boolean",
        default: true,
      },
      isLike: {
        type: "boolean",
        default: true,
      },
      isCollect: {
        type: "boolean",
        default: false,
      },
      // 是否开启打赏
      isReward: {
        type: "boolean",
        default: false,
      },
      status: {
        type: "number",
        default: 1,
      },
      publishStatus: {
        type: "number",
        default: 2,
      },
      createTime: {
        type: "number",
        required: false,
        default: 0,
      },
      updateTime: {
        type: "number",
        required: false,
        default: 0,
      },
    };

    this.changeStatusRule = {
      status: {
        type: "number",
        default: 1,
      },
    };

    this.changePublishStatusRule = {
      publishStatus: {
        type: "number",
        default: 2,
      },
    };

    this.changeSortRule = {
      sort: {
        type: "number",
        required: false,
        default: 0,
        min: -9999,
        max: 9999,
      },
      top: {
        type: "boolean",
        required: false,
        default: false,
      },
    };
  }

  async index() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    ctx.validate(this.queryListParamsRules, data);
    const res = await service.articles.index(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async edit() {
    const { ctx, service } = this;
    const data = ctx.params;
    const res = await service.articles.edit(data.id);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    ctx.validate(this.createRule, data);
    const res = await service.articles.create(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async destroy() {
    const { ctx, service } = this;
    const data = ctx.params;
    const res = await service.articles.destroy(data.id);
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
    const res = await service.articles.update({
      id,
      ...data,
    });
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 启用、停用
  async changeStatus() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(this.changeStatusRule, data);
    const res = await service.articles.changeStatus({
      id,
      status: data.status,
    });
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 更改发布状态
  async changePublishStatus() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(this.changePublishStatusRule, data);
    const res = await service.articles.changePublishStatus({
      id,
      publishStatus: data.publishStatus,
    });
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 更改文章权重
  async changeSort() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(this.changeSortRule, data);
    const res = await service.articles.changeSort({
      id,
      sort: data.sort,
      top: data.top,
    });
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 一键开启关闭收藏
  async changeCollectStatus() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const res = await service.articles.changeCollectStatus(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = ArticlesController;
