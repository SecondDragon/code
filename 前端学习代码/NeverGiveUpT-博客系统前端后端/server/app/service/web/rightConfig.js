const Service = require("egg").Service;

class RightConfigService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async index() {
    const { ctx } = this;
    const ad = await ctx.model.Config.Right.Ad.findOne();
    const introduction = await ctx.model.Config.Right.Introduction.findOne();
    const recommend = await ctx.model.Config.Right.Recommend.find();

    return {
      msg: "右侧配置信息获取成功",
      data: {
        ad,
        introduction,
        recommend,
      },
    };
  }
}

module.exports = RightConfigService;
