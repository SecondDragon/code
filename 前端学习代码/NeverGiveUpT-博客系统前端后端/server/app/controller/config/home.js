const Controller = require("egg").Controller;

class HomeController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.createRule = {
      introduction: {
        // 简介
        type: "string",
        min: 2,
        max: 100,
      },
      effects: {
        // 打字特效
        type: "boolean",
        default: false,
      },

      // articleBgImg: {
      //     type: "string",
      // },
      // articleDetailBgImg: {
      //     type: "string",
      // },
      archiveBgImg: {
        // 归档
        type: "string",
      },
      categoriesBgImg: {
        // 分类
        type: "string",
      },
      categoriesDetailBgImg: {
        type: "string",
      },
      tagsBgImg: {
        type: "string",
      },
      tagsDetailBgImg: {
        type: "string",
      },
      aboutBgImg: {
        type: "string",
      },
    };
  }
  async index() {
    const { ctx, service } = this;
    const res = await service.config.home.index();
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    ctx.validate(this.createRule, data);
    const res = await service.config.home.create(data);
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
    const res = await service.config.home.update({
      id,
      ...data,
    });
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = HomeController;
